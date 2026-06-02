import { createClient } from '@/lib/supabase/server';
import { DEV_BYPASS } from '@/lib/dev/config';
import { getDevSession } from '@/lib/dev/session';

export type AppUser = { id: string; email: string };

export async function getAppUser(): Promise<AppUser | null> {
  if (DEV_BYPASS) {
    const dev = await getDevSession();
    if (dev) return { id: dev.userId, email: dev.email };
    return null;
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return { id: user.id, email: user.email ?? '' };
}
