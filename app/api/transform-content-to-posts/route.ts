import { NextResponse } from 'next/server'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

const POST_TYPES = [
  'storytelling',
  'éducatif',
  'conseil',
  'insight',
  'question',
  'polémique soft',
  'résumé',
  'erreur fréquente',
  'expérience',
  'call to action',
]

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { content, provider = 'openai' as AIProvider } = body || {}

    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json(
        { error: 'Colle un article ou une transcription' },
        { status: 400 }
      )
    }

    const systemPrompt = `Tu es un expert en transformation de contenu pour LinkedIn. Tu transformes des articles ou transcriptions en posts LinkedIn engageants.

Structure de chaque post :
- Hook percutant
- Ligne vide
- Développement
- Ligne vide
- Insight
- Ligne vide
- Question finale pour déclencher les commentaires

Règles :
- Phrases courtes
- 1 idée par ligne
- Optimisé mobile
- Chaque post autonome avec un angle différent
- En français

Réponds UNIQUEMENT avec un JSON valide :
{"posts":[{"type":"storytelling","content":"Hook...\\n\\nDéveloppement...\\n\\nInsight...\\n\\nQuestion?"},{"type":"éducatif",...},...]}

Génère exactement 10 posts : 1 storytelling, 1 éducatif, 1 conseil, 1 insight, 1 question, 1 polémique soft, 1 résumé, 1 erreur fréquente, 1 expérience, 1 call to action.`

    const userPrompt = `Transforme ce contenu en 10 posts LinkedIn distincts :

${content.trim().slice(0, 15000)}

Chaque post doit avoir un angle différent et suivre la structure Hook / Développement / Insight / Question.`

    const aiContent = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      maxTokens: 6000,
      temperature: 0.7,
    })

    if (!aiContent) {
      return NextResponse.json({ error: 'Réponse vide' }, { status: 502 })
    }

    let jsonStr = aiContent
    const match = aiContent.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (match) jsonStr = match[1].trim()

    const parsed = JSON.parse(jsonStr) as {
      posts?: Array<{ type: string; content: string }>
    }
    const posts = (parsed.posts || []).slice(0, 10)

    return NextResponse.json({ posts })
  } catch (e) {
    console.error('transform-content-to-posts error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur' },
      { status: 500 }
    )
  }
}
