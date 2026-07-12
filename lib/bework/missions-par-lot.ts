/**
 * Missions confiées à BeWork — source : Missions_BeWork_par_lot.pdf (v2)
 * Vue « par lot » (entreprise d’exécution), complémentaire du catalogue d’assistants.
 */

import { LOT_PITCHES } from './missions-par-lot-pitch';

export type MissionPhaseId = 'avant' | 'pendant' | 'fin';

export type LotMissionItem = {
  /** Id stable kebab-case */
  id: string;
  /** Titre court (avant les deux-points du PDF) */
  title: string;
  /** Description / périmètre */
  description: string;
  /**
   * Type de mission plateforme à ouvrir (catalogue assistants).
   * Si absent → `autre`.
   */
  mapsToMissionType?: string;
};

export type LotMissionGroup = {
  id: string;
  /** Affichage chip / titre */
  label: string;
  /** Sous-titre (corps d’état ciblé) */
  audience: string;
  /** Numéro de lot (0 = transversal) */
  lotNumber: number;
  phase?: MissionPhaseId;
  missions: LotMissionItem[];
  /** Arguments commerciaux (PDF v2 — lots uniquement) */
  pitch?: {
    douleur: string[];
    risque: string[];
    gain: string[];
  };
};

export const MISSIONS_PAR_LOT_INTRO = {
  title: 'Missions et arguments',
  subtitle: 'Le bras droit administratif de vos conducteurs de travaux — sur tous les lots et lot par lot.',
  role:
    'BeWork est un assistant travaux externalisé : il prépare, relance, classe et compile. L’entreprise garde le chantier et les décisions.',
  validation:
    'Tout livrable engageant est relu en France puis validé par le conducteur de travaux, le directeur de travaux, le chargé d’affaires ou le dirigeant.',
  method: [
    'BeWork prépare le document ou le tableau.',
    'Le conducteur de travaux ou le dirigeant relit.',
    'L’entreprise valide les informations engageantes.',
    'BeWork met en forme et archive la version validée.',
    'L’entreprise ou BeWork envoie selon la délégation prévue.',
  ],
  remember:
    'Tout ce qui se lit, se rédige, se relance, se classe ou se compile dans un marché de travaux peut être confié à BeWork. Les décisions techniques, financières et contractuelles restent à l’entreprise.',
  pdfHref: '/ressources/Missions_BeWork_par_lot.pdf',
  pdfFilename: 'Missions_BeWork_par_lot.pdf',
} as const;

