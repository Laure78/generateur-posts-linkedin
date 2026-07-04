'use client';

import { QuizLotSpecial } from '@/components/lexique/QuizLotSpecial';
import {
  QUIZ_MENUISERIES_MODULES,
  QUIZ_MENUISERIES_THEME,
} from '@/data/quiz-menuiseries-speciale';

type Props = {
  onRetour?: () => void;
  moduleIdInitial?: string;
};

export function QuizMenuiseriesSpecial(props: Props) {
  return (
    <QuizLotSpecial modules={QUIZ_MENUISERIES_MODULES} theme={QUIZ_MENUISERIES_THEME} {...props} />
  );
}
