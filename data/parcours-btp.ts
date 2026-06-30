/** Identifiants des schémas SVG disponibles */
export type SchemaId =
  | 'marche-public'
  | 'composition-dce'
  | 'acteurs-chantier'
  | 'prix-marche'
  | 'ordres-service'
  | 'ordres-service-guide'
  | 'securite-chantier';

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
