import { NextResponse, type NextRequest } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');
  const next = requestUrl.searchParams.get('next') ?? '/plateforme';
  const origin = requestUrl.origin;

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/auth/connexion?error=config`);
  }

  if (!code && !(token_hash && type)) {
    return NextResponse.redirect(`${origin}/auth/connexion?error=auth_callback`);
  }

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(`${origin}/auth/connexion?error=auth_callback`);
    }
  } else if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type: type as EmailOtpType,
      token_hash,
    });
    if (error) {
      return NextResponse.redirect(`${origin}/auth/connexion?error=auth_callback`);
    }
  }

  const safeNext = next.startsWith('/') ? next : '/plateforme';
  return NextResponse.redirect(`${origin}${safeNext}`);
}
