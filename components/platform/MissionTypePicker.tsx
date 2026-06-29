'use client';

import { useMemo, useState, useEffect } from 'react';
import { Check, Sparkles, Star, Wrench, Search, Clock } from 'lucide-react';
import { MissionIcon } from '@/lib/bework/mission-icons';
import {
  MISSION_CATEGORIES,
  getCatalogMissions,
  getMissionCategory,
  getMissionsByCategory,
  type CatalogMission,
  type MissionCategoryId,
} from '@/lib/bework/mission-catalog';
import {
  getFavoriteMissionTypes,
  getRecentMissionTypes,
  toggleFavoriteMissionType,
} from '@/lib/bework/mission-type-prefs';

type MissionTypePickerProps = {
  value: string;
  onChange: (missionTypeId: string) => void;
  /** Passé depuis « Nouvelle demande » — bouton Continuer + double-clic */
  onContinue?: () => void;
};

function normalizeSearch(q: string): string {
  return q
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

const MAX_RECENT_DISPLAY = 6;

function MissionCard({
  mission,
  active,
  isFavorite,
  onPick,
  onToggleFavorite,
  onDoublePick,
}: {
  mission: CatalogMission;
  active: boolean;
  isFavorite: boolean;
  onPick: () => void;
  onToggleFavorite: () => void;
  onDoublePick?: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onPick}
      onDoubleClick={() => {
        onPick();
        onDoublePick?.();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPick();
        }
      }}
      className={`bework-card relative flex cursor-pointer flex-col p-4 text-left transition-all ${
        active
          ? 'border-[var(--bework-blue)] ring-2 ring-[var(--bework-blue)]/20'
          : 'hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      {active && (
        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--bework-blue)] text-white">
          <Check size={14} aria-hidden />
        </span>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="absolute left-3 top-3 z-10 rounded-full p-1 text-slate-300 hover:text-amber-500"
        aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        <Star size={14} className={isFavorite ? 'fill-amber-400 text-amber-500' : ''} />
      </button>
      <MissionIcon missionTypeId={mission.id} size="md" className="mb-1 ml-6" />
      <span className="mt-1 pr-8 font-semibold text-slate-900 leading-snug">{mission.label}</span>
      <span className="mt-1 text-xs text-slate-500 line-clamp-2">{mission.skillDescription}</span>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--bework-blue)]/80">
        {mission.integrated ? (
          <>
            <Wrench size={12} aria-hidden className="text-[var(--bework-blue)]" />
            Outil intégré
          </>
        ) : (
          <>
            <Sparkles size={12} aria-hidden className="text-[var(--bework-blue)]" />
            Assistant IA
          </>
        )}
      </span>
    </div>
  );
}

export function MissionTypePicker({ value, onChange, onContinue }: MissionTypePickerProps) {
  const initialCategory = getMissionCategory(value);
  const [category, setCategory] = useState<MissionCategoryId>(initialCategory);
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavoriteMissionTypes());
    setRecent(getRecentMissionTypes());
  }, []);

  const catalog = useMemo(() => getCatalogMissions(), []);
  const missions = useMemo(() => getMissionsByCategory(category), [category]);

  const filteredMissions = useMemo(() => {
    const q = normalizeSearch(query.trim());
    if (!q) return missions;
    return catalog.filter(
      (m) =>
        normalizeSearch(m.label).includes(q) ||
        normalizeSearch(m.skillDescription).includes(q) ||
        normalizeSearch(m.id).includes(q)
    );
  }, [query, missions, catalog]);

  const favoriteMissions = useMemo(
    () =>
      favorites
        .map((id) => catalog.find((m) => m.id === id))
        .filter((m): m is CatalogMission => Boolean(m)),
    [favorites, catalog]
  );

  const recentMissions = useMemo(
    () =>
      recent
        .filter((id) => !favorites.includes(id))
        .map((id) => catalog.find((m) => m.id === id))
        .filter((m): m is CatalogMission => Boolean(m))
        .slice(0, MAX_RECENT_DISPLAY),
    [recent, favorites, catalog]
  );

  const selected = useMemo(() => catalog.find((m) => m.id === value), [catalog, value]);
  const showSearchResults = query.trim().length > 0;

  const pickMission = (mission: CatalogMission) => {
    onChange(mission.id);
    setCategory(mission.category);
  };

  const pickCategory = (id: MissionCategoryId) => {
    setCategory(id);
    setQuery('');
    const inCategory = getMissionsByCategory(id);
    if (!inCategory.some((m) => m.id === value)) {
      const first = inCategory[0];
      if (first) onChange(first.id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && filteredMissions[0]) {
              e.preventDefault();
              pickMission(filteredMissions[0]);
              onContinue?.();
            }
          }}
          placeholder="Rechercher une tâche (DPGF, DC4, CR, GPA…) — Entrée pour continuer"
          className="bework-input w-full pl-10"
          aria-label="Rechercher un assistant"
        />
      </div>

      {!showSearchResults && (favoriteMissions.length > 0 || recentMissions.length > 0) && (
        <div className="space-y-3 rounded-xl border border-amber-100 bg-amber-50/40 p-3">
          {favoriteMissions.length > 0 && (
            <div>
              <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
                <Star size={12} className="fill-amber-500 text-amber-500" />
                Favoris
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {favoriteMissions.map((mission) => (
                  <MissionCard
                    key={mission.id}
                    mission={mission}
                    active={value === mission.id}
                    isFavorite
                    onPick={() => pickMission(mission)}
                    onDoublePick={onContinue}
                    onToggleFavorite={() => setFavorites(toggleFavoriteMissionType(mission.id))}
                  />
                ))}
              </div>
            </div>
          )}
          {recentMissions.length > 0 && (
            <div>
              <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <Clock size={12} />
                Récents
              </p>
              <div className="flex flex-wrap gap-2">
                {recentMissions.map((mission) => (
                  <button
                    key={mission.id}
                    type="button"
                    onClick={() => pickMission(mission)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-colors ${
                      value === mission.id
                        ? 'bg-[var(--bework-blue)] text-white ring-[var(--bework-blue)]'
                        : 'bg-white text-slate-600 ring-slate-200 hover:ring-slate-300'
                    }`}
                  >
                    {mission.label.length > 42 ? `${mission.label.slice(0, 40)}…` : mission.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showSearchResults ? (
        <div>
          <p className="mb-2 text-sm text-slate-500">
            {filteredMissions.length} résultat{filteredMissions.length > 1 ? 's' : ''}
          </p>
          <div className="grid gap-2 sm:grid-cols-2 max-h-[28rem] overflow-y-auto pr-1">
            {filteredMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                active={value === mission.id}
                isFavorite={favorites.includes(mission.id)}
                onPick={() => pickMission(mission)}
                onDoublePick={onContinue}
                onToggleFavorite={() => setFavorites(toggleFavoriteMissionType(mission.id))}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {MISSION_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => pickCategory(cat.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                  category === cat.id
                    ? 'bg-[var(--bework-blue)] text-white shadow-sm'
                    : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <p className="text-sm text-slate-500">
            {MISSION_CATEGORIES.find((c) => c.id === category)?.description}
          </p>

          <div className="grid gap-2 sm:grid-cols-2 max-h-[24rem] overflow-y-auto pr-1">
            {missions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                active={value === mission.id}
                isFavorite={favorites.includes(mission.id)}
                onPick={() => pickMission(mission)}
                onDoublePick={onContinue}
                onToggleFavorite={() => setFavorites(toggleFavoriteMissionType(mission.id))}
              />
            ))}
          </div>
        </>
      )}

      {selected && (
        <div className="rounded-lg border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm text-slate-700">
          <span className="font-medium text-[var(--bework-blue)]">{selected.skillName}</span>
          <span className="text-slate-500"> — {selected.briefHint}</span>
          {onContinue && (
            <p className="mt-2 text-xs text-slate-500">
              Double-clic sur la carte ou bouton Continuer ci-dessous.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
