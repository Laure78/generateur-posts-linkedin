import { NextResponse } from 'next/server';
import { getAppProfile } from '@/lib/auth/profile';

export async function GET(request: Request) {
  const profile = await getAppProfile(request);
  if (!profile) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }
  return NextResponse.json({ profile });
}
