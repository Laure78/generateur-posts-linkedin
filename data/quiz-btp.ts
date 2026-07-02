import { FAMILLES, LEXIQUE, melanger, type Famille, type TermeLexique } from './lexique-btp';

/** Nombre de questions par série (adapté si la catégorie est petite) */
export const QUIZ_NB_QUESTIONS_CIBLE = 8;

/** Presets thématiques pour débutants */
export const QUIZ_PRESET_NON_SOUMIS_TOUTES_ID = 'non-soumis-toutes' as const;

export const QUIZ_PRESETS_DEBUTANT: {
  id: string;
  label: string;
  description: string;
  familles: Famille[];
  /** Sélectionne implicitement toutes les rubriques (familles vide). */
  toutesRubriques?: boolean;
  /** Exclut les termes déjà soumis (localStorage). */
  nonSoumisSeulement?: boolean;
}[] = [
  {
    id: 'essentiels',
    label: 'Les essentiels',
    description: 'Acteurs, documents clés et vie de chantier — idéal pour démarrer.',
    familles: [
      'Acteurs & organisation',
      'Documents du marché',
      'Préparation & exécution',
      'Suivi de chantier',
    ],
  },
  {
    id: 'marche-public',
    label: 'Marché public',
    description: 'Répondre à un appel d\'offres : procédures, dossier et prix.',
    familles: ['Procédures & notation', 'Documents du marché', 'Prix & facturation'],
  },
  {
    id: 'chantier-quotidien',
    label: 'Chantier au quotidien',
    description: 'OS, sécurité, réception et facturation.',
    familles: [
      'Préparation & exécution',
      'Suivi de chantier',
      'Sécurité & prévention',
      'Réception & garanties',
      'Prix & facturation',
    ],
  },
  {
    id: 'enduits-facade',
    label: 'Enduits de façade',
    description:
      'Monocouche, supports RT/OC, finitions, points singuliers, modénatures et échafaudages — vocabulaire Lot 02.',
    familles: ['Enduits & façades'],
  },
  {
    id: 'fondations-gros-oeuvre',
    label: 'Fondations & Gros œuvre',
    description:
      'Sol, fondations, béton armé, terrassement, réseaux enterrés et structure GO — vocabulaire Lot 01.',
    familles: [
      'Terrassement & géotechnique',
      'Béton & aciers',
      'Eurocodes & structure',
      'Réseaux & lots techniques',
      'Suivi de chantier',
      'Sécurité & prévention',
      'Acteurs & organisation',
      'Documents du marché',
      'Réception & garanties',
      'Études & conception',
    ],
  },
  {
    id: 'admin-outils',
    label: 'Admin & outils',
    description: 'Plateformes, certifications et environnement.',
    familles: [
      'Plateformes & outils',
      'Certifications',
      'Environnement & déchets',
    ],
  },
  {
    id: 'moex-promoteur',
    label: 'MOEX & promoteur',
    description:
      'RE2020, suivi chantier, marché privé, sous-traitance et plateforme (PF).',
    familles: [
      'Études & conception',
      'Certifications',
      'Environnement & déchets',
      'Suivi de chantier',
      'Marché privé (promoteur)',
      'Sous-traitance',
      'Terrassement & géotechnique',
      'Réception & garanties',
      'Acteurs & organisation',
    ],
  },
  {
    id: 're2020',
    label: 'RE2020 & environnement',
    description: 'Bbio, Ic Construction, DH, FDES et Ic énergie.',
    familles: ['Certifications', 'Études & conception', 'Environnement & déchets'],
  },
  {
    id: 'sous-traitance',
    label: 'Sous-traitance',
    description: 'Agrément, contrat, vigilance et sécurité sous-traitants.',
    familles: ['Sous-traitance', 'Procédures & notation', 'Sécurité & prévention'],
  },
  {
    id: 'non-soumis-toutes',
    label: 'Termes non vus — toutes rubriques',
    description:
      'Questions jamais soumises, mélangées sur l\'ensemble du lexique (toutes les catégories).',
    familles: [],
    toutesRubriques: true,
    nonSoumisSeulement: true,
  },
];

