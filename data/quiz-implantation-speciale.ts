/**
 * Quiz Implantation bâtiment — 8 questions (fiche mémo débutant).
 */

import type { QuizLotModule, QuizLotTheme } from './quiz-lot-special-shared';

export const QUIZ_IMPLANTATION_THEME: QuizLotTheme = {
  lotLabel: 'Débutant — Implantation',
  hubTitle: 'Quiz implantation',
  hubDescription: 'Position et hauteur du bâtiment sur le terrain — 8 questions pour vérifier vos acquis',
  accentClass: 'text-violet-900',
  hubCardClass: 'bg-gradient-to-br from-violet-50 to-indigo-50',
  introHeaderClass: 'bg-gradient-to-br from-violet-500 to-indigo-600',
  buttonClass: 'bg-violet-600 hover:bg-violet-700',
  progressClass: 'bg-violet-500',
  borderClass: 'border-violet-200/80',
  icon: 'hard-hat',
  parcoursLabel: 'Parcours Implantation',
  parcoursId: 'implantation-batiment',
  scoreMessages: {
    excellent: 'Vous maîtrisez les bases de l\'implantation — prêt pour le terrain.',
    good: 'Bon niveau — refaites le quiz pour ancrer les derniers points.',
    ok: 'Des bases — parcourez le parcours guidé puis réessayez.',
    low: 'Normal pour un premier passage : relisez la fiche mémo puis retentez.',
  },
};

export function getQuizImplantationModule(id: string): QuizLotModule | undefined {
  return QUIZ_IMPLANTATION_MODULES.find((m) => m.id === id);
}

