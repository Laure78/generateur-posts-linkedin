/** Types de mission — alignés sur lib/bework/moex-checklist-3dm.ts */
import { MOEX_CHECKLIST_TASKS } from '../../lib/bework/moex-checklist-3dm';

export const MISSION_TYPES = MOEX_CHECKLIST_TASKS.map((t) => ({
  id: t.id,
  label: t.label,
}));

const LABELS = Object.fromEntries(MISSION_TYPES.map((t) => [t.id, t.label]));

export function getMissionTypeLabel(id: string): string {
  return LABELS[id] ?? id;
}

export const STATUS_LABELS: Record<string, string> = {
  recue: 'Reçue',
  en_cours: 'En cours',
  en_attente_validation: 'À valider',
  terminee: 'Terminée',
};
