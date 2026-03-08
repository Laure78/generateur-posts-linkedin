import { NextResponse } from 'next/server'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'
import { LINKEDIN_STRUCTURES } from '../../../lib/linkedinStructures'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { structureId, subject, provider = 'openai' as AIProvider } = body || {}

    if (!structureId || typeof structureId !== 'string' || !structureId.trim()) {
      return NextResponse.json(
        { error: 'Structure requise' },
        { status: 400 }
      )
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return NextResponse.json(
        { error: 'Sujet requis' },
        { status: 400 }
      )
    }

    const structure = LINKEDIN_STRUCTURES.find((s) => s.id === structureId)
    if (!structure) {
      return NextResponse.json(
        { error: 'Structure non trouvée' },
        { status: 400 }
      )
    }

    const systemPrompt = `Tu es un expert en rédaction LinkedIn. Tu génères un post optimisé pour l'engagement.

Règles :
- Phrases courtes
- 1 idée par ligne
- Paragraphes espacés (ligne vide entre blocs)
- Lecture mobile
- 8 à 18 lignes
- Ton engageant
- CTA clair en fin de post
- En français

Le post doit générer : curiosité, engagement, commentaires.`

    const userPrompt = `Write a LinkedIn post based on this structure.

Topic: ${subject.trim()}

Structure: ${structure.name}
${structure.structure}

Follow the structure exactly. Rules: short sentences, mobile friendly, engaging tone, clear CTA.

Return ONLY the post, nothing else.`

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      maxTokens: 1200,
      temperature: 0.7,
    })

    if (!content) {
      return NextResponse.json({ error: 'Réponse vide' }, { status: 502 })
    }

    return NextResponse.json({
      content: content.trim(),
      structureName: structure.name,
    })
  } catch (e) {
    console.error('generate-post-from-structure error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur' },
      { status: 500 }
    )
  }
}
