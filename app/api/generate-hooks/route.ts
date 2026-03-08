import { NextResponse } from 'next/server'
import { getLaureProfileContext } from '../../../lib/laureProfile'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { subject, provider = 'openai' as AIProvider, customKnowledge = '' } = body || {}

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return NextResponse.json(
        { error: 'Le sujet est requis' },
        { status: 400 }
      )
    }

    const apiKey = provider === 'claude' ? process.env.ANTHROPIC_API_KEY : process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: provider === 'claude' ? 'ANTHROPIC_API_KEY non configurée' : 'OPENAI_API_KEY non configurée' },
        { status: 500 }
      )
    }

    const profileContext = getLaureProfileContext()
    let systemPrompt = `Tu es un expert en rédaction pour LinkedIn. Tu crées des accroches (premières lignes) captivantes pour des posts professionnels en français.

${profileContext}`
    if (customKnowledge && typeof customKnowledge === 'string' && customKnowledge.trim()) {
      systemPrompt += `

RÉFÉRENCES ET ANCIENS POSTS (style à s'inspirer) :
${customKnowledge.trim()}`
    }
    systemPrompt += `

Règles pour les accroches :
- Courtes (1 à 2 lignes max, 80-150 caractères idéalement)
- Impactantes : question, chiffre, affirmation forte, ou contradiction
- Adaptées au contexte professionnel BTP / entreprise
- Variées : question, chiffre, anecdote, promesse, provocation douce
- Pas de hashtags dans les accroches`

    const userPrompt = `Sujet du post : "${subject.trim()}"

Génère 6 accroches différentes et captivantes pour ce sujet. Réponds UNIQUEMENT avec une liste numérotée (1. 2. 3. etc.), une accroche par ligne, sans titre ni explication.`

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      maxTokens: 500,
      temperature: 0.8,
    })

    // Parse numbered list into array
    const hooks = content
      .split(/\n+/)
      .map((line) => line.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter(Boolean)

    return NextResponse.json({ hooks })
  } catch (e) {
    console.error('generate-hooks error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur lors de la génération' },
      { status: 500 }
    )
  }
}
