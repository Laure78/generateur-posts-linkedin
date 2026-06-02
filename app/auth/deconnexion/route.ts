import { NextRequest, NextResponse } from 'next/server';
import { DEV_BYPASS } from '@/lib/dev/config';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  if (!DEV_BYPASS) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  const url = request.nextUrl.clone();
  url.pathname = '/';
  const res = NextResponse.redirect(url);
  res.cookies.delete('bework_dev_session');
  return res;
}
