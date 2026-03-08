import { NextResponse } from 'next/server';
import { generateWithAI } from '@/lib/aiProvider';

const REPLICATE_FLUX = 'black-forest-labs/flux-schnell';

async function getImagePrompt(postText: string): Promise<string> {
  const systemPrompt = `Tu es un expert en prompts pour génération d'images IA.
Transforme le post LinkedIn en un prompt image optimisé pour Flux.
- Anglais uniquement
- Style : minimaliste, professionnel, adapté LinkedIn
- Pas de texte dans l'image
- 1-2 phrases maximum
- Palette sobre : bleu, gris, blanc
Réponds UNIQUEMENT avec le prompt, rien d'autre.`;
  return generateWithAI({
    systemPrompt,
    userPrompt: `Post :\n\n${postText}\n\nPrompt image :`,
    maxTokens: 120,
    temperature: 0.6,
  });
}

export async function POST(req: Request) {
  try {
    const token = (process.env.REPLICATE_API_TOKEN || '').trim();
    if (!token) {
      return NextResponse.json({ error: 'REPLICATE_API_TOKEN non configurée' }, { status: 503 });
    }

    const body = await req.json().catch(() => ({}));
    const postText = typeof body.post === 'string' ? body.post.trim() : '';
    const customPrompt = typeof body.prompt === 'string' ? body.prompt.trim() : null;

    if (!postText && !customPrompt) {
      return NextResponse.json({ error: 'Post ou prompt requis' }, { status: 400 });
    }

    const prompt = customPrompt || (await getImagePrompt(postText));
    if (!prompt) return NextResponse.json({ error: 'Impossible de générer le prompt' }, { status: 500 });

    const createRes = await fetch(`https://api.replicate.com/v1/models/${REPLICATE_FLUX}/predictions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Prefer: 'wait=60',
      },
      body: JSON.stringify({
        input: {
          prompt,
        },
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      console.error('Replicate:', err);
      return NextResponse.json({ error: 'Erreur Replicate' }, { status: 502 });
    }

    const data = (await createRes.json()) as { output?: string | string[]; urls?: { get?: string } };
    let imageUrl: string | null = null;

    if (Array.isArray(data.output) && data.output[0]) {
      imageUrl = data.output[0];
    } else if (typeof data.output === 'string') {
      imageUrl = data.output;
    } else if (data.urls?.get) {
      const statusRes = await fetch(data.urls.get, { headers: { Authorization: `Bearer ${token}` } });
      const statusData = (await statusRes.json()) as { output?: string | string[] };
      const out = statusData.output;
      if (Array.isArray(out) && out[0]) imageUrl = out[0];
      else if (typeof out === 'string') imageUrl = out;
    }

    if (!imageUrl) {
      return NextResponse.json({ error: 'Pas d\'image générée' }, { status: 502 });
    }

    return NextResponse.json({ url: imageUrl, prompt });
  } catch (e) {
    console.error('generate-visual-image:', e);
    return NextResponse.json({ error: 'Erreur génération image' }, { status: 500 });
  }
}
