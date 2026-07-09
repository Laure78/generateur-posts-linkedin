'use client';

import { QuizLotSpecial } from '@/components/lexique/QuizLotSpecial';
import {
  QUIZ_MILLAS_NORD_SECOND_OEUVRE_MODULES,
  QUIZ_MILLAS_NORD_SECOND_OEUVRE_THEME,
} from '@/data/quiz-millas-nord-second-oeuvre-speciale';

type Props = {
  onRetour?: () => void;
  moduleIdInitial?: string;
};

const CHAPITRE_STYLES: Record<string, string> = {
  'Lot 05 — Menuiseries int.': 'bg-amber-50 text-amber-900 border-amber-200',
  'Lot 06 — Serrurerie': 'bg-slate-100 text-slate-800 border-slate-200',
  'Lot 07 — Plâtrerie': 'bg-violet-50 text-violet-900 border-violet-200',
  'Lot 08 — CVC': 'bg-cyan-50 text-cyan-900 border-cyan-200',
  'Lot 08 — Plomberie': 'bg-cyan-50 text-cyan-900 border-cyan-200',
  'Lot 09 — Électricité': 'bg-yellow-50 text-yellow-900 border-yellow-200',
  'Lot 10 — Carrelage': 'bg-stone-50 text-stone-800 border-stone-200',
  'Lot 11 — Peinture': 'bg-pink-50 text-pink-900 border-pink-200',
  'Lot 12 — VRD': 'bg-emerald-50 text-emerald-900 border-emerald-200',
  'Lot 13 — Réseaux secs': 'bg-blue-50 text-blue-900 border-blue-200',
  'Lot 14 — AEP / incendie': 'bg-red-50 text-red-900 border-red-200',
  'Lot 15 — Paysage': 'bg-green-50 text-green-900 border-green-200',
  'Lot 16 — Désamiantage': 'bg-orange-50 text-orange-900 border-orange-200',
  Transversal: 'bg-rose-50 text-rose-900 border-rose-200',
};

export function QuizMillasNordSecondOeuvreSpecial(props: Props) {
  return (
    <QuizLotSpecial
      modules={QUIZ_MILLAS_NORD_SECOND_OEUVRE_MODULES}
      theme={QUIZ_MILLAS_NORD_SECOND_OEUVRE_THEME}
      chapitreStyles={CHAPITRE_STYLES}
      {...props}
    />
  );
}
