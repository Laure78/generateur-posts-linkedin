/**
 * Quiz Millas Nord — 16 questions (fiche révision débutant « Comprendre les 4 lots »).
 * Module 1 : l'essentiel (8) · Module 2 : approfondissement (8).
 */

import type { QuizLotModule, QuizLotTheme } from './quiz-lot-special-shared';

export const QUIZ_MILLAS_NORD_THEME: QuizLotTheme = {
  lotLabel: 'Débutant — Millas Nord (4 lots)',
  hubTitle: '2 quiz thématiques',
  hubDescription:
    'Gros œuvre, enduit, charpente et menuiseries — 16 questions sur le DCE 38 logements Créon',
  accentClass: 'text-indigo-900',
  hubCardClass: 'bg-gradient-to-br from-indigo-50 to-violet-50',
  introHeaderClass: 'bg-gradient-to-br from-indigo-500 to-violet-600',
  buttonClass: 'bg-indigo-600 hover:bg-indigo-700',
  progressClass: 'bg-indigo-500',
  borderClass: 'border-indigo-200/80',
  icon: 'home',
  parcoursLabel: 'Parcours Millas Nord — 4 lots',
  parcoursId: 'millas-nord',
  scoreMessages: {
    excellent:
      'Vous maîtrisez les 4 lots du projet — prêt à lire un DCE Millas Nord sans piège.',
    good: 'Bon niveau transversal — refaites le quiz pour ancrer les variantes et interfaces.',
    ok: 'Des bases solides — parcourez le parcours guidé puis réessayez.',
    low: 'Normal pour un premier passage : relisez la fiche révision puis retentez.',
  },
};

export function getQuizMillasNordModule(id: string): QuizLotModule | undefined {
  return QUIZ_MILLAS_NORD_MODULES.find((m) => m.id === id);
}

