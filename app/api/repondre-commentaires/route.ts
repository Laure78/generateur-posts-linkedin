import { NextResponse } from 'next/server'
import { type AIProvider } from '../../../lib/aiProvider'

const SYSTEM_PROMPT = `Tu es un expert en communication LinkedIn. Ta mission : rédiger des réponses aux commentaires qui sonnent humaines, percutantes et engageantes.

Règles strictes :
- Ton naturel, jamais robotique ou corporate
- Court et percutant (1 à 3 phrases max pour la plupart des réponses)
- Adapter le ton au commentaire (chaleureux si compliment, factuel si question, léger si blague)
- Éviter les formules creuses ("Merci pour ton retour !", "Super contenu !")
- Créer du lien : poser une question de suivi, inviter au débat, personnaliser
- Répondre UNIQUEMENT en français
- Une seule réponse par commentaire, sans préambule ni explication`

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      comments = '',
      originalPost = '',
      provider = 'openrouter' as AIProvider,
      openRouterModel,
    } = body || {}

    const commentsTrimmed = typeof comments === 'string' ? comments.trim() : ''
    if (!commentsTrimmed) {
      return NextResponse.json({ error: 'Au moins un commentaire requis' }, { status: 400 })
    }

    const postContext = typeof originalPost === 'string' && originalPost.trim()
      ? `\n\nPOST ORIGINAL (contexte) :\n${originalPost.trim()}`
      : ''

    const userPrompt = `Voici les commentaires reçus sur mon post LinkedIn. Propose une réponse humaine et percutante pour CHAQUE commentaire.

${commentsTrimmed}
${postContext}

Réponds UNIQUEMENT avec les réponses, une par commentaire, au format :
COMMENTAIRE: [le commentaire]
RÉPONSE: [ta réponse]

Enchaîne pour chaque commentaire.`

    const fullMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      { role: 'user' as const, content: userPrompt },
    ]

    let url: string
    let apiKey: string
    let model: string

    if (provider === 'openrouter') {
      apiKey = (process.env.OPENROUTER_API_KEY || '').trim()
      if (!apiKey) return NextResponse.json({ error: 'OPENROUTER_API_KEY non configurée' }, { status: 500 })
      url = 'https://openrouter.ai/api/v1/chat/completions'
      model = openRouterModel || 'deepseek/deepseek-chat-v3.1'
    } else {
      apiKey = (process.env.OPENAI_API_KEY || '').trim()
      if (!apiKey) return NextResponse.json({ error: 'OPENAI_API_KEY non configurée' }, { status: 500 })
      url = 'https://api.openai.com/v1/chat/completions'
      model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    }
    if (provider === 'openrouter') {
      headers['HTTP-Referer'] = process.env.NEXT_PUBLIC_APP_URL || 'https://laureolivie.fr'
    }

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model,
        messages: fullMessages,
        temperature: 0.8,
        max_tokens: 1500,
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return NextResponse.json(
        { error: (err as { error?: { message?: string } })?.error?.message || res.statusText },
        { status: res.status }
      )
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }
    const content = data.choices?.[0]?.message?.content?.trim()
    if (!content) {
      return NextResponse.json({ error: 'Réponse vide' }, { status: 502 })
    }

    return NextResponse.json({ content })
  } catch (e) {
    console.error('repondre-commentaires error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur' },
      { status: 500 }
    )
  }
}
