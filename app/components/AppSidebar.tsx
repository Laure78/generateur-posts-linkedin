'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const LINKEDIN_URL = 'https://www.linkedin.com/in/laure-olivie/';

const nav = [
  {
    title: 'CRÉER',
    items: [
      { href: '/outil/generateur', label: 'Générateur', icon: '＋' },
      { href: '/outil/editeur', label: 'Éditeur', icon: '✎' },
      { href: '/outil/accroches', label: 'Accroches', icon: '♪' },
    ],
  },
  {
    title: 'DÉCOUVRIR',
    items: [
      { href: '/outil/idees', label: 'Idées', icon: '💡' },
      { href: '/outil/inspirations', label: 'Inspirations', icon: '👁' },
      { href: '/outil/veille', label: 'Veille', icon: '📰' },
    ],
  },
  {
    title: 'GÉRER',
    items: [
      { href: '/outil/mes-posts', label: 'Mes posts', icon: '▦' },
      { href: '/outil/calendrier', label: 'Calendrier', icon: '📅' },
      { href: '/outil/base-connaissance', label: 'Base de connaissance', icon: '📚' },
      { href: '/outil/comptes', label: 'Comptes', icon: '👤' },
    ],
  },
  {
    title: 'SUIVRE',
    items: [
      { href: '/outil/metriques', label: 'Métriques', icon: '📈' },
      { href: '/outil/engagement', label: 'Engagement', icon: '💬' },
    ],
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col border-r border-neutral-200 bg-white transition-all duration-200 ${
        collapsed ? 'w-[72px]' : 'w-[240px]'
      }`}
    >
      <div className="flex h-14 items-center justify-between border-b border-neutral-200 px-4">
        <Link href="/outil" className="flex items-center gap-2 font-bold text-neutral-800">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-white text-sm">
            LO
          </span>
          {!collapsed && <span>Créateur</span>}
        </Link>
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="rounded p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
          aria-label={collapsed ? 'Ouvrir le menu' : 'Réduire le menu'}
        >
          <span className="text-sm">{collapsed ? '»' : '«'}</span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {nav.map((section) => (
          <div key={section.title} className="mb-6">
            {!collapsed && (
              <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        isActive
                          ? 'bg-violet-100 font-semibold text-violet-700'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                      } ${collapsed ? 'justify-center px-0' : ''}`}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base">
                        {item.icon}
                      </span>
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-neutral-200 p-4">
        {!collapsed && (
          <>
            <p className="mb-2 text-sm text-neutral-500">4 Posts restants</p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Voir mon LinkedIn
            </a>
            <button
              type="button"
              className="w-full rounded-xl border border-violet-300 bg-violet-50 px-4 py-2.5 text-sm font-semibold text-violet-700 hover:bg-violet-100"
            >
              Mise à niveau
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
