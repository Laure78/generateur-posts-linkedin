/** Clé localStorage pour les favoris du lexique BeWork */
export const LEXIQUE_FAVORIS_KEY = 'bework-lexique-favoris';

/** Lit la liste des IDs favoris depuis localStorage */
export function lireFavoris(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LEXIQUE_FAVORIS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

/** Enregistre les favoris */
export function ecrireFavoris(ids: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LEXIQUE_FAVORIS_KEY, JSON.stringify(ids));
}

/** Bascule un favori et retourne la nouvelle liste */
export function basculerFavori(id: string, favoris: string[]): string[] {
  const next = favoris.includes(id) ? favoris.filter((f) => f !== id) : [...favoris, id];
  ecrireFavoris(next);
  return next;
}
