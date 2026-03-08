import { NextResponse } from 'next/server'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

const OBJECTIVES = ['visibilité', 'leads', 'autorité', 'storytelling']

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      profile,
      niche,
      objective = 'visibilité',
      pastPosts,
      provider = 'openrouter' as AIProvider,
      openRouterModel,
    } = body || {}

    if (!profile || typeof profile !== 'string' || !profile.trim()) {
      return NextResponse.json(
        { error: 'Colle le contenu de ton profil LinkedIn (headline, bio)' },
        { status: 400 }
      )
    }

    const nicheInput = niche && typeof niche === 'string' ? niche.trim() : ''
    const objectiveInput = OBJECTIVES.includes(objective) ? objective : 'visibilité'
    const postsInput = pastPosts && typeof pastPosts === 'string' ? pastPosts.trim() : ''

    const systemPrompt = `Tu es un Copilote LinkedIn, assistant stratégique de contenu. Ta mission : analyser le profil et l'historique de l'utilisateur, identifier la meilleure opportunité de contenu, et générer le post LinkedIn le plus engageant pour aujourd'hui.

## Étape 1 — Analyse du profil
Extrais : expertise, audience cible, positionnement, thématiques principales.

## Étape 2 — Si historique fourni
Analyse le style, la longueur, la structure des posts. Identifie ce qui performe.

## Étape 3 — Opportunité de contenu
Détermine UN sujet susceptible de générer : commentaires, partages, discussions. Objectif utilisateur : ${objectiveInput}.

## Étape 4 — Post optimal
Structure : Hook → Observation → Insight → Liste ou exemple → Conclusion → CTA.
Règles : phrases courtes, 1 idée par ligne, 10 à 18 lignes, lecture mobile.

## Étape 5 — Score de potentiel viral /100
Évalue : puissance du hook (25), clarté (25), potentiel engagement (25), CTA déclencheur de commentaires (25).

Réponds UNIQUEMENT avec un JSON valide :
{
  "profileSummary": "Résumé court du profil (expertise, audience, positionnement)",
  "recommendedTopic": "Le sujet recommandé pour aujourd'hui",
  "post": "Le post complet avec \\n\\n entre blocs",
  "score": 75,
  "scoreDetails": "Hook: X/25, Clarté: X/25, Engagement: X/25, CTA: X/25"
}`

    let userPrompt = `Profil LinkedIn à analyser :
---
${profile.trim()}
---`
    if (nicheInput) userPrompt += `\nNiche / secteur : ${nicheInput}`
    userPrompt += `\nObjectif du post : ${objectiveInput}`

    if (postsInput) {
      userPrompt += `

Historique de posts passés :
---
${postsInput}
---`
    }

    userPrompt += `

Analyse le profil, identifie la meilleure opportunité, génère le post optimal et le score.`

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      openRouterModel: openRouterModel || undefined,
      maxTokens: 2500,
      temperature: 0.7,
    })

    if (!content) {
      return NextResponse.json({ error: 'Réponse vide' }, { status: 502 })
    }

    let jsonStr = content
    const match = content.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (match) jsonStr = match[1].trim()

    const parsed = JSON.parse(jsonStr) as {
      profileSummary?: string
      recommendedTopic?: string
      post?: string
      score?: number
      scoreDetails?: string
    }

    const score = Math.min(100, Math.max(0, Number(parsed.score) || 0))

    return NextResponse.json({
      profileSummary: typeof parsed.profileSummary === 'string' ? parsed.profileSummary : '',
      recommendedTopic: typeof parsed.recommendedTopic === 'string' ? parsed.recommendedTopic : '',
      post: typeof parsed.post === 'string' ? parsed.post : '',
      score,
      scoreDetails: typeof parsed.scoreDetails === 'string' ? parsed.scoreDetails : '',
    })
  } catch (e) {
    console.error('copilote-linkedin error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur' },
      { status: 500 }
    )
  }
}
