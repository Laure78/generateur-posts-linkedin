import { NextResponse } from 'next/server';
import { getAppProfile } from '@/lib/auth/profile';
import { updateMissionComment } from '@/lib/missions/mutations';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const profile = await getAppProfile(request);
  if (!profile) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as { comment?: string };
  const result = await updateMissionComment(id, profile.id, profile.role, body.comment ?? '');

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
