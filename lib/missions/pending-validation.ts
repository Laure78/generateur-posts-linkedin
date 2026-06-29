import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { DEV_BYPASS } from '@/lib/dev/config';
import { listAllMissions } from '@/lib/dev/local-missions';
import { canAccessAdminPlatform, type BeworkRole } from '@/lib/bework/roles';
import type { MissionRow } from './types';

export const VALIDATION_REMINDER_DAYS = 7;

export type PendingMission = MissionRow & {
  daysPending: number;
  isOverdue: boolean;
};

function daysSince(iso: string | undefined): number {
  if (!iso) return 0;
  const then = new Date(iso).getTime();
  const now = Date.now();
  return Math.max(0, Math.floor((now - then) / (1000 * 60 * 60 * 24)));
}

function enrichPending(m: MissionRow): PendingMission {
  const ref = m.updated_at ?? m.created_at ?? new Date().toISOString();
  const daysPending = daysSince(ref);
  return {
    ...m,
    daysPending,
    isOverdue: daysPending >= VALIDATION_REMINDER_DAYS,
  };
}

function isPendingValidation(m: MissionRow): boolean {
  return m.status === 'en_attente_validation' && !m.chef_validated_at;
}

export async function fetchPendingValidationQueue(
  viewerId: string,
  role: BeworkRole
): Promise<PendingMission[]> {
  if (!canAccessAdminPlatform(role)) return [];

  if (DEV_BYPASS) {
    const rows = (await listAllMissions()).filter(isPendingValidation);
    return rows
      .map(enrichPending)
      .sort((a, b) => b.daysPending - a.daysPending);
  }

  const supabase = createAdminClient() ?? (await createClient());
  const { data } = await supabase
    .from('missions')
    .select('*')
    .eq('status', 'en_attente_validation')
    .is('chef_validated_at', null)
    .order('updated_at', { ascending: true });

  return ((data ?? []) as MissionRow[]).map(enrichPending);
}
