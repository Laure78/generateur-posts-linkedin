'use client';

import { QuizLotSpecial } from '@/components/lexique/QuizLotSpecial';
import {
  QUIZ_CHARPENTE_MODULES,
  QUIZ_CHARPENTE_THEME,
} from '@/data/quiz-charpente-couverture-speciale';

type Props = {
  onRetour?: () => void;
  moduleIdInitial?: string;
};

export function QuizCharpenteCouvertureSpecial(props: Props) {
  return (
    <QuizLotSpecial modules={QUIZ_CHARPENTE_MODULES} theme={QUIZ_CHARPENTE_THEME} {...props} />
  );
}
