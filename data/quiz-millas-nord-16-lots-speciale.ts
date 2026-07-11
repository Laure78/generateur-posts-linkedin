/**
 * Quiz Millas Nord — 24 questions (fiche révision « Comprendre les 16 lots »).
 * Module 1 : clos-couvert (lots 1-4) · Module 2 : intérieur & fluides (5-11) · Module 3 : extérieurs & amiante (12-16).
 */

import type { QuizLotModule, QuizLotTheme } from './quiz-lot-special-shared';

export const QUIZ_MILLAS_NORD_16_LOTS_THEME: QuizLotTheme = {
  lotLabel: 'Débutant — Millas Nord (16 lots)',
  hubTitle: '3 quiz thématiques',
  hubDescription:
    'Les 16 lots du DCE 38 logements Créon — du clos-couvert au désamiantage, en 24 questions',
  accentClass: 'text-emerald-900',
  hubCardClass: 'bg-gradient-to-br from-emerald-50 to-teal-50',
  introHeaderClass: 'bg-gradient-to-br from-emerald-500 to-teal-600',
  buttonClass: 'bg-emerald-600 hover:bg-emerald-700',
  progressClass: 'bg-emerald-500',
  borderClass: 'border-emerald-200/80',
  icon: 'home',
  parcoursLabel: 'Parcours Millas Nord — les 16 lots',
  parcoursId: 'millas-nord-16-lots',
  scoreMessages: {
    excellent:
      'Vous maîtrisez la carte des 16 lots — prêt à lire un DCE complet sans piège.',
    good: 'Bon niveau transversal — refaites un module pour ancrer VRD, fluides ou amiante.',
    ok: 'Des bases solides — parcourez le parcours guidé puis réessayez.',
    low: 'Normal pour un premier passage : relisez la fiche lots 1 à 16 puis retentez.',
  },
};

export function getQuizMillasNord16LotsModule(id: string): QuizLotModule | undefined {
  return QUIZ_MILLAS_NORD_16_LOTS_MODULES.find((m) => m.id === id);
}

