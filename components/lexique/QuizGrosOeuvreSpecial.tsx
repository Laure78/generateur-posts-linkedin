'use client';

import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, HardHat, Lightbulb, RotateCcw } from 'lucide-react';
import {
  QUIZ_GO_MODULES,
  melangerQuestionsGo,
  type QuestionQuizGoSpeciale,
  type QuizGoModule,
} from '@/data/quiz-gros-oeuvre-speciale';

type Phase = 'hub' | 'intro' | 'jeu' | 'resultat';

const CHAPITRE_STYLE: Record<string, string> = {
  Fondations: 'bg-amber-50 text-amber-900 border-amber-200',
  Terrassement: 'bg-orange-50 text-orange-900 border-orange-200',
  Béton: 'bg-slate-100 text-slate-800 border-slate-200',
  Structure: 'bg-blue-50 text-blue-900 border-blue-200',
  Réseaux: 'bg-cyan-50 text-cyan-900 border-cyan-200',
  'Chantier & marché': 'bg-emerald-50 text-emerald-900 border-emerald-200',
};

function messageScore(score: number, total: number): string {
  const r = score / total;
  if (r >= 0.9) return 'Solide sur le gros œuvre — vous avez les réflexes terrain.';
  if (r >= 0.7) return 'Bon niveau — refaites le quiz pour ancrer les pièges restants.';
  if (r >= 0.5) return 'Des bases — parcourez le parcours « Fondations & Gros œuvre » puis réessayez.';
  return 'Normal pour un premier passage : le lexique et le parcours guidé vous aideront.';
}

type Props = {
  onRetour?: () => void;
  /** Ouvre directement un module (ex. go-complet) */
  moduleIdInitial?: string;
};

