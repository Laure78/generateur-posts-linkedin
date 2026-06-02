import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSkillForMissionType } from '@/lib/skills/registry';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
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

  const { data: mission, error } = await supabase
    .from('missions')
    .insert({
      user_id: user.id,
      type,
      title: title.trim(),
      brief: brief.trim(),
      chantier: chantier?.trim() || null,
      skill_id: skill?.id ?? 'assistant-travaux',
      status: skill?.integrated ? 'en_cours' : 'recue',
    })
    .select('id')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!skill?.integrated && process.env.ANTHROPIC_API_KEY) {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/skills/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ missionId: mission.id }),
    }).catch(() => {});
  }

  return NextResponse.json({ id: mission.id });
}
