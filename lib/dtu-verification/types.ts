/**
 * Types pour l’outil prototype « Vérification DTU × devis » (BeWork / test interne).
 * Les textes métier sont des reformulations maison ; aucune reproduction de DTU officiels.
 */

export type NiveauConfiance = 'Élevé' | 'Moyen' | 'Faible';

export type DtuRecord = {
  reference: string;
  titre_court: string;
  titre: string;
  famille: string;
  metiers: string[];
  mots_cles: string[];
  articles_typiques: string[];
  resume_maison: string;
};

export type DtuBaseFile = {
  _metadata?: {
    date_maj?: string;
    /** Note projet — pas de texte officiel dans la base */
    note?: string;
  };
  dtus: DtuRecord[];
};

export type LigneAnalyse = {
  ligne_devis: string;
  /** Proposition de libellé après complétudes et alertes (les montants restent hors périmètre). */
  ligne_devis_rectifiee: string;
  /** Synthèse des compléments proposés (non normatif). */
  rectifications_appliquees: string[];
  ouvrage_detecte: string;
  dtu_probable: string;
  dtu_titre_court: string;
  articles_a_verifier: string[];
  niveau_confiance: NiveauConfiance;
  alertes: string[];
  notes: string;
};

export type RapportDtuPayload = {
  client: string;
  projet: string;
  /** JJ/MM/AAAA */
  date: string;
  redacteur: string;
  lignes: LigneAnalyse[];
  /** Mémo bordereau — paragraphes pour le fichier Word ou la consultation interne */
  memo_paragraphs: string[];
};
