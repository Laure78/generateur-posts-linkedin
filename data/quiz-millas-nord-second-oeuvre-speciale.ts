/**
 * Quiz Millas Nord — 16 questions (fiche révision débutant « Lots 5 à 16 »).
 * Module 1 : l'essentiel (8) · Module 2 : approfondissement (8).
 */

import type { QuizLotModule, QuizLotTheme } from './quiz-lot-special-shared';

export const QUIZ_MILLAS_NORD_SECOND_OEUVRE_THEME: QuizLotTheme = {
  lotLabel: 'Débutant — Millas Nord (lots 5-16)',
  hubTitle: '2 quiz thématiques',
  hubDescription:
    'Second œuvre, fluides, VRD, paysage et désamiantage — 16 questions sur le DCE 38 logements Créon',
  accentClass: 'text-rose-900',
  hubCardClass: 'bg-gradient-to-br from-rose-50 to-pink-50',
  introHeaderClass: 'bg-gradient-to-br from-rose-500 to-pink-600',
  buttonClass: 'bg-rose-600 hover:bg-rose-700',
  progressClass: 'bg-rose-500',
  borderClass: 'border-rose-200/80',
  icon: 'door-open',
  parcoursLabel: 'Parcours Millas Nord — lots 5 à 16',
  parcoursId: 'millas-nord-second-oeuvre',
  scoreMessages: {
    excellent:
      'Vous maîtrisez le second œuvre et les lots techniques du projet — prêt à lire un DCE complet.',
    good: 'Bon niveau transversal — refaites le quiz pour ancrer VRD, fluides et finitions.',
    ok: 'Des bases solides — parcourez le parcours guidé puis réessayez.',
    low: 'Normal pour un premier passage : relisez la fiche révision puis retentez.',
  },
};

export function getQuizMillasNordSecondOeuvreModule(id: string): QuizLotModule | undefined {
  return QUIZ_MILLAS_NORD_SECOND_OEUVRE_MODULES.find((m) => m.id === id);
}

