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

const NAV = [
  { href: '/plateforme', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/plateforme/demandes/nouvelle', label: 'Nouvelle demande', icon: PlusCircle },
  { href: '/plateforme/outils/verification-dtu', label: 'Vérification DTU', icon: Wrench },
];

export function PlatformSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-5">
        <Link href="/plateforme" className="font-display text-xl font-bold text-slate-900">
          {BEWORK.name}
        </Link>
        <p className="mt-1 text-xs text-slate-500 leading-snug">{BEWORK.tagline}</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/plateforme' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? 'bg-blue-50 text-[var(--bework-blue)]' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-200 p-3 space-y-1">
        <a
          href={BEWORK.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          <ExternalLink size={18} />
          Site bework.fr
        </a>
        <form action="/auth/deconnexion" method="post">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  );
}
