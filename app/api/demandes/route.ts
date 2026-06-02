import { NextResponse } from 'next/server';
import { getAppUser } from '@/lib/auth/get-user';
import { parseDeliverableFormat } from '@/lib/bework/deliverable-formats';
import { getSkillForMissionType } from '@/lib/skills/registry';
import { runMissionSkill } from '@/lib/skills/run-mission';
import { DEV_BYPASS } from '@/lib/dev/config';
import { createMission } from '@/lib/dev/local-missions';
import { insertMissionRow } from '@/lib/supabase/missions-db';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const user = await getAppUser();
  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const body = await request.json();
  const { type, title, brief, chantier, output_format, use_skill_charter } = body as {
    type?: string;
    title?: string;
    brief?: string;
    chantier?: string;
    output_format?: string;
    use_skill_charter?: boolean;
  };

  const deliverableFormat = parseDeliverableFormat(output_format);
  const applySkillCharter = use_skill_charter !== false;

  if (!type || !title?.trim() || !brief?.trim()) {
    return NextResponse.json({ error: 'Type, titre et brief requis' }, { status: 400 });
  }

  const skill = getSkillForMissionType(type);
  const status = skill?.integrated ? 'en_cours' : 'recue';

  let missionId: string;

  if (DEV_BYPASS) {
    const mission = await createMission({
      user_id: user.id,
      type,
      title: title.trim(),
      brief: brief.trim(),
      chantier: chantier?.trim() || null,
      skill_id: skill?.id ?? 'assistant-travaux',
      status,
      output_format: deliverableFormat,
      use_skill_charter: applySkillCharter,
    });
    missionId = mission.id;
  } else {
    const supabase = await createClient();
    const result = await insertMissionRow(supabase, {
      user_id: user.id,
      type,
      title: title.trim(),
      brief: brief.trim(),
      chantier: chantier?.trim() || null,
      skill_id: skill?.id ?? 'assistant-travaux',
      status,
      options: {
        output_format: deliverableFormat,
        use_skill_charter: applySkillCharter,
      },
    });

    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    missionId = result.id;
  }

  const shouldRunSkill = !skill?.integrated && Boolean(process.env.ANTHROPIC_API_KEY);

  if (shouldRunSkill) {
    void runMissionSkill(missionId, user.id).catch((err) => {
      console.error('runMissionSkill après création:', err);
    });
  }

  return NextResponse.json({
    id: missionId,
    skillId: skill?.id ?? 'assistant-travaux',
    skillName: skill?.name ?? 'Assistant travaux',
    processing: shouldRunSkill,
    integrated: Boolean(skill?.integrated),
  });
}
