import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { PlatformSidebar } from '@/components/platform/PlatformSidebar';

export const dynamic = 'force-dynamic';

export default async function PlateformeLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/connexion?next=/plateforme');
  }

  return (
    <div className="flex min-h-screen">
      <PlatformSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