/** Missions transversales — tous corps d’état */
export const MISSIONS_TRANSVERSALES: LotMissionGroup[] = [
  {
    id: 'transversal-avant',
    label: 'Sur tous les lots — Avant le démarrage',
    audience: 'Tous corps d’état',
    lotNumber: 0,
    phase: 'avant',
    missions: [
      {
        id: 'tx-analyse-pieces-marche',
        title: 'Analyse des pièces marché',
        description: 'Synthèse claire du CCTP, du CCAP, du planning et des pièces administratives.',
        mapsToMissionType: 'analyse-dce-moex',
      },
      {
        id: 'tx-tableau-livrables',
        title: 'Tableau des livrables',
        description: 'Liste des documents à fournir : plans, fiches techniques, PPSPS, attestations, échantillons, DOE.',
        mapsToMissionType: 'reporting-projet',
      },
      {
        id: 'tx-dossier-admin-chantier',
        title: 'Dossier administratif de chantier',
        description: 'Classement des pièces de marché, contacts, intervenants, dates clés, documents SPS.',
        mapsToMissionType: 'ged-archivage',
      },
      {
        id: 'tx-suivi-sous-traitance',
        title: 'Suivi de la sous-traitance',
        description: 'Demandes d’agrément, DC4, assurances, attestations et relances.',
        mapsToMissionType: 'dc4-sous-traitance',
      },
      {
        id: 'tx-planning-admin',
        title: 'Planning administratif',
        description: 'Tableau des échéances : visas, fiches produits, commandes, livraisons, réunions.',
        mapsToMissionType: 'agenda-convocations',
      },
      {
        id: 'tx-installation-mode-op',
        title: 'Installation de chantier et mode opératoire',
        description: 'Dossier d’installation propre au lot et mise en forme du mode opératoire, transmis au coordonnateur SPS.',
        mapsToMissionType: 'ppsps-plan-prevention',
      },
      {
        id: 'tx-memoire-technique',
        title: 'Mémoire technique',
        description: 'Rédaction et mise en forme du mémoire technique pour la remise d’offre.',
        mapsToMissionType: 'memoire-technique-ao',
      },
      {
        id: 'tx-reunion-lancement',
        title: 'Préparation de la réunion de lancement',
        description: 'Ordre du jour interne, points à vérifier, documents à demander.',
        mapsToMissionType: 'ordre-du-jour-reunions',
      },
    ],
  },
  {
    id: 'transversal-pendant',
    label: 'Sur tous les lots — Pendant l’exécution',
    audience: 'Tous corps d’état',
    lotNumber: 0,
    phase: 'pendant',
    missions: [
      {
        id: 'tx-cr-internes',
        title: 'Comptes rendus internes',
        description: 'Compte rendu clair après réunion ou échange terrain, avec actions, responsables et dates.',
        mapsToMissionType: 'cr-chantier-3dm',
      },
      {
        id: 'tx-suivi-visas',
        title: 'Suivi des visas',
        description: 'Tableau des fiches techniques, plans, notes, demandes MOE et retours attendus.',
        mapsToMissionType: 'registre-plans-exe',
      },
      {
        id: 'tx-relances-fourn-st',
        title: 'Relances fournisseurs et sous-traitants',
        description: 'Messages structurés, suivi des réponses, pièces reçues et pièces manquantes.',
        mapsToMissionType: 'courrier-moe',
      },
      {
        id: 'tx-commandes-livraisons',
        title: 'Suivi des commandes et livraisons',
        description: 'Planning des approvisionnements, confirmations, retards et points bloquants.',
        mapsToMissionType: 'suivi-observations',
      },
      {
        id: 'tx-tableau-aleas',
        title: 'Tableau des aléas',
        description: 'Liste des sujets bloquants, impacts possibles, décision attendue, responsable.',
        mapsToMissionType: 'suivi-observations',
      },
      {
        id: 'tx-photos-preuves',
        title: 'Suivi des photos et preuves',
        description: 'Classement par date, bâtiment, zone, lot, sujet et réserve éventuelle.',
        mapsToMissionType: 'ged-archivage',
      },
      {
        id: 'tx-devis-modificatifs',
        title: 'Préparation des devis modificatifs (TS / avenants)',
        description: 'Mise en forme des éléments fournis par le conducteur de travaux, avec pièces justificatives.',
        mapsToMissionType: 'tableau-financier-affaire',
      },
      {
        id: 'tx-situations',
        title: 'Suivi des situations mensuelles',
        description: 'Tableau d’avancement, pièces nécessaires et relances internes.',
        mapsToMissionType: 'situation-travaux',
      },
      {
        id: 'tx-suivi-financier',
        title: 'Suivi financier',
        description: 'Pointage des devis, bons de commande, éléments de facturation, gestion du compte prorata.',
        mapsToMissionType: 'tableau-financier-affaire',
      },
      {
        id: 'tx-correspondance',
        title: 'Correspondance de chantier',
        description: 'Courriers au maître d’œuvre, réponses au bureau de contrôle et au coordonnateur SPS.',
        mapsToMissionType: 'courrier-moe',
      },
    ],
  },
  {
    id: 'transversal-fin',
    label: 'Sur tous les lots — En fin de chantier',
    audience: 'Tous corps d’état',
    lotNumber: 0,
    phase: 'fin',
    missions: [
      {
        id: 'tx-doe',
        title: 'Préparation du DOE',
        description: 'Collecte des plans, notices, PV, fiches techniques, garanties, attestations et photos.',
        mapsToMissionType: 'constitution-doe',
      },
      {
        id: 'tx-tableau-reserves',
        title: 'Tableau des réserves',
        description: 'Suivi par bâtiment, logement, zone, lot, responsable, date prévue et état.',
        mapsToMissionType: 'pv-reserves',
      },
      {
        id: 'tx-levee-reserves',
        title: 'Relance de la levée des réserves',
        description: 'Messages ciblés, suivi des preuves et mise à jour du tableau.',
        mapsToMissionType: 'suivi-levees-reserves',
      },
      {
        id: 'tx-dossier-reception',
        title: 'Dossier de réception',
        description: 'Classement des PV, OPR, quitus, documents techniques et preuves de levée.',
        mapsToMissionType: 'pv-reserves',
      },
      {
        id: 'tx-archivage',
        title: 'Archivage du marché',
        description: 'Dossier final clair pour consultation ultérieure et défense en cas de litige.',
        mapsToMissionType: 'ged-archivage',
      },
    ],
  },
];

