import { getMissionThemeId } from './moex-platform';
import type { MoexChecklistThemeId } from './moex-checklist-3dm';

export type ValidationChecklistFamily =
  | 'cr'
  | 'chantier'
  | 'marches'
  | 'financier'
  | 'reception'
  | 'sous-traitance'
  | 'admin'
  | 'generic';

const COMMON_TAIL = [
  "Le document a été relu par l'assistant travaux.",
  "Validation du chef d'équipe obtenue avant envoi au client.",
  "La version envoyée est celle validée — pas le brouillon IA tel quel.",
] as const;

export const CHECKLIST_BY_FAMILY: Record<ValidationChecklistFamily, readonly string[]> = {
  cr: [
    'Date, lieu et météo du CR sont exacts.',
    'Les présents, absents et le rédacteur sont exacts.',
    'Chaque observation est factuelle, numérotée et classée par lot.',
    'Les points du CR précédent ont été repris ou explicitement soldés.',
    ...COMMON_TAIL,
  ],
  chantier: [
    'Référence chantier / opération et date de réunion sont indiquées.',
    'Les entreprises et lots concernés sont identifiés.',
    'Les actions attendues et délais sont explicites.',
    'Pièces jointes (plans, photos) référencées dans le document.',
    ...COMMON_TAIL,
  ],
  marches: [
    'Référence marché / lot et version des pièces (RC, CCAP, CCTP, DPGF) vérifiées.',
    'Cohérence quantitatifs / descriptifs contrôlée.',
    'Points de non-conformité ou variantes clairement listés.',
    'Recommandation ou synthèse alignée avec le RC.',
    ...COMMON_TAIL,
  ],
  financier: [
    'N° de situation ou période et entreprise identifiés.',
    'Montants et postes BPU/DPGF recoupés avec les pièces justificatives.',
    'Avenants et TS éventuels mentionnés.',
    'Aucun engagement de paiement sans validation interne (chef d\'équipe ou dirigeant).',
    ...COMMON_TAIL,
  ],
  reception: [
    'Date de réception / GPA et entreprises concernées exactes.',
    'Réserves décrites par lot avec localisation précise.',
    'Échéances de levée et responsables indiqués.',
    'DOE / GPA : pièces manquantes listées si applicable.',
    ...COMMON_TAIL,
  ],
  'sous-traitance': [
    'Lot, sous-traitant et montant du marché vérifiés.',
    'DC4 et pièces (Kbis, URSSAF, décennale, fiscalité) à jour.',
    'Demande d’agrément MOA conforme au contrat.',
    'Paiement direct / délégation tracé si applicable.',
    ...COMMON_TAIL,
  ],
  admin: [
    'Modèle / trame ISO ou interne respecté.',
    'Classement GED et nommage des fichiers cohérents.',
    'Données chiffrées du reporting vérifiées à la source.',
    'Destinataires des convocations et CR internes exacts.',
    ...COMMON_TAIL,
  ],
  generic: [
    'Le besoin est couvert (faits, dates, références chantier ou marché).',
    'Ton professionnel, sans engagement non validé par l\'entreprise.',
    'Pièces sources citées ou jointes.',
    ...COMMON_TAIL,
  ],
};

/** @deprecated Utiliser getValidationChecklistForMissionType */
export const CR_VALIDATION_CHECKLIST = CHECKLIST_BY_FAMILY.cr;

const CR_TYPES = new Set(['cr-chantier-moex', 'cr-chantier-3dm']);

const THEME_TO_FAMILY: Record<MoexChecklistThemeId, ValidationChecklistFamily> = {
  'suivi-chantier': 'chantier',
  'pilotage-entreprises': 'chantier',
  'consultation-marches': 'marches',
  'suivi-financier': 'financier',
  'reception-gpa': 'reception',
  'admin-qualite': 'admin',
  'autres-besoins': 'generic',
  'sous-traitance': 'sous-traitance',
  autre: 'generic',
};

export function getValidationChecklistFamily(missionTypeId: string): ValidationChecklistFamily {
  if (CR_TYPES.has(missionTypeId)) return 'cr';
  const theme = getMissionThemeId(missionTypeId);
  if (theme) return THEME_TO_FAMILY[theme];
  return 'generic';
}

export function getValidationChecklistForMissionType(missionTypeId: string): readonly string[] {
  return CHECKLIST_BY_FAMILY[getValidationChecklistFamily(missionTypeId)];
}

export function getValidationChecklistTitle(missionTypeId: string): string {
  const family = getValidationChecklistFamily(missionTypeId);
  const titles: Record<ValidationChecklistFamily, string> = {
    cr: 'Checklist CR — avant envoi client',
    chantier: 'Checklist chantier & coordination — avant envoi client',
    marches: 'Checklist marchés & DCE — avant envoi client',
    financier: 'Checklist suivi financier — avant envoi client',
    reception: 'Checklist réception & GPA — avant envoi client',
    'sous-traitance': 'Checklist sous-traitance — avant envoi client',
    admin: 'Checklist administratif & qualité — avant envoi client',
    generic: 'Checklist — avant envoi client',
  };
  return titles[family];
}
