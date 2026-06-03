import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getSiteUrl } from '@/lib/bework/site-url';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Configuration Supabase manquante sur le serveur.' },
      { status: 503 }
    );
  }

  const body = (await request.json()) as {
    email?: string;
    password?: string;
    company_name?: string;
  };

  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? '';
  const company_name = body.company_name?.trim() ?? '';

  if (!email || !password) {
    return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: 'Mot de passe : 6 caractères minimum' }, { status: 400 });
  }

  const supabase = await createClient();
  const siteUrl = getSiteUrl();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { company_name },
      emailRedirectTo: `${siteUrl}/auth/connexion?next=/plateforme`,
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (data.user) {
    const admin = createAdminClient();
    const db = admin ?? supabase;
    const { error: profileErr } = await db.from('profiles').upsert({
      id: data.user.id,
      email,
      company_name: company_name || null,
      role: 'beworker',
    });
    if (profileErr) {
      console.error('profiles upsert:', profileErr.message);
    }
  }

  if (data.session) {
    return NextResponse.json({ ok: true, needsEmailConfirmation: false });
  }

  return NextResponse.json({
    ok: true,
    needsEmailConfirmation: true,
    message:
      'Compte créé. Consultez votre boîte mail pour confirmer votre adresse, puis connectez-vous.',
  });
}
