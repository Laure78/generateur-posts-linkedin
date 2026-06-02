/**
 * Catalogue des skills Claude AI BeWork — aligné sur les missions terrain / bureau / MOE.
 * Chaque skill correspond à un workflow documenté (fichiers .cursor/skills ou prompts système).
 */

export type SkillDefinition = {
  id: string;
  name: string;
  description: string;
  /** Types de mission qui routent vers ce skill */
  missionTypes: string[];
  /** Skill implémenté côté plateforme (outil intégré) */
  integrated?: boolean;
  /** Route outil interne si intégré */
  toolPath?: string;
};

export const BEWORK_SKILLS: SkillDefinition[] = [
  {
    id: 'verification-dtu-bework',
    name: 'Vérification DTU × devis',
    description:
      'Rapproche chaque ligne d\'un devis BTP du DTU applicable, avec rapport et devis rectifié (sans reproduire le texte officiel AFNOR).',
    missionTypes: ['verification-dtu'],
    integrated: true,
    toolPath: '/plateforme/outils/verification-dtu',
  },
  {
    id: 'compte-rendu-chantier',
    name: 'Compte rendu chantier',
    description: 'Structuration CR, réserves, photos et relances à partir de notes terrain.',
    missionTypes: ['compte-rendu'],
  },
  {
    id: 'relance-moe',
    name: 'Relance MOA / MOE',
    description: 'Rédaction de relances formelles pour validations, situations et pièces manquantes.',
    missionTypes: ['relance-moe'],
  },
  {
    id: 'dossier-intervention',
    name: 'Dossier d\'intervention',
    description: 'Checklist pièces, DT/DICT, autorisations et coordination avant intervention.',
    missionTypes: ['dossier-intervention'],
  },
  {
    id: 'situation-travaux',
    name: 'Situation & attachements',
    description: 'Préparation situations, attachements et suivi BPU/DPGF.',
    missionTypes: ['situation-travaux'],
  },
  {
    id: 'analyse-dce',
    name: 'Analyse DCE / mémoire',
    description: 'Synthèse DCE, points de vigilance et éléments pour mémoire technique.',
    missionTypes: ['dce-memoire'],
  },
  {
    id: 'assistant-travaux',
    name: 'Assistant travaux général',
    description: 'Qualification et traitement des demandes administratives BTP non catégorisées.',
    missionTypes: ['autre'],
  },
];

export function getSkillForMissionType(missionType: string): SkillDefinition | undefined {
  return BEWORK_SKILLS.find((s) => s.missionTypes.includes(missionType));
}

export function getSkillById(skillId: string): SkillDefinition | undefined {
  return BEWORK_SKILLS.find((s) => s.id === skillId);
}