export function QuizGrosOeuvreSpecial({ onRetour, moduleIdInitial }: Props) {
  const moduleInitial = moduleIdInitial
    ? QUIZ_GO_MODULES.find((m) => m.id === moduleIdInitial)
    : undefined;

  const [phase, setPhase] = useState<Phase>(moduleInitial ? 'intro' : 'hub');
  const [moduleActif, setModuleActif] = useState<QuizGoModule | null>(moduleInitial ?? null);
  const [questions, setQuestions] = useState<QuestionQuizGoSpeciale[]>([]);
  const [index, setIndex] = useState(0);
  const [choix, setChoix] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [indice, setIndice] = useState(false);

  const demarrerModule = useCallback((module: QuizGoModule) => {
    setModuleActif(module);
    setQuestions(melangerQuestionsGo(module.questions));
    setIndex(0);
    setChoix(null);
    setScore(0);
    setIndice(false);
    setPhase('jeu');
  }, []);

  const choisirModule = useCallback((module: QuizGoModule) => {
    setModuleActif(module);
    setPhase('intro');
  }, []);

  const rejouer = useCallback(() => {
    if (!moduleActif) return;
    demarrerModule(moduleActif);
  }, [moduleActif, demarrerModule]);

  const retourHub = useCallback(() => {
    setModuleActif(null);
    setPhase('hub');
    setQuestions([]);
    setIndex(0);
    setChoix(null);
    setScore(0);
  }, []);

  const question = questions[index];
  const total = questions.length;
  const feedback = choix !== null;

  const progression = useMemo(
    () => (total > 0 ? ((index + (feedback ? 1 : 0)) / total) * 100 : 0),
    [index, feedback, total],
  );

  const valider = (id: string) => {
    if (feedback || !question) return;
    setChoix(id);
    if (id === question.bonneReponse) setScore((s) => s + 1);
  };

  const suivant = () => {
    if (index + 1 >= total) {
      setPhase('resultat');
      return;
    }
    setIndex((i) => i + 1);
    setChoix(null);
    setIndice(false);
  };

  const totalQuestions = QUIZ_GO_MODULES.reduce((n, m) => n + m.questions.length, 0);

  if (phase === 'hub') {
    return (
      <div className="space-y-5">
        {onRetour && (
          <button type="button" onClick={onRetour} className="bework-btn-ghost text-sm">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Retour aux quiz
          </button>
        )}

        <div className="bework-card border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-50 p-5">
          <div className="flex items-center gap-2">
            <HardHat className="h-5 w-5 text-amber-700" aria-hidden />
            <p className="text-xs font-bold uppercase tracking-wide text-amber-800">Lot 01 — Gros œuvre</p>
          </div>
          <h2 className="font-display mt-2 text-xl font-bold text-bework-navy">
            {QUIZ_GO_MODULES.length} quiz thématiques
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {totalQuestions} questions terrain au total · situations chantier CCTP logements collectifs
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {QUIZ_GO_MODULES.map((module) => (
            <button
              key={module.id}
              type="button"
              onClick={() => choisirModule(module)}
              className={`rounded-xl border p-4 text-left transition-colors hover:border-amber-400 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-bework-blue ${
                module.id === 'go-complet'
                  ? 'border-amber-300 bg-amber-50/50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <span className="text-xs font-bold text-amber-700">Quiz {module.numero}</span>
              <p className="font-display mt-1 font-bold text-bework-navy">{module.titre}</p>
              <p className="mt-0.5 text-xs text-slate-500">{module.sousTitre}</p>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">
                {module.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'intro' && moduleActif) {
    return (
      <div className="space-y-5">
        <button type="button" onClick={retourHub} className="bework-btn-ghost text-sm">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Tous les quiz GO
        </button>

        <div className="bework-card overflow-hidden border-2 border-amber-300/60 p-0">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 px-5 py-6 text-white">
            <p className="text-xs font-bold uppercase tracking-wider opacity-90">
              Quiz {moduleActif.numero} · Lot GO
            </p>
            <h2 className="font-display mt-2 text-xl font-bold sm:text-2xl">{moduleActif.titre}</h2>
            <p className="mt-1 text-sm text-amber-50">{moduleActif.sousTitre}</p>
          </div>
          <div className="space-y-4 p-5">
            <p className="text-sm leading-relaxed text-slate-600">{moduleActif.description}</p>
            <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              <li className="rounded-lg bg-slate-50 px-3 py-2">
                ✓ {moduleActif.questions.length} questions fixes
              </li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">✓ ~{moduleActif.duree}</li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">✓ Explications à chaque réponse</li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">✓ Ordre mélangé à chaque partie</li>
            </ul>
            <button
              type="button"
              onClick={() => demarrerModule(moduleActif)}
              className="bework-btn-primary w-full bg-amber-600 hover:bg-amber-700"
            >
              <HardHat className="h-4 w-4" aria-hidden />
              Démarrer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'resultat' && moduleActif) {
    const moduleSuivant = QUIZ_GO_MODULES.find((m) => m.numero === moduleActif.numero + 1);

    return (
      <div className="bework-card px-6 py-10 text-center">
        <p className="bework-kicker">
          Quiz {moduleActif.numero} — {moduleActif.titre}
        </p>
        <p className="font-display mt-2 text-4xl font-bold text-bework-navy">
          {score} / {total}
        </p>
        <p className="mt-3 text-slate-600">{messageScore(score, total)}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <button type="button" onClick={rejouer} className="bework-btn-primary">
            <RotateCcw className="h-4 w-4" aria-hidden />
            Rejouer
          </button>
          {moduleSuivant && (
            <button
              type="button"
              onClick={() => demarrerModule(moduleSuivant)}
              className="bework-btn-primary bg-amber-600 hover:bg-amber-700"
            >
              Quiz suivant : {moduleSuivant.titre}
            </button>
          )}
          <button type="button" onClick={retourHub} className="bework-btn-secondary">
            Autres quiz GO
          </button>
          <Link href="/lexique" className="bework-btn-secondary">
            Parcours guidé
          </Link>
        </div>
      </div>
    );
  }

  if (!question || !moduleActif) return null;

  const chapitreClass = CHAPITRE_STYLE[question.chapitre] ?? 'bg-slate-50 text-slate-700 border-slate-200';

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
        <button type="button" onClick={retourHub} className="text-bework-blue hover:underline">
          ← Quiz GO
        </button>
        <span className="truncate text-xs font-medium text-amber-800">{moduleActif.titre}</span>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${chapitreClass}`}
        >
          {question.chapitre}
        </span>
        <span>
          {index + 1}/{total} · {score} pt
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-amber-500 transition-all"
          style={{ width: `${progression}%` }}
        />
      </div>

      <div className="bework-card border-amber-200/60 p-5 sm:p-6">
        {question.contexte && (
          <p className="rounded-lg bg-amber-50/80 px-3 py-2 text-sm italic text-amber-950">
            {question.contexte}
          </p>
        )}
        <p className="font-display mt-3 text-base font-semibold text-bework-navy sm:text-lg">
          {question.question}
        </p>
        {!feedback && (
          <button
            type="button"
            onClick={() => setIndice(true)}
            disabled={indice}
            className="mt-4 flex items-center gap-1.5 text-sm font-medium text-bework-blue hover:underline disabled:opacity-70"
          >
            <Lightbulb className="h-4 w-4" aria-hidden />
            {indice ? `Chapitre : ${question.chapitre}` : 'Indice (chapitre)'}
          </button>
        )}
      </div>

      <div className="grid gap-3" role="radiogroup">
        {question.options.map((opt) => {
          const selected = choix === opt.id;
          const correct = opt.id === question.bonneReponse;
          let cls =
            'w-full rounded-xl border-2 px-4 py-3.5 text-left text-sm font-medium transition-colors sm:text-base ';

          if (!feedback) {
            cls += 'bework-card border-slate-200 hover:border-amber-400';
          } else if (correct) {
            cls += 'border-emerald-500 bg-emerald-50';
          } else if (selected) {
            cls += 'border-amber-500 bg-amber-50';
          } else {
            cls += 'border-transparent bg-slate-50 text-slate-400 opacity-70';
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={feedback}
              onClick={() => valider(opt.id)}
              className={cls}
            >
              {opt.label}
              {feedback && correct && <span className="ml-2 text-emerald-600">✓</span>}
              {feedback && selected && !correct && <span className="ml-2 text-amber-600">✗</span>}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-sm font-semibold text-bework-navy">
            {choix === question.bonneReponse ? '✓ Exact.' : 'À retenir :'}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{question.explication}</p>
          {question.termesLies && question.termesLies.length > 0 && (
            <p className="mt-3 text-xs text-slate-500">
              Lexique : {question.termesLies.slice(0, 3).join(', ')}
              {question.termesLies.length > 3 ? '…' : ''}
            </p>
          )}
        </div>
      )}

      {feedback && (
        <button type="button" onClick={suivant} className="bework-btn-primary w-full">
          {index + 1 >= total ? 'Voir mon score' : 'Question suivante'}
        </button>
      )}
    </div>
  );
}
