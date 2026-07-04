import type { TermeLexique } from './lexique-btp';

/** Lexique Lot 04 — Menuiseries extérieures (DCE Millas Nord, 38 logements). */
export const LEXIQUE_MENUISERIES_EXTERIEURES: TermeLexique[] = [
  {
    id: 'dormant-ouvrant',
    terme: 'Dormant / ouvrant',
    famille: 'Menuiseries extérieures',
    definition:
      'Le dormant est le cadre fixé dans le mur ; l\'ouvrant est la partie mobile (fenêtre ou porte) qui s\'ouvre.',
    aQuoiCaSert: 'Comprendre qui fait quoi lors de la pose, du réglage et de l\'étanchéité.',
  },
  {
    id: 'uw-menuiserie',
    terme: 'Uw (coefficient menuiserie)',
    famille: 'Menuiseries extérieures',
    definition:
      'Indicateur de performance thermique de la fenêtre ou porte complète (cadre + vitrage). Plus Uw est bas, mieux c\'est.',
    exemple: 'Sur ce marché : Uw entre 1,30 et 1,80 W/m²·K selon l\'étude thermique.',
  },
  {
    id: 'rupture-pont-thermique',
    terme: 'Rupture de pont thermique',
    famille: 'Menuiseries extérieures',
    definition:
      'Barrière dans le profilé (souvent aluminium) qui coupe le « pont » froid entre intérieur et extérieur.',
  },
  {
    id: 'calfeutrement-menuiserie',
    terme: 'Calfeutrement (menuiserie)',
    famille: 'Menuiseries extérieures',
    definition:
      'Joints entre menuiserie et mur (silicone 1re catégorie sur fond BUTYL, Compriband…) pour étanchéité eau et air.',
    vigilance: 'Le lot menuiseries assure le calfeutrement — les réservations maçonnées relèvent du GO.',
  },
  {
    id: 'etancheite-air-4-faces',
    terme: 'Étanchéité à l\'air 4 faces',
    famille: 'Menuiseries extérieures',
    definition:
      'Traitement périphérique renforcé autour de chaque menuiserie, en plus du Compriband — si exigé par la MOE.',
  },
  {
    id: 'scellement-menuiseries',
    terme: 'Scellement des menuiseries',
    famille: 'Menuiseries extérieures',
    definition:
      'Fixation du dormant au gros œuvre (équerres galvanisées…) — à la charge du lot menuiseries sur ce marché.',
  },
  {
    id: 'releve-cotes-menuiseries',
    terme: 'Relevé de cotes sur place',
    famille: 'Menuiseries extérieures',
    definition:
      'Avant fabrication : mesurer les baies réelles sur chantier — les dimensions du CCTP sont indicatives.',
    aQuoiCaSert: 'Toujours relever sur place plutôt que fabriquer « au plan » aveuglément.',
  },
  {
    id: 'dtu-36-5',
    terme: 'DTU 36.5',
    famille: 'Menuiseries extérieures',
    definition: 'DTU de mise en œuvre des fenêtres et portes extérieures — bois, PVC, alu, mixte.',
  },
  {
    id: 'affaiblissement-acoustique-menuiserie',
    terme: 'Affaiblissement acoustique (menuiserie)',
    famille: 'Menuiseries extérieures',
    definition: 'Capacité de la menuiserie à réduire le bruit extérieur.',
    exemple: 'Sur ce marché : 30 dB (façade) et R = 31 dB sur fenêtres logements.',
  },
  {
    id: 'seuil-pmr-menuiserie',
    terme: 'Seuil PMR',
    famille: 'Menuiseries extérieures',
    definition:
      'Seuil de porte adapté personnes à mobilité réduite — plat, avec drainage sur portes-fenêtres.',
    exemple: 'Passage libre 90 cm minimum sur portes de SAS.',
  },
  {
    id: 'double-vitrage-faible-emissivite',
    terme: 'Double vitrage faiblement émissif',
    famille: 'Menuiseries extérieures',
    definition: 'Vitrage isolant avec couche basse émissivité (e < 0,05) pour limiter les déperditions.',
  },
  {
    id: 'cremone-3-points',
    terme: 'Crémone 3 points',
    famille: 'Menuiseries extérieures',
    definition: 'Fermeture encastrée avec 3 points d\'accrochage — sécurité et étanchéité sur PVC logements.',
  },
  {
    id: 'compriband-appui',
    terme: 'Compriband (appui de fenêtre)',
    famille: 'Menuiseries extérieures',
    definition:
      'Joint pré-comprimé sous bavette d\'appui — étanche aux eaux de pluie et condensation.',
  },
  {
    id: 'volet-roulant-thermobloc',
    terme: 'Volet roulant motorisé (Thermobloc)',
    famille: 'Menuiseries extérieures',
    definition:
      'Bloc monobloc menuiserie + coffre VR motorisé — lames alu, isolation coffre Uc ≤ 1,1 W/m²·K.',
  },
  {
    id: 'barre-anti-soulevement',
    terme: 'Barre anti-soulèvement',
    famille: 'Menuiseries extérieures',
    definition: 'Dispositif anti-effraction en RDC — obligatoire sur fenêtres et PF équipées de VR.',
  },
  {
    id: 'grille-entree-air-menuiserie',
    terme: 'Grille d\'entrée d\'air (menuiserie)',
    famille: 'Menuiseries extérieures',
    definition:
      'Mortaise et pose dans menuiserie ou coffre VR — grille fournie par le lot VMC, pose par menuisier.',
  },
  {
    id: 'vitrage-satinovo-stadip',
    terme: 'Vitrage Satinovo / Stadip Protect',
    famille: 'Menuiseries extérieures',
    definition:
      'Satinovo = opaque lumière pour SdB/WC · Stadip Protect = anti-effraction RDC sans volet roulant.',
  },
  {
    id: 'porte-entree-collectif-alu',
    terme: 'Porte d\'entrée d\'immeuble (alu)',
    famille: 'Menuiseries extérieures',
    definition:
      'Porte renforcée alu RTI, ventouses, ferme-porte force 3, seuil PMR, vitrage CEKAL — accès bâtiments collectifs.',
  },
];
