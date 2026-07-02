'use client';

import { QuizLotSpecial } from '@/components/lexique/QuizLotSpecial';
import {
  QUIZ_GO_MODULES,
  QUIZ_GO_THEME,
} from '@/data/quiz-gros-oeuvre-speciale';

type Props = {
  onRetour?: () => void;
  moduleIdInitial?: string;
};

export function QuizGrosOeuvreSpecial(props: Props) {
  return <QuizLotSpecial modules={QUIZ_GO_MODULES} theme={QUIZ_GO_THEME} {...props} />;
}
