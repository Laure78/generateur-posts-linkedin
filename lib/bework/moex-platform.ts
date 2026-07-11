/**
 * Périmètre produit : plateforme BeWork pour les entreprises du BTP
 * (marchés publics — AO, DCE — et marchés privés — promoteur, lots, contrats).
 */

import {
  MOEX_CHECKLIST_TASKS,
  MOEX_CHECKLIST_TASK_IDS,
  type MoexChecklistThemeId,
} from './moex-checklist-3dm';

export const MOEX_PLATFORM = {
  /** Public cible de la plateforme. */
  audience: 'Entreprises BTP',
  audienceLong:
    'entreprises du bâtiment et des travaux publics — marchés publics (appels d\'offres, DCE, mémoires) et marchés privés (promoteur, lots, contrats)',
  /** Utilisateurs opérationnels (équipe BeWork + clients entreprise). */
  beworkerRole: 'Assistants travaux (Beworker)',
  platformRoleLine:
    'Assistant travaux externalisé pour les entreprises d\'exécution : renfort administratif, documentaire et opérationnel — marchés publics (DCE, mémoires, AO) et privés (courriers, réserves, DOE). BeWork ne remplace pas la MOE.',
  scopeLine:
    'Prépare, structure et alerte : CR internes, synthèses DCE, relances, tableaux de suivi, DOE — chaque livrable engageant reste validé par votre équipe avant diffusion.',
  internalUseShort:
    'BeWork — assistant travaux côté entreprise. Les livrables IA sont des brouillons à valider avant envoi au maître d\'ouvrage, à la MOE ou au client.',
  internalUseLong:
    'BeWork est le bras droit administratif du conducteur de travaux : préparation, organisation, relance et classement. Les décisions techniques, financières, contractuelles et de sécurité restent validées par l\'entreprise. BeWork ne se substitue pas à la MOE ni au conducteur de travaux.',
  teamLeaderValidationAlert:
    'Validation par le chef d\'équipe ou le responsable entreprise obligatoire avant tout envoi au client ou au maître d\'ouvrage.',
  /** Libellés courts pour cartes landing / dashboard. */
  marketsPublicLabel: 'Marchés publics',
  marketsPublicHint: 'AO, DCE, RC, mémoire technique, conformité des offres',
  marketsPrivateLabel: 'Marchés privés',
  marketsPrivateHint: 'Promoteur, lots, réserves, DOE, courriers et relances',
} as const;

/** Types de mission proposés dans l'outil (checklist 3D MANAGER + besoin libre). */
export const MOEX_MISSION_TYPE_IDS = MOEX_CHECKLIST_TASK_IDS;

export type MoexMissionTypeId = (typeof MOEX_MISSION_TYPE_IDS)[number];

const MOEX_LABELS: Record<string, string> = Object.fromEntries(
  MOEX_CHECKLIST_TASKS.map((t) => [t.id, t.label])
);

/** Libellés historiques (anciennes demandes hors périmètre actuel). */
const LEGACY_LABELS: Record<string, string> = {
  'verification-dtu': 'Vérification DTU × devis',
  'analyse-dce-mh': 'Analyse DCE Monument Historique',
  'gonogo-mh': 'Go / No Go AO patrimoine',
  'controle-memoire': 'Contrôle mémoire technique',
};

export function isMoexPlatformMissionType(id: string): id is MoexMissionTypeId {
  return (MOEX_MISSION_TYPE_IDS as readonly string[]).includes(id);
}

export function getMissionTypeLabel(id: string): string {
  if (MOEX_LABELS[id]) return MOEX_LABELS[id];
  return LEGACY_LABELS[id] ?? id;
}

export function getMissionThemeId(missionTypeId: string): MoexChecklistThemeId | undefined {
  return MOEX_CHECKLIST_TASKS.find((t) => t.id === missionTypeId)?.theme;
}

export const MOEX_MISSION_TYPES = MOEX_CHECKLIST_TASKS.map((t) => ({
  id: t.id,
  label: t.label,
}));

/** Assistants mis en avant sur le tableau de bord (échantillon par thème). */
export const MOEX_DASHBOARD_MISSION_TYPES: MoexMissionTypeId[] = [
  'cr-chantier-3dm',
  'suivi-observations',
  'courrier-moe',
  'ordre-service',
  'comparatif-offres',
  'situation-travaux',
  'pv-reserves',
  'dc4-sous-traitance',
  'autre',
];
