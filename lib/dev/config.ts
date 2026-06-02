/** Mode développement sans Supabase valide (fichiers locaux + auth simplifiée) */
export const DEV_BYPASS =
  process.env.NEXT_PUBLIC_DEV_BYPASS === 'true' ||
  process.env.DEV_BYPASS === 'true';
