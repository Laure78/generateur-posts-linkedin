'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BookOpen, GraduationCap, LayoutDashboard, PlusCircle, ExternalLink, Shield, Search, Route } from 'lucide-react';
import { BEWORK } from '@/lib/bework/config';
import { getMissionIcon } from '@/lib/bework/mission-icons';
import { BeWorkLogo } from '@/components/brand/BeWorkLogo';
import { getSidebarAssistantGroups } from '@/lib/skills/sidebar-nav';
import { LogoutButton } from '@/components/platform/LogoutButton';

function normalizeSidebarQuery(q: string): string {
  return q.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

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

type PlatformSidebarProps = {
  showAdminLink?: boolean;
};

export function PlatformSidebar({ showAdminLink = false }: PlatformSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const [sidebarQuery, setSidebarQuery] = useState('');

  const assistantGroups = useMemo(() => {
    const groups = getSidebarAssistantGroups();
    const q = normalizeSidebarQuery(sidebarQuery.trim());
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (item) =>
            normalizeSidebarQuery(item.label).includes(q) ||
            normalizeSidebarQuery(item.missionType).includes(q)
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [sidebarQuery]);

  const dashboardActive = pathname === '/plateforme';
  const adminActive = pathname.startsWith('/plateforme/admin');
  const ressourcesActive = pathname.startsWith('/plateforme/ressources');
  const modeOperatoireActive = pathname.startsWith('/plateforme/mode-operatoire');
  const lexiqueActive = pathname.startsWith('/lexique');
  const nouvellePath = '/plateforme/demandes/nouvelle';

  return (
    <aside className="relative z-20 flex h-full max-h-full w-[17.5rem] shrink-0 flex-col overflow-hidden border-r border-slate-200/80 bg-white">
      <div className="shrink-0 border-b border-slate-100 px-4 py-4">
        <BeWorkLogo variant="sidebar" href="/plateforme" />
        <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--bework-blue)]">
          Assistants travaux
        </p>
        <p className="text-[0.65rem] leading-snug text-slate-500">
          {BEWORK.scopeLine}
        </p>
      </div>

      <div className="shrink-0 p-3">
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

      <nav className="flex min-h-0 flex-1 flex-col overflow-hidden px-3">
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

        <Link
          href="/plateforme/mode-operatoire"
          onClick={(e) => navigateClick(e, router, '/plateforme/mode-operatoire')}
          className={`mb-2 flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            modeOperatoireActive
              ? 'bg-[var(--bework-blue-soft)] text-[var(--bework-blue)]'
              : 'text-slate-600 hover:bg-slate-50 hover:text-[var(--bework-navy)]'
          }`}
        >
          <Route size={18} strokeWidth={modeOperatoireActive ? 2.25 : 2} />
          Mode opératoire
        </Link>

        <Link
          href="/plateforme/ressources"
          onClick={(e) => navigateClick(e, router, '/plateforme/ressources')}
          className={`mb-2 flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            ressourcesActive
              ? 'bg-[var(--bework-blue-soft)] text-[var(--bework-blue)]'
              : 'text-slate-600 hover:bg-slate-50 hover:text-[var(--bework-navy)]'
          }`}
        >
          <BookOpen size={18} strokeWidth={ressourcesActive ? 2.25 : 2} />
          Ressources
        </Link>

        <Link
          href="/lexique"
          onClick={(e) => navigateClick(e, router, '/lexique')}
          className={`mb-2 flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            lexiqueActive
              ? 'bg-[var(--bework-blue-soft)] text-[var(--bework-blue)]'
              : 'text-slate-600 hover:bg-slate-50 hover:text-[var(--bework-navy)]'
          }`}
        >
          <GraduationCap size={18} strokeWidth={lexiqueActive ? 2.25 : 2} />
          Lexique BTP
        </Link>

        {showAdminLink && (
          <Link
            href="/plateforme/admin"
            onClick={(e) => navigateClick(e, router, '/plateforme/admin')}
            className={`mb-2 flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              adminActive
                ? 'bg-red-50 text-red-800 ring-1 ring-red-200/80'
                : 'text-slate-600 hover:bg-red-50/50 hover:text-red-900'
            }`}
          >
            <Shield size={18} strokeWidth={adminActive ? 2.25 : 2} />
            Administration
          </Link>
        )}

        <div
          className="-mx-1 min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-1 pb-2 [scrollbar-gutter:stable]"
          aria-label="Liste des assistants métier BTP"
        >
          <p className="px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400">
            Assistants — marchés publics &amp; privés
          </p>

          <div className="relative mb-2 px-2">
            <Search
              size={14}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden
            />
            <input
              type="search"
              value={sidebarQuery}
              onChange={(e) => setSidebarQuery(e.target.value)}
              placeholder="Filtrer…"
              className="w-full rounded-lg border border-slate-200 py-2 pl-8 pr-2 text-xs text-slate-700 placeholder:text-slate-400 focus:border-[var(--bework-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--bework-blue)]/30"
              aria-label="Filtrer les assistants"
            />
          </div>

          {assistantGroups.length === 0 && sidebarQuery.trim() && (
            <p className="px-3 py-2 text-xs text-slate-500">Aucun assistant pour cette recherche.</p>
          )}

          {assistantGroups.map(({ category, items }) => (
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

      <div className="shrink-0 space-y-0.5 border-t border-slate-100 bg-white p-3">
        <a
          href={BEWORK.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700"
        >
          <ExternalLink size={17} />
          bework.fr
        </a>
        <LogoutButton />
      </div>
    </aside>
  );
}
