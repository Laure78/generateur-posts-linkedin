'use client';

import { useMemo, useState } from 'react';
import { Check, Sparkles, Wrench } from 'lucide-react';
import { MissionIcon } from '@/lib/bework/mission-icons';
import {
  MISSION_CATEGORIES,
  getCatalogMissions,
  getMissionCategory,
  getMissionsByCategory,
  type CatalogMission,
  type MissionCategoryId,
} from '@/lib/bework/mission-catalog';

type MissionTypePickerProps = {
  value: string;
  onChange: (missionTypeId: string) => void;
};

export function MissionTypePicker({ value, onChange }: MissionTypePickerProps) {
  const initialCategory = getMissionCategory(value);
  const [category, setCategory] = useState<MissionCategoryId>(initialCategory);

  const missions = useMemo(() => getMissionsByCategory(category), [category]);
  const selected = useMemo(
    () => getCatalogMissions().find((m) => m.id === value),
    [value]
  );

  const pickMission = (mission: CatalogMission) => {
    onChange(mission.id);
  };

  const pickCategory = (id: MissionCategoryId) => {
    setCategory(id);
    const inCategory = getMissionsByCategory(id);
    if (!inCategory.some((m) => m.id === value)) {
      const first = inCategory[0];
      if (first) onChange(first.id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {MISSION_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => pickCategory(cat.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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

      <div className="grid gap-2 sm:grid-cols-2">
        {missions.map((mission) => {
          const active = value === mission.id;
          return (
            <button
              key={mission.id}
              type="button"
              onClick={() => pickMission(mission)}
              className={`bework-card relative flex flex-col p-4 text-left transition-all ${
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
              <MissionIcon missionTypeId={mission.id} size="md" className="mb-1" />
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
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="rounded-lg border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm text-slate-700">
          <span className="font-medium text-[var(--bework-blue)]">{selected.skillName}</span>
          <span className="text-slate-500"> — {selected.briefHint}</span>
        </div>
      )}
    </div>
  );
}
