import type { TermeLexique } from './lexique-btp';

/**
 * Lexique complémentaire — fiche révision débutant « Comprendre les 4 lots — Millas Nord ».
 * Vocabulaire transversal du DCE (38 logements, Créon) et pièges CCTP propres au projet.
 */
export const LEXIQUE_MILLAS_NORD: TermeLexique[] = [
  {
    id: 'millas-nord-operation',
    terme: 'Opération Millas Nord',
    famille: 'Documents du marché',
    definition:
      '38 logements individuels et collectifs à Créon (33), maître d\'ouvrage Gironde Habitat — phase DCE (consultation entreprises).',
    aQuoiCaSert:
      'Projet de référence pour illustrer les 4 lots CCTP : gros œuvre, enduit, charpente-couverture, menuiseries extérieures.',
    exemple: 'Lots 01 à 04, chacun avec son CCTP et ses interfaces.',
  },
  {
    id: 'cctp-plans-solution-contraignante',
    terme: 'CCTP + plans = un tout',
    famille: 'Documents du marché',
    definition:
      'Le CCTP et les plans de l\'architecte forment un ensemble indissociable : ce qui est dessiné mais pas écrit (et inversement) reste dû.',
    vigilance:
      'C\'est toujours la solution la plus contraignante qui s\'applique — une lecture incomplète = travaux non chiffrés à faire gratuitement.',
  },
  {
    id: 'plancher-porte-vide-air',
    terme: 'Plancher porté sur vide d\'air',
    famille: 'Planchers & structures horizontales',
    definition:
      'Plancher bas qui ne repose pas sur la terre mais sur les fondations, avec un vide d\'air dessous (coffrage perdu biodégradable en carton nid d\'abeilles).',
    aQuoiCaSert: 'Évite l\'humidité remontante et isole le rez-de-chaussée.',
    exemple: 'Sur Millas Nord : isolation sous vide d\'air R = 4,10 (14 cm).',
  },
  {
    id: 'classe-exposition-xa2',
    terme: 'Classe d\'exposition XA2',
    famille: 'Béton & aciers',
    definition:
      'Sol contenant des eaux agressives pour le béton — les ouvrages enterrés doivent être plus résistants (ex. C35/45) avec hydrofuge de masse.',
    aQuoiCaSert: 'Imposée par l\'étude de sol, pas par l\'entreprise.',
    exemple: 'Cas Créon / Millas Nord : fondations en béton renforcé.',
  },
  {
    id: 'trait-anti-termites-creon',
    terme: 'Traitement anti-termites (Créon)',
    famille: 'Terrassement & géotechnique',
    definition:
      'Film anti-termites posé sur les fondations, en complément de l\'arase étanche, sur la zone Créon.',
    aQuoiCaSert: 'Bloquer l\'attaque des termites dans les zones à risque.',
  },
  {
    id: 'passage-camera-assainissement',
    terme: 'Passage caméra (assainissement)',
    famille: 'Réseaux & lots techniques',
    definition:
      'Inspection vidéo des canalisations PVC sous dalle (EU, EV, EP séparées) avant coulage — avec essais d\'étanchéité et regards aux changements de direction.',
    vigilance: 'Couler la dalle sans contrôle caméra = risque de fuite invisible sous le bâtiment.',
  },
  {
    id: 'plans-exe-entreprise',
    terme: 'Plans d\'exécution (EXE)',
    famille: 'Études & conception',
    definition:
      'Plans détaillés dessinés par l\'entreprise à ses frais à partir des plans BET — à faire viser par le bureau de contrôle (DEKRA) avant tout coulage.',
    vigilance: 'Les plans du BET structure ne sont PAS des plans d\'exécution.',
  },
  {
    id: 'reception-supports-ecrite',
    terme: 'Réception écrite des supports',
    famille: 'Enduits & façades',
    definition:
      'PV formel du façadier constatant l\'état des murs livrés par le gros œuvre avant enduit.',
    vigilance:
      'Sans réception écrite, les supports sont réputés acceptés — leurs défauts deviennent le problème du façadier.',
  },
  {
    id: 'conditions-meteo-enduit',
    terme: 'Conditions météo enduit (+5 à +30 °C)',
    famille: 'Enduits & façades',
    definition:
      'Application interdite sous +5 °C, au-dessus de +30 °C, par pluie, brouillard, sur support gelé ou desséché, ou par vent sec.',
    exemple: 'En cas de vent ou soleil : bâche humidifiée sur l\'échafaudage.',
  },
  {
    id: 'entraxe-fermettes-60',
    terme: 'Entraxe fermettes 60 cm',
    famille: 'Charpente & couverture',
    definition:
      'Fermes en W en sapin traité classe 2, assemblées par connecteurs métalliques, posées au maximum tous les 60 cm.',
    aQuoiCaSert: 'Combles perdus (non aménageables) — aucune fermette au-dessus d\'une trappe d\'accès.',
    exemple: 'Maisons et collectifs A et B de Millas Nord.',
  },
  {
    id: 'variantes-exigees-lot03',
    terme: '3 variantes exigées (lot 03)',
    famille: 'Documents du marché',
    definition:
      'Variantes obligatoires à chiffrer sur Millas Nord : fermettes industrielles pour carports, fermettes pour celliers, suppression du film sous-toiture partout sauf maison I (logement 36, photovoltaïque).',
    vigilance: 'À lire avant de chiffrer — la variante film sous-toiture date du 15/02/2026.',
  },
  {
    id: 'kit-photovoltaique-logement36',
    terme: 'Kit photovoltaïque logement 36',
    famille: 'Charpente & couverture',
    definition:
      '8 tuiles photovoltaïques de 100 Wc en autoconsommation, onduleur Enphase — uniquement sur la maison logement 36 (maison I).',
    aQuoiCaSert: 'Conserve le film sous-toiture sur cette toiture pour les tuiles PV intégrées.',
  },
  {
    id: 'nomenclature-indicative',
    terme: 'Nomenclature indicative',
    famille: 'Menuiseries extérieures',
    definition:
      'Tableau de quantitatifs menuiseries du CCTP : les quantités sont indicatives, l\'entreprise s\'engage sur ses propres quantités relevées.',
    vigilance: 'Une baie oubliée reste due — fabriquer sans relevé de cotes sur place = fenêtres qui ne rentrent pas.',
  },
  {
    id: 'uw-millas-14',
    terme: 'Uw ≈ 1,4 (Millas Nord)',
    famille: 'Menuiseries extérieures',
    definition:
      'Coefficient de transmission thermique des fenêtres PVC blanc du projet — double vitrage faiblement émissif, crémone 3 points.',
    aQuoiCaSert: 'Valeur impérative de l\'étude thermique — avis techniques à fournir.',
    exemple: 'Affaiblissement acoustique de façade : 30 dB.',
  },
  {
    id: 'balevre-beton',
    terme: 'Balèvre',
    famille: 'Finitions béton',
    definition:
      'Petit défaut de coulage visible sur un parement béton décoffré — à poncer ou ragréer.',
    aQuoiCaSert: 'Qualité d\'aspect du béton visible (parement soigné, courant ou fin).',
  },
  {
    id: 'doe-six-exemplaires',
    terme: 'DOE (6 exemplaires + reproductible)',
    famille: 'Réception & garanties',
    definition:
      'Dossier des Ouvrages Exécutés remis en fin de chantier — sur Millas Nord : 6 exemplaires + version reproductible au lot 01.',
    aQuoiCaSert: 'Carte d\'identité du bâtiment : fiches techniques, PV d\'essais, plans EXE visés.',
  },
];
