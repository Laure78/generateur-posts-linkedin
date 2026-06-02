/** Identité et URLs BeWork — relais administratif marchés travaux BTP / MOE */
export const BEWORK = {
  name: 'BeWork',
  /** Tagline plateforme / logo */
  brandTagline: "Assistants travaux augmentés par l'IA",
  /** Description métier */
  tagline: 'Relais administratif pour marchés travaux BTP',
  url: 'https://www.bework.fr',
  appUrl: 'https://app.laureolivie.fr',
  email: 'contact@bework.fr',
  accent: '#2563EB',
  accentBright: '#377CF3',
  accentSoft: '#DBEAFE',
  logo: '/images/bework-logo.png',
  logoBlueprint: '/images/bework-logo.png',
} as const;

/** Types de demande affichés à la création — 1 entrée = 1 skill (voir lib/skills/registry.ts) */
export const MISSION_TYPES = [
  { id: 'verification-dtu', label: 'Vérification DTU × devis' },
  { id: 'cr-chantier-3dm', label: 'CR chantier (charte 3D Manager)' },
  { id: 'cr-chantier-moex', label: 'CR chantier MOEX' },
  { id: 'suivi-observations', label: 'Suivi des observations' },
  { id: 'courrier-moe', label: 'Courriers MOE / relances' },
  { id: 'pv-reserves', label: 'PV réception & réserves' },
  { id: 'ordre-service', label: 'Ordre de service' },
  { id: 'analyse-dce-moex', label: 'Analyse DCE (MOEX)' },
  { id: 'comparatif-offres', label: 'Comparatif offres & RAO' },
  { id: 'conformite-offre', label: 'Conformité offre au CCTP' },
  { id: 'analyse-dce-mh', label: 'Analyse DCE Monument Historique' },
  { id: 'gonogo-mh', label: 'Go / No Go AO patrimoine' },
  { id: 'controle-memoire', label: 'Contrôle mémoire technique' },
  { id: 'dossier-intervention', label: "Dossier d'intervention" },
  { id: 'situation-travaux', label: 'Situation / attachements' },
  { id: 'suivi-acquereurs', label: 'Suivi acquéreurs & GPA' },
  { id: 'autre', label: 'Autre demande administrative' },
] as const;

export type MissionTypeId = (typeof MISSION_TYPES)[number]['id'];
