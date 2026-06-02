import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@/lib/supabase/server';
import { getSkillById } from '@/lib/skills/registry';
import { loadSkillPrompt } from '@/lib/skills/load-skill';

const SYSTEM_BASE = `Tu es un assistant travaux BeWork (bework.fr), relais administratif pour entreprises BTP et MOE en France.
Tu rédiges en français professionnel, concret, sans jargon startup. Tu ne t'engages jamais au nom du client sans validation.
Supervision humaine depuis la France.`;

const FALLBACK_PROMPT = `Qualifie la demande administrative BTP et propose un plan d'action en étapes claires.`;

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY non configurée' }, { status: 503 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { missionId } = (await request.json()) as { missionId?: string };
  if (!missionId) {
    return NextResponse.json({ error: 'missionId requis' }, { status: 400 });
  }

  const { data: mission } = await supabase
    .from('missions')
    .select('*')
    .eq('id', missionId)
    .eq('user_id', user.id)
    .single();

  if (!mission) {
    return NextResponse.json({ error: 'Mission introuvable' }, { status: 404 });
  }

  const skill = getSkillById(mission.skill_id);
  if (skill?.integrated) {
    return NextResponse.json({ error: 'Skill traité par outil intégré' }, { status: 400 });
  }

  const skillPrompt = loadSkillPrompt(mission.skill_id) ?? FALLBACK_PROMPT;

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const message = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: `${SYSTEM_BASE}\n\n${skillPrompt}`,
    messages: [
      {
        role: 'user',
        content: `Mission : ${mission.title}\nChantier : ${mission.chantier || '—'}\n\nBrief :\n${mission.brief}`,
      },
    ],
  });

  const text =
    message.content[0]?.type === 'text' ? message.content[0].text : 'Réponse vide';

  await supabase
    .from('missions')
    .update({ ai_result: text, status: 'en_attente_validation' })
    .eq('id', missionId);

  return NextResponse.json({ result: text });
}
