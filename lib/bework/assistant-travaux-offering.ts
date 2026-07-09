/**
 * Offre « Assistant travaux externalisé » — contenu commercial et opérationnel BeWork.
 * Source : Bework_assistant_travaux_positionnement.docx (cadrage Laure Olivie).
 */

export const ASSISTANT_TRAVAUX_COMMERCIAL = {
  headline: 'BeWork intervient comme assistant travaux externalisé',
  paragraph:
    "BeWork intervient comme un renfort administratif, documentaire et opérationnel côté entreprise d'exécution. L'assistant travaux accompagne la gestion des chantiers — marchés publics et privés — en préparant, structurant, relançant et classant les informations utiles au conducteur de travaux. Les décisions techniques, financières, contractuelles et de sécurité restent validées par votre équipe avant tout envoi.",
  shortPitch:
    'BeWork prend en charge la charge administrative des travaux. Votre entreprise garde la décision et la responsabilité.',
  tagline: 'On tient le bureau, vous tenez le chantier.',
} as const;

export type OfferingPhase = {
  id: string;
  step: number;
  title: string;
  objective: string;
  tasks: readonly string[];
  deliverable: string;
};

/** To-do list BeWork — 4 phases de mise en place d'un chantier. */
export const BEWORK_ONBOARDING_PHASES: readonly OfferingPhase[] = [
  {
    id: 'cadrage',
    step: 1,
    title: 'Cadrage du chantier',
    objective:
      'Identifier le chantier, les interlocuteurs, les pièces disponibles, les urgences et le niveau de délégation.',
    tasks: [
      'Recenser opération, lots, maître d\'ouvrage, MOE et contacts clés.',
      'Définir le circuit de validation interne (conducteur, dirigeant, chef d\'équipe).',
      'Lister les urgences documentaires et les échéances des 30 premiers jours.',
      'Préciser ce que BeWork peut envoyer seul et ce qui exige validation préalable.',
    ],
    deliverable: 'Fiche de cadrage',
  },
  {
    id: 'collecte',
    step: 2,
    title: 'Collecte des documents',
    objective:
      'Rassembler et classer les pièces de référence du marché et du chantier.',
    tasks: [
      'Centraliser CCTP, CCAP, RC, plans, DPGF, OS, avenants et planning.',
      'Récupérer contacts entreprises, fournisseurs, sous-traitants et partenaires SPS.',
      'Indexer PPSPS, attestations, assurances et pièces administratives de démarrage.',
      'Nommer et ranger les fichiers selon la nomenclature chantier convenue.',
    ],
    deliverable: 'Dossier chantier classé',
  },
  {
    id: 'analyse',
    step: 3,
    title: 'Analyse administrative du marché',
    objective:
      'Traduire les obligations contractuelles en liste d\'actions et de livrables suivables.',
    tasks: [
      'Synthétiser les obligations du CCTP, CCAP et planning (visas, essais, réunions).',
      'Lister les pièces à produire : fiches techniques, échantillons, DOE, situations.',
      'Identifier les agréments sous-traitance, DC4 et pièces sociales à suivre.',
      'Repérer les points bloquants et les dépendances entre lots.',
    ],
    deliverable: 'Check-list pièces à produire',
  },
  {
    id: 'suivi',
    step: 4,
    title: 'Mise en place du tableau de suivi',
    objective:
      'Donner une vision partagée des actions, responsables, échéances et statuts.',
    tasks: [
      'Créer le tableau de bord chantier (actions, responsables, dates, preuves).',
      'Paramétrer les statuts : À faire · En cours · En attente · Validé · Soldé.',
      'Brancher les relances fournisseurs, visas MOE et pièces manquantes.',
      'Partager le tableau avec le conducteur de travaux et valider les priorités.',
    ],
    deliverable: 'Tableau de bord chantier',
  },
] as const;

export const CHANTIER_STATUS_LABELS = [
  'À faire',
  'En cours',
  'En attente',
  'Validé',
  'Soldé',
] as const;

export type ModeOperatoireStep = {
  id: string;
  step: number;
  timing: string;
  title: string;
  description: string;
  deliverable: string;
  validation: string;
};

