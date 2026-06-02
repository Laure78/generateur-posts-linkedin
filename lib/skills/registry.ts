/**
 * Catalogue BeWork — 1 skill = 1 dossier sous skills/<id>/SKILL.md
 * Pas de doublon : chaque type de mission pointe vers un seul skill.
 */

export type SkillDefinition = {
  id: string;
  name: string;
  description: string;
  missionTypes: string[];
  integrated?: boolean;
  toolPath?: string;
};

export const BEWORK_SKILLS: SkillDefinition[] = [
  {
    id: 'verification-dtu-bework',
    name: 'Vérification DTU × devis',
    description:
      'Rapprochement devis / DTU, rapport et devis rectifié (reformulations internes, pas de texte AFNOR).',
    missionTypes: ['verification-dtu'],
    integrated: true,
    toolPath: '/plateforme/outils/verification-dtu',
  },
  {
    id: '3dmanager-cr-chantier',
    name: 'CR chantier — charte 3D MANAGER',
    description: 'Compte rendu MOEX TCE à la charte 3D MANAGER (.docx), observations par lot, reprise des points ouverts.',
    missionTypes: ['cr-chantier-3dm'],
  },
  {
    id: 'promotech-cr-chantier',
    name: 'CR chantier — MOEX PROMOTECH',
    description: 'Compte rendu de chantier logements collectifs IDF, format PROMOTECH.',
    missionTypes: ['cr-chantier-moex'],
  },
  {
    id: 'promotech-courrier-moe',
    name: 'Courriers MOE / relances',
    description: 'Relances, mises en demeure, courriers MOA, notes de diffusion, certificats administratifs.',
    missionTypes: ['courrier-moe'],
  },
  {
    id: 'promotech-pv-reserves',
    name: 'PV de réception & réserves',
    description: 'PV de réception, listes de réserves par lot, suivi et relances de levée.',
    missionTypes: ['pv-reserves'],
  },
  {
    id: 'promotech-ordre-de-service',
    name: 'Ordre de service',
    description: 'OS de prolongation, arrêt, reprise ou prescription technique — mentions obligatoires MOEX.',
    missionTypes: ['ordre-service'],
  },
  {
    id: 'promotech-analyse-dce',
    name: 'Analyse DCE — MOEX',
    description: 'Fiche d’analyse RC / CCAP / CCTP / DPGF pour maîtrise d’œuvre d’exécution (logements collectifs).',
    missionTypes: ['analyse-dce-moex'],
  },
  {
    id: 'promotech-comparatif-offres',
    name: 'Comparatif offres & RAO',
    description: 'Tableau multi-critères, prix anormalement bas, mise au point, recommandation d’attribution.',
    missionTypes: ['comparatif-offres'],
  },
  {
    id: 'balas-analyser-dce-mh',
    name: 'Analyse DCE — Monument Historique',
    description: 'Fiche AO patrimoine : Qualibat MH, références ACMH, contraintes ABF, sujétions cachées.',
    missionTypes: ['analyse-dce-mh'],
  },
  {
    id: 'balas-gonogo-mh',
    name: 'Go / No Go — AO patrimoine',
    description: 'Grille pondérée 9 critères, score /100, recommandation et risques chiffrés (Groupe Balas).',
    missionTypes: ['gonogo-mh'],
  },
  {
    id: 'controle-memoire-technique-btp',
    name: 'Contrôle mémoire technique',
    description: 'Audit MT regard évaluateur marché public : scoring, faiblesses, améliorations avant remise.',
    missionTypes: ['controle-memoire'],
  },
  {
    id: 'dossier-intervention',
    name: 'Dossier d’intervention',
    description: 'Checklist DT/DICT, autorisations, planning et pièces manquantes avant intervention.',
    missionTypes: ['dossier-intervention'],
  },
  {
    id: 'situation-travaux',
    name: 'Situation & attachements',
    description: 'Structuration situation de travaux, BPU/DPGF et pièces justificatives.',
    missionTypes: ['situation-travaux'],
  },
  {
    id: 'assistant-travaux',
    name: 'Assistant travaux général',
    description: 'Demandes administratives BTP non catégorisées.',
    missionTypes: ['autre'],
  },
];

export function getSkillForMissionType(missionType: string): SkillDefinition | undefined {
  return BEWORK_SKILLS.find((s) => s.missionTypes.includes(missionType));
}

export function getSkillById(skillId: string): SkillDefinition | undefined {
  return BEWORK_SKILLS.find((s) => s.id === skillId);
}

export function listSkillsWithFiles(): SkillDefinition[] {
  return BEWORK_SKILLS;
}
