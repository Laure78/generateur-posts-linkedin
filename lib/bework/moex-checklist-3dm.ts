/**
 * Checklist d'externalisation 3D MANAGER (MOEX / BET TCE).
 * Source : Checklist_BeWork_3DManager — 1 ligne = 1 type de mission, sans doublon.
 */

export type MoexChecklistThemeId =
  | 'suivi-chantier'
  | 'pilotage-entreprises'
  | 'consultation-marches'
  | 'suivi-financier'
  | 'reception-gpa'
  | 'admin-qualite'
  | 'autres-besoins'
  | 'sous-traitance'
  | 'autre';

export type MoexChecklistTheme = {
  id: MoexChecklistThemeId;
  letter: string;
  label: string;
  description: string;
};

export const MOEX_CHECKLIST_THEMES: MoexChecklistTheme[] = [
  {
    id: 'suivi-chantier',
    letter: 'A',
    label: 'Suivi de chantier & réunions',
    description: 'CR de chantier, observations, ordre du jour, diffusion et GED',
  },
  {
    id: 'pilotage-entreprises',
    letter: 'B',
    label: 'Pilotage & coordination des entreprises',
    description: 'Relances, plans EXE, ordres de service, courriers MOEX',
  },
  {
    id: 'consultation-marches',
    letter: 'C',
    label: 'Consultation & marchés (DCE / TCE)',
    description: 'Pièces écrites, DPGF, comparatif offres, relances candidats',
  },
  {
    id: 'suivi-financier',
    letter: 'D',
    label: "Suivi financier de l'affaire",
    description: 'Situations, tableau financier, DGD, cautions et retenues',
  },
  {
    id: 'reception-gpa',
    letter: 'E',
    label: 'Réception, GPA & SAV',
    description: 'PV et réserves, levées, GPA/SAV, DOE',
  },
  {
    id: 'admin-qualite',
    letter: 'F',
    label: 'Administratif & qualité (ISO 9001)',
    description: 'Trames ISO, GED, reporting, agenda et convocations',
  },
  {
    id: 'autres-besoins',
    letter: 'G',
    label: 'Autres besoins fréquents',
    description: 'AO, candidatures, attestations, DT/DICT, PPSPS, accueil, supports',
  },
  {
    id: 'sous-traitance',
    letter: 'H',
    label: 'Gestion de la sous-traitance (DC4)',
    description: 'DC4, pièces sous-traitants, agrément MOA, paiement direct, registre',
  },
  {
    id: 'autre',
    letter: '',
    label: 'Besoin MOEX non listé',
    description: 'Demande administrative hors checklist — qualification par le Beworker',
  },
];

export type MoexChecklistTask = {
  id: string;
  theme: MoexChecklistThemeId;
  label: string;
};

