import { createClient } from '@supabase/supabase-js';
import { getSupabasePublicEnv } from '@/lib/supabase/env';
import type { User } from '@supabase/supabase-js';

export function getBearerToken(request?: Request): string | null {
  if (!request) return null;
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  const token = auth.slice(7).trim();
  return token || null;
}

/** Valide un JWT Supabase (app mobile, API externes). */
export async function getUserFromBearerToken(token: string): Promise<User | null> {
  const { url, key } = getSupabasePublicEnv();
  const supabase = createClient(url, key);
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}
