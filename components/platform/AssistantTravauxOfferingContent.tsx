import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileStack,
  ListChecks,
  Route,
} from 'lucide-react';
import {
  ASSISTANT_POSITIONNEMENT,
} from '@/lib/bework/assistant-positionnement';
import {
  ASSISTANT_TRAVAUX_COMMERCIAL,
  BEWORK_MODE_OPERATOIRE,
  BEWORK_ONBOARDING_PHASES,
  CHANTIER_STATUS_LABELS,
  CLIENT_OFFER_CHECKLIST,
  TYPICAL_DELIVERABLES,
  VALIDATION_CIRCUIT,
} from '@/lib/bework/assistant-travaux-offering';

type AssistantTravauxOfferingContentProps = {
  /** Afficher le lien vers le guide d'utilisation. */
  showGuideLink?: boolean;
  /** Variante compacte pour le tableau de bord. */
  compact?: boolean;
};

export function AssistantTravauxOfferingContent({
  showGuideLink = true,
  compact = false,
}: AssistantTravauxOfferingContentProps) {
  return (
    <article className="space-y-6">
      <header className="bework-card-tech bework-card overflow-hidden">
        <div className="border-b border-slate-100 bg-[var(--bework-blue-soft)]/30 px-5 py-5 md:px-6">
          <p className="bework-kicker">Assistant travaux externalisé</p>
          <h1 className="font-display mt-1 text-xl font-bold text-[var(--bework-navy)] md:text-2xl">
            {ASSISTANT_TRAVAUX_COMMERCIAL.headline}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-[15px]">
            {ASSISTANT_TRAVAUX_COMMERCIAL.paragraph}
          </p>
          <p className="mt-3 text-sm font-semibold text-[var(--bework-navy)]">
            {ASSISTANT_POSITIONNEMENT.tagline}
          </p>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2 md:p-5">
          <div className="rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-3 text-sm leading-relaxed text-blue-950">
            <strong className="font-semibold">Formule commerciale — </strong>
            {ASSISTANT_TRAVAUX_COMMERCIAL.shortPitch}
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 px-4 py-3 text-xs leading-relaxed text-amber-950">
            <strong className="font-semibold">Règle de validation — </strong>
            {ASSISTANT_POSITIONNEMENT.validationRule}
          </div>
        </div>
      </header>

      <section className="bework-card p-5 md:p-6" aria-labelledby="offering-phases-title">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bework-blue-soft)]">
            <ClipboardList className="h-5 w-5 text-[var(--bework-blue)]" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="offering-phases-title" className="font-display text-lg font-bold text-[var(--bework-navy)]">
              To-do list BeWork — mise en place d&apos;un chantier
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              4 phases pour structurer la prise en charge avant le suivi courant.
            </p>
          </div>
        </div>
        <ol className="mt-5 space-y-4">
          {BEWORK_ONBOARDING_PHASES.map((phase) => (
            <li
              key={phase.id}
              className="rounded-xl border border-slate-200/90 bg-slate-50/50 p-4 md:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--bework-blue)]">
                    Phase {phase.step}
                  </p>
                  <h3 className="font-display mt-0.5 text-base font-semibold text-slate-900">
                    {phase.title}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
                  <FileStack size={14} aria-hidden />
                  {phase.deliverable}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                <strong className="font-medium text-slate-800">Objectif — </strong>
                {phase.objective}
              </p>
              {!compact && (
                <ul className="mt-3 space-y-1.5">
                  {phase.tasks.map((task) => (
                    <li key={task} className="flex gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[var(--bework-blue)]" aria-hidden />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="bework-card p-5 md:p-6" aria-labelledby="mode-operatoire-title">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bework-blue-soft)]">
            <Route className="h-5 w-5 text-[var(--bework-blue)]" aria-hidden />
          </span>
          <div>
            <h2 id="mode-operatoire-title" className="font-display text-lg font-bold text-[var(--bework-navy)]">
              Mode opératoire BeWork
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              8 étapes — de J0 à la clôture (DOE &amp; réserves).
            </p>
          </div>
        </div>
        <ol className="mt-5 space-y-3">
          {BEWORK_MODE_OPERATOIRE.map((step) => (
            <li
              key={step.id}
              className="grid gap-3 rounded-xl border border-slate-200/90 bg-white p-4 md:grid-cols-[auto_1fr_auto] md:items-start"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--bework-blue)] text-xs font-bold text-white">
                  {step.step}
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                  <CalendarClock size={12} aria-hidden />
                  {step.timing}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.description}</p>
                {!compact && (
                  <p className="mt-2 text-xs text-slate-500">
                    <strong className="text-slate-700">Livrable — </strong>
                    {step.deliverable}
                  </p>
                )}
              </div>
              <span className="text-xs font-medium text-slate-500 md:text-right">
                Validation : {step.validation}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bework-card p-5 md:p-6" aria-labelledby="client-checklist-title">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bework-blue-soft)]">
            <ListChecks className="h-5 w-5 text-[var(--bework-blue)]" aria-hidden />
          </span>
          <div>
            <h2 id="client-checklist-title" className="font-display text-lg font-bold text-[var(--bework-navy)]">
              Périmètre type à présenter au client
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Ce que BeWork peut prendre en charge sur un chantier d&apos;exécution.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {CLIENT_OFFER_CHECKLIST.map((section) => (
            <div
              key={section.id}
              className="rounded-xl border border-slate-200/90 bg-slate-50/40 p-4"
            >
              <h3 className="font-display text-sm font-semibold text-slate-900">{section.title}</h3>
              <p className="mt-0.5 text-xs text-slate-500">{section.subtitle}</p>
              <p className="mt-2 text-xs font-medium text-[var(--bework-blue)]">
                {section.items.length} points
              </p>
              <ul className="mt-3 space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2 text-xs leading-relaxed text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--bework-blue)]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {!compact && (
        <>
          <section className="bework-card p-5 md:p-6" aria-labelledby="status-list-title">
            <h2 id="status-list-title" className="font-display text-base font-semibold text-slate-900">
              Statuts du tableau de bord chantier
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {CHANTIER_STATUS_LABELS.map((status) => (
                <span
                  key={status}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {status}
                </span>
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="bework-card border-amber-100 bg-amber-50/40 p-5">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-700" aria-hidden />
                <h2 className="font-display text-sm font-semibold text-amber-950">
                  Circuit de validation conseillé
                </h2>
              </div>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-slate-700">
                {VALIDATION_CIRCUIT.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="bework-card p-5">
              <h2 className="font-display text-sm font-semibold text-slate-900">Livrables types</h2>
              <ul className="mt-3 space-y-2">
                {TYPICAL_DELIVERABLES.map(({ label, detail }) => (
                  <li key={label} className="text-xs leading-relaxed text-slate-700">
                    <strong className="text-slate-900">{label}</strong>
                    <span className="text-slate-500"> — {detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

      {showGuideLink && (
        <p className="text-sm text-slate-500">
          Bonnes pratiques plateforme :{' '}
          <Link href="/plateforme/ressources" className="font-medium text-[var(--bework-blue)] hover:underline">
            Guide d&apos;utilisation BeWork
          </Link>
          {' · '}
          <Link href="/guide" className="font-medium text-[var(--bework-blue)] hover:underline">
            Lien public du guide
          </Link>
        </p>
      )}
    </article>
  );
}

export function AssistantTravauxOfferingTeaser() {
  return (
    <section className="bework-card overflow-hidden" aria-labelledby="offering-teaser-title">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="bework-kicker">Mode opératoire</p>
          <h2 id="offering-teaser-title" className="font-display mt-1 text-base font-bold text-[var(--bework-navy)]">
            Assistant travaux externalisé — méthode &amp; périmètre client
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            4 phases de cadrage, 8 étapes J0 → DOE, check-list démarrage / travaux / fin de chantier.
          </p>
        </div>
        <Link
          href="/plateforme/mode-operatoire"
          className="bework-btn-secondary inline-flex shrink-0 items-center gap-2 self-start sm:self-center"
        >
          Voir le détail
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
