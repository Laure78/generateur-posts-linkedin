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
  logoBlueprint: '/images/bework-logo-blueprint.png',
} as const;

/** Types de demande affichés à la création — 1 entrée = 1 skill (voir lib/skills/registry.ts) */
export const MISSION_TYPES = [
  { id: 'verification-dtu', label: 'Vérification DTU × devis', icon: '📋' },
  { id: 'cr-chantier-3dm', label: 'CR chantier (charte 3D Manager)', icon: '📝' },
  { id: 'cr-chantier-moex', label: 'CR chantier MOEX', icon: '📋' },
  { id: 'suivi-observations', label: 'Suivi des observations', icon: '📌' },
  { id: 'courrier-moe', label: 'Courriers MOE / relances', icon: '📨' },
  { id: 'pv-reserves', label: 'PV réception & réserves', icon: '✅' },
  { id: 'ordre-service', label: 'Ordre de service', icon: '📄' },
  { id: 'analyse-dce-moex', label: 'Analyse DCE (MOEX)', icon: '📐' },
  { id: 'comparatif-offres', label: 'Comparatif offres & RAO', icon: '⚖️' },
  { id: 'conformite-offre', label: 'Conformité offre au CCTP', icon: '🛡️' },
  { id: 'analyse-dce-mh', label: 'Analyse DCE Monument Historique', icon: '🏛️' },
  { id: 'gonogo-mh', label: 'Go / No Go AO patrimoine', icon: '🎯' },
  { id: 'controle-memoire', label: 'Contrôle mémoire technique', icon: '🔍' },
  { id: 'dossier-intervention', label: "Dossier d'intervention", icon: '📁' },
  { id: 'situation-travaux', label: 'Situation / attachements', icon: '💶' },
  { id: 'suivi-acquereurs', label: 'Suivi acquéreurs & GPA', icon: '🏠' },
  { id: 'autre', label: 'Autre demande administrative', icon: '✉️' },
] as const;

export type MissionTypeId = (typeof MISSION_TYPES)[number]['id'];
