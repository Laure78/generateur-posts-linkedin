import { NextResponse } from 'next/server';
import { isSupabaseConfigured, getSupabasePublicEnv } from '@/lib/supabase/env';

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, reason: 'missing_env' });
  }

  try {
    const { url, key } = getSupabasePublicEnv();
    const res = await fetch(`${url}/auth/v1/health`, {
      headers: { apikey: key },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      return NextResponse.json({
        ok: false,
        reason: 'supabase_unreachable',
        status: res.status,
      });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, reason: 'supabase_unreachable' });
  }
}
