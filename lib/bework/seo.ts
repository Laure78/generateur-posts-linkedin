import type { Metadata } from 'next';
import { BEWORK } from './config';
import { getSiteUrl } from './site-url';

/** Page vitrine marketing — intention distincte de l'app (pas de canonical cross-domain). */
export const VITRINE_BEWORK_URL = 'https://www.laureolivie.fr/bework';

export const NOINDEX_FOLLOW: Metadata = {
  robots: { index: false, follow: true },
};

export const INDEX_FOLLOW: Metadata = {
  robots: { index: true, follow: true },
};

const DEFAULT_OG_IMAGE = '/images/bework-hero.png';

type AppPageMetadataOptions = {
  title: string;
  description: string;
  /** Chemin sans domaine, ex. `/` ou `/lexique` */
  path: string;
  index?: boolean;
  ogImage?: string;
};

/** Metadata App Router : canonical auto-référent, Open Graph, Twitter. */
export function createAppPageMetadata({
  title,
  description,
  path,
  index = false,
  ogImage = DEFAULT_OG_IMAGE,
}: AppPageMetadataOptions): Metadata {
  const base = getSiteUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = normalizedPath === '/' ? `${base}/` : `${base}${normalizedPath}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url,
      title,
      description,
      siteName: 'BeWork — Plateforme entreprises BTP',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/** JSON-LD SoftwareApplication — landing app uniquement. */
export function buildLandingSoftwareApplicationJsonLd(): Record<string, unknown> {
  const appUrl = `${getSiteUrl()}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'BeWork — Plateforme entreprises BTP',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: appUrl,
    inLanguage: 'fr-FR',
    description:
      'Espace BeWork pour les entreprises du BTP : marchés publics et privés, dépôt de demandes, suivi des livrables et assistants chantier augmentés par l\'IA.',
    provider: {
      '@type': 'Organization',
      name: BEWORK.name,
      url: BEWORK.url,
      sameAs: [BEWORK.url, VITRINE_BEWORK_URL],
    },
  };
}