/** Missions spécifiques lot par lot (01 → 16) — sans pitch (injecté ci-dessous). */
const MISSIONS_PAR_LOT_BASE: LotMissionGroup[] = [
  {
    id: 'lot-01',
    label: 'Lot 01 — Gros œuvre',
    audience: 'Entreprises de gros œuvre / maçonnerie',
    lotNumber: 1,
    missions: [
      {
        id: 'lot01-demarches',
        title: 'Démarches préalables',
        description: 'Autorisations de voirie, DICT, organisation du constat d’huissier contradictoire.',
        mapsToMissionType: 'dossier-intervention',
      },
      {
        id: 'lot01-essais',
        title: 'Essais et contrôles',
        description:
          'Suivi des PV d’essais béton et Proctor, transmission au bureau de contrôle, tenue du dossier de contrôle interne.',
        mapsToMissionType: 'essais-beton-proctor',
      },
      {
        id: 'lot01-reservations',
        title: 'Réservations et réseaux',
        description:
          'Collecte des plans de réservations des lots techniques, relances, traçabilité pour refacturer les oublis ; plan de récolement des réseaux, rapports caméra et hydrocurage.',
        mapsToMissionType: 'reservations-reseaux',
      },
    ],
  },
  {
    id: 'lot-02',
    label: 'Lot 02 — Enduit de façade',
    audience: 'Façadiers',
    lotNumber: 2,
    missions: [
      {
        id: 'lot02-reception-supports',
        title: 'Réception des supports',
        description: 'Rédaction du PV de réception des supports gros œuvre.',
        mapsToMissionType: 'pv-reserves',
      },
      {
        id: 'lot02-dossier-produit',
        title: 'Dossier produit',
        description:
          'Fiches techniques, certifications CSTB de l’enduit, suivi de validation des surfaces témoins et des teintes.',
        mapsToMissionType: 'ged-archivage',
      },
      {
        id: 'lot02-voirie',
        title: 'Voirie',
        description: 'Demandes d’autorisation d’accès, de stationnement et d’occupation du domaine public.',
        mapsToMissionType: 'dossier-intervention',
      },
    ],
  },
  {
    id: 'lot-03',
    label: 'Lot 03 — Charpente / couverture',
    audience: 'Charpentiers-couvreurs',
    lotNumber: 3,
    missions: [
      {
        id: 'lot03-plans-exe',
        title: 'Plans d’exécution',
        description:
          'Circulation des plans EXE et notes de calcul, suivi des visas, diffusion aux lots gros œuvre et couverture.',
        mapsToMissionType: 'registre-plans-exe',
      },
      {
        id: 'lot03-tracabilite',
        title: 'Traçabilité matériaux',
        description:
          'Certificats de traitement des bois, marquage CE, garanties fabricants (tuiles, photovoltaïque).',
        mapsToMissionType: 'ged-archivage',
      },
      {
        id: 'lot03-variantes-pv',
        title: 'Variantes et PV',
        description: 'Dossier photovoltaïque (Consuel, attestations) et chiffrage des variantes exigées.',
        mapsToMissionType: 'autre',
      },
    ],
  },
  {
    id: 'lot-04',
    label: 'Lot 04 — Menuiseries extérieures',
    audience: 'Menuisiers',
    lotNumber: 4,
    missions: [
      {
        id: 'lot04-quantitatifs',
        title: 'Quantitatifs',
        description: 'Tableau de nomenclature des menuiseries, vérification des quantitatifs baie par baie.',
        mapsToMissionType: 'reporting-projet',
      },
      {
        id: 'lot04-preuves',
        title: 'Preuves de performance',
        description: 'Avis techniques Uw/Ujn, PV d’essais acoustiques, certificats CEKAL.',
        mapsToMissionType: 'ged-archivage',
      },
      {
        id: 'lot04-coordination',
        title: 'Coordination',
        description: 'Plans et gabarits pour le gros œuvre, planning des relevés de cotes, suivi des échantillons.',
        mapsToMissionType: 'registre-plans-exe',
      },
    ],
  },
  {
    id: 'lot-05',
    label: 'Lot 05 — Menuiseries intérieures',
    audience: 'Menuisiers d’intérieur / agenceurs',
    lotNumber: 5,
    missions: [
      {
        id: 'lot05-nomenclature',
        title: 'Nomenclature',
        description: 'Nomenclature des blocs-portes (acoustique, coupe-feu) et vérification des quantités.',
        mapsToMissionType: 'reporting-projet',
      },
      {
        id: 'lot05-preuves',
        title: 'Preuves de performance',
        description: 'Suivi des PV acoustiques (38 / 39 dB), certificats A2P et EI 30, avis techniques.',
        mapsToMissionType: 'ged-archivage',
      },
      {
        id: 'lot05-cles',
        title: 'Organigramme des clés',
        description: 'Tableau de l’organigramme des clés (cylindres de chantier puis définitifs), passes et remise.',
        mapsToMissionType: 'autre',
      },
    ],
  },
  {
    id: 'lot-06',
    label: 'Lot 06 — Serrurerie',
    audience: 'Serruriers-métalliers',
    lotNumber: 6,
    missions: [
      {
        id: 'lot06-notes-calcul',
        title: 'Notes de calcul',
        description: 'Suivi des notes de calcul des garde-corps (NF P01-012/013) et des visas.',
        mapsToMissionType: 'registre-plans-exe',
      },
      {
        id: 'lot06-fiches',
        title: 'Fiches et échantillons',
        description: 'Dossier fiches techniques (thermolaquage QUALIMARINE, galvanisation) et échantillons RAL.',
        mapsToMissionType: 'ged-archivage',
      },
      {
        id: 'lot06-coordination',
        title: 'Coordination',
        description: 'Planning des relevés de cotes sur le gros œuvre.',
        mapsToMissionType: 'agenda-convocations',
      },
    ],
  },
  {
    id: 'lot-07',
    label: 'Lot 07 — Plâtrerie',
    audience: 'Plaquistes-plâtriers',
    lotNumber: 7,
    missions: [
      {
        id: 'lot07-reception',
        title: 'Réception des supports',
        description: 'Rédaction du PV de réception des supports (murs et planchers) avant doublage.',
        mapsToMissionType: 'pv-reserves',
      },
      {
        id: 'lot07-preuves',
        title: 'Preuves de performance',
        description: 'Suivi des PV feu / acoustique des cloisons et des avis techniques des complexes.',
        mapsToMissionType: 'ged-archivage',
      },
      {
        id: 'lot07-etancheite-air',
        title: 'Étanchéité à l’air',
        description: 'Traçabilité de l’étanchéité à l’air (produits, points singuliers) pour le test d’infiltrométrie.',
        mapsToMissionType: 'autre',
      },
    ],
  },
  {
    id: 'lot-08',
    label: 'Lot 08 — CVC / plomberie',
    audience: 'Plombiers-chauffagistes',
    lotNumber: 8,
    missions: [
      {
        id: 'lot08-fiches',
        title: 'Fiches équipements',
        description: 'Fiches PAC, ballons thermodynamiques, VMC et attestations RE2020.',
        mapsToMissionType: 'ged-archivage',
      },
      {
        id: 'lot08-essais',
        title: 'Essais',
        description: 'Suivi des PV d’essais (étanchéité des réseaux, mise en service, mesures de débit VMC).',
        mapsToMissionType: 'reporting-projet',
      },
      {
        id: 'lot08-coordination',
        title: 'Coordination',
        description: 'Coordination des réservations et percements avec le gros œuvre et le plâtrier.',
        mapsToMissionType: 'registre-plans-exe',
      },
    ],
  },
  {
    id: 'lot-09',
    label: 'Lot 09 — Électricité',
    audience: 'Électriciens',
    lotNumber: 9,
    missions: [
      {
        id: 'lot09-conformite',
        title: 'Conformité',
        description: 'Dossier de conformité NF C 15-100, attestation Consuel, schémas, notes de calcul.',
        mapsToMissionType: 'ged-archivage',
      },
      {
        id: 'lot09-raccordements',
        title: 'Raccordements',
        description: 'Suivi des comptages Enedis (Linky) et des raccordements (dates, pièces à fournir).',
        mapsToMissionType: 'suivi-observations',
      },
      {
        id: 'lot09-recolement',
        title: 'Récolement',
        description: 'Fiches produits (tableaux, VDI, fibre) et plan de récolement des installations.',
        mapsToMissionType: 'ged-archivage',
      },
    ],
  },
  {
    id: 'lot-10',
    label: 'Lot 10 — Carrelage / faïence / sols souples',
    audience: 'Carreleurs',
    lotNumber: 10,
    missions: [
      {
        id: 'lot10-preuves',
        title: 'Preuves et échantillons',
        description: 'Suivi des classements UPEC, avis techniques (colles, SPEC), échantillons et calepinages validés.',
        mapsToMissionType: 'ged-archivage',
      },
      {
        id: 'lot10-reception',
        title: 'Réception des supports',
        description: 'PV de réception des chapes et supports avant pose.',
        mapsToMissionType: 'pv-reserves',
      },
      {
        id: 'lot10-acoustique',
        title: 'Acoustique',
        description: 'Dossier des résilients acoustiques (ΔLw) pour la traçabilité.',
        mapsToMissionType: 'autre',
      },
    ],
  },
  {
    id: 'lot-11',
    label: 'Lot 11 — Peinture',
    audience: 'Peintres',
    lotNumber: 11,
    missions: [
      {
        id: 'lot11-subjectiles',
        title: 'Réception des subjectiles',
        description: 'Rédaction du PV de réception des subjectiles.',
        mapsToMissionType: 'pv-reserves',
      },
      {
        id: 'lot11-produits',
        title: 'Produits et variante',
        description: 'Suivi des fiches produits, teintes RAL validées et de la variante exigée chiffrée à part.',
        mapsToMissionType: 'ged-archivage',
      },
      {
        id: 'lot11-signaletique',
        title: 'Signalétique',
        description: 'Dossier signalétique (plans d’évacuation réglementaires, identification des locaux).',
        mapsToMissionType: 'autre',
      },
    ],
  },
  {
    id: 'lot-12',
    label: 'Lot 12 — VRD',
    audience: 'Entreprises de terrassement et VRD',
    lotNumber: 12,
    missions: [
      {
        id: 'lot12-demarches',
        title: 'Démarches préalables',
        description: 'DICT, autorisations de voirie, arrêtés de circulation, organisation du constat d’huissier.',
        mapsToMissionType: 'dossier-intervention',
      },
      {
        id: 'lot12-essais',
        title: 'Essais et contrôles',
        description: 'Suivi des PV d’essais (compactage / plaque, étanchéité des réseaux, passage caméra).',
        mapsToMissionType: 'reporting-projet',
      },
      {
        id: 'lot12-recolement',
        title: 'Récolement',
        description: 'Plan de récolement des réseaux EU / EP.',
        mapsToMissionType: 'ged-archivage',
      },
    ],
  },
  {
    id: 'lot-13',
    label: 'Lot 13 — Réseaux secs',
    audience: 'Entreprises de réseaux secs (BT / télécom / éclairage / IRVE)',
    lotNumber: 13,
    missions: [
      {
        id: 'lot13-coordination',
        title: 'Coordination',
        description: 'Traçabilité des DT-DICT et coordination des attentes (fourreaux, chambres) avant enrobés.',
        mapsToMissionType: 'dossier-intervention',
      },
      {
        id: 'lot13-raccordements',
        title: 'Raccordements',
        description: 'Suivi des raccordements Enedis / télécom, fiches candélabres et IRVE.',
        mapsToMissionType: 'suivi-observations',
      },
      {
        id: 'lot13-recolement',
        title: 'Récolement',
        description: 'Plan de récolement des réseaux secs.',
        mapsToMissionType: 'ged-archivage',
      },
    ],
  },
  {
    id: 'lot-14',
    label: 'Lot 14 — AEP / défense incendie',
    audience: 'Entreprises de réseaux humides',
    lotNumber: 14,
    missions: [
      {
        id: 'lot14-essais-aep',
        title: 'Essais AEP',
        description: 'Suivi des essais de pression et du PV de désinfection de l’AEP avant mise en service.',
        mapsToMissionType: 'reporting-projet',
      },
      {
        id: 'lot14-deci',
        title: 'Défense incendie',
        description: 'Dossier défense incendie (bâche 120 m³) : attestations et réception (avec le SDIS le cas échéant).',
        mapsToMissionType: 'autre',
      },
      {
        id: 'lot14-recolement',
        title: 'Récolement',
        description: 'Plan de récolement AEP et suivi des attentes d’arrosage.',
        mapsToMissionType: 'ged-archivage',
      },
    ],
  },
  {
    id: 'lot-15',
    label: 'Lot 15 — Paysage',
    audience: 'Paysagistes',
    lotNumber: 15,
    missions: [
      {
        id: 'lot15-planning',
        title: 'Planning plantations',
        description: 'Planning des plantations en saison et suivi des bordereaux de fournitures végétales.',
        mapsToMissionType: 'agenda-convocations',
      },
      {
        id: 'lot15-dechets',
        title: 'Déchets et fournitures',
        description: 'SOSED (déchets verts), bordereaux d’amendement et de terre végétale.',
        mapsToMissionType: 'ged-archivage',
      },
      {
        id: 'lot15-garantie',
        title: 'Garantie de reprise',
        description: 'Suivi de la garantie de reprise (parachèvement / confortement) et constats.',
        mapsToMissionType: 'suivi-levees-reserves',
      },
    ],
  },
  {
    id: 'lot-16',
    label: 'Lot 16 — Démolition / désamiantage',
    audience: 'Entreprises de démolition et de désamiantage',
    lotNumber: 16,
    missions: [
      {
        id: 'lot16-dossier-amiante',
        title: 'Dossier amiante',
        description:
          'Dossier réglementaire amiante : plan de retrait, mode opératoire, notification à l’inspection du travail.',
        mapsToMissionType: 'ppsps-plan-prevention',
      },
      {
        id: 'lot16-controles',
        title: 'Contrôles et déchets',
        description: 'Suivi des contrôles d’air (empoussièrement, libératoires) et des BSDA (traçabilité des déchets).',
        mapsToMissionType: 'reporting-projet',
      },
      {
        id: 'lot16-preuves',
        title: 'Preuves',
        description: 'Constat d’huissier, DICT, autorisations et archivage des preuves de dépollution.',
        mapsToMissionType: 'dossier-intervention',
      },
    ],
  },
];

