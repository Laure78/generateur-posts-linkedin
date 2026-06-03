import { NextResponse } from 'next/server';
import { getAppProfile } from '@/lib/auth/profile';
import { canAccessAdminPlatform } from '@/lib/bework/roles';
import { validateMissionByChef } from '@/lib/missions/mutations';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const profile = await getAppProfile();
  if (!profile) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }
  if (!canAccessAdminPlatform(profile.role)) {
    return NextResponse.json({ error: 'Accès réservé chef d\'équipe / admin' }, { status: 403 });
  }

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as { note?: string };
  const result = await validateMissionByChef(id, profile.id, profile.role, body.note);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ mission: result.mission });
}
