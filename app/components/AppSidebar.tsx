'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Sparkles,
  FileEdit,
  Lightbulb,
  Eye,
  Newspaper,
  LayoutGrid,
  Calendar,
  BookOpen,
  User,
  BarChart2,
  MessageCircle,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Zap,
  Layers,
  Bot,
  PenLine,
} from 'lucide-react';

const LINKEDIN_URL = 'https://www.linkedin.com/in/laure-olivie/';

const BLUE = '#377CF3';
const BLUE_HOVER = '#2d6ad4';

const nav = [
  {
    title: 'CRÉER',
    items: [
      { href: '/outil/generateur', label: 'Générer un post', Icon: Sparkles },
      { href: '/outil/ghostwriter', label: 'Ghostwriter', Icon: PenLine },
      { href: '/outil/editeur', label: 'Éditeur', Icon: FileEdit },
      { href: '/outil/contenu-avance', label: 'Hooks & contenu', Icon: Zap },
      { href: '/outil/structures', label: 'Structures', Icon: Layers },
    ],
  },
  {
    title: 'INSPIRATION',
    items: [
      { href: '/outil/idees', label: 'Idées', Icon: Lightbulb },
      { href: '/outil/inspirations', label: 'Inspirations', Icon: Eye },
      { href: '/outil/veille', label: 'Veille', Icon: Newspaper },
    ],
  },
  {
    title: 'ORGANISER',
    items: [
      { href: '/outil/mes-posts', label: 'Mes posts', Icon: LayoutGrid },
      { href: '/outil/calendrier', label: 'Calendrier', Icon: Calendar },
    ],
  },
  {
    title: 'CROISSANCE',
    items: [
      { href: '/outil/copilote', label: 'Copilote', Icon: Bot },
      { href: '/outil/croissance', label: 'Growth', Icon: Rocket },
      { href: '/outil/metriques', label: 'Métriques', Icon: BarChart2 },
      { href: '/outil/engagement', label: 'Engagement', Icon: MessageCircle },
    ],
  },
  {
    title: 'PARAMÈTRES',
    items: [
      { href: '/outil/base-connaissance', label: 'Ma base', Icon: BookOpen },
      { href: '/outil/comptes', label: 'Comptes', Icon: User },
    ],
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col border-r border-neutral-200 bg-white shadow-sm transition-all duration-200 ${
        collapsed ? 'w-[72px]' : 'w-[240px]'
      }`}
    >
      <div className="flex h-14 items-center justify-between border-b border-neutral-200 px-4">
        <Link href="/outil" className="flex items-center gap-2 font-bold text-neutral-800">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white text-sm font-semibold"
            style={{ backgroundColor: BLUE }}
          >
            LO
          </span>
          {!collapsed && <span>Créateur</span>}
        </Link>
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
          aria-label={collapsed ? 'Ouvrir le menu' : 'Réduire le menu'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {nav.map((section) => (
          <div key={section.title} className="mb-6">
            {!collapsed && (
              <p className="mb-2 px-4 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.Icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={item.label}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all rounded-lg mx-2 ${
                        isActive
                          ? 'font-semibold'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                      style={
                        isActive
                          ? { backgroundColor: 'rgba(55, 124, 243, 0.08)', color: BLUE }
                          : undefined
                      }
                    >
                      <Icon
                        size={20}
                        strokeWidth={2}
                        className="shrink-0"
                        style={isActive ? { color: BLUE } : undefined}
                      />
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
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: BLUE }}
            >
              <Linkedin size={18} />
              Voir mon LinkedIn
            </a>
            <button
              type="button"
              className="w-full rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors"
              style={{
                borderColor: 'rgba(55, 124, 243, 0.25)',
                color: BLUE,
                backgroundColor: 'rgba(55, 124, 243, 0.05)',
              }}
            >
              Mise à niveau
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
