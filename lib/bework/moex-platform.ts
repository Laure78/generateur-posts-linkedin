/**
 * Périmètre produit : plateforme BeWork pour les entreprises du BTP
 * (marchés publics — AO, DCE — et marchés privés — promoteur, lots, contrats).
 * Les assistants métier (skills MOEX, promoteur, etc.) restent inchangés côté technique.
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
    'entreprises du bâtiment et des travaux publics — marchés publics (appels d\'offres, DCE, mémoires) et marchés privés (promoteur, maîtrise d\'œuvre, lots)',
  /** Utilisateurs opérationnels (équipe BeWork + clients entreprise). */
  beworkerRole: 'Assistants travaux (Beworker)',
  platformRoleLine:
    'Plateforme BeWork pour les entreprises du BTP : externalisez l\'administratif chantier et les dossiers de marché — réponses aux appels d\'offres publics (DCE, RC, mémoire technique) et suivi des marchés privés (courriers, réserves, DOE, relances).',
  scopeLine:
    'Marchés publics et privés : CR, analyses DCE, mémoires, courriers MOA, PV de réception, situations de travaux — dépôt, suivi et livrables relus avant diffusion.',
  internalUseShort:
    'BeWork — assistants travaux et équipes BTP. Les livrables IA sont des brouillons à valider avant envoi au maître d\'ouvrage ou au client.',
  internalUseLong:
    'BeWork accompagne les entreprises du BTP qui répondent aux marchés publics et aux marchés privés. L\'IA prépare CR, courriers, synthèses DCE et tableaux de suivi ; chaque document doit être relu et validé par un professionnel (assistant travaux, conducteur de travaux ou dirigeant) avant transmission.',
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