/** Aide contextuelle affichée avant le quiz, par famille */
export const QUIZ_FAMILLE_AIDE: Record<
  Famille,
  { resume: string; astuce: string }
> = {
  'Procédures & notation': {
    resume: 'Comment un marché public est lancé et comment votre offre est notée.',
    astuce: 'Pensez au parcours : annonce (AAPC) → dossier (DCE) → offre → attribution.',
  },
  'Documents du marché': {
    resume: 'Le contenu du DCE : chaque pièce a un rôle (RC, CCAP, CCTP, AE…).',
    astuce: 'Ne confondez pas le CCTP (technique) et le CCAP (administratif).',
  },
  'Préparation & exécution': {
    resume: 'Avant et pendant les travaux : OS, plans, calendrier, réserves.',
    astuce: 'Règle d\'or : pas d\'OS écrit = pas de travaux officiels.',
  },
  'Prix & facturation': {
    resume: 'Comment on chiffre (DPGF, BPU) et comment on se fait payer.',
    astuce: 'Forfait (DPGF) ≠ unitaire (BPU + quantités réelles).',
  },
  'Plateformes & outils': {
    resume: 'Les sites et coffres-forts numériques du BTP public.',
    astuce: 'Chorus Pro = dépôt des factures ; APROVALL = attestations.',
  },
  'Acteurs & organisation': {
    resume: 'Qui commande, qui contrôle, qui fait quoi sur le chantier.',
    astuce: 'MOA = client · MOE = architecte/BET · vous = entreprise.',
  },
  'Sécurité & prévention': {
    resume: 'Documents et rôles pour travailler en sécurité.',
    astuce: 'PGC (commun) + PPSPS (par entreprise) + carte BTP.',
  },
  'Amiante & plomb': {
    resume: 'Diagnostics et réglementation avant d\'intervenir.',
    astuce: 'DTA/DAPP = repérage · SS3 = retrait · SS4 = intervention ponctuelle.',
  },
  'Environnement & déchets': {
    resume: 'Tri, traçabilité et schémas obligatoires sur chantier.',
    astuce: 'SOGED/SOPRE = comment vous gérez déchets et nuisances.',
  },
  Certifications: {
    resume: 'Labels et agréments qui prouvent la qualité.',
    astuce: 'QUALIBAT et CSTB/NF sont souvent exigés en marché public.',
  },
  'Sols & revêtements': {
    resume: 'Classes de résistance et finitions des revêtements.',
    astuce: 'UPEC = carte d\'identité d\'un sol (usure, eau, chimie…).',
  },
  'Finitions béton': {
    resume: 'Niveaux d\'exigence de la surface visible du béton.',
    astuce: 'Types 1 à 4 = du plus simple au plus soigné (NF DTU 21).',
  },
  'Terrassement & géotechnique': {
    resume: 'Sol, compactage et études géotechniques G1 à G5.',
    astuce: 'EV2 et PF1-PF4 = la solidité de la plateforme.',
  },
  'Eurocodes & structure': {
    resume: 'Normes de calcul des structures (béton, acier, bois…).',
    astuce: 'ELU = sécurité maximale · ELS = confort d\'usage.',
  },
  'Béton & aciers': {
    resume: 'Classes de béton, aciers et environnements d\'exposition.',
    astuce: 'C25/30 = béton courant · HA E500 = barres crantées.',
  },
  'Réseaux & lots techniques': {
    resume: 'Lots CVC, électricité, eau, EU/EP et accessibilité technique.',
    astuce: 'CFO = fort · CFA = faible (télécoms, alarme…).',
  },
  'Réception & garanties': {
    resume: 'Fin officielle des travaux, garanties légales et dossiers de livraison (DOE, DIUO).',
    astuce: 'DOE = ouvrage exécuté (CCAG) · DIUO = prévention des futurs intervenants (Code du travail).',
  },
  'Études & conception': {
    resume: 'BIM, calculs et indicateurs RE2020 (Bbio, Ic, DH).',
    astuce: 'BIM = maquette 3D partagée · FDES = preuve carbone des matériaux.',
  },
  'Suivi de chantier': {
    resume: 'Réunions, avenants, essais et installation de chantier.',
    astuce: 'Le compte-rendu de réunion de chantier fait foi chaque semaine.',
  },
  'Marché privé (promoteur)': {
    resume: 'Spécificités des chantiers promoteurs (VEFA, garanties…).',
    astuce: 'Exigez la garantie de paiement avant de démarrer.',
  },
  'Sous-traitance': {
    resume: 'Agrément, contrat, vigilance URSSAF et sécurité des sous-traitants.',
    astuce: 'DC4 + contrat écrit + garantie de paiement ST avant le premier jour.',
  },
  'Divers techniques': {
    resume: 'PMR, contraintes locales et validations MOE.',
    astuce: 'PMR = accessibilité personnes à mobilité réduite.',
  },
  'Enduits & façades': {
    resume: 'Monocouches, supports, finitions et coordination façade.',
    astuce: 'RT/OC : jamais d\'enduit plus dur que son support · DTU 26.1 = référence enduits.',
  },
};

