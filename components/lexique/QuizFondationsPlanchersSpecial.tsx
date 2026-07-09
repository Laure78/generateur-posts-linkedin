'use client';

import { QuizLotSpecial } from '@/components/lexique/QuizLotSpecial';
import {
  QUIZ_FONDATIONS_PLANCHERS_MODULES,
  QUIZ_FONDATIONS_PLANCHERS_THEME,
} from '@/data/quiz-fondations-planchers-speciale';

type Props = {
  onRetour?: () => void;
  moduleIdInitial?: string;
};

const CHAPITRE_STYLES: Record<string, string> = {
  Fondations: 'bg-orange-50 text-orange-900 border-orange-200',
  Armatures: 'bg-slate-100 text-slate-800 border-slate-200',
  Planchers: 'bg-teal-50 text-teal-900 border-teal-200',
};

export function QuizFondationsPlanchersSpecial(props: Props) {
  return (
    <QuizLotSpecial
      modules={QUIZ_FONDATIONS_PLANCHERS_MODULES}
      theme={QUIZ_FONDATIONS_PLANCHERS_THEME}
      chapitreStyles={CHAPITRE_STYLES}
      {...props}
    />
  );
}
