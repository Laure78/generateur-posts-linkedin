import { NextResponse } from 'next/server'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      profileSummary,
      recommendedTopic,
      objective = 'visibilité',
      provider = 'openrouter' as AIProvider,
      openRouterModel,
    } = body || {}

    if (!recommendedTopic || typeof recommendedTopic !== 'string' || !recommendedTopic.trim()) {
      return NextResponse.json(
        { error: 'Sujet recommandé requis' },
        { status: 400 }
      )
    }

    const profileContext = profileSummary && typeof profileSummary === 'string'
      ? `Contexte profil : ${profileSummary}`
      : ''

    const systemPrompt = `Tu génères 3 variantes différentes d'un post LinkedIn sur le même sujet.
Chaque variante doit avoir un angle différent :
- Variante 1 : angle question / curiosité
- Variante 2 : angle chiffre / données
- Variante 3 : angle storytelling / anecdote

Règles : phrases courtes, 1 idée par ligne, 10-18 lignes, structure Hook → Insight → CTA.
Objectif : ${objective}

Réponds UNIQUEMENT avec un JSON valide :
{"variants":["Post variante 1...","Post variante 2...","Post variante 3..."]}`

    const userPrompt = `${profileContext}

Sujet : ${recommendedTopic.trim()}

Génère 3 variantes du post.`

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      openRouterModel: openRouterModel || undefined,
      maxTokens: 2000,
      temperature: 0.8,
    })

    if (!content) {
      return NextResponse.json({ error: 'Réponse vide' }, { status: 502 })
    }

    let jsonStr = content
    const match = content.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (match) jsonStr = match[1].trim()

    const parsed = JSON.parse(jsonStr) as { variants?: string[] }
    const variants = Array.isArray(parsed.variants) ? parsed.variants.slice(0, 3) : []

    return NextResponse.json({ variants })
  } catch (e) {
    console.error('copilote-linkedin-variants error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur' },
      { status: 500 }
    )
  }
}
