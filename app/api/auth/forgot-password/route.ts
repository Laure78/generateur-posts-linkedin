import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSiteUrl } from '@/lib/bework/site-url';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Configuration Supabase manquante sur le serveur.' },
      { status: 503 }
    );
  }

  const { email } = (await request.json()) as { email?: string };
  const normalized = email?.trim().toLowerCase();

  if (!normalized) {
    return NextResponse.json({ error: 'Email requis' }, { status: 400 });
  }

  const siteUrl = getSiteUrl();
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(normalized, {
    redirectTo: `${siteUrl}/auth/callback?next=/auth/nouveau-mot-de-passe`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message:
      'Si un compte existe avec cet email, vous recevrez un lien pour réinitialiser votre mot de passe.',
  });
}
