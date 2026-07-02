'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Sparkles, Wrench } from 'lucide-react';
import { MissionIcon } from '@/lib/bework/mission-icons';
import { getDashboardActionGroups, newDemandeUrl } from '@/lib/skills/skill-actions';
import { QuickMissionShortcuts } from '@/components/platform/QuickMissionShortcuts';

export function SkillActionAccordion() {
  const groups = getDashboardActionGroups();
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setOpenIds(new Set(groups.map((g) => g.category.id)));
  const collapseAll = () => setOpenIds(new Set());

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-slate-900">Catalogue assistants métier</h2>
          <p className="mt-1 text-sm text-slate-600">
            Checklist 3D MANAGER — thèmes A à H. Utilisez la recherche ou vos favoris pour aller plus vite.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <button type="button" onClick={expandAll} className="text-[var(--bework-blue)] hover:underline">
            Tout ouvrir
          </button>
          <span className="text-slate-300">·</span>
          <button type="button" onClick={collapseAll} className="text-slate-500 hover:underline">
            Tout fermer
          </button>
        </div>
      </div>

      <QuickMissionShortcuts className="mt-4" maxItems={6} />

      <div className="mt-4 space-y-2">
        {groups.map(({ category, actions }) => {
          const open = openIds.has(category.id);
          return (
            <div key={category.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => toggle(category.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-slate-50"
                aria-expanded={open}
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{category.label}</p>
                  <p className="text-xs text-slate-500 line-clamp-1">{category.description}</p>
                </div>
                <span className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
                  {actions.length}
                  <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                </span>
              </button>
              {open && (
                <div className="border-t border-slate-100 px-3 pb-3 pt-2">
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {actions.map((action) => (
                      <Link
                        key={action.missionType}
                        href={newDemandeUrl(action.missionType)}
                        className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-[var(--bework-blue-soft)]/40"
                      >
                        <MissionIcon missionTypeId={action.missionType} size="sm" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-900 leading-snug group-hover:text-[var(--bework-blue)]">
                            {action.label}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">{action.description}</p>
                          <span className="mt-1 inline-flex items-center gap-1 text-[0.65rem] font-medium text-[var(--bework-blue)]/70">
                            {action.integrated ? (
                              <>
                                <Wrench size={10} />
                                Outil
                              </>
                            ) : (
                              <>
                                <Sparkles size={10} />
                                IA
                              </>
                            )}
                            <ArrowRight size={10} className="opacity-0 group-hover:opacity-100" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
