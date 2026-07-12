/**
 * Kit Beworker — Gros œuvre / CRM Construction
 * Source : proposition BeWork × CRM Construction (PPTX)
 * Missions confiées + outils pour traiter chaque livrable.
 */

export type GrosOeuvrePhase = 'demarrage' | 'chantier' | 'ao' | 'cloture';

export type GrosOeuvreTool = {
  id: string;
  /** Type de mission plateforme (checklist / skill) */
  missionType: string;
  title: string;
  covers: string;
  whenHow: string;
  phase: GrosOeuvrePhase;
  /** Checklist Beworker avant de lancer le skill */
  beworkerChecklist: string[];
  /** Livrable attendu */
  deliverable: string;
};

export const GROS_OEUVRE_KIT_INTRO = {
  title: 'Kit gros œuvre',
  subtitle:
    'Outils Beworker pour tenir le bureau d’une entreprise de gros œuvre / maçonnerie — réservations, preuves, AO bailleurs, situations et DOE.',
  clientExample: 'Calibré sur le périmètre CRM Construction (logements collectifs & sociaux, Évreux · Amiens).',
  tagline: 'Vos équipes coulent et posent. BeWork tient le bureau.',
  pdfHref: '/ressources/BeWork_x_CRM_Construction.pptx',
  pdfFilename: 'BeWork_x_CRM_Construction.pptx',
  method: [
    'Le client transmet le dossier (DCE, plans, PV, situation…).',
    'Le Beworker ouvre l’outil du kit correspondant.',
    'L’IA prépare le livrable ; le Beworker relit et complète.',
    'Le chef d’équipe valide avant envoi au client.',
  ],
} as const;

export const GROS_OEUVRE_PHASES: { id: GrosOeuvrePhase; label: string; hint: string }[] = [
  { id: 'demarrage', label: 'Démarrage', hint: 'DICT, voirie, huissier — ouvrir sans trou administratif' },
  { id: 'chantier', label: 'Au fil du chantier', hint: 'Réservations, PV béton, situations, sous-traitance' },
  { id: 'ao', label: 'Appels d’offres', hint: 'DCE bailleurs et mémoire technique' },
  { id: 'cloture', label: 'Clôture', hint: 'DOE gros œuvre et libération RG' },
];

