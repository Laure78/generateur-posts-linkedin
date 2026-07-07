'use client';

import { QuizLotSpecial } from '@/components/lexique/QuizLotSpecial';
import {
  QUIZ_BASES_GO_MODULES,
  QUIZ_BASES_GO_THEME,
} from '@/data/quiz-bases-gros-oeuvre-speciale';

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
  Fondations: 'bg-orange-50 text-orange-900 border-orange-200',
  Armatures: 'bg-slate-100 text-slate-800 border-slate-200',
};

export function QuizBasesGrosOeuvreSpecial(props: Props) {
  return (
    <QuizLotSpecial
      modules={QUIZ_BASES_GO_MODULES}
      theme={QUIZ_BASES_GO_THEME}
      chapitreStyles={CHAPITRE_STYLES}
      {...props}
    />
  );
}
