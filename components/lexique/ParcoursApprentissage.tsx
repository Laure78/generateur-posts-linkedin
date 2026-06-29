'use client';

import { useState } from 'react';
import { ChevronRight, Lightbulb, BookMarked } from 'lucide-react';
import { PARCOURS_BTP, type ParcoursBtp } from '@/data/parcours-btp';
import { LEXIQUE } from '@/data/lexique-btp';
import { SchemaRenderer } from './schemas/SchemaRenderer';

function TermeLien({ id }: { id: string }) {
  const terme = LEXIQUE.find((t) => t.id === id);
  if (!terme) return null;
  return (
    <span className="inline-flex items-center rounded-md bg-bework-blue-soft px-2 py-0.5 text-xs font-medium text-bework-blue">
      {terme.terme}
    </span>
  );
}

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
                <TermeLien key={id} id={id} />
              ))}
            </div>
          </div>
        )}
      </article>

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

export function ParcoursApprentissage() {
  const [selection, setSelection] = useState<ParcoursBtp | null>(null);

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
      </div>

      <ul className="space-y-3" role="list">
        {PARCOURS_BTP.map((parcours) => (
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
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
