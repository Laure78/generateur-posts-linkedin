/** Types partagés — quiz terrain par lot (GO, enduits façade…). */

export type QuestionQuizLotSpeciale = {
  id: string;
  chapitre: string;
  contexte?: string;
  question: string;
  options: { id: string; label: string }[];
  bonneReponse: string;
  explication: string;
  termesLies?: string[];
};

export type QuizLotModule = {
  id: string;
  numero: number;
  titre: string;
  sousTitre: string;
  duree: string;
  description: string;
  questions: QuestionQuizLotSpeciale[];
};

export type QuizLotTheme = {
  lotLabel: string;
  hubTitle: string;
  hubDescription: string;
  accentClass: string;
  /** Classes Tailwind complètes (pas de concaténation dynamique). */
  hubCardClass: string;
  introHeaderClass: string;
  buttonClass: string;
  progressClass: string;
  borderClass: string;
  icon: 'hard-hat' | 'paintbrush';
  parcoursLabel?: string;
  scoreMessages: {
    excellent: string;
    good: string;
    ok: string;
    low: string;
  };
};

export function melangerQuestionsLot<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