const CLOS_COUVERT_QUESTIONS: QuizLotModule['questions'] = [
  {
    id: 'mn16-01',
    chapitre: 'Transversal',
    contexte: 'Opération Millas Nord — 38 logements à Créon (33).',
    question:
      'Que signifie la règle « CCTP + plans = un tout » quand les deux documents ne disent pas la même chose ?',
    options: [
      {
        id: 'a',
        label:
          'Ce qui est dessiné mais pas écrit (et l\'inverse) est dû — la solution la plus contraignante s\'applique',
      },
      { id: 'b', label: 'Seul le CCTP fait foi — les plans sont indicatifs' },
      { id: 'c', label: 'Seuls les plans font foi — le CCTP est secondaire' },
      { id: 'd', label: 'L\'entreprise choisit la solution la moins chère' },
    ],
    bonneReponse: 'a',
    explication: 'Une lecture incomplète = des travaux non chiffrés à exécuter gratuitement.',
    termesLies: ['cctp-plans-solution-contraignante', 'cctp', 'dce'],
  },
  {
    id: 'mn16-02',
    chapitre: 'Lot 01 — Gros œuvre',
    question:
      'Sur Millas Nord, qui installe la base vie, la clôture et le panneau de chantier pour l\'ensemble des lots ?',
    options: [
      { id: 'a', label: 'L\'entreprise du lot 01 Gros œuvre (installation de chantier pour tout le monde)' },
      { id: 'b', label: 'Chaque lot installe sa propre base vie complète' },
      { id: 'c', label: 'Gironde Habitat directement' },
      { id: 'd', label: 'Le lot 16 Désamiantage uniquement' },
    ],
    bonneReponse: 'a',
    explication:
      'Le lot 01 ouvre le chantier : clôture, base vie, bureaux, panneau, bennes de tri, aire de lavage. Chaque autre lot organise ensuite SA propre installation complémentaire.',
    termesLies: ['installation-chantier', 'millas-nord-operation'],
  },
  {
    id: 'mn16-03',
    chapitre: 'Lot 01 — Fondations',
    contexte: 'Étude de sol Créon — sol chimiquement agressif.',
    question: 'Que signifie la classe d\'exposition XA2 pour les bétons enterrés ?',
    options: [
      {
        id: 'a',
        label: 'Eaux agressives → béton plus résistant (C35/45) avec hydrofuge de masse, selon l\'étude de sol',
      },
      { id: 'b', label: 'Gel modéré → fibres en surface uniquement' },
      { id: 'c', label: 'Aucun risque → béton C25/30 standard partout' },
      { id: 'd', label: 'Carbonatation → enrobage réduit à 1 cm' },
    ],
    bonneReponse: 'a',
    explication: 'XA = attaque chimique. Arase étanche à +15 cm + traitement anti-termites à Créon.',
    termesLies: ['classe-exposition-xa2', 'beton-classe'],
  },
  {
    id: 'mn16-04',
    chapitre: 'Lot 02 — Enduit',
    question:
      'Le façadier peut-il enduire à +2 °C ? Que risque-t-il sans réception écrite des supports ?',
    options: [
      {
        id: 'a',
        label:
          'Non (interdit sous +5 °C) — sans PV, les supports sont réputés acceptés et leurs défauts lui incombent',
      },
      { id: 'b', label: 'Oui si mortier rebattu — la réception orale suffit' },
      { id: 'c', label: 'Oui avec bâche — seul le lot 01 réceptionne' },
      { id: 'd', label: 'Non seulement au-dessus de +35 °C — réception facultative' },
    ],
    bonneReponse: 'a',
    explication: 'Météo : +5 à +30 °C. Mortier rebattu interdit (à la benne). Surfaces témoins avant généralisation.',
    termesLies: ['conditions-meteo-enduit', 'reception-supports-ecrite', 'enduit-monocouche'],
  },
  {
    id: 'mn16-05',
    chapitre: 'Lot 03 — Charpente',
    question:
      'Entraxe maxi des fermettes industrielles, et qui assure la stabilité horizontale ?',
    options: [
      {
        id: 'a',
        label:
          '60 cm maxi — stabilité dans les 2 sens due par le charpentier ; le gros œuvre ne reprend que les efforts verticaux',
      },
      { id: 'b', label: '80 cm — stabilité partagée à parts égales avec le gros œuvre' },
      { id: 'c', label: '40 cm — stabilité due uniquement au lot 01' },
      { id: 'd', label: '100 cm — aucune note de calcul exigée' },
    ],
    bonneReponse: 'a',
    explication: 'Fermettes en W, sapin traité classe 2, combles perdus — notes de calcul + plans EXE visés.',
    termesLies: ['entraxe-fermettes-60', 'stabilite-charpente-go'],
  },
  {
    id: 'mn16-06',
    chapitre: 'Lot 03 — Couverture',
    question: 'Parmi les variantes exigées du lot 03, laquelle est correcte ?',
    options: [
      {
        id: 'a',
        label:
          'Fermettes carports, fermettes celliers, et suppression du film sous-toiture sauf maison I (logement 36, PV)',
      },
      { id: 'b', label: 'Uniquement le changement de teinte des tuiles' },
      { id: 'c', label: 'Suppression de toutes les gouttières' },
      { id: 'd', label: 'Remplacement des fermettes par une dalle béton partout' },
    ],
    bonneReponse: 'a',
    explication: 'Lire les variantes avant de chiffrer — sinon risque de sous-évaluation.',
    termesLies: ['variantes-exigees-lot03', 'kit-photovoltaique-logement36'],
  },
  {
    id: 'mn16-07',
    chapitre: 'Lot 04 — Menuiseries',
    question: 'Pourquoi le menuisier doit-il relever les cotes sur place avant fabrication ?',
    options: [
      {
        id: 'a',
        label:
          'Les cotes CCTP / nomenclature sont indicatives — fabriquer sans relevé = menuiseries qui ne rentrent pas dans les baies',
      },
      { id: 'b', label: 'Parce que le gros œuvre ne laisse jamais de baies' },
      { id: 'c', label: 'Pour remplacer le calfeutrement 4 faces' },
      { id: 'd', label: 'Uniquement pour les volets battants alu' },
    ],
    bonneReponse: 'a',
    explication: 'PVC Uw ≈ 1,4, 30 dB, calfeutrement 4 faces + Compriband — l\'entreprise engage SES quantités.',
    termesLies: ['releve-cotes-menuiseries', 'nomenclature-indicative', 'uw-millas-14'],
  },
  {
    id: 'mn16-08',
    chapitre: 'Transversal',
    question:
      'Quels documents chaque lot doit-il préparer AVANT le démarrage (hors installation commune du lot 01) ?',
    options: [
      {
        id: 'a',
        label:
          'Son installation de chantier propre et son mode opératoire (transmis au SPS ; amiante notifié à l\'inspection du travail)',
      },
      { id: 'b', label: 'Uniquement le DOE final' },
      { id: 'c', label: 'Seulement les factures d\'acompte' },
      { id: 'd', label: 'Rien — le PPSPS du lot 01 couvre tout' },
    ],
    bonneReponse: 'a',
    explication:
      'Ces pièces conditionnent l\'autorisation de commencer et la sécurité — ce ne sont pas des formalités.',
    termesLies: ['installation-chantier', 'ppsps'],
  },
];

