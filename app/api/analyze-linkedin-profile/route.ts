import { NextResponse } from 'next/server'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { profile, provider = 'openai' as AIProvider } = body || {}

    if (!profile || typeof profile !== 'string' || !profile.trim()) {
      return NextResponse.json(
        { error: 'Colle le contenu de ton profil LinkedIn (headline, résumé, expériences)' },
        { status: 400 }
      )
    }

    const systemPrompt = `Tu es un expert en optimisation de profil LinkedIn. Tu analyses des profils et donnes des recommandations précises.

Évalue :
- Clarté du positionnement
- Force du headline
- Structure de la bio
- Mots-clés et SEO LinkedIn
- Crédibilité et preuves
- Clarté de l'offre

Réponds UNIQUEMENT avec un JSON valide :
{
  "score": 75,
  "strengths": ["point fort 1", "point fort 2"],
  "weaknesses": ["point faible 1", "point faible 2"],
  "suggestions": ["recommandation 1", "recommandation 2"],
  "keywords": ["mot-clé 1", "mot-clé 2"]
}
Le score est sur 100. 3-5 éléments par liste. En français.`

    const userPrompt = `Analyse ce profil LinkedIn :

${profile.trim()}

Fournis le diagnostic complet (score, forces, faiblesses, suggestions, mots-clés).`

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      maxTokens: 1000,
      temperature: 0.4,
    })

    if (!content) {
      return NextResponse.json({ error: 'Réponse vide' }, { status: 502 })
    }

    let jsonStr = content
    const match = content.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (match) jsonStr = match[1].trim()

    const parsed = JSON.parse(jsonStr) as {
      score?: number
      strengths?: string[]
      weaknesses?: string[]
      suggestions?: string[]
      keywords?: string[]
    }

    const score = Math.min(100, Math.max(0, Number(parsed.score) || 0))

    return NextResponse.json({
      score,
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
    })
  } catch (e) {
    console.error('analyze-linkedin-profile error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur' },
      { status: 500 }
    )
  }
}
