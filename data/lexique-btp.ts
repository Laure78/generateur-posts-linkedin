// data/lexique-btp.ts

import { LEXIQUE_FONDATIONS_GROS_OEUVRE } from './lexique-btp-fondations-gros-oeuvre';
import { LEXIQUE_ENDUITS_FACADE } from './lexique-btp-enduits-facade';
import { LEXIQUE_PERF_ENERGETIQUE } from './lexique-btp-perf-energetique';
import { LEXIQUE_MENUISERIES_EXTERIEURES } from './lexique-btp-menuiseries-exterieures';
import { LEXIQUE_CHARPENTE_COUVERTURE } from './lexique-btp-charpente-couverture';

export type Famille =
  | "Procédures & notation"
  | "Documents du marché"
  | "Préparation & exécution"
  | "Prix & facturation"
  | "Plateformes & outils"
  | "Acteurs & organisation"
  | "Sécurité & prévention"
  | "Amiante & plomb"
  | "Environnement & déchets"
  | "Certifications"
  | "Sols & revêtements"
  | "Finitions béton"
  | "Terrassement & géotechnique"
  | "Eurocodes & structure"
  | "Béton & aciers"
  | "Réseaux & lots techniques"
  | "Réception & garanties"
  | "Études & conception"
  | "Suivi de chantier"
  | "Marché privé (promoteur)"
  | "Sous-traitance"
  | "Divers techniques"
  | "Enduits & façades"
  | "Performance énergétique & contrôles"
  | "Menuiseries extérieures"
  | "Charpente & couverture";

export interface TermeLexique {
  id: string;
  terme: string;
  sigle?: string;
  famille: Famille;
  definition: string;
  aQuoiCaSert?: string;
  exemple?: string;
  vigilance?: string;
}

export const FAMILLES: Famille[] = [
  "Procédures & notation",
  "Documents du marché",
  "Préparation & exécution",
  "Prix & facturation",
  "Plateformes & outils",
  "Acteurs & organisation",
  "Sécurité & prévention",
  "Amiante & plomb",
  "Environnement & déchets",
  "Certifications",
  "Sols & revêtements",
  "Finitions béton",
  "Terrassement & géotechnique",
  "Eurocodes & structure",
  "Béton & aciers",
  "Réseaux & lots techniques",
  "Réception & garanties",
  "Études & conception",
  "Suivi de chantier",
  "Marché privé (promoteur)",
  "Sous-traitance",
  "Divers techniques",
  "Enduits & façades",
  "Performance énergétique & contrôles",
  "Menuiseries extérieures",
  "Charpente & couverture",
];

