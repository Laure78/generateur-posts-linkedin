import { NextResponse } from 'next/server'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { post, provider = 'openai' as AIProvider } = body || {}

    if (!post || typeof post !== 'string' || !post.trim()) {
      return NextResponse.json(
        { error: 'Colle un post LinkedIn à commenter' },
        { status: 400 }
      )
    }

    const systemPrompt = `Tu es un expert en engagement LinkedIn. Tu génères des commentaires pertinents pour répondre à des posts professionnels.

Règles :
- Commentaires courts et naturels
- Sonner humain, pas robotique
- Apporter de la valeur, pas promotionnel
- Encourager la conversation
- Maximum 2-3 phrases par commentaire
- En français

Types de commentaires à générer :
1. Insight expert : apporte une expertise ou une précision
2. Question intelligente : question pertinente qui fait réfléchir
3. Expérience personnelle : partage court et lié au sujet
4. Mini insight : observation ou remarque pertinente
5. Commentaire engageant : ouvre au débat ou souligne un point fort

Réponds UNIQUEMENT avec un JSON valide :
{"comments":[{"text":"Commentaire 1","type":"insight expert"},{"text":"Commentaire 2","type":"question intelligente"},...]}
Génère exactement 5 commentaires.`

    const userPrompt = `Post LinkedIn à commenter :

${post.trim()}

Génère 5 commentaires pertinents et variés.`

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      maxTokens: 800,
      temperature: 0.7,
    })

    if (!content) {
      return NextResponse.json({ error: 'Réponse vide' }, { status: 502 })
    }

    let jsonStr = content
    const match = content.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (match) jsonStr = match[1].trim()

    const parsed = JSON.parse(jsonStr) as {
      comments?: Array<{ text: string; type?: string }>
    }
    const comments = parsed.comments || []

    return NextResponse.json({ comments })
  } catch (e) {
    console.error('generate-comments error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur' },
      { status: 500 }
    )
  }
}
