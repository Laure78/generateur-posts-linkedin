import { MISSION_TYPES } from './config';
import { getSkillForMissionType } from '@/lib/skills/registry';

export type MissionCategoryId =
  | 'chantier'
  | 'marches'
  | 'courriers'
  | 'technique'
  | 'livraison'
  | 'autre';

export type MissionCategory = {
  id: MissionCategoryId;
  label: string;
  description: string;
};

export const MISSION_CATEGORIES: MissionCategory[] = [
  {
    id: 'chantier',
    label: 'Chantier & suivi',
    description: 'Comptes rendus, observations, réception',
  },
  {
    id: 'marches',
    label: 'Marchés & offres',
    description: 'DCE, conformité, comparatifs, mémoires',
  },
  {
    id: 'courriers',
    label: 'Courriers & contractuel',
    description: 'Relances, OS, situations, dossiers',
  },
  {
    id: 'technique',
    label: 'Conformité technique',
    description: 'DTU, normes, devis',
  },
  {
    id: 'livraison',
    label: 'Livraison & GPA',
    description: 'Acquéreurs, garanties, réserves',
  },
  {
    id: 'autre',
    label: 'Autre besoin',
    description: 'Demande administrative libre',
  },
];

type MissionMeta = {
  category: MissionCategoryId;
  titlePlaceholder: string;
  briefPlaceholder: string;
  briefHint: string;
};

const META: Record<string, MissionMeta> = {
  'verification-dtu': {
    category: 'technique',
    titlePlaceholder: 'Ex. : Devis menuiserie — Résidence Les Ormes',
    briefPlaceholder: 'Collez le devis et précisez les lots ou postes à vérifier face aux DTU…',
    briefHint: 'Joignez le texte du devis ou les postes concernés.',
  },
  'cr-chantier-3dm': {
    category: 'chantier',
    titlePlaceholder: 'Ex. : CR n°24 — 38 logements Villejuif',
    briefPlaceholder: 'Notes de visite, dictée ou vocal transcrit. Indiquez le n° de CR et le CR précédent si disponible…',
    briefHint: 'Charte 3D MANAGER — observations par lot, reprise des points ouverts.',
  },
  'cr-chantier-moex': {
    category: 'chantier',
    titlePlaceholder: 'Ex. : CR hebdo — Opération Les Tilleuls',
    briefPlaceholder: 'Collez vos constats de visite. Mentionnez le CR précédent pour reprendre les points non soldés…',
    briefHint: 'Format PROMOTECH — factuel, par corps d’état.',
  },
  'suivi-observations': {
    category: 'chantier',
    titlePlaceholder: 'Ex. : Suivi observations — Mars 2026',
    briefPlaceholder: 'Collez les derniers CR ou listez les points ouverts à suivre entre deux réunions…',
    briefHint: 'Tableau de suivi, retards, relances et ordre du jour.',
  },
  'courrier-moe': {
    category: 'courriers',
    titlePlaceholder: 'Ex. : Relance Lot 02 GO — réserves non levées',
    briefPlaceholder: 'Destinataire, faits, dates des relances antérieures, action attendue et délai…',
    briefHint: 'Relance, mise en demeure, courrier MOA ou note de diffusion.',
  },
  'pv-reserves': {
    category: 'chantier',
    titlePlaceholder: 'Ex. : PV réception — Phase 2',
    briefPlaceholder: 'Listez les réserves par lot, entreprises concernées et échéances de levée…',
    briefHint: 'PV de réception et suivi des réserves entreprises.',
  },
  'ordre-service': {
    category: 'courriers',
    titlePlaceholder: 'Ex. : OS prolongation délai — Lot 14 CVC',
    briefPlaceholder: 'Type d’OS (prolongation, arrêt, reprise, prescription), motif, délai, entreprise…',
    briefHint: 'Mentions obligatoires MOEX et traçabilité contractuelle.',
  },
  'analyse-dce-moex': {
    category: 'marches',
    titlePlaceholder: 'Ex. : Analyse DCE — Résidence Bel Air',
    briefPlaceholder: 'Collez ou décrivez les pièces : RC, CCAP, CCTP, DPGF. Indiquez l’opération et le lot…',
    briefHint: 'Fiche d’analyse MOEX — clauses à risque et questions au MOA.',
  },
  'comparatif-offres': {
    category: 'marches',
    titlePlaceholder: 'Ex. : Comparatif Lot 05 menuiserie',
    briefPlaceholder: 'Collez les offres reçues et les critères d’attribution du RC…',
    briefHint: 'Tableau multi-critères et recommandation d’attribution.',
  },
  'conformite-offre': {
    category: 'marches',
    titlePlaceholder: 'Ex. : Conformité offre Entreprise X — Lot GO',
    briefPlaceholder: 'Collez l’offre / mémoire technique et les exigences CCTP du lot…',
    briefHint: 'Non-conformités, variantes et postes manquants.',
  },
  'analyse-dce-mh': {
    category: 'marches',
    titlePlaceholder: 'Ex. : AO patrimoine — Hôtel particulier',
    briefPlaceholder: 'Pièces du DCE patrimoine, contraintes ABF, références exigées…',
    briefHint: 'Monument historique — Qualibat MH, sujétions cachées.',
  },
  'gonogo-mh': {
    category: 'marches',
    titlePlaceholder: 'Ex. : Go / No Go — Restauration façade',
    briefPlaceholder: 'Synthèse du DCE, risques identifiés, capacité de l’entreprise…',
    briefHint: 'Grille pondérée et recommandation Go / No Go.',
  },
  'controle-memoire': {
    category: 'marches',
    titlePlaceholder: 'Ex. : MT Lot étanchéité — AO Ville X',
    briefPlaceholder: 'Collez le mémoire technique et les exigences du RC / CCTP…',
    briefHint: 'Scoring regard évaluateur avant remise.',
  },
  'dossier-intervention': {
    category: 'courriers',
    titlePlaceholder: 'Ex. : Dossier intervention réseaux',
    briefPlaceholder: 'Nature de l’intervention, planning, pièces déjà disponibles et manquantes…',
    briefHint: 'DT/DICT, autorisations et checklist.',
  },
  'situation-travaux': {
    category: 'courriers',
    titlePlaceholder: 'Ex. : Situation n°3 — Lot 08',
    briefPlaceholder: 'Postes réalisés, quantités, pièces justificatives, BPU/DPGF…',
    briefHint: 'Structuration situation et attachements.',
  },
  'suivi-acquereurs': {
    category: 'livraison',
    titlePlaceholder: 'Ex. : Réclamation logement B12',
    briefPlaceholder: 'Nature (réserve livraison, GPA, réclamation), faits, historique des échanges…',
    briefHint: 'Réponse acquéreur, suivi GPA ou synthèse des réserves.',
  },
  autre: {
    category: 'autre',
    titlePlaceholder: 'Ex. : Demande administrative diverse',
    briefPlaceholder: 'Décrivez précisément votre besoin et les pièces jointes disponibles…',
    briefHint: 'Un Beworker qualifie et oriente vers le bon assistant.',
  },
};

