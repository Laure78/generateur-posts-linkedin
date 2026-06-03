/** Types de mission MOEX (alignés sur lib/bework/moex-platform.ts). */
export const MISSION_TYPES = [
  { id: 'cr-chantier-moex', label: 'CR chantier MOEX' },
  { id: 'cr-chantier-3dm', label: 'CR chantier 3D Manager' },
  { id: 'suivi-observations', label: 'Suivi observations' },
  { id: 'courrier-moe', label: 'Courrier MOE' },
  { id: 'pv-reserves', label: 'PV de réserves' },
  { id: 'ordre-service', label: 'Ordre de service' },
  { id: 'analyse-dce-moex', label: 'Analyse DCE MOEX' },
  { id: 'comparatif-offres', label: 'Comparatif offres' },
  { id: 'conformite-offre', label: 'Conformité offre' },
  { id: 'situation-travaux', label: 'Situation travaux' },
  { id: 'autre', label: 'Demande MOEX diverse' },
] as const;

export const STATUS_LABELS: Record<string, string> = {
  recue: 'Reçue',
  en_cours: 'En cours',
  en_attente_validation: 'À valider',
  terminee: 'Terminée',
};

export function getMissionTypeLabel(id: string): string {
  return MISSION_TYPES.find((t) => t.id === id)?.label ?? id;
}
