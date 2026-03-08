import { NextResponse } from 'next/server'
import { getLaureProfileContext } from '../../../lib/laureProfile'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

const CATEGORIES = [
  'Bonnes pratiques',
  'Explication / analyse',
  'Liste de conseils/règles/etc',
  'Conseil percutant',
  'Ressources utiles',
  'Promotionnel',
]

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { theme, provider = 'openai' as AIProvider, customKnowledge = '' } = body || {}

    if (!theme || typeof theme !== 'string' || !theme.trim()) {
      return NextResponse.json(
        { error: 'Le thème est requis' },
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
    let systemPrompt = `Tu es un expert en contenu LinkedIn pour le secteur BTP et la formation professionnelle.

BASE DE CONNAISSANCE — Profil de l'auteure (Laure Olivié) :
${profileContext}`
    if (customKnowledge && typeof customKnowledge === 'string' && customKnowledge.trim()) {
      systemPrompt += `

RÉFÉRENCES ET ANCIENS POSTS (style à s'inspirer) :
${customKnowledge.trim()}`
    }
    systemPrompt += `
Tu génères des idées de posts LinkedIn variées et engageantes.
Pour chaque idée, fournis un titre accrocheur (phrase complète) et une catégorie.
Réponds UNIQUEMENT avec un JSON valide, sans texte avant ou après, au format :
{"ideas":[{"title":"Titre de l'idée","category":"Catégorie"}]}
Utilise uniquement ces catégories : ${CATEGORIES.join(', ')}.
Génère 6 idées différentes, variées en format et en angle.`

    const userPrompt = `Génère 6 idées de posts LinkedIn sur le thème : "${theme.trim()}"
Adapte au contexte BTP et formation IA si pertinent.`

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      maxTokens: 800,
      temperature: 0.8,
    })

    if (!content) {
      return NextResponse.json(
        { error: 'Réponse vide de l\'API' },
        { status: 502 }
      )
    }

    // Parse JSON (handle markdown code blocks)
    let jsonStr = content
    const match = content.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (match) jsonStr = match[1].trim()

    const parsed = JSON.parse(jsonStr) as { ideas?: Array<{ title: string; category: string }> }
    const ideas = parsed.ideas || []

    return NextResponse.json({ ideas })
  } catch (e) {
    console.error('generate-ideas error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur lors de la génération' },
      { status: 500 }
    )
  }
}