const INTERIEUR_FLUIDES_QUESTIONS: QuizLotModule['questions'] = [
  {
    id: 'mn16-09',
    chapitre: 'Lot 05 — Menuiseries int.',
    question: 'Pourquoi les portes de distribution sont-elles détalonnées de 15 mm en bas ?',
    options: [
      { id: 'a', label: 'Pour laisser circuler l\'air neuf vers les bouches d\'extraction de la VMC' },
      { id: 'b', label: 'Pour le passage des fauteuils roulants' },
      { id: 'c', label: 'Pour éviter le frottement sur le carrelage' },
      { id: 'd', label: 'Pour passer les câbles électriques' },
    ],
    bonneReponse: 'a',
    explication: 'Complète les entrées d\'air du lot 04. Réglages des portes APRÈS le peintre.',
    termesLies: ['detalonnage-vmc', 'vmc-hygroreglable'],
  },
  {
    id: 'mn16-10',
    chapitre: 'Lot 06 — Serrurerie',
    question: 'Hauteur réglementaire d\'un garde-corps et écartement max entre barreaux ?',
    options: [
      { id: 'a', label: '1,01 m en tout point — barreaux 10 cm max (NF P01-012/013), justifié par calcul' },
      { id: 'b', label: '0,90 m — barreaux 15 cm sans calcul' },
      { id: 'c', label: '1,20 m — barreaux horizontaux autorisés' },
      { id: 'd', label: '1,01 m — écartement libre' },
    ],
    bonneReponse: 'a',
    explication: 'Extérieur : galvanisation à chaud + thermolaquage QUALIMARINE (ambiance quasi-marine).',
    termesLies: ['garde-corps-nf-p01', 'thermolaquage-qualimarine'],
  },
  {
    id: 'mn16-11',
    chapitre: 'Lot 07 — Plâtrerie',
    question: 'Quel lot porte largement l\'étanchéité à l\'air RE2020 du logement ?',
    options: [
      {
        id: 'a',
        label: 'Le plâtrier (lot 07), avec le menuisier extérieur — membranes, adhésifs, trappes étanches',
      },
      { id: 'b', label: 'Uniquement le peintre (lot 11)' },
      { id: 'c', label: 'Le carreleur (lot 10) seul' },
      { id: 'd', label: 'Le lot VRD (lot 12) en fin de chantier' },
    ],
    bonneReponse: 'a',
    explication: 'Plaques hydrofuges obligatoires en pièces d\'eau — clé du test d\'infiltrométrie.',
    termesLies: ['etancheite-air-re2020', 'plaque-hydrofuge'],
  },
  {
    id: 'mn16-12',
    chapitre: 'Lot 08 — CVC',
    question: 'Quelle production de chauffage / ECS pour les maisons individuelles Millas Nord ?',
    options: [
      { id: 'a', label: 'PAC air/eau double service (chauffage + ECS) + radiateurs' },
      { id: 'b', label: 'Chaudière fioul individuelle uniquement' },
      { id: 'c', label: 'Chauffage urbain raccordé au lot 12' },
      { id: 'd', label: 'Poêles à bois dans chaque pièce' },
    ],
    bonneReponse: 'a',
    explication: 'Collectifs : CET (ballon thermodynamique) + chauffage électrique. VMC hygroréglable.',
    termesLies: ['pac-double-service', 'ballon-thermodynamique-cet'],
  },
  {
    id: 'mn16-13',
    chapitre: 'Lot 09 — Électricité',
    question: 'Que distingue-t-on sous le lot 09, et quelle attestation clôture souvent la conformité ?',
    options: [
      {
        id: 'a',
        label: 'CFO (énergie) + CFA (communication) — attestation Consuel (NF C 15-100)',
      },
      { id: 'b', label: 'Uniquement l\'éclairage public du lot 13' },
      { id: 'c', label: 'Seule la fibre optique sans tableau' },
      { id: 'd', label: 'Uniquement les bornes IRVE' },
    ],
    bonneReponse: 'a',
    explication: 'Linky, GTL, différentiels, terre, DAAF, BAES — l\'éclairage candélabres relève du lot 13.',
    termesLies: ['cfo-cfa', 'consuel'],
  },
  {
    id: 'mn16-14',
    chapitre: 'Lot 10 — Carrelage',
    question: 'À quoi sert le SPEC en pièces d\'eau ?',
    options: [
      {
        id: 'a',
        label:
          'Système de Protection à l\'Eau sous Carrelage — imperméabilisation appliquée AVANT le collage',
      },
      { id: 'b', label: 'Un joint décoratif de finition uniquement' },
      { id: 'c', label: 'Le classement UPEC du carreau' },
      { id: 'd', label: 'L\'isolant phonique sous chape' },
    ],
    bonneReponse: 'a',
    explication: 'Chape flottante sur résilient (ΔLw) + UPEC collé + joints de désolidarisation.',
    termesLies: ['spec-etancheite-carrelage', 'classement-upec', 'chape-flottante-resilient'],
  },
  {
    id: 'mn16-15',
    chapitre: 'Lot 11 — Peinture',
    question: 'Quelle est la protection n°1 du peintre avant d\'ouvrir les pots ?',
    options: [
      { id: 'a', label: 'La réception écrite des subjectiles (supports) — sinon il « achète » les défauts des autres' },
      { id: 'b', label: 'Le Consuel du lot 09' },
      { id: 'c', label: 'Le passage caméra du lot 12' },
      { id: 'd', label: 'La garantie de reprise du lot 15' },
    ],
    bonneReponse: 'a',
    explication: 'Signalétique + plans d\'évacuation ; variante exigée à chiffrer séparément.',
    termesLies: ['subjectile-peinture'],
  },
  {
    id: 'mn16-16',
    chapitre: 'Transversal',
    question: 'Dans quel ordre logique se placent les lots 05 (menuiseries int.) et 11 (peinture) pour les réglages de portes ?',
    options: [
      { id: 'a', label: 'Pose des blocs-portes → peinture → réglages finaux des portes APRÈS le peintre' },
      { id: 'b', label: 'Peinture d\'abord → pose des portes → plus aucun réglage' },
      { id: 'c', label: 'Réglages avant pose des huisseries' },
      { id: 'd', label: 'Le carreleur règle les portes' },
    ],
    bonneReponse: 'a',
    explication: 'Huisseries livrées à temps au plâtrier / GO — sinon le planning se décale.',
    termesLies: ['bloc-porte-millas'],
  },
];

