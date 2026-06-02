import { redirect } from 'next/navigation';
import { PlatformSidebar } from '@/components/platform/PlatformSidebar';
import { getAppUser } from '@/lib/auth/get-user';

export const dynamic = 'force-dynamic';

export default async function PlateformeLayout({ children }: { children: React.ReactNode }) {
  const user = await getAppUser();
  if (!user) {
    redirect('/auth/connexion?next=/plateforme');
  }

  return (
    <div className="flex min-h-screen">
      <PlatformSidebar />
      <main className="platform-main min-w-0 flex-1">{children}</main>
    </div>
  );
}
