import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { DEV_BYPASS } from '@/lib/dev/config';
import { getMission, listMissions, listAllMissions } from '@/lib/dev/local-missions';
import { canAccessAdminPlatform, type BeworkRole } from '@/lib/bework/roles';
import type { MissionRow } from './types';

export function viewerCanAccessMission(
  mission: { user_id: string },
  viewerId: string,
  role: BeworkRole
): boolean {
  if (mission.user_id === viewerId) return true;
  return canAccessAdminPlatform(role);
}

export async function fetchMissionById(
  missionId: string,
  viewerId: string,
  role: BeworkRole
): Promise<MissionRow | null> {
  if (DEV_BYPASS) {
    if (canAccessAdminPlatform(role)) {
      const all = await listAllMissions();
      const m = all.find((x) => x.id === missionId);
      return m ?? null;
    }
    return getMission(missionId, viewerId);
  }

  const supabase = await createClient();
  let query = supabase.from('missions').select('*').eq('id', missionId);

  if (!canAccessAdminPlatform(role)) {
    query = query.eq('user_id', viewerId);
  }

  const { data } = await query.maybeSingle();
  return data as MissionRow | null;
}

export type ListMissionsOptions = {
  viewerId: string;
  role: BeworkRole;
  status?: string;
  type?: string;
  q?: string;
  limit?: number;
  offset?: number;
};

export async function fetchMissionsList(opts: ListMissionsOptions): Promise<MissionRow[]> {
  const limit = opts.limit ?? 20;
  const offset = opts.offset ?? 0;

  if (DEV_BYPASS) {
    let rows = canAccessAdminPlatform(opts.role)
      ? await listAllMissions()
      : await listMissions(opts.viewerId);
    if (opts.status) rows = rows.filter((m) => m.status === opts.status);
    if (opts.type) rows = rows.filter((m) => m.type === opts.type);
    if (opts.q) {
      const q = opts.q.toLowerCase();
      rows = rows.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          (m.chantier ?? '').toLowerCase().includes(q) ||
          m.brief.toLowerCase().includes(q)
      );
    }
    return rows.slice(offset, offset + limit);
  }

  const supabase = canAccessAdminPlatform(opts.role)
    ? createAdminClient() ?? (await createClient())
    : await createClient();

  let query = supabase
    .from('missions')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (!canAccessAdminPlatform(opts.role)) {
    query = query.eq('user_id', opts.viewerId);
  }
  if (opts.status) query = query.eq('status', opts.status);
  if (opts.type) query = query.eq('type', opts.type);
  if (opts.q) {
    query = query.or(
      `title.ilike.%${opts.q}%,chantier.ilike.%${opts.q}%,brief.ilike.%${opts.q}%`
    );
  }

  const { data } = await query;
  return (data ?? []) as MissionRow[];
}