/** Tâches checklist — ids uniques, alignés PDF 3D MANAGER (ligne B4 fusionnée dans courrier-moe). */
export const MOEX_CHECKLIST_TASKS: MoexChecklistTask[] = [
  // A — Suivi de chantier & réunions
  { id: 'cr-chantier-3dm', theme: 'suivi-chantier', label: 'Mise en forme des CR de réunion de chantier' },
  { id: 'cr-chantier-moex', theme: 'suivi-chantier', label: 'CR chantier (format MOEX / PROMOTECH)' },
  { id: 'suivi-observations', theme: 'suivi-chantier', label: 'Suivi tableau des observations (CR à CR)' },
  { id: 'ordre-du-jour-reunions', theme: 'suivi-chantier', label: "Préparation de l'ordre du jour des réunions" },
  { id: 'diffusion-cr-ged', theme: 'suivi-chantier', label: 'Diffusion des CR et classement (GED)' },

  // B — Pilotage & coordination
  {
    id: 'courrier-moe',
    theme: 'pilotage-entreprises',
    label: 'Relances entreprises & courriers (relance, mise en demeure, diffusion)',
  },
  { id: 'registre-plans-exe', theme: 'pilotage-entreprises', label: "Suivi du registre des plans d'exécution remis / visés" },
  { id: 'ordre-service', theme: 'pilotage-entreprises', label: 'Mise en forme des ordres de service (OS)' },

  // C — Consultation & marchés
  { id: 'pieces-ecrites-dce', theme: 'consultation-marches', label: 'Saisie et mise en page des pièces écrites (CCTP, RC, CCAP)' },
  { id: 'tableau-dpgf', theme: 'consultation-marches', label: 'Saisie / mise à jour des tableaux DPGF (quantitatifs)' },
  { id: 'comparatif-offres', theme: 'consultation-marches', label: 'Mise en forme du comparatif des offres / RAO' },
  { id: 'relances-consultation', theme: 'consultation-marches', label: 'Relances candidats pendant la consultation' },
  { id: 'analyse-dce-moex', theme: 'consultation-marches', label: 'Analyse DCE (MOEX) — fiche de synthèse' },
  { id: 'conformite-offre', theme: 'consultation-marches', label: 'Conformité offre au CCTP' },

  // D — Suivi financier
  { id: 'situation-travaux', theme: 'suivi-financier', label: 'Vérification & mise en forme des situations de travaux mensuelles' },
  { id: 'tableau-financier-affaire', theme: 'suivi-financier', label: 'Tenue du tableau financier (avenants, travaux supplémentaires)' },
  { id: 'decompte-general-definitif', theme: 'suivi-financier', label: 'Préparation du décompte général définitif (DGD)' },
  { id: 'cautions-retenues', theme: 'suivi-financier', label: 'Pointage des cautions, retenues de garantie, échéanciers' },

  // E — Réception, GPA & SAV
  { id: 'pv-reserves', theme: 'reception-gpa', label: 'Mise en forme des PV de réception / listes de réserves (OPR)' },
  { id: 'suivi-levees-reserves', theme: 'reception-gpa', label: 'Suivi des levées de réserves' },
  { id: 'relances-gpa-sav', theme: 'reception-gpa', label: 'Relances entreprises en GPA / SAV' },
  { id: 'constitution-doe', theme: 'reception-gpa', label: 'Constitution & mise en forme des DOE' },
  { id: 'suivi-acquereurs', theme: 'reception-gpa', label: 'Suivi acquéreurs VEFA & réclamations livraison' },

  // F — Administratif & qualité
  { id: 'trames-iso9001', theme: 'admin-qualite', label: 'Mise à jour des trames documentaires ISO 9001' },
  { id: 'ged-archivage', theme: 'admin-qualite', label: 'Saisie, archivage & gestion documentaire (GED)' },
  { id: 'reporting-projet', theme: 'admin-qualite', label: 'Tableaux de bord & reporting projet' },
  { id: 'agenda-convocations', theme: 'admin-qualite', label: 'Gestion agenda, convocations & CR internes' },

  // G — Autres besoins
  { id: 'veille-appels-offres', theme: 'autres-besoins', label: "Veille & détection d'appels d'offres (BOAMP, plateformes)" },
  { id: 'dossier-candidature', theme: 'autres-besoins', label: 'Constitution des dossiers de candidature (DC1, DC2, DUME)' },
  {
    id: 'controle-attestations-entreprises',
    theme: 'autres-besoins',
    label: 'Contrôle des attestations entreprises (URSSAF, décennale, Kbis)',
  },
  { id: 'dossier-intervention', theme: 'autres-besoins', label: 'Déclarations réglementaires (DT / DICT)' },
  { id: 'ppsps-plan-prevention', theme: 'autres-besoins', label: 'Mise en forme PPSPS / plan de prévention' },
  { id: 'accueil-telephonique', theme: 'autres-besoins', label: 'Accueil téléphonique, filtrage & prise de messages' },
  { id: 'presentations-clients', theme: 'autres-besoins', label: 'Mise en forme de présentations & supports clients' },

  // H — Sous-traitance
  { id: 'dc4-sous-traitance', theme: 'sous-traitance', label: 'Réception & vérification des déclarations DC4' },
  {
    id: 'controle-pieces-sous-traitant',
    theme: 'sous-traitance',
    label: 'Contrôle des pièces sous-traitant (Kbis, URSSAF, décennale, fiscalité)',
  },
  {
    id: 'agrement-sous-traitance',
    theme: 'sous-traitance',
    label: "Constitution & envoi des demandes d'agrément au maître d'ouvrage",
  },
  {
    id: 'paiement-direct-delegation',
    theme: 'sous-traitance',
    label: 'Suivi paiement direct (≥ 600 €) ou délégation de paiement',
  },
  {
    id: 'vigilance-urssaf-semestrielle',
    theme: 'sous-traitance',
    label: 'Vérification semestrielle des attestations de vigilance URSSAF',
  },
  { id: 'registre-sous-traitants', theme: 'sous-traitance', label: 'Tenue du registre de suivi des sous-traitants par lot' },

  // Hors checklist PDF — besoin libre
  { id: 'autre', theme: 'autre', label: 'Demande administrative MOEX diverse' },
];

export const MOEX_CHECKLIST_TASK_IDS = MOEX_CHECKLIST_TASKS.map((t) => t.id);

const TASK_BY_ID = new Map(MOEX_CHECKLIST_TASKS.map((t) => [t.id, t]));

export function getChecklistTask(id: string): MoexChecklistTask | undefined {
  return TASK_BY_ID.get(id);
}

export function getChecklistTheme(id: MoexChecklistThemeId): MoexChecklistTheme | undefined {
  return MOEX_CHECKLIST_THEMES.find((t) => t.id === id);
}