const ESSENTIEL_QUESTIONS: QuizLotModule['questions'] = [
  {
    id: 'mn01',
    chapitre: 'Lot 01 — Gros œuvre',
    contexte: 'Opération Millas Nord — 38 logements à Créon (33).',
    question:
      'Sur ce projet, qui installe la base vie, la clôture et le panneau de chantier pour l\'ensemble des lots ?',
    options: [
      { id: 'a', label: 'L\'entreprise du lot 01 Gros œuvre (installation de chantier pour tout le monde)' },
      { id: 'b', label: 'Le lot 00 Dispositions communes uniquement' },
      { id: 'c', label: 'Chaque lot installe sa propre base vie' },
      { id: 'd', label: 'Le maître d\'ouvrage Gironde Habitat directement' },
    ],
    bonneReponse: 'a',
    explication:
      'Le lot 01 ouvre le chantier : clôture, base vie, bureaux, panneau 3×4 m, bennes de tri, aire de lavage des roues.',
    termesLies: ['millas-nord-operation', 'installation-chantier'],
  },
  {
    id: 'mn02',
    chapitre: 'Lot 01 — Fondations',
    question: 'À quoi sert le béton de propreté (~5 cm) sous les semelles de fondation ?',
    options: [
      {
        id: 'a',
        label:
          'Éviter de couler le béton armé directement sur la terre — surface propre pour les aciers bien enrobés',
      },
      { id: 'b', label: 'Remplacer les armatures HA en fondation' },
      { id: 'c', label: 'Augmenter la résistance portante du sol médiocre' },
      { id: 'd', label: 'Servir d\'arase étanche contre les remontées d\'humidité' },
    ],
    bonneReponse: 'a',
    explication: 'Couche fine non structurelle — les semelles filantes ou isolées se coulent ensuite dessus.',
    termesLies: ['beton-proprete', 'semelle-filante'],
  },
  {
    id: 'mn03',
    chapitre: 'Lot 01 — Fondations',
    contexte: 'Étude de sol Créon — sol chimiquement agressif.',
    question: 'Que signifie la classe d\'exposition XA2 et quelle conséquence pour les bétons enterrés ?',
    options: [
      {
        id: 'a',
        label:
          'Eaux agressives pour le béton → béton plus résistant (C35/45) avec hydrofuge de masse, selon l\'étude de sol',
      },
      { id: 'b', label: 'Gel modéré → ajouter des fibres uniquement en surface' },
      { id: 'c', label: 'Aucun risque particulier → béton C25/30 standard partout' },
      { id: 'd', label: 'Carbonatation → enrobage réduit à 1 cm en fondation' },
    ],
    bonneReponse: 'a',
    explication: 'XA = attaque chimique. L\'étude de sol impose la formulation — pas une habitude de chantier.',
    termesLies: ['classe-exposition-xa2', 'beton-classe'],
  },
  {
    id: 'mn04',
    chapitre: 'Lot 02 — Enduit',
    question:
      'Le façadier peut-il appliquer l\'enduit monocouche à +2 °C ? Et que risque-t-il s\'il ne réceptionne pas les supports par écrit ?',
    options: [
      {
        id: 'a',
        label:
          'Non (interdit sous +5 °C) — sans PV de réception, les supports sont réputés acceptés et leurs défauts lui incombent',
      },
      { id: 'b', label: 'Oui si mortier rebattu — la réception orale suffit' },
      { id: 'c', label: 'Oui avec bâche — seul le lot 01 réceptionne les supports' },
      { id: 'd', label: 'Non, mais seulement au-dessus de +35 °C — la réception est facultative' },
    ],
    bonneReponse: 'a',
    explication:
      'Météo : +5 à +30 °C, pas de pluie ni support gelé. Réception écrite = protection juridique n°1 du façadier.',
    termesLies: ['conditions-meteo-enduit', 'reception-supports-ecrite', 'enduit-monocouche'],
  },
  {
    id: 'mn05',
    chapitre: 'Lot 03 — Charpente',
    question:
      'Quel est l\'entraxe maximum des fermettes industrielles, et qui assure la stabilité horizontale de la charpente ?',
    options: [
      {
        id: 'a',
        label: '60 cm maxi — stabilité dans les 2 sens due par le charpentier ; le gros œuvre ne reprend que les efforts verticaux',
      },
      { id: 'b', label: '80 cm — stabilité due par le gros œuvre et le charpentier à parts égales' },
      { id: 'c', label: '60 cm — stabilité entièrement due par le lot 01' },
      { id: 'd', label: '40 cm — le BET structure assure la stabilité au vent' },
    ],
    bonneReponse: 'a',
    explication:
      'Fermettes en W, sapin classe 2, combles perdus. Plans EXE et notes de calcul visés par DEKRA.',
    termesLies: ['entraxe-fermettes-60', 'fermette-industrielle', 'stabilite-charpente-go'],
  },
  {
    id: 'mn06',
    chapitre: 'Lot 03 — Charpente',
    question: 'Cite les 3 variantes exigées du lot 03 sur Millas Nord :',
    options: [
      {
        id: 'a',
        label:
          'Fermettes industrielles pour carports, fermettes pour celliers, suppression du film sous-toiture partout sauf maison I (logement 36)',
      },
      { id: 'b', label: 'Charpente bois pour halls, tuiles mécaniques, suppression des chatières' },
      { id: 'c', label: 'Zinc sur toutes les noues, suppression des fermettes, film partout' },
      { id: 'd', label: 'Photovoltaïque sur tous les logements, fermettes tous les 40 cm' },
    ],
    bonneReponse: 'a',
    explication:
      'Variante film sous-toiture (15/02/2026) : Delta-Vent S supprimé sauf maison I pour les tuiles PV.',
    termesLies: ['variantes-exigees-lot03', 'kit-photovoltaique-logement36'],
  },
  {
    id: 'mn07',
    chapitre: 'Lot 04 — Menuiseries',
    question:
      'Pourquoi le menuisier doit-il relever les cotes sur place avant fabrication, alors que le CCTP donne des dimensions ?',
    options: [
      {
        id: 'a',
        label:
          'Les cotes CCTP et nomenclature sont indicatives — seules les cotes réelles garantissent que la menuiserie rentrera ; l\'entreprise s\'engage sur ses quantités',
      },
      { id: 'b', label: 'Le CCTP est obsolète dès la signature du marché' },
      { id: 'c', label: 'Uniquement pour les portes collectives en aluminium' },
      { id: 'd', label: 'Pour éviter le calfeutrement Compriband' },
    ],
    bonneReponse: 'a',
    explication: 'Plans et gabarits transmis au lot 01 en préparation, puis relevé terrain avant fabrication.',
    termesLies: ['nomenclature-indicative', 'releve-cotes-menuiseries'],
  },
  {
    id: 'mn08',
    chapitre: 'Transversal',
    question: 'Cite 3 tâches de ces CCTP qu\'une entreprise peut confier à BeWork :',
    options: [
      {
        id: 'a',
        label:
          'Synthèse du DCE, mémoire technique, PPSPS/DICT, PV de réception des supports, suivi visas plans EXE, situations de travaux, compilation DOE',
      },
      { id: 'b', label: 'Coulage du béton, pose des tuiles, application de l\'enduit' },
      { id: 'c', label: 'Réception physique des livraisons et contrôle EPI sur site' },
      { id: 'd', label: 'Visa technique des plans EXE à la place de DEKRA' },
    ],
    bonneReponse: 'a',
    explication: 'BeWork absorbe le bureau délocalisable — l\'équipe travaux garde la truelle.',
    termesLies: ['dce', 'ppsps', 'doe-six-exemplaires', 'plans-exe-entreprise'],
  },
];

