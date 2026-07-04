import type { TermeLexique } from './lexique-btp';

/** Lexique Famille 22 — Performance énergétique et contrôles techniques. */
export const LEXIQUE_PERF_ENERGETIQUE: TermeLexique[] = [
  {
    id: 'q4pa-surf',
    terme: 'Q4Pa-surf',
    sigle: 'Perméabilité à l\'air de surface',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Indicateur réglementaire mesurant la quantité d\'air qui s\'échappe involontairement du bâtiment (fissures, menuiseries mal posées, traversées mal étanchées).',
    aQuoiCaSert:
      'Vérifier l\'étanchéité à l\'air pour limiter les déperditions de chauffage, l\'humidité et les factures d\'énergie.',
    exemple: 'Seuil courant sur marché : 1,00 m³/h·m² sous 4 Pa.',
  },
  {
    id: 'permeabilite-air-4pa',
    terme: 'Test à 4 Pa',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Mesure sous une légère surpression/depression simulant une brise de ~9 km/h — référence pour le Q4Pa-surf.',
  },
  {
    id: 'infiltrometrie',
    terme: 'Infiltrométrie (test ventilateur)',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Contrôle par ventilateur : on mesure les fuites d\'air du bâtiment pour valider la perméabilité à l\'air.',
  },
  {
    id: 'test-perm-air-clos-couvert',
    terme: 'Test perméabilité au clos-couvert',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Premier test d\'infiltrométrie dès que murs, toiture et menuiseries extérieures sont posés — pour corriger les fuites avant finitions.',
    vigilance: 'Échec = réparation sous 5 jours ouvrés + nouveau test aux frais de l\'entreprise responsable.',
  },
  {
    id: 'test-perm-air-achevement',
    terme: 'Test perméabilité à l\'achèvement',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Second test en fin de travaux pour valider la conformité finale du bâtiment.',
  },
  {
    id: 'schema-fluide',
    terme: 'Schéma fluide',
    sigle: 'Schéma fluidique / hydraulique',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Plan technique simplifié montrant la circulation des liquides et gaz (lignes colorées, symboles normalisés) sans détail de maçonnerie.',
    aQuoiCaSert:
      'Carte routière pour installateurs et ingénieurs : enchaînement production → distribution → points d\'usage.',
  },
  {
    id: 'reseau-eau-sanitaire-schema',
    terme: 'Réseau eau sanitaire (schéma)',
    famille: 'Performance énergétique & contrôles',
    definition: 'Parcours de l\'eau froide et chaude vers douches, éviers et WC.',
  },
  {
    id: 'reseau-chauffage-clim-schema',
    terme: 'Réseau chauffage / climatisation (schéma)',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Circuit fermé entre production (chaudière, PAC) et émetteurs (radiateurs, plancher chauffant, splits).',
  },
  {
    id: 'vmc-ventilation-schema',
    terme: 'Réseau ventilation VMC (schéma)',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Gaines aspirant l\'air pollué des pièces humides et soufflant l\'air neuf — lié aux exigences RE2020.',
  },
  {
    id: 'lot-mep',
    terme: 'Lot MEP',
    sigle: 'Mechanical, Electrical, Plumbing',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Regroupement des lots techniques : mécanique (CVC/VMC), électricité et plomberie — tout ce qui circule dans le bâtiment.',
    aQuoiCaSert: 'Coordonner les entreprises qui apportent eau, courant et air au bâtiment.',
  },
  {
    id: 'reservation-reseaux',
    terme: 'Réservation (réseaux)',
    sigle: 'Trou de réservation',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Ouverture laissée volontairement dans béton ou cloison pour passage des tuyaux, gaines ou conduits — sans casser la structure ensuite.',
    exemple: 'Moule en polystyrène ou bois dans le coffrage, retiré après prise du béton.',
  },
  {
    id: 'macon-reservation-beton',
    terme: 'Maçon & réservations',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Le GO coule le béton en laissant les réservations prévues au schéma fluide — sinon perçage au marteau-piqueur, structure fragilisée.',
    vigilance: 'Sans schéma fluide à temps, le béton coule partout et les reprises coûtent très cher.',
  },
  {
    id: 'electricien-mep',
    terme: 'Électricien & schémas fluides',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Alimente PAC, VMC, ballons — et évite tableaux/prises sous une canalisation d\'eau (fuite = risque électrique).',
  },
  {
    id: 'plaquiste-gaines-etancheite',
    terme: 'Plaquiste & étanchéité à l\'air',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Coffre les réseaux en gaines/placo et soigne les joints aux traversées de tuyaux — impact direct sur Q4Pa-surf.',
  },
  {
    id: 'terrassier-vrd-raccordement',
    terme: 'Terrassier / VRD & raccordement',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Tranchées extérieures : branchement eau potable et évacuation EU sur le réseau public selon le schéma fluide.',
  },
  {
    id: 'nourrice-collecteur',
    terme: 'Nourrice / collecteur',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Point de distribution des fluides (eau, chauffage) — position vérifiée sur schéma fluide par le conducteur de travaux.',
  },
];
