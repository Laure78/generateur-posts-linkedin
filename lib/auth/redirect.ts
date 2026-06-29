/** URL de retour OAuth / reset mot de passe (côté navigateur ou serveur). */
export function getAuthCallbackUrl(next: string, origin?: string): string {
  const base =
    origin?.replace(/\/$/, '') ||
    (typeof window !== 'undefined' ? window.location.origin : undefined);
  if (!base) {
    throw new Error('Origin requis pour construire l’URL de callback auth.');
  }
  return `${base}/auth/callback?next=${encodeURIComponent(next)}`;
}

export function formatAuthFetchError(err: unknown): string {
  const msg = err instanceof Error ? err.message : 'Erreur inattendue';
  if (/fetch failed|failed to fetch|network/i.test(msg)) {
    return 'Connexion au service impossible. Vérifiez votre réseau ou réessayez dans quelques instants.';
  }
  return msg;
}
