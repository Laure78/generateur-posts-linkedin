/**
 * Champs guidés injectés en tête du brief selon le type de mission.
 */

export type BriefFieldType = 'text' | 'textarea' | 'number' | 'date';

export type BriefFieldDef = {
  id: string;
  label: string;
  placeholder?: string;
  type?: BriefFieldType;
  required?: boolean;
  colSpan?: 1 | 2;
};

export type BriefSchema = {
  family: string;
  fields: BriefFieldDef[];
};

const CR_SCHEMA: BriefSchema = {
  family: 'cr',
  fields: [
    { id: 'crNumber', label: 'N° du CR', placeholder: 'Ex. : 24', type: 'number' },
    { id: 'previousCr', label: 'CR précédent / points à reprendre', type: 'textarea', colSpan: 2 },
  ],
};

const RELANCE_SCHEMA: BriefSchema = {
  family: 'relance',
  fields: [
    { id: 'destinataire', label: 'Destinataire (entreprise / lot)', required: true },
    { id: 'objet', label: 'Objet de la relance', required: true },
    { id: 'faits', label: 'Faits constatés', type: 'textarea', colSpan: 2, required: true },
    { id: 'relancesAnterieures', label: 'Relances antérieures (dates)', type: 'textarea', colSpan: 2 },
    { id: 'delai', label: 'Délai demandé', placeholder: 'Ex. : 8 jours ouvrés' },
  ],
};

const SITUATION_SCHEMA: BriefSchema = {
  family: 'situation',
  fields: [
    { id: 'numeroSituation', label: 'N° de situation', required: true },
    { id: 'lot', label: 'Lot / entreprise', required: true },
    { id: 'periode', label: 'Période concernée', placeholder: 'Ex. : mars 2026' },
    { id: 'postes', label: 'Postes réalisés / quantités', type: 'textarea', colSpan: 2, required: true },
    { id: 'pieces', label: 'Pièces justificatives disponibles', type: 'textarea', colSpan: 2 },
  ],
};

const MARCHES_SCHEMA: BriefSchema = {
  family: 'marches',
  fields: [
    { id: 'operation', label: 'Opération / marché', required: true },
    { id: 'lot', label: 'Lot', required: true },
    { id: 'pieces', label: 'Pièces fournies (RC, CCTP, offres…)', type: 'textarea', colSpan: 2, required: true },
    { id: 'objectif', label: 'Objectif du livrable', type: 'textarea', colSpan: 2 },
  ],
};

const RECEPTION_SCHEMA: BriefSchema = {
  family: 'reception',
  fields: [
    { id: 'dateReception', label: 'Date réception / OPR', type: 'date' },
    { id: 'lots', label: 'Lots / entreprises', required: true },
    { id: 'reserves', label: 'Réserves ou points à traiter', type: 'textarea', colSpan: 2, required: true },
    { id: 'echeances', label: 'Échéances de levée', type: 'textarea', colSpan: 2 },
  ],
};

const SOUS_TRAITANCE_SCHEMA: BriefSchema = {
  family: 'sous-traitance',
  fields: [
    { id: 'lot', label: 'Lot', required: true },
    { id: 'sousTraitant', label: 'Sous-traitant', required: true },
    { id: 'montant', label: 'Montant marché sous-traité (€ HT)', placeholder: 'Ex. : 45 000' },
    { id: 'demande', label: 'Demande (DC4, agrément, vigilance…)', type: 'textarea', colSpan: 2, required: true },
    { id: 'echeance', label: 'Échéance', type: 'date' },
  ],
};

const OS_SCHEMA: BriefSchema = {
  family: 'os',
  fields: [
    { id: 'typeOs', label: "Type d'OS", placeholder: 'Prolongation, arrêt, reprise, prescription…', required: true },
    { id: 'entreprise', label: 'Entreprise / lot', required: true },
    { id: 'motif', label: 'Motif', type: 'textarea', colSpan: 2, required: true },
    { id: 'delai', label: 'Délai ou date effet' },
  ],
};

const SCHEMA_BY_TYPE: Record<string, BriefSchema> = {
  'cr-chantier-moex': CR_SCHEMA,
  'cr-chantier-3dm': CR_SCHEMA,
  'courrier-moe': RELANCE_SCHEMA,
  'relances-consultation': RELANCE_SCHEMA,
  'relances-gpa-sav': RELANCE_SCHEMA,
  'situation-travaux': SITUATION_SCHEMA,
  'tableau-financier-affaire': SITUATION_SCHEMA,
  'decompte-general-definitif': SITUATION_SCHEMA,
  'cautions-retenues': SITUATION_SCHEMA,
  'pieces-ecrites-dce': MARCHES_SCHEMA,
  'tableau-dpgf': MARCHES_SCHEMA,
  'analyse-dce-moex': MARCHES_SCHEMA,
  'comparatif-offres': MARCHES_SCHEMA,
  'conformite-offre': MARCHES_SCHEMA,
  'pv-reserves': RECEPTION_SCHEMA,
  'suivi-levees-reserves': RECEPTION_SCHEMA,
  'constitution-doe': RECEPTION_SCHEMA,
  'suivi-acquereurs': RECEPTION_SCHEMA,
  'ordre-service': OS_SCHEMA,
  'dc4-sous-traitance': SOUS_TRAITANCE_SCHEMA,
  'controle-pieces-sous-traitant': SOUS_TRAITANCE_SCHEMA,
  'agrement-sous-traitance': SOUS_TRAITANCE_SCHEMA,
  'paiement-direct-delegation': SOUS_TRAITANCE_SCHEMA,
  'vigilance-urssaf-semestrielle': SOUS_TRAITANCE_SCHEMA,
  'registre-sous-traitants': SOUS_TRAITANCE_SCHEMA,
};

export function getBriefSchema(missionTypeId: string): BriefSchema | null {
  return SCHEMA_BY_TYPE[missionTypeId] ?? null;
}

export function buildGuidedBriefPrefix(
  missionTypeId: string,
  values: Record<string, string>
): string {
  const schema = getBriefSchema(missionTypeId);
  if (!schema) return '';

  const lines: string[] = [];
  for (const field of schema.fields) {
    const v = values[field.id]?.trim();
    if (v) lines.push(`${field.label} : ${v}`);
  }
  if (!lines.length) return '';
  return `${lines.join('\n')}\n\n---\n\n`;
}

/** Compatibilité CR existante */
export function crValuesFromGuided(values: Record<string, string>) {
  return {
    crNumber: values.crNumber ?? '',
    previousCr: values.previousCr ?? '',
  };
}
