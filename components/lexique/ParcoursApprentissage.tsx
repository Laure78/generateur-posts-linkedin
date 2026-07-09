'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Brain, ChevronRight, Download, Lightbulb, BookMarked } from 'lucide-react';
import { PARCOURS_BTP, type ParcoursBtp } from '@/data/parcours-btp';
import { SchemaRenderer } from './schemas/SchemaRenderer';
import { LexiqueTermeLink } from './LexiqueTermeLink';
import type { QuizLotInitial } from './Quiz';

const PARCOURS_QUIZ: Partial<Record<string, { lot: QuizLotInitial; label: string }>> = {
  'fondations-gros-oeuvre': { lot: 'go', label: 'Quiz Gros œuvre' },
  'bases-gros-oeuvre': { lot: 'bases-go', label: 'Quiz Bases gros œuvre' },
  'fondations-planchers': { lot: 'fondations-planchers', label: 'Quiz Fondations & planchers' },
  'millas-nord': { lot: 'millas-nord', label: 'Quiz Millas Nord — 4 lots' },
  'millas-nord-second-oeuvre': { lot: 'millas-nord-second-oeuvre', label: 'Quiz Millas Nord — lots 5 à 16' },
  'implantation-batiment': { lot: 'implantation', label: 'Quiz Implantation' },
  'enduits-facade': { lot: 'enduits', label: 'Quiz Enduits de façade' },
  'charpente-couverture': { lot: 'charpente', label: 'Quiz Charpente & couverture' },
  'menuiseries-exterieures': { lot: 'menuiseries', label: 'Quiz Menuiseries extérieures' },
  'perf-energetique-f22': { lot: 'perf', label: 'Quiz Performance énergétique' },
};

const PARCOURS_RESSOURCES: Partial<
  Record<
    string,
    {
      href: string;
      filename: string;
      label?: string;
      borderClass: string;
      bgClass: string;
      textClass: string;
      subClass: string;
    }
  >
> = {
  'implantation-batiment': {
    href: '/ressources/Fiche_Memo_Implantation_Batiment.docx',
    filename: 'Fiche_Memo_Implantation_Batiment.docx',
    borderClass: 'border-violet-200',
    bgClass: 'bg-violet-50/80 hover:bg-violet-100',
    textClass: 'text-violet-900',
    subClass: 'text-violet-700',
  },
  'bases-gros-oeuvre': {
    href: '/ressources/Fiche_Memo_Bases_Gros_Oeuvre.docx',
    filename: 'Fiche_Memo_Bases_Gros_Oeuvre.docx',
    borderClass: 'border-amber-200',
    bgClass: 'bg-amber-50/80 hover:bg-amber-100',
    textClass: 'text-amber-900',
    subClass: 'text-amber-700',
  },
  'fondations-planchers': {
    href: '/ressources/Fiche_Revision_Fondations_Planchers_BeWork.docx',
    filename: 'Fiche_Revision_Fondations_Planchers_BeWork.docx',
    borderClass: 'border-teal-200',
    bgClass: 'bg-teal-50/80 hover:bg-teal-100',
    textClass: 'text-teal-900',
    subClass: 'text-teal-700',
  },
  'millas-nord': {
    href: '/ressources/Fiche_Revision_Lots_Millas_Nord_BeWork.pdf',
    filename: 'Fiche_Revision_Lots_Millas_Nord_BeWork.pdf',
    label: 'Fiche révision PDF',
    borderClass: 'border-indigo-200',
    bgClass: 'bg-indigo-50/80 hover:bg-indigo-100',
    textClass: 'text-indigo-900',
    subClass: 'text-indigo-700',
  },
  'millas-nord-second-oeuvre': {
    href: '/ressources/Fiche_Revision_Lots_5_a_16_Millas_Nord_BeWork.pdf',
    filename: 'Fiche_Revision_Lots_5_a_16_Millas_Nord_BeWork.pdf',
    label: 'Fiche révision PDF',
    borderClass: 'border-rose-200',
    bgClass: 'bg-rose-50/80 hover:bg-rose-100',
    textClass: 'text-rose-900',
    subClass: 'text-rose-700',
  },
};

