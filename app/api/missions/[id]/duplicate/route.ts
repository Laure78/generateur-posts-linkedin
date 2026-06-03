import { NextResponse } from 'next/server';
import { getAppProfile } from '@/lib/auth/profile';
import { duplicateMission } from '@/lib/missions/mutations';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const profile = await getAppProfile();
  if (!profile) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { id } = await params;
  const result = await duplicateMission(id, profile.id, profile.role);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ id: result.id });
}
