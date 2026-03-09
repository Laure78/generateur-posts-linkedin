'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTeam } from '@/lib/TeamContext';
import {
  Sparkles,
  Lightbulb,
  Eye,
  Newspaper,
  LayoutGrid,
  BookOpen,
  User,
  BarChart2,
  MessageSquareReply,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Zap,
  Layers,
  PenLine,
  Menu,
  X,
  Bot,
} from 'lucide-react';

const LINKEDIN_URL = 'https://www.linkedin.com/in/laure-olivie/';
const BLUE = '#377CF3';

const SECTIONS = [
  {
    id: 'create',
    title: 'Créer',
    defaultOpen: true,
    items: [
      { href: '/outil/autopilot', label: 'Autopilot LinkedIn', Icon: Bot },
      { href: '/outil/generateur', label: 'Générer un post', Icon: Sparkles },
      { href: '/outil/ghostwriter', label: 'Ghostwriter', Icon: PenLine },
      { href: '/outil/contenu-avance', label: 'Hooks', Icon: Zap },
      { href: '/outil/structures', label: 'Structures', Icon: Layers },
    ],
  },
  {
    id: 'inspire',
    title: 'Inspirer',
    defaultOpen: true,
    items: [
      { href: '/outil/idees', label: 'Idées', Icon: Lightbulb },
      { href: '/outil/inspirations', label: 'Inspirations', Icon: Eye },
      { href: '/outil/veille', label: 'Veille', Icon: Newspaper },
    ],
  },
  {
    id: 'manage',
    title: 'Gérer',
    defaultOpen: true,
    items: [
      { href: '/outil/mes-posts', label: 'Mes posts', Icon: LayoutGrid },
      { href: '/outil/base-connaissance', label: 'Ma base', Icon: BookOpen },
    ],
  },
  {
    id: 'growth',
    title: 'Croissance',
    defaultOpen: true,
    items: [
      { href: '/outil/repondre-commentaires', label: 'Répondre aux commentaires', Icon: MessageSquareReply },
      { href: '/outil/croissance', label: 'Growth', Icon: Rocket },
      { href: '/outil/metriques', label: 'Métriques', Icon: BarChart2 },
    ],
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sectionOpen, setSectionOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(SECTIONS.map((s) => [s.id, s.defaultOpen]))
  );
  const { isPreviewMode, role } = useTeam();

  const toggleSection = (id: string) => {
    setSectionOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const SidebarContent = () => (
    <>
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 px-4">
        <Link href="/outil" className="flex items-center gap-2 font-bold text-neutral-800">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white text-sm font-semibold"
            style={{ backgroundColor: BLUE }}
          >
            LO
          </span>
          {!collapsed && <span className="truncate">Créateur</span>}
        </Link>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors lg:block"
            aria-label={collapsed ? 'Ouvrir le menu' : 'Réduire le menu'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 lg:hidden"
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {isPreviewMode && !collapsed && (
        <div className="mx-2 mb-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
          <p className="text-xs font-medium text-amber-800">
            Mode test : {role === 'lecteur' ? 'Lecteur' : 'Éditeur'}
          </p>
          <Link
            href="/outil/comptes"
            className="mt-1 block text-xs text-amber-700 hover:underline"
          >
            Revenir en Propriétaire →
          </Link>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-4">
        {SECTIONS.map((section) => (
          <div key={section.id} className="mb-4">
            {!collapsed ? (
              <>
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 hover:text-neutral-600"
                >
                  {section.title}
                  <ChevronRight
                    size={14}
                    className={`transition-transform ${sectionOpen[section.id] ? 'rotate-90' : ''}`}
                  />
                </button>
                {sectionOpen[section.id] && (
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
                              isActive ? 'font-semibold' : 'text-neutral-600 hover:text-neutral-900'
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
                            <span className="truncate">{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            ) : (
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.Icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        title={item.label}
                        className={`flex justify-center p-2.5 rounded-lg mx-2 transition-all ${
                          isActive ? 'font-semibold' : 'text-neutral-600 hover:text-neutral-900'
                        }`}
                        style={
                          isActive
                            ? { backgroundColor: 'rgba(55, 124, 243, 0.08)', color: BLUE }
                            : undefined
                        }
                      >
                        <Icon size={20} strokeWidth={2} style={isActive ? { color: BLUE } : undefined} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>

      <div className="border-t border-neutral-200 p-4">
        {!collapsed && (
          <>
            <Link
              href="/outil/comptes"
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm mb-3 ${
                pathname === '/outil/comptes' ? 'font-semibold' : 'text-neutral-600 hover:text-neutral-900'
              }`}
              style={
                pathname === '/outil/comptes'
                  ? { backgroundColor: 'rgba(55, 124, 243, 0.08)', color: BLUE }
                  : undefined
              }
            >
              <User size={20} />
              <span>Comptes</span>
            </Link>
            <p className="mb-2 text-xs text-neutral-500">4 Posts restants</p>
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
    </>
  );

  return (
    <>
      {/* Mobile menu button - shown when sidebar closed */}
      {!mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-neutral-200 shadow-sm lg:hidden"
          aria-label="Ouvrir le menu"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - desktop: persistent, mobile: slide-over */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-neutral-200 bg-white shadow-xl transition-transform duration-200 lg:relative lg:z-auto lg:shadow-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          collapsed ? 'lg:w-[72px]' : 'lg:w-[256px]'
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
