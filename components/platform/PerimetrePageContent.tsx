'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Check, X } from 'lucide-react';
import {
  ASSISTANT_DOES,
  ASSISTANT_DOES_NOT,
  ASSISTANT_MISSION_FAMILIES,
  ASSISTANT_POSITIONNEMENT,
  ASSISTANT_VALUE_PROPS,
} from '@/lib/bework/assistant-positionnement';
import { markPerimetreSeen } from '@/components/platform/PerimetreFirstVisitGate';

export function PerimetrePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFirstVisit = searchParams.get('first') === '1';
  const [dontShowAgain, setDontShowAgain] = useState(true);

  const continueToDashboard = useCallback(() => {
    if (dontShowAgain) markPerimetreSeen();
    router.push('/plateforme');
  }, [dontShowAgain, router]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 lg:px-10">
      <article className="space-y-6">
        <header className="bework-card-tech bework-card overflow-hidden">
          <div className="border-b border-slate-100 bg-[var(--bework-blue-soft)]/30 px-5 py-5 md:px-6">
            <p className="bework-kicker">Périmètre BeWork</p>
            <h1 className="font-display mt-1 text-xl font-bold text-[var(--bework-navy)] md:text-2xl">
              {ASSISTANT_POSITIONNEMENT.tagline}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-[15px]">
              {ASSISTANT_POSITIONNEMENT.summary}
            </p>
            {isFirstVisit && (
              <p className="mt-3 text-sm font-medium text-[var(--bework-blue)]">
                Bienvenue — prenez 30 secondes pour cadrer ce que BeWork fait (et ne fait pas).
              </p>
            )}
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-3 md:p-5">
            {ASSISTANT_VALUE_PROPS.map(({ id, title, description }) => (
              <div
                key={id}
                className="rounded-xl border border-slate-200/90 bg-white px-4 py-3"
              >
                <p className="font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="bework-card p-5" aria-labelledby="perimetre-does-title">
            <h2
              id="perimetre-does-title"
              className="font-display text-sm font-semibold text-emerald-900"
            >
              Ce que BeWork prend en charge
            </h2>
            <ul className="mt-3 space-y-2">
              {ASSISTANT_DOES.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="bework-card border-amber-100 bg-amber-50/40 p-5"
            aria-labelledby="perimetre-does-not-title"
          >
            <h2
              id="perimetre-does-not-title"
              className="font-display text-sm font-semibold text-amber-950"
            >
              Ce qui reste du ressort de l&apos;entreprise
            </h2>
            <ul className="mt-3 space-y-2">
              {ASSISTANT_DOES_NOT.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                  <X size={16} className="mt-0.5 shrink-0 text-amber-700" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="bework-card p-5" aria-labelledby="perimetre-missions-title">
          <h2
            id="perimetre-missions-title"
            className="font-display text-sm font-semibold text-slate-900"
          >
            Familles de missions confiables
          </h2>
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
        </section>

        <div className="rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-3 text-sm leading-relaxed text-blue-950">
          <strong className="font-semibold">Règle de validation — </strong>
          {ASSISTANT_POSITIONNEMENT.validationRule}
        </div>

        <footer className="bework-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-700">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[var(--bework-blue)] focus:ring-[var(--bework-blue)]"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            />
            <span>Ne plus afficher cette page à la connexion</span>
          </label>

          <div className="flex flex-wrap items-center gap-3">
            {!isFirstVisit && (
              <Link
                href="/plateforme"
                className="text-sm font-medium text-[var(--bework-blue)] hover:underline"
              >
                Retour au tableau de bord
              </Link>
            )}
            <button
              type="button"
              onClick={continueToDashboard}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--bework-blue)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Continuer
              <ArrowRight size={16} aria-hidden />
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
}