export const QUIZ_IMPLANTATION_MODULES: QuizLotModule[] = [
  {
    id: 'implantation-memo',
    numero: 1,
    titre: 'Implantation — l\'essentiel',
    sousTitre: '8 questions · documents, NGF, chaises, contrôles',
    duree: '4 min',
    description:
      'Permis de construire, PLU, bornes, chaises d\'implantation, équerrage 3-4-5 et recontrôle avant béton.',
    questions: [
      {
        id: 'imp01',
        chapitre: 'Documents',
        question: 'Quel document fixe les distances exactes du bâtiment à la rue et aux voisins ?',
        options: [
          { id: 'a', label: 'Le permis de construire (plan masse), qui applique les règles du PLU' },
          { id: 'b', label: 'Le cadastre' },
          { id: 'c', label: 'Le plan EXE de l\'entreprise' },
          { id: 'd', label: 'L\'étude de sol G2 seule' },
        ],
        bonneReponse: 'a',
        explication: 'Le PC et son plan masse sont la référence officielle d\'implantation.',
        termesLies: ['permis-construire', 'plan-masse', 'plu'],
      },
      {
        id: 'imp02',
        chapitre: 'Références',
        question: 'Que signifie NGF, et à quoi ça sert sur un chantier ?',
        options: [
          { id: 'a', label: 'Nivellement Général de la France : altitude officielle pour toutes les cotes du chantier' },
          { id: 'b', label: 'Norme Générale de Fondation — profondeur minimale des semelles' },
          { id: 'c', label: 'Numéro de Garantie Financière du promoteur' },
          { id: 'd', label: 'Niveau Géométrique de Façade — uniquement pour les menuiseries' },
        ],
        bonneReponse: 'a',
        explication: 'Repère NGF chantier → fond de fouille, fondations, dallage, sol fini.',
        termesLies: ['ngf', 'reper-ngf-chantier', 'altimetrie'],
      },
      {
        id: 'imp03',
        chapitre: 'Références',
        question: 'Pourquoi ne peut-on pas se fier au cadastre pour connaître les limites du terrain ?',
        options: [
          { id: 'a', label: 'C\'est un document fiscal, pas assez précis — seules les bornes du géomètre font foi' },
          { id: 'b', label: 'Le cadastre est réservé aux mairies et interdit aux entreprises' },
          { id: 'c', label: 'Le cadastre ne concerne que les terrains agricoles' },
          { id: 'd', label: 'Le cadastre est mis à jour chaque semaine et donc instable' },
        ],
        bonneReponse: 'a',
        explication: 'Planimétrie fiable = bornes posées par géomètre-expert.',
        termesLies: ['cadastre', 'bornage', 'planimetrie', 'geometre'],
      },
      {
        id: 'imp04',
        chapitre: 'Mode opératoire',
        question: 'À quoi servent les chaises d\'implantation, et pourquoi les pose-t-on en retrait ?',
        options: [
          { id: 'a', label: 'Elles conservent les axes pendant le terrassement — en retrait pour ne pas être détruites' },
          { id: 'b', label: 'Elles servent uniquement à stocker les outils du géomètre' },
          { id: 'c', label: 'Elles remplacent les fondations sur sol instable' },
          { id: 'd', label: 'Elles indiquent la hauteur du R+1 au laser' },
        ],
        bonneReponse: 'a',
        explication: 'Cordeaux entre chaises opposées = angles retrouvables même fouilles ouvertes.',
        termesLies: ['chaises-implantation', 'cordeaux-implantation', 'implantation'],
      },
      {
        id: 'imp05',
        chapitre: 'Contrôle',
        question: 'Comment vérifie-t-on qu\'un tracé est bien d\'équerre ? (2 méthodes)',
        options: [
          { id: 'a', label: 'Triangle 3-4-5 et égalité des diagonales du rectangle' },
          { id: 'b', label: 'Mesure de l\'humidité du sol et essai Proctor' },
          { id: 'c', label: 'Comparaison au plan cadastral et au PLU' },
          { id: 'd', label: 'Contrôle acoustique et test d\'étanchéité à l\'air' },
        ],
        bonneReponse: 'a',
        explication: 'Tolérance courante : ± 1 à 2 cm sur les diagonales.',
        termesLies: ['equerrage-3-4-5', 'controle-diagonales'],
      },
      {
        id: 'imp06',
        chapitre: 'Références',
        question: 'C\'est quoi le « trait de + 1,00 m » ?',
        options: [
          { id: 'a', label: 'Un trait au laser sur les chaises, 1 m au-dessus du sol fini RDC — référence de hauteur du chantier' },
          { id: 'b', label: 'La surépaisseur de béton au-dessus des armatures' },
          { id: 'c', label: 'La distance minimale entre deux piquets d\'angle' },
          { id: 'd', label: 'Le recul PLU par rapport à la voie publique' },
        ],
        bonneReponse: 'a',
        explication: 'Tout le chantier mesure depuis ce trait de niveau.',
        termesLies: ['trait-niveau', 'altimetrie'],
      },
      {
        id: 'imp07',
        chapitre: 'Terrain',
        question: 'Quelle déclaration est obligatoire avant de creuser ?',
        options: [
          { id: 'a', label: 'La DT-DICT, pour repérer les réseaux enterrés (gaz, électricité, eau)' },
          { id: 'b', label: 'La déclaration préalable de travaux uniquement' },
          { id: 'c', label: 'Le PV de réception des enduits de façade' },
          { id: 'd', label: 'L\'attestation Qualiopi de l\'entreprise' },
        ],
        bonneReponse: 'a',
        explication: 'DICT = Déclaration d\'Intentions de Commencement de Travaux (réseaux).',
        termesLies: ['dict'],
      },
      {
        id: 'imp08',
        chapitre: 'Contrôle',
        question: 'Pourquoi recontrôle-t-on l\'implantation juste avant de couler le béton ?',
        options: [
          { id: 'a', label: 'Une chaise a pu bouger (engin, intempéries) — un béton au mauvais endroit ne se rattrape pas' },
          { id: 'b', label: 'Pour vérifier la teinte de l\'enduit de façade' },
          { id: 'c', label: 'Parce que le permis de construire expire chaque matin' },
          { id: 'd', label: 'Pour recalculer le Uw des menuiseries' },
        ],
        bonneReponse: 'a',
        explication: 'Dernier contrôle : cordeaux, diagonales et hauteur.',
        termesLies: ['chaises-implantation', 'implantation', 'pv-implantation'],
      },
    ],
  },
];
