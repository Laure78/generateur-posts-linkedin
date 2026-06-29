/** Identifiants des schémas SVG disponibles */
export type SchemaId =
  | 'marche-public'
  | 'composition-dce'
  | 'acteurs-chantier'
  | 'prix-marche'
  | 'ordres-service'
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
          'Sans OS écrit, pas de travaux officiels. L\'OS n°1 lance le délai. Un OS modificatif autorise des travaux en plus, en attendant l\'avenant.',
        astuce: 'Jamais de travaux supplémentaires sur simple demande orale — exigez un OS.',
        termesLies: ['os', 'os-demarrage', 'os-modificatif', 'avenant'],
        schema: 'ordres-service',
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
];