const APPROFONDISSEMENT_QUESTIONS: QuizLotModule['questions'] = [
  {
    id: 'mn09',
    chapitre: 'Lot 01 — Terrassement',
    question: 'Sur Millas Nord, qui prépare la plateforme avant que le lot 01 creuse les fouilles ?',
    options: [
      { id: 'a', label: 'Le lot VRD (voirie et réseaux divers) — puis le lot 01 creuse semelles filantes et isolées' },
      { id: 'b', label: 'Le lot 01 seul, du terrassement aux fondations' },
      { id: 'c', label: 'Le géomètre agréé avec le lot enduit' },
      { id: 'd', label: 'Gironde Habitat avant consultation' },
    ],
    bonneReponse: 'a',
    explication: 'VRD = plateforme · GO = fouilles rigoles/trous + évacuation terres excédentaires.',
    termesLies: ['terrassier-vrd-raccordement', 'semelle-filante', 'semelle-isolee'],
  },
  {
    id: 'mn10',
    chapitre: 'Lot 01 — Réseaux',
    question: 'Quels contrôles sont exigés sur les réseaux d\'assainissement sous dalle avant coulage ?',
    options: [
      {
        id: 'a',
        label: 'Essais d\'étanchéité + passage caméra — regards à chaque changement de direction (EU, EV, EP séparées)',
      },
      { id: 'b', label: 'Simple visualisation à l\'œil nu par le conducteur de travaux' },
      { id: 'c', label: 'Aucun — les réseaux sont contrôlés après réception du bâtiment' },
      { id: 'd', label: 'Uniquement le test Q4Pa-surf sur les canalisations' },
    ],
    bonneReponse: 'a',
    explication: 'Réseaux PVC sous plancher bas — fuite invisible si on coule sans inspection.',
    termesLies: ['passage-camera-assainissement'],
  },
  {
    id: 'mn11',
    chapitre: 'Lot 01 — Béton armé',
    question: 'Quels enrobages minimum des aciers sont exigés sur ce projet ?',
    options: [
      { id: 'a', label: '3 cm minimum en élévation, 5 cm en fondations' },
      { id: 'b', label: '1 cm partout si hydrofuge de masse' },
      { id: 'c', label: '5 cm en élévation, 3 cm en fondation' },
      { id: 'd', label: '10 cm en fondation, 5 cm en élévation' },
    ],
    bonneReponse: 'a',
    explication: 'Épaisseur de béton qui protège l\'acier de la rouille — cales d\'enrobage obligatoires.',
    termesLies: ['enrobage', 'cales-enrobage'],
  },
  {
    id: 'mn12',
    chapitre: 'Lot 02 — Enduit',
    question: 'L\'enduit monocouche WEBER PRAL F (ou équivalent) du CCTP doit être :',
    options: [
      {
        id: 'a',
        label: 'Teinté dans la masse, certifié CSTB, catégorie OC2 ou OC3 selon le support (DTU 26.1)',
      },
      { id: 'b', label: 'Peint après séchage — certification facultative' },
      { id: 'c', label: 'Toujours OC1 quel que soit le support' },
      { id: 'd', label: 'Appliqué en une seule passe épaisse sans surface témoin' },
    ],
    bonneReponse: 'a',
    explication: 'Finition gratté fin en parties courantes, taloché fin en soubassements et modénatures.',
    termesLies: ['enduit-monocouche', 'dtu-26-1', 'certification-enduit-cstb', 'modenature'],
  },
  {
    id: 'mn13',
    chapitre: 'Lot 03 — Couverture',
    question: 'Pour les tuiles romanes Canal S (EDILIANS), quelle règle de fixation mécanique s\'applique ?',
    options: [
      { id: 'a', label: '1 tuile sur 5 fixée mécaniquement + tuiles à douille, chatières, faîtières à sec avec closoir' },
      { id: 'b', label: 'Aucune fixation — pose libre par gravité uniquement' },
      { id: 'c', label: 'Toutes les tuiles vissées sur liteaux métalliques' },
      { id: 'd', label: '1 tuile sur 10 — chatières interdites en combles perdus' },
    ],
    bonneReponse: 'a',
    explication: 'Couverture + zinguerie alu (noues zinc, dauphins si passage piéton).',
    termesLies: ['tuile-romane-canal-s', 'chatieres-ventilation-combles', 'dauphin-ep'],
  },
  {
    id: 'mn14',
    chapitre: 'Lot 04 — Menuiseries',
    question: 'Quelles performances menuiseries sont impératives sur les logements Millas Nord ?',
    options: [
      {
        id: 'a',
        label: 'PVC blanc, Uw ≈ 1,4, double vitrage faiblement émissif, crémone 3 points, affaiblissement acoustique façade 30 dB',
      },
      { id: 'b', label: 'Bois exotique, Uw = 3,0, simple vitrage' },
      { id: 'c', label: 'Alu sur tous les logements, sans exigence acoustique' },
      { id: 'd', label: 'Uw indicatif — seul le prix compte au DCE' },
    ],
    bonneReponse: 'a',
    explication: 'Avis techniques prouvant Uw/Ujn + PV essais acoustiques 30 dB + certificats CEKAL.',
    termesLies: ['uw-millas-14', 'uw-menuiserie', 'double-vitrage-faible-emissivite', 'cremone-3-points'],
  },
  {
    id: 'mn15',
    chapitre: 'Acteurs',
    question: 'Qui est le maître d\'ouvrage (MOA) de l\'opération Millas Nord ?',
    options: [
      { id: 'a', label: 'Gironde Habitat — le client qui commande et paie l\'ouvrage' },
      { id: 'b', label: 'DEKRA — le bureau de contrôle technique' },
      { id: 'c', label: 'L\'entreprise du lot 01 Gros œuvre' },
      { id: 'd', label: 'Le BET structure qui calcule les semelles' },
    ],
    bonneReponse: 'a',
    explication: 'MOA commande · MOE conçoit et dirige · entreprise exécute selon CCTP + plans.',
    termesLies: ['millas-nord-operation', 'moa', 'moe', 'bet'],
  },
  {
    id: 'mn16',
    chapitre: 'Documents',
    question: 'Que se passe-t-il si le CCTP et les plans de l\'architecte ne disent pas la même chose ?',
    options: [
      {
        id: 'a',
        label:
          'CCTP + plans = un tout — ce qui est dessiné mais pas écrit (et inversement) est dû ; la solution la plus contraignante s\'applique',
      },
      { id: 'b', label: 'Seul le CCTP fait foi — les plans sont indicatifs' },
      { id: 'c', label: 'Seuls les plans font foi — le CCTP est indicatif' },
      { id: 'd', label: 'L\'entreprise choisit la solution la moins chère' },
    ],
    bonneReponse: 'a',
    explication: 'Lecture incomplète = travaux non chiffrés à exécuter gratuitement.',
    termesLies: ['cctp-plans-solution-contraignante', 'cctp', 'dce'],
  },
];

export const QUIZ_MILLAS_NORD_MODULES: QuizLotModule[] = [
  {
    id: 'millas-nord-essentiel',
    numero: 1,
    titre: 'L\'essentiel',
    sousTitre: '8 questions · 4 lots, interfaces et pièges',
    duree: '5 min',
    description:
      'Installation de chantier, fondations XA2, enduit et météo, fermettes, variantes lot 03, menuiseries et délégation BeWork — aligné sur la fiche révision.',
    questions: ESSENTIEL_QUESTIONS,
  },
  {
    id: 'millas-nord-approfondi',
    numero: 2,
    titre: 'Approfondissement',
    sousTitre: '8 questions · réseaux, performances, acteurs',
    duree: '5 min',
    description:
      'VRD, assainissement caméra, enrobage, enduit CSTB, tuiles Canal S, performances menuiseries, MOA et règle CCTP + plans.',
    questions: APPROFONDISSEMENT_QUESTIONS,
  },
];
