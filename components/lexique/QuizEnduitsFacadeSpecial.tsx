'use client';

import { QuizLotSpecial } from '@/components/lexique/QuizLotSpecial';
import {
  QUIZ_ENDUITS_MODULES,
  QUIZ_ENDUITS_THEME,
} from '@/data/quiz-enduits-facade-speciale';

type Props = {
  onRetour?: () => void;
  moduleIdInitial?: string;
};

export function QuizEnduitsFacadeSpecial(props: Props) {
  return <QuizLotSpecial modules={QUIZ_ENDUITS_MODULES} theme={QUIZ_ENDUITS_THEME} {...props} />;
}
