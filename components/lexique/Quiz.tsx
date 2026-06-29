'use client';

import { useCallback, useMemo, useState } from 'react';
import { LEXIQUE, melanger, type TermeLexique } from '@/data/lexique-btp';

const NB_QUESTIONS = 10;

type Question = {
  terme: TermeLexique;
  options: TermeLexique[];
  bonneReponse: string;
};

function genererQuestions(): Question[] {
  const pool = melanger([...LEXIQUE]);
  const selection = pool.slice(0, Math.min(NB_QUESTIONS, pool.length));

  return selection.map((terme) => {
    const memeFamille = LEXIQUE.filter((t) => t.famille === terme.famille && t.id !== terme.id);
    const autres =
      memeFamille.length >= 3
        ? melanger(memeFamille).slice(0, 3)
        : melanger(LEXIQUE.filter((t) => t.id !== terme.id)).slice(0, 3);
    return { terme, options: melanger([terme, ...autres]), bonneReponse: terme.id };
  });
}

function messageEncouragement(score: number, total: number): string {
  const ratio = score / total;
  if (ratio >= 0.9) return 'Excellent, vous maîtrisez le vocabulaire !';
  if (ratio >= 0.7) return 'Très bien, encore un petit effort.';
  if (ratio >= 0.5) return 'Bon début — refaites une série ou passez par les parcours.';
  return 'Pas de panique : les parcours guidés et les flashcards sont là pour ça.';
}

export function Quiz() {
  const [questions, setQuestions] = useState<Question[]>(() => genererQuestions());
  const [index, setIndex] = useState(0);
  const [choix, setChoix] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [termine, setTermine] = useState(false);

  const question = questions[index];
  const total = questions.length;

  const recommencer = useCallback(() => {
    setQuestions(genererQuestions());
    setIndex(0);
    setChoix(null);
    setScore(0);
    setTermine(false);
  }, []);

  const valider = (optionId: string) => {
    if (choix !== null || !question) return;
    setChoix(optionId);
    if (optionId === question.bonneReponse) setScore((s) => s + 1);
  };

  const suivant = () => {
    if (index + 1 >= total) {
      setTermine(true);
      return;
    }
    setIndex((i) => i + 1);
    setChoix(null);
  };

  const progression = useMemo(
    () => (total > 0 ? ((index + (choix ? 1 : 0)) / total) * 100 : 0),
    [index, choix, total],
  );

  if (termine) {
    return (
      <div className="bework-card px-6 py-10 text-center">
        <p className="bework-kicker">Résultat</p>
        <p className="font-display mt-2 text-4xl font-bold text-[var(--bework-navy)]">
          {score} / {total}
        </p>
        <p className="mt-3 text-slate-500">{messageEncouragement(score, total)}</p>
        <button type="button" onClick={recommencer} className="bework-btn-primary mt-8">
          Recommencer
        </button>
      </div>
    );
  }

  if (!question) {
    return <p className="text-center text-slate-500">Pas assez de termes pour lancer un quiz.</p>;
  }

  const afficherFeedback = choix !== null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>Question {index + 1} / {total}</span>
        <span>Score : {score}</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-[var(--bework-blue)] transition-all"
          style={{ width: `${progression}%` }}
        />
      </div>

      <div className="bework-card p-5 sm:p-6">
        <p className="bework-kicker">Quel terme correspond à cette définition ?</p>
        <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">
          {question.terme.definition}
        </p>
      </div>

      <div className="grid gap-3" role="radiogroup" aria-label="Choix de réponse">
        {question.options.map((opt) => {
          const estChoix = choix === opt.id;
          const estBonne = opt.id === question.bonneReponse;
          let classes =
            'w-full rounded-xl border-2 px-4 py-3.5 text-left text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bework-blue)] sm:text-base ';

          if (!afficherFeedback) {
            classes += 'bework-card border-slate-200 hover:border-[var(--bework-blue)]';
          } else if (estBonne) {
            classes += 'border-emerald-500 bg-emerald-50 text-[var(--bework-navy)]';
          } else if (estChoix && !estBonne) {
            classes += 'border-amber-500 bg-amber-50 text-[var(--bework-navy)]';
          } else {
            classes += 'border-transparent bg-slate-50 text-slate-400 opacity-70';
          }

          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={estChoix}
              disabled={afficherFeedback}
              onClick={() => valider(opt.id)}
              className={classes}
            >
              {opt.terme}
              {afficherFeedback && estBonne && <span className="ml-2 text-emerald-600">✓</span>}
              {afficherFeedback && estChoix && !estBonne && <span className="ml-2 text-amber-600">✗</span>}
            </button>
          );
        })}
      </div>

      {afficherFeedback && choix !== question.bonneReponse && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Bonne réponse : <strong>{question.terme.terme}</strong>
          {question.terme.sigle ? ` (${question.terme.sigle})` : ''}
        </p>
      )}

      {afficherFeedback && (
        <button type="button" onClick={suivant} className="bework-btn-primary w-full">
          {index + 1 >= total ? 'Voir le résultat' : 'Question suivante'}
        </button>
      )}
    </div>
  );
}
