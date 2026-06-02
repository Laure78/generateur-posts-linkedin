import { NextRequest, NextResponse } from 'next/server';
import { DEV_BYPASS } from '@/lib/dev/config';
import { devUserIdFromEmail } from '@/lib/dev/session';

export async function POST(request: NextRequest) {
  if (!DEV_BYPASS) {
    return NextResponse.json({ error: 'Mode dev désactivé' }, { status: 403 });
  }

  const form = await request.formData();
  const email = String(form.get('email') || 'demo@bework.fr').trim();
  const next = String(form.get('next') || '/plateforme');

  const session = encodeURIComponent(
    JSON.stringify({ email, userId: devUserIdFromEmail(email) })
  );

  const url = request.nextUrl.clone();
  url.pathname = next.startsWith('/') ? next : '/plateforme';
  url.search = '';

  const res = NextResponse.redirect(url);
  res.cookies.set('bework_dev_session', session, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
