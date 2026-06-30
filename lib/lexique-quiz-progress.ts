/** Termes déjà soumis (réponse validée) — persistance locale du quiz lexique. */
export const LEXIQUE_QUIZ_SOUMIS_KEY = 'bework-lexique-quiz-soumis';

export function lireTermesSoumisQuiz(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(LEXIQUE_QUIZ_SOUMIS_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === 'string'));
  } catch {
    return new Set();
  }
}

export function ecrireTermesSoumisQuiz(ids: Iterable<string>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LEXIQUE_QUIZ_SOUMIS_KEY, JSON.stringify([...ids]));
}

export function marquerTermeSoumisQuiz(id: string): Set<string> {
  const next = lireTermesSoumisQuiz();
  next.add(id);
  ecrireTermesSoumisQuiz(next);
  return next;
}

export function reinitialiserTermesSoumisQuiz(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LEXIQUE_QUIZ_SOUMIS_KEY);
}