const EXTERIEURS_AMIANTE_QUESTIONS: QuizLotModule['questions'] = [
  {
    id: 'mn16-17',
    chapitre: 'Lot 12 — VRD',
    question: 'Que signifie un réseau d\'assainissement séparatif ?',
    options: [
      { id: 'a', label: 'EU (eaux usées) et EP (eaux pluviales) dans DEUX réseaux distincts' },
      { id: 'b', label: 'Un seul tuyau pour toutes les eaux' },
      { id: 'c', label: 'Uniquement les eaux vannes vers le lot 08' },
      { id: 'd', label: 'Un réseau réservé aux eaux de chantier' },
    ],
    bonneReponse: 'a',
    explication: 'Essais d\'étanchéité + passage caméra avant remblai. Chaussée : fondation → base → BBSG.',
    termesLies: ['reseau-separatif-eu-ep', 'passage-camera-assainissement'],
  },
  {
    id: 'mn16-18',
    chapitre: 'Lot 13 — Réseaux secs',
    question: 'Pourquoi poser fourreaux et chambres AVANT les enrobés ?',
    options: [
      {
        id: 'a',
        label: 'Oublier un fourreau avant enrobés oblige à rouvrir la voirie — génie civil d\'abord',
      },
      { id: 'b', label: 'Parce que l\'enrobé fixe les câbles sans fourreau' },
      { id: 'c', label: 'Les fourreaux se posent après le lot 15 uniquement' },
      { id: 'd', label: 'Ce n\'est pas obligatoire sur Millas Nord' },
    ],
    bonneReponse: 'a',
    explication: 'BT Enedis, télécom/fibre, candélabres LED, attentes IRVE, grillage avertisseur + récolement.',
    termesLies: ['fourreau-grillage-avertisseur', 'irve'],
  },
  {
    id: 'mn16-19',
    chapitre: 'Lot 14 — AEP / DECI',
    question: 'Quelle réserve de défense incendie est prévue sur le projet (DECI) ?',
    options: [
      { id: 'a', label: 'Bâche souple de 120 m³ sur assise de sable, circulation libre autour (ou poteau incendie)' },
      { id: 'b', label: 'Un seau d\'eau par logement' },
      { id: 'c', label: 'Uniquement le réseau EP du lot 12' },
      { id: 'd', label: 'Aucune réserve — les pompiers amènent l\'eau' },
    ],
    bonneReponse: 'a',
    explication: 'AEP : essais de pression + désinfection avant mise en service. Fourreaux arrosage en attente pour le lot 15.',
    termesLies: ['aep-deci'],
  },
  {
    id: 'mn16-20',
    chapitre: 'Lot 15 — Paysage',
    question: 'Qu\'est-ce que la garantie de reprise des végétaux ?',
    options: [
      {
        id: 'a',
        label:
          'L\'entreprise entretient (parachèvement / confortement) jusqu\'à la reprise — plantation en saison favorable',
      },
      { id: 'b', label: 'Une garantie décennale sur les arbres uniquement' },
      { id: 'c', label: 'Le MOA arrose pendant 10 ans' },
      { id: 'd', label: 'Aucun entretien après plantation' },
    ],
    bonneReponse: 'a',
    explication: 'Terre végétale du lot 12 mise de côté ; arrosage auto raccordé aux attentes du lot 14.',
    termesLies: ['garantie-reprise-paysage'],
  },
  {
    id: 'mn16-21',
    chapitre: 'Lot 16 — Amiante',
    question: 'Pourquoi le lot 16 (démolition-désamiantage) intervient-il en réalité au début ?',
    options: [
      {
        id: 'a',
        label: 'On démolit et dépollue AVANT de construire du neuf — repérage amiante/plomb obligatoire',
      },
      { id: 'b', label: 'Parce que le numéro 16 est après le paysage' },
      { id: 'c', label: 'Uniquement après la réception des logements' },
      { id: 'd', label: 'Seulement si le lot 01 le demande en fin de chantier' },
    ],
    bonneReponse: 'a',
    explication: 'Plan de retrait, notification inspection du travail, zone confinée, contrôles libératoires, BSDA.',
    termesLies: ['plan-retrait-amiante', 'bsda-amiante', 'controle-liberatoire-amiante'],
  },
  {
    id: 'mn16-22',
    chapitre: 'Lot 16 — Amiante',
    question: 'Quelle installation de chantier est spécifique au désamiantage ?',
    options: [
      {
        id: 'a',
        label: 'Zone confinée, sas de décontamination, extracteurs et mise en dépression',
      },
      { id: 'b', label: 'Uniquement la base vie du lot 01 sans confinement' },
      { id: 'c', label: 'Des échafaudages de façade du lot 02' },
      { id: 'd', label: 'Des candélabres du lot 13' },
    ],
    bonneReponse: 'a',
    explication: 'Mode opératoire transmis au SPS et notifié à l\'inspection du travail avant démarrage.',
    termesLies: ['plan-retrait-amiante', 'installation-chantier'],
  },
  {
    id: 'mn16-23',
    chapitre: 'Transversal',
    question: 'Qui est le maître d\'ouvrage (MOA) de l\'opération Millas Nord ?',
    options: [
      { id: 'a', label: 'Gironde Habitat — le client qui commande et paie l\'ouvrage' },
      { id: 'b', label: 'DEKRA — le bureau de contrôle' },
      { id: 'c', label: 'L\'entreprise du lot 01' },
      { id: 'd', label: 'Le BET structure' },
    ],
    bonneReponse: 'a',
    explication: 'MOA commande · MOE conçoit · entreprise exécute · contrôle / SPS vérifient · réception + DOE.',
    termesLies: ['millas-nord-operation', 'moa', 'moe'],
  },
  {
    id: 'mn16-24',
    chapitre: 'Transversal',
    question: 'Quelle découpe mentale des lots est correcte sur Millas Nord ?',
    options: [
      {
        id: 'a',
        label:
          'Lots 1-4 = hors d\'eau / hors d\'air ; lots 5-16 = aménagement intérieur, fluides, réseaux extérieurs et dépollution',
      },
      { id: 'b', label: 'Lots 1-8 = uniquement peinture' },
      { id: 'c', label: 'Lots 12-16 = uniquement gros œuvre' },
      { id: 'd', label: 'Tous les lots démarrent en même temps sans ordre' },
    ],
    bonneReponse: 'a',
    explication: 'Le lot 16 fait exception chronologique : dépollution en tête de chantier.',
    termesLies: ['second-oeuvre-millas', 'millas-nord-operation'],
  },
];

