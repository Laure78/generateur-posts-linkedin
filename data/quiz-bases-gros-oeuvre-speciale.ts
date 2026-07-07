/**
 * Quiz Bases du gros œuvre — 14 questions (fiche mémo débutant).
 * Partie 1 : implantation (8) · Partie 2 : fondations & armatures (6).
 */

import type { QuizLotModule, QuizLotTheme } from './quiz-lot-special-shared';
import { QUIZ_IMPLANTATION_MODULES } from './quiz-implantation-speciale';

export const QUIZ_BASES_GO_THEME: QuizLotTheme = {
  lotLabel: 'Débutant — Bases gros œuvre',
  hubTitle: '2 quiz thématiques',
  hubDescription: 'Implantation, fondations et armatures — 14 questions pour ancrer l\'essentiel',
  accentClass: 'text-amber-900',
  hubCardClass: 'bg-gradient-to-br from-amber-50 to-orange-50',
  introHeaderClass: 'bg-gradient-to-br from-amber-500 to-orange-600',
  buttonClass: 'bg-amber-600 hover:bg-amber-700',
  progressClass: 'bg-amber-500',
  borderClass: 'border-amber-200/80',
  icon: 'hard-hat',
  parcoursLabel: 'Parcours Bases du gros œuvre',
  parcoursId: 'bases-gros-oeuvre',
  scoreMessages: {
    excellent: 'Solide sur les bases GO — implantation, fondations et armatures maîtrisées.',
    good: 'Bon niveau — refaites le quiz pour ancrer les pièges restants.',
    ok: 'Des bases — parcourez le parcours guidé puis réessayez.',
    low: 'Normal pour un premier passage : relisez la fiche mémo Word puis retentez.',
  },
};

export function getQuizBasesGoModule(id: string): QuizLotModule | undefined {
  return QUIZ_BASES_GO_MODULES.find((m) => m.id === id);
}

const FONDATIONS_QUESTIONS: QuizLotModule['questions'] = [
  {
    id: 'bgo09',
    chapitre: 'Fondations',
    question: 'Quel document décide du type de fondation à réaliser ?',
    options: [
      { id: 'a', label: 'L\'étude de sol (G2) : profondeur du bon sol et type de fondation' },
      { id: 'b', label: 'Le plan de coffrage des menuiseries' },
      { id: 'c', label: 'La fiche technique de l\'enduit monocouche' },
      { id: 'd', label: 'Le carnet de chantier du lot peinture' },
    ],
    bonneReponse: 'a',
    explication: 'G2 = conception : type et profondeur des fondations.',
    termesLies: ['etude-sol-g2', 'etude-geotechnique', 'bon-sol'],
  },
  {
    id: 'bgo10',
    chapitre: 'Fondations',
    question: 'Cite les 3 familles de fondations et leur profondeur de bon sol :',
    options: [
      { id: 'a', label: 'Superficielles (< 3 m), semi-profondes (3–6 m), profondes (> 6 m)' },
      { id: 'b', label: 'Légères, moyennes et lourdes — sans lien avec la profondeur' },
      { id: 'c', label: 'Uniquement semelles et radiers, toujours à 50 cm' },
      { id: 'd', label: 'Profondes en premier, superficielles seulement en montagne' },
    ],
    bonneReponse: 'a',
    explication: 'Plus le bon sol est profond, plus la fondation descend le chercher.',
    termesLies: [
      'fondations-superficielles',
      'fondations-semi-profondes',
      'fondations-profondes',
      'semelle-filante',
      'pieux',
    ],
  },
  {
    id: 'bgo11',
    chapitre: 'Fondations',
    question: 'Quand utilise-t-on un radier plutôt qu\'une semelle filante ?',
    options: [
      { id: 'a', label: 'Quand le sol est médiocre sur toute la surface — le poids est réparti au maximum' },
      { id: 'b', label: 'Uniquement pour les toitures en tuiles Canal S' },
      { id: 'c', label: 'Quand on n\'a pas d\'étude de sol G2' },
      { id: 'd', label: 'Pour remplacer les chaises d\'implantation' },
    ],
    bonneReponse: 'a',
    explication: 'Radier = grande dalle sous toute l\'emprise, comme un radeau sur l\'eau.',
    termesLies: ['radier', 'semelle-filante', 'portance-sol'],
  },
  {
    id: 'bgo12',
    chapitre: 'Armatures',
    question: 'Pourquoi met-on de l\'acier dans le béton, et où le place-t-on dans une semelle ?',
    options: [
      { id: 'a', label: 'Le béton résiste mal à la traction ; les filants en partie basse reprennent l\'effort tendu' },
      { id: 'b', label: 'Pour décorer le coffrage — en partie haute uniquement' },
      { id: 'c', label: 'L\'acier remplace le béton de propreté' },
      { id: 'd', label: 'Pour éviter la DT-DICT avant terrassement' },
    ],
    bonneReponse: 'a',
    explication: 'Béton armé = compression (béton) + traction (acier).',
    termesLies: ['beton-arme', 'filants-armature', 'traction-compression-beton'],
  },
  {
    id: 'bgo13',
    chapitre: 'Armatures',
    question: 'À quoi servent les cales sous la cage d\'armatures ?',
    options: [
      { id: 'a', label: 'Garantir l\'enrobage de 3 à 5 cm — éviter le contact acier/terre' },
      { id: 'b', label: 'Augmenter la hauteur du mur au-dessus du RDC' },
      { id: 'c', label: 'Remplacer les cordeaux d\'implantation' },
      { id: 'd', label: 'Fixer les tuiles sur la charpente' },
    ],
    bonneReponse: 'a',
    explication: 'Aciers au contact de la terre → corrosion → éclatement du béton.',
    termesLies: ['cales-enrobage', 'enrobage'],
  },
  {
    id: 'bgo14',
    chapitre: 'Armatures',
    question: 'Que signifie HA10, et quel recouvrement faut-il quand deux barres HA10 se rejoignent ?',
    options: [
      { id: 'a', label: 'Acier Haute Adhérence Ø 10 mm — recouvrement ≈ 50 cm (50 × diamètre)' },
      { id: 'b', label: 'Hauteur d\'appui 10 cm — recouvrement 10 cm' },
      { id: 'c', label: 'Hors gel 10 cm — pas de recouvrement' },
      { id: 'd', label: '10 barres par mètre — soudure obligatoire' },
    ],
    bonneReponse: 'a',
    explication: 'Recouvrement attaché au fil de fer, pas de soudure courante.',
    termesLies: ['acier-ha', 'recouvrement-armature'],
  },
];

export const QUIZ_BASES_GO_MODULES: QuizLotModule[] = [
  {
    ...QUIZ_IMPLANTATION_MODULES[0],
    id: 'bgo-implantation',
    numero: 1,
    titre: 'Implantation',
    sousTitre: '8 questions · PC, NGF, chaises, contrôles',
    duree: '4 min',
    description: 'Position et hauteur du bâtiment sur le terrain — même socle que la fiche implantation.',
    questions: QUIZ_IMPLANTATION_MODULES[0].questions,
  },
  {
    id: 'bgo-fondations-armatures',
    numero: 2,
    titre: 'Fondations & armatures',
    sousTitre: '6 questions · familles, radier, aciers HA',
    duree: '4 min',
    description:
      'Étude G2, semelles, radiers, pieux, filants, enrobage, béton de propreté et recouvrement.',
    questions: FONDATIONS_QUESTIONS,
  },
];
