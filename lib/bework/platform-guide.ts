/** Contenu du guide « Ressources » — bon usage BeWork côté MOEX. */

export type GuideSection = {
  id: string;
  title: string;
  intro?: string;
  items: string[];
  emphasis?: 'warning' | 'info';
};

export const PLATFORM_GUIDE_SECTIONS: GuideSection[] = [
  {
    id: 'objet',
    title: "Qu'est-ce que BeWork ?",
    intro:
      "BeWork est l'outil interne de la plateforme BeWork, utilisé par les assistants travaux (Beworkers) pour traiter les demandes des maîtrises d'œuvre d'exécution externalisées (MOEX). L'IA prépare des brouillons (CR, courriers, tableaux, synthèses) ; le jugement professionnel reste humain.",
    items: [
      "Réservé aux assistants travaux (Beworkers) — pas un accès direct pour les MOEX clients finaux.",
      "Les demandes traitées proviennent des MOEX externalisés (chantier, marchés, courriers, GPA).",
      "Chaque document doit être relu et validé par l'assistant travaux et/ou le MOEX avant transmission.",
      "BeWork ne se substitue pas à un BET, un architecte, un bureau de contrôle ni à un conseil juridique.",
    ],
    emphasis: 'info',
  },
  {
    id: 'bon-usage',
    title: 'Bon usage au quotidien',
    items: [
      "Choisissez l'assistant adapté (CR chantier, courrier MOA, analyse DCE, etc.) plutôt que « demande diverse ».",
      "Rédigez un brief factuel : opération, lot, dates, faits constatés, références (plan, CCTP, DTU) — évitez le jargon vague.",
      "Pour un CR : indiquez le n° de CR et joignez ou résumez le CR précédent pour reprendre les points non soldés.",
      "Choisissez le modèle Claude selon la complexité : Haiku (économique, tâches simples), Sonnet (défaut, dossiers courants), Opus (dossiers lourds).",
      "Cochez la charte du skill quand un modèle officiel existe (ex. CR 3D MANAGER) ; décochez seulement pour un brouillon neutre.",
      "Téléchargez le fichier généré (.docx, PDF…) et corrigez-le dans Word avant toute diffusion.",
    ],
  },
  {
    id: 'verification',
    title: 'Obligation de vérification',
    intro:
      "L'IA peut se tromper, omettre un point, inventer une référence ou reformuler un constat. La responsabilité du contenu diffusé reste celle du MOEX.",
    items: [
      "Relire intégralement le livrable : faits, dates, numéros d'observation, entreprises, échéances, statuts (Levé / En cours / En attente).",
      "Vérifier la continuité avec le CR précédent : aucun point ouvert oublié, pas de renumérotation abusive.",
      "Contrôler les engagements : ne pas valider une formulation qui engage le MOEX sans mandat (délais, pénalités, acceptation de travaux).",
      "Comparer aux pièces de référence (plans, CCTP, PV, mails) avant envoi au MOA ou aux entreprises.",
      "Pour un CR : respecter le délai d'approbation mentionné dans le document ; ne pas diffuser sans validation interne.",
    ],
    emphasis: 'warning',
  },
  {
    id: 'precautions',
    title: 'Précautions et limites',
    items: [
      "Ne pas coller de données personnelles inutiles (acquéreurs, coordonnées) — anonymiser quand c'est possible.",
      "Ne pas traiter l'audio brut : transcrire d'abord une visite ou une dictée, puis lancer la demande.",
      "Les photos de chantier ne sont pas analysées automatiquement dans tous les assistants : les décrire dans le brief si besoin.",
      "En cas de doute technique ou juridique, solliciter un collègue senior ou le responsable de mission — pas seulement l'IA.",
      "Conserver une trace : version validée par le MOEX, pas uniquement la sortie automatique.",
    ],
    emphasis: 'warning',
  },
  {
    id: 'checklist',
    title: 'Checklist avant diffusion',
    items: [
      "Le titre et la référence chantier / marché sont corrects.",
      "Les présents, absents et le rédacteur sont exacts.",
      "Chaque observation est factuelle, numérotée et classée par lot.",
      "Les points du CR précédent ont été repris ou explicitement soldés.",
      "Le document a été relu par un professionnel habilité au nom du bureau.",
      "La version envoyée est celle validée — pas le brouillon IA tel quel.",
    ],
    emphasis: 'warning',
  },
];

export const PLATFORM_GUIDE_INTRO = {
  kicker: 'Ressources assistants travaux',
  title: "Guide d'utilisation BeWork",
  subtitle:
    "Bonnes pratiques pour les Beworkers : traiter les demandes MOEX, précautions et vérification obligatoire avant transmission.",
};
