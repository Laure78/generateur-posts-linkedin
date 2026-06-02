import { BEWORK } from './config';

/** Informations légales de l’éditeur — compléter via variables d’environnement en production. */
export const LEGAL = {
  lastUpdated: '2 juin 2026',
  editor: {
    /** Raison sociale ou nom de l’exploitant */
    name: process.env.NEXT_PUBLIC_LEGAL_EDITOR_NAME || 'Laure Olivie',
    tradeName: BEWORK.name,
    legalForm:
      process.env.NEXT_PUBLIC_LEGAL_FORM || 'Entrepreneur individuel (micro-entreprise)',
    siret: process.env.NEXT_PUBLIC_LEGAL_SIRET || '',
    rcs: process.env.NEXT_PUBLIC_LEGAL_RCS || '',
    vatNumber: process.env.NEXT_PUBLIC_LEGAL_TVA || '',
    address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || 'Adresse à compléter — France',
    email: BEWORK.email,
    phone: process.env.NEXT_PUBLIC_LEGAL_PHONE || '',
    publicationDirector:
      process.env.NEXT_PUBLIC_LEGAL_DIRECTOR || 'Laure Olivie',
  },
  hosting: {
    name: 'Railway Corp.',
    address: '548 Market Street PMB 96678, San Francisco, CA 94104, États-Unis',
    website: 'https://railway.com',
  },
  /** Prestataires susceptibles de traiter des données (sous-traitants) */
  processors: [
    { name: 'Supabase Inc.', role: 'Hébergement base de données et authentification (UE/US selon région projet)' },
    { name: 'Anthropic PBC', role: 'Traitement IA des demandes (assistants)' },
    { name: 'Railway Corp.', role: 'Hébergement de l’application' },
  ],
  /** Médiateur de la consommation (obligatoire si vente B2C ; recommandé de le mentionner pour le B2B) */
  mediator: {
    name: process.env.NEXT_PUBLIC_LEGAL_MEDIATOR_NAME || '',
    url: process.env.NEXT_PUBLIC_LEGAL_MEDIATOR_URL || '',
    email: process.env.NEXT_PUBLIC_LEGAL_MEDIATOR_EMAIL || '',
  },
  siteUrl: BEWORK.appUrl,
  vitrineUrl: BEWORK.url,
} as const;

export function formatSiretDisplay(siret: string): string {
  if (!siret.trim()) return 'Non renseigné (contactez l’éditeur)';
  return siret.replace(/(\d{3})(\d{3})(\d{3})(\d{5})/, '$1 $2 $3 $4');
}
