import { NextResponse } from 'next/server';
import { getAppProfile } from '@/lib/auth/profile';
import { fetchMissionById } from '@/lib/missions/access';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const profile = await getAppProfile(request);
  if (!profile) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { id } = await params;
  const mission = await fetchMissionById(id, profile.id, profile.role);
  if (!mission) {
    return NextResponse.json({ error: 'Mission introuvable' }, { status: 404 });
  }

  return NextResponse.json({ mission });
}
