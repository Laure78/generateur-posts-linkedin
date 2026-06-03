import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { DEV_BYPASS } from '@/lib/dev/config';
import {
  createMission,
  getMission,
  getMissionById,
  updateMissionById,
  resetMissionForRerun,
} from '@/lib/dev/local-missions';
import { insertMissionRow } from '@/lib/supabase/missions-db';
import { resolveMissionOptions, appendMissionMetaToBrief } from '@/lib/bework/mission-meta';
import { getSkillForMissionType } from '@/lib/skills/registry';
import { canAccessAdminPlatform, type BeworkRole } from '@/lib/bework/roles';
import { fetchMissionById } from './access';
import { logMissionAudit } from './audit';
import type { MissionRow } from './types';

export async function validateMissionByChef(
  missionId: string,
  chefId: string,
  chefRole: BeworkRole,
  note?: string
): Promise<{ ok: true; mission: MissionRow } | { ok: false; error: string }> {
  const mission = await fetchMissionById(missionId, chefId, chefRole);
  if (!mission) return { ok: false, error: 'Mission introuvable' };
  if (!mission.ai_result) return { ok: false, error: 'Aucun livrable à valider' };
  if (mission.chef_validated_at) return { ok: false, error: 'Déjà validé par le chef d\'équipe' };

  const now = new Date().toISOString();
  const patch = {
    chef_validated_at: now,
    chef_validated_by: chefId,
    chef_validation_note: note?.trim() || null,
    status: 'terminee',
  };

  if (DEV_BYPASS) {
    const updated = await updateMissionById(missionId, patch);
    if (!updated) return { ok: false, error: 'Mise à jour impossible' };
    await logMissionAudit(missionId, chefId, 'chef_validated', { note });
    return { ok: true, mission: updated as MissionRow };
  }

  const supabase = createAdminClient() ?? (await createClient());
  const { data, error } = await supabase
    .from('missions')
    .update(patch)
    .eq('id', missionId)
    .select('*')
    .single();

  if (error || !data) return { ok: false, error: error?.message ?? 'Erreur validation' };
  await logMissionAudit(missionId, chefId, 'chef_validated', { note });
  return { ok: true, mission: data as MissionRow };
}

export async function duplicateMission(
  sourceId: string,
  userId: string,
  role: BeworkRole
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const source = await fetchMissionById(sourceId, userId, role);
  if (!source) return { ok: false, error: 'Mission introuvable' };

  const skill = getSkillForMissionType(source.type);
  const options = resolveMissionOptions({
    brief: source.brief,
    output_format: source.output_format,
    use_skill_charter: source.use_skill_charter,
    ai_model: source.ai_model,
  });

  const title = source.title.includes('(copie)')
    ? source.title
    : `${source.title} (copie)`;

  if (DEV_BYPASS) {
    const m = await createMission({
      user_id: userId,
      type: source.type,
      skill_id: source.skill_id,
      title,
      brief: source.brief,
      chantier: source.chantier,
      status: 'recue',
      output_format: options.output_format,
      use_skill_charter: options.use_skill_charter,
      ai_model: options.ai_model,
      duplicate_of: sourceId,
    });
    await logMissionAudit(m.id, userId, 'duplicated', { from: sourceId });
    return { ok: true, id: m.id };
  }

  const supabase = await createClient();
  const result = await insertMissionRow(supabase, {
    user_id: userId,
    type: source.type,
    title,
    brief: source.brief,
    chantier: source.chantier,
    skill_id: skill?.id ?? source.skill_id,
    status: 'recue',
    options,
  });

  if ('error' in result) return { ok: false, error: result.error };

  const admin = createAdminClient();
  if (admin) {
    await admin.from('missions').update({ duplicate_of: sourceId }).eq('id', result.id);
  }

  await logMissionAudit(result.id, userId, 'duplicated', { from: sourceId });
  return { ok: true, id: result.id };
}

export async function updateMissionComment(
  missionId: string,
  viewerId: string,
  role: BeworkRole,
  comment: string
): Promise<{ ok: boolean; error?: string }> {
  const mission = await fetchMissionById(missionId, viewerId, role);
  if (!mission) return { ok: false, error: 'Mission introuvable' };
  if (!canAccessAdminPlatform(role) && mission.user_id !== viewerId) {
    return { ok: false, error: 'Non autorisé' };
  }

  if (DEV_BYPASS) {
    await updateMissionById(missionId, { internal_comment: comment.trim() || null });
  } else {
    const supabase =
      canAccessAdminPlatform(role) ? createAdminClient() ?? (await createClient()) : await createClient();
    await supabase.from('missions').update({ internal_comment: comment.trim() || null }).eq('id', missionId);
  }
  await logMissionAudit(missionId, viewerId, 'comment_updated', {});
  return { ok: true };
}

export async function prepareMissionRerun(
  missionId: string,
  userId: string,
  newBrief: string
): Promise<{ ok: boolean; error?: string }> {
  if (DEV_BYPASS) {
    const m = await resetMissionForRerun(missionId, userId, newBrief);
    if (!m) return { ok: false, error: 'Mission introuvable' };
    await logMissionAudit(missionId, userId, 'rerun_requested', {});
    return { ok: true };
  }

  const supabase = await createClient();
  const { data } = await supabase.from('missions').select('deliverable_version').eq('id', missionId).eq('user_id', userId).single();
  const version = ((data?.deliverable_version as number) ?? 1) + 1;

  const { error } = await supabase
    .from('missions')
    .update({
      brief: newBrief,
      ai_result: null,
      status: 'recue',
      chef_validated_at: null,
      chef_validated_by: null,
      chef_validation_note: null,
      deliverable_version: version,
    })
    .eq('id', missionId)
    .eq('user_id', userId);

  if (error) return { ok: false, error: error.message };
  await logMissionAudit(missionId, userId, 'rerun_requested', { version });
  return { ok: true };
}

export async function recordAiUsage(
  missionId: string,
  userId: string,
  inputTokens: number,
  outputTokens: number
): Promise<void> {
  if (DEV_BYPASS) {
    await updateMissionById(missionId, {
      ai_tokens_input: inputTokens,
      ai_tokens_output: outputTokens,
    });
    return;
  }
  const supabase = createAdminClient() ?? (await createClient());
  await supabase
    .from('missions')
    .update({ ai_tokens_input: inputTokens, ai_tokens_output: outputTokens })
    .eq('id', missionId);
}
