import { NextResponse } from 'next/server';
import { getAppUser } from '@/lib/auth/get-user';
import { runMissionSkill, SkillRunError } from '@/lib/skills/run-mission';

export async function POST(request: Request) {
  const user = await getAppUser();
  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { missionId } = (await request.json()) as { missionId?: string };
  if (!missionId) {
    return NextResponse.json({ error: 'missionId requis' }, { status: 400 });
  }

  try {
    const { result, skipped, processing } = await runMissionSkill(missionId, user.id);
    return NextResponse.json({ result, skipped: skipped ?? false, processing: processing ?? false });
  } catch (err) {
    if (err instanceof SkillRunError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error('skills/run:', err);
    return NextResponse.json({ error: 'Erreur lors du traitement par l\'assistant' }, { status: 500 });
  }
}
