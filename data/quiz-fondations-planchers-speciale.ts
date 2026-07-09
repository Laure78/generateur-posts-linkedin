/**
 * Quiz Fondations & planchers — 16 questions (fiche révision débutant).
 * Module 1 : l'essentiel (8) · Module 2 : approfondissement (8).
 */

import type { QuizLotModule, QuizLotTheme } from './quiz-lot-special-shared';

export const QUIZ_FONDATIONS_PLANCHERS_THEME: QuizLotTheme = {
  lotLabel: 'Débutant — Fondations & planchers',
  hubTitle: '2 quiz thématiques',
  hubDescription:
    'Étude de sol, semelles, armatures, planchers hourdis et dalles — 16 questions pour vérifier vos acquis',
  accentClass: 'text-teal-900',
  hubCardClass: 'bg-gradient-to-br from-teal-50 to-cyan-50',
  introHeaderClass: 'bg-gradient-to-br from-teal-500 to-cyan-600',
  buttonClass: 'bg-teal-600 hover:bg-teal-700',
  progressClass: 'bg-teal-500',
  borderClass: 'border-teal-200/80',
  icon: 'hard-hat',
  parcoursLabel: 'Parcours Fondations & planchers',
  parcoursId: 'fondations-planchers',
  scoreMessages: {
    excellent: 'Solide sur fondations et planchers — vous maîtrisez l\'essentiel du gros œuvre porteur.',
    good: 'Bon niveau — refaites le quiz pour ancrer les derniers points.',
    ok: 'Des bases — parcourez le parcours guidé puis réessayez.',
    low: 'Normal pour un premier passage : relisez la fiche révision puis retentez.',
  },
};

export function getQuizFondationsPlanchersModule(id: string): QuizLotModule | undefined {
  return QUIZ_FONDATIONS_PLANCHERS_MODULES.find((m) => m.id === id);
}

