'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Download, Layers, Search } from 'lucide-react';
import {
  ALL_MISSION_GROUPS,
  MISSIONS_PAR_LOT,
  MISSIONS_PAR_LOT_INTRO,
  MISSIONS_TRANSVERSALES,
  newDemandeUrlFromLotMission,
  type LotMissionGroup,
} from '@/lib/bework/missions-par-lot';

function normalize(q: string): string {
  return q
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function MissionGroupPanel({ group }: { group: LotMissionGroup }) {
  return (
    <section
      id={group.id}
      className="bework-card scroll-mt-24 overflow-hidden border-slate-200/90 p-0"
      aria-labelledby={`${group.id}-title`}
    >
      <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-4">
        <p className="bework-kicker">
          {group.lotNumber > 0 ? `Lot ${String(group.lotNumber).padStart(2, '0')}` : 'Transversal'}
        </p>
        <h3 id={`${group.id}-title`} className="font-display mt-0.5 text-base font-bold text-[var(--bework-navy)]">
          {group.label}
        </h3>
        <p className="mt-1 text-sm text-slate-500">{group.audience}</p>
      </div>
      <ul className="divide-y divide-slate-100">
        {group.missions.map((mission) => {
          const href = newDemandeUrlFromLotMission(group, mission);
          return (
            <li key={mission.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">{mission.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{mission.description}</p>
              </div>
              <Link
                href={href}
                className="bework-btn-primary inline-flex shrink-0 items-center gap-1.5 self-start text-sm"
              >
                Lancer
                <ArrowRight size={14} aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function MissionsParLotContent() {
  const [lotFilter, setLotFilter] = useState<string>('all');
  const [query, setQuery] = useState('');

  const groups = useMemo(() => {
    const q = normalize(query.trim());
    let base: LotMissionGroup[] =
      lotFilter === 'all'
        ? ALL_MISSION_GROUPS
        : lotFilter === 'transversal'
          ? MISSIONS_TRANSVERSALES
          : MISSIONS_PAR_LOT.filter((g) => g.id === lotFilter);

    if (!q) return base;
    return base
      .map((g) => ({
        ...g,
        missions: g.missions.filter(
          (m) =>
            normalize(m.title).includes(q) ||
            normalize(m.description).includes(q) ||
            normalize(g.label).includes(q),
        ),
      }))
      .filter((g) => g.missions.length > 0);
  }, [lotFilter, query]);

  return (
    <div className="space-y-6">
      <div className="bework-card-tech bework-card overflow-hidden p-0">
        <div className="border-b border-slate-100 bg-[var(--bework-blue-soft)]/35 px-5 py-5 md:px-6">
          <p className="bework-kicker">Missions confiées</p>
          <h2 className="font-display mt-1 text-xl font-bold text-[var(--bework-navy)] md:text-2xl">
            {MISSIONS_PAR_LOT_INTRO.title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
            {MISSIONS_PAR_LOT_INTRO.subtitle}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
            {MISSIONS_PAR_LOT_INTRO.role}
          </p>
          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-500">
            {MISSIONS_PAR_LOT_INTRO.validation}
          </p>
          <a
            href={MISSIONS_PAR_LOT_INTRO.pdfHref}
            download={MISSIONS_PAR_LOT_INTRO.pdfFilename}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--bework-blue)]/30 bg-white px-3.5 py-1.5 text-xs font-semibold text-[var(--bework-blue)] hover:bg-[var(--bework-blue-soft)]"
          >
            <Download size={14} aria-hidden />
            Télécharger la fiche PDF
          </a>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-5 md:p-5">
          {MISSIONS_PAR_LOT_INTRO.method.map((step, i) => (
            <div key={step} className="rounded-xl border border-slate-200/90 bg-white px-3 py-3">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--bework-blue)]">
                Étape {i + 1}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une mission (DOE, DICT, Consuel, réserves…)"
            className="bework-input w-full pl-9"
            aria-label="Rechercher une mission confiable"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par lot">
        <button
          type="button"
          role="tab"
          aria-selected={lotFilter === 'all'}
          onClick={() => setLotFilter('all')}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            lotFilter === 'all'
              ? 'bg-[var(--bework-navy)] text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Layers size={12} aria-hidden />
          Tout
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={lotFilter === 'transversal'}
          onClick={() => setLotFilter('transversal')}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            lotFilter === 'transversal'
              ? 'bg-emerald-700 text-white'
              : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
          }`}
        >
          Sur tous les lots
        </button>
        {MISSIONS_PAR_LOT.map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={lotFilter === g.id}
            onClick={() => setLotFilter(g.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              lotFilter === g.id
                ? 'bg-[var(--bework-blue)] text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Lot {String(g.lotNumber).padStart(2, '0')}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {groups.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            Aucune mission ne correspond à votre recherche.
          </p>
        ) : (
          groups.map((group) => <MissionGroupPanel key={group.id} group={group} />)
        )}
      </div>
    </div>
  );
}
