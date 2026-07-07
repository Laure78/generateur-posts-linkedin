'use client';

import { QuizLotSpecial } from '@/components/lexique/QuizLotSpecial';
import {
  QUIZ_IMPLANTATION_MODULES,
  QUIZ_IMPLANTATION_THEME,
} from '@/data/quiz-implantation-speciale';

type Props = {
  onRetour?: () => void;
  moduleIdInitial?: string;
};

const CHAPITRE_STYLES: Record<string, string> = {
  Documents: 'bg-violet-50 text-violet-900 border-violet-200',
  Références: 'bg-indigo-50 text-indigo-900 border-indigo-200',
  Terrain: 'bg-cyan-50 text-cyan-900 border-cyan-200',
  'Mode opératoire': 'bg-amber-50 text-amber-900 border-amber-200',
  Contrôle: 'bg-emerald-50 text-emerald-900 border-emerald-200',
};

export function QuizImplantationSpecial(props: Props) {
  return (
    <QuizLotSpecial
      modules={QUIZ_IMPLANTATION_MODULES}
      theme={QUIZ_IMPLANTATION_THEME}
      chapitreStyles={CHAPITRE_STYLES}
      {...props}
    />
  );
}
