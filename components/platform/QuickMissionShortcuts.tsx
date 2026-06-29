'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Clock, Star } from 'lucide-react';
import { getCatalogMissions } from '@/lib/bework/mission-catalog';
import { getFavoriteMissionTypes, getRecentMissionTypes } from '@/lib/bework/mission-type-prefs';
import { newDemandeUrl } from '@/lib/skills/skill-actions';

type QuickMissionShortcutsProps = {
  maxItems?: number;
  className?: string;
};

export function QuickMissionShortcuts({ maxItems = 5, className = '' }: QuickMissionShortcutsProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavoriteMissionTypes());
    setRecent(getRecentMissionTypes());
  }, []);

  const items = useMemo(() => {
    const catalog = getCatalogMissions();
    const ids = [...favorites, ...recent.filter((id) => !favorites.includes(id))].slice(0, maxItems);
    return ids
      .map((id) => catalog.find((m) => m.id === id))
      .filter((m): m is NonNullable<typeof m> => Boolean(m));
  }, [favorites, recent, maxItems]);

  if (!items.length) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-xs font-medium text-slate-500">Accès rapide :</span>
      {items.map((m) => (
        <Link
          key={m.id}
          href={newDemandeUrl(m.id)}
          className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-[var(--bework-blue-soft)] hover:text-[var(--bework-blue)] hover:ring-[var(--bework-blue)]/30"
        >
          {favorites.includes(m.id) ? (
            <Star size={10} className="fill-amber-400 text-amber-500" aria-hidden />
          ) : (
            <Clock size={10} className="text-slate-400" aria-hidden />
          )}
          <span className="max-w-[12rem] truncate">{m.label}</span>
        </Link>
      ))}
    </div>
  );
}
