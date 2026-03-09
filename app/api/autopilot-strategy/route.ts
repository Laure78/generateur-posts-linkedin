import { NextResponse } from 'next/server'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

const POST_COUNT: Record<string, number> = {
  '2': 8,
  '3': 12,
  '5': 20,
}

export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      sector = 'BTP',
      targetClient = 'artisans',
      goal = 'find_clients',
      frequency = '3',
      style = 'storytelling',
      topics = [],
      provider = 'openai' as AIProvider,
    } = body || {}

    const postCount = POST_COUNT[String(frequency)] ?? 12
    const topicsList = Array.isArray(topics) ? topics : []

    const systemPrompt = `Tu es un expert en stratégie de contenu LinkedIn. Tu génères des calendriers éditoriaux personnalisés.

Règles strictes :
- Génère exactement ${postCount} idées de posts
- Chaque post doit avoir : title, hook, postType
- postType : mistake | educational | story | insight | tools | case_study | opinion | viral
- Varier les types de posts
- Réponds UNIQUEMENT avec un JSON valide, sans markdown
- Tout en français

Format de sortie :
{"ideas":[{"id":1,"title":"Titre du post","hook":"Accroche percutante","postType":"educational"},...]}`

    const goalLabels: Record<string, string> = {
      find_clients: 'trouver des clients',
      grow_audience: 'agrandir mon audience',
      become_expert: 'devenir expert reconnu',
      recruit_talent: 'recruter des talents',
    }
    const styleLabels: Record<string, string> = {
      storytelling: 'storytelling et récits',
      educational: 'éducatif et pédagogique',
      opinion: 'opinion et prise de position',
      viral: 'format viral, percutant',
    }

    const userPrompt = `Profil :
- Secteur : ${sector}
- Cible : ${targetClient}
- Objectif LinkedIn : ${goalLabels[goal] || goal}
- Style de contenu : ${styleLabels[style] || style}
- Thèmes à inclure : ${topicsList.length ? topicsList.join(', ') : 'adapté au secteur'}

Génère ${postCount} idées de posts LinkedIn variées pour un calendrier de 30 jours.`

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      maxTokens: 4000,
      temperature: 0.8,
    })

    if (!content) {
      return NextResponse.json({ error: 'Réponse vide' }, { status: 502 })
    }

    let jsonStr = content
    const match = content.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (match) jsonStr = match[1].trim()

    const parsed = JSON.parse(jsonStr) as {
      ideas?: Array<{
        id?: number
        title?: string
        hook?: string
        postType?: string
      }>
    }
    const ideas = (parsed.ideas || []).slice(0, postCount).map((e, i) => ({
      id: String(e.id ?? i + 1),
      title: e.title || 'Sujet',
      hook: e.hook || '',
      postType: e.postType || 'educational',
      content: '',
      cta: '',
      hashtags: [] as string[],
    }))

    return NextResponse.json({ ideas })
  } catch (e) {
    console.error('autopilot-strategy error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur' },
      { status: 500 }
    )
  }
}
