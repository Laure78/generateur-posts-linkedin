import { NextResponse } from 'next/server'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

const CATEGORIES = [
  'Curiosité',
  'Statistique surprenante',
  'Erreur fréquente',
  'Mythe à déconstruire',
  'Question directe',
  'Expérience personnelle',
  'Provocation soft',
]

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { subject, provider = 'openai' as AIProvider } = body || {}

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return NextResponse.json(
        { error: 'Le sujet du post est requis' },
        { status: 400 }
      )
    }

    const systemPrompt = `Tu es un expert en hooks viraux LinkedIn. Tu génères des accroches percutantes pour maximiser l'engagement.

Règles :
- Hooks courts (1-2 phrases max)
- Impactants et créateurs de curiosité
- Lisibles sur mobile
- Adaptés à LinkedIn (professionnel)
- Prêts à coller en début de post

Exemples de structures :
- "Personne ne parle de ce problème dans le BTP."
- "L'erreur que presque toutes les entreprises font avec l'IA."
- "J'ai testé l'IA sur un chantier. Voici ce qui s'est passé."
- "Si vous dirigez une entreprise du BTP, lisez ceci."

Réponds UNIQUEMENT avec un JSON valide :
{"hooks":{"Curiosité":["hook1","hook2",...],"Statistique surprenante":[...],...}}

Génère environ 14-15 hooks par catégorie, 100 au total. En français.`

    const userPrompt = `Sujet : "${subject.trim()}"

Génère 100 hooks viraux classés par catégorie : Curiosité, Statistique surprenante, Erreur fréquente, Mythe à déconstruire, Question directe, Expérience personnelle, Provocation soft.`

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      maxTokens: 5000,
      temperature: 0.85,
    })

    if (!content) {
      return NextResponse.json({ error: 'Réponse vide' }, { status: 502 })
    }

    let jsonStr = content
    const match = content.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (match) jsonStr = match[1].trim()

    const parsed = JSON.parse(jsonStr) as { hooks?: Record<string, string[]> }
    const rawHooks = parsed.hooks || {}

    // Flatten into array with category
    const hooks: { text: string; category: string }[] = []
    for (const cat of CATEGORIES) {
      const items = Array.isArray(rawHooks[cat]) ? rawHooks[cat] : []
      for (const t of items) {
        if (typeof t === 'string' && t.trim()) {
          hooks.push({ text: t.trim(), category: cat })
        }
      }
    }

    return NextResponse.json({ hooks })
  } catch (e) {
    console.error('generate-hooks-viral error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur' },
      { status: 500 }
    )
  }
}
