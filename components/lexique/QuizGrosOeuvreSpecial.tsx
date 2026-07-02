'use client';

import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, HardHat, Lightbulb, RotateCcw } from 'lucide-react';
import {
  QUESTIONS_QUIZ_GO_SPECIALE,
  QUIZ_GO_SPECIAL_META,
  melangerQuestionsGo,
  type QuestionQuizGoSpeciale,
} from '@/data/quiz-gros-oeuvre-speciale';

type Phase = 'intro' | 'jeu' | 'resultat';

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
};

export function QuizGrosOeuvreSpecial({ onRetour }: Props) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [questions, setQuestions] = useState<QuestionQuizGoSpeciale[]>([]);
  const [index, setIndex] = useState(0);
  const [choix, setChoix] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [indice, setIndice] = useState(false);

  const demarrer = useCallback(() => {
    setQuestions(melangerQuestionsGo(QUESTIONS_QUIZ_GO_SPECIALE));
    setIndex(0);
    setChoix(null);
    setScore(0);
    setIndice(false);
    setPhase('jeu');
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

  if (phase === 'intro') {
    return (
      <div className="space-y-5">
        {onRetour && (
          <button type="button" onClick={onRetour} className="bework-btn-ghost text-sm">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Retour aux quiz
          </button>
        )}

        <div className="bework-card overflow-hidden border-2 border-amber-300/60 p-0">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 px-5 py-6 text-white">
            <div className="flex items-center gap-2">
              <HardHat className="h-6 w-6" aria-hidden />
              <p className="text-xs font-bold uppercase tracking-wider opacity-90">Quiz terrain</p>
            </div>
            <h2 className="font-display mt-2 text-xl font-bold sm:text-2xl">{QUIZ_GO_SPECIAL_META.titre}</h2>
            <p className="mt-1 text-sm text-amber-50">{QUIZ_GO_SPECIAL_META.sousTitre}</p>
          </div>
          <div className="space-y-4 p-5">
            <p className="text-sm leading-relaxed text-slate-600">{QUIZ_GO_SPECIAL_META.description}</p>
            <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              <li className="rounded-lg bg-slate-50 px-3 py-2">✓ 15 questions fixes, mises en situation</li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">✓ Fondations → structure → réseaux → marché</li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">✓ Explications détaillées à chaque réponse</li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">✓ ~{QUIZ_GO_SPECIAL_META.duree} · niveau conducteur / chef de chantier</li>
            </ul>
            <button type="button" onClick={demarrer} className="bework-btn-primary w-full">
              <HardHat className="h-4 w-4" aria-hidden />
              Démarrer le quiz spécial
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'resultat') {
    return (
      <div className="bework-card px-6 py-10 text-center">
        <p className="bework-kicker">{QUIZ_GO_SPECIAL_META.titre}</p>
        <p className="font-display mt-2 text-4xl font-bold text-bework-navy">
          {score} / {total}
        </p>
        <p className="mt-3 text-slate-600">{messageScore(score, total)}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" onClick={demarrer} className="bework-btn-primary">
            <RotateCcw className="h-4 w-4" aria-hidden />
            Rejouer (ordre mélangé)
          </button>
          <Link href="/lexique" className="bework-btn-secondary">
            Parcours Fondations &amp; GO
          </Link>
          {onRetour && (
            <button type="button" onClick={onRetour} className="bework-btn-secondary">
              Autres quiz
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!question) return null;

  const chapitreClass = CHAPITRE_STYLE[question.chapitre] ?? 'bg-slate-50 text-slate-700 border-slate-200';

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
        <button type="button" onClick={onRetour} className="text-bework-blue hover:underline">
          ← Quitter
        </button>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${chapitreClass}`}
        >
          {question.chapitre}
        </span>
        <span>
          {index + 1} / {total} · Score {score}
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
              Voir aussi dans le lexique :{' '}
              {question.termesLies.slice(0, 3).join(', ')}
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