const ESSENTIEL_QUESTIONS: QuizLotModule['questions'] = [
  {
    id: 'mnso01',
    chapitre: 'Lot 05 — Menuiseries int.',
    question: 'Pourquoi les portes de distribution sont-elles détalonnées de 15 mm en partie basse ?',
    options: [
      { id: 'a', label: 'Pour laisser circuler l\'air neuf vers les bouches d\'extraction de la VMC' },
      { id: 'b', label: 'Pour permettre le passage des fauteuils roulants sans seuil' },
      { id: 'c', label: 'Pour éviter le frottement du vantail sur le carrelage neuf' },
      { id: 'd', label: 'Pour laisser passer les câbles électriques sous la porte' },
    ],
    bonneReponse: 'a',
    explication: 'Complète les entrées d\'air des menuiseries extérieures (lot 04) — air neuf vers pièces humides.',
    termesLies: ['detalonnage-vmc', 'vmc-hygroreglable'],
  },
  {
    id: 'mnso02',
    chapitre: 'Lot 06 — Serrurerie',
    question: 'Quelle est la hauteur réglementaire d\'un garde-corps et l\'écartement maximal entre barreaux ?',
    options: [
      { id: 'a', label: '1,01 m en tout point — barreaudage espacé de 10 cm max (NF P01-012/013), justifié par calcul' },
      { id: 'b', label: '0,90 m — barreaux espacés de 15 cm sans calcul' },
      { id: 'c', label: '1,20 m — barreaux horizontaux autorisés' },
      { id: 'd', label: '1,01 m — écartement libre sans norme' },
    ],
    bonneReponse: 'a',
    explication: 'Lot 06 — galvanisation + thermolaquage QUALIMARINE en extérieur (ambiance quasi-marine).',
    termesLies: ['garde-corps-nf-p01', 'thermolaquage-qualimarine'],
  },
  {
    id: 'mnso03',
    chapitre: 'Lot 07 — Plâtrerie',
    question: 'Quel lot garantit en grande partie l\'étanchéité à l\'air du logement exigée par la RE2020 ?',
    options: [
      {
        id: 'a',
        label: 'Le plâtrier (lot 07) avec le menuisier extérieur (lot 04) — membranes, adhésifs, trappes étanches',
      },
      { id: 'b', label: 'Uniquement le lot peinture (lot 11)' },
      { id: 'c', label: 'Le lot carrelage (lot 10) seul' },
      { id: 'd', label: 'Le lot VRD (lot 12) en fin de chantier' },
    ],
    bonneReponse: 'a',
    explication: 'C\'est ce qui fait réussir le test d\'infiltrométrie — plaques hydrofuges obligatoires en pièces d\'eau.',
    termesLies: ['etancheite-air-re2020', 'plaque-hydrofuge', 'doublage-thermique-platrerie'],
  },
  {
    id: 'mnso04',
    chapitre: 'Lot 09 — Électricité',
    question: 'Quelle est la différence entre courants forts (CFO) et courants faibles (CFA) ?',
    options: [
      { id: 'a', label: 'CFO = énergie (prises, éclairage, tableau) ; CFA = information (TV, RJ45, fibre, téléphone)' },
      { id: 'b', label: 'CFO = courant continu ; CFA = courant alternatif' },
      { id: 'c', label: 'CFO = extérieur ; CFA = intérieur uniquement' },
      { id: 'd', label: 'Ce sont deux noms pour le même réseau' },
    ],
    bonneReponse: 'a',
    explication: 'Lot 09 — norme NF C 15-100, GTL + Linky, différentiels type A en salle de bains.',
    termesLies: ['cfo-cfa', 'gtl-linky', 'differentiel-type-a'],
  },
  {
    id: 'mnso05',
    chapitre: 'Lot 08 — CVC',
    question: 'Comment sont chauffées les maisons individuelles, et comment est produite l\'eau chaude des collectifs ?',
    options: [
      {
        id: 'a',
        label: 'Maisons : PAC air/eau double service (chauffage + ECS). Collectifs : ballon thermodynamique + chauffage électrique',
      },
      { id: 'b', label: 'Tous les logements : chaudière gaz collective' },
      { id: 'c', label: 'Maisons : chauffage électrique seul. Collectifs : PAC double service' },
      { id: 'd', label: 'Panneaux solaires partout — pas de PAC' },
    ],
    bonneReponse: 'a',
    explication: 'RE2020 — priorité aux énergies renouvelables et tests d\'infiltrométrie.',
    termesLies: ['pac-double-service', 'ballon-thermodynamique-cet'],
  },
  {
    id: 'mnso06',
    chapitre: 'Lot 10 — Carrelage',
    question: 'Que signifie le classement UPEC d\'un carrelage, et à quoi sert une chape flottante ?',
    options: [
      {
        id: 'a',
        label: 'UPEC = Usure, Poinçonnement, Eau, Chimie. Chape flottante sur résilient = coupe les bruits d\'impact entre étages',
      },
      { id: 'b', label: 'UPEC = résistance au feu. Chape flottante = isolation thermique uniquement' },
      { id: 'c', label: 'UPEC = prix au m². Chape flottante = chape coulée directement sur terre-plein' },
      { id: 'd', label: 'UPEC = norme acoustique. Chape flottante = ragréage avant peinture' },
    ],
    bonneReponse: 'a',
    explication: 'PV de réception des chapes avant pose — dossier résilients acoustiques (ΔLw) pour traçabilité.',
    termesLies: ['classement-upec', 'chape-flottante-resilient', 'spec-etancheite-carrelage'],
  },
  {
    id: 'mnso07',
    chapitre: 'Lot 11 — Peinture',
    question: 'Pourquoi le peintre doit-il réceptionner les subjectiles par écrit ?',
    options: [
      {
        id: 'a',
        label: 'Sans PV, les supports sont réputés acceptés — le peintre « achète » les défauts des autres lots',
      },
      { id: 'b', label: 'Pour obtenir le visa DEKRA avant peinture' },
      { id: 'c', label: 'Uniquement si le support est en bois extérieur' },
      { id: 'd', label: 'La réception orale suffit si le conducteur de travaux est présent' },
    ],
    bonneReponse: 'a',
    explication: 'Même logique que le façadier (lot 02) et le carreleur — protection juridique n°1.',
    termesLies: ['subjectile-peinture', 'reception-supports-ecrite'],
  },
  {
    id: 'mnso08',
    chapitre: 'Lot 12 — VRD',
    question: 'Dans un réseau séparatif, quelle est la différence entre EU et EP ?',
    options: [
      {
        id: 'a',
        label: 'EU = eaux usées (lavabos, douches, éviers). EP = eaux pluviales — deux réseaux distincts',
      },
      { id: 'b', label: 'EU = eaux vannes uniquement. EP = eaux usées' },
      { id: 'c', label: 'EU et EP sont mélangées dans un collecteur unique' },
      { id: 'd', label: 'EU = eau potable. EP = eaux usées' },
    ],
    bonneReponse: 'a',
    explication: 'Lot 12 — essais compactage/plaque, étanchéité réseaux, passage caméra, plan de récolement.',
    termesLies: ['reseau-separatif-eu-ep', 'eu-ev-reseaux', 'plan-recolement'],
  },
];

