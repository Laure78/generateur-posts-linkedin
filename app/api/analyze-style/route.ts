import { NextResponse } from 'next/server'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { posts, provider = 'openai' as AIProvider } = body || {}

    if (!posts || typeof posts !== 'string' || !posts.trim()) {
      return NextResponse.json(
        { error: 'Colle 2-3 de tes posts pour analyser ton style' },
        { status: 400 }
      )
    }

    const apiKey = provider === 'claude' ? process.env.ANTHROPIC_API_KEY : process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key non configurée' }, { status: 500 })
    }

    const systemPrompt = `Tu es un expert en analyse de style d'écriture LinkedIn. Analyse les posts fournis et extrait 5 à 7 caractéristiques concises du style (ton, structure, vocabulaire, longueur des phrases, types d'accroches, etc.). Réponds en bullet points, une ligne par caractéristique. Format : "• Caractéristique"`

    const userPrompt = `Posts à analyser :

${posts.trim()}

Extrais les caractéristiques de style.`

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      maxTokens: 400,
      temperature: 0.3,
    })

    return NextResponse.json({ styleSummary: content.trim() })
  } catch (e) {
    console.error('analyze-style error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur' },
      { status: 500 }
    )
  }
}
