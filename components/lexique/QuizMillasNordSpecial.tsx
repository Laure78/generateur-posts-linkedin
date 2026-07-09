'use client';

import { QuizLotSpecial } from '@/components/lexique/QuizLotSpecial';
import {
  QUIZ_MILLAS_NORD_MODULES,
  QUIZ_MILLAS_NORD_THEME,
} from '@/data/quiz-millas-nord-speciale';

type Props = {
  onRetour?: () => void;
  moduleIdInitial?: string;
};

const CHAPITRE_STYLES: Record<string, string> = {
  'Lot 01 — Gros œuvre': 'bg-orange-50 text-orange-900 border-orange-200',
  'Lot 01 — Fondations': 'bg-amber-50 text-amber-900 border-amber-200',
  'Lot 01 — Terrassement': 'bg-amber-50 text-amber-900 border-amber-200',
  'Lot 01 — Réseaux': 'bg-slate-100 text-slate-800 border-slate-200',
  'Lot 01 — Béton armé': 'bg-slate-100 text-slate-800 border-slate-200',
  'Lot 02 — Enduit': 'bg-sky-50 text-sky-900 border-sky-200',
  'Lot 03 — Charpente': 'bg-orange-50 text-orange-900 border-orange-200',
  'Lot 03 — Couverture': 'bg-orange-50 text-orange-900 border-orange-200',
  'Lot 04 — Menuiseries': 'bg-green-50 text-green-900 border-green-200',
  Transversal: 'bg-indigo-50 text-indigo-900 border-indigo-200',
  Acteurs: 'bg-violet-50 text-violet-900 border-violet-200',
  Documents: 'bg-violet-50 text-violet-900 border-violet-200',
};

export function QuizMillasNordSpecial(props: Props) {
  return (
    <QuizLotSpecial
      modules={QUIZ_MILLAS_NORD_MODULES}
      theme={QUIZ_MILLAS_NORD_THEME}
      chapitreStyles={CHAPITRE_STYLES}
      {...props}
    />
  );
}
