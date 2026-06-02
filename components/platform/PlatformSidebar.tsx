'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  PlusCircle,
  Wrench,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { BEWORK } from '@/lib/bework/config';
import { BeWorkLogo } from '@/components/brand/BeWorkLogo';

const NAV = [
  { href: '/plateforme', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/plateforme/outils/verification-dtu', label: 'Vérification DTU', icon: Wrench },
];

export function PlatformSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[17.5rem] shrink-0 flex-col border-r border-slate-200/80 bg-white">
      <div className="border-b border-slate-100 px-4 py-4">
        <BeWorkLogo variant="sidebar" href="/plateforme" />
      </div>

      <div className="p-3">
        <Link
          href="/plateforme/demandes/nouvelle"
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
            pathname.startsWith('/plateforme/demandes/nouvelle')
              ? 'bework-btn-primary shadow-md'
              : 'bework-btn-primary'
          }`}
        >
          <PlusCircle size={18} />
          Nouvelle demande
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? 'bg-[var(--bework-blue-soft)] text-[var(--bework-blue)]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-[var(--bework-navy)]'
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.25 : 2} />
              {label}
            </Link>
          );
        })}
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
