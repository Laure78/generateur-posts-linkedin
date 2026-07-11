import { MISSION_TYPES } from './config';
import { isMoexPlatformMissionType } from './moex-platform';
import {
  MOEX_CHECKLIST_THEMES,
  MOEX_CHECKLIST_TASKS,
  getChecklistTask,
  type MoexChecklistThemeId,
} from './moex-checklist-3dm';
import { getSkillForMissionType } from '@/lib/skills/registry';

export type MissionCategoryId = MoexChecklistThemeId;

export type MissionCategory = {
  id: MissionCategoryId;
  label: string;
  description: string;
};

/** Thèmes checklist 3D MANAGER (A → H + besoin libre). */
export const MISSION_CATEGORIES: MissionCategory[] = MOEX_CHECKLIST_THEMES.map((t) => ({
  id: t.id,
  label: t.letter ? `${t.letter} — ${t.label}` : t.label,
  description: t.description,
}));

type MissionMeta = {
  category: MissionCategoryId;
  titlePlaceholder: string;
  briefPlaceholder: string;
  briefHint: string;
};

function checklistMeta(theme: MissionCategoryId, taskLabel: string): MissionMeta {
  return {
    category: theme,
    titlePlaceholder: `Ex. : ${taskLabel.slice(0, 48)}…`,
    briefPlaceholder: `Contexte chantier / affaire, pièces jointes, délai et format attendu pour : ${taskLabel}…`,
    briefHint: 'Checklist externalisation 3D MANAGER — précisez lots, entreprises et références contractuelles.',
  };
}

const SPECIFIC_META: Record<string, Partial<MissionMeta>> = {
  'verification-dtu': {
    category: 'autre',
    titlePlaceholder: 'Ex. : Devis menuiserie — Résidence Les Ormes',
    briefPlaceholder: 'Collez le devis et précisez les lots ou postes à vérifier face aux DTU…',
    briefHint: 'Joignez le texte du devis ou les postes concernés.',
  },
  'cr-chantier-3dm': {
    titlePlaceholder: 'Ex. : CR n°24 — 38 logements Villejuif',
    briefPlaceholder:
      'Notes de visite, dictée ou vocal transcrit. Indiquez le n° de CR et le CR précédent si disponible…',
    briefHint: 'Charte 3D MANAGER — observations par lot, reprise des points ouverts.',
  },
  'cr-chantier-moex': {
    titlePlaceholder: 'Ex. : CR hebdo — Opération Les Tilleuls',
    briefPlaceholder: 'Collez vos constats de visite. Mentionnez le CR précédent pour reprendre les points non soldés…',
    briefHint: 'Format PROMOTECH — factuel, par corps d’état.',
  },
  'suivi-observations': {
    titlePlaceholder: 'Ex. : Suivi observations — Mars 2026',
    briefPlaceholder: 'Collez les derniers CR ou listez les points ouverts à suivre entre deux réunions…',
    briefHint: 'Tableau de suivi, retards, relances et ordre du jour.',
  },
  'courrier-moe': {
    category: 'pilotage-entreprises',
    titlePlaceholder: 'Ex. : Relance Lot 02 GO — réserves non levées',
    briefPlaceholder: 'Destinataire, faits, dates des relances antérieures, action attendue et délai…',
    briefHint: 'Relance entreprise, mise en demeure, courrier au MOA ou note de diffusion.',
  },
  'pv-reserves': {
    titlePlaceholder: 'Ex. : PV réception — Phase 2',
    briefPlaceholder: 'Listez les réserves par lot, entreprises concernées et échéances de levée…',
    briefHint: 'PV de réception et listes de réserves (OPR).',
  },
  'ordre-service': {
    category: 'pilotage-entreprises',
    titlePlaceholder: 'Ex. : OS prolongation délai — Lot 14 CVC',
    briefPlaceholder: 'Type d’OS (prolongation, arrêt, reprise, prescription), motif, délai, entreprise…',
    briefHint: 'Mentions obligatoires et traçabilité contractuelle.',
  },
  'analyse-dce-moex': {
    titlePlaceholder: 'Ex. : Analyse DCE — Résidence Bel Air',
    briefPlaceholder: 'Collez ou décrivez les pièces : RC, CCAP, CCTP, DPGF. Indiquez l’opération et le lot…',
    briefHint: 'Fiche d’analyse — clauses à risque et questions au MOA.',
  },
  'comparatif-offres': {
    titlePlaceholder: 'Ex. : Comparatif Lot 05 menuiserie',
    briefPlaceholder: 'Collez les offres reçues et les critères d’attribution du RC…',
    briefHint: 'Tableau multi-critères, RAO et recommandation d’attribution.',
  },
  'conformite-offre': {
    titlePlaceholder: 'Ex. : Conformité offre Entreprise X — Lot GO',
    briefPlaceholder: 'Collez l’offre / mémoire technique et les exigences CCTP du lot…',
    briefHint: 'Non-conformités, variantes et postes manquants.',
  },
  'situation-travaux': {
    category: 'suivi-financier',
    titlePlaceholder: 'Ex. : Situation n°3 — Lot 08',
    briefPlaceholder: 'Postes réalisés, quantités, pièces justificatives, BPU/DPGF…',
    briefHint: 'Vérification et structuration des situations mensuelles.',
  },
  'dossier-intervention': {
    category: 'autres-besoins',
    titlePlaceholder: 'Ex. : Dossier intervention réseaux',
    briefPlaceholder: 'Nature de l’intervention, planning, pièces déjà disponibles et manquantes…',
    briefHint: 'DT/DICT, autorisations et pièces réglementaires.',
  },
  'suivi-acquereurs': {
    titlePlaceholder: 'Ex. : Réclamation logement B12',
    briefPlaceholder: 'Nature (réserve livraison, GPA, réclamation), faits, historique des échanges…',
    briefHint: 'Réponse acquéreur, suivi GPA ou synthèse des réserves.',
  },
  autre: {
    category: 'autre',
    titlePlaceholder: 'Ex. : Demande administrative chantier ou marché',
    briefPlaceholder:
      'Décrivez votre besoin (chantier, marché public ou privé, MOA, promoteur, entreprise) et les pièces disponibles…',
    briefHint: 'Un assistant travaux qualifie et oriente vers le bon assistant métier.',
  },
};

