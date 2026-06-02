import Link from 'next/link';
import { ArrowRight, Sparkles, Wrench } from 'lucide-react';
import { MissionIcon } from '@/lib/bework/mission-icons';
import { getDashboardActionGroups, newDemandeUrl } from '@/lib/skills/skill-actions';

export function SkillActionGrid() {
  const groups = getDashboardActionGroups();

  return (
    <section className="mt-8">
      <h2 className="font-display text-lg font-semibold text-slate-900">Assistants disponibles</h2>
      <p className="mt-1 text-sm text-slate-600">
        Choisissez un assistant selon votre besoin — le formulaire s&apos;adapte automatiquement.
      </p>

      <div className="mt-6 space-y-8">
        {groups.map(({ category, actions }) => (
          <div key={category.id}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {category.label}
            </h3>
            <p className="mt-0.5 text-xs text-slate-400">{category.description}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {actions.map((action) => (
                <Link
                  key={action.missionType}
                  href={newDemandeUrl(action.missionType)}
                  className="group bework-card flex flex-col p-4 transition-all hover:border-[var(--bework-blue)] hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <MissionIcon missionTypeId={action.missionType} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 leading-snug">{action.label}</p>
                      <p className="mt-1 text-xs text-slate-500 line-clamp-2">{action.description}</p>
                    </div>
                  </div>
                  <span className="mt-4 flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--bework-blue)]/70">
                      {action.integrated ? (
                        <>
                          <Wrench size={12} className="text-[var(--bework-blue)]" />
                          Outil
                        </>
                      ) : (
                        <>
                          <Sparkles size={12} className="text-[var(--bework-blue)]" />
                          IA
                        </>
                      )}
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium text-[var(--bework-blue)] group-hover:underline">
                      Démarrer
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/plateforme/demandes/nouvelle"
        className="mt-6 inline-flex text-sm font-medium text-[var(--bework-blue)] hover:underline"
      >
        Voir tous les assistants →
      </Link>
    </section>
  );
}
