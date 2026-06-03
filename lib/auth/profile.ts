import { createClient } from '@/lib/supabase/server';
import { DEV_BYPASS } from '@/lib/dev/config';
import { getDevSession } from '@/lib/dev/session';
import { getDevProfile } from '@/lib/dev/local-profiles';
import { parseBeworkRole, type BeworkRole } from '@/lib/bework/roles';
import type { AppUser } from './get-user';

export type AppProfile = AppUser & {
  role: BeworkRole;
  company_name: string | null;
};

export async function getAppProfile(): Promise<AppProfile | null> {
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

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('profiles')
    .select('role, company_name')
    .eq('id', user.id)
    .maybeSingle();

  return {
    id: user.id,
    email: user.email ?? '',
    role: parseBeworkRole(data?.role as string | undefined),
    company_name: (data?.company_name as string | null) ?? null,
  };
}

export async function requireAppProfile(): Promise<AppProfile> {
  const profile = await getAppProfile();
  if (!profile) {
    throw new Error('UNAUTHENTICATED');
  }
  return profile;
}
