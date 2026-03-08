/**
 * Base de connaissance — Profil LinkedIn Laure Olivié
 * Source : Export profil LinkedIn (PDF)
 * Utilisée pour personnaliser les contenus générés par l'IA
 */

export const LAURE_PROFILE = {
  name: 'Laure Olivié',
  title: 'Formatrice IA BTP | Formateur LinkedIn Learning IA BTP | Partenaire FFB Artisans',
  headline: '+1 500 pros formés | Devis • Chantiers • Appels d\'offres | Certifiée Qualiopi | 100% finançable Constructys & FAFCEA',
  location: 'Paris et périphérie',
  linkedin: 'https://www.linkedin.com/in/laure-olivie/',
  website: 'https://www.ofc-creation-entreprise.fr',
  email: 'laureolivie@yahoo.fr',
  calendly: 'https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation',

  skills: ['Transformation numérique', 'Secteur de la construction', 'Automatisation des processus'],
  certifications: ['Activateur numérique', 'Certification QUALIOPI'],

  valueProposition: `Vous perdez 5 à 10 heures par semaine sur vos devis, appels d'offres et tâches administratives ?
Je forme les professionnels du BTP à utiliser l'IA générative pour récupérer ce temps — sans jargon technique, sans bouleverser vos habitudes de terrain.`,

  whatIDo: {
    devis: 'Devis & appels d\'offres : génération automatique en 5 min au lieu de 45 min',
    admin: 'Administratif : relances, emails, comptes rendus de chantier dictés à l\'oral',
    visibilite: 'Visibilité locale : contenus pros (avant/après chantier, posts réseaux sociaux)',
    assistants: 'Assistants IA sur mesure : configurés sur vos process, documents et métier',
  },

  targetAudience: [
    'Artisans & TPE du bâtiment (maçonnerie, électricité, plomberie, menuiserie…)',
    'PME/ETI BTP souhaitant structurer un plan IA pour leurs équipes',
    'Fédérations & organismes BTP (FFB, CAPEB, OPPBTP…)',
  ],

  whyChooseMe: [
    '+1 500 professionnels BTP formés avec des gains mesurés',
    '10 ans d\'expérience opérationnelle dans les travaux publics',
    'Certifiée Qualiopi — formation 100% finançable Constructys & FAFCEA',
    'Référencée FFB Grand Paris, FFB Yvelines, FFB Seine-et-Marne, IFRBTP 78, GERESO, Lefebvre Dalloz, CNAM Entreprise',
  ],

  formations: [
    '"L\'IA au service du BTP" (4h à 7h) : fondamentaux, devis, appels d\'offres, organisation de chantier, visibilité locale — Kit 50 prompts BTP offert',
    'Parcours IA en entreprise BTP : acculturation, cas d\'usage métiers (fonction RH, Assistante administrative, Conducteur de travaux), création d\'assistants IA',
    'Ateliers sur mesure : webinaires, masterclass, journées fil rouge pour fédérations & réseaux BTP',
  ],

  results: {
    devis: '+5h/semaine récupérées sur la rédaction de devis',
    admin: '-50% de temps sur la gestion administrative',
    ao: 'Taux de conversion appels d\'offres amélioré de +30%',
    formed: '+1 500 professionnels BTP formés depuis 2024',
  },

  experience: {
    linkedinLearning: 'Formatrice IA BTP LinkedIn Learning — Formation "L\'IA pour les artisans et TPE : recruter sa main-d\'œuvre efficacement"',
    laureOlivie: 'Formatrice IA Générative | BTP & Artisans | Qualiopi | Constructys & FAFCEA — Montigny-le-Bretonneux',
    aliaBtp: 'Dirigeante & Fondatrice ALIA BTP — Aménagement extérieur, Yvelines — Expérience terrain qui nourrit la pédagogie',
  },

  /** Système LinkedIn — Inspiré du LinkedIn Content System (Hana | Zee Scale) */
  linkedInContentSystem: {
    principe: 'Une heure bien utilisée vaut mieux que 5 posts balancés dans le vide. Visibilité structurée, portée qui convertit.',
    quatreMouvements: [
      'Chauffe le feed : commente 5 posts de ta cible avant de publier. L\'algo te voit. Les gens te voient.',
      'Lance avec structure : ton premier commentaire sous ton propre post, tu le poses dans la minute. Ça booste la portée et ça donne le ton.',
      'Engage vraiment : réponds à chaque commentaire comme si c\'était un café. Pas "Merci !", une vraie phrase. C\'est là que les relations se construisent.',
      'Relance tes DM : prends 10 minutes pour écrire à 3 personnes qui ont interagi cette semaine. Pas un pitch.',
    ],
    structurePost: 'Accroche percutante → Problème/Contraste → 4 mouvements numérotés → Phrase de synthèse → PS (optionnel) → CTA repartage (♻️) → Signature avec proposition de valeur',
  },
}

/** Retourne le contexte profil pour les prompts IA */
export function getProfileContextForPrompt(): string {
  return `
PROFIL ET BASE DE CONNAISSANCE — Laure Olivié

Identité : ${LAURE_PROFILE.name} — ${LAURE_PROFILE.title}
${LAURE_PROFILE.headline}

Proposition de valeur : ${LAURE_PROFILE.valueProposition}

Ce qu'elle fait concrètement :
- ${LAURE_PROFILE.whatIDo.devis}
- ${LAURE_PROFILE.whatIDo.admin}
- ${LAURE_PROFILE.whatIDo.visibilite}
- ${LAURE_PROFILE.whatIDo.assistants}

Public cible : ${LAURE_PROFILE.targetAudience.join(' ; ')}

Pourquoi la choisir : ${LAURE_PROFILE.whyChooseMe.join(' ; ')}

Résultats mesurés : ${LAURE_PROFILE.results.devis} ; ${LAURE_PROFILE.results.admin} ; ${LAURE_PROFILE.results.ao} ; ${LAURE_PROFILE.results.formed}

Formations : ${LAURE_PROFILE.formations.join(' | ')}

Contact : ${LAURE_PROFILE.email} | RDV : ${LAURE_PROFILE.calendly}

SYSTÈME LINKEDIN (inspiration LinkedIn Content System) — Structure de post efficace :
- Accroche percutante + contraste (ce que font la plupart vs ce qui marche)
- 4 mouvements : 1) Chauffe le feed (commente 5 posts avant de publier), 2) Premier commentaire sous ton post dans la minute, 3) Réponds à chaque commentaire avec une vraie phrase, 4) Relance 3 DM par semaine
- Phrase de synthèse + PS optionnel + CTA repartage (♻️) + Signature avec proposition de valeur

INSTRUCTION : Écris comme Laure — ton terrain, concret, sans jargon. Utilise ses chiffres et son expertise BTP quand pertinent. Signature par défaut : "Laure Formatrice IA BTP". Tu peux t'inspirer de la structure 4 mouvements pour les posts sur la stratégie LinkedIn.
`.trim()
}

/** Alias pour les imports */
export const getLaureProfileContext = getProfileContextForPrompt
