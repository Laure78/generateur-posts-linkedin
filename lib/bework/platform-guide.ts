/** Contenu du guide « Ressources » — bon usage BeWork (entreprises BTP). */

import { MOEX_PLATFORM } from './moex-platform';

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
      'BeWork est la plateforme qui accompagne les entreprises du BTP confrontées aux marchés publics (appels d\'offres, DCE, mémoires) et aux marchés privés (promoteur, lots, réserves). Les assistants travaux utilisent l\'IA pour préparer des brouillons (CR, courriers, tableaux, synthèses) ; le jugement professionnel reste humain.',
    items: [
      'Public : entreprises du bâtiment et des travaux publics — équipes bureau et chantier.',
      'Marchés publics : AO, DCE, RC, mémoire technique, conformité des offres.',
      'Marchés privés : courriers promoteur, réserves, DOE, relances, situations de travaux.',
      'Chaque document doit être relu et validé avant envoi au maître d\'ouvrage ou au client.',
      'BeWork ne se substitue pas à un BET, un architecte, un bureau de contrôle ni à un conseil juridique.',
    ],
    emphasis: 'info',
  },
  {
    id: 'bon-usage',
    title: 'Bon usage au quotidien',
    items: [
      "Choisissez l'assistant adapté (CR chantier, courrier MOA, analyse DCE, comparatif d'offres, etc.) plutôt que « demande diverse ».",
      "Rédigez un brief factuel : opération, lot, dates, faits constatés, références (plan, CCTP, DTU) — évitez le jargon vague.",
      'Pour un CR : indiquez le n° de CR et joignez ou résumez le CR précédent pour reprendre les points non soldés.',
      'Choisissez le modèle Claude selon la complexité : Haiku (économique, tâches simples), Sonnet (défaut, dossiers courants), Opus (dossiers lourds).',
      'Cochez la charte du skill quand un modèle officiel existe (ex. CR 3D MANAGER) ; décochez seulement pour un brouillon neutre.',
      'Téléchargez le fichier généré (.docx, PDF…) et corrigez-le dans Word avant toute diffusion.',
    ],
  },
  {
    id: 'validation-chef',
    title: "Validation chef d'équipe avant envoi client",
    intro:
      "Aucun livrable ne part au client ou au maître d'ouvrage sans feu vert du chef d'équipe ou du responsable entreprise, après relecture.",
    items: [
      "L'assistant travaux prépare et relit le brouillon IA.",
      "Le chef d'équipe valide le fond, la forme et le niveau d'engagement du document.",
      "Seulement ensuite : transmission au donneur d'ordre, au promoteur ou au client, selon votre circuit.",
    ],
    emphasis: 'warning',
  },
  {
    id: 'verification',
    title: 'Obligation de vérification',
    intro:
      "L'IA peut se tromper, omettre un point, inventer une référence ou reformuler un constat. La responsabilité du contenu diffusé reste celle de l'entreprise.",
    items: [
      "Relire intégralement le livrable : faits, dates, numéros d'observation, entreprises, échéances, statuts (Levé / En cours / En attente).",
      'Vérifier la continuité avec le CR précédent : aucun point ouvert oublié, pas de renumérotation abusive.',
      "Contrôler les engagements : ne pas valider une formulation qui engage l'entreprise sans mandat (délais, pénalités, acceptation de travaux).",
      'Comparer aux pièces de référence (plans, CCTP, PV, mails) avant envoi au MOA, au promoteur ou aux entreprises.',
      'Pour un CR : respecter le délai d\'approbation mentionné dans le document ; ne pas diffuser sans validation interne.',
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
      'Conserver une trace : version validée par l\'entreprise, pas uniquement la sortie automatique.',
    ],
    emphasis: 'warning',
  },
  {
    id: 'checklist',
    title: 'Checklist avant diffusion',
    items: [
      'Le titre et la référence chantier / marché sont corrects.',
      'Les présents, absents et le rédacteur sont exacts.',
      'Chaque observation est factuelle, numérotée et classée par lot.',
      'Les points du CR précédent ont été repris ou explicitement soldés.',
      "Le document a été relu par l'assistant travaux.",
      "Validation du chef d'équipe ou du responsable entreprise obtenue avant envoi.",
      'La version envoyée est celle validée — pas le brouillon IA tel quel.',
    ],
    emphasis: 'warning',
  },
];

export const PLATFORM_GUIDE_INTRO = {
  kicker: 'Ressources entreprises BTP',
  title: "Guide d'utilisation BeWork",
  subtitle: `Bonnes pratiques pour ${MOEX_PLATFORM.audienceLong} : précautions et vérification obligatoire avant diffusion.`,
};
