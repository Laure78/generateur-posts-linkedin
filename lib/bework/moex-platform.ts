/**
 * Périmètre produit : plateforme dédiée à la maîtrise d'œuvre d'exécution (MOEX).
 * Les types hors MOEX restent en base pour d'anciennes demandes mais ne sont plus proposés.
 */

export const MOEX_PLATFORM = {
  audience: 'MOEX',
  audienceLong: "maîtrise d'œuvre d'exécution (MOEX)",
  scopeLine:
    "Plateforme réservée aux bureaux de maîtrise d'œuvre d'exécution — chantier, marchés, courriers MOA et GPA.",
} as const;

/** Types de mission proposés dans l'outil (assistants MOEX). */
export const MOEX_MISSION_TYPE_IDS = [
  'cr-chantier-moex',
  'cr-chantier-3dm',
  'suivi-observations',
  'courrier-moe',
  'pv-reserves',
  'ordre-service',
  'analyse-dce-moex',
  'comparatif-offres',
  'conformite-offre',
  'situation-travaux',
  'suivi-acquereurs',
  'autre',
] as const;

export type MoexMissionTypeId = (typeof MOEX_MISSION_TYPE_IDS)[number];

const MOEX_LABELS: Record<MoexMissionTypeId, string> = {
  'cr-chantier-moex': 'CR chantier MOEX',
  'cr-chantier-3dm': 'CR chantier (charte 3D Manager)',
  'suivi-observations': 'Suivi des observations',
  'courrier-moe': 'Courriers MOA / relances entreprises',
  'pv-reserves': 'PV réception & réserves',
  'ordre-service': 'Ordre de service',
  'analyse-dce-moex': 'Analyse DCE (MOEX)',
  'comparatif-offres': 'Comparatif offres & RAO',
  'conformite-offre': 'Conformité offre au CCTP',
  'situation-travaux': 'Situation / attachements',
  'suivi-acquereurs': 'Suivi acquéreurs & GPA',
  autre: 'Demande administrative MOEX',
};

/** Libellés historiques (anciennes demandes hors périmètre actuel). */
const LEGACY_LABELS: Record<string, string> = {
  'verification-dtu': 'Vérification DTU × devis',
  'analyse-dce-mh': 'Analyse DCE Monument Historique',
  'gonogo-mh': 'Go / No Go AO patrimoine',
  'controle-memoire': 'Contrôle mémoire technique',
  'dossier-intervention': "Dossier d'intervention",
};

export function isMoexPlatformMissionType(id: string): id is MoexMissionTypeId {
  return (MOEX_MISSION_TYPE_IDS as readonly string[]).includes(id);
}

export function getMissionTypeLabel(id: string): string {
  if (isMoexPlatformMissionType(id)) return MOEX_LABELS[id];
  return LEGACY_LABELS[id] ?? id;
}

export const MOEX_MISSION_TYPES = MOEX_MISSION_TYPE_IDS.map((id) => ({
  id,
  label: MOEX_LABELS[id],
}));

/** Assistants mis en avant sur le tableau de bord MOEX. */
export const MOEX_DASHBOARD_MISSION_TYPES: MoexMissionTypeId[] = [
  'cr-chantier-moex',
  'suivi-observations',
  'courrier-moe',
  'analyse-dce-moex',
  'conformite-offre',
  'pv-reserves',
  'ordre-service',
  'suivi-acquereurs',
];