export type QuestionQuiz = {
  terme: TermeLexique;
  options: TermeLexique[];
  bonneReponse: string;
  /** Indice affichable (sigle ou début du terme) */
  indice: string;
};

/** Filtre les termes selon les familles sélectionnées (null = toutes) */
export function poolQuiz(familles: Famille[] | null): TermeLexique[] {
  if (!familles || familles.length === 0) return [...LEXIQUE];
  return LEXIQUE.filter((t) => familles.includes(t.famille));
}

/** Pool hors termes déjà soumis (réponses validées). */
export function poolQuizNonSoumis(
  familles: Famille[] | null,
  soumis: ReadonlySet<string>,
): TermeLexique[] {
  return poolQuiz(familles).filter((t) => !soumis.has(t.id));
}

function indiceDebutant(terme: TermeLexique): string {
  if (terme.sigle) return `Sigle développé : « ${terme.sigle} »`;
  if (terme.terme.length <= 4) return `C'est un sigle ou acronyme court.`;
  const mots = terme.terme.split(/\s+/);
  return `Le terme commence par « ${mots[0]} ».`;
}

function choisirDistracteurs(terme: TermeLexique, pool: TermeLexique[]): TermeLexique[] {
  const autres = pool.filter((t) => t.id !== terme.id);
  const memeFamille = autres.filter((t) => t.famille === terme.famille);

  // Débutant : pièges de la même famille en priorité (plus pédagogique)
  if (memeFamille.length >= 3) {
    return melanger(memeFamille).slice(0, 3);
  }

  const manquants = 3 - memeFamille.length;
  const extra = melanger(autres.filter((t) => t.famille !== terme.famille)).slice(
    0,
    Math.max(manquants, 3 - memeFamille.length),
  );

  return melanger([...memeFamille.slice(0, 3), ...extra]).slice(0, 3);
}

function famillesDansPool(pool: TermeLexique[]): Famille[] {
  return [...new Set(pool.map((t) => t.famille))];
}

/**
 * Sélection équilibrée : une question par famille en priorité (thèmes non encore vus
 * dans la session d'abord), puis complément aléatoire.
 */