export const QUIZ_MILLAS_NORD_16_LOTS_MODULES: QuizLotModule[] = [
  {
    id: 'millas-nord-16-clos-couvert',
    numero: 1,
    titre: 'Clos-couvert',
    sousTitre: '8 questions · lots 1 à 4',
    duree: '5 min',
    description:
      'CCTP + plans, installation de chantier, fondations XA2, enduit, fermettes, variantes lot 03, menuiseries.',
    questions: CLOS_COUVERT_QUESTIONS,
  },
  {
    id: 'millas-nord-16-interieur-fluides',
    numero: 2,
    titre: 'Intérieur & fluides',
    sousTitre: '8 questions · lots 5 à 11',
    duree: '5 min',
    description:
      'Blocs-portes, garde-corps, plâtrerie RE2020, PAC, Consuel, SPEC, subjectiles peinture.',
    questions: INTERIEUR_FLUIDES_QUESTIONS,
  },
  {
    id: 'millas-nord-16-exterieurs-amiante',
    numero: 3,
    titre: 'Extérieurs & amiante',
    sousTitre: '8 questions · lots 12 à 16',
    duree: '5 min',
    description:
      'VRD séparatif, fourreaux avant enrobés, DECI 120 m³, garantie de reprise, désamiantage.',
    questions: EXTERIEURS_AMIANTE_QUESTIONS,
  },
];
