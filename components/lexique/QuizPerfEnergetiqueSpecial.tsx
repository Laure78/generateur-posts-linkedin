'use client';

import { QuizLotSpecial } from '@/components/lexique/QuizLotSpecial';
import {
  QUIZ_PERF_MODULES,
  QUIZ_PERF_THEME,
} from '@/data/quiz-perf-energetique-speciale';

type Props = {
  onRetour?: () => void;
  moduleIdInitial?: string;
};

export function QuizPerfEnergetiqueSpecial(props: Props) {
  return <QuizLotSpecial modules={QUIZ_PERF_MODULES} theme={QUIZ_PERF_THEME} {...props} />;
}
