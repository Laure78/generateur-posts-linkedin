import { NextResponse } from 'next/server';
import { getAppUser } from '@/lib/auth/get-user';
import { getSkillForMissionType } from '@/lib/skills/registry';
import { DEV_BYPASS } from '@/lib/dev/config';
import { createMission } from '@/lib/dev/local-missions';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const user = await getAppUser();
  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const body = await request.json();
  const { type, title, brief, chantier } = body as {
    type?: string;
    title?: string;
    brief?: string;
    chantier?: string;
  };

  if (!type || !title?.trim() || !brief?.trim()) {
    return NextResponse.json({ error: 'Type, titre et brief requis' }, { status: 400 });
  }

  const skill = getSkillForMissionType(type);
  const status = skill?.integrated ? 'en_cours' : 'recue';

  if (DEV_BYPASS) {
    const mission = await createMission({
      user_id: user.id,
      type,
      title: title.trim(),
      brief: brief.trim(),
      chantier: chantier?.trim() || null,
      skill_id: skill?.id ?? 'assistant-travaux',
      status,
    });
    return NextResponse.json({ id: mission.id });
  }

  const supabase = await createClient();
  const { data: mission, error } = await supabase
    .from('missions')
    .insert({
      user_id: user.id,
      type,
      title: title.trim(),
      brief: brief.trim(),
      chantier: chantier?.trim() || null,
      skill_id: skill?.id ?? 'assistant-travaux',
      status,
    })
    .select('id')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!skill?.integrated && process.env.ANTHROPIC_API_KEY) {
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    fetch(`${base}/api/skills/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ missionId: mission.id }),
    }).catch(() => {});
  }

  return NextResponse.json({ id: mission.id });
}