/** Mode opératoire BeWork — 8 étapes avec jalons J0 à J5, puis rythme chantier. */
export const BEWORK_MODE_OPERATOIRE: readonly ModeOperatoireStep[] = [
  {
    id: 'j0-diagnostic',
    step: 1,
    timing: 'J0',
    title: 'Diagnostic & prise en charge',
    description:
      'Premier échange : périmètre du chantier, volume documentaire, interlocuteurs et niveau de délégation. Audit du dossier existant sous 48 h.',
    deliverable: 'Compte rendu de prise en charge + planning des 5 premiers jours',
    validation: 'Entreprise',
  },
  {
    id: 'j0-j1-cadrage',
    step: 2,
    timing: 'J0 → J1',
    title: 'Cadrage opérationnel',
    description:
      'Formalisation des rôles, du circuit de validation et des urgences. Alignement sur les livrables attendus et les outils partagés.',
    deliverable: 'Fiche de cadrage validée',
    validation: 'Entreprise',
  },
  {
    id: 'j1-j2-collecte',
    step: 3,
    timing: 'J1 → J2',
    title: 'Collecte & classement',
    description:
      'Rassemblement des pièces marché, plans, OS, contacts et documents SPS. Mise en place de l\'arborescence GED chantier.',
    deliverable: 'Dossier chantier classé',
    validation: 'Entreprise',
  },
  {
    id: 'j2-j3-analyse',
    step: 4,
    timing: 'J2 → J3',
    title: 'Analyse administrative',
    description:
      'Lecture opérationnelle du marché : obligations, visas, essais, réunions, situations et pièces de fin de travaux.',
    deliverable: 'Check-list pièces à produire',
    validation: 'Entreprise',
  },
  {
    id: 'j3-j5-tableau',
    step: 5,
    timing: 'J3 → J5',
    title: 'Tableau de bord chantier',
    description:
      'Mise en service du suivi partagé : actions, responsables, échéances, statuts et alertes. Opérationnel en 3 à 5 jours.',
    deliverable: 'Tableau de bord chantier (statuts partagés)',
    validation: 'Entreprise',
  },
  {
    id: 'hebdo',
    step: 6,
    timing: 'Hebdomadaire',
    title: 'Suivi opérationnel',
    description:
      'Comptes rendus internes, relances fournisseurs et sous-traitants, mise à jour des tableaux, remontée des aléas et pièces manquantes.',
    deliverable: 'CR internes · tableaux à jour · relances tracées',
    validation: 'BeWork puis entreprise',
  },
  {
    id: 'mensuel',
    step: 7,
    timing: 'Mensuel',
    title: 'Suivi administratif & financier',
    description:
      'Préparation des éléments de situation de travaux, pointage des justificatifs, relances internes avant validation et envoi.',
    deliverable: 'Tableau d\'avancement · pièces de situation préparées',
    validation: 'Entreprise',
  },
  {
    id: 'doe-reserves',
    step: 8,
    timing: 'Fin de chantier',
    title: 'DOE, réserves & archivage',
    description:
      'Constitution du DOE au fil de l\'eau, tableau des réserves, relances de levée, dossier réception et archivage marché.',
    deliverable: 'DOE · tableau réserves · dossier final archivé',
    validation: 'Entreprise',
  },
] as const;

export type ClientChecklistSection = {
  id: string;
  title: string;
  subtitle: string;
  items: readonly string[];
};

/** To-do list type à présenter au client — périmètre confiable BeWork. */
export const CLIENT_OFFER_CHECKLIST: readonly ClientChecklistSection[] = [
  {
    id: 'demarrage',
    title: 'Démarrage chantier',
    subtitle: 'Avant le premier jour de travaux',
    items: [
      'Analyse des pièces marché (CCTP, CCAP, planning, pièces administratives)',
      'Tableau des livrables à fournir (plans, fiches techniques, PPSPS, DOE)',
      'Dossier administratif chantier (contacts, intervenants, dates clés, SPS)',
      'Suivi sous-traitance (agréments, DC4, assurances, attestations, relances)',
      'Planning administratif (visas, fiches produits, commandes, livraisons, réunions)',
      'Préparation réunion de lancement (ordre du jour, points à vérifier, pièces à demander)',
      'Circuit de validation et niveau de délégation formalisés',
      'Tableau de contacts et intervenants partagé',
    ],
  },
  {
    id: 'execution',
    title: 'Pendant les travaux',
    subtitle: 'Suivi continu bureau ↔ chantier',
    items: [
      'Comptes rendus internes après réunions ou échanges terrain',
      'Suivi des visas (fiches techniques, plans, notes, retours MOE)',
      'Relances fournisseurs et sous-traitants (réponses, pièces reçues ou manquantes)',
      'Suivi commandes et livraisons (confirmations, retards, points bloquants)',
      'Tableau des aléas (sujets bloquants, impacts, décision attendue, responsable)',
      'Suivi photos et preuves (classement par date, zone, lot, réserve)',
      'Préparation devis modificatifs (mise en forme et pièces justificatives)',
      'Suivi situations mensuelles (avancement, pièces nécessaires, relances internes)',
      'Centralisation qualité & sécurité (PPSPS, EPI, attestations, PV)',
      'Coordination documentaire MOE / promoteur (courriers, synthèses, relances)',
    ],
  },
  {
    id: 'cloture',
    title: 'Fin de chantier',
    subtitle: 'Réception, DOE et clôture marché',
    items: [
      'Préparation DOE (plans, notices, PV, fiches techniques, garanties, photos)',
      'Tableau des réserves (zone, lot, responsable, délai, preuve, statut)',
      'Relances ciblées de levée des réserves',
      'Dossier réception (PV, OPR, quitus, preuves de levée)',
      'Archivage marché (dossier final pour consultation et défense)',
      'Préparation éléments PV de réception et points de réserve',
      'Synthèse solde et pièces de clôture administrative',
    ],
  },
] as const;

export const VALIDATION_CIRCUIT = [
  'BeWork prépare le document ou le tableau.',
  'Le conducteur de travaux ou le dirigeant relit.',
  "L'entreprise valide les informations engageantes.",
  'BeWork met en forme et archive la version validée.',
  "L'entreprise ou BeWork envoie selon la délégation prévue.",
] as const;

export const TYPICAL_DELIVERABLES = [
  { label: 'Tableau de suivi chantier', detail: 'Actions, responsables, échéances, statut, preuves' },
  { label: 'Tableau des visas', detail: 'Document, indice, envoi, retour MOE, observations' },
  { label: 'Tableau fournisseurs', detail: 'Commande, contact, livraison, documents associés' },
  { label: 'Tableau sous-traitants', detail: 'Agréments, attestations, pièces manquantes, relances' },
  { label: 'Compte rendu interne', detail: 'Décisions, points bloquants, actions, urgence, responsable' },
  { label: 'Tableau DOE', detail: 'Pièces attendues, reçues, validées, manquantes' },
  { label: 'Tableau réserves', detail: 'Zone, réserve, entreprise, action, date cible, preuve' },
  { label: 'Dossier de preuves', detail: 'Photos, mails, PV, fiches, plans validés' },
] as const;
