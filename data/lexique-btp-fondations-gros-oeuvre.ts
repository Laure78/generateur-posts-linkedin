import type { TermeLexique } from './lexique-btp';

/**
 * Lexique Fondations & Gros œuvre — issu d'un CCTP Lot 01 (logements collectifs).
 * Complète le lexique général pour le quiz et le dictionnaire BeWork.
 */
export const LEXIQUE_FONDATIONS_GROS_OEUVRE: TermeLexique[] = [
  // ── Acteurs (compléments) ──
  {
    id: 'architecte',
    terme: 'Architecte',
    famille: 'Acteurs & organisation',
    definition:
      "Concepteur du projet : dessine les plans, définit les volumes et l'esthétique. Ses plans sont prioritaires pour la définition architecturale.",
  },
  {
    id: 'geometre',
    terme: 'Géomètre',
    famille: 'Acteurs & organisation',
    definition:
      "Professionnel qui mesure et positionne : implantation du bâtiment, niveaux, limites de terrain.",
  },
  {
    id: 'corps-etat',
    terme: 'Corps d\'état',
    famille: 'Acteurs & organisation',
    definition: 'Un métier du bâtiment : gros œuvre, électricité, plomberie, peinture…',
    exemple: 'TCE = Tous Corps d\'État.',
  },
  {
    id: 'concessionnaires-reseaux',
    terme: 'Concessionnaires',
    famille: 'Acteurs & organisation',
    definition:
      'Les gestionnaires de réseaux publics : Enedis (électricité), GRDF (gaz), service des eaux.',
  },
  {
    id: 'entreprise-adjudicataire',
    terme: 'Entreprise titulaire / adjudicataire',
    famille: 'Acteurs & organisation',
    definition: "L'entreprise qui a remporté le marché pour un lot donné.",
  },

  // ── Documents (compléments GO) ──
  {
    id: 'appel-offres',
    terme: 'Appel d\'offres (AO)',
    famille: 'Documents du marché',
    definition: 'Procédure de mise en concurrence des entreprises pour attribuer un marché.',
  },
  {
    id: 'lot-marche',
    terme: 'Lot',
    famille: 'Documents du marché',
    definition: 'Découpage du marché par métier.',
    exemple: 'Lot 01 Fondations – Gros Œuvre.',
  },
  {
    id: 'marche-forfait',
    terme: 'Marché à forfait',
    sigle: 'Prix global et forfaitaire',
    famille: 'Documents du marché',
    definition:
      "L'entreprise s'engage sur un prix ferme pour un résultat complet : tout ce qui est nécessaire est dû, même non écrit (« réputé compris »).",
  },
  {
    id: 'limite-prestation',
    terme: 'Limite de prestation',
    famille: 'Documents du marché',
    definition: 'Frontière entre ce que fait un lot et ce que fait le lot voisin.',
    exemple: 'Réseaux à la charge du GO jusqu\'à 1 m des façades, ensuite lot VRD.',
  },
  {
    id: 'plans-guides',
    terme: 'Plans guides',
    famille: 'Documents du marché',
    definition:
      "Plans de principe fournis par la MOE : ils ne sont pas des plans d'exécution.",
    vigilance: 'Ne pas confondre avec les plans EXE produits par l\'entreprise.',
  },
  {
    id: 'constat-huissier',
    terme: 'Constat d\'huissier',
    famille: 'Documents du marché',
    definition:
      'État des lieux officiel (photos) des voiries et bâtiments voisins avant/après chantier, pour prouver les dégradations éventuelles.',
  },
  {
    id: 'refere-preventif',
    terme: 'Référé préventif',
    famille: 'Documents du marché',
    definition:
      "Procédure judiciaire préventive : un expert constate l'état des avoisinants avant travaux à risque.",
  },
  {
    id: 'avis-technique-atec',
    terme: 'Avis technique (ATec)',
    famille: 'Documents du marché',
    definition:
      'Évaluation officielle d\'un procédé ou produit non traditionnel, délivrée via le CSTB.',
  },

  // ── Garanties ──
  {
    id: 'garantie-biennale',
    terme: 'Garantie biennale',
    famille: 'Réception & garanties',
    definition: '2 ans après réception : couvre les équipements dissociables du bâtiment.',
  },
  {
    id: 'garantie-decennale',
    terme: 'Garantie décennale',
    famille: 'Réception & garanties',
    definition:
      '10 ans : couvre les dommages compromettant la solidité ou rendant l\'ouvrage impropre à sa destination (articles 1792 et suivants du Code civil).',
  },
  {
    id: 'compte-prorata',
    terme: 'Compte prorata',
    famille: 'Réception & garanties',
    definition:
      'Caisse commune du chantier pour les dépenses partagées (eau, électricité, nettoyage commun).',
  },
  {
    id: 'sujetions',
    terme: 'Sujétions',
    famille: 'Réception & garanties',
    definition:
      'Toutes les contraintes et difficultés d\'exécution incluses dans le prix : échafaudages, blindages, travail dans l\'eau…',
  },

  // ── Sol & fondations ──
  {
    id: 'etude-geotechnique',
    terme: 'Étude géotechnique',
    sigle: 'Étude de sol',
    famille: 'Terrassement & géotechnique',
    definition:
      'Analyse du sol pour déterminer sa capacité à porter le bâtiment. Missions : G1 (préalable), G2 AVP/PRO (conception), G3/G4 (exécution/supervision).',
  },
  {
    id: 'portance-sol',
    terme: 'Portance',
    famille: 'Terrassement & géotechnique',
    definition: 'Capacité du sol à supporter des charges sans s\'enfoncer.',
  },
  {
    id: 'fondations-superficielles',
    terme: 'Fondations superficielles',
    famille: 'Terrassement & géotechnique',
    definition:
      'Fondations peu profondes posées sur le bon sol proche : semelles, radier. S\'oppose aux fondations profondes (pieux, micropieux).',
  },
  {
    id: 'semelle-filante',
    terme: 'Semelle filante',
    famille: 'Terrassement & géotechnique',
    definition: 'Bande continue de béton armé sous un mur porteur.',
  },
  {
    id: 'semelle-isolee',
    terme: 'Semelle isolée',
    famille: 'Terrassement & géotechnique',
    definition: 'Plot de béton armé ponctuel sous un poteau.',
  },
  {
    id: 'radier',
    terme: 'Radier',
    famille: 'Terrassement & géotechnique',
    definition:
      'Dalle épaisse en béton armé couvrant toute l\'emprise, servant de fondation globale.',
  },
  {
    id: 'pieux',
    terme: 'Pieux',
    famille: 'Terrassement & géotechnique',
    definition:
      'Colonnes enfoncées profondément pour atteindre le bon sol quand la surface ne porte pas.',
  },
  {
    id: 'gros-beton',
    terme: 'Gros béton',
    famille: 'Terrassement & géotechnique',
    definition:
      'Béton non armé coulé sous les semelles pour descendre jusqu\'au bon sol (rattrapage de niveau, ancrage).',
  },
  {
    id: 'beton-proprete',
    terme: 'Béton de propreté',
    famille: 'Terrassement & géotechnique',
    definition:
      'Couche de béton maigre d\'environ 5 cm au fond de fouille : surface propre et plane pour travailler, jamais structurelle.',
  },
  {
    id: 'longrine',
    terme: 'Longrine',
    famille: 'Terrassement & géotechnique',
    definition:
      'Poutre horizontale en béton armé reliant les fondations entre elles et portant les murs ou le plancher.',
  },
  {
    id: 'libage',
    terme: 'Libage',
    famille: 'Terrassement & géotechnique',
    definition: 'Petit mur de soubassement maçonné (blocs pleins) entre les fondations et le plancher bas.',
  },
  {
    id: 'bon-sol',
    terme: 'Bon sol',
    famille: 'Terrassement & géotechnique',
    definition: 'Couche de terrain suffisamment résistante pour asseoir les fondations.',
  },
  {
    id: 'profondeur-hors-gel',
    terme: 'Hors gel',
    sigle: 'Profondeur hors gel',
    famille: 'Terrassement & géotechnique',
    definition:
      'Profondeur minimale d\'assise des fondations pour éviter les mouvements dus au gel du sol.',
  },
  {
    id: 'dallage',
    terme: 'Dallage',
    famille: 'Terrassement & géotechnique',
    definition: 'Dalle en béton coulée directement sur le sol (sur terre-plein). ≠ dalle portée.',
  },
  {
    id: 'dalle-portee',
    terme: 'Dalle portée',
    famille: 'Terrassement & géotechnique',
    definition:
      'Plancher bas qui repose sur les fondations (et non sur la terre), avec un vide d\'air dessous.',
  },
  {
    id: 'vide-sanitaire',
    terme: 'Vide sanitaire',
    famille: 'Terrassement & géotechnique',
    definition:
      "Espace d'air entre le sol naturel et le plancher bas : protège de l'humidité et permet le passage des réseaux.",
  },
  {
    id: 'coffrage-perdu-biodegradable',
    terme: 'Coffrage perdu biodégradable',
    famille: 'Terrassement & géotechnique',
    definition:
      'Coffrage en carton nid d\'abeilles laissé en place sous la dalle portée, qui se détruit naturellement en laissant un vide (sols argileux gonflants).',
    exemple: 'Biocofra, Plakasol.',
  },
  {
    id: 'arase-etanche',
    terme: 'Arase étanche',
    sigle: 'Coupure de capillarité',
    famille: 'Terrassement & géotechnique',
    definition:
      "Barrière horizontale au mortier hydrofuge, à +15 cm du sol fini, qui bloque les remontées d'humidité dans les murs.",
  },
  {
    id: 'traitement-anti-termites',
    terme: 'Traitement anti-termites',
    famille: 'Terrassement & géotechnique',
    definition:
      'Barrière physique ou chimique obligatoire en zone termites.',
    exemple: 'Film polyéthylène type Termifilm, certifié CTB-P+.',
  },
  {
    id: 'tassement-differentiel',
    terme: 'Tassement différentiel',
    famille: 'Terrassement & géotechnique',
    definition:
      'Enfoncement inégal des fondations qui provoque des fissures.',
    vigilance: "C'est le risque n°1 des fondations.",
  },
  {
    id: 'descente-charges',
    terme: 'Descente de charges',
    famille: 'Eurocodes & structure',
    definition: 'Calcul du cheminement du poids du bâtiment jusqu\'aux fondations.',
  },

  // ── Terrassement ──
  {
    id: 'terrassement',
    terme: 'Terrassement',
    famille: 'Terrassement & géotechnique',
    definition: 'Tous les travaux de creusement et de déplacement de terres.',
  },
  {
    id: 'fouille-rigole',
    terme: 'Fouille en rigole',
    famille: 'Terrassement & géotechnique',
    definition: 'Tranchée linéaire pour semelles filantes.',
  },
  {
    id: 'fouille-trou',
    terme: 'Fouille en trou / en puits',
    famille: 'Terrassement & géotechnique',
    definition: 'Excavation ponctuelle pour semelles isolées ou massifs.',
  },
  {
    id: 'fond-fouille',
    terme: 'Fond de fouille / fond de forme',
    famille: 'Terrassement & géotechnique',
    definition: "Le fond nivelé de l'excavation, prêt à recevoir l'ouvrage.",
  },
  {
    id: 'blindage',
    terme: 'Blindage',
    famille: 'Terrassement & géotechnique',
    definition:
      'Soutènement provisoire des parois de fouille pour éviter l\'effondrement (obligation sécurité).',
  },
  {
    id: 'etaiement',
    terme: 'Étaiement',
    famille: 'Terrassement & géotechnique',
    definition: 'Soutien provisoire d\'un ouvrage ou d\'une paroi pendant les travaux.',
  },
  {
    id: 'epuisement-fouille',
    terme: 'Épuisement',
    famille: 'Terrassement & géotechnique',
    definition: 'Pompage des eaux (pluie, infiltration, nappe) qui envahissent les fouilles.',
  },
  {
    id: 'rabattement-nappe',
    terme: 'Rabattement de nappe',
    famille: 'Terrassement & géotechnique',
    definition: 'Abaissement provisoire du niveau de la nappe phréatique par pompage.',
  },
  {
    id: 'remblai',
    terme: 'Remblai',
    famille: 'Terrassement & géotechnique',
    definition: 'Terres ou matériaux rapportés pour combler ou rehausser, mis en place par couches compactées.',
  },
  {
    id: 'deblai',
    terme: 'Déblai',
    famille: 'Terrassement & géotechnique',
    definition: 'Terres extraites lors du creusement.',
  },
  {
    id: 'tout-venant',
    terme: 'Tout-venant 0/31,5',
    famille: 'Terrassement & géotechnique',
    definition: 'Grave naturelle de granulométrie 0 à 31,5 mm utilisée en remblai compacté.',
  },
  {
    id: 'talus',
    terme: 'Talus',
    famille: 'Terrassement & géotechnique',
    definition: 'Pente de terrain naturelle ou taillée, à protéger de l\'érosion (polyane, caniveaux).',
  },
  {
    id: 'piquetage',
    terme: 'Piquetage',
    famille: 'Terrassement & géotechnique',
    definition: 'Marquage au sol (piquets) de la position des ouvrages ou des réseaux enterrés.',
  },
  {
    id: 'ngf',
    terme: 'NGF',
    sigle: 'Nivellement Général de la France',
    famille: 'Terrassement & géotechnique',
    definition: 'Système national de référence des altitudes. Une cote NGF = une altitude officielle.',
  },
  {
    id: 'implantation',
    terme: 'Implantation',
    famille: 'Terrassement & géotechnique',
    definition:
      'Positionnement précis du bâtiment sur le terrain (piquets, chaises d\'implantation), vérifié par géomètre.',
  },
  {
    id: 'trait-niveau',
    terme: 'Trait de niveau',
    famille: 'Terrassement & géotechnique',
    definition:
      'Repère horizontal tracé à +1 m du sol fini à chaque étage, référence pour tous les corps d\'état.',
  },

  // ── Réseaux ──
  {
    id: 'assainissement',
    terme: 'Assainissement',
    famille: 'Réseaux & lots techniques',
    definition: 'Ensemble des réseaux d\'évacuation des eaux.',
  },
  {
    id: 'eaux-vannes-ev',
    terme: 'EU / EV / EP',
    famille: 'Réseaux & lots techniques',
    definition:
      'EU = eaux usées (éviers, douches). EV = eaux vannes (WC). EP = eaux pluviales. Les trois réseaux sont séparés (réseau séparatif).',
  },
  {
    id: 'regard-assainissement',
    terme: 'Regard',
    famille: 'Réseaux & lots techniques',
    definition:
      'Boîte enterrée avec tampon d\'accès, posée à chaque changement de direction ou jonction, pour contrôle et entretien.',
  },
  {
    id: 'fil-deau',
    terme: 'Fil d\'eau',
    famille: 'Réseaux & lots techniques',
    definition: "Altitude du fond intérieur d'une canalisation : détermine la pente.",
  },
  {
    id: 'pente-minimale-assainissement',
    terme: 'Pente minimale (assainissement)',
    famille: 'Réseaux & lots techniques',
    definition: 'Inclinaison obligatoire pour l\'écoulement : 2 % pour EU/EV, 1 % pour EP (DTU 60.1).',
  },
  {
    id: 'pvc-cr4-cr8',
    terme: 'PVC CR4 / CR8',
    famille: 'Réseaux & lots techniques',
    definition:
      'Classes de rigidité des tubes PVC assainissement (CR8 = plus résistant, sous dallage ; CR4 sous dalle portée).',
  },
  {
    id: 'fourreau',
    terme: 'Fourreau',
    famille: 'Réseaux & lots techniques',
    definition:
      'Gaine tube dans laquelle passeront plus tard des câbles ou canalisations (électricité, télécom, eau, gaz).',
  },
  {
    id: 'hydrocurage',
    terme: 'Hydrocurage',
    famille: 'Réseaux & lots techniques',
    definition: 'Nettoyage des canalisations à l\'eau haute pression avant réception.',
  },
  {
    id: 'passage-camera-itv',
    terme: 'Passage caméra (ITV)',
    famille: 'Réseaux & lots techniques',
    definition:
      'Inspection vidéo des réseaux posés pour vérifier leur conformité avant de couler le plancher.',
  },
  {
    id: 'siphon-sol',
    terme: 'Siphon de sol',
    famille: 'Réseaux & lots techniques',
    definition:
      'Bouche d\'évacuation au sol avec garde d\'eau anti-odeurs.',
    exemple: 'Locaux techniques, locaux vélos.',
  },
  {
    id: 'prise-de-terre',
    terme: 'Prise de terre',
    famille: 'Réseaux & lots techniques',
    definition:
      'Liaison électrique enterrée (câble en fond de fouille) posée pendant les fondations, en coordination avec le lot électricité.',
  },
  {
    id: 'dict',
    terme: 'DICT',
    sigle: 'Déclaration d\'Intention de Commencement de Travaux',
    famille: 'Réseaux & lots techniques',
    definition:
      'Déclaration obligatoire aux gestionnaires de réseaux avant de creuser.',
  },

  // ── Béton ──
  {
    id: 'beton-arme',
    terme: 'Béton armé (BA)',
    famille: 'Béton & aciers',
    definition:
      'Béton renforcé par des armatures en acier : le béton résiste à la compression, l\'acier à la traction.',
  },
  {
    id: 'beton-precontraint',
    terme: 'Béton précontraint',
    famille: 'Béton & aciers',
    definition:
      'Béton comprimé à l\'avance par des câbles ou fils tendus : permet de plus grandes portées.',
    exemple: 'Prédalles précontraintes, longrines précontraintes.',
  },
  {
    id: 'bps-beton',
    terme: 'BPS',
    sigle: 'Béton à Propriétés Spécifiées',
    famille: 'Béton & aciers',
    definition:
      'Béton de centrale certifiée NF, commandé par ses performances (norme NF EN 206). Obligatoire sur les chantiers sérieux.',
  },
  {
    id: 'hydrofuge-masse',
    terme: 'Hydrofuge de masse',
    famille: 'Béton & aciers',
    definition: 'Adjuvant incorporé au béton pour le rendre imperméable dans la masse (ouvrages enterrés).',
  },
  {
    id: 'adjuvant-beton',
    terme: 'Adjuvant',
    famille: 'Béton & aciers',
    definition:
      'Produit ajouté au béton pour modifier ses propriétés : plastifiant, accélérateur ou retardateur de prise, entraîneur d\'air.',
  },
  {
    id: 'mortier',
    terme: 'Mortier',
    famille: 'Béton & aciers',
    definition:
      'Mélange ciment + sable + eau (sans gravillons) : pour hourder, sceller, faire des chapes.',
    exemple: 'Mortier hydrofuge dosé fort (500-600 kg/m³) avec adjuvant anti-eau.',
  },
  {
    id: 'reprise-betonnage',
    terme: 'Reprise de bétonnage',
    famille: 'Béton & aciers',
    definition:
      'Jonction entre deux coulages successifs : surface repiquée, nettoyée, humidifiée pour assurer l\'adhérence.',
  },
  {
    id: 'cure-beton',
    terme: 'Cure',
    famille: 'Béton & aciers',
    definition:
      'Protection du béton frais (arrosage par temps sec, couverture par temps de gel) pendant la prise.',
  },
  {
    id: 'eprouvette-beton',
    terme: 'Éprouvette',
    famille: 'Béton & aciers',
    definition:
      'Échantillon de béton prélevé au coulage et écrasé en laboratoire pour vérifier la résistance.',
  },
  {
    id: 'sclereometrie',
    terme: 'Sclérométrie',
    famille: 'Béton & aciers',
    definition:
      'Contrôle non destructif de la résistance du béton en place (marteau à rebond).',
  },
  {
    id: 'treillis-soude',
    terme: 'Treillis soudé (TS)',
    famille: 'Béton & aciers',
    definition: 'Nappe d\'acier quadrillée préfabriquée, utilisée dans les dalles et dallages.',
  },
  {
    id: 'enrobage',
    terme: 'Enrobage',
    famille: 'Béton & aciers',
    definition:
      'Épaisseur de béton entre l\'acier et la surface : protège de la corrosion et du feu.',
    exemple: '3 cm en élévation, 5 cm en fondations.',
  },
  {
    id: 'coffrage',
    terme: 'Coffrage',
    famille: 'Béton & aciers',
    definition: 'Le moule (bois, métal) dans lequel on coule le béton.',
  },
  {
    id: 'banche',
    terme: 'Banche',
    famille: 'Béton & aciers',
    definition: 'Grand coffrage métallique vertical pour couler les murs (voiles).',
  },
  {
    id: 'decoffrage',
    terme: 'Décoffrage',
    famille: 'Béton & aciers',
    definition: 'Retrait du moule une fois le béton suffisamment dur.',
  },

  // ── Structure GO ──
  {
    id: 'gros-oeuvre',
    terme: 'Gros œuvre (GO)',
    famille: 'Béton & aciers',
    definition:
      'Tout ce qui assure la solidité et la stabilité : fondations, murs porteurs, planchers, escaliers. S\'oppose au second œuvre.',
  },
  {
    id: 'mur-porteur',
    terme: 'Mur porteur',
    famille: 'Béton & aciers',
    definition: 'Mur qui supporte les charges du bâtiment.',
  },
  {
    id: 'voile-beton-banche',
    terme: 'Voile (béton banché)',
    famille: 'Béton & aciers',
    definition: 'Mur en béton armé coulé entre banches.',
  },
  {
    id: 'trumeau',
    terme: 'Trumeau',
    famille: 'Béton & aciers',
    definition: 'Portion de mur entre deux ouvertures.',
    vigilance: 'Trumeau porteur < 80 cm = obligatoirement en béton (DTU 20.1).',
  },
  {
    id: 'parpaing-agglos',
    terme: 'Agglo / parpaing',
    famille: 'Béton & aciers',
    definition:
      'Bloc de maçonnerie en béton, creux (courant) ou plein/perforé (plus résistant). Certifié NF.',
  },
  {
    id: 'chainage',
    terme: 'Chaînage',
    famille: 'Béton & aciers',
    definition:
      'Ceinture en béton armé (horizontale ou verticale) qui solidarise la maçonnerie et évite la fissuration.',
  },
  {
    id: 'predalle',
    terme: 'Prédalle',
    famille: 'Béton & aciers',
    definition:
      'Fond de plancher préfabriqué en usine (souvent précontraint), complété par une dalle de compression coulée sur place.',
  },
  {
    id: 'dalle-compression',
    terme: 'Dalle de compression',
    famille: 'Béton & aciers',
    definition:
      'Couche de béton coulée sur les prédalles ou entrevous, qui solidarise le plancher.',
  },
  {
    id: 'porte-a-faux',
    terme: 'Porte-à-faux',
    famille: 'Béton & aciers',
    definition: 'Partie d\'ouvrage en saillie sans appui dessous.',
    exemple: 'Un balcon.',
  },
  {
    id: 'acrotere',
    terme: 'Acrotère',
    famille: 'Béton & aciers',
    definition:
      'Muret en béton en périphérie d\'une toiture-terrasse, support des relevés d\'étanchéité.',
  },
  {
    id: 'reservation-tremie',
    terme: 'Réservation / trémie',
    famille: 'Béton & aciers',
    definition:
      'Vide prévu à l\'avance dans le béton pour le passage des autres corps d\'état. Trémie = grande réservation (escalier, gaine).',
  },
  {
    id: 'arase',
    terme: 'Arase',
    famille: 'Béton & aciers',
    definition: 'Niveau supérieur fini d\'un ouvrage. « Araser » = mettre à niveau.',
  },
  {
    id: 'aplomb',
    terme: 'Aplomb',
    famille: 'Béton & aciers',
    definition: 'Verticalité parfaite. « Faux aplomb » = défaut de verticalité.',
  },
  {
    id: 'planeite',
    terme: 'Planéité',
    famille: 'Béton & aciers',
    definition:
      'Régularité d\'une surface, contrôlée à la règle de 2 m.',
    exemple: 'Tolérance 5 mm sous la règle de 2 m.',
  },
  {
    id: 'chape-sol',
    terme: 'Chape',
    famille: 'Béton & aciers',
    definition: 'Couche de mortier sur un plancher pour le mettre à niveau avant revêtement de sol.',
  },
  {
    id: 'dan-m2',
    terme: 'daN/m²',
    famille: 'Eurocodes & structure',
    definition: 'Décanewton par m² ≈ 1 kg/m². 150 daN/m² ≈ 150 kg par m².',
  },
  {
    id: 'zone-sismique',
    terme: 'Zone sismique',
    famille: 'Eurocodes & structure',
    definition:
      'Classement du territoire (1 à 5) selon le risque de séisme.',
    exemple: 'Zone 2 = aléa faible, souvent sans exigence parasismique pour les bâtiments courants.',
  },
  {
    id: 'note-calcul-structure',
    terme: 'Note de calcul',
    famille: 'Études & conception',
    definition:
      'Justification chiffrée du dimensionnement de la structure, visée par le bureau de contrôle.',
  },

  // ── Vie de chantier GO ──
  {
    id: 'pic',
    terme: 'PIC',
    sigle: 'Plan d\'Installation de Chantier',
    famille: 'Suivi de chantier',
    definition:
      'Plan vue de dessus positionnant clôture, base vie, stockages, grue, accès, circulations.',
  },
  {
    id: 'base-vie',
    terme: 'Base vie',
    famille: 'Suivi de chantier',
    definition: 'Les bungalows du personnel : vestiaires, sanitaires, douches, réfectoire.',
  },
  {
    id: 'bureau-chantier',
    terme: 'Bureau de chantier',
    famille: 'Suivi de chantier',
    definition:
      'Bungalow de réunion (réunion de chantier hebdomadaire) avec plans affichés.',
  },
  {
    id: 'panneau-chantier',
    terme: 'Panneau de chantier',
    famille: 'Suivi de chantier',
    definition:
      'Grand panneau réglementaire à l\'entrée : permis de construire, intervenants.',
  },
  {
    id: 'benne-tri-selectif',
    terme: 'Benne à tri sélectif',
    famille: 'Suivi de chantier',
    definition:
      'Bennes séparées par type de déchets, avec rotations régulières (traçabilité des déchets).',
  },
  {
    id: 'lave-roues',
    terme: 'Lave-roues',
    famille: 'Suivi de chantier',
    definition:
      'Installation de nettoyage des camions en sortie de chantier pour ne pas salir la voie publique.',
  },
  {
    id: 'grue-chantier',
    terme: 'Grue',
    famille: 'Suivi de chantier',
    definition:
      'Moyen de levage principal. Nécessite plan d\'implantation validé et branchement électrique dédié (400 V).',
  },
  {
    id: 'autorisation-voirie',
    terme: 'Autorisation de voirie',
    famille: 'Suivi de chantier',
    definition:
      'Permission de la mairie/DDT pour occuper ou utiliser le domaine public (emprise, échafaudage, benne).',
  },
  {
    id: 'quart-heure-securite',
    terme: 'Quart d\'heure sécurité',
    famille: 'Sécurité & prévention',
    definition: 'Court briefing sécurité régulier avec les équipes terrain.',
  },
  {
    id: 'epi',
    terme: 'EPI',
    sigle: 'Équipements de Protection Individuelle',
    famille: 'Sécurité & prévention',
    definition: 'Casque, chaussures, gants, harnais.',
  },
  {
    id: 'protections-collectives',
    terme: 'Protections collectives',
    famille: 'Sécurité & prévention',
    definition:
      'Garde-corps provisoires, filets anti-chute, platelages sur trémies : prioritaires sur les EPI.',
  },
  {
    id: 'repliement-chantier',
    terme: 'Repliement',
    famille: 'Suivi de chantier',
    definition: 'Démontage et évacuation de toute l\'installation de chantier en fin de travaux.',
  },
  {
    id: 'permeabilite-air',
    terme: 'Perméabilité à l\'air',
    famille: 'Suivi de chantier',
    definition:
      'Étanchéité à l\'air du bâtiment, testée en cours et fin de chantier (test de la porte soufflante).',
  },
];
