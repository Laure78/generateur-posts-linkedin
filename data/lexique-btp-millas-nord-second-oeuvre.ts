import type { TermeLexique } from './lexique-btp';

/**
 * Lexique complémentaire — fiche révision débutant « Comprendre les lots 5 à 16 — Millas Nord ».
 * Second œuvre, lots techniques, VRD, paysage et démolition-désamiantage.
 */
export const LEXIQUE_MILLAS_NORD_SECOND_OEUVRE: TermeLexique[] = [
  {
    id: 'second-oeuvre-millas',
    terme: 'Second œuvre (Millas Nord)',
    famille: 'Préparation & exécution',
    definition:
      'Lots qui interviennent après le clos-couvert (lots 1 à 4) : menuiseries intérieures, cloisons, fluides, revêtements, peinture, VRD et paysage.',
    aQuoiCaSert:
      'Habiller et équiper les volumes livrés bruts — coordination serrée entre lots 05 à 15.',
    exemple: 'Lot 16 (démolition-désamiantage) intervient en réalité tout au début du chantier.',
  },
  {
    id: 'bloc-porte-millas',
    terme: 'Bloc-porte',
    famille: 'Divers techniques',
    definition:
      'Ensemble huisserie (cadre fixé dans le mur) + vantail (partie qui pivote).',
    exemple:
      'Entrée maison : blindée 38 dB, A2P*, PF 1/4h. Palière collectif : ISOBLINDE EI 30, 39 dB.',
  },
  {
    id: 'detalonnage-vmc',
    terme: 'Détalonnage (15 mm)',
    famille: 'Réseaux & lots techniques',
    definition:
      'Jeu laissé sous une porte de distribution en partie basse pour laisser circuler l\'air neuf vers la VMC.',
    aQuoiCaSert: 'Complète les entrées d\'air des menuiseries extérieures (lot 04).',
  },
  {
    id: 'organigramme-cles',
    terme: 'Organigramme des clés',
    famille: 'Suivi de chantier',
    definition:
      'Hiérarchie des clés d\'un bâtiment : passe général, passes partiels, clés individuelles — cylindres provisoires puis définitifs.',
  },
  {
    id: 'garde-corps-nf-p01',
    terme: 'Garde-corps (NF P01-012/013)',
    famille: 'Sécurité & prévention',
    definition:
      'Barrière anti-chute : hauteur 1,01 m en tout point, barreaudage vertical espacé de 10 cm maximum — dimensionnement justifié par calcul.',
    exemple: 'Lot 06 Serrurerie — galvanisation + thermolaquage QUALIMARINE en extérieur.',
  },
  {
    id: 'thermolaquage-qualimarine',
    terme: 'Thermolaquage QUALIMARINE',
    famille: 'Certifications',
    definition:
      'Peinture cuite au four sur métal — label QUALIMARINE pour ambiance quasi-marine (zone proche Bordeaux).',
    aQuoiCaSert: 'Protection anticorrosion des ouvrages métalliques extérieurs.',
  },
  {
    id: 'doublage-thermique-platrerie',
    terme: 'Doublage thermique',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Complexe isolant posé contre un mur par l\'intérieur (ex. laine minérale sur ossature 60+10) — résistance R selon l\'étude thermique.',
  },
  {
    id: 'cloison-distribution-ba13',
    terme: 'Cloison de distribution',
    famille: 'Divers techniques',
    definition:
      'Cloison légère en plaques BA13 vissées sur ossature métallique (48 / 72 / 98 mm) avec laine — sépare et isole acoustiquement les pièces.',
  },
  {
    id: 'plaque-hydrofuge',
    terme: 'Plaque hydrofuge',
    famille: 'Divers techniques',
    definition:
      'Plaque de plâtre résistante à l\'eau (repérée bleu ou vert) — obligatoire en salles d\'eau et WC.',
    vigilance: 'Plaque standard en pièce humide = moisissures.',
  },
  {
    id: 'etancheite-air-re2020',
    terme: 'Étanchéité à l\'air (RE2020)',
    famille: 'Performance énergétique & contrôles',
    definition:
      'Membranes et adhésifs aux points singuliers, trappes de combles étanches — condition du test d\'infiltrométrie.',
    aQuoiCaSert: 'Lot 07 Plâtrerie + lot 04 Menuiseries extérieures — coordination critique.',
  },
  {
    id: 'pac-double-service',
    terme: 'PAC double service',
    famille: 'Réseaux & lots techniques',
    definition:
      'Pompe à chaleur air/eau assurant chauffage et eau chaude sanitaire — solution des maisons individuelles Millas Nord.',
    exemple: 'Collectifs : ballon thermodynamique (CET) + chauffage électrique.',
  },
  {
    id: 'ballon-thermodynamique-cet',
    terme: 'Ballon thermodynamique (CET)',
    famille: 'Réseaux & lots techniques',
    definition:
      'Chauffe-eau thermodynamique qui puise la chaleur de l\'air ambiant — production ECS des logements collectifs.',
  },
  {
    id: 'vmc-hygroreglable',
    terme: 'VMC hygroréglable',
    famille: 'Réseaux & lots techniques',
    definition:
      'Ventilation mécanique contrôlée simple flux dont le débit s\'adapte à l\'humidité — extraction en pièces humides, air neuf par les menuiseries.',
  },
  {
    id: 'eu-ev-reseaux',
    terme: 'EU / EV (évacuations)',
    famille: 'Réseaux & lots techniques',
    definition:
      'Eaux Usées (lavabos, douches, éviers) et Eaux Vannes (WC) — réseaux séparés avec ventilation primaire des chutes.',
    vigilance: 'Essais d\'étanchéité avant fermeture des cloisons.',
  },
  {
    id: 'gtl-linky',
    terme: 'GTL et compteur Linky',
    famille: 'Réseaux & lots techniques',
    definition:
      'Gaine Technique Logement : cœur électrique du logement (tableau, arrivées). Linky = compteur communicant Enedis.',
  },
  {
    id: 'cfo-cfa',
    terme: 'CFO / CFA',
    famille: 'Réseaux & lots techniques',
    definition:
      'Courants Forts (énergie : prises, éclairage, tableau) et Courants Faibles (information : TV, RJ45, fibre, téléphone).',
    aQuoiCaSert: 'Lot 09 — norme NF C 15-100 pour la protection des personnes.',
  },
  {
    id: 'differentiel-type-a',
    terme: 'Différentiel type A',
    famille: 'Sécurité & prévention',
    definition:
      'Dispositif qui coupe le courant en cas de fuite — type A pour les circuits sensibles (salle de bains, PAC).',
  },
  {
    id: 'consuel',
    terme: 'Consuel',
    famille: 'Réception & garanties',
    definition:
      'Attestation de conformité électrique obligatoire avant mise en service de l\'installation.',
    exemple: 'Requis aussi pour le dossier photovoltaïque de la maison 36.',
  },
  {
    id: 'chape-flottante-resilient',
    terme: 'Chape flottante',
    famille: 'Sols & revêtements',
    definition:
      'Chape posée sur un résilient acoustique, désolidarisée du support — coupe les bruits d\'impact entre étages.',
    exemple: 'ΔLw = réduction du bruit d\'impact en dB — traçabilité exigée.',
  },
  {
    id: 'classement-upec',
    terme: 'Classement UPEC',
    famille: 'Sols & revêtements',
    definition:
      'Usure, Poinçonnement, Eau, Chimie — niveau d\'exigence d\'un carrelage selon le local (entrée, salle de bains…).',
  },
  {
    id: 'spec-etancheite-carrelage',
    terme: 'SPEC (étanchéité sous carrelage)',
    famille: 'Sols & revêtements',
    definition:
      'Système de Protection à l\'Eau sous Carrelage — étanchéité obligatoire des pièces d\'eau avant pose du carrelage.',
  },
  {
    id: 'subjectile-peinture',
    terme: 'Subjectile (peinture)',
    famille: 'Préparation & exécution',
    definition:
      'Support à peindre (mur, bois, métal) — sa réception écrite protège le peintre des défauts des autres lots.',
    vigilance: 'Sans PV, les supports sont réputés acceptés.',
  },
  {
    id: 'reseau-separatif-eu-ep',
    terme: 'Réseau séparatif (EU / EP)',
    famille: 'Réseaux & lots techniques',
    definition:
      'Eaux usées et eaux pluviales évacuées dans deux réseaux distincts — lot 12 VRD et assainissement.',
  },
  {
    id: 'bbsg-enrobe',
    terme: 'BBSG (enrobé)',
    famille: 'Terrassement & géotechnique',
    definition:
      'Béton Bitumineux Semi-Grenu — couche de roulement de la chaussée après fond de forme compacté.',
  },
  {
    id: 'fourreau-grillage-avertisseur',
    terme: 'Fourreau / grillage avertisseur',
    famille: 'Réseaux & lots techniques',
    definition:
      'Gaine protégeant un câble enterré + grillage coloré posé au-dessus pour prévenir avant excavation.',
    vigilance: 'Lot 13 : poser AVANT les enrobés — sinon reprise de chaussée.',
  },
  {
    id: 'irve',
    terme: 'IRVE',
    famille: 'Réseaux & lots techniques',
    definition:
      'Infrastructure de Recharge de Véhicules Électriques — lot 13 réseaux secs, coordination avec fourreaux et chambres.',
  },
  {
    id: 'aep-deci',
    terme: 'AEP / DECI',
    famille: 'Réseaux & lots techniques',
    definition:
      'Adduction d\'Eau Potable et Défense Extérieure Contre l\'Incendie — lot 14, bâche 120 m³, essais de pression et désinfection.',
  },
  {
    id: 'plan-recolement',
    terme: 'Plan de récolement',
    famille: 'Documents du marché',
    definition:
      'Plan des réseaux réellement posés (EU, EP, AEP, secs) — remis en fin de chantier pour maintenance et exploitation.',
  },
  {
    id: 'garantie-reprise-paysage',
    terme: 'Garantie de reprise (paysage)',
    famille: 'Réception & garanties',
    definition:
      'L\'entreprise entretient les végétaux jusqu\'à reprise (parachèvement, confortement) — calendrier d\'entretien suivi.',
  },
  {
    id: 'plan-retrait-amiante',
    terme: 'Plan de retrait amiante',
    famille: 'Amiante & plomb',
    definition:
      'Dossier réglementaire décrivant le mode opératoire de désamiantage — notification à l\'inspection du travail avant travaux.',
    vigilance: 'Lot 16 — repérage amiante/plomb obligatoire avant démolition.',
  },
  {
    id: 'bsda-amiante',
    terme: 'BSDA',
    famille: 'Amiante & plomb',
    definition:
      'Bordereau de Suivi des Déchets d\'Amiante — traçabilité obligatoire des déchets amiantés.',
  },
  {
    id: 'controle-liberatoire-amiante',
    terme: 'Contrôle libératoire (amiante)',
    famille: 'Amiante & plomb',
    definition:
      'Mesure d\'air (empoussièrement) autorisant à lever le confinement après désamiantage.',
  },
];
