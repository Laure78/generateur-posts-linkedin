import { NextRequest, NextResponse } from 'next/server';
import { DEV_BYPASS } from '@/lib/dev/config';
import { signOutRouteHandler } from '@/lib/supabase/route-handler';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export const dynamic = 'force-dynamic';

function clearDevSessionCookie(response: NextResponse) {
  response.cookies.set('bework_dev_session', '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export async function POST(request: NextRequest) {
  const loginUrl = new URL('/auth/connexion', request.url);
  loginUrl.searchParams.set('deconnecte', '1');

  const response = NextResponse.redirect(loginUrl);

  if (!DEV_BYPASS && isSupabaseConfigured()) {
    await signOutRouteHandler(request, response);
  }

  clearDevSessionCookie(response);
  return response;
}

/** Repli si un lien GET est utilisé par erreur. */
export async function GET(request: NextRequest) {
  return POST(request);
}