function selectionEquilibreeThemes(
  disponibles: TermeLexique[],
  nb: number,
  famillesCouvertes: ReadonlySet<Famille> = new Set(),
): TermeLexique[] {
  if (disponibles.length <= nb) return melanger([...disponibles]);

  const parFamille = new Map<Famille, TermeLexique[]>();
  for (const t of disponibles) {
    const liste = parFamille.get(t.famille) ?? [];
    liste.push(t);
    parFamille.set(t.famille, liste);
  }
  for (const [famille, liste] of parFamille) {
    parFamille.set(famille, melanger(liste));
  }

  const famillesNonCouvertes = melanger(
    [...parFamille.keys()].filter((f) => !famillesCouvertes.has(f)),
  );
  const famillesDejaCouvertes = melanger(
    [...parFamille.keys()].filter((f) => famillesCouvertes.has(f)),
  );
  const ordreFamilles = [...famillesNonCouvertes, ...famillesDejaCouvertes];

  const selection: TermeLexique[] = [];
  const pris = new Set<string>();
  let idx = 0;

  while (selection.length < nb && ordreFamilles.length > 0) {
    const famille = ordreFamilles[idx % ordreFamilles.length];
    const pile = parFamille.get(famille) ?? [];
    while (pile.length > 0 && pris.has(pile[pile.length - 1]!.id)) {
      pile.pop();
    }
    if (pile.length === 0) {
      ordreFamilles.splice(idx % ordreFamilles.length, 1);
      if (ordreFamilles.length === 0) break;
      continue;
    }
    const terme = pile.pop()!;
    pris.add(terme.id);
    selection.push(terme);
    idx++;
  }

  if (selection.length < nb) {
    const reste = melanger(disponibles.filter((t) => !pris.has(t.id)));
    selection.push(...reste.slice(0, nb - selection.length));
  }

  return melanger(selection);
}

export type OptionsGenererQuiz = {
  exclus?: ReadonlySet<string>;
  /** Familles déjà posées dans la session — on privilégie les autres thèmes. */
  famillesCouvertes?: ReadonlySet<Famille>;
};

/** Génère une série sans répéter les exclus ; répartition équilibrée si plusieurs thèmes. */
export function genererQuestionsQuiz(
  pool: TermeLexique[],
  nbCible = QUIZ_NB_QUESTIONS_CIBLE,
  exclusOrOptions: ReadonlySet<string> | OptionsGenererQuiz = new Set(),
): QuestionQuiz[] {
  const options: OptionsGenererQuiz =
    'exclus' in exclusOrOptions || 'famillesCouvertes' in exclusOrOptions
      ? exclusOrOptions
      : { exclus: exclusOrOptions as ReadonlySet<string> };
  const exclus = options.exclus ?? new Set();
  const famillesCouvertes = options.famillesCouvertes ?? new Set();

  const disponibles = pool.filter((t) => !exclus.has(t.id));
  if (disponibles.length < 4) return [];

  const nb = Math.min(nbCible, disponibles.length);
  const nbFamilles = famillesDansPool(disponibles).length;
  const selection =
    nbFamilles >= 2
      ? selectionEquilibreeThemes(disponibles, nb, famillesCouvertes)
      : melanger([...disponibles]).slice(0, nb);

  return selection.map((terme) => {
    const distracteurs = choisirDistracteurs(terme, pool);
    return {
      terme,
      options: melanger([terme, ...distracteurs]),
      bonneReponse: terme.id,
      indice: indiceDebutant(terme),
    };
  });
}

/** Nombre de familles distinctes dans une série de questions. */
export function compterFamillesSerie(questions: QuestionQuiz[]): number {
  return new Set(questions.map((q) => q.terme.famille)).size;
}

/** Termes encore disponibles dans la session (hors déjà posés) */
export function poolRestantQuiz(
  pool: TermeLexique[],
  exclus: ReadonlySet<string>,
): TermeLexique[] {
  return pool.filter((t) => !exclus.has(t.id));
}

/** Libellé des familles actives pour l'UI */
export function libelleSelectionQuiz(familles: Famille[] | null): string {
  if (!familles || familles.length === 0) return 'Toutes les catégories';
  if (familles.length === 1) return familles[0];
  return `${familles.length} catégories`;
}

export { FAMILLES };
