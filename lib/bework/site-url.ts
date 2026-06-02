import { BEWORK } from './config';

/** URL publique de la plateforme (auth, API internes, sitemap). */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  return fromEnv || BEWORK.appUrl;
}
