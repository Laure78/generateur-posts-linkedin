import type { TermeLexique } from './lexique-btp';

/**
 * Lexique Implantation & nivellement — fiche mémo débutant (plans architecte).
 * Complète ngf, implantation, trait-niveau (lexique GO).
 */
export const LEXIQUE_IMPLANTATION: TermeLexique[] = [
  {
    id: 'plu',
    terme: 'PLU',
    sigle: 'Plan Local d\'Urbanisme',
    famille: 'Implantation & nivellement',
    definition:
      'Règlement communal qui impose reculs par rapport à la voie, distances aux limites séparatives et hauteur maximale du bâtiment.',
    aQuoiCaSert: 'Le permis de construire applique ces règles sur le plan masse.',
    exemple: 'Recul de 5 m par rapport à la rue, hauteur max R+2.',
  },
  {
    id: 'permis-construire',
    terme: 'Permis de construire',
    sigle: 'PC',
    famille: 'Implantation & nivellement',
    definition:
      'Autorisation délivrée par la mairie. Son plan masse fixe les distances exactes à la rue et aux voisins, et la cote NGF du sol fini.',
    vigilance: 'C\'est la règle du jeu sur le terrain — non négociable.',
  },
  {
    id: 'plan-masse',
    terme: 'Plan masse',
    famille: 'Implantation & nivellement',
    definition:
      'Document du permis de construire montrant l\'emprise du bâtiment sur la parcelle (position et niveaux).',
    aQuoiCaSert: 'Référence pour l\'implantation géomètre et le contrôle mairie.',
  },
  {
    id: 'etude-sol-g2',
    terme: 'Étude de sol G2',
    famille: 'Implantation & nivellement',
    definition:
      'Étude géotechnique de conception : décrit ce qu\'il y a sous le terrain et la profondeur des fondations (hors gel 60 à 90 cm en Île-de-France).',
    aQuoiCaSert: 'Valide la profondeur de terrassement avant coulage des fondations.',
  },
  {
    id: 'cadastre',
    terme: 'Cadastre',
    famille: 'Implantation & nivellement',
    definition: 'Plan fiscal des parcelles — utile pour identifier un terrain, mais pas assez précis pour implanter.',
    vigilance: 'Seules les bornes posées par un géomètre-expert font foi, pas le cadastre.',
  },
  {
    id: 'planimetrie',
    terme: 'Planimétrie',
    famille: 'Implantation & nivellement',
    definition: 'Le « où » du bâtiment, vu du dessus : position sur la parcelle par rapport aux bornes et aux limites.',
    exemple: 'Distance du mur au alignement, recul par rapport à la limite séparative.',
  },
  {
    id: 'altimetrie',
    terme: 'Altimétrie',
    famille: 'Implantation & nivellement',
    definition: 'La hauteur du bâtiment : niveau du sol fini, fond de fouille, arase des fondations — en cotes NGF.',
    exemple: 'Sol fini RDC = 42,50 m NGF.',
  },
  {
    id: 'reper-ngf-chantier',
    terme: 'Repère NGF chantier',
    famille: 'Implantation & nivellement',
    definition:
      'Point matérialisé et protégé sur le chantier, reporté depuis un repère NGF officiel (mairie, pont…). Toutes les hauteurs en découlent.',
    vigilance: 'Ne jamais le déplacer ni le recouvrir — c\'est la référence de tout le chantier.',
  },
  {
    id: 'alignement-voirie',
    terme: 'Alignement',
    famille: 'Implantation & nivellement',
    definition: 'Limite officielle entre la parcelle et la voie publique.',
    aQuoiCaSert: 'Le recul PLU se mesure depuis cette ligne, pas au jugé.',
    vigilance: 'À demander à la mairie (arrêté d\'alignement) — on ne la devine pas.',
  },
  {
    id: 'bornage',
    terme: 'Bornage',
    famille: 'Implantation & nivellement',
    definition:
      'Opération par géomètre-expert pour retrouver ou poser les bornes des limites entre parcelles voisines.',
    vigilance: 'Empiéter de 20 cm chez le voisin = contentieux garanti.',
  },
  {
    id: 'pv-implantation',
    terme: 'PV d\'implantation',
    famille: 'Implantation & nivellement',
    definition:
      'Procès-verbal signé par le géomètre après pose des piquets aux angles du bâtiment. Sa responsabilité est engagée.',
    aQuoiCaSert: 'Trace écrite de la position officielle avant terrassement.',
  },
  {
    id: 'chaises-implantation',
    terme: 'Chaises d\'implantation',
    famille: 'Implantation & nivellement',
    definition:
      'Deux piquets + une planche horizontale, posés en retrait de 1,50 à 2 m de la fouille, dans le prolongement de chaque axe du bâtiment.',
    aQuoiCaSert: 'Conservent les axes quand les piquets d\'angle disparaissent au terrassement. Un clou sur la planche marque l\'axe.',
  },
  {
    id: 'cordeaux-implantation',
    terme: 'Cordeaux d\'implantation',
    famille: 'Implantation & nivellement',
    definition: 'Fils tendus entre chaises opposées. Le croisement de deux cordeaux redonne un angle du bâtiment à tout moment.',
    exemple: 'Fil à plomb au croisement pour reporter le point au fond de la fouille.',
  },
  {
    id: 'equerrage-3-4-5',
    terme: 'Triangle 3-4-5',
    famille: 'Implantation & nivellement',
    definition:
      'Méthode d\'équerrage : côtés de 3 m et 4 m, diagonale de 5 m = angle droit parfait.',
    aQuoiCaSert: 'Contrôle d\'équerrage sur le terrain sans instrument sophistiqué.',
  },
  {
    id: 'controle-diagonales',
    terme: 'Contrôle des diagonales',
    famille: 'Implantation & nivellement',
    definition: 'Vérification que le rectangle du bâtiment est bien d\'équerre : les deux diagonales doivent être égales.',
    exemple: 'Tolérance courante : ± 1 à 2 cm.',
  },
  {
    id: 'emprise-fouilles',
    terme: 'Emprise des fouilles',
    famille: 'Implantation & nivellement',
    definition:
      'Tracé au sol (bombe de peinture) de la zone à creuser : largeur semelle + surlargeur de travail.',
    aQuoiCaSert: 'Guide le terrassement à la profondeur validée par l\'étude de sol.',
  },
];
