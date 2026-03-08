import { NextResponse } from 'next/server'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { theme, provider = 'openai' as AIProvider } = body || {}

    const themeInput = theme && typeof theme === 'string' ? theme.trim() : 'Croissance LinkedIn et visibilité professionnelle'

    const systemPrompt = `Tu es un expert en stratégie de contenu LinkedIn. Tu créés des calendriers éditoriaux sur 30 jours.

Règles :
- 30 posts planifiés sur 30 jours
- Varier les types : éducatif, storytelling, conseil, étude de cas, question, liste, etc.
- Chaque entrée doit avoir : jour, thème, type de post, hook proposé, idée principale
- Optimiser pour l'engagement
- En français
- Adapter au secteur si mentionné (ex: BTP)

Réponds UNIQUEMENT avec un JSON valide :
{"calendar":[{"day":1,"topic":"Sujet","postType":"éducatif","hook":"Accroche proposée","mainMessage":"Idée principale"},...]}
Génère exactement 30 entrées (day 1 à 30).`

    const userPrompt = `Crée un calendrier de contenu LinkedIn sur 30 jours pour le thème : "${themeInput}"

Génère 30 posts planifiés avec pour chacun : topic, postType, hook, mainMessage.`

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      maxTokens: 4000,
      temperature: 0.7,
    })

    if (!content) {
      return NextResponse.json({ error: 'Réponse vide' }, { status: 502 })
    }

    let jsonStr = content
    const match = content.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (match) jsonStr = match[1].trim()

    const parsed = JSON.parse(jsonStr) as {
      calendar?: Array<{
        day: number
        topic?: string
        theme?: string
        postType?: string
        hook?: string
        mainMessage?: string
      }>
    }
    const calendar = (parsed.calendar || []).slice(0, 30).map((e) => ({
      day: e.day,
      topic: e.topic || e.theme || 'Sujet',
      postType: e.postType || '',
      hook: e.hook || '',
      mainMessage: e.mainMessage || '',
    }))

    return NextResponse.json({ calendar })
  } catch (e) {
    console.error('generate-content-calendar error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur' },
      { status: 500 }
    )
  }
}
