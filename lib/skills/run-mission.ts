import Anthropic from '@anthropic-ai/sdk';
import { DEV_BYPASS } from '@/lib/dev/config';
import { getMission, updateMission } from '@/lib/dev/local-missions';
import { createClient } from '@/lib/supabase/server';
import { getSkillById } from '@/lib/skills/registry';
import { loadSkillPrompt } from '@/lib/skills/load-skill';
import { parseDeliverableFormat } from '@/lib/bework/deliverable-formats';
import { run3dmCrChantierSkill } from './run-3dm-cr-chantier';
import { buildCharterSystemBlock, buildDeliverableFormatBlock } from './charter-prompt';
import { exportMissionDeliverable } from './export-deliverable';
import { missionDocxPath, missionDeliverablePath } from './mission-output';
import { promises as fs } from 'fs';

const SYSTEM_BASE = `Tu es un assistant travaux BeWork (bework.fr), relais administratif pour entreprises BTP et MOE en France.
Tu rédiges en français professionnel, concret, sans jargon startup. Tu ne t'engages jamais au nom du client sans validation.
Supervision humaine depuis la France.

RÈGLE PLATEFORME : tu dois LIVRER le résultat final complet dans ta réponse (document structuré, prêt à copier ou valider).
N'inclus PAS de commandes shell, de chemins serveur (/mnt/…), ni de promesses (« je vais maintenant… ») : le client ne voit que ton texte.`;

const FALLBACK_PROMPT = `Qualifie la demande administrative BTP et rédige le livrable demandé (tableaux, courrier, synthèse…) de façon complète et actionnable.`;

const DOCX_SKILL_IDS = new Set(['3dmanager-cr-chantier']);

export type MissionForSkill = {
  id: string;
  user_id: string;
  skill_id: string;
  title: string;
  brief: string;
  chantier: string | null;
  status: string;
  ai_result: string | null;
  output_format?: string | null;
  use_skill_charter?: boolean | null;
};

export class SkillRunError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'SkillRunError';
  }
}

function anthropicText(message: Anthropic.Message): string {
  return message.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n\n');
}

async function loadMission(missionId: string, userId: string): Promise<MissionForSkill | null> {
  if (DEV_BYPASS) {
    const m = await getMission(missionId, userId);
    return m;
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from('missions')
    .select(
      'id, user_id, skill_id, title, brief, chantier, status, ai_result, output_format, use_skill_charter'
    )
    .eq('id', missionId)
    .eq('user_id', userId)
    .single();
  return data;
}

async function persistResult(
  missionId: string,
  userId: string,
  result: string,
  status: 'en_attente_validation' | 'terminee'
): Promise<void> {
  if (DEV_BYPASS) {
    await updateMission(missionId, userId, { ai_result: result, status });
    return;
  }
  const supabase = await createClient();
  await supabase
    .from('missions')
    .update({ ai_result: result, status })
    .eq('id', missionId)
    .eq('user_id', userId);
}

async function markProcessing(missionId: string, userId: string): Promise<boolean> {
  if (DEV_BYPASS) {
    const m = await getMission(missionId, userId);
    if (!m || m.ai_result || (m.status !== 'recue' && m.status !== 'en_cours')) return false;
    await updateMission(missionId, userId, { status: 'en_cours' });
    return true;
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from('missions')
    .update({ status: 'en_cours' })
    .eq('id', missionId)
    .eq('user_id', userId)
    .in('status', ['recue', 'en_cours'])
    .is('ai_result', null)
    .select('id')
    .maybeSingle();
  return Boolean(data);
}

async function persistDeliverableFile(mission: MissionForSkill, aiResult: string): Promise<void> {
  const format = parseDeliverableFormat(mission.output_format);
  const useCharter = mission.use_skill_charter !== false;
  const skill = getSkillById(mission.skill_id);

  if (
    DOCX_SKILL_IDS.has(mission.skill_id) &&
    useCharter &&
    (format === 'docx' || format === 'doc')
  ) {
    try {
      await fs.access(missionDocxPath(mission.id));
      if (format === 'doc') {
        const buf = await fs.readFile(missionDocxPath(mission.id));
        await fs.writeFile(missionDeliverablePath(mission.id, 'doc'), buf);
      }
      return;
    } catch {
      /* pas de docx charte — export texte */
    }
  }

  await exportMissionDeliverable({
    missionId: mission.id,
    title: mission.title,
    content: aiResult,
    format,
    skillName: skill?.name,
  });
}

async function runClaudeSkill(mission: MissionForSkill): Promise<string> {
  const skill = getSkillById(mission.skill_id);
  const skillPrompt = loadSkillPrompt(mission.skill_id) ?? FALLBACK_PROMPT;
  const skillMeta = skill
    ? `Skill actif : ${skill.name}\n${skill.description}`
    : `Skill actif : assistant-travaux (général)`;
  const useCharter = mission.use_skill_charter !== false;
  const format = parseDeliverableFormat(mission.output_format);
  const charterBlock = buildCharterSystemBlock(mission.skill_id, useCharter);
  const formatBlock = buildDeliverableFormatBlock(format);

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const message = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    system: `${SYSTEM_BASE}\n\n${charterBlock}\n\n${formatBlock}\n\n${skillMeta}\n\n--- Instructions du skill ---\n\n${skillPrompt}`,
    messages: [
      {
        role: 'user',
        content: `Mission : ${mission.title}\nChantier / marché : ${mission.chantier || '—'}\n\nBrief client :\n${mission.brief}`,
      },
    ],
  });

  if (message.stop_reason === 'max_tokens') {
    const partial = anthropicText(message);
    return `${partial}\n\n---\n⚠️ *Réponse tronquée (limite de longueur). Scindez la demande ou précisez un lot unique.*`;
  }

  const text = anthropicText(message);
  return text.trim() || 'Réponse vide — réessayez ou contactez le support BeWork.';
}

/** Exécute le skill associé à la mission (hors outils intégrés). */
export async function runMissionSkill(
  missionId: string,
  userId: string
): Promise<{ result: string; skipped?: boolean; processing?: boolean }> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new SkillRunError('ANTHROPIC_API_KEY non configurée sur le serveur', 503);
  }

  const mission = await loadMission(missionId, userId);
  if (!mission) {
    throw new SkillRunError('Mission introuvable', 404);
  }

  if (mission.ai_result) {
    return { result: mission.ai_result, skipped: true };
  }

  const skill = getSkillById(mission.skill_id);
  if (skill?.integrated) {
    throw new SkillRunError('Cette demande est traitée par un outil intégré', 400);
  }

  const started = await markProcessing(missionId, userId);
  if (!started) {
    const refreshed = await loadMission(missionId, userId);
    if (refreshed?.ai_result) return { result: refreshed.ai_result, skipped: true };
    if (refreshed?.status === 'en_cours') {
      return { result: '', skipped: true, processing: true };
    }
    throw new SkillRunError('Traitement déjà en cours ou terminé', 409);
  }

  const useCharter = mission.use_skill_charter !== false;
  let text: string;
  if (DOCX_SKILL_IDS.has(mission.skill_id) && useCharter) {
    text = await run3dmCrChantierSkill(mission);
  } else {
    text = await runClaudeSkill(mission);
  }

  try {
    await persistDeliverableFile(mission, text);
  } catch (err) {
    console.error('export livrable:', err);
  }

  await persistResult(missionId, userId, text, 'en_attente_validation');
  return { result: text };
}
