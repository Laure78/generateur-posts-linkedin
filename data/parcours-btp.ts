/** Identifiants des schémas SVG disponibles */
export type SchemaId =
  | 'marche-public'
  | 'composition-dce'
  | 'acteurs-chantier'
  | 'prix-marche'
  | 'ordres-service'
  | 'ordres-service-guide'
  | 'securite-chantier'
  | 'couverture-coupe'
  | 'implantation-chantier'
  | 'beton-arme-fondations';

export interface EtapeParcours {
  id: string;
  titre: string;
  /** Explication en langage simple */
  explication: string;
  /** Conseil terrain, optionnel */
  astuce?: string;
  /** IDs lexique liés (data/lexique-btp.ts) */
  termesLies?: string[];
  schema?: SchemaId;
}

export interface ParcoursBtp {
  id: string;
  titre: string;
  description: string;
  duree: string;
  etapes: EtapeParcours[];
}

export const PARCOURS_BTP: ParcoursBtp[] = [
  {
    id: 'repondre-marche',
    titre: 'Répondre à un marché public',
    description:
      'Les grandes étapes, de l\'annonce à la signature — sans se perdre dans les sigles.',
    duree: '5 min',
    etapes: [
      {
        id: 'etape-annonce',
        titre: '1. L\'annonce tombe',
        explication:
          'L\'acheteur public publie un avis (AAPC) : un marché est ouvert. Vous téléchargez le dossier de consultation (DCE) sur la plateforme indiquée.',
        astuce: 'Notez tout de suite la date limite de dépôt — c\'est non négociable.',
        termesLies: ['aapc', 'dce'],
        schema: 'marche-public',
      },
      {
        id: 'etape-candidature',
        titre: '2. Vous candidatez',
        explication:
          'Vous prouvez que votre entreprise est sérieuse : chiffre d\'affaires, assurances, effectifs (DC1/DC2 ou DUME). Si vous sous-traitez, vous déclarez qui fait quoi (DC4).',
        termesLies: ['dc1', 'dc2', 'dume', 'dc4'],
      },
      {
        id: 'etape-offre',
        titre: '3. Vous chiffrez et répondez',
        explication:
          'Vous remplissez le prix (DPGF forfait ou BPU + DQE), le mémoire technique et l\'acte d\'engagement (AE). Le règlement de consultation (RC) dit exactement quoi fournir.',
        termesLies: ['dpgf', 'bpu', 'dqe', 'memoire-technique', 'ae', 'rc'],
        schema: 'prix-marche',
      },
      {
        id: 'etape-attribution',
        titre: '4. L\'acheteur compare et choisit',
        explication:
          'Les offres sont notées selon des critères (prix, technique, délais…). L\'entreprise la mieux classée est retenue et signe le marché.',
        termesLies: ['criteres-notation', 'variantes', 'pse'],
      },
    ],
  },
  {
    id: 'comprendre-dce',
    titre: 'Décrypter le DCE',
    description: 'Le dossier que vous recevez : à quoi sert chaque document.',
    duree: '4 min',
    etapes: [
      {
        id: 'dce-vue',
        titre: 'Le DCE en un coup d\'œil',
        explication:
          'Le DCE = la boîte à outils du marché. Chaque document a un rôle précis : règles, technique, prix, sécurité. Ne mélangez pas tout.',
        termesLies: ['dce'],
        schema: 'composition-dce',
      },
      {
        id: 'dce-admin',
        titre: 'Les docs « administratifs »',
        explication:
          'Le RC explique comment répondre. Le CCAP fixe délais, paiements, pénalités. Le CCAG-Travaux s\'applique par défaut sauf si le CCAP dit autre chose.',
        astuce: 'Lisez le CCAP avant de chiffrer : les pénalités et délais y sont écrits noir sur blanc.',
        termesLies: ['rc', 'ccap', 'ccag-travaux'],
      },
      {
        id: 'dce-tech',
        titre: 'Les docs « techniques »',
        explication:
          'Le CCTP décrit les travaux à faire. Les plans et DTU précisent comment les réaliser. Le RICT (bureau de contrôle) liste les points à surveiller.',
        termesLies: ['cctp', 'dtu', 'rict'],
      },
    ],
  },
  {
    id: 'sur-chantier',
    titre: 'Sur le chantier au quotidien',
    description: 'Qui fait quoi, et pourquoi l\'ordre de service est roi.',
    duree: '5 min',
    etapes: [
      {
        id: 'acteurs',
        titre: 'Qui est qui ?',
        explication:
          'Le MOA commande et paie. Le MOE (architecte/BET) contrôle la conformité. Vous exécutez. Le bureau de contrôle vérifie certains points techniques.',
        termesLies: ['moa', 'moe', 'bet', 'bureau-controle'],
        schema: 'acteurs-chantier',
      },
      {
        id: 'os',
        titre: 'L\'ordre de service, c\'est la loi',
        explication:
          'Sans OS écrit, pas de travaux officiels. Le schéma ci-dessous détaille les 3 types principaux : démarrage, suspension/reprise et travaux modificatifs.',
        astuce: 'Jamais de travaux supplémentaires sur simple demande orale — exigez un OS.',
        termesLies: ['os', 'os-demarrage', 'os-suspension', 'os-modificatif', 'droit-reserve', 'avenant'],
        schema: 'ordres-service-guide',
      },
      {
        id: 'facturation',
        titre: 'Se faire payer',
        explication:
          'Chaque mois, vous envoyez une situation de travaux (% d\'avancement validé par le MOE). La facture part sur Chorus Pro pour le secteur public.',
        termesLies: ['situation-travaux', 'chorus-pro', 'revision-prix'],
      },
    ],
  },
  {
    id: 'securite-base',
    titre: 'Sécurité : l\'essentiel',
    description: 'Les documents et rôles à connaître avant d\'entrer sur chantier.',
    duree: '3 min',
    etapes: [
      {
        id: 'sps-vue',
        titre: 'La pyramide sécurité',
        explication:
          'Sur un gros chantier : le coordonnateur SPS rédige le PGC (règles communes). Chaque entreprise rédige son PPSPS (ses risques à elle).',
        termesLies: ['csps', 'pgc', 'ppsps', 'sps-niveaux'],
        schema: 'securite-chantier',
      },
      {
        id: 'sps-docs',
        titre: 'Les papiers qu\'on vous demande',
        explication:
          'DUERP (risques de l\'entreprise), carte BTP des ouvriers, attestations URSSAF… Sans ces pièces, le chantier peut refuser votre entrée.',
        termesLies: ['duerp', 'carte-btp', 'aprovall'],
      },
    ],
  },
  {
    id: 're2020-batiment-neuf',
    titre: 'Comprendre la RE2020',
    description:
      'La réglementation environnementale pour tous les bâtiments neufs — publics comme privés.',
    duree: '5 min',
    etapes: [
      {
        id: 're2020-quoi',
        titre: '1. Qu\'est-ce que la RE2020 ?',
        explication:
          'Réglementation d\'État obligatoire pour concevoir et construire tout bâtiment neuf en France. Elle vise à diviser par trois l\'impact carbone du secteur : moins d\'énergie, confort d\'été sans clim, pollution des matériaux maîtrisée (ACV).',
        astuce: 'Aucun permis de construire sans preuve de conformité RE2020.',
        termesLies: ['re2020', 'fdes'],
      },
      {
        id: 're2020-bbio-ic',
        titre: '2. Bbio et Ic Construction',
        explication:
          'Le Bbio mesure l\'efficacité de l\'isolation (plus il est bas, mieux c\'est). L\'Ic Construction comptabilise le CO₂ des matériaux posés — chaque produit doit être justifié par sa FDES.',
        termesLies: ['bbio', 'ic-construction', 'fdes'],
      },
      {
        id: 're2020-dh-icenergie',
        titre: '3. DH et Ic énergie',
        explication:
          'Le DH (Degrés-Heures) simule une canicule : trop d\'heures au-dessus de 26-28 °C = projet bloqué sans protections solaires. L\'Ic énergie compte le carbone des consommations sur 50 ans (chauffage, VMC, eau chaude…).',
        termesLies: ['dh-re2020', 'ic-energie'],
      },
      {
        id: 're2020-terrain',
        titre: '4. Sur le chantier',
        explication:
          'Les entreprises doivent fournir les FDES des produits posés. Les essais VMC en fin de chantier (protocoles COPREC) sont directement liés aux exigences RE2020 de ventilation.',
        termesLies: ['coprec', 'etudes-thermiques'],
      },
    ],
  },
  {
    id: 'suivi-execution-chantier',
    titre: 'Suivi & exécution de chantier',
    description:
      'De l\'installation du chantier à la facturation mensuelle et aux essais de fin.',
    duree: '7 min',
    etapes: [
      {
        id: 'suivi-install',
        titre: '1. Installation du chantier',
        explication:
          'Avant la première pose : clôtures, affichage réglementaire, base-vie, raccordements provisoires, grue et bennes.',
        termesLies: ['installation-chantier'],
      },
      {
        id: 'suivi-cr',
        titre: '2. Réunion de chantier hebdomadaire',
        explication:
          'Chaque semaine sur le terrain : on compare l\'avancement au Programme d\'Exécution et aux Plans EXE. L\'architecte rédige le CR (tâches, corrections, retards).',
        termesLies: ['reunion-chantier', 'programme-execution', 'plans-exe'],
      },
      {
        id: 'suivi-os-avenant',
        titre: '3. OS modificatif et avenant',
        explication:
          'Un imprévu ou une modification en cours de chantier passe par un OS écrit, puis souvent un avenant si le prix change. Jamais sur simple accord oral.',
        termesLies: ['os-modificatif', 'avenant'],
      },
      {
        id: 'suivi-situation',
        titre: '4. Situation de travaux mensuelle',
        explication:
          'Chaque fin de mois : vous facturez l\'avancement réel (% par poste). Le MOE valide avant paiement par le MOA.',
        termesLies: ['situation-travaux', 'revision-prix'],
      },
      {
        id: 'suivi-coprec',
        titre: '5. Essais COPREC et bureau de contrôle',
        explication:
          'En fin de chantier, chaque lot technique remplit ses grilles d\'essais (plomberie, électricité, VMC…). Le bureau de contrôle les analyse et délivre le RFCT une fois tout levé.',
        termesLies: ['coprec', 'bureau-controle', 'rfct'],
      },
      {
        id: 'suivi-doe-diou',
        titre: '6. DOE et DIUO à la réception',
        explication:
          'À la livraison, deux dossiers complémentaires : le DOE décrit l\'ouvrage exécuté (maintenance, assurance — CCAG en public) ; le DIUO prévient les risques pour les futurs intervenants (Code du travail).',
        termesLies: ['doe', 'diuo', 'plan-recollement', 'reception'],
      },
    ],
  },
  {
    id: 'marche-prive-promoteur',
    titre: 'Marché privé promoteur',
    description:
      'VEFA, contrôle technique, prix fermes et livraison aux acquéreurs.',
    duree: '5 min',
    etapes: [
      {
        id: 'promo-demarrage',
        titre: '1. Démarrer le chantier',
        explication:
          'Souvent une lettre de commande ou la signature du marché fixe la date de départ — parfois un simple e-mail du directeur de programmes, selon le contrat.',
        termesLies: ['lettre-commande', 'os-demarrage'],
      },
      {
        id: 'promo-controle',
        titre: '2. Visa du bureau de contrôle',
        explication:
          'En VEFA, le promoteur craint les sinistres futurs. Vos plans EXE et notes de calcul doivent obtenir un avis favorable du contrôleur technique avant pose.',
        termesLies: ['vefa', 'visa-bureau-controle', 'rict', 'robot'],
      },
      {
        id: 'promo-prix',
        titre: '3. Prix ferme et avenants',
        explication:
          '≈ 80 % des marchés promotion imposent un forfait non révisable. Tout imprévu payant exige un avenant signé par le Directeur de Programmes — pas un accord de chantier.',
        termesLies: ['forfait-non-revisable', 'avenant'],
      },
      {
        id: 'promo-paiement',
        titre: '4. Garantie de paiement',
        explication:
          'Avant le premier coup de pioche : exigez la caution bancaire ou le crédit direct (art. 1799-1 du Code civil) qui vous protège si le promoteur fait faillite.',
        termesLies: ['garantie-paiement'],
      },
      {
        id: 'promo-livraison',
        titre: '5. Pré-réception et livraison',
        explication:
          'Le promoteur chasse les réserves (pastilles) avant que les acquéreurs VEFA visitent leur logement. Objectif : livrer sans mauvaise surprise.',
        termesLies: ['pre-reception', 'reserves', 'gpa'],
      },
    ],
  },
  {
    id: 'sous-traitance-chantier',
    titre: 'Gérer la sous-traitance',
    description:
      'Agrément, contrat, vigilance et sécurité avant d\'amener un sous-traitant.',
    duree: '4 min',
    etapes: [
      {
        id: 'st-agrement',
        titre: '1. Agrément avant arrivée',
        explication:
          'Vous ne pouvez pas amener un sous-traitant sans autorisation écrite du promoteur ou de l\'acheteur (DC4 ou équivalent).',
        termesLies: ['agrement-st', 'dc4'],
      },
      {
        id: 'st-contrat',
        titre: '2. Contrat et garantie de paiement',
        explication:
          'Signez un contrat de sous-traitance (prix, délais, assurances) et sécurisez son paiement : caution bancaire ou délégation de paiement.',
        termesLies: ['contrat-soustraitance', 'garantie-paiement-st'],
      },
      {
        id: 'st-vigilance',
        titre: '3. Obligation de vigilance',
        explication:
          'Dès 5 000 € HT de contrat : tous les 6 mois, réclamez Kbis, URSSAF, fiscalité et liste des salariés étrangers si besoin.',
        termesLies: ['vigilance-soustraitance'],
      },
      {
        id: 'st-securite',
        titre: '4. Sécurité sur le terrain',
        explication:
          'Avant le premier jour : PPSPS du sous-traitant transmis au SPS, et carte BTP contrôlée pour chaque ouvrier.',
        termesLies: ['ppsps-soustraitant', 'carte-btp', 'csps'],
      },
    ],
  },
  {
    id: 'fondations-gros-oeuvre',
    titre: 'Fondations & Gros œuvre',
    description:
      'Du sol aux planchers : fondations, terrassement, béton armé et vie de chantier GO (vocabulaire CCTP Lot 01).',
    duree: '8 min',
    etapes: [
      {
        id: 'go-acteurs-docs',
        titre: '1. Acteurs et documents du lot GO',
        explication:
          'Le MOA commande, la MOE conçoit, le bureau de contrôle vérifie. Le CCTP Lot 01 décrit fondations, structure et réseaux enterrés. Les plans guides ne remplacent pas vos plans EXE.',
        termesLies: ['moa', 'moe', 'bureau-controle', 'cctp', 'lot-marche', 'plans-guides', 'plans-exe'],
      },
      {
        id: 'go-sol-fondations',
        titre: '2. Sol et fondations',
        explication:
          'L\'étude géotechnique (G1 à G4) définit le type de fondations : semelles, radier ou pieux. Attention au tassement différentiel — risque n°1. Béton de propreté, puis ouvrages structurels.',
        astuce: 'Assise des fondations à la profondeur hors gel minimum.',
        termesLies: [
          'etude-geotechnique',
          'portance-sol',
          'semelle-filante',
          'semelle-isolee',
          'radier',
          'pieux',
          'beton-proprete',
          'tassement-differentiel',
          'profondeur-hors-gel',
        ],
      },
      {
        id: 'go-terrassement',
        titre: '3. Terrassement et plateforme',
        explication:
          'Fouilles blindées, épuisement ou rabattement de nappe si besoin. Remblais compactés (essai Proctor, EV2, classes PF). Implantation et cotes NGF par le géomètre.',
        termesLies: [
          'terrassement',
          'blindage',
          'epuisement-fouille',
          'remblai',
          'essai-proctor',
          'ev1-ev2',
          'portance-pf',
          'ngf',
          'implantation',
        ],
      },
      {
        id: 'go-reseaux',
        titre: '4. Réseaux enterrés',
        explication:
          'Assainissement EU/EV/EP séparé, fourreaux, prise de terre. DICT obligatoire avant de creuser. Passage caméra et hydrocurage avant de couler le plancher.',
        termesLies: [
          'assainissement',
          'eaux-vannes-ev',
          'fourreau',
          'prise-de-terre',
          'dict',
          'passage-camera-itv',
        ],
      },
      {
        id: 'go-beton-structure',
        titre: '5. Béton armé et superstructure',
        explication:
          'BPS de centrale, classes C25/30 et d\'exposition. Voiles banchés, prédalles, chaînages. Enrobage, coffrage, décoffrage. Le gros œuvre porte tout le bâtiment.',
        termesLies: [
          'bps-beton',
          'beton-arme',
          'beton-classe',
          'voile-beton-banche',
          'predalle',
          'chainage',
          'enrobage',
          'gros-oeuvre',
        ],
      },
      {
        id: 'go-chantier',
        titre: '6. Installation et fin de chantier',
        explication:
          'PIC, base vie, grue, bennes tri sélectif. Réunions de chantier hebdomadaires (CR). À la livraison : DOE, plan de recollement, levée des réserves et garanties (GPA, biennale, décennale).',
        termesLies: [
          'pic',
          'base-vie',
          'reunion-chantier',
          'doe',
          'plan-recollement',
          'garantie-decennale',
          'gpa',
        ],
      },
    ],
  },
  {
    id: 'implantation-batiment',
    titre: 'Implanter un bâtiment',
    description:
      'Dessiner le bâtiment en vraie grandeur sur le terrain : position (planimétrie), hauteur (NGF), chaises et cordeaux — fiche mémo débutant.',
    duree: '8 min',
    etapes: [
      {
        id: 'imp-quoi',
        titre: '1. Implanter, c\'est quoi ?',
        explication:
          'C\'est dessiner le bâtiment en vraie grandeur sur le terrain, avant de creuser. Deux questions : OÙ le poser (distances rue et voisins) et À QUELLE HAUTEUR (niveau du sol fini). Une erreur de 50 cm peut obliger à démolir — on vérifie tout, deux fois.',
        astuce: 'Téléchargez la fiche mémo Word depuis le bandeau en haut du parcours.',
        termesLies: ['implantation', 'planimetrie', 'altimetrie'],
      },
      {
        id: 'imp-docs',
        titre: '2. Les 4 documents à rassembler',
        explication:
          'Permis de construire (plan masse = distances et cote NGF du sol fini). PLU (reculs, limites séparatives, hauteur max). Plans d\'architecte (dimensions, axes, cotes). Étude de sol G2 (profondeur des fondations, hors gel 60–90 cm en Île-de-France).',
        astuce: 'Le PC est la règle du jeu sur le terrain — non négociable.',
        termesLies: ['permis-construire', 'plan-masse', 'plu', 'etude-sol-g2', 'profondeur-hors-gel'],
      },
      {
        id: 'imp-ref',
        titre: '3. Position et hauteur : deux références',
        explication:
          'Planimétrie (le OÙ) : on se fie aux bornes du géomètre — jamais au cadastre. Altimétrie (la hauteur) : référence nationale NGF. Le géomètre matérialise un repère NGF protégé sur le chantier ; toutes les cotes en découlent (fond de fouille, fondations, dallage).',
        termesLies: ['planimetrie', 'altimetrie', 'ngf', 'reper-ngf-chantier', 'cadastre', 'geometre', 'bornage'],
      },
      {
        id: 'imp-voisins',
        titre: '4. Rue, voisins et réseaux',
        explication:
          'Alignement = limite avec la rue (arrêté de mairie, pas au jugé). Bornage si bornes douteuses. DT-DICT obligatoire avant de creuser pour repérer gaz, électricité, eau.',
        astuce: 'Empiéter chez le voisin de 20 cm = contentieux garanti.',
        termesLies: ['alignement-voirie', 'bornage', 'dict'],
      },
      {
        id: 'imp-chaises',
        titre: '5. Chaises, cordeaux et équerrage',
        explication:
          'Le géomètre plante les piquets et signe un PV d\'implantation. Chaises en retrait de 1,50 à 2 m (axes conservés au terrassement). Cordeaux entre chaises opposées : le croisement redonne un angle. Contrôle : triangle 3-4-5 et diagonales égales (± 1 à 2 cm).',
        termesLies: [
          'pv-implantation',
          'chaises-implantation',
          'cordeaux-implantation',
          'equerrage-3-4-5',
          'controle-diagonales',
          'piquetage',
        ],
        schema: 'implantation-chantier',
      },
      {
        id: 'imp-niveau-beton',
        titre: '6. Niveau, fouilles et dernier contrôle',
        explication:
          'Au laser : trait de + 1,00 m sur les chaises (1 m au-dessus du sol fini RDC). Tracé à la bombe de peinture de l\'emprise des fouilles. Terrassement à la profondeur G2. Juste avant le béton : revérifier cordeaux, diagonales et hauteur — une pelleteuse a pu heurter une chaise.',
        astuce: 'Un béton coulé au mauvais endroit ne se rattrape pas.',
        termesLies: ['trait-niveau', 'emprise-fouilles', 'implantation'],
      },
    ],
  },
  {
    id: 'bases-gros-oeuvre',
    titre: 'Les bases du gros œuvre',
    description:
      'Implantation, fondations et armatures en langage simple — fiche mémo débutant (avant le CCTP Lot 01).',
    duree: '12 min',
    etapes: [
      {
        id: 'bgo-intro',
        titre: '1. Implanter, c\'est quoi ?',
        explication:
          'Dessiner le bâtiment en vraie grandeur sur le terrain, avant de creuser : OÙ le poser (distances rue et voisins) et À QUELLE HAUTEUR (sol fini). Une erreur de 50 cm peut obliger à démolir.',
        astuce: 'Téléchargez la fiche mémo Word depuis le bandeau en haut du parcours.',
        termesLies: ['implantation', 'planimetrie', 'altimetrie'],
      },
      {
        id: 'bgo-docs',
        titre: '2. Les 4 documents à rassembler',
        explication:
          'PC (plan masse = distances + cote NGF sol fini), PLU (reculs, limites, hauteur max), plans d\'architecte, étude de sol G2 (profondeur fondations, hors gel 60–90 cm en IDF).',
        astuce: 'Le PC est la règle du jeu — non négociable.',
        termesLies: ['permis-construire', 'plan-masse', 'plu', 'etude-sol-g2', 'profondeur-hors-gel'],
      },
      {
        id: 'bgo-ref',
        titre: '3. Position et hauteur',
        explication:
          'Planimétrie : bornes du géomètre, jamais le cadastre. Altimétrie : repère NGF protégé sur chantier → fond de fouille, fondations, dallage.',
        termesLies: ['planimetrie', 'altimetrie', 'ngf', 'reper-ngf-chantier', 'cadastre', 'geometre'],
      },
      {
        id: 'bgo-voisins',
        titre: '4. Rue, voisins et réseaux',
        explication:
          'Alignement (arrêté mairie), bornage si doute, DT-DICT avant de creuser.',
        astuce: 'Empiéter chez le voisin de 20 cm = contentieux garanti.',
        termesLies: ['alignement-voirie', 'bornage', 'dict'],
      },
      {
        id: 'bgo-chaises',
        titre: '5. Chaises, cordeaux et équerrage',
        explication:
          'PV d\'implantation géomètre → chaises en retrait 1,50–2 m → cordeaux → triangle 3-4-5 et diagonales (± 1–2 cm) → trait de + 1,00 m → emprise fouilles peinte au sol.',
        termesLies: [
          'pv-implantation',
          'chaises-implantation',
          'cordeaux-implantation',
          'equerrage-3-4-5',
          'controle-diagonales',
          'trait-niveau',
          'emprise-fouilles',
        ],
        schema: 'implantation-chantier',
      },
      {
        id: 'bgo-controle-beton',
        titre: '6. Dernier contrôle avant béton',
        explication:
          'Revérifier cordeaux, diagonales et hauteur : une pelleteuse a pu heurter une chaise. Un béton coulé au mauvais endroit ne se rattrape pas.',
        termesLies: ['implantation', 'chaises-implantation'],
      },
      {
        id: 'bgo-fondations-role',
        titre: '7. À quoi sert une fondation ?',
        explication:
          'Transmettre le poids du bâtiment (100–200 t pour une maison) au sol sans affaissement ni fissures. L\'étude G2 choisit le type : bon sol proche → fondation simple ; sol mou → on descend chercher le bon sol.',
        astuce: 'Image : raquettes à neige = poids réparti, comme un radier.',
        termesLies: ['portance-sol', 'etude-sol-g2', 'bon-sol', 'fondations-superficielles'],
      },
      {
        id: 'bgo-familles',
        titre: '8. Les 3 familles de fondations',
        explication:
          'Superficielles (bon sol < 3 m) : semelle filante, semelle isolée, radier. Semi-profondes (3–6 m) : puits + longrines. Profondes (> 6 m) : pieux forés/battus, micropieux.',
        termesLies: [
          'semelle-filante',
          'semelle-isolee',
          'radier',
          'puits-fondation',
          'longrine',
          'pieux',
          'micropieux',
          'fondations-semi-profondes',
          'fondations-profondes',
        ],
      },
      {
        id: 'bgo-armatures',
        titre: '9. Béton armé et armatures',
        explication:
          'Le béton résiste à la compression mais environ 10 fois moins à la traction — comme une planche entre deux tréteaux, la semelle est écrasée dessus et tendue dessous. L\'acier reprend la traction : filants en bas, cadres (étriers) tous les 15–25 cm, treillis soudé pour dalles/radiers, aciers en attente pour coudre murs et poteaux. HA8, HA10, HA12 = diamètre en mm.',
        termesLies: [
          'beton-arme',
          'traction-compression-beton',
          'acier-ha',
          'filants-armature',
          'cadres-etriers',
          'cage-armatures',
          'treillis-soude',
          'aciers-en-attente',
        ],
        schema: 'beton-arme-fondations',
      },
      {
        id: 'bgo-regles',
        titre: '10. Les 3 règles d\'or',
        explication:
          '1. Enrobage 3–5 cm (cales sous la cage). 2. Béton de propreté (~5 cm) avant la cage. 3. Recouvrement ≈ 50 × diamètre (HA10 → 50 cm), fil de fer, pas de soudure courante.',
        astuce: 'L\'étude G2 donne la profondeur ; le trait NGF donne la cote du fond de fouille.',
        termesLies: [
          'enrobage',
          'cales-enrobage',
          'beton-proprete',
          'recouvrement-armature',
          'etude-sol-g2',
          'trait-niveau',
        ],
      },
    ],
  },
  {
    id: 'enduits-facade',
    titre: 'Enduits de façade',
    description:
      'Monocouches, supports RT/OC, application, points singuliers, modénatures et coordination chantier (vocabulaire CCTP Lot 02).',
    duree: '7 min',
    etapes: [
      {
        id: 'ef-metier',
        titre: '1. Le métier et l\'ouvrage',
        explication:
          'L\'enduit de façade protège le mur de la pluie tout en le laissant respirer. Le façadier applique un monocouche (accrochage + imperméabilisation + finition en 2 passes) ou un enduit traditionnel en 3 couches. La teinte est dans la masse. Référence : DTU 26.1 et certification CSTB du produit.',
        astuce: '« Weber Pral F ou équivalent » = autre marque possible si performances égales, validées MOE/MOA.',
        termesLies: [
          'enduit-facade',
          'facadier-enduiseur',
          'enduit-monocouche',
          'teinte-masse',
          'impermeabilisation-facade',
          'ou-equivalent',
          'dtu-26-1',
          'certification-enduit-cstb',
        ],
      },
      {
        id: 'ef-supports',
        titre: '2. Supports et préparation',
        explication:
          'Le support (subjectile) doit être propre et conforme. L\'enduiseur réceptionne formellement les murs GO — sans PV, les défauts lui incombent. Classement RT (DTU 20.1) et catégorie OC : jamais d\'enduit plus dur que son support. Humidification à refus, élimination du salpêtre.',
        astuce: 'Parpaing courant = RT3 · Brique creuse = RT2. Support faible RT1 → enduit OC1.',
        termesLies: [
          'support-subjectile',
          'reception-supports-facade',
          'classement-rt',
          'categorie-oc',
          'humidification-refus',
          'salpetre',
          'adherence-enduit',
          'piquer-boucharder',
        ],
      },
      {
        id: 'ef-application',
        titre: '3. Application et finitions',
        explication:
          'Gâchage au fur et à mesure — mortier rebattu interdit. Application en passes frais sur frais, souvent par projection. Finition grattée (courante) ou talochée (soubassements). Surface témoin validée avant généralisation. Conditions météo : +5°C à +30°C, pas de pluie ni support gelé.',
        astuce: 'Faïençage = micro-fissures révélatrices d\'un mauvais gâchage ou séchage trop rapide.',
        termesLies: [
          'passe-enduit',
          'frais-sur-frais',
          'projection-enduit',
          'dressage-enduit',
          'finition-gratte',
          'finition-talochee',
          'surface-temoin-facade',
          'conditions-climatiques-enduit',
          'faiencage-enduit',
          'reprise-enduit',
        ],
      },
      {
        id: 'ef-singuliers',
        titre: '4. Points singuliers et renforts',
        explication:
          'Aux jonctions de matériaux, angles de baies et planelles : armature en trame de fibre de verre. Soubassements à enduire avant remblai GO. Arêtes supérieures protégées avant enduisage. Lattis métallique sur support bois. Retours en tableaux et sous-face de linteaux.',
        termesLies: [
          'point-singulier-facade',
          'armature-trame-facade',
          'tableau-facade',
          'soubassement-facade',
          'arete-profil-facade',
          'lattis-metallique',
        ],
      },
      {
        id: 'ef-modenatures',
        titre: '5. Modénatures et échafaudages',
        explication:
          'Bandeaux, chaînages décoratifs, faux colombages : modénatures en surépaisseur ou PSE collé (fixations mécaniques si > 7 cm). Vérifier les Euroclasses feu. Échafaudage de pied : réception obligatoire (arrêté 2004), bracons, garde-corps, double transport.',
        termesLies: [
          'modenature',
          'bandeau-facade',
          'chainage-decoratif',
          'surepaisseur-enduit',
          'pse-modenature',
          'reaction-feu-euroclasses',
          'ton-pierre',
          'echafaudage-pied',
          'reception-echafaudage',
          'bracon-tirant',
        ],
      },
      {
        id: 'ef-contrat',
        titre: '6. Contrat et coordination',
        explication:
          'Lot 00 = dispositions communes (bennes, nettoyage). Interfaces : enduire soubassements avant remblai, protéger menuiseries avant projection. Compte prorata, phasage entre corps d\'état. Certificateur (ex. Prestaterre) pour labels environnementaux.',
        astuce: 'Projections sur menuiserie neuve = nettoyage ou remplacement aux frais de l\'enduiseur.',
        termesLies: [
          'lot-00-dispositions',
          'interface-corps-etat',
          'protection-ouvrages-facade',
          'certificateur-prestaterre',
        ],
      },
    ],
  },
  {
    id: 'perf-energetique-f22',
    titre: 'Performance énergétique & contrôles',
    description:
      'Q4Pa-surf, tests d\'infiltrométrie, schémas fluides et coordination lot MEP (Famille 22 CCTP).',
    duree: '6 min',
    etapes: [
      {
        id: 'f22-perm-air',
        titre: '1. Perméabilité à l\'air (Q4Pa-surf)',
        explication:
          'Le Q4Pa-surf mesure les fuites d\'air involontaires. Seuil courant : 1,00 m³/h·m² sous 4 Pa. Deux tests ventilateur obligatoires : au clos-couvert (murs, toit, menuiseries posés) et à l\'achèvement. Échec = réparation sous 5 jours ouvrés + retest aux frais de l\'entreprise responsable.',
        astuce: 'Le plaquiste participe à l\'étanchéité en soignant les joints aux traversées de réseaux.',
        termesLies: [
          'q4pa-surf',
          'infiltrometrie',
          'test-perm-air-clos-couvert',
          'test-perm-air-achevement',
          'plaquiste-gaines-etancheite',
        ],
      },
      {
        id: 'f22-schemas',
        titre: '2. Schémas fluides',
        explication:
          'Plans simplifiés de circulation des liquides et gaz : eau sanitaire, chauffage/clim, VMC. Carte routière pour installateurs — vannes, pompes, nourrices. Le conducteur de travaux s\'en sert pour coordonner et pour la maintenance future.',
        termesLies: [
          'schema-fluide',
          'reseau-eau-sanitaire-schema',
          'reseau-chauffage-clim-schema',
          'vmc-ventilation-schema',
          'nourrice-collecteur',
        ],
      },
      {
        id: 'f22-mep',
        titre: '3. Lot MEP et réservations',
        explication:
          'MEP = Mechanical, Electrical, Plumbing (CVC, électricité, plomberie). Le maçon laisse des réservations dans le béton selon le schéma fluide — sinon perçage destructif. L\'électricien alimente PAC/VMC et évite les équipements sous canalisation d\'eau.',
        astuce: 'Sans schéma fluide à temps, le béton coule partout — reprises très coûteuses.',
        termesLies: [
          'lot-mep',
          'reservation-reseaux',
          'macon-reservation-beton',
          'electricien-mep',
        ],
      },
      {
        id: 'f22-coordination',
        titre: '4. Coordination des métiers',
        explication:
          'Le plaquiste coffre les réseaux en gaines après le MEP. Le terrassier/VRD raccorde au réseau public selon le schéma fluide. Tous les lots techniques doivent s\'accorder avant que le second œuvre ne ferme les volumes.',
        termesLies: [
          'plaquiste-gaines-etancheite',
          'terrassier-vrd-raccordement',
          'lot-mep',
          'schema-fluide',
        ],
      },
    ],
  },
  {
    id: 'charpente-couverture',
    titre: 'Charpente & couverture',
    description:
      'Fermettes, tuiles Canal S, zinguerie, EP et sécurité toiture — vocabulaire Lot 03 CCTP Millas Nord (38 logements).',
    duree: '10 min',
    etapes: [
      {
        id: 'cc-lot',
        titre: '1. Le lot charpente-couverture',
        explication:
          'Le lot 03 regroupe charpente bois, couverture tuile, zinguerie et évacuation des eaux pluviales. Référence normative : DTU 31.1 (charpentes et escaliers bois). Le charpentier pose aussi les sorties de toiture VMC (matériel fourni par la plomberie) et les châssis de désenfumage.',
        astuce: 'Point de coordination clé : le charpentier assure la stabilité horizontale de la charpente ; le gros œuvre reprend les efforts verticaux — pas les efforts horizontaux.',
        termesLies: ['dtu-31-1', 'stabilite-charpente-go'],
      },
      {
        id: 'cc-charpente',
        titre: '2. Charpente bois',
        explication:
          'Fermettes industrielles préfabriquées (MITEK ou équivalent, entraxe max 60 cm) pour combles perdus — notes de calcul validées par le bureau de contrôle. Chevêtres en bois pour trappes, conduits de fumée, VMC et châssis de désenfumage. Platelage léger en combles (3 m²/bloc) pour accès VMC avec garde-corps. Charpente traditionnelle (chevrons C24) pour carports et ouvrages annexes.',
        astuce: 'Aucune fermette ne doit être posée au-dessus d\'une trappe d\'accès combles.',
        termesLies: [
          'fermette-industrielle',
          'chevetre-charpente',
          'platelage-combles',
          'charpente-traditionnelle',
        ],
      },
      {
        id: 'cc-sous-toiture',
        titre: '3. Sous-toiture et ventilation',
        explication:
          'Membrane pare-pluie (ex. DELTA-VENT S) posée sur la charpente avant les liteaux — protège le bois avant la pose des tuiles. Liteaux et contre-liteaux 27×32 mm cloués sur charpente : support des tuiles et lame d\'air ventilée. Chatières spéciales avec grillage moustiquaire pour aérer les combles (obligations réglementaires).',
        astuce: 'Variante marché possible : suppression du film pare-pluie sur la plupart des toitures, sauf maison avec tuiles photovoltaïques intégrées.',
        schema: 'couverture-coupe',
        termesLies: [
          'pare-pluie-sous-toiture',
          'liteaux-contre-liteaux',
          'chatieres-ventilation-combles',
        ],
      },
      {
        id: 'cc-couverture',
        titre: '4. Couverture tuile',
        explication:
          'Tuiles romane à emboîtement type EDILIANS Canal S ou équivalent. Faîtières (crête) et arêtiers (angles) posés à sec avec closoir alu, scellement mortier bâtard. Règle courante : 1 tuile sur 5 fixée mécaniquement contre le vent.',
        astuce: 'Vérifier la compatibilité des tuiles PV intégrées avec le système Canal S — AT CSTB obligatoire.',
        termesLies: ['tuile-canal-s', 'faitiere-aretiers', 'tuiles-photovoltaiques-integrees'],
      },
      {
        id: 'cc-zinguerie',
        titre: '5. Zinguerie & eaux pluviales',
        explication:
          'Noues en zinc ou PREFAL sur fond bois (fond de noue au creux de deux pans). Solins de rive alu teinté tuile avec joint de dilatation. Gouttières alu demi-rond et descentes EP. Dauphins en pied de descente si chemin piéton (hauteur ~2 m) — éloigne l\'eau du mur et du passage.',
        termesLies: [
          'fond-de-noue',
          'zinguerie-noue',
          'solin-rive',
          'gouttiere-descente-ep',
          'dauphin-ep',
        ],
      },
      {
        id: 'cc-securite',
        titre: '6. Accès, sécurité & interfaces',
        explication:
          'Châssis de désenfumage Velux GGL (ouverture ≥ 110°) en cages d\'escalier collectifs — commande gaz RDC. Châssis d\'accès toiture GVT (trappe 49×76 cm). Crochets de sécurité pour double longe : tous les 1,50 m, 2 lignes (faîtage + milieu de pan), résistance 2 000 daN. Tuiles photovoltaïques intégrées (8 modules maison 36) — raccordement lot électricité.',
        astuce: 'Le lot charpente pose les sorties toiture VMC ; la plomberie fournit le matériel.',
        termesLies: [
          'chassis-desenfumage',
          'chassis-acces-toiture',
          'crochets-securite-toiture',
          'tuiles-photovoltaiques-integrees',
        ],
      },
    ],
  },
  {
    id: 'menuiseries-exterieures',
    titre: 'Menuiseries extérieures',
    description:
      'Fenêtres PVC, portes alu, volets et étanchéité — vocabulaire Lot 04 CCTP Millas Nord.',
    duree: '7 min',
    etapes: [
      {
        id: 'me-pose',
        titre: '1. Pose et étanchéité',
        explication:
          'DTU 36.5. Scellement et calfeutrement = lot menuiseries. Relevé de cotes sur place avant fabrication. Compriband + silicone/BUTYL. Étanchéité à l\'air 4 faces si exigée MOE — impact Q4Pa-surf.',
        astuce: 'Les dimensions CCTP sont indicatives : toujours mesurer sur chantier.',
        termesLies: ['dtu-36-5', 'scellement-menuiseries', 'calfeutrement-menuiserie', 'releve-cotes-menuiseries', 'etancheite-air-4-faces'],
      },
      {
        id: 'me-fenetres',
        titre: '2. Fenêtres & portes logements',
        explication:
          'PVC blanc : crémone 3 points, double vitrage faible émissivité, Uw selon étude thermique. Satinovo SdB/WC, Stadip Protect RDC sans VR. Seuil PMR sur portes-fenêtres avec drainage.',
        termesLies: ['uw-menuiserie', 'double-vitrage-faible-emissivite', 'cremone-3-points', 'seuil-pmr-menuiserie', 'vitrage-satinovo-stadip', 'compriband-appui'],
      },
      {
        id: 'me-collectif',
        titre: '3. Portes collectives & acoustique',
        explication:
          'Portes alu entrée immeuble : ventouses, ferme-porte force 3, passage 1 m, vitrage CEKAL. Affaiblissement acoustique façade 30 dB, fenêtres R = 31 dB.',
        termesLies: ['porte-entree-collectif-alu', 'affaiblissement-acoustique-menuiserie', 'dormant-ouvrant'],
      },
      {
        id: 'me-volets',
        titre: '4. Volets & entrées d\'air',
        explication:
          'VR PVC manuel ou motorisé Thermobloc (coffre isolé). Barres anti-soulèvement RDC. Grilles entrée d\'air fournies lot VMC, mortaises par menuisier. Volets battants alu ou variante bois.',
        termesLies: ['volet-roulant-thermobloc', 'barre-anti-soulevement', 'grille-entree-air-menuiserie'],
      },
    ],
  },
  {
    id: 'plateforme-terrassement',
    titre: 'Plateforme et compactage',
    description:
      'Comprendre les essais EV2 et les classes PF avant de bâtir.',
    duree: '3 min',
    etapes: [
      {
        id: 'terra-essais',
        titre: '1. Essais à la plaque',
        explication:
          'Le laboratoire mesure EV1 et EV2 : leur ratio doit rester inférieur à 2,0 pour prouver un bon compactage.',
        termesLies: ['essai-plaque', 'ev1-ev2'],
      },
      {
        id: 'terra-pf',
        titre: '2. Classes PF1 à PF4',
        explication:
          'PF1 (20-50 MPa) = sol trop mou pour dallage direct. PF2 = standard. PF3/PF4 = sols très résistants. Un PF1 impose traitement ou surépaisseur.',
        astuce: 'Un sol dur mais mal compacté (ratio > 2) sera refusé même avec une bonne valeur EV2.',
        termesLies: ['portance-pf', 'purge', 'gnt'],
      },
    ],
  },
];
