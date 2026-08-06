import type { Metadata } from 'next';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { BeWorkFooter } from '@/components/brand/BeWorkFooter';
import { PlatformSidebarGate } from '@/components/platform/PlatformSidebarGate';
import { PerimetreFirstVisitGate } from '@/components/platform/PerimetreFirstVisitGate';
import { getAppUser } from '@/lib/auth/get-user';
import { NOINDEX_FOLLOW } from '@/lib/bework/seo';

export const metadata: Metadata = NOINDEX_FOLLOW;

function SidebarFallback() {
  return (
    <aside
      className="flex h-full w-[17.5rem] shrink-0 flex-col overflow-hidden border-r border-[#E2E8F0] bg-white"
      aria-hidden
    >
      <div className="h-16 animate-pulse border-b border-[#E2E8F0] bg-[#F8FAFC]" />
      <div className="space-y-2 p-3">
        <div className="h-9 animate-pulse rounded-lg bg-[#F8FAFC]" />
        <div className="mt-4 space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 animate-pulse rounded-lg bg-[#F8FAFC]" />
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
        <PerimetreFirstVisitGate />
        <div className="flex-1">{children}</div>
        <BeWorkFooter compact />
      </main>
    </div>
  );
}