/** Les 8 missions du pitch CRM Construction, branchées sur les assistants plateforme. */
export const GROS_OEUVRE_TOOLS: GrosOeuvreTool[] = [
  {
    id: 'demarches',
    missionType: 'dossier-intervention',
    title: 'Démarches préalables',
    covers: 'DICT, autorisations de voirie, constat d’huissier contradictoire',
    whenHow: 'Ponctuel — avant / au démarrage',
    phase: 'demarrage',
    beworkerChecklist: [
      'Adresse / parcelle et nature des travaux (fouilles, voirie, réseaux)',
      'Plans et emprise fournis par le client',
      'Dates souhaitées d’ouverture et interlocuteurs (voirie, huissier)',
      'Pièces déjà obtenues vs manquantes',
    ],
    deliverable: 'Checklist DT/DICT + autorisations + planning huissier + pièces manquantes',
  },
  {
    id: 'essais',
    missionType: 'essais-beton-proctor',
    title: 'PV essais béton / Proctor',
    covers: 'Archivage, transmission bureau de contrôle, dossier de contrôle interne',
    whenHow: 'Au fil du chantier',
    phase: 'chantier',
    beworkerChecklist: [
      'Liste des PV reçus (béton, Proctor, autres) avec dates et n°',
      'Exigences CCTP / bureau de contrôle (fréquences, seuils)',
      'Destinataires (BC, MOE, archivage interne)',
      'PV manquants ou hors délai',
    ],
    deliverable: 'Tableau de suivi des essais + courrier / mail type de transmission BC',
  },
  {
    id: 'reservations',
    missionType: 'reservations-reseaux',
    title: 'Réservations & récolement',
    covers: 'Traçabilité des lots techniques, plan de récolement, refacturation des oublis',
    whenHow: 'Au fil du chantier',
    phase: 'chantier',
    beworkerChecklist: [
      'Lots techniques concernés (plomberie, élec, CVC, SSI…)',
      'Plans de réservations reçus / manquants par lot',
      'Dates de relance et preuves d’envoi',
      'Percements / oublis à tracer pour refacturation',
      'Éléments de récolement (plans, caméra, hydrocurage)',
    ],
    deliverable: 'Registre réservations + relances + synthèse refacturation + suivi récolement',
  },
  {
    id: 'analyse-dce',
    missionType: 'analyse-dce-moex',
    title: 'Analyse DCE (AO bailleur)',
    covers: 'Lecture CCTP / CCAP, cohérences plans / DPGF, points de vigilance',
    whenHow: 'Mission structurée',
    phase: 'ao',
    beworkerChecklist: [
      'Pièces RC, CCAP, CCTP, DPGF (et plans si dispo)',
      'Lot et allotissement ciblés',
      'Date limite de remise',
      'Questions déjà posées au MOA',
    ],
    deliverable: 'Fiche d’analyse DCE (clauses à risque, vigilance technique, questions MOA)',
  },
  {
    id: 'memoire',
    missionType: 'memoire-technique-ao',
    title: 'Mémoire technique AO',
    covers: 'Réponse candidature marché public / bailleurs sociaux, mise en forme',
    whenHow: 'Mission structurée',
    phase: 'ao',
    beworkerChecklist: [
      'RC (critères + pondérations) et CCTP du lot',
      'Références chantier CRM / entreprise à valoriser',
      'Moyens humains, matériels, planning type',
      'Exigences Qualibat / certifications',
      'Trame ou mémoire précédent si existant',
    ],
    deliverable: 'Structure + contenu mémoire technique prêt à relecture client',
  },
  {
    id: 'situations',
    missionType: 'situation-travaux',
    title: 'Situations mensuelles',
    covers: 'Avancement, pièces, relances internes multi-chantiers',
    whenHow: 'Suivi mensuel',
    phase: 'chantier',
    beworkerChecklist: [
      'N° de situation et période',
      'Postes / quantités réalisés (ou attachements)',
      'BPU / DPGF de référence',
      'Pièces justificatives (PV, photos, bons)',
      'Avenants / travaux supplémentaires en cours',
    ],
    deliverable: 'Situation structurée + liste des pièces + points de blocage',
  },
  {
    id: 'sous-traitance',
    missionType: 'dc4-sous-traitance',
    title: 'Suivi sous-traitance',
    covers: 'Agréments, DC4, assurances, attestations et relances',
    whenHow: 'Suivi mensuel',
    phase: 'chantier',
    beworkerChecklist: [
      'Liste des sous-traitants par lot / montant',
      'DC4 reçus / manquants',
      'Attestations (URSSAF, décennale, Kbis, fiscale)',
      'Statut agrément MOA',
      'Paiement direct / délégation si ≥ 600 €',
    ],
    deliverable: 'Registre ST + checklist pièces + projets de relance',
  },
  {
    id: 'doe',
    missionType: 'constitution-doe',
    title: 'DOE gros œuvre',
    covers: 'PV, plans de récolement, garanties — RG libérée à l’heure',
    whenHow: 'Fin de chantier',
    phase: 'cloture',
    beworkerChecklist: [
      'Sommaire DOE attendu (CCTP / CCAP)',
      'PV essais, béton, Proctor, contrôles',
      'Plans de récolement réseaux',
      'Garanties et notices',
      'Pièces déjà reçues vs manquantes',
    ],
    deliverable: 'Tableau suivi DOE + relances + arborescence GED',
  },
];

export function getGrosOeuvreToolsByPhase(phase: GrosOeuvrePhase): GrosOeuvreTool[] {
  return GROS_OEUVRE_TOOLS.filter((t) => t.phase === phase);
}
