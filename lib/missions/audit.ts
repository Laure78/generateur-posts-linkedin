import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { DEV_BYPASS } from '@/lib/dev/config';
import { appendLocalAudit } from '@/lib/dev/local-audit';

export async function logMissionAudit(
  missionId: string,
  actorId: string | null,
  action: string,
  detail?: Record<string, unknown>
): Promise<void> {
  if (DEV_BYPASS) {
    await appendLocalAudit({ mission_id: missionId, actor_id: actorId, action, detail });
    return;
  }

  const supabase = createAdminClient() ?? (await createClient());
  await supabase.from('mission_audit_log').insert({
    mission_id: missionId,
    actor_id: actorId,
    action,
    detail: detail ?? null,
  });
}
