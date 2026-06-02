import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Configuration Supabase manquante sur le serveur.' },
      { status: 503 }
    );
  }

  const { password } = (await request.json()) as { password?: string };

  if (!password || password.length < 6) {
    return NextResponse.json({ error: 'Mot de passe : 6 caractères minimum' }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Lien expiré ou invalide. Redemandez un email de réinitialisation.' },
      { status: 401 }
    );
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
