/**
 * Périmètre produit : plateforme dédiée à la maîtrise d'œuvre d'exécution (MOEX).
 * Les types hors MOEX restent en base pour d'anciennes demandes mais ne sont plus proposés.
 */

import {
  MOEX_CHECKLIST_TASKS,
  MOEX_CHECKLIST_TASK_IDS,
  type MoexChecklistThemeId,
} from './moex-checklist-3dm';

export const MOEX_PLATFORM = {
  /** Donneurs de demandes traitées par les Beworkers. */
  audience: 'MOEX',
  audienceLong: "maîtrise d'œuvre d'exécution (MOEX) externalisée",
  /** Utilisateurs de l'outil (équipe BeWork). */
  beworkerRole: 'Assistants travaux (Beworker)',
  platformRoleLine:
    "Outil interne BeWork permettant aux assistants travaux de traiter les demandes des MOEX — maîtrises d'œuvre d'exécution externalisées.",
  scopeLine:
    "Outil interne pour les assistants travaux (Beworkers) : traitement des demandes administratives des MOEX externalisés (chantier, marchés, courriers MOA, GPA).",
  internalUseShort:
    "Outil interne BeWork — réservé aux assistants travaux (Beworkers). Traitement des demandes MOEX externalisées.",
  internalUseLong:
    "BeWork est l'outil interne de la plateforme BeWork, utilisé par les assistants travaux (Beworkers) pour traiter les demandes des maîtrises d'œuvre d'exécution externalisées (MOEX). Les documents générés par l'IA sont des brouillons de travail : ils doivent être relus, corrigés et validés par un professionnel (assistant travaux et/ou MOEX) avant transmission.",
  /** Alerte affichée sur la plateforme et dans le guide. */
  teamLeaderValidationAlert:
    "Validation par le chef d'équipe obligatoire avant tout envoi au client.",
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
