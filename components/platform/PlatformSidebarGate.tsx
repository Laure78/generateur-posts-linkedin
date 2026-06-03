import { getAppProfile } from '@/lib/auth/profile';
import { canAccessAdminPlatform } from '@/lib/bework/roles';
import { PlatformSidebar } from './PlatformSidebar';

export async function PlatformSidebarGate() {
  const profile = await getAppProfile();
  return <PlatformSidebar showAdminLink={profile ? canAccessAdminPlatform(profile.role) : false} />;
}
