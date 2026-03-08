import { NextResponse } from 'next/server'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { profile, provider = 'openai' as AIProvider } = body || {}

    if (!profile || typeof profile !== 'string' || !profile.trim()) {
      return NextResponse.json(
        { error: 'Colle le contenu de ton profil LinkedIn' },
        { status: 400 }
      )
    }

    const systemPrompt = `Tu es un expert en optimisation de profil LinkedIn. Tu réécris les profils pour améliorer visibilité et crédibilité.

Focus :
- Positionnement clair
- Mots-clés SEO LinkedIn
- Autorité et crédibilité
- Headline percutant
- Bio structurée
- Pitch professionnel accrocheur

Conserve les informations factuelles (expériences, formations). Améliore la formulation.
En français.

Réponds UNIQUEMENT avec un JSON valide :
{
  "headline": "Nouveau headline (120 caractères max)",
  "bio": "Nouvelle section À propos / Résumé",
  "keywords": ["mot-clé 1", "mot-clé 2", "mot-clé 3", "mot-clé 4", "mot-clé 5"],
  "pitch": "Pitch professionnel en 2-3 phrases (pour bio ou message)"
}`

    const userPrompt = `Optimise ce profil LinkedIn :

${profile.trim()}

Génère : nouveau headline, nouvelle bio, mots-clés SEO, pitch professionnel.`

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      maxTokens: 1200,
      temperature: 0.6,
    })

    if (!content) {
      return NextResponse.json({ error: 'Réponse vide' }, { status: 502 })
    }

    let jsonStr = content
    const match = content.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (match) jsonStr = match[1].trim()

    const parsed = JSON.parse(jsonStr) as {
      headline?: string
      bio?: string
      keywords?: string[]
      pitch?: string
    }

    return NextResponse.json({
      headline: typeof parsed.headline === 'string' ? parsed.headline : '',
      bio: typeof parsed.bio === 'string' ? parsed.bio : '',
      keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
      pitch: typeof parsed.pitch === 'string' ? parsed.pitch : '',
    })
  } catch (e) {
    console.error('optimize-linkedin-profile error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur' },
      { status: 500 }
    )
  }
}
