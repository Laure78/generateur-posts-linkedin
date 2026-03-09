'use client';

import Link from 'next/link';
import { Sparkles, Zap, Lightbulb } from 'lucide-react';
import { useCommandPalette } from '@/lib/CommandPaletteContext';

const QUICK_ACTIONS = [
  { href: '/outil/generateur', label: 'Nouveau post', Icon: Sparkles },
  { href: '/outil/contenu-avance', label: 'Générer des hooks', Icon: Zap },
  { href: '/outil/idees', label: 'Générer des idées', Icon: Lightbulb },
];

export default function TopActionBar() {
  const { toggle } = useCommandPalette();
  return (
    <div className="flex h-14 shrink-0 items-center gap-2 border-b border-neutral-200 bg-white px-4 pl-16 md:pl-4 md:gap-4">
      {QUICK_ACTIONS.map((item) => {
        const Icon = item.Icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 md:px-4"
          >
            <Icon size={18} />
            <span className="hidden sm:inline">{item.label}</span>
          </Link>
        );
      })}
      <button
        type="button"
        onClick={toggle}
        className="ml-auto flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
      >
        <kbd className="hidden rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs md:inline">⌘K</kbd>
        <span className="hidden md:inline">Palette</span>
      </button>
    </div>
  );
}
