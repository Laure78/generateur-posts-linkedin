import type { TermeLexique } from './lexique-btp';

/**
 * Lexique complémentaire — fiche révision débutant « Fondations et planchers ».
 * Complète les termes GO (semelles, radier, armatures) par le vocabulaire des planchers.
 */
export const LEXIQUE_FONDATIONS_PLANCHERS: TermeLexique[] = [
  {
    id: 'fondation-porteur',
    terme: 'Fondation porteuse',
    famille: 'Planchers & structures horizontales',
    definition:
      'Partie enterrée qui transmet le poids du bâtiment au sol, sans affaissement, inclinaison ni fissures.',
    aQuoiCaSert: 'Répartir les charges du bâtiment sur le sol — comme des raquettes à neige pour le poids du corps.',
    exemple: 'Une maison pèse souvent 100 à 200 tonnes.',
  },
  {
    id: 'plancher-porteur',
    terme: 'Plancher porteur',
    famille: 'Planchers & structures horizontales',
    definition:
      'Structure horizontale qui porte chaque niveau et transmet les charges vers les murs, poteaux et fondations.',
    aQuoiCaSert: 'Supporter les charges d\'un étage et les descendre dans la structure verticale.',
  },
  {
    id: 'plancher-poutrelles-hourdis',
    terme: 'Plancher poutrelles-hourdis',
    famille: 'Planchers & structures horizontales',
    definition:
      'Plancher le plus courant en maison individuelle : poutrelles précontraintes + hourdis (entrevous) + table de compression coulée sur place.',
    aQuoiCaSert: 'Image mentale : une étagère — les poutrelles portent, les hourdis remplissent, la table unit le tout.',
  },
  {
    id: 'poutrelle-precontrainte',
    terme: 'Poutrelle précontrainte',
    famille: 'Planchers & structures horizontales',
    definition:
      'Petite poutre en béton préfabriquée, avec aciers déjà tendus en partie basse. Posée d\'un mur porteur à l\'autre — c\'est elle qui porte le plancher.',
    vigilance: 'Ne pas confondre avec le hourdis : la poutrelle porte, le hourdis ne fait que remplir.',
  },
  {
    id: 'hourdis-entrevous',
    terme: 'Hourdis (entrevous)',
    famille: 'Planchers & structures horizontales',
    definition:
      'Blocs de remplissage posés entre les poutrelles, en béton ou polystyrène (PSE). Ils ferment l\'espace et servent de coffrage perdu.',
    aQuoiCaSert: 'Isole et remplit entre poutrelles — ils ne portent presque rien.',
  },
  {
    id: 'table-compression-plancher',
    terme: 'Table de compression',
    famille: 'Planchers & structures horizontales',
    definition:
      'Couche de 4 à 5 cm de béton coulée sur tout le plancher, avec treillis soudé : elle solidarise poutrelles et hourdis en un ouvrage monolithique.',
    exemple: 'Transforme un puzzle de pièces en un plancher unique.',
  },
  {
    id: 'etais-plancher',
    terme: 'Étais de plancher',
    famille: 'Planchers & structures horizontales',
    definition:
      'Béquilles métalliques sous les poutrelles pendant le coulage et le séchage du béton.',
    vigilance:
      'Obligatoires jusqu\'à résistance de calcul (vers 21–28 jours). Les retirer trop tôt = flèche ou effondrement.',
  },
  {
    id: 'dalle-pleine',
    terme: 'Dalle pleine',
    famille: 'Planchers & structures horizontales',
    definition:
      'Plancher coulé en place dans un coffrage, avec deux nappes d\'armatures et 18 à 25 cm de béton — solution courante en logement collectif.',
    aQuoiCaSert: 'Plus de charges, plus d\'épaisseur qu\'un plancher hourdis.',
  },
  {
    id: 'dallage-terre-plein',
    terme: 'Dallage sur terre-plein',
    famille: 'Planchers & structures horizontales',
    definition:
      'Au rez-de-chaussée sans vide sanitaire : hérisson de cailloux compactés + film polyane + isolant + dalle béton 12–15 cm avec treillis soudé.',
  },
  {
    id: 'traction-appui-travee',
    terme: 'Traction en travée / sur appui',
    famille: 'Planchers & structures horizontales',
    definition:
      'En milieu de travée, le plancher fléchit vers le bas : traction en bas, aciers en bas. Au droit d\'un appui, il fléchit à l\'envers : traction en haut, treillis remonté en partie haute.',
    aQuoiCaSert: 'L\'acier va toujours là où le béton est tendu — la face étirée change selon la zone.',
    exemple: 'Comme une règle qu\'on plie vers le bas ou vers le haut.',
  },
  {
    id: 'reservation-plancher',
    terme: 'Réservation de plancher',
    famille: 'Planchers & structures horizontales',
    definition:
      'Ouverture prévue avant coulage pour gaines, trémies d\'escalier, etc.',
    vigilance: 'Percer après coulage = couper des aciers — à éviter absolument.',
  },
  {
    id: 'maison-semelle-immeuble-pieux',
    terme: 'Maison vs immeuble (fondations)',
    famille: 'Planchers & structures horizontales',
    definition:
      'La maison est légère et répartit son poids par des murs → semelles filantes. L\'immeuble est lourd et concentre sur poteaux et voiles → semelles isolées massives, radier ou pieux.',
    aQuoiCaSert: 'L\'étude de sol choisit le type — jamais une habitude de chantier.',
  },
];
