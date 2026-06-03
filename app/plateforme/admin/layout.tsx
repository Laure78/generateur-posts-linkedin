import { redirect } from 'next/navigation';
import { getAppProfile } from '@/lib/auth/profile';
import { canAccessAdminPlatform } from '@/lib/bework/roles';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await getAppProfile();
  if (!profile) {
    redirect('/auth/connexion?next=/plateforme/admin');
  }
  if (!canAccessAdminPlatform(profile.role)) {
    redirect('/plateforme');
  }

  return <>{children}</>;
}
