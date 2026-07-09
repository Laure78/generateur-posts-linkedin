import { AlertCircle, Check, FileStack, FolderKanban, X } from 'lucide-react';
import {
  ASSISTANT_DOES,
  ASSISTANT_DOES_NOT,
  ASSISTANT_MISSION_FAMILIES,
  ASSISTANT_POSITIONNEMENT,
  ASSISTANT_VALUE_PROPS,
  ASSISTANT_WHEN_TO_USE,
} from '@/lib/bework/assistant-positionnement';

const VALUE_ICONS = {
  prepare: FileStack,
  structure: FolderKanban,
  alerte: AlertCircle,
} as const;

export function PlatformPositioningSection() {
  return (
    <section className="mt-6" aria-labelledby="platform-positionnement-title">
      <div className="bework-card-tech bework-card overflow-hidden">
        <div className="border-b border-slate-100 bg-[var(--bework-blue-soft)]/30 px-5 py-4 md:px-6">
          <p className="bework-kicker">Assistant travaux BTP</p>
          <h2
            id="platform-positionnement-title"
            className="font-display mt-1 text-lg font-bold text-[var(--bework-navy)] md:text-xl"
          >
            {ASSISTANT_POSITIONNEMENT.tagline}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
            {ASSISTANT_POSITIONNEMENT.summary}
          </p>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-3 md:p-5">
          {ASSISTANT_VALUE_PROPS.map(({ id, title, description }) => {
            const Icon = VALUE_ICONS[id];
            return (
              <div
                key={id}
                className="rounded-xl border border-slate-200/90 bg-white px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--bework-blue-soft)]">
                    <Icon size={16} className="text-[var(--bework-blue)]" aria-hidden />
                  </span>
                  <p className="font-semibold text-slate-900">{title}</p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="bework-card p-5">
          <h3 className="font-display text-sm font-semibold text-emerald-900">
            Ce que BeWork prend en charge
          </h3>
          <ul className="mt-3 space-y-2">
            {ASSISTANT_DOES.map((item) => (
              <li key={item} className="flex gap-2 text-xs leading-relaxed text-slate-700">
                <Check size={14} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bework-card border-amber-100 bg-amber-50/40 p-5">
          <h3 className="font-display text-sm font-semibold text-amber-950">
            Ce qui reste du ressort de l&apos;entreprise
          </h3>
          <ul className="mt-3 space-y-2">
            {ASSISTANT_DOES_NOT.map((item) => (
              <li key={item} className="flex gap-2 text-xs leading-relaxed text-slate-700">
                <X size={14} className="mt-0.5 shrink-0 text-amber-700" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 bework-card p-5">
        <h3 className="font-display text-sm font-semibold text-slate-900">
          Familles de missions confiables
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Interlocuteur principal : {ASSISTANT_POSITIONNEMENT.interlocuteurs}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {ASSISTANT_MISSION_FAMILIES.map(({ id, title, examples }) => (
            <div key={id} className="rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2.5">
              <p className="text-xs font-semibold text-[var(--bework-navy)]">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{examples}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-3 text-xs leading-relaxed text-blue-950">
        <strong className="font-semibold">Règle de validation — </strong>
        {ASSISTANT_POSITIONNEMENT.validationRule}
      </div>

      <details className="bework-card mt-4 group">
        <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="text-[var(--bework-blue)] group-open:underline">
            Quand faire appel à BeWork ?
          </span>
          <span className="ml-2 font-normal text-slate-500">(6 situations fréquentes)</span>
        </summary>
        <div className="border-t border-slate-100 px-5 pb-5 pt-3">
          <ul className="grid gap-2 sm:grid-cols-2">
            {ASSISTANT_WHEN_TO_USE.map(({ situation, benefit }) => (
              <li key={situation} className="rounded-lg bg-slate-50 px-3 py-2">
                <p className="text-xs font-semibold text-slate-900">{situation}</p>
                <p className="mt-0.5 text-xs text-slate-600">{benefit}</p>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </section>
  );
}
