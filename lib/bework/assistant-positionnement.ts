/**
 * Positionnement assistant travaux BTP — source : document de cadrage BeWork.
 * BeWork ne remplace pas la MOE ; il renforce l'entreprise d'exécution.
 */

export const ASSISTANT_POSITIONNEMENT = {
  tagline: 'BeWork ne remplace pas la MOE. BeWork renforce l\'entreprise travaux.',
  summary:
    'Assistant travaux externalisé pour les entreprises d\'exécution : renfort administratif, documentaire et opérationnel. BeWork prépare, organise, relance et classe — les décisions techniques, financières, contractuelles et de sécurité restent validées par votre équipe.',
  interlocuteurs:
    'Conducteur de travaux, chargé d\'affaires, responsable administratif travaux ou dirigeant.',
  validationRule:
    'Tout élément engageant (prix, délai, variante, devis modificatif, situation, réponse contractuelle, engagement fournisseur ou sous-traitant) doit être validé par l\'entreprise avant envoi.',
} as const;

export const ASSISTANT_VALUE_PROPS = [
  {
    id: 'prepare',
    title: 'Prépare',
    description: 'Documents, tableaux, synthèses et relances — prêts pour relecture.',
  },
  {
    id: 'structure',
    title: 'Structure',
    description: 'Dossiers, preuves, DOE et suivi chantier — classés au fil de l\'eau.',
  },
  {
    id: 'alerte',
    title: 'Alerte',
    description: 'Points bloquants, pièces manquantes et échéances — remontées claires.',
  },
] as const;

export const ASSISTANT_MISSION_FAMILIES = [
  {
    id: 'admin-exec',
    title: 'Gestion administrative de l\'exécution',
    examples: 'Dossiers de démarrage, pièces marché, tableaux de suivi, agréments sous-traitance.',
  },
  {
    id: 'docs-op',
    title: 'Documents opérationnels',
    examples: 'Rapports, fiches de suivi, projets de courriers, CR internes, fiches techniques.',
  },
  {
    id: 'suivi-fin',
    title: 'Suivi financier',
    examples: 'Devis, bons de commande, situations, éléments de facturation à valider.',
  },
  {
    id: 'coord-chantier',
    title: 'Coordination chantier',
    examples: 'Demandes terrain, fournisseurs, sous-traitants — infos prêtes pour réunions et relances.',
  },
  {
    id: 'logistique',
    title: 'Logistique',
    examples: 'Approvisionnements, livraisons, confirmations fournisseurs, pièces associées.',
  },
  {
    id: 'qualite-securite',
    title: 'Qualité & sécurité',
    examples: 'PPSPS, EPI, attestations, PV, fiches techniques, photos et preuves.',
  },
  {
    id: 'reception-doe',
    title: 'Réception & fin de chantier',
    examples: 'Tableaux de réserves, relances de levée, constitution DOE, archivage marché.',
  },
] as const;

export const ASSISTANT_DOES = [
  'Lire un DCE et produire une synthèse opérationnelle.',
  'Préparer tableaux de suivi, relances et alertes.',
  'Rédiger comptes rendus internes et projets de courriers.',
  'Centraliser fiches techniques, PV, notices et garanties.',
  'Préparer dossiers administratifs de démarrage et d\'exécution.',
  'Suivre les réserves et préparer les relances.',
  'Constituer le DOE au fil de l\'eau.',
] as const;

export const ASSISTANT_DOES_NOT = [
  'Remplacer la maîtrise d\'œuvre ou l\'architecte.',
  'Viser officiellement les plans ou notes de calcul.',
  'Donner des ordres de service ou instructions contractuelles.',
  'Valider une solution technique à la place du BET, de la MOE ou du bureau de contrôle.',
  'Engager juridiquement ou financièrement l\'entreprise.',
  'Réceptionner officiellement les travaux à la place du MOA ou de la MOE.',
  'Se substituer au conducteur de travaux sur les arbitrages chantier.',
] as const;

export const ASSISTANT_WHEN_TO_USE = [
  {
    situation: 'Conducteur de travaux saturé',
    benefit: 'Relances, tableaux, CR internes et dossiers en attente traités en renfort.',
  },
  {
    situation: 'Beaucoup de pièces à transmettre',
    benefit: 'Suivi fiches techniques, plans, échantillons, PV et visas.',
  },
  {
    situation: 'DOE en retard',
    benefit: 'Collecte au fil de l\'eau, classement et tableau de pièces manquantes.',
  },
  {
    situation: 'Réserves nombreuses',
    benefit: 'Tableau par zone, responsable, délai, preuve photo et relances ciblées.',
  },
  {
    situation: 'Marché public administratif',
    benefit: 'Suivi OS, situations, pièces contractuelles et preuves.',
  },
  {
    situation: 'Entreprise en croissance',
    benefit: 'Structuration d\'une méthode travaux sans recruter immédiatement.',
  },
] as const;
