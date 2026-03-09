'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Zap,
  Lightbulb,
  LayoutGrid,
  Search,
  MessageSquareReply,
  Rocket,
  BarChart2,
  Bot,
} from 'lucide-react';

const COMMANDS = [
  { id: 'autopilot', label: 'Autopilot LinkedIn', href: '/outil/autopilot', icon: Bot },
  { id: 'post', label: 'Générer un post', href: '/outil/generateur', icon: Sparkles },
  { id: 'hooks', label: 'Générer des hooks', href: '/outil/contenu-avance', icon: Zap },
  { id: 'ideas', label: 'Générateur d\'idées', href: '/outil/idees', icon: Lightbulb },
  { id: 'drafts', label: 'Mes brouillons', href: '/outil/mes-posts', icon: LayoutGrid },
  { id: 'replies', label: 'Répondre aux commentaires', href: '/outil/repondre-commentaires', icon: MessageSquareReply },
  { id: 'growth', label: 'Growth', href: '/outil/croissance', icon: Rocket },
  { id: 'metrics', label: 'Métriques', href: '/outil/metriques', icon: BarChart2 },
];

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);

  const filtered = query.trim()
    ? COMMANDS.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS;

  const run = useCallback(
    (cmd: (typeof COMMANDS)[0]) => {
      router.push(cmd.href);
      onClose();
      setQuery('');
      setSelected(0);
    },
    [router, onClose]
  );

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
        return;
      }
      if (e.key === 'Enter' && filtered[selected]) {
        e.preventDefault();
        run(filtered[selected]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filtered, selected, run, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-[15vh] px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-neutral-200 px-4 py-3">
          <Search size={18} className="text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une action..."
            className="flex-1 bg-transparent py-1 text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
            autoFocus
          />
          <kbd className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">Esc</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-center text-neutral-500">Aucun résultat</p>
          ) : (
            filtered.map((cmd, i) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => run(cmd)}
                  onMouseEnter={() => setSelected(i)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                    i === selected ? 'bg-[#377CF3]/10 text-[#377CF3]' : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{cmd.label}</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