const DEFAULT_META: MissionMeta = {
  category: 'autre',
  titlePlaceholder: 'Titre ou référence de la demande',
  briefPlaceholder: 'Décrivez votre besoin et collez les pièces utiles…',
  briefHint: 'Soyez le plus précis possible pour un traitement rapide.',
};

export function getMissionMeta(missionTypeId: string): MissionMeta {
  return META[missionTypeId] ?? DEFAULT_META;
}

export function getMissionCategory(missionTypeId: string): MissionCategoryId {
  return getMissionMeta(missionTypeId).category;
}

export type CatalogMission = {
  id: string;
  label: string;
  icon: string;
  category: MissionCategoryId;
  skillName: string;
  skillDescription: string;
  integrated: boolean;
  titlePlaceholder: string;
  briefPlaceholder: string;
  briefHint: string;
};

export function getCatalogMissions(): CatalogMission[] {
  return MISSION_TYPES.map((t) => {
    const skill = getSkillForMissionType(t.id);
    const meta = getMissionMeta(t.id);
    return {
      id: t.id,
      label: t.label,
      icon: t.icon,
      category: meta.category,
      skillName: skill?.name ?? 'Assistant BeWork',
      skillDescription: skill?.description ?? 'Traitement par un assistant IA supervisé.',
      integrated: Boolean(skill?.integrated),
      titlePlaceholder: meta.titlePlaceholder,
      briefPlaceholder: meta.briefPlaceholder,
      briefHint: meta.briefHint,
    };
  });
}

export function getMissionsByCategory(categoryId: MissionCategoryId): CatalogMission[] {
  return getCatalogMissions().filter((m) => m.category === categoryId);
}
