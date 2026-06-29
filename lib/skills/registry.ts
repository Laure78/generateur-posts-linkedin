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
    description:
      'Compte rendu MOEX TCE à la charte officielle 3D MANAGER (anthracite/rouge, logo, liséré noir, ISO 9001), observations par lot, reprise des points ouverts.',
    missionTypes: ['cr-chantier-3dm'],
  },
  {
    id: 'promotech-cr-chantier',
    name: 'CR chantier — MOEX PROMOTECH',
    description: 'Compte rendu de chantier logements collectifs IDF, format PROMOTECH.',
    missionTypes: ['cr-chantier-moex'],
  },
  {
    id: 'promotech-suivi-observations',
    name: 'Suivi des observations',
    description:
      'Tableau de suivi des points ouverts entre réunions, retards, relances entreprises et ordre du jour.',
    missionTypes: ['suivi-observations'],
  },
  {
    id: 'promotech-courrier-moe',
    name: 'Courriers MOA / relances entreprises',
    description: 'Relances, mises en demeure, courriers au MOA, notes de diffusion, certificats administratifs MOEX.',
    missionTypes: ['courrier-moe'],
  },
  {
    id: 'promotech-pv-reserves',
    name: 'PV de réception & réserves',
    description: 'PV de réception, listes de réserves par lot, suivi et relances de levée.',
    missionTypes: ['pv-reserves'],
  },
  {
    id: 'moex-suivi-levees-reserves',
    name: 'Suivi levées de réserves',
    description: 'Tableau de suivi des réserves, statuts par lot et projets de relance entreprises.',
    missionTypes: ['suivi-levees-reserves'],
  },
  {
    id: 'moex-pieces-dce',
    name: 'Pièces écrites DCE & DPGF',
    description: 'Mise en page CCTP / RC / CCAP et structuration des tableaux quantitatifs DPGF.',
    missionTypes: ['pieces-ecrites-dce', 'tableau-dpgf'],
  },
  {
    id: 'moex-dc4-sous-traitance',
    name: 'Sous-traitance DC4',
    description: 'DC4, contrôle pièces sous-traitants, agrément MOA, paiement direct et registre par lot.',
    missionTypes: [
      'dc4-sous-traitance',
      'controle-pieces-sous-traitant',
      'agrement-sous-traitance',
      'paiement-direct-delegation',
      'vigilance-urssaf-semestrielle',
      'registre-sous-traitants',
    ],
  },
  {
    id: 'moex-doe-livraison',
    name: 'Constitution DOE',
    description: 'Tableau de suivi DOE, relances pièces manquantes et arborescence GED proposée.',
    missionTypes: ['constitution-doe'],
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
    id: 'promotech-conformite-offre',
    name: 'Conformité offre au CCTP',
    description:
      'Vérification d’une offre entreprise face au CCTP : non-conformités, variantes, postes manquants, cohérence mémoire/prix.',
    missionTypes: ['conformite-offre'],
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
    id: 'promotech-suivi-acquereurs',
    name: 'Suivi acquéreurs & GPA',
    description:
      'Réponses acquéreurs VEFA, réserves à la livraison, suivi GPA et courriers de levée.',
    missionTypes: ['suivi-acquereurs', 'relances-gpa-sav'],
  },
  {
    id: 'assistant-travaux',
    name: 'Assistant MOEX — tâche administrative',
    description:
      'Tâches checklist 3D MANAGER sans assistant IA dédié : mise en forme, suivi, GED, reporting, etc.',
    missionTypes: [
      'ordre-du-jour-reunions',
      'diffusion-cr-ged',
      'registre-plans-exe',
      'relances-consultation',
      'tableau-financier-affaire',
      'decompte-general-definitif',
      'cautions-retenues',
      'trames-iso9001',
      'ged-archivage',
      'reporting-projet',
      'agenda-convocations',
      'veille-appels-offres',
      'dossier-candidature',
      'controle-attestations-entreprises',
      'ppsps-plan-prevention',
      'accueil-telephonique',
      'presentations-clients',
      'autre',
    ],
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