const ESSENTIEL_QUESTIONS: QuizLotModule['questions'] = [
      {
        id: 'fp01',
        chapitre: 'Fondations',
        question: 'Quel document décide du type de fondation d\'un bâtiment ?',
        options: [
          { id: 'a', label: 'L\'étude de sol (géotechnique) — jamais une habitude ou une intuition' },
          { id: 'b', label: 'Le plan de masse du permis de construire seul' },
          { id: 'c', label: 'La fiche technique des menuiseries PVC' },
          { id: 'd', label: 'Le carnet de chantier du lot peinture' },
        ],
        bonneReponse: 'a',
        explication: 'La question est toujours : à quelle profondeur se trouve le sol assez dur pour porter ?',
        termesLies: ['etude-geotechnique', 'etude-sol-g2', 'bon-sol'],
      },
      {
        id: 'fp02',
        chapitre: 'Fondations',
        question: 'Cite les 3 familles de fondations et la profondeur de bon sol qui correspond à chacune :',
        options: [
          { id: 'a', label: 'Superficielles (< 3 m), semi-profondes (3–6 m), profondes (> 6 m)' },
          { id: 'b', label: 'Légères, moyennes et lourdes — sans lien avec la profondeur' },
          { id: 'c', label: 'Uniquement semelles et radiers, toujours à 50 cm' },
          { id: 'd', label: 'Profondes en premier, superficielles seulement en montagne' },
        ],
        bonneReponse: 'a',
        explication:
          'Superficielles : semelles filantes, isolées, radier. Semi-profondes : puits + longrines. Profondes : pieux, micropieux.',
        termesLies: [
          'fondations-superficielles',
          'fondations-semi-profondes',
          'fondations-profondes',
          'semelle-filante',
          'pieux',
        ],
      },
      {
        id: 'fp03',
        chapitre: 'Fondations',
        question: 'Quelle est la différence entre une semelle filante et un radier ? Lequel correspond à l\'image du « radeau » ?',
        options: [
          {
            id: 'a',
            label:
              'Semelle filante = ruban sous chaque mur ; radier = dalle épaisse sous toute la surface (le radeau)',
          },
          { id: 'b', label: 'Ce sont deux noms pour le même ouvrage' },
          { id: 'c', label: 'Le radier est uniquement pour les toitures' },
          { id: 'd', label: 'La semelle filante remplace les chaises d\'implantation' },
        ],
        bonneReponse: 'a',
        explication: 'Radier = sol médiocre partout, poids réparti au maximum sur toute l\'emprise.',
        termesLies: ['semelle-filante', 'radier', 'maison-semelle-immeuble-pieux'],
      },
      {
        id: 'fp04',
        chapitre: 'Armatures',
        question: 'Pourquoi met-on de l\'acier dans le béton, et où le place-t-on dans une semelle qui fléchit ?',
        options: [
          {
            id: 'a',
            label:
              'Le béton résiste mal à la traction ; les filants en partie basse reprennent l\'effort tendu',
          },
          { id: 'b', label: 'Pour décorer le coffrage — en partie haute uniquement' },
          { id: 'c', label: 'L\'acier remplace le béton de propreté' },
          { id: 'd', label: 'Pour éviter la DT-DICT avant terrassement' },
        ],
        bonneReponse: 'a',
        explication: 'Béton armé = compression (béton) + traction (acier). La partie étirée est en bas.',
        termesLies: ['beton-arme', 'filants-armature', 'traction-compression-beton'],
      },
      {
        id: 'fp05',
        chapitre: 'Armatures',
        question: 'À quoi servent les cales sous les armatures, et que se passe-t-il si l\'acier touche la terre ?',
        options: [
          { id: 'a', label: 'Garantir l\'enrobage de 3 à 5 cm — humidité, rouille, gonflement et éclatement du béton' },
          { id: 'b', label: 'Augmenter la hauteur du mur au-dessus du RDC' },
          { id: 'c', label: 'Remplacer les cordeaux d\'implantation' },
          { id: 'd', label: 'Fixer les tuiles sur la charpente' },
        ],
        bonneReponse: 'a',
        explication: 'Aciers au contact de la terre → corrosion → le béton éclate.',
        termesLies: ['cales-enrobage', 'enrobage'],
      },
      {
        id: 'fp06',
        chapitre: 'Armatures',
        question: 'Deux barres HA10 se prolongent : quelle longueur de recouvrement prévoir, et comment les attache-t-on ?',
        options: [
          { id: 'a', label: 'Environ 50 cm (50 × diamètre) — attachées au fil de fer, jamais soudées' },
          { id: 'b', label: '10 cm — soudure obligatoire' },
          { id: 'c', label: 'Pas de recouvrement — une seule barre continue' },
          { id: 'd', label: '1 mètre fixe quel que soit le diamètre — collées au mortier' },
        ],
        bonneReponse: 'a',
        explication: 'Recouvrement ≈ 50 Ø : le béton transmet l\'effort d\'une barre à l\'autre.',
        termesLies: ['recouvrement-armature', 'acier-ha'],
      },
      {
        id: 'fp07',
        chapitre: 'Planchers',
        question: 'Dans un plancher poutrelles-hourdis, qui porte vraiment : la poutrelle ou le hourdis ? Et à quoi sert la table de compression ?',
        options: [
          {
            id: 'a',
            label:
              'La poutrelle précontrainte porte ; le hourdis remplit. La table solidarise l\'ensemble en plancher monolithique',
          },
          { id: 'b', label: 'Le hourdis porte ; la poutrelle sert de décoration' },
          { id: 'c', label: 'Les deux portent également — pas de table nécessaire' },
          { id: 'd', label: 'La table remplace les fondations' },
        ],
        bonneReponse: 'a',
        explication: 'Table de compression 4–5 cm + treillis = puzzle solidarisé.',
        termesLies: [
          'plancher-poutrelles-hourdis',
          'poutrelle-precontrainte',
          'hourdis-entrevous',
          'table-compression-plancher',
        ],
      },
      {
        id: 'fp08',
        chapitre: 'Planchers',
        question:
          'Pourquoi les étais sont-ils obligatoires, et combien de temps environ les laisse-t-on ? Où place-t-on le treillis au droit des appuis, et pourquoi ?',
        options: [
          {
            id: 'a',
            label:
              'Béton à résistance de calcul vers 28 j — étais en attendant. Sur appui : treillis en haut (traction en partie haute)',
          },
          { id: 'b', label: '24 h suffisent — treillis toujours en bas partout' },
          { id: 'c', label: 'Les étais sont optionnels si le béton est coulé vite' },
          { id: 'd', label: '1 semaine max — treillis au milieu de l\'épaisseur sur les appuis' },
        ],
        bonneReponse: 'a',
        explication: 'Retirer les étais trop tôt = plancher qui fléchit. La traction change de côté au-dessus d\'un appui.',
        termesLies: ['etais-plancher', 'traction-appui-travee', 'treillis-soude'],
      },
];

