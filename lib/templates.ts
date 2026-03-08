/**
 * Bibliothèque de templates viraux pour LinkedIn
 * Format inspiré des outils USA/Chine (MagicPost, Postwriter, ContentIn)
 */

export interface Template {
  id: string
  name: string
  desc: string
  category: 'liste' | 'question' | 'storytelling' | 'erreur-leçon' | 'conseil' | 'chiffre' | 'cta' | 'teasing' | 'opinion' | 'autre'
  prompt: string
  icon: string
}

export const TEMPLATES: Template[] = [
  { id: 'liste-5', name: 'Liste 5 points', desc: '5 conseils ou erreurs à éviter', category: 'liste', icon: '📋', prompt: 'Format : introduction courte puis liste numérotée de 5 points. Chaque point = 1–2 phrases percutantes. Terminer par CTA ou question.' },
  { id: 'liste-7', name: 'Liste 7 erreurs', desc: '7 erreurs que font les pros', category: 'liste', icon: '⚠️', prompt: 'Format : "Voici les 7 erreurs que j\'ai vues..." — chaque erreur avec 1 phrase d\'explication. Ton direct, pas moralisateur.' },
  { id: 'question-ouvrante', name: 'Question ouvrante', desc: 'Ouvre par une question qui accroche', category: 'question', icon: '❓', prompt: 'Commence par une question provocante ou intrigante. Réponds en 2–3 paragraphes. Termine par une question pour engager les commentaires.' },
  { id: 'story-fail', name: 'Story échec → leçon', desc: 'Une erreur que j\'ai faite...', category: 'storytelling', icon: '📖', prompt: 'Format : anecdote personnelle courte (échec ou erreur), la leçon tirée, application pratique pour le lecteur. Authentique, pas prétentieux.' },
  { id: 'story-success', name: 'Story succès', desc: 'Comment j\'ai réussi à...', category: 'storytelling', icon: '🏆', prompt: 'Format : situation initiale, action menée, résultat. Partager une méthode reproductible. Finir par une invite à partager leur expérience.' },
  { id: 'mythe-vs-realite', name: 'Mythe vs réalité', desc: 'Ce qu\'on croit vs la vérité', category: 'conseil', icon: '🔄', prompt: 'Format : "Mythe : X / Réalité : Y". 3–4 paires. Ton expert mais accessible. Donner des exemples concrets.' },
  { id: 'chiffre-choc', name: 'Chiffre choc', desc: 'Ouvre avec une statistique marquante', category: 'chiffre', icon: '📊', prompt: 'Commence par un chiffre ou une donnée surprenante (étude, tendance). Explique pourquoi c\'est important. Propose une action ou une réflexion.' },
  { id: 'avant-apres', name: 'Avant / Après', desc: 'Transformation en 2 états', category: 'conseil', icon: '⏩', prompt: 'Format : "Avant : [situation]. Après : [résultat]". Montrer une transformation concrète. Méthode en 2–3 points.' },
  { id: 'conseil-1', name: 'Un seul conseil fort', desc: 'Un message, une idée claire', category: 'conseil', icon: '💡', prompt: 'Un seul conseil développé en profondeur. Pas de liste. Exemple concret, explication, application. Maximum d\'impact.' },
  { id: 'teasing', name: 'Teasing', desc: 'Suspense pour la suite', category: 'teasing', icon: '🔮', prompt: 'Annonce quelque chose d\'intéressant sans tout révéler. Crée la curiosité. "La suite dans le prochain post" ou invite au commentaire.' },
  { id: 'opinion-forte', name: 'Opinion forte', desc: 'Prise de position assumée', category: 'opinion', icon: '🎯', prompt: 'Prendre position de façon claire. Argumenter en 2–3 paragraphes. Inviter au débat respectueux.' },
  { id: 'cta-direct', name: 'CTA direct', desc: 'Appel à l\'action clair', category: 'cta', icon: '📣', prompt: 'Message court et direct. Objectif : inciter à agir (télécharger, s\'inscrire, commenter). Valeur claire + CTA sans être pushy.' },
  { id: 'liste-conseils-rapides', name: 'Conseils rapides', desc: '10+ conseils en une phrase chacun', category: 'liste', icon: '⚡', prompt: 'Liste de 10 à 15 conseils très courts (1 phrase max chacun). Format dense, facile à scanner.' },
  { id: 'question-rhetorique', name: 'Question rhétorique', desc: 'Question à laquelle tu réponds', category: 'question', icon: '🤔', prompt: 'Pose une question que ton audience se pose. Réponds de façon structurée. Invite à partager leur point de vue.' },
  { id: 'citation-commentee', name: 'Citation commentée', desc: 'Citer et réagir', category: 'opinion', icon: '💬', prompt: 'Cite une phrase (étude, expert, proverbe). Commente en 2–3 paragraphes. Apporte ton angle.' },
  { id: 'journee-type', name: 'Journée type', desc: 'Un jour dans ma vie pro', category: 'storytelling', icon: '📅', prompt: 'Format : chronologie d\'une journée. Montrer le quotidien, les défis, les wins. Humain et relatable.' },
  { id: 'comparaison', name: 'Comparaison A vs B', desc: 'Deux approches opposées', category: 'conseil', icon: '⚖️', prompt: 'Compare deux approches, outils ou mentalités. Avantages/inconvénients. Quelle est la meilleure selon le contexte.' },
  { id: 'prediction', name: 'Prédiction / tendance', desc: 'Ce qui va changer', category: 'opinion', icon: '🔮', prompt: 'Partage une prédiction ou tendance. Explique pourquoi. Invite à se préparer ou à réagir.' },
  { id: 'remerciement', name: 'Remerciement + valeur', desc: 'Merci + leçon apprise', category: 'storytelling', icon: '🙏', prompt: 'Remercie quelqu\'un ou une situation. Tire une leçon ou une valeur. Authentique, pas corporate.' },
  { id: 'debunk', name: 'Débunk', desc: 'Corriger une idée reçue', category: 'conseil', icon: '🔬', prompt: '"Non, X n\'est pas vrai. Voici pourquoi." Déconstruire une croyance avec faits et exemples.' },
  { id: 'carrousel', name: 'Format carrousel', desc: '6-10 slides pour Canva', category: 'autre', icon: '▦', prompt: 'Structure le post en SLIDES pour carrousel LinkedIn/Canva. Chaque slide = une idée forte. Format exact à respecter :\n\nSLIDE 1 : [titre court]\n[1-2 phrases]\n\nSLIDE 2 : [titre court]\n[1-2 phrases]\n\n... jusqu\'à 6-10 slides. Chaque titre = 3-5 mots max. Texte par slide = 1-2 phrases.' },
]

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id)
}
