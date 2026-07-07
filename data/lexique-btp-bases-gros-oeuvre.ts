import type { TermeLexique } from './lexique-btp';

/**
 * Lexique complémentaire — fiche mémo débutant « Bases du gros œuvre »
 * (fondations, armatures, familles de fondations).
 */
export const LEXIQUE_BASES_GROS_OEUVRE: TermeLexique[] = [
  {
    id: 'fondations-semi-profondes',
    terme: 'Fondations semi-profondes',
    famille: 'Terrassement & géotechnique',
    definition:
      'Fondations entre 3 et 6 m de profondeur quand le bon sol n\'est pas à portée de semelles superficielles.',
    exemple: 'Puits creusés jusqu\'au bon sol, reliés en tête par des longrines.',
  },
  {
    id: 'fondations-profondes',
    terme: 'Fondations profondes',
    famille: 'Terrassement & géotechnique',
    definition:
      'Fondations au-delà de 6 m de profondeur (parfois 20–30 m) : pieux forés, battus ou micropieux.',
    aQuoiCaSert: 'Atteindre le sol dur quand la surface ne porte pas.',
  },
  {
    id: 'puits-fondation',
    terme: 'Puits de fondation',
    famille: 'Terrassement & géotechnique',
    definition:
      'Gros cylindres de béton (Ø 80 cm à 1,20 m) creusés jusqu\'au bon sol, reliés par des longrines en tête.',
  },
  {
    id: 'micropieux',
    terme: 'Micropieux',
    famille: 'Terrassement & géotechnique',
    definition:
      'Pieux de faible diamètre (10–25 cm) pour reprise en sous-œuvre ou accès difficiles.',
  },
  {
    id: 'acier-ha',
    terme: 'Aciers HA',
    sigle: 'Haute Adhérence',
    famille: 'Béton & aciers',
    definition:
      'Barres nervurées classiques du béton armé. Le chiffre indique le diamètre en mm : HA8, HA10, HA12…',
    exemple: 'Les nervures accrochent le béton pour transmettre les efforts.',
  },
  {
    id: 'filants-armature',
    terme: 'Filants',
    famille: 'Béton & aciers',
    definition:
      'Barres longitudinales qui courent tout le long de la semelle, en partie basse — elles reprennent la traction.',
    aQuoiCaSert: 'Le béton résiste mal à la traction ; les filants compensent en zone tendue.',
  },
  {
    id: 'cadres-etriers',
    terme: 'Cadres (étriers)',
    famille: 'Béton & aciers',
    definition:
      'Boucles d\'acier qui entourent les filants tous les 15 à 25 cm et maintiennent la cage.',
    exemple: 'Filants + cadres = cage d\'armatures (ex. « 3 HA8 » en semelle de maison).',
  },
  {
    id: 'cage-armatures',
    terme: 'Cage d\'armatures',
    famille: 'Béton & aciers',
    definition:
      'Assemblage de filants et cadres prêt à couler, souvent préfabriqué pour les semelles.',
  },
  {
    id: 'treillis-soude',
    terme: 'Treillis soudé',
    famille: 'Béton & aciers',
    definition:
      'Quadrillage de fils d\'acier soudés en panneaux — pour dalles et radiers (armature dans les deux sens).',
  },
  {
    id: 'aciers-en-attente',
    terme: 'Aciers en attente',
    famille: 'Béton & aciers',
    definition:
      'Barres qui dépassent verticalement de la fondation pour « coudre » avec les murs ou poteaux au-dessus.',
  },
  {
    id: 'recouvrement-armature',
    terme: 'Recouvrement des armatures',
    famille: 'Béton & aciers',
    definition:
      'Chevauchement d\'environ 50 fois le diamètre quand deux barres se rejoignent (HA10 → 50 cm), attaché au fil de fer.',
    vigilance: 'On ne soude pas en chantier courant : le béton transmet l\'effort d\'une barre à l\'autre.',
  },
  {
    id: 'cales-enrobage',
    terme: 'Cales d\'enrobage',
    famille: 'Béton & aciers',
    definition:
      'Petits supports sous la cage pour garantir 3 à 5 cm de béton autour de chaque acier.',
    vigilance: 'Un acier au contact de la terre rouille, gonfle et fait éclater le béton.',
  },
  {
    id: 'traction-compression-beton',
    terme: 'Compression / traction du béton',
    famille: 'Béton & aciers',
    definition:
      'Le béton résiste très bien à la compression mais environ 10 fois moins à la traction. Une fondation qui fléchit est comprimée dessus et tendue dessous.',
    aQuoiCaSert: 'Explique pourquoi les filants se placent en partie basse de la semelle.',
  },
];