function ParcoursDetail({
  parcours,
  onRetour,
}: {
  parcours: ParcoursBtp;
  onRetour: () => void;
}) {
  const [etapeIndex, setEtapeIndex] = useState(0);
  const etape = parcours.etapes[etapeIndex];
  const derniere = etapeIndex === parcours.etapes.length - 1;
  const quiz = PARCOURS_QUIZ[parcours.id];
  const ressource = PARCOURS_RESSOURCES[parcours.id];

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onRetour}
        className="bework-btn-ghost -ml-2 text-sm text-bework-blue"
      >
        ← Tous les parcours
      </button>

      <div>
        <p className="bework-kicker">{parcours.duree} · {parcours.etapes.length} étapes</p>
        <h2 className="font-display mt-1 text-xl font-bold text-bework-navy">{parcours.titre}</h2>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-bework-blue transition-all"
          style={{ width: `${((etapeIndex + 1) / parcours.etapes.length) * 100}%` }}
        />
      </div>
      <p className="text-xs text-slate-500">
        Étape {etapeIndex + 1} sur {parcours.etapes.length}
      </p>

      {ressource ? (
        <a
          href={ressource.href}
          download
          className={`bework-card flex items-center gap-3 border p-4 text-sm transition ${ressource.borderClass} ${ressource.bgClass} ${ressource.textClass}`}
        >
          <Download className="h-5 w-5 shrink-0" aria-hidden />
          <span>
            <span className="font-semibold">{ressource.label ?? 'Fiche mémo Word'}</span>
            <span className={`mt-0.5 block text-xs ${ressource.subClass}`}>
              Télécharger {ressource.filename}
            </span>
          </span>
        </a>
      ) : null}

      <article className="bework-card-tech bework-card p-5 sm:p-6">
        <h3 className="font-display text-lg font-bold text-bework-navy">{etape.titre}</h3>
        <p className="mt-3 text-base leading-relaxed text-slate-600">{etape.explication}</p>

        {etape.astuce && (
          <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
            <p className="text-sm text-amber-900">
              <span className="font-semibold">Astuce terrain : </span>
              {etape.astuce}
            </p>
          </div>
        )}

        {etape.schema && (
          <div className="mt-5">
            <SchemaRenderer id={etape.schema} />
          </div>
        )}

        {etape.termesLies && etape.termesLies.length > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <BookMarked className="h-3.5 w-3.5" aria-hidden />
              Termes du lexique
            </p>
            <div className="flex flex-wrap gap-2">
              {etape.termesLies.map((id) => (
                <LexiqueTermeLink key={id} id={id} />
              ))}
            </div>
          </div>
        )}
      </article>

      {quiz ? (
        <div className="bework-card border-2 border-bework-navy/10 bg-gradient-to-r from-slate-50 to-white p-5">
          <p className="font-display text-base font-semibold text-bework-navy">
            Tester vos acquis
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {quiz.label} — questions scénarisées avec explications détaillées.
          </p>
          <Link
            href={`/lexique?mode=quiz&lot=${quiz.lot}`}
            className="bework-btn-primary mt-4 inline-flex items-center gap-2"
          >
            <Brain className="h-4 w-4" aria-hidden />
            Lancer le quiz
          </Link>
        </div>
      ) : null}

      <div className="flex gap-3">
        {etapeIndex > 0 && (
          <button
            type="button"
            onClick={() => setEtapeIndex((i) => i - 1)}
            className="bework-btn-secondary flex-1"
          >
            Précédent
          </button>
        )}
        {!derniere ? (
          <button
            type="button"
            onClick={() => setEtapeIndex((i) => i + 1)}
            className="bework-btn-primary flex-1"
          >
            Suivant
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        ) : (
          <button type="button" onClick={onRetour} className="bework-btn-primary flex-1">
            Parcours terminé ✓
          </button>
        )}
      </div>
    </div>
  );
}