const DEFAULT_META: MissionMeta = {
  category: 'autre',
  titlePlaceholder: 'Titre ou référence de la demande',
  briefPlaceholder: 'Décrivez votre besoin et collez les pièces utiles…',
  briefHint: 'Soyez le plus précis possible pour un traitement rapide.',
};

export function getMissionMeta(missionTypeId: string): MissionMeta {
  const task = getChecklistTask(missionTypeId);
  const base = task ? checklistMeta(task.theme, task.label) : DEFAULT_META;
  const specific = SPECIFIC_META[missionTypeId];
  if (!specific) return base;
  return { ...base, ...specific, category: specific.category ?? base.category };
}

export function getMissionCategory(missionTypeId: string): MissionCategoryId {
  return getMissionMeta(missionTypeId).category;
}

export type CatalogMission = {
  id: string;
  label: string;
  category: MissionCategoryId;
  skillName: string;
  skillDescription: string;
  integrated: boolean;
  titlePlaceholder: string;
  briefPlaceholder: string;
  briefHint: string;
};

export function getCatalogMissions(): CatalogMission[] {
  return MISSION_TYPES.filter((t) => isMoexPlatformMissionType(t.id)).map((t) => {
    const skill = getSkillForMissionType(t.id);
    const meta = getMissionMeta(t.id);
    return {
      id: t.id,
      label: t.label,
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

/** Ordre d’affichage = ordre checklist PDF (évite doublons visuels). */
export function getOrderedCatalogMissions(): CatalogMission[] {
  const catalog = getCatalogMissions();
  const byId = new Map(catalog.map((m) => [m.id, m]));
  return MOEX_CHECKLIST_TASKS.map((t) => byId.get(t.id)).filter((m): m is CatalogMission => Boolean(m));
}