export const LEXIQUE: TermeLexique[] = [
  // ── Procédures & notation ──
  {
    id: "mapa",
    terme: "MAPA",
    sigle: "Marché À Procédure Adaptée",
    famille: "Procédures & notation",
    definition:
      "Marché public simplifié (consultation non formalisée) pour les petits ou moyens montants.",
    aQuoiCaSert: "Donne plus de souplesse à l'acheteur et permet souvent la négociation.",
  },
  {
    id: "accord-cadre",
    terme: "Accord-cadre",
    famille: "Procédures & notation",
    definition:
      "Contrat général par lequel l'acheteur sélectionne plusieurs entreprises pour une durée (ex : 4 ans). Vous êtes « référencé », mais sans travaux ni budget garantis.",
    exemple: "3 entreprises de peinture retenues pour 4 ans = le tronc de l'arbre.",
  },
  {
    id: "marche-subsequent",
    terme: "Marché subséquent",
    famille: "Procédures & notation",
    definition:
      "Le « bon de commande » qui découle de l'accord-cadre. C'est le vrai contrat qui déclenche un chantier précis et fixe le prix définitif.",
    exemple:
      "Repeindre la cage d'escalier de la Résidence A : remise en concurrence des entreprises référencées.",
  },
  {
    id: "sad",
    terme: "SAD",
    sigle: "Système d'Acquisition Dynamique",
    famille: "Procédures & notation",
    definition: "Procédure d'achat 100 % électronique, ouverte en continu à de nouveaux fournisseurs.",
    exemple:
      "Une sorte de catalogue d'entreprises pré-sélectionnées, remises en concurrence pour les besoins courants.",
  },
  {
    id: "aapc",
    terme: "AAPC",
    sigle: "Avis d'Appel Public à la Concurrence",
    famille: "Procédures & notation",
    definition: "L'annonce officielle d'un marché public.",
    aQuoiCaSert:
      "Informe les entreprises qu'un marché est ouvert et qu'elles peuvent télécharger le DCE pour répondre.",
  },
  {
    id: "dc1",
    terme: "DC1",
    sigle: "Lettre de candidature",
    famille: "Procédures & notation",
    definition:
      "La « fiche d'identité » de votre candidature. On y dit officiellement : « mon entreprise souhaite participer ». On y liste aussi les co-traitants et sous-traitants.",
  },
  {
    id: "dc2",
    terme: "DC2",
    sigle: "Déclaration du candidat",
    famille: "Procédures & notation",
    definition:
      "La preuve que vous avez les épaules solides : chiffre d'affaires des 3 dernières années, nombre de salariés, assurances.",
  },
  {
    id: "dc4",
    terme: "DC4",
    sigle: "Déclaration de sous-traitance",
    famille: "Procédures & notation",
    definition:
      "Formulaire obligatoire pour déclarer qu'une autre entreprise réalisera une partie des travaux à votre place.",
    aQuoiCaSert:
      "Une fois validé, la loi oblige l'acheteur public à payer le sous-traitant directement (paiement direct).",
  },
  {
    id: "dume",
    terme: "DUME",
    sigle: "Document Unique de Marché Européen",
    famille: "Procédures & notation",
    definition:
      "Le remplaçant moderne « tout-en-un » des DC1/DC2 : un passeport électronique valable dans toute l'Europe, rempli en ligne.",
  },
  {
    id: "pades",
    terme: "PAdES",
    famille: "Procédures & notation",
    definition:
      "Signature électronique conçue pour les fichiers PDF (la plus courante, ex : Yousign, DocuSign, Adobe). Affiche un encadré visuel sur le document.",
  },
  {
    id: "xades",
    terme: "XAdES",
    famille: "Procédures & notation",
    definition:
      "Signature électronique pour les fichiers XML (données/code). Souvent utilisée par les logiciels de compta pour signer les flux de factures vers Chorus Pro.",
  },
  {
    id: "cades",
    terme: "CAdES",
    famille: "Procédures & notation",
    definition:
      "Signature pour les très gros fichiers binaires. Crée souvent un petit fichier de signature séparé (un « cadenas ») associé au document.",
  },
  {
    id: "criteres-notation",
    terme: "Critères de notation",
    famille: "Procédures & notation",
    definition:
      "Critères utilisés par l'acheteur pour comparer les offres : prix, valeur technique, organisation, moyens, environnement, RSE, délais, sécurité.",
  },
  {
    id: "acor",
    terme: "Critères ACOR",
    famille: "Procédures & notation",
    definition:
      "Trame de réponse (souvent chez les bailleurs sociaux) axée sur 4 thèmes : Accessibilité (normes PMR, accès sécurisés), Confort (limiter bruit/poussière), Organisation (planning, livraisons, coupures), Réglementation (sécurité).",
  },
  {
    id: "variantes",
    terme: "Variantes",
    famille: "Procédures & notation",
    definition:
      "Solutions alternatives proposées par l'entreprise par rapport à la solution de base. Acceptées seulement si le règlement de consultation les autorise.",
  },
  {
    id: "pse",
    terme: "PSE",
    sigle: "Prestation Supplémentaire Éventuelle",
    famille: "Procédures & notation",
    definition:
      "Option à chiffrer si elle est demandée, mais que l'acheteur reste libre de commander ou non.",
  },

  // ── Documents du marché ──
  {
    id: "dce",
    terme: "DCE",
    sigle: "Dossier de Consultation des Entreprises",
    famille: "Documents du marché",
    definition: "Le dossier complet remis aux entreprises pour répondre.",
    exemple:
      "Contient en général : RC, AE, CCAP, CCTP, plans, DPGF ou BPU/DQE, PGC, RICT et annexes.",
  },
  {
    id: "rc",
    terme: "RC",
    sigle: "Règlement de Consultation",
    famille: "Documents du marché",
    definition:
      "Explique comment répondre : pièces à fournir, date limite, critères de notation, lots, variantes, PSE, dépôt.",
  },
  {
    id: "ae",
    terme: "AE",
    sigle: "Acte d'Engagement",
    famille: "Documents du marché",
    definition:
      "Document contractuel par lequel l'entreprise s'engage sur son prix, son délai et les conditions du marché.",
  },
  {
    id: "ccap",
    terme: "CCAP",
    sigle: "Cahier des Clauses Administratives Particulières",
    famille: "Documents du marché",
    definition:
      "Fixe les règles administratives du marché : délais, paiements, pénalités, avance, retenue de garantie, sous-traitance, assurances, réception.",
  },
  {
    id: "cctp",
    terme: "CCTP",
    sigle: "Cahier des Clauses Techniques Particulières",
    famille: "Documents du marché",
    definition:
      "Décrit les travaux à réaliser, les matériaux, les normes à respecter et les performances attendues.",
  },
  {
    id: "ccag-travaux",
    terme: "CCAG-Travaux",
    sigle: "Cahier des Clauses Administratives Générales (travaux)",
    famille: "Documents du marché",
    definition:
      "Document de référence qui fixe les « règles du jeu » communes à la plupart des marchés publics de travaux (ordres de service, délais, pénalités, imprévus, litiges, réception).",
    vigilance:
      "Ses clauses s'appliquent automatiquement, sauf si le CCAP y déroge explicitement.",
  },
  {
    id: "dtu",
    terme: "DTU",
    sigle: "Document Technique Unifié",
    famille: "Documents du marché",
    definition:
      "Le « code de la route » du bâtiment : un guide officiel qui explique comment poser un matériau dans les règles de l'art.",
    aQuoiCaSert:
      "Les DTU disent comment bien construire sur chantier ; les Eurocodes disent comment calculer et dimensionner la structure (bureau d'études).",
    vigilance:
      "Ne pas le respecter = l'assurance peut refuser de rembourser en cas de problème (ex : fuite).",
  },
  {
    id: "cadre-memoire",
    terme: "Cadre de mémoire / Cadre de réponse",
    famille: "Documents du marché",
    definition:
      "Trame de mémoire technique pré-remplie imposée par l'acheteur, à suivre point par point pour présenter son savoir-faire.",
  },
  {
    id: "memoire-technique",
    terme: "Mémoire technique",
    famille: "Documents du marché",
    definition:
      "Document où l'entreprise explique son organisation, ses moyens humains et matériels, sa méthode, sa sécurité, son planning et sa gestion des déchets.",
  },
  {
    id: "diuo",
    terme: "DIUO",
    sigle: "Dossier d'Intervention Ultérieure sur l'Ouvrage",
    famille: "Réception & garanties",
    definition:
      "Document de prévention défini par le Code du travail. Il facilite la sécurité des professionnels lors de leurs futures interventions sur l'ouvrage (entretien de façade, maintenance de toiture, etc.).",
    aQuoiCaSert:
      "Identifier les risques liés aux futures interventions sur le bâtiment ; fournir des solutions et des consignes pour protéger la santé des travailleurs.",
    exemple:
      "Plans et fiches remis à la livraison pour qu'une équipe de ravalement ou de maintenance CVC intervienne sans ignorer un risque (amiante, électricité, chutes…).",
    vigilance:
      "Public : futurs ouvriers et entreprises intervenant sur le site. Ne pas confondre avec le DOE : le DIUO vise la prévention des risques professionnels (Code du travail) ; le DOE sert à la maintenance, l'exploitation et l'assurance de l'ouvrage (CCAG Travaux en public). Les deux dossiers sont souvent transmis ensemble à la réception.",
  },

  // ── Préparation & exécution ──
  {
    id: "os",
    terme: "Ordre de Service (OS)",
    famille: "Préparation & exécution",
    definition:
      "Décision écrite, datée et signée par le maître d'œuvre ou d'ouvrage, qui ordonne à l'entreprise d'exécuter une action précise. L'entreprise doit obéir, même en désaccord.",
    vigilance:
      "Règle d'or : « Pas d'OS, pas de travaux ». Jamais de travaux supplémentaires sur simple demande orale.",
  },
  {
    id: "os-demarrage",
    terme: "OS de démarrage (OS n°1)",
    famille: "Préparation & exécution",
    definition: "Le plus important : il fixe le point de départ officiel du délai d'exécution.",
    exemple: "« Le délai de 12 mois commence à courir le 1er septembre. »",
  },
  {
    id: "os-suspension",
    terme: "OS de suspension / reprise",
    famille: "Préparation & exécution",
    definition:
      "Arrête officiellement le chantier (intempéries, découverte archéologique…) ou ordonne sa reprise. Permet de « geler » le décompte des jours et d'éviter des pénalités.",
  },
  {
    id: "os-modificatif",
    terme: "OS de travaux modificatifs",
    famille: "Préparation & exécution",
    definition:
      "Ordre de réaliser des prestations non prévues au contrat, en attendant un avenant qui régularisera le prix.",
  },
  {
    id: "droit-reserve",
    terme: "Droit de réserve",
    famille: "Préparation & exécution",
    definition:
      "Si un OS cause un préjudice, l'entreprise doit émettre des réserves écrites et motivées dans un délai strict (souvent 15 jours selon le CCAG).",
    vigilance:
      "Principe « obéir d'abord, réclamer ensuite ». Passé le délai, l'ordre est réputé accepté sans compensation.",
  },
  {
    id: "programme-execution",
    terme: "Programme d'Exécution",
    famille: "Préparation & exécution",
    definition:
      "Le calendrier détaillé du chantier (type Gantt), dessiné par l'entreprise et validé par l'architecte. À envoyer 15 à 30 jours après l'OS.",
    vigilance:
      "Une fois validé, il devient une promesse : du retard = des pénalités.",
  },
  {
    id: "plans-exe",
    terme: "Plans d'Exécution (Plans EXE)",
    famille: "Préparation & exécution",
    definition:
      "Les plans de chantier ultra-détaillés, au millimètre (mesures exactes, fixations, assemblages).",
    vigilance:
      "À valider par l'architecte (visa « Bon pour exécution ») avant de commencer.",
  },
  {
    id: "notes-calcul",
    terme: "Notes de Calcul",
    famille: "Préparation & exécution",
    definition:
      "Dossier mathématique du bureau d'études prouvant que l'ouvrage va tenir (résistance au poids, au vent, à la neige).",
    exemple: "Prouver par le calcul qu'une vitre ne va pas exploser lors d'une tempête.",
  },
  {
    id: "etudes-detail",
    terme: "Études de Détail",
    famille: "Préparation & exécution",
    definition:
      "Dessins « zooms » (coupes techniques) sur les points complexes ou fragiles, pour éviter les erreurs d'assemblage.",
  },
  {
    id: "specs-techniques",
    terme: "Spécifications Techniques (Fiches Techniques)",
    famille: "Préparation & exécution",
    definition:
      "Les cartes d'identité des matériaux proposés (marques, dimensions, labels comme NF-SNFQ). Prouvent que les produits respectent le contrat.",
  },
  {
    id: "phasage",
    terme: "Phasage",
    famille: "Préparation & exécution",
    definition: "Organisation chronologique du chantier en plusieurs étapes successives.",
  },

  // ── Prix & facturation ──
  {
    id: "dpgf",
    terme: "DPGF",
    sigle: "Décomposition du Prix Global et Forfaitaire",
    famille: "Prix & facturation",
    definition:
      "Tableau du marché au forfait : on liste tous les postes (terrassement, maçonnerie…) et l'entreprise met son prix. La somme donne le prix total fixe.",
    vigilance:
      "Le forfait bloque le prix : un poste oublié ou sous-estimé reste à votre charge.",
  },
  {
    id: "dqe",
    terme: "DQE",
    sigle: "Détail Quantitatif Estimatif",
    famille: "Prix & facturation",
    definition:
      "Scénario fictif avec des quantités estimées (ex : 500 m² de carrelage) que l'on multiplie par vos prix unitaires pour comparer les candidats.",
    vigilance: "Vous êtes payé sur les quantités réellement commandées, pas sur le DQE.",
  },
  {
    id: "bpu",
    terme: "BPU",
    sigle: "Bordereau des Prix Unitaires",
    famille: "Prix & facturation",
    definition:
      "Tableau où l'entreprise indique son prix unitaire pour chaque prestation. Souvent utilisé avec un DQE.",
  },
  {
    id: "situation-travaux",
    terme: "Situation de travaux",
    famille: "Prix & facturation",
    definition:
      "Facture provisoire mensuelle qui traduit l'avancement réel du chantier en euros : vous indiquez ce qui est fait (ex. 40 % du lot peinture) et vous demandez le paiement correspondant, avant la facture définitive de fin de travaux.",
    aQuoiCaSert:
      "Permet d'être payé au fil de l'eau pendant le chantier, sans attendre la réception. C'est le document que le MOE (souvent l'architecte) contrôle avant que le MOA déclenche le virement.",
    exemple:
      "En mars, vous avez posé 60 % des cloisons et 30 % de la peinture : la situation de mars détaille ces % par poste du BPU/DPGF, le MOE la valide, puis vous la déposez sur Chorus Pro (marché public).",
    vigilance:
      "Ne facturez que ce qui est réellement réalisé et vérifiable : une situation gonflée bloque la confiance et peut retarder le paiement. Conservez les justificatifs (photos, bons d'intervention, quantités).",
  },
  {
    id: "revision-prix",
    terme: "Révision de prix",
    famille: "Prix & facturation",
    definition:
      "Calcul mensuel lié à l'inflation (formule avec un indice comme le TP10f) : on ajoute la hausse du coût des matériaux et du carburant depuis le début du projet.",
  },
  {
    id: "rfa",
    terme: "RFA",
    sigle: "Remise de Fin d'Année",
    famille: "Prix & facturation",
    definition:
      "Remise accordée au client public. Réglée soit par un Avoir (on baisse les prochaines factures), soit par un Titre de recette (l'acheteur réclame un virement).",
  },
  {
    id: "ediflex",
    terme: "EDIFLEX",
    famille: "Prix & facturation",
    definition:
      "Rapport ou annexe de calcul lié à une facture/situation, pour justifier et valider les montants à payer.",
    vigilance: "Ce n'est pas un sigle BTP universel : à vérifier selon le dossier.",
  },

  // ── Plateformes & outils ──
  {
    id: "aprovall",
    terme: "APROVALL",
    sigle: "ex-e-Attestations",
    famille: "Plateformes & outils",
    definition:
      "« Coffre-fort numérique » légal : vous déposez vos attestations une fois et les partagez à vos clients. Prouve que l'entreprise est à jour (anti travail dissimulé), connectée à URSSAF/Infogreffe/impôts.",
  },
  {
    id: "chorus-pro",
    terme: "Chorus Pro",
    famille: "Plateformes & outils",
    definition: "Le site officiel de l'État où l'on dépose obligatoirement ses factures pour le secteur public.",
    exemple: "L'image : Chorus Pro = la boîte aux lettres jaune de La Poste.",
  },
  {
    id: "ikos",
    terme: "IKOS",
    famille: "Plateformes & outils",
    definition:
      "Logiciel interne de l'acheteur public (ex : Paris Habitat) qui reçoit la facture, la lie au bon de commande et déclenche le paiement.",
    vigilance: "Sans le « numéro de commande Ikos » sur la facture, le paiement est bloqué.",
  },
  {
    id: "ecf",
    terme: "Extranet Fournisseur (ECF)",
    sigle: "Espace Collaboratif Fournisseurs",
    famille: "Plateformes & outils",
    definition:
      "Site privé mis en place par le client : guichet unique numérique pour la facturation (situations), l'administratif (attestations, sous-traitants) et le suivi technique (plans, validations).",
  },
  {
    id: "ged",
    terme: "GED Technique",
    sigle: "Gestion Électronique des Documents",
    famille: "Plateformes & outils",
    definition:
      "Le dossier partagé du chantier sur internet : on y dépose plans et fiches matériaux, l'architecte et le contrôleur vérifient puis posent un « Visa » (tampon vert) avant de construire.",
  },

  // ── Acteurs & organisation ──
  {
    id: "moa",
    terme: "MOA",
    sigle: "Maîtrise d'Ouvrage",
    famille: "Acteurs & organisation",
    definition:
      "Le client du projet : il commande les travaux, finance l'opération et réceptionne l'ouvrage.",
  },
  {
    id: "moe",
    terme: "MOE",
    sigle: "Maîtrise d'Œuvre",
    famille: "Acteurs & organisation",
    definition:
      "L'architecte ou bureau d'études qui suit la conformité technique : vérifie que les ouvrages respectent les plans, le CCTP et les règles de l'art.",
  },
  {
    id: "bet",
    terme: "BET",
    sigle: "Bureau d'Études Techniques",
    famille: "Acteurs & organisation",
    definition:
      "Ingénieurs qui font les analyses, plans techniques et notes de calcul. Ils donnent le feu vert scientifique.",
    exemple:
      "En démolition, c'est le BET qui valide qu'on peut casser un mur sans faire s'écrouler l'immeuble.",
  },
  {
    id: "opc",
    terme: "OPC",
    sigle: "Ordonnancement, Pilotage et Coordination",
    famille: "Acteurs & organisation",
    definition:
      "Le chef d'orchestre du planning : il organise l'intervention de chaque corps d'état pour éviter retards et conflits entre entreprises.",
  },
  {
    id: "bureau-controle",
    terme: "Bureau de contrôle",
    famille: "Acteurs & organisation",
    definition:
      "Organisme indépendant (Socotec, Apave, Veritas…) qui contrôle certains points techniques : solidité, sécurité incendie, accessibilité, acoustique, thermique…",
    aQuoiCaSert:
      "En marché privé promoteur, ses avis conditionnent souvent la pose des matériaux : un « avis suspendu » bloque le chantier tant que les remarques ne sont pas levées.",
  },
  {
    id: "visa-bureau-controle",
    terme: "Visa du bureau de contrôle",
    famille: "Acteurs & organisation",
    definition:
      "Avis formel du contrôleur technique sur vos plans d'exécution, notes de calcul ou documents de synthèse.",
    aQuoiCaSert:
      "Sur un chantier promoteur (VEFA), les plans EXE et calculs (ex. Robot) doivent obtenir un avis « Favorable » avant pose. Tant qu'une remarque subsiste, le promoteur peut refuser le démarrage du lot concerné.",
    vigilance:
      "Ne commandez pas de matériaux ni ne lancez la pose sans visa favorable sur les pièces exigées au RICT.",
  },
  {
    id: "rict",
    terme: "RICT",
    sigle: "Rapport Initial de Contrôle Technique",
    famille: "Acteurs & organisation",
    definition:
      "Document établi par le bureau de contrôle agréé à la fin de la phase de conception, avant la signature des marchés de travaux. Il évalue si l'ouvrage pourra répondre aux exigences de solidité et de sécurité des personnes une fois achevé.",
    aQuoiCaSert:
      "Adressé au maître d'ouvrage (transmis à la MOE, et sur demande à l'assureur ou au pouvoir adjudicateur en public). Il synthétise les avis du contrôleur sur la qualité des documents de conception, la maîtrise des risques et l'assurabilité de l'ouvrage.",
    exemple:
      "Cinq avis possibles : Favorable (F) — risque maîtrisé ; Favorable sous réserve (FS) — réserves à lever ; Défavorable (D) — risque non maîtrisé, modifications exigées ; Suspendu (S) — description insuffisante, informations manquantes ; Sans objet (SO) — mission non concernée à ce stade.",
    vigilance:
      "Désignez le bureau de contrôle en même temps que le MOE pour qu'il intervienne dès le début — une désignation tardive entraîne des réserves. À lire avant de chiffrer : ses exigences peuvent alourdir votre prix. Ne lancez pas la pose sans visa favorable sur les pièces exigées au RICT.",
  },
  {
    id: "csps",
    terme: "CSPS",
    sigle: "Coordonnateur Sécurité et Protection de la Santé",
    famille: "Acteurs & organisation",
    definition:
      "Intervenant qui organise la sécurité générale du chantier, surtout quand plusieurs entreprises travaillent en même temps (coactivité).",
  },
  {
    id: "pgc",
    terme: "PGC / PGCSPS",
    sigle: "Plan Général de Coordination",
    famille: "Acteurs & organisation",
    definition:
      "Document rédigé en amont par le coordonnateur SPS : consignes de sécurité communes et risques de coactivité. C'est la base sur laquelle chaque entreprise rédige son PPSPS.",
  },

  // ── Sécurité & prévention ──
  {
    id: "catec",
    terme: "CATEC",
    sigle: "Certificat d'Aptitude à Travailler en Espaces Confinés",
    famille: "Sécurité & prévention",
    definition:
      "Le « permis » obligatoire pour travailler dans des endroits fermés et dangereux (égouts, cuves, canalisations).",
    aQuoiCaSert:
      "Prouve que les ouvriers savent détecter gaz toxiques et manque d'oxygène. Sans la carte, le chantier est bloqué.",
  },
  {
    id: "hse",
    terme: "HSE",
    sigle: "Hygiène, Sécurité, Environnement",
    famille: "Sécurité & prévention",
    definition:
      "La politique générale de l'entreprise pour protéger la santé des salariés, éviter les accidents et limiter l'impact environnemental.",
  },
  {
    id: "duerp",
    terme: "DUERP / DUER",
    sigle: "Document Unique d'Évaluation des Risques Professionnels",
    famille: "Sécurité & prévention",
    definition:
      "Document légal obligatoire qui liste tous les risques du métier (chutes, poussière, amiante) et les protections prévues.",
    vigilance:
      "L'acheteur le réclame (surtout le volet amiante pour les immeubles d'avant 1997). Son absence peut bloquer la signature.",
  },
  {
    id: "ppsps",
    terme: "PPSPS",
    sigle: "Plan Particulier de Sécurité et de Protection de la Santé",
    famille: "Sécurité & prévention",
    definition:
      "Document rédigé par chaque entreprise : risques propres à son intervention, modes opératoires et protections prévues.",
  },
  {
    id: "tat",
    terme: "TAT",
    sigle: "Taux d'Accident du Travail",
    famille: "Sécurité & prévention",
    definition:
      "Indicateur de sécurité de l'entreprise (niveau d'accidents par rapport à l'activité).",
    vigilance:
      "À manier avec prudence : on parle aussi de taux de fréquence ou de gravité.",
  },
  {
    id: "cissct",
    terme: "CISSCT",
    sigle: "Collège Interentreprises de Sécurité, Santé et Conditions de Travail",
    famille: "Sécurité & prévention",
    definition:
      "Comité de sécurité obligatoire sur les très grands chantiers (niveau 1) : il réunit les entreprises pour suivre les règles communes.",
  },
  {
    id: "sps-niveaux",
    terme: "Niveaux SPS (1 à 3)",
    famille: "Sécurité & prévention",
    definition:
      "Niveau 1 = très grand chantier (>10 000 hommes-jours, CISSCT obligatoire). Niveau 2 = moyen/important (PGC + PPSPS, sans CISSCT). Niveau 3 = petit chantier (démarches allégées).",
  },
  {
    id: "notice-poste",
    terme: "Notice de poste",
    famille: "Sécurité & prévention",
    definition:
      "Document de sécurité expliquant les risques d'un poste de travail, les protections obligatoires et les consignes à respecter.",
  },
  {
    id: "carte-btp",
    terme: "Carte BTP",
    famille: "Sécurité & prévention",
    definition:
      "Carte d'identité professionnelle obligatoire pour chaque ouvrier sur le chantier. L'entreprise principale doit vérifier celle de ses sous-traitants (lutte contre le travail au noir).",
  },

  // ── Amiante & plomb ──
  {
    id: "dta",
    terme: "DTA",
    sigle: "Dossier Technique Amiante",
    famille: "Amiante & plomb",
    definition:
      "Le « carnet de santé amiante » du bâtiment : liste les matériaux amiantés connus dans les parties communes. La carte météo générale du risque.",
  },
  {
    id: "dapp",
    terme: "DAPP",
    sigle: "Dossier Amiante des Parties Privatives",
    famille: "Amiante & plomb",
    definition:
      "Le diagnostic amiante à l'intérieur des appartements. Liste les matériaux à risque de la « Liste A » (faux-plafonds, flocages, calorifugeages).",
  },
  {
    id: "rat",
    terme: "RAT / RAAT",
    sigle: "Repérage Amiante avant Travaux",
    famille: "Amiante & plomb",
    definition:
      "Le « repérage chirurgical » obligatoire : contrôle précis de la zone exacte où l'on va percer/casser. Doit être joint au DCE.",
  },
  {
    id: "ss4",
    terme: "SS4",
    sigle: "Sous-section 4 amiante",
    famille: "Amiante & plomb",
    definition:
      "Réglementation pour intervenir PONCTUELLEMENT sur ou près de matériaux amiantés (sans les retirer).",
    exemple:
      "Percer un mur amianté, remplacer une vanne. Nécessite formation, mode opératoire, notice de poste, protections.",
  },
  {
    id: "ss3",
    terme: "SS3",
    sigle: "Sous-section 3 amiante",
    famille: "Amiante & plomb",
    definition:
      "Réglementation quand le but est de RETIRER, démolir ou confiner l'amiante.",
    exemple:
      "Dépose complète de canalisations en amiante-ciment. Impose certification, plan de retrait, traçabilité stricte.",
  },
  {
    id: "pdre",
    terme: "PDRE",
    sigle: "Plan de Retrait",
    famille: "Amiante & plomb",
    definition:
      "Méthodologie obligatoire pour le désamiantage en SS3 : moyens, confinement, protections, contrôles, gestion des déchets.",
  },
  {
    id: "bsda",
    terme: "BSDA",
    sigle: "Bordereau de Suivi des Déchets Amiante",
    famille: "Amiante & plomb",
    definition:
      "Document obligatoire qui trace le transport et l'élimination des déchets amiantés (notamment l'amiante-ciment).",
  },
  {
    id: "daad",
    terme: "DAAD",
    sigle: "Diagnostic Amiante Avant Démolition",
    famille: "Amiante & plomb",
    definition:
      "Le diagnostic amiante le plus strict : on cherche partout, même au cœur des murs, dalles béton et canalisations enterrées, car tout va être détruit.",
  },
  {
    id: "diag-plomb",
    terme: "Diagnostic Plomb avant démolition",
    famille: "Amiante & plomb",
    definition:
      "Repérage obligatoire du plomb (souvent dans les vieilles peintures). En démolition, la poussière de plomb est toxique : ce document protège ouvriers et environnement.",
  },
  {
    id: "pemd",
    terme: "Diagnostic PEMD",
    sigle: "Produits, Équipements, Matériaux, Déchets",
    famille: "Amiante & plomb",
    definition:
      "Inventaire obligatoire pour les grosses démolitions : liste tout ce qui va être cassé et comment trier/recycler/jeter chaque matériau.",
  },

  // ── Environnement & déchets ──
  {
    id: "rse",
    terme: "RSE",
    sigle: "Responsabilité Sociétale des Entreprises",
    famille: "Environnement & déchets",
    definition:
      "Contribution de l'entreprise au développement durable : produire du profit sans détruire la nature ni exploiter les humains.",
  },
  {
    id: "soged",
    terme: "SOGED",
    sigle: "Schéma Organisationnel de Gestion et d'Élimination des Déchets",
    famille: "Environnement & déchets",
    definition:
      "Document obligatoire qui détaille nature/volume des déchets, emplacement des bennes de tri et centres de recyclage agréés (traçabilité).",
  },
  {
    id: "sopre",
    terme: "SOPRE",
    sigle: "Schéma Organisationnel du Plan de Respect de l'Environnement",
    famille: "Environnement & déchets",
    definition:
      "Explique comment l'entreprise gère l'environnement : stockage des produits dangereux, protection des sols et de l'eau, tri des déchets, nuisances.",
  },
  {
    id: "sosed",
    terme: "SOSED",
    sigle: "Schéma d'Organisation et de Suivi de l'Élimination des Déchets",
    famille: "Environnement & déchets",
    definition:
      "Plan détaillant la gestion des déchets : tri, stockage, évacuation, filières de traitement et traçabilité.",
  },
  {
    id: "fds",
    terme: "FDS",
    sigle: "Fiche de Données de Sécurité",
    famille: "Environnement & déchets",
    definition:
      "Notice obligatoire d'un produit dangereux (colle, peinture, solvant…) : comment le manipuler, stocker, protéger les salariés et l'éliminer sans risque.",
  },
  {
    id: "fdes",
    terme: "FDES",
    sigle: "Fiche de Déclaration Environnementale et Sanitaire",
    famille: "Environnement & déchets",
    definition:
      "Document officiel standardisé (généralement édité par le fabricant) qui détaille l'impact environnemental et sanitaire exact d'un matériau sur tout son cycle de vie.",
    aQuoiCaSert:
      "Preuve de la faible empreinte carbone d'un produit : le bureau d'études thermiques collecte les FDES pour alimenter le logiciel de calcul et valider l'indicateur Ic Construction de la RE2020.",
    exemple:
      "Béton bas-carbone, laine de bois, chanvre : chaque produit posé doit pouvoir être justifié par sa FDES.",
  },
  {
    id: "rfar",
    terme: "Charte RFAR",
    sigle: "Relations Fournisseurs et Achats Responsables",
    famille: "Environnement & déchets",
    definition:
      "Liste d'engagements signée pour des relations honnêtes et éthiques avec fournisseurs et sous-traitants.",
  },

  // ── Certifications ──
  {
    id: "qualibat",
    terme: "QUALIBAT",
    famille: "Certifications",
    definition:
      "Le « label de confiance » officiel du bâtiment : certificats (numéros à 4 chiffres) prouvant qu'une entreprise est sérieuse, assurée et experte.",
    vigilance:
      "En marché public, avoir la bonne qualification est souvent obligatoire pour pouvoir déposer son offre.",
  },
  {
    id: "acs",
    terme: "ACS",
    sigle: "Attestation de Conformité Sanitaire",
    famille: "Certifications",
    definition:
      "Agrément obligatoire pour les matériaux en contact avec l'eau potable, délivré par un laboratoire agréé par le Ministère de la Santé.",
  },
  {
    id: "cerqual",
    terme: "Rapport Cerqual",
    famille: "Certifications",
    definition:
      "Cahier d'exigences (logements sociaux/certifiés) sur l'acoustique, la plomberie, l'isolation, la ventilation… À respecter pour obtenir la certification visée.",
  },
  {
    id: "ip-fntp",
    terme: "IP FNTP",
    sigle: "Identification Professionnelle FNTP",
    famille: "Certifications",
    definition:
      "Classification de la Fédération Nationale des Travaux Publics attestant la capacité technique dans une spécialité (ex : 511 canalisations sous pression, 524 réhabilitation sans tranchée).",
  },
  {
    id: "certif-capacite",
    terme: "Certificat de capacité",
    famille: "Certifications",
    definition:
      "Document prouvant qu'une entreprise a déjà réalisé des travaux similaires avec succès.",
  },
  {
    id: "nf-snfq",
    terme: "Label NF / SNFQ",
    famille: "Certifications",
    definition:
      "Certification de qualité pour la quincaillerie (serrures, paumelles, poignées…). Repère obligatoire sur les chantiers publics.",
  },
  {
    id: "cstb",
    terme: "Certification CSTB / NF",
    sigle: "Centre Scientifique et Technique du Bâtiment",
    famille: "Certifications",
    definition:
      "Produit testé en laboratoire indépendant : gage de qualité pour les assureurs (décennale). Comprend la marque NF, le classement UPEC et l'Avis Technique (ATec).",
    vigilance:
      "Piège : le marquage CE (auto-déclaration) ne suffit pas. Exigez le certificat CSTB/NF.",
  },
  {
    id: "re2020",
    terme: "RE2020",
    sigle: "Réglementation Environnementale 2020",
    famille: "Certifications",
    definition:
      "Réglementation d'État obligatoire pour la conception et la construction de tous les bâtiments neufs en France (hors petites extensions). Elle s'applique sans distinction aux marchés publics et aux marchés privés.",
    aQuoiCaSert:
      "Fixer les standards pour diviser par trois l'impact carbone du bâtiment : limiter la consommation d'énergie, garantir le confort d'été sans climatisation, et réduire la pollution liée aux matériaux (Analyse du Cycle de Vie — ACV).",
    vigilance:
      "Aucun permis de construire ne peut être accordé sans preuve du respect de la RE2020.",
  },

  // ── Sols & revêtements ──
  {
    id: "sol-s1s4",
    terme: "Sols S1 à S4",
    famille: "Sols & revêtements",
    definition:
      "Niveaux de finition d'une surface : S1 brute (carrelage scellé), S2 courante, S3 soignée (revêtement collé/mince), S4 très soignée (peinture de sol, résine).",
  },
  {
    id: "upec",
    terme: "Classement UPEC",
    famille: "Sols & revêtements",
    definition:
      "La carte d'identité de résistance d'un sol, notée de 1 à 4 : U (Usure/piétinement), P (Poinçonnement/poids), E (Eau), C (Chimie). Plus le chiffre est haut, plus c'est résistant.",
  },
  {
    id: "cov",
    terme: "Classement COV (A+ à C)",
    sigle: "Composés Organiques Volatils",
    famille: "Sols & revêtements",
    definition:
      "Le « Nutri-Score » d'une peinture : indique les polluants rejetés dans l'air. A+ = très propre, C = fortes émissions (de moins en moins tolérées en intérieur).",
  },
  {
    id: "aev",
    terme: "Classement AEV (Air-Eau-Vent)",
    famille: "Sols & revêtements",
    definition:
      "La « note météo » d'une fenêtre : capacité à bloquer l'air, stopper la pluie, résister aux rafales. Plus le chiffre est grand, plus la fenêtre protège (ex : A3-E5-VA3).",
  },

  // ── Finitions béton ──
  {
    id: "parement-beton",
    terme: "Parements de Béton (Types 1 à 4)",
    famille: "Finitions béton",
    definition:
      "Niveaux d'exigence pour la surface visible du béton décoffré (NF DTU 21). Type 4 = soigné (lisse, sans bulles, béton apparent design) ; Type 1 = élémentaire (parties cachées, fondations).",
  },
  {
    id: "pet-beton",
    terme: "Notation P.E.T. (Béton)",
    famille: "Finitions béton",
    definition:
      "Contrôle qualité de la « peau » du béton : P (Planéité/régularité), E (Écorce/bullage, les petites bulles d'air), T (Teinte/homogénéité de couleur).",
  },
  {
    id: "bandes-pontage",
    terme: "Bandes de pontage",
    famille: "Finitions béton",
    definition:
      "Bandes en fibre ou treillis collées sur les jonctions entre deux éléments pour absorber les micro-mouvements et éviter les fissures visibles.",
  },

  // ── Terrassement & géotechnique ──
  {
    id: "essais-plateforme",
    terme: "Essais de plateforme",
    famille: "Terrassement & géotechnique",
    definition:
      "Tests de résistance et de compactage du sol terrassé pour vérifier qu'il supportera les futurs bâtiments sans s'enfoncer.",
  },
  {
    id: "essai-proctor",
    terme: "Essai Proctor",
    famille: "Terrassement & géotechnique",
    definition:
      "Essai de labo qui détermine la quantité d'eau idéale à mélanger au sol pour obtenir le compactage le plus dense et solide.",
  },
  {
    id: "essai-plaque",
    terme: "Essai à la plaque",
    famille: "Terrassement & géotechnique",
    definition:
      "Test de terrain avec une plaque métallique chargée (sous camion lesté) qui mesure l'enfoncement du sol pour vérifier sa portance.",
  },
  {
    id: "ev1-ev2",
    terme: "EV1 / EV2 et ratio EV2/EV1",
    famille: "Terrassement & géotechnique",
    definition:
      "EV1 = déformation au 1er chargement, EV2 = au 2nd. Leur ratio mesure le compactage : plus il est proche de 1, mieux c'est. Doit rester < 2,0.",
  },
  {
    id: "k-westergaard",
    terme: "K Westergaard",
    famille: "Terrassement & géotechnique",
    definition:
      "Coefficient de réaction du sol indiquant la raideur de la plateforme pour les futurs dallages (> 5 bars/cm = sol assez ferme).",
  },
  {
    id: "purge",
    terme: "Purge",
    famille: "Terrassement & géotechnique",
    definition:
      "Enlever un sol impropre ou instable, puis le remplacer par un matériau sain compacté.",
  },
  {
    id: "gnt",
    terme: "GNT",
    sigle: "Grave Non Traitée",
    famille: "Terrassement & géotechnique",
    definition:
      "Mélange de granulats utilisé en remblai, couche de forme, fondation de voirie ou plateforme.",
  },
  {
    id: "missions-geo",
    terme: "Missions Géotechniques (G1 à G5)",
    famille: "Terrassement & géotechnique",
    definition:
      "Étapes de l'étude de sol : G1 préalable, G2 conception, G3 exécution (entreprise), G4 supervision (MOA/MOE), G5 diagnostic (en cas de sinistre : fissure, glissement…).",
  },
  {
    id: "portance-pf",
    terme: "Classes de Portance (PF1 à PF4)",
    famille: "Terrassement & géotechnique",
    definition:
      "Classification de la solidité de la plateforme selon la valeur EV2 (norme NF P 11-300 / GTR) : PF1 médiocre (20-50 MPa), PF2 correct (50-80 MPa, standard parkings et dallages), PF3 bon (80-120 MPa, trafic lourd), PF4 excellent (>120 MPa, autoroutes ou TGV).",
    aQuoiCaSert:
      "Le laboratoire terrassement qualifie le sol avant coulage : un PF1 interdit le dallage direct — il faut traiter le sol (chaux, ciment) ou surépaissir.",
    vigilance:
      "Quelle que soit la classe PF, le ratio EV2/EV1 doit rester < 2,0. Un sol dur mais mal compacté sera refusé.",
  },

  // ── Eurocodes & structure ──
  {
    id: "els",
    terme: "ELS",
    sigle: "État Limite de Service",
    famille: "Eurocodes & structure",
    definition:
      "Calcul correspondant à l'usage normal : vérifie que la structure ne se déforme pas trop et ne fissure pas de façon gênante.",
  },
  {
    id: "elu",
    terme: "ELU",
    sigle: "État Limite Ultime",
    famille: "Eurocodes & structure",
    definition:
      "Calcul extrême : vérifie que la structure ne s'effondre pas sous des efforts maximaux.",
  },
  {
    id: "eurocodes",
    terme: "Eurocodes (0 à 9)",
    famille: "Eurocodes & structure",
    definition:
      "Normes européennes harmonisées de conception et calcul des structures (bâtiment et génie civil). EC0 = bases de calcul, EC1 = actions (poids, neige, vent, séisme), EC2 béton, EC3 acier, EC5 bois, EC6 maçonnerie, EC7 géotechnique, EC8 parasismique. Les parties 1-2 traitent la résistance au feu (calcul REI).",
    aQuoiCaSert:
      "Les Eurocodes disent si la structure tient — travail du bureau d'études. Les DTU disent comment bien construire sur chantier — travail de l'entreprise.",
    exemple:
      "Dimensionner une poutre acier = EC3 ; poser un enduit monocouche = DTU 26.1.",
  },
  {
    id: "annexe-nationale",
    terme: "Annexe Nationale (AN)",
    famille: "Eurocodes & structure",
    definition:
      "Adapte les Eurocodes européens aux particularités de chaque pays (ex : coefficients plus stricts pour vents cycloniques et séismes en Outre-Mer).",
  },
  {
    id: "actions-gq",
    terme: "Actions permanentes (G) et variables (Q)",
    famille: "Eurocodes & structure",
    definition:
      "G = forces constantes (poids de la structure : dalles, murs, toitures). Q = forces qui changent (habitants, meubles, vent, neige, eau).",
  },
  {
    id: "rei",
    terme: "REI (Résistance au feu)",
    famille: "Eurocodes & structure",
    definition:
      "Tenue au feu d'un élément de construction (mur, plancher, poutre) — norme EN 13501-2. R = résistance mécanique (ça porte encore), E = étanchéité aux flammes et gaz chauds, I = isolation thermique (la face opposée ne chauffe pas). REI 60 = l'élément reste porteur, étanche et isolant 60 minutes. Calcul au feu via les Eurocodes partie 1-2 (EC2 pour le béton, EC3 pour l'acier…).",
    aQuoiCaSert:
      "Le REI dit combien de temps l'ouvrage tient pendant l'incendie — distinct de l'Euroclasse qui qualifie le comportement au feu d'un matériau seul.",
    exemple:
      "Plancher REI 60 exigé entre deux niveaux d'un ERP — le lot GO justifie la durée, pas seulement la nature du béton.",
    vigilance:
      "Ne pas confondre avec la réaction au feu (Euroclasses A1 à F) : un matériau A1 peut être exigé dans un ouvrage qui doit tenir REI 120.",
  },

  // ── Béton & aciers ──
  {
    id: "beton-classe",
    terme: "Béton C25/30 et C30/37",
    famille: "Béton & aciers",
    definition:
      "Classes de résistance du béton (MPa sur cylindre/cube). C25/30 = standard (parties courantes/enterrées) ; C30/37 = plus performant (extérieurs exposés).",
  },
  {
    id: "classes-exposition",
    terme: "Classes d'exposition (XC2, XC3, XS1)",
    famille: "Béton & aciers",
    definition:
      "Environnement auquel le béton est exposé : XC2 humide/enterré, XC3 humidité modérée, XS1 ambiance saline (air marin sans contact direct).",
  },
  {
    id: "acier-e235",
    terme: "Acier doux E235",
    famille: "Béton & aciers",
    definition:
      "Acier lisse, souple et malléable, pour pièces simples : épingles, fils d'attache, ferronnerie légère.",
  },
  {
    id: "acier-ha-e500",
    terme: "Acier HA E500",
    famille: "Béton & aciers",
    definition:
      "Acier à haute adhérence (barres crantées) pour le béton armé. E500 = résistance plus élevée que l'acier doux.",
  },
  {
    id: "bloc-b40",
    terme: "Bloc B40",
    famille: "Béton & aciers",
    definition:
      "Classe de résistance d'un bloc béton : doit supporter une pression verticale minimale de 40 bars.",
  },

  // ── Réseaux & lots techniques ──
  {
    id: "cvc",
    terme: "CVC",
    sigle: "Chauffage, Ventilation et Climatisation",
    famille: "Réseaux & lots techniques",
    definition: "Le lot technique qui regroupe le chauffage, la ventilation et la climatisation.",
  },
  {
    id: "cfo-cfa",
    terme: "CFO / CFA",
    sigle: "Courant Fort / Courant Faible",
    famille: "Réseaux & lots techniques",
    definition:
      "CFO = électricité de puissance (alimentation, éclairage, prises). CFA = réseaux de communication (télécoms, informatique, alarme, contrôle d'accès).",
  },
  {
    id: "aep",
    terme: "AEP",
    sigle: "Adduction en Eau Potable",
    famille: "Réseaux & lots techniques",
    definition: "Le réseau d'alimentation en eau potable.",
  },
  {
    id: "eu-ep",
    terme: "EU / EP",
    sigle: "Eaux Usées / Eaux Pluviales",
    famille: "Réseaux & lots techniques",
    definition:
      "EU = évacuation des eaux des sanitaires/cuisines/SdB. EP = évacuation des eaux de pluie.",
  },
  {
    id: "devoiement",
    terme: "Dévoiement de réseaux",
    famille: "Réseaux & lots techniques",
    definition:
      "Modifier l'itinéraire de canalisations/câbles existants (eau, élec, gaz, télécoms) pour les sortir de l'emprise du projet et libérer le terrain.",
  },
  {
    id: "vigik",
    terme: "VIGIK+",
    famille: "Réseaux & lots techniques",
    definition:
      "Système de contrôle d'accès (groupe La Poste) qui permet aux prestataires extérieurs (facteurs, livreurs…) d'entrer dans les parties communes. Remplace l'ancien VIGIK (fin au 1er janvier 2030).",
  },
  {
    id: "etudes-thermiques",
    terme: "Études Thermiques",
    famille: "Réseaux & lots techniques",
    definition:
      "Document (basé RE2020) attestant la performance énergétique du bâtiment (Bbio, Cep…). Dicte le choix du chauffage, de la VMC et impose une étanchéité à l'air stricte.",
  },

  // ── Réception & garanties ──
  {
    id: "reception",
    terme: "Réception",
    famille: "Réception & garanties",
    definition:
      "Étape officielle où le maître d'ouvrage accepte les travaux, avec ou sans réserves. Elle déclenche les garanties et la période de parfait achèvement.",
  },
  {
    id: "reserves",
    terme: "Réserves",
    famille: "Réception & garanties",
    definition:
      "Défauts ou travaux restant à corriger au moment de la réception. L'entreprise doit les « lever » dans les délais demandés.",
  },
  {
    id: "gpa",
    terme: "GPA",
    sigle: "Garantie de Parfait Achèvement",
    famille: "Réception & garanties",
    definition:
      "Obligation légale de réparer gratuitement tous les défauts qui apparaissent pendant 1 an après la fin des travaux. Implique un SAV réactif (organisation, délais d'intervention).",
  },
  {
    id: "rfct",
    terme: "RFCT",
    sigle: "Rapport Final de Contrôle Technique",
    famille: "Réception & garanties",
    definition:
      "Document final délivré par le bureau de contrôle une fois toutes les réserves techniques levées.",
    aQuoiCaSert:
      "Sans RFCT (et sans essais COPREC conformes), la réception et la livraison du bâtiment peuvent être bloquées.",
    vigilance:
      "Anticipez les demandes du contrôleur dès le RICT : les essais par lot doivent être fournis signés.",
  },
  {
    id: "doe",
    terme: "DOE",
    sigle: "Dossier des Ouvrages Exécutés",
    famille: "Réception & garanties",
    definition:
      "Dossier remis à la réception ou à la livraison : il décrit les ouvrages tels qu'exécutés (plans, notices, fiches techniques) pour la suite de vie du bâtiment.",
    aQuoiCaSert:
      "Maintenance, exploitation, assurance et travaux modificatifs — public : maître d'ouvrage, techniciens de maintenance, assureurs.",
    vigilance:
      "Cadre principal : CCAG Travaux (marchés publics). Ne pas confondre avec le DIUO : le DOE documente l'ouvrage réalisé ; le DIUO prévient les risques pour les futurs intervenants (Code du travail).",
  },
  {
    id: "plan-recollement",
    terme: "Plan de recollement",
    famille: "Réception & garanties",
    definition:
      "Document technique qui représente l'état exact des travaux réalisés à la fin du chantier. Contrairement au plan de projet initial (ce qui était prévu), il intègre toutes les modifications et ajustements effectués sur le terrain.",
    aQuoiCaSert:
      "Référence officielle pour l'exploitation et la maintenance du bâtiment ou de l'infrastructure — souvent intégré au DOE.",
    vigilance:
      "Ne pas confondre avec les Plans d'Exécution (EXE) : ceux-ci décrivent l'ouvrage avant pose ; le plan de recollement reflète l'ouvrage tel qu'il existe réellement après travaux.",
  },

  // ── Études & conception ──
  {
    id: "robot",
    terme: "Robot (Structural Analysis)",
    famille: "Études & conception",
    definition:
      "Logiciel de calcul de structures par éléments finis (Autodesk) : le simulateur virtuel du bureau d'études. Il applique des forces (poids, vent, neige, séismes) au modèle 3D pour vérifier la sécurité.",
  },
  {
    id: "bim",
    terme: "BIM",
    sigle: "Building Information Modeling",
    famille: "Études & conception",
    definition:
      "Méthode de travail basée sur une maquette 3D intelligente partagée. Permet aux logiciels (ex : Revit → Robot) de communiquer sans tout redessiner. Gain de temps et moins d'erreurs.",
  },
  {
    id: "bbio",
    terme: "Bbio (Besoin Bioclimatique)",
    famille: "Études & conception",
    definition:
      "Indicateur RE2020 qui mesure l'efficacité de l'isolation et du bâtiment face aux besoins de chauffage et d'éclairage.",
    aQuoiCaSert:
      "Plus le Bbio est bas, moins le bâtiment consommera d'énergie. Il impose des isolants performants et une orientation intelligente par rapport au soleil.",
    vigilance:
      "Le bureau d'études thermiques doit valider la note de calcul Bbio avant dépôt du permis.",
  },
  {
    id: "ic-construction",
    terme: "Ic Construction (Indice Carbone construction)",
    famille: "Études & conception",
    definition:
      "Indicateur RE2020 du poids CO₂ du chantier : chaque matériau posé est comptabilisé dans l'empreinte carbone de la construction.",
    aQuoiCaSert:
      "Pousse l'industrie vers béton bas-carbone et matériaux biosourcés (bois, chanvre). Validé grâce aux FDES fournies par les entreprises et fabricants.",
    vigilance:
      "Sans FDES à jour pour les produits posés, le calcul Ic Construction peut être rejeté.",
  },
  {
    id: "dh-re2020",
    terme: "DH (Degrés-Heures)",
    famille: "Études & conception",
    definition:
      "Compteur d'inconfort d'été de la RE2020 : le logiciel simule une canicule et compte les heures où le logement dépasse une température acceptable (souvent 26 à 28 °C).",
    aQuoiCaSert:
      "Garantir le confort estival sans climatisation généralisée.",
    vigilance:
      "Si le score DH est trop élevé, le projet est bloqué tant qu'on n'ajoute pas de protections solaires (volets, brise-soleil, casquettes).",
  },
  {
    id: "ic-energie",
    terme: "Ic énergie",
    famille: "Études & conception",
    definition:
      "Indicateur RE2020 de l'empreinte carbone liée aux consommations d'énergie du bâtiment sur 50 ans (chauffage, refroidissement, éclairage, ventilation, eau chaude sanitaire).",
    aQuoiCaSert:
      "Éliminer progressivement les énergies les plus polluantes (ex. chauffage exclusif au gaz) au profit des énergies renouvelables et décarbonées.",
    vigilance:
      "Comme l'Ic Construction, la RE2020 impose un seuil maximal à ne pas dépasser.",
  },

  // ── Suivi de chantier ──
  {
    id: "installation-chantier",
    terme: "Installation de chantier",
    famille: "Suivi de chantier",
    definition:
      "Phase de démarrage physique avant la première pose : sécurisation du terrain et mise en place de la logistique.",
    aQuoiCaSert:
      "Clôtures, panneaux réglementaires (permis, consignes sécurité), base-vie (vestiaires, réfectoire, sanitaires), raccordements provisoires eau/électricité, arrivée grue, bennes et échafaudages.",
  },
  {
    id: "reunion-chantier",
    terme: "Réunion de chantier (CR)",
    famille: "Suivi de chantier",
    definition:
      "Rendez-vous hebdomadaire sur le terrain entre l'entreprise, l'architecte (MOE) et parfois le client.",
    aQuoiCaSert:
      "Comparer la réalité du terrain au Programme d'Exécution et aux Plans EXE validés. L'architecte rédige le Compte-Rendu (CR) : tâches de la semaine suivante, corrections, retards.",
    vigilance:
      "Le CR fait foi chaque semaine — conservez vos copies et traitez les points ouverts avant la réunion suivante.",
  },
  {
    id: "avenant",
    terme: "Avenant",
    famille: "Suivi de chantier",
    definition:
      "Modification écrite du contrat (souvent un ajout d'argent) suite à un imprévu ou une demande du client en cours de chantier.",
    aQuoiCaSert:
      "Régularise un OS de travaux modificatifs quand le prix ou le périmètre change.",
    vigilance:
      "En marché privé promoteur : un accord verbal du conducteur de travaux ne vaut rien — l'avenant doit être signé par le Directeur de Programmes avant exécution.",
  },
  {
    id: "coprec",
    terme: "Essais COPREC",
    sigle: "COmmission pour la PRévention des Effets de la Corrosion",
    famille: "Suivi de chantier",
    definition:
      "Protocoles d'essais, vérifications et mesures réalisés par chaque entreprise de lot technique en fin de chantier (ventilation, chauffage, plomberie, électricité, désenfumage, acoustique…).",
    aQuoiCaSert:
      "Prouver que les équipements fonctionnent avant l'arrivée des utilisateurs. Chaque lot fait ses propres essais : pression réseaux plomberie, mise à la terre électricité, débits VMC (lié aux exigences RE2020), etc.",
    vigilance:
      "À fournir signés au bureau de contrôle. Sans ces rapports, il ne lèvera pas ses réserves et ne délivrera pas le RFCT — réception bloquée.",
    exemple:
      "Le contrôleur analyse vos grilles COPREC et vérifie par sondage sur site ; il ne refait pas tous les tests à votre place.",
  },

  // ── Marché privé (promoteur) ──
  {
    id: "vefa",
    terme: "VEFA",
    sigle: "Vente en l'État Futur d'Achèvement",
    famille: "Marché privé (promoteur)",
    definition:
      "La « vente sur plan » : un particulier achète un bien pas encore construit. Le promoteur travaille avec l'argent de ses acheteurs, d'où sa peur des sinistres.",
  },
  {
    id: "lettre-commande",
    terme: "Lettre de commande",
    famille: "Marché privé (promoteur)",
    definition:
      "En marché privé, remplace souvent l'OS : c'est la signature du contrat ou une lettre officielle (parfois un simple e-mail du directeur de programmes) qui lance le chantier.",
  },
  {
    id: "forfait-non-revisable",
    terme: "Prix ferme et non révisable",
    famille: "Marché privé (promoteur)",
    definition:
      "Les promoteurs imposent souvent un prix bloqué (« ferme, global, forfaitaire et non révisable »), en supprimant la révision de prix.",
    vigilance:
      "Point de négociation majeur avant de signer (≈ 80 % des marchés de promotion privée).",
  },
  {
    id: "garantie-paiement",
    terme: "Garantie de paiement",
    famille: "Marché privé (promoteur)",
    definition:
      "Sécurité légale (art. 1799-1 du Code civil) : le promoteur privé doit fournir une caution bancaire ou un crédit direct garantissant que vous serez payé, même en cas de faillite. À exiger avant de démarrer.",
  },
  {
    id: "pre-reception",
    terme: "Pré-réception",
    famille: "Marché privé (promoteur)",
    definition:
      "Avant la vraie réception, le promoteur fait une « chasse aux réserves » très stricte (pastilles partout) pour que le chantier soit parfait avant la visite des acheteurs.",
  },
  {
    id: "vigilance-soustraitance",
    terme: "Obligation de vigilance",
    famille: "Sous-traitance",
    definition:
      "Contrôle administratif obligatoire dès qu'un contrat de sous-traitance dépasse 5 000 € HT.",
    aQuoiCaSert:
      "Lutter contre le travail dissimulé : réclamer tous les 6 mois le Kbis, l'attestation de vigilance URSSAF, l'attestation de régularité fiscale et, le cas échéant, la liste nominative des salariés étrangers avec autorisations de travail.",
    vigilance:
      "En tant qu'entrepreneur principal, vous êtes responsable de la légalité de votre sous-traitant.",
  },
  {
    id: "agrement-st",
    terme: "Agrément du sous-traitant",
    famille: "Sous-traitance",
    definition:
      "Autorisation écrite du maître d'ouvrage (promoteur ou acheteur public) avant d'amener une autre entreprise sur le chantier.",
    aQuoiCaSert:
      "Formalise la demande via DC4 ou formulaire équivalent privé : identité du sous-traitant, nature des travaux, montant payé.",
    vigilance:
      "Faire travailler un sous-traitant non agréé est un délit passible d'une amende de 7 500 €.",
  },
  {
    id: "contrat-soustraitance",
    terme: "Contrat de sous-traitance",
    famille: "Sous-traitance",
    definition:
      "Contrat de droit privé signé entre l'entreprise principale et le sous-traitant.",
    aQuoiCaSert:
      "Fixe le prix (souvent forfaitaire), les délais sous peine de pénalités, les assurances et les obligations de sécurité.",
    vigilance:
      "Sans contrat écrit, vous êtes exposé en cas de litige sur le paiement ou la qualité.",
  },
  {
    id: "garantie-paiement-st",
    terme: "Garantie de paiement sous-traitant",
    famille: "Sous-traitance",
    definition:
      "Obligation légale (loi de 1975) de sécuriser le paiement de votre sous-traitant en marché privé.",
    aQuoiCaSert:
      "Vous devez lui fournir soit une caution bancaire (la banque garantit le paiement si vous faites faillite), soit une délégation de paiement (le promoteur le paie directement en déduisant votre facture).",
    vigilance:
      "À mettre en place avant le démarrage des travaux du sous-traitant.",
  },
  {
    id: "ppsps-soustraitant",
    terme: "PPSPS du sous-traitant",
    famille: "Sous-traitance",
    definition:
      "Plan Particulier de Sécurité rédigé par le sous-traitant pour ses propres ouvriers.",
    aQuoiCaSert:
      "Détaille comment il protège ses équipes des risques du chantier. Doit être transmis au coordonnateur SPS avant l'arrivée sur site.",
    vigilance:
      "Contrôlez aussi la carte BTP de chaque salarié du sous-traitant à l'entrée du chantier.",
  },

  // ── Divers techniques ──
  {
    id: "pmr",
    terme: "Accessibilité PMR",
    famille: "Divers techniques",
    definition:
      "Règles permettant aux personnes à mobilité réduite ou déficientes visuelles d'utiliser les bâtiments : pentes, largeurs, seuils, mains courantes, digicodes, guidage au sol, signalétique.",
  },
  {
    id: "pluie-majoree",
    terme: "Pluie majorée / contraintes DOM",
    famille: "Divers techniques",
    definition:
      "Dans certains dossiers (ex : La Réunion), les débits d'eaux pluviales sont majorés vs la métropole, ce qui influence le dimensionnement des réseaux EP, bassins et caniveaux.",
  },
  {
    id: "materiaux-agrees",
    terme: "Matériaux agréés par la MOE",
    famille: "Divers techniques",
    definition:
      "Matériaux dont la provenance ou la fiche technique doit être validée par le maître d'œuvre avant la mise en œuvre.",
  },

  // ── Fondations & Gros œuvre (CCTP Lot 01) ──
  ...LEXIQUE_FONDATIONS_GROS_OEUVRE,

  // ── Enduits de façade (CCTP Lot 02) ──
  ...LEXIQUE_ENDUITS_FACADE,

  // ── Famille 22 — Performance énergétique & contrôles ──
  ...LEXIQUE_PERF_ENERGETIQUE,

  // ── Lot 04 — Menuiseries extérieures (Millas Nord) ──
  ...LEXIQUE_MENUISERIES_EXTERIEURES,

  // ── Lot 03 — Charpente & couverture (Millas Nord) ──
  ...LEXIQUE_CHARPENTE_COUVERTURE,
];

// Helper : normalise (minuscule + sans accents) pour la recherche et le quiz
export const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/** Filtre les termes par recherche textuelle et familles sélectionnées */
export function filtrerTermes(
  termes: TermeLexique[],
  recherche: string,
  famillesActives: Famille[] | null,
): TermeLexique[] {
  const q = normalize(recherche.trim());
  return termes.filter((t) => {
    if (famillesActives && famillesActives.length > 0 && !famillesActives.includes(t.famille)) {
      return false;
    }
    if (!q) return true;
    const haystack = normalize(
      [t.terme, t.sigle ?? "", t.definition, t.aQuoiCaSert ?? "", t.exemple ?? "", t.vigilance ?? ""].join(
        " ",
      ),
    );
    return haystack.includes(q);
  });
}

/** Mélange un tableau (Fisher-Yates) */
export function melanger<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
