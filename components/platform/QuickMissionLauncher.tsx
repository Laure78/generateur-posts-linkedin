'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';
import { getCatalogMissions } from '@/lib/bework/mission-catalog';
import { newDemandeUrl } from '@/lib/skills/skill-actions';

function normalize(q: string): string {
  return q.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

export function QuickMissionLauncher() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const catalog = useMemo(() => getCatalogMissions(), []);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (q.length < 2) return [];
    return catalog
      .filter(
        (m) =>
          normalize(m.label).includes(q) ||
          normalize(m.skillDescription).includes(q) ||
          normalize(m.id).includes(q)
      )
      .slice(0, 6);
  }, [query, catalog]);

  const go = (missionType: string) => {
    setQuery('');
    setOpen(false);
    router.push(newDemandeUrl(missionType));
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && results[0]) {
              e.preventDefault();
              go(results[0].id);
            }
          }}
          placeholder="Trouver une tâche et démarrer (CR, DPGF, DC4…)"
          className="bework-input w-full pl-10"
          aria-label="Lancer une demande"
          aria-expanded={open && results.length > 0}
        />
      </div>
      {open && results.length > 0 && (
        <ul
          className="absolute z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
          role="listbox"
        >
          {results.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                role="option"
                className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm hover:bg-slate-50"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(m.id)}
              >
                <span>
                  <span className="font-medium text-slate-900">{m.label}</span>
                  <span className="mt-0.5 block text-xs text-slate-500 line-clamp-1">{m.skillDescription}</span>
                </span>
                <ArrowRight size={14} className="shrink-0 text-[var(--bework-blue)]" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
