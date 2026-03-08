import { NextResponse } from 'next/server';
import { generateWithAI } from '@/lib/aiProvider';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const post = typeof body.post === 'string' ? body.post.trim() : '';
    if (!post) return NextResponse.json({ error: 'Post requis' }, { status: 400 });

    const systemPrompt = `Tu réécris des posts LinkedIn pour augmenter leur viralité.

Règles de réécriture :
- Renforcer le hook : plus percutant, plus de curiosité
- Raccourcir les phrases : max 10-15 mots par phrase
- Améliorer le rythme : alterner phrases courtes et très courtes
- Une idée par ligne
- Ajouter une question finale pour déclencher les commentaires
- Optimiser la lisibilité mobile (sauts de ligne, paragraphes courts)
- Garder le sens et le message du post original
- Ne pas ajouter de hashtags
Réponds UNIQUEMENT avec le post réécrit, rien d'autre.`;

    const content = await generateWithAI({
      systemPrompt,
      userPrompt: `Réécris ce post pour augmenter sa viralité :\n\n${post}`,
      maxTokens: 1200,
      temperature: 0.6,
    });

    return NextResponse.json({ content: content.trim() });
  } catch (e) {
    console.error('boost-virality:', e);
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}
