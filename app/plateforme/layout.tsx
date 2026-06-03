import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { BeWorkFooter } from '@/components/brand/BeWorkFooter';
import { InternalUseNotice } from '@/components/brand/InternalUseNotice';
import { TeamLeaderValidationAlert } from '@/components/brand/TeamLeaderValidationAlert';
import { PlatformSidebarGate } from '@/components/platform/PlatformSidebarGate';
import { getAppUser } from '@/lib/auth/get-user';

function SidebarFallback() {
  return (
    <aside
      className="flex h-full w-[17.5rem] shrink-0 flex-col overflow-hidden border-r border-slate-200/80 bg-white"
      aria-hidden
    >
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
    <div className="flex h-dvh max-h-dvh overflow-hidden">
      <Suspense fallback={<SidebarFallback />}>
        <PlatformSidebarGate />
      </Suspense>
      <main className="platform-main relative z-0 flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overscroll-y-contain">
        <div className="space-y-2 border-b border-amber-100/80 bg-amber-50/50 px-4 py-2 lg:px-6">
          <InternalUseNotice variant="short" className="mx-auto max-w-5xl border-0 bg-transparent px-0 py-0" />
          <TeamLeaderValidationAlert compact className="mx-auto max-w-5xl" />
        </div>
        <div className="flex-1">{children}</div>
        <BeWorkFooter compact />
      </main>
    </div>
  );
}