/** Lots 01–16 avec arguments (douleur / risque / gain) issus du PDF v2. */
export const MISSIONS_PAR_LOT: LotMissionGroup[] = MISSIONS_PAR_LOT_BASE.map((group) => ({
  ...group,
  pitch: LOT_PITCHES[group.id],
}));

export const ALL_MISSION_GROUPS: LotMissionGroup[] = [
  ...MISSIONS_TRANSVERSALES,
  ...MISSIONS_PAR_LOT,
];

export function getLotMissionGroup(id: string): LotMissionGroup | undefined {
  return ALL_MISSION_GROUPS.find((g) => g.id === id);
}

export function resolveMissionTypeForLotMission(mission: LotMissionItem): string {
  return mission.mapsToMissionType ?? 'autre';
}

/** URL nouvelle demande préremplie depuis une mission confiée. */
export function newDemandeUrlFromLotMission(
  group: LotMissionGroup,
  mission: LotMissionItem,
): string {
  const type = resolveMissionTypeForLotMission(mission);
  const params = new URLSearchParams({
    type,
    title: `${mission.title} — ${group.label}`,
    brief: [
      `Mission confiée BeWork : ${mission.title}.`,
      mission.description,
      `Contexte : ${group.label} (${group.audience}).`,
      group.lotNumber > 0 ? `Lot n°${String(group.lotNumber).padStart(2, '0')}.` : 'Mission transversale (tous lots).',
    ].join('\n'),
  });
  return `/plateforme/demandes/nouvelle?${params.toString()}`;
}
