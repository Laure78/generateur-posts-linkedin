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

  let data;
  try {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { company_name },
        emailRedirectTo: `${siteUrl}/auth/connexion?next=/plateforme`,
      },
    });
    data = result.data;
    if (result.error) {
      const msg = result.error.message || '';
      if (/fetch failed|failed to fetch|network/i.test(msg)) {
        return NextResponse.json(
          {
            error:
              'Impossible de joindre Supabase depuis le serveur. Vérifiez que le projet Supabase est actif et que NEXT_PUBLIC_SUPABASE_URL est correct dans Railway.',
          },
          { status: 503 }
        );
      }
      return NextResponse.json({ error: msg }, { status: 400 });
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Erreur serveur';
    return NextResponse.json(
      {
        error: /fetch failed|failed to fetch/i.test(msg)
          ? 'Connexion à Supabase impossible. Projet en pause ou URL incorrecte dans Railway.'
          : msg,
      },
      { status: 503 }
    );
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
