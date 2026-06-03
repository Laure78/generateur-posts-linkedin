import { NextResponse } from 'next/server';
import { getAppProfile } from '@/lib/auth/profile';
import { prepareMissionRerun } from '@/lib/missions/mutations';
import { runMissionSkill } from '@/lib/skills/run-mission';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const profile = await getAppProfile(request);
  if (!profile) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as { brief?: string };
  if (!body.brief?.trim()) {
    return NextResponse.json({ error: 'Brief requis' }, { status: 400 });
  }

  const prep = await prepareMissionRerun(id, profile.id, body.brief.trim());
  if (!prep.ok) {
    return NextResponse.json({ error: prep.error }, { status: 400 });
  }

  if (process.env.ANTHROPIC_API_KEY) {
    void runMissionSkill(id, profile.id).catch((err) => {
      console.error('rerun mission:', err);
    });
  }

  return NextResponse.json({ processing: Boolean(process.env.ANTHROPIC_API_KEY) });
}
