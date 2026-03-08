import { NextResponse } from 'next/server'
import { getLaureProfileContext } from '../../../lib/laureProfile'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

const BTP_CATEGORIES = [
  'IA dans le BTP',
  'Productivité chantier',
  'Gestion des devis',
  'Appels d\'offres',
  'Digitalisation',
  'Retours d\'expérience terrain',
]

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { theme, provider = 'openai' as AIProvider, customKnowledge = '' } = body || {}

    const apiKey = provider === 'claude' ? process.env.ANTHROPIC_API_KEY : process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: provider === 'claude' ? 'ANTHROPIC_API_KEY non configurée' : 'OPENAI_API_KEY non configurée' },
        { status: 500 }
      )
    }

    const profileContext = getLaureProfileContext()
    let systemPrompt = `Tu es un expert en contenu LinkedIn pour les professionnels du BTP.

PUBLIC CIBLE :
- Artisans et TPE
- Dirigeants PME BTP
- Conducteurs de travaux
- Bureaux d'études

BASE DE CONNAISSANCE :
${profileContext}`

    if (customKnowledge && typeof customKnowledge === 'string' && customKnowledge.trim()) {
      systemPrompt += `

RÉFÉRENCES ET STYLE À REPRODUIRE :
${customKnowledge.trim()}`
    }

    systemPrompt += `

Génère 30 idées de posts LinkedIn adaptées aux professionnels du BTP.
Chaque idée doit être pratique et pertinente pour les entreprises du bâtiment.

Catégories à utiliser (varier) : ${BTP_CATEGORIES.join(', ')}

Focus sur :
- Productivité
- Usage de l'IA
- Gestion de projet
- Croissance business construction
- Devis, chantier, planning, appel d'offres
- Vocabulaire métier : chantier, devis, maître d'œuvre, conduite de travaux

Réponds UNIQUEMENT avec un JSON valide, sans texte avant ou après :
{"ideas":[{"title":"Titre accrocheur de l'idée","category":"Catégorie"}]}

Génère exactement 30 idées, variées et actionnables.`

    const userPrompt = theme && typeof theme === 'string' && theme.trim()
      ? `Génère 30 idées BTP sur le thème : "${theme.trim()}"`
      : 'Génère 30 idées de posts LinkedIn BTP variées couvrant les catégories demandées.'

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      maxTokens: 2500,
      temperature: 0.8,
    })

    if (!content) {
      return NextResponse.json(
        { error: 'Réponse vide de l\'API' },
        { status: 502 }
      )
    }

    let jsonStr = content
    const match = content.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (match) jsonStr = match[1].trim()

    const parsed = JSON.parse(jsonStr) as { ideas?: Array<{ title: string; category: string }> }
    const ideas = (parsed.ideas || []).slice(0, 30)

    return NextResponse.json({ ideas })
  } catch (e) {
    console.error('generate-ideas-btp error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur lors de la génération' },
      { status: 500 }
    )
  }
}
