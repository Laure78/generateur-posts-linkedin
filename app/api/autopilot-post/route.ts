import { NextResponse } from 'next/server'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      title = '',
      hook = '',
      postType = 'educational',
      sector = '',
      targetClient = '',
      provider = 'openai' as AIProvider,
    } = body || {}

    const systemPrompt = `Tu es un expert en rédaction LinkedIn. Tu génères des posts complets et percutants.

Règles strictes :
- Hook : accroche percutante, première ligne (1-2 phrases max)
- Content : post LinkedIn complet, phrases courtes, 1 idée par ligne, optimisé mobile
- CTA : appel à l'action ou question pour l'engagement (1-2 phrases)
- Hashtags : 3-5 hashtags pertinents en français
- Réponds UNIQUEMENT en JSON valide :
{"hook":"...","content":"...","cta":"...","hashtags":["#tag1","#tag2"]}
- Pas de markdown ni texte autour du JSON`

    const userPrompt = `Génère un post LinkedIn complet pour :
- Titre/sujet : ${title}
- Accroche déjà proposée (à améliorer ou garder) : ${hook}
- Type de post : ${postType}
- Secteur : ${sector || 'général'}
- Cible : ${targetClient || 'professionnels'}

Produis un post prêt à publier avec hook, content, cta et hashtags.`

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      maxTokens: 1500,
      temperature: 0.7,
    })

    if (!content) {
      return NextResponse.json({ error: 'Réponse vide' }, { status: 502 })
    }

    let jsonStr = content
    const match = content.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (match) jsonStr = match[1].trim()

    const parsed = JSON.parse(jsonStr) as {
      hook?: string
      content?: string
      cta?: string
      hashtags?: string[]
    }

    return NextResponse.json({
      hook: parsed.hook || '',
      content: parsed.content || '',
      cta: parsed.cta || '',
      hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags : [],
    })
  } catch (e) {
    console.error('autopilot-post error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur' },
      { status: 500 }
    )
  }
}
