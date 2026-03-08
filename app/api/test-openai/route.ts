import { NextResponse } from 'next/server'

/**
 * Route de diagnostic : vérifie si OPENAI_API_KEY est configurée
 * et teste une requête minimale à l'API OpenAI.
 * À supprimer en production.
 */
export async function GET() {
  const apiKey = (process.env.OPENAI_API_KEY || '').trim()
  
  if (!apiKey) {
    return NextResponse.json({
      ok: false,
      error: 'OPENAI_API_KEY non définie dans .env.local',
      hint: 'Ajoute OPENAI_API_KEY=sk-proj-xxx dans .env.local, puis redémarre le serveur (npm run dev)',
    }, { status: 500 })
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Dis "OK" en une seule lettre.' }],
        max_tokens: 10,
      }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      const msg = (data as { error?: { message?: string } })?.error?.message || res.statusText
      return NextResponse.json({
        ok: false,
        error: `API OpenAI a refusé la requête : ${msg}`,
        status: res.status,
        hint: res.status === 401 ? 'Clé invalide ou expirée. Génère une nouvelle clé sur platform.openai.com/api-keys' : undefined,
      }, { status: 500 })
    }

    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> }
    const content = data.choices?.[0]?.message?.content?.trim() || ''
    
    return NextResponse.json({
      ok: true,
      message: 'Connexion OpenAI fonctionnelle',
      response: content,
    })
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e)
    return NextResponse.json({
      ok: false,
      error: `Erreur réseau : ${err}`,
      hint: 'Vérifie ta connexion internet. OpenAI doit être accessible.',
    }, { status: 500 })
  }
}
