import { NextResponse } from 'next/server';
import { generateWithAI } from '@/lib/aiProvider';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const postText = typeof body.post === 'string' ? body.post.trim() : '';
    if (!postText) return NextResponse.json({ error: 'Post requis' }, { status: 400 });

    const systemPrompt = `Tu es un expert en prompts pour génération d'images IA.
Transforme le post LinkedIn en un prompt image optimisé pour Flux/DALL-E.
Règles :
- Anglais uniquement (meilleur résultat avec les modèles IA)
- Style : minimaliste, professionnel, adapté LinkedIn
- Pas de texte dans l'image (les modèles ne gèrent pas bien)
- 1-2 phrases maximum, descriptives
- Évite les visages reconnaissables
- Palette sobre : bleu, gris, blanc
Réponds UNIQUEMENT avec le prompt, rien d'autre.`;

    const prompt = await generateWithAI({
      systemPrompt,
      userPrompt: `Post LinkedIn :\n\n${postText}\n\nGénère le prompt image :`,
      maxTokens: 150,
      temperature: 0.6,
    });

    return NextResponse.json({ prompt: prompt.trim() });
  } catch (e) {
    console.error('generate-image-prompt:', e);
    return NextResponse.json({ error: 'Erreur génération prompt' }, { status: 500 });
  }
}