const APPROFONDISSEMENT_QUESTIONS: QuizLotModule['questions'] = [
  {
    id: 'fp09',
    chapitre: 'Fondations',
    question: 'Pourquoi une maison individuelle a-t-elle surtout des semelles filantes, alors qu\'un immeuble passe souvent par semelles isolées, radier ou pieux ?',
    options: [
      {
        id: 'a',
        label:
          'La maison est légère et répartit son poids par les murs ; l\'immeuble concentre sur poteaux et voiles',
      },
      { id: 'b', label: 'Parce que le PLU interdit les pieux en maison individuelle' },
      { id: 'c', label: 'Les semelles filantes ne fonctionnent qu\'en montagne' },
      { id: 'd', label: 'L\'immeuble n\'a jamais besoin d\'étude de sol' },
    ],
    bonneReponse: 'a',
    explication: 'Même logique que les raquettes à neige : répartir ou concentrer le poids selon la structure.',
    termesLies: ['maison-semelle-immeuble-pieux', 'semelle-filante', 'semelle-isolee', 'pieux'],
  },
  {
    id: 'fp10',
    chapitre: 'Fondations',
    question: 'Bon sol entre 3 et 6 m de profondeur : quelle solution de fondation semi-profonde est décrite dans la fiche ?',
    options: [
      {
        id: 'a',
        label: 'Des puits remplis de gros béton, reliés en tête par des longrines enterrées',
      },
      { id: 'b', label: 'Un radier mince posé directement sur la terre végétale' },
      { id: 'c', label: 'Des semelles filantes à 50 cm, sans étude de sol' },
      { id: 'd', label: 'Un hourdis en polystyrène entre deux murs' },
    ],
    bonneReponse: 'a',
    explication: 'Les puits descendent chercher le bon sol ; les longrines portent les murs entre les puits.',
    termesLies: ['fondations-semi-profondes', 'puits-fondation', 'longrine', 'bon-sol'],
  },
  {
    id: 'fp11',
    chapitre: 'Armatures',
    question: 'À quoi sert le béton de propreté (~5 cm) coulé au fond de fouille avant de poser la cage d\'armatures ?',
    options: [
      {
        id: 'a',
        label: 'Travailler propre et garantir l\'enrobage — on ne pose pas les aciers directement sur la terre',
      },
      { id: 'b', label: 'Remplacer l\'étude géotechnique G2' },
      { id: 'c', label: 'Accélérer le séchage du béton structural de 28 à 7 jours' },
      { id: 'd', label: 'Tenir les chaises d\'implantation en place' },
    ],
    bonneReponse: 'a',
    explication: 'C\'est la 2e règle d\'or des fondations, avec l\'enrobage 3–5 cm et le recouvrement 50 Ø.',
    termesLies: ['beton-proprete', 'enrobage', 'cales-enrobage'],
  },
  {
    id: 'fp12',
    chapitre: 'Armatures',
    question: 'Que signifie HA10, et pourquoi place-t-on des filants en partie basse d\'une semelle qui fléchit ?',
    options: [
      {
        id: 'a',
        label:
          'HA10 = barre à haute adhérence de 10 mm ; le béton est ~10× plus faible en traction — l\'acier reprend l\'effort tendu en bas',
      },
      { id: 'b', label: 'HA10 = 10 barres par mètre linéaire — l\'acier remplace le béton de propreté' },
      { id: 'c', label: 'HA10 = acier inoxydable — les filants vont toujours en partie haute' },
      { id: 'd', label: 'HA10 = treillis soudé — uniquement pour les planchers hourdis' },
    ],
    bonneReponse: 'a',
    explication: 'Image : une planche entre deux tréteaux — la face du dessous s\'étire, comme une semelle qui fléchit.',
    termesLies: ['acier-ha', 'filants-armature', 'traction-compression-beton', 'beton-arme'],
  },
  {
    id: 'fp13',
    chapitre: 'Armatures',
    question: 'Cadres, étriers et aciers en attente : quel est leur rôle respectif dans une fondation ?',
    options: [
      {
        id: 'a',
        label:
          'Cadres/étriers = maintiennent les filants (tous les 15–25 cm) ; aciers en attente = coudent le mur ou le poteau du dessus',
      },
      { id: 'b', label: 'Cadres = remplacent le treillis sur les appuis ; aciers en attente = décoratifs' },
      { id: 'c', label: 'Étriers = remplacent les pieux ; aciers en attente = remplacent le béton de propreté' },
      { id: 'd', label: 'Tous remplacent le recouvrement 50 Ø entre filants' },
    ],
    bonneReponse: 'a',
    explication: 'Filants en bas pour la traction, cadres pour tenir la cage, aciers en attente pour la continuité verticale.',
    termesLies: ['cadres-etriers', 'aciers-en-attente', 'filants-armature'],
  },
  {
    id: 'fp14',
    chapitre: 'Planchers',
    question: 'Quelle est la différence entre un plancher poutrelles-hourdis (maison) et une dalle pleine (immeuble) ?',
    options: [
      {
        id: 'a',
        label:
          'Hourdis = poutrelles + entrevous + table (maison) ; dalle pleine = coffrage + 2 nappes + 18–25 cm coulés sur place (collectif, plus de charges)',
      },
      { id: 'b', label: 'La dalle pleine ne comporte jamais d\'armatures' },
      { id: 'c', label: 'Le plancher hourdis est réservé aux immeubles de grande hauteur' },
      { id: 'd', label: 'La dalle pleine remplace les fondations profondes' },
    ],
    bonneReponse: 'a',
    explication: 'Plus de charges en collectif → plus d\'épaisseur et béton coulé en place dans un coffrage complet.',
    termesLies: ['plancher-poutrelles-hourdis', 'dalle-pleine', 'plancher-porteur'],
  },
  {
    id: 'fp15',
    chapitre: 'Planchers',
    question: 'Prédalles et dallage sur terre-plein : de quoi parle-t-on ?',
    options: [
      {
        id: 'a',
        label:
          'Prédalles = demi-dalles préfabriquées + béton coulé sur place ; dallage terre-plein = hérisson + polyane + isolant + dalle 12–15 cm au RDC sans vide sanitaire',
      },
      { id: 'b', label: 'Prédalles = hourdis en polystyrène ; dallage = radier sous tout l\'immeuble' },
      { id: 'c', label: 'Prédalles = pieux forés ; dallage = semelle filante' },
      { id: 'd', label: 'Les deux remplacent le treillis soudé sur les appuis' },
    ],
    bonneReponse: 'a',
    explication: 'Prédalles = gain de temps (coffrage réduit). Dallage terre-plein = solution courante au rez-de-chaussée.',
    termesLies: ['predalle', 'dallage-terre-plein', 'dalle-compression'],
  },
  {
    id: 'fp16',
    chapitre: 'Planchers',
    question: 'Ordre de pose d\'un plancher hourdis et règle des réservations : que retenir ?',
    options: [
      {
        id: 'a',
        label:
          'Poutrelles → hourdis → treillis → table coulée → étais laissés ; réservations (gaines, trémies) AVANT coulage — percer après = couper des aciers',
      },
      { id: 'b', label: 'Hourdis → poutrelles → retrait immédiat des étais ; perçage libre après 24 h' },
      { id: 'c', label: 'Treillis en bas partout ; réservations uniquement après réception du lot peinture' },
      { id: 'd', label: 'Table de compression avant les poutrelles ; les étais sont optionnels en maison' },
    ],
    bonneReponse: 'a',
    explication: 'Règle 3 des planchers : tout se prévoit avant le coulage — le béton coulé est définitif.',
    termesLies: [
      'plancher-poutrelles-hourdis',
      'table-compression-plancher',
      'etais-plancher',
      'reservation-plancher',
      'traction-appui-travee',
    ],
  },
];

export const QUIZ_FONDATIONS_PLANCHERS_MODULES: QuizLotModule[] = [
  {
    id: 'fondations-planchers-memo',
    numero: 1,
    titre: 'L\'essentiel',
    sousTitre: '8 questions · sol, armatures, hourdis, étais',
    duree: '5 min',
    description:
      'Étude de sol, familles de fondations, béton armé, plancher poutrelles-hourdis, étais et treillis sur appuis — aligné sur la fiche révision.',
    questions: ESSENTIEL_QUESTIONS,
  },
  {
    id: 'fondations-planchers-approfondi',
    numero: 2,
    titre: 'Approfondissement',
    sousTitre: '8 questions · maison/immeuble, BA, dalles, règles',
    duree: '5 min',
    description:
      'Maison vs immeuble, fondations semi-profondes, béton de propreté, cadres et aciers en attente, dalle pleine, prédalles et réservations.',
    questions: APPROFONDISSEMENT_QUESTIONS,
  },
];
