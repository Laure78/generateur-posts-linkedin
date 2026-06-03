'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LayoutDashboard, PlusCircle, ExternalLink, LogOut } from 'lucide-react';
import { BEWORK } from '@/lib/bework/config';
import { getMissionIcon } from '@/lib/bework/mission-icons';
import { BeWorkLogo } from '@/components/brand/BeWorkLogo';
import { getSidebarAssistantGroups } from '@/lib/skills/sidebar-nav';

const ASSISTANT_GROUPS = getSidebarAssistantGroups();

function isAssistantActive(
  pathname: string,
  typeParam: string | null,
  href: string,
  missionType: string,
  integrated: boolean
): boolean {
  if (integrated) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  if (pathname.startsWith('/plateforme/demandes/nouvelle')) {
    return typeParam === missionType;
  }
  return false;
}

function navigateClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  router: ReturnType<typeof useRouter>,
  href: string
) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  e.preventDefault();
  router.push(href);
}

export function PlatformSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');

  const dashboardActive = pathname === '/plateforme';
  const nouvellePath = '/plateforme/demandes/nouvelle';

  return (
    <aside className="relative z-20 flex w-[17.5rem] shrink-0 flex-col border-r border-slate-200/80 bg-white">
      <div className="border-b border-slate-100 px-4 py-4">
        <BeWorkLogo variant="sidebar" href="/plateforme" />
      </div>

      <div className="p-3">
        <Link
          href={nouvellePath}
          onClick={(e) => navigateClick(e, router, nouvellePath)}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
            pathname.startsWith(nouvellePath) && !typeParam
              ? 'bework-btn-primary shadow-md'
              : 'bework-btn-primary'
          }`}
        >
          <PlusCircle size={18} />
          Nouvelle demande
        </Link>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col px-3">
        <Link
          href="/plateforme"
          onClick={(e) => navigateClick(e, router, '/plateforme')}
          className={`mb-2 flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            dashboardActive
              ? 'bg-[var(--bework-blue-soft)] text-[var(--bework-blue)]'
              : 'text-slate-600 hover:bg-slate-50 hover:text-[var(--bework-navy)]'
          }`}
        >
          <LayoutDashboard size={18} strokeWidth={dashboardActive ? 2.25 : 2} />
          Tableau de bord
        </Link>

        <div className="-mx-1 min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-1 pb-2">
          <p className="px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400">
            Assistants
          </p>

          {ASSISTANT_GROUPS.map(({ category, items }) => (
            <div key={category.id} className="mb-3">
              <p className="px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-slate-400">
                {category.label}
              </p>
              <ul className="space-y-0.5">
                {items.map(({ missionType, label, href, integrated }) => {
                  const active = isAssistantActive(
                    pathname,
                    typeParam,
                    href,
                    missionType,
                    integrated
                  );
                  const Icon = getMissionIcon(missionType);
                  return (
                    <li key={missionType}>
                      <Link
                        href={href}
                        onClick={(e) => navigateClick(e, router, href)}
                        title={label}
                        className={`relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                          active
                            ? 'bg-[var(--bework-blue-soft)] text-[var(--bework-blue)]'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-[var(--bework-navy)]'
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            active
                              ? 'bg-white text-[var(--bework-blue)] ring-1 ring-[var(--bework-blue)]/20'
                              : 'bg-slate-50 text-[var(--bework-blue)]'
                          }`}
                          aria-hidden
                        >
                          <Icon size={16} strokeWidth={2} />
                        </span>
                        <span className="line-clamp-2 leading-snug">{label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      <div className="space-y-0.5 border-t border-slate-100 p-3">
        <a
          href={BEWORK.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700"
        >
          <ExternalLink size={17} />
          bework.fr
        </a>
        <form action="/auth/deconnexion" method="post">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700"
          >
            <LogOut size={17} />
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  );
}
