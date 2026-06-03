import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { DEV_BYPASS } from '@/lib/dev/config';
import { getDevSession } from '@/lib/dev/session';
import { getDevProfile } from '@/lib/dev/local-profiles';
import { getSupabasePublicEnv } from '@/lib/supabase/env';
import { parseBeworkRole, type BeworkRole } from '@/lib/bework/roles';
import { getBearerToken, getUserFromBearerToken } from './bearer';
import type { AppUser } from './get-user';

export type AppProfile = AppUser & {
  role: BeworkRole;
  company_name: string | null;
};

async function loadProfileRow(userId: string, accessToken?: string): Promise<{
  role: BeworkRole;
  company_name: string | null;
}> {
  const { url, key } = getSupabasePublicEnv();
  const supabase = accessToken
    ? createClient(url, key, {
        global: { headers: { Authorization: `Bearer ${accessToken}` } },
      })
    : await createServerClient();

  const { data } = await supabase
    .from('profiles')
    .select('role, company_name')
    .eq('id', userId)
    .maybeSingle();

  return {
    role: parseBeworkRole(data?.role as string | undefined),
    company_name: (data?.company_name as string | null) ?? null,
  };
}

export async function getAppProfile(request?: Request): Promise<AppProfile | null> {
  const bearer = getBearerToken(request);
  if (bearer) {
    const user = await getUserFromBearerToken(bearer);
    if (!user) return null;
    const row = await loadProfileRow(user.id, bearer);
    return {
      id: user.id,
      email: user.email ?? '',
      role: row.role,
      company_name: row.company_name,
    };
  }

  if (DEV_BYPASS) {
    const dev = await getDevSession();
    if (!dev) return null;
    const profile = await getDevProfile(dev.userId, dev.email);
    return {
      id: dev.userId,
      email: dev.email,
      role: profile.role,
      company_name: profile.company_name,
    };
  }

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const row = await loadProfileRow(user.id);
  return {
    id: user.id,
    email: user.email ?? '',
    role: row.role,
    company_name: row.company_name,
  };
}

export async function requireAppProfile(request?: Request): Promise<AppProfile> {
  const profile = await getAppProfile(request);
  if (!profile) {
    throw new Error('UNAUTHENTICATED');
  }
  return profile;
}