export function ParcoursApprentissage({ initialParcoursId }: { initialParcoursId?: string | null }) {
  const [selection, setSelection] = useState<ParcoursBtp | null>(() => {
    if (!initialParcoursId) return null;
    return PARCOURS_BTP.find((p) => p.id === initialParcoursId) ?? null;
  });

  if (selection) {
    return <ParcoursDetail parcours={selection} onRetour={() => setSelection(null)} />;
  }

  return (
    <div className="space-y-5">
      <div className="bework-card border-bework-blue-soft bg-bework-blue-soft/40 p-5">
        <p className="font-display text-base font-semibold text-bework-navy">
          Par où commencer ?
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Chaque parcours explique un sujet en langage simple, avec un schéma pour visualiser.
          Pas besoin de tout savoir d&apos;un coup — avancez étape par étape.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/lexique?parcours=millas-nord-second-oeuvre"
            className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-900 transition hover:bg-rose-200"
          >
            Débutant — Millas Nord (lots 5-16)
          </Link>
          <Link
            href="/lexique?parcours=millas-nord"
            className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-semibold text-indigo-900 transition hover:bg-indigo-200"
          >
            Débutant — Millas Nord (4 lots)
          </Link>
          <Link
            href="/lexique?parcours=fondations-planchers"
            className="inline-flex items-center rounded-full bg-teal-100 px-3 py-1.5 text-xs font-semibold text-teal-900 transition hover:bg-teal-200"
          >
            Débutant — Fondations & planchers
          </Link>
          <Link
            href="/lexique?parcours=bases-gros-oeuvre"
            className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-200"
          >
            Débutant — Bases gros œuvre
          </Link>
          <Link
            href="/lexique?parcours=implantation-batiment"
            className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-900 transition hover:bg-violet-200"
          >
            Débutant — Implantation
          </Link>
          <Link
            href="/lexique?parcours=charpente-couverture"
            className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-900 transition hover:bg-orange-200"
          >
            Lot 03 — Charpente & couverture
          </Link>
          <Link
            href="/lexique?parcours=menuiseries-exterieures"
            className="inline-flex items-center rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-900 transition hover:bg-green-200"
          >
            Lot 04 — Menuiseries
          </Link>
          <Link
            href="/lexique?parcours=enduits-facade"
            className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-900 transition hover:bg-sky-200"
          >
            Lot 02 — Enduits
          </Link>
        </div>
      </div>

      <ul className="space-y-3" role="list">
        {PARCOURS_BTP.map((parcours) => {
          const quiz = PARCOURS_QUIZ[parcours.id];
          return (
          <li key={parcours.id}>
            <button
              type="button"
              onClick={() => setSelection(parcours)}
              className="bework-card-tech bework-card group w-full p-5 text-left transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bework-blue"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="bework-kicker">{parcours.duree}</p>
                  <h3 className="font-display mt-1 text-base font-bold text-bework-navy group-hover:text-bework-blue">
                    {parcours.titre}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-500">{parcours.description}</p>
                </div>
                <ChevronRight
                  className="mt-1 h-5 w-5 shrink-0 text-slate-400 group-hover:text-bework-blue"
                  aria-hidden
                />
              </div>
              <p className="mt-3 text-xs text-slate-400">
                {parcours.etapes.length} étape{parcours.etapes.length > 1 ? 's' : ''}
                {parcours.etapes.some((e) => e.schema) ? ' · avec schémas' : ''}
                {quiz ? ' · quiz disponible' : ''}
              </p>
            </button>
          </li>
          );
        })}
      </ul>
    </div>
  );
}
