/** Identité et URLs BeWork — relais administratif marchés travaux BTP / MOE */
export const BEWORK = {
  name: 'BeWork',
  tagline: 'Relais administratif pour marchés travaux BTP',
  /** Site vitrine */
  url: 'https://www.bework.fr',
  /** Plateforme client (prod) */
  appUrl: 'https://app.bework.fr',
  email: 'contact@bework.fr',
  accent: '#1D4ED8',
  accentSoft: '#DBEAFE',
} as const;

export const MISSION_TYPES = [
  { id: 'verification-dtu', label: 'Vérification DTU × devis', skillId: 'verification-dtu-bework', icon: '📋' },
  { id: 'compte-rendu', label: 'Compte rendu chantier', skillId: 'compte-rendu-chantier', icon: '📝' },
  { id: 'relance-moe', label: 'Relance MOA / MOE', skillId: 'relance-moe', icon: '📨' },
  { id: 'dossier-intervention', label: 'Dossier d\'intervention', skillId: 'dossier-intervention', icon: '📁' },
  { id: 'situation-travaux', label: 'Situation / attachements', skillId: 'situation-travaux', icon: '💶' },
  { id: 'dce-memoire', label: 'Analyse DCE / mémoire technique', skillId: 'analyse-dce', icon: '📐' },
  { id: 'autre', label: 'Autre demande administrative', skillId: 'assistant-travaux', icon: '✉️' },
] as const;

export type MissionTypeId = (typeof MISSION_TYPES)[number]['id'];
