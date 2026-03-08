import { NextResponse } from 'next/server'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { post, subject, audience, provider = 'openai' as AIProvider } = body || {}

    if (!post || typeof post !== 'string' || !post.trim()) {
      return NextResponse.json(
        { error: 'Colle le post viral à analyser' },
        { status: 400 }
      )
    }

    const subjectInput = subject && typeof subject === 'string' ? subject.trim() : 'Sujet à définir'
    const audienceInput = audience && typeof audience === 'string' ? audience.trim() : 'Professionnels LinkedIn'

    const systemPrompt = `Tu es un expert en copywriting LinkedIn, analyse de contenu viral et growth marketing.

RÈGLE ABSOLUE : Ne jamais copier le contenu original. Tu reproduis UNIQUEMENT la structure et les techniques d'engagement.

---

## Étape 1 — ANALYSE DU POST VIRAL

Analyse le post et identifie :
- Type de hook (polémique, curiosité, promesse, question, storytelling, statistique...)
- Structure narrative
- Techniques de persuasion utilisées
- Type de CTA

Éléments à repérer :
• Curiosité
• Tension narrative
• Storytelling
• Preuve (chiffres, témoignages)
• Contraste (avant/après, eux/nous)
• Insight inattendu
• Promesse implicite

---

## Étape 2 — EXTRACTION DE LA STRUCTURE

Extraire la structure logique du post sous forme de blocs.
Exemples de structures virales :

STRUCTURE 1 — Hook polémique : Hook → Insight → Arguments → Conclusion → CTA
STRUCTURE 2 — Story personnelle : Hook → Situation → Problème → Découverte → Leçon → CTA
STRUCTURE 3 — Insight surprenant : Hook → Observation → Explication → Exemple → Conclusion → CTA
STRUCTURE 4 — Liste d'erreurs : Hook → Problème → 3 erreurs fréquentes → Solution → CTA
STRUCTURE 5 — Comparaison : Hook → Comparaison → Analyse → Résultat → CTA

---

## Étape 3 — NOUVEAU POST GÉNÉRÉ

Créer un post TOTALEMENT ORIGINAL sur le sujet fourni, pour l'audience cible.
Conserver la mécanique narrative et les techniques, pas le contenu.

Règles de rédaction :
- Phrases courtes
- 1 idée par ligne
- Paragraphes espacés
- Lecture mobile
- 8 à 18 lignes

CTA engageant (exemples) :
"Qu'en pensez-vous ?" | "Curieux d'avoir votre avis." | "Vous avez déjà testé ?" | "Commentez si vous voulez le guide."

---

Réponds UNIQUEMENT avec un JSON valide :
{
  "analysis": "ANALYSE DU POST VIRAL\\n\\nType de hook : ...\\nStructure narrative : ...\\nTechniques utilisées : ...\\nType de CTA : ...",
  "structure": "STRUCTURE EXTRAITE\\n\\n1. Hook polémique\\n2. Problème courant\\n3. Insight inattendu\\n...",
  "newPost": "Le nouveau post optimisé prêt à publier, avec \\n\\n entre blocs"
}`

    const userPrompt = `Post viral à analyser :

---
${post.trim()}
---

Sujet pour le nouveau post : "${subjectInput}"
Audience cible : "${audienceInput}"

Fournis : 1) ANALYSE, 2) STRUCTURE EXTRAITE, 3) NOUVEAU POST (original, prêt à publier).`

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      maxTokens: 2500,
      temperature: 0.6,
    })

    if (!content) {
      return NextResponse.json({ error: 'Réponse vide' }, { status: 502 })
    }

    let jsonStr = content
    const match = content.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (match) jsonStr = match[1].trim()

    const parsed = JSON.parse(jsonStr) as {
      analysis?: string
      structure?: string
      newPost?: string
    }

    return NextResponse.json({
      analysis: typeof parsed.analysis === 'string' ? parsed.analysis : '',
      structure: typeof parsed.structure === 'string' ? parsed.structure : '',
      newPost: typeof parsed.newPost === 'string' ? parsed.newPost : '',
    })
  } catch (e) {
    console.error('analyze-viral-post error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur' },
      { status: 500 }
    )
  }
}
