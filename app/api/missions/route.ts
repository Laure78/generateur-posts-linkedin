import { NextResponse } from 'next/server';
import { getAppProfile } from '@/lib/auth/profile';
import { fetchMissionsList } from '@/lib/missions/access';

/** Liste des missions (app mobile, filtres optionnels). */
export async function GET(request: Request) {
  const profile = await getAppProfile(request);
  if (!profile) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const url = new URL(request.url);
  const status = url.searchParams.get('status') ?? undefined;
  const type = url.searchParams.get('type') ?? undefined;
  const q = url.searchParams.get('q') ?? undefined;
  const limit = Math.min(50, parseInt(url.searchParams.get('limit') ?? '30', 10) || 30);
  const offset = Math.max(0, parseInt(url.searchParams.get('offset') ?? '0', 10) || 0);

  const missions = await fetchMissionsList({
    viewerId: profile.id,
    role: profile.role,
    status,
    type,
    q,
    limit,
    offset,
  });

  return NextResponse.json({
    missions,
    profile: {
      id: profile.id,
      email: profile.email,
      role: profile.role,
    },
  });
}
