import { NextResponse } from 'next/server'
import { type AIProvider } from '../../../lib/aiProvider'

const GHOSTWRITER_SYSTEM = `Tu es un ghostwriter LinkedIn professionnel. Tu travailles en collaboration avec l'utilisateur pour créer des posts qui sonnent comme lui — pas comme une IA.

Tu peux :
- Brainstormer des idées et angles de post
- Écrire des brouillons complets
- Réécrire selon les retours (plus court, plus storytelling, plus formel, etc.)
- Proposer plusieurs variantes
- Adapter au style et au ton de l'utilisateur

Règles :
- Phrases courtes. 1 idée par ligne. Optimisé mobile.
- Hook percutant en première ligne.
- Finir par une question ou CTA pour l'engagement.
- Réponds en français, de manière concise et directe.
- Si l'utilisateur fournit son style/contexte, adapte-toi strictement.`

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      messages = [],
      customKnowledge = '',
      attachmentsContext = '',
      provider = 'openrouter' as AIProvider,
      openRouterModel,
    } = body || {}

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages requis' }, { status: 400 })
    }

    let systemPrompt = GHOSTWRITER_SYSTEM
    if (customKnowledge && typeof customKnowledge === 'string' && customKnowledge.trim()) {
      systemPrompt += `

---
TON ET STYLE DE L'UTILISATEUR (à reproduire) :
${customKnowledge.trim()}`
    }
    if (attachmentsContext && typeof attachmentsContext === 'string' && attachmentsContext.trim()) {
      systemPrompt += `

---
DOCUMENTS DÉPOSÉS PAR L'UTILISATEUR (contexte additionnel pour tes réponses) :
${attachmentsContext.trim()}`
    }

    // Construire le prompt utilisateur à partir des messages
    const lastUserMsg = [...messages].reverse().find((m: { role?: string }) => m.role === 'user')
    if (!lastUserMsg?.content) {
      return NextResponse.json({ error: 'Dernier message utilisateur requis' }, { status: 400 })
    }

    // Pour une vraie conversation, on envoie tout l'historique au modèle
    // OpenRouter/OpenAI acceptent un array de messages
    const fullMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
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
        temperature: 0.7,
        max_tokens: 2000,
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
    console.error('ghostwriter error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur' },
      { status: 500 }
    )
  }
}
