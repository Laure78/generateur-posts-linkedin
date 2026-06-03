import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { BeWorkFooter } from '@/components/brand/BeWorkFooter';
import { PlatformSidebar } from '@/components/platform/PlatformSidebar';
import { getAppUser } from '@/lib/auth/get-user';

function SidebarFallback() {
  return (
    <aside className="w-[17.5rem] shrink-0 border-r border-slate-200/80 bg-white" aria-hidden>
      <div className="h-16 animate-pulse border-b border-slate-100 bg-slate-50" />
      <div className="space-y-2 p-3">
        <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
        <div className="h-9 animate-pulse rounded-lg bg-slate-50" />
        <div className="mt-4 space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 animate-pulse rounded-lg bg-slate-50" />
          ))}
        </div>
      </div>
    </aside>
  );
}

export const dynamic = 'force-dynamic';

export default async function PlateformeLayout({ children }: { children: React.ReactNode }) {
  const user = await getAppUser();
  if (!user) {
    redirect('/auth/connexion?next=/plateforme');
  }

  return (
    <div className="flex min-h-screen">
      <Suspense fallback={<SidebarFallback />}>
        <PlatformSidebar />
      </Suspense>
      <main className="platform-main relative z-0 flex min-h-screen min-w-0 flex-1 flex-col">
        <div className="flex-1">{children}</div>
        <BeWorkFooter compact />
      </main>
    </div>
  );
}