const APPROFONDISSEMENT_QUESTIONS: QuizLotModule['questions'] = [
  {
    id: 'mnso09',
    chapitre: 'Lot 13 — Réseaux secs',
    question: 'Pourquoi faut-il poser les fourreaux du lot 13 AVANT la mise en œuvre des enrobés ?',
    options: [
      {
        id: 'a',
        label: 'Tout est en génie civil sous la voirie — un fourreau oublié obligerait à rouvrir la chaussée déjà enrobée',
      },
      { id: 'b', label: 'Les fourreaux se posent toujours après le BBSG pour meilleure adhérence' },
      { id: 'c', label: 'Seul Enedis impose cet ordre — pas le lot télécom' },
      { id: 'd', label: 'Les fourreaux sont aériens sur Millas Nord' },
    ],
    bonneReponse: 'a',
    explication: 'Coordination DT-DICT, chambres de tirage, raccordements Enedis/télécom, IRVE.',
    termesLies: ['fourreau-grillage-avertisseur', 'irve', 'bbsg-enrobe'],
  },
  {
    id: 'mnso10',
    chapitre: 'Lot 16 — Désamiantage',
    question: 'Cite deux documents obligatoires avant de démolir un existant susceptible de contenir de l\'amiante :',
    options: [
      { id: 'a', label: 'Repérage amiante/plomb avant travaux et plan de retrait (ou constat d\'huissier et DICT)' },
      { id: 'b', label: 'Permis de construire et mémoire technique uniquement' },
      { id: 'c', label: 'Consuel et attestation PAC' },
      { id: 'd', label: 'PV de réception des subjectiles et fiche UPEC' },
    ],
    bonneReponse: 'a',
    explication: 'Lot 16 — contrôles d\'air libératoires, BSDA, notification inspection du travail.',
    termesLies: ['plan-retrait-amiante', 'bsda-amiante', 'controle-liberatoire-amiante'],
  },
  {
    id: 'mnso11',
    chapitre: 'Lot 05 — Menuiseries int.',
    question: 'Quand les blocs-portes doivent-ils être réglés définitivement sur Millas Nord ?',
    options: [
      { id: 'a', label: 'APRÈS le passage du peintre (lot 11) — huisseries livrées à temps au GO ou plâtrier' },
      { id: 'b', label: 'Avant la pose des cloisons (lot 07)' },
      { id: 'c', label: 'Pendant le coulage des fondations (lot 01)' },
      { id: 'd', label: 'Uniquement à la réception du bâtiment par le MOA' },
    ],
    bonneReponse: 'a',
    explication: 'Organigramme : cylindres provisoires puis définitifs — une porte mal planifiée décale tout le planning.',
    termesLies: ['bloc-porte-millas', 'organigramme-cles'],
  },
  {
    id: 'mnso12',
    chapitre: 'Lot 08 — Plomberie',
    question: 'Quels essais sont exigés sur les réseaux d\'eau avant fermeture des cloisons ?',
    options: [
      { id: 'a', label: 'Essais d\'étanchéité sur évacuations EU/EV et appareils sanitaires — avant fermeture' },
      { id: 'b', label: 'Aucun — contrôle visuel après peinture' },
      { id: 'c', label: 'Uniquement le test Q4Pa-surf sur les canalisations' },
      { id: 'd', label: 'Essai de compactage Proctor sur les tuyaux PVC' },
    ],
    bonneReponse: 'a',
    explication: 'Un réseau mal testé fuit dans les cloisons — coordination GO (réservations) et plâtrier.',
    termesLies: ['eu-ev-reseaux', 'vmc-hygroreglable'],
  },
  {
    id: 'mnso13',
    chapitre: 'Lot 09 — Électricité',
    question: 'Quelle attestation est obligatoire avant mise en service de l\'installation électrique ?',
    options: [
      { id: 'a', label: 'Le Consuel — attestation de conformité électrique' },
      { id: 'b', label: 'Le RICT du bureau de contrôle structure' },
      { id: 'c', label: 'Le PV de réception des subjectiles' },
      { id: 'd', label: 'L\'avis technique CSTB de l\'enduit' },
    ],
    bonneReponse: 'a',
    explication: 'Également requis pour le dossier photovoltaïque maison 36 — DAAF et BAES dans les communs.',
    termesLies: ['consuel', 'gtl-linky'],
  },
  {
    id: 'mnso14',
    chapitre: 'Lot 14 — AEP / incendie',
    question: 'Quels essais le lot 14 doit-il réaliser avant mise en service de l\'AEP ?',
    options: [
      { id: 'a', label: 'Essais de pression + PV de désinfection de l\'AEP — dossier défense incendie (bâche 120 m³)' },
      { id: 'b', label: 'Uniquement le passage caméra des EU' },
      { id: 'c', label: 'Test d\'infiltrométrie sur les canalisations' },
      { id: 'd', label: 'Compactage à la plaque du réservoir' },
    ],
    bonneReponse: 'a',
    explication: 'Plan de récolement AEP et attentes d\'arrosage — coordination avec le SDIS si nécessaire.',
    termesLies: ['aep-deci', 'plan-recolement'],
  },
  {
    id: 'mnso15',
    chapitre: 'Lot 15 — Paysage',
    question: 'Qu\'est-ce que la garantie de reprise en paysage ?',
    options: [
      {
        id: 'a',
        label: 'L\'entreprise entretient les végétaux jusqu\'à reprise (parachèvement, confortement) — calendrier suivi',
      },
      { id: 'b', label: 'Le MOA reprend les plantations après un an sans entretien' },
      { id: 'c', label: 'Garantie décennale sur les arbres uniquement' },
      { id: 'd', label: 'Reprise des terres végétales par le lot VRD' },
    ],
    bonneReponse: 'a',
    explication: 'Plantations en saison, bordereaux végétaux, SOSED déchets verts, pralinage et tuteurage.',
    termesLies: ['garantie-reprise-paysage'],
  },
  {
    id: 'mnso16',
    chapitre: 'Transversal',
    question: 'Cite 3 tâches des lots 5 à 16 qu\'une entreprise peut confier à BeWork :',
    options: [
      {
        id: 'a',
        label: 'PV réception subjectiles/chapes, suivi UPEC et ΔLw, DICT/arrêtés voirie, dossier amiante, plans de récolement, situations de travaux',
      },
      { id: 'b', label: 'Pose des blocs-portes, coulage des chapes, plantation des arbres' },
      { id: 'c', label: 'Raccordement électrique Enedis sur site' },
      { id: 'd', label: 'Visa technique des plans EXE à la place de DEKRA' },
    ],
    bonneReponse: 'a',
    explication: 'Tout ce qui se lit, se rédige, se relance ou se compile dans un CCTP peut être délégué à BeWork.',
    termesLies: ['subjectile-peinture', 'plan-recolement', 'plan-retrait-amiante'],
  },
];

export const QUIZ_MILLAS_NORD_SECOND_OEUVRE_MODULES: QuizLotModule[] = [
  {
    id: 'millas-nord-so-essentiel',
    numero: 1,
    titre: 'L\'essentiel',
    sousTitre: '8 questions · second œuvre et fluides',
    duree: '5 min',
    description:
      'Détalonnage VMC, garde-corps, étanchéité à l\'air, CFO/CFA, PAC, UPEC, subjectiles et réseaux séparatifs — aligné sur la fiche révision.',
    questions: ESSENTIEL_QUESTIONS,
  },
  {
    id: 'millas-nord-so-approfondi',
    numero: 2,
    titre: 'Approfondissement',
    sousTitre: '8 questions · VRD, sécurité, coordination',
    duree: '5 min',
    description:
      'Fourreaux avant enrobés, amiante, menuiseries intérieures, plomberie, Consuel, AEP/DECI, paysage et délégation BeWork.',
    questions: APPROFONDISSEMENT_QUESTIONS,
  },
];
