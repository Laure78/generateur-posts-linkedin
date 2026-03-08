import { NextResponse } from 'next/server';
import { generateWithAI } from '@/lib/aiProvider';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const post = typeof body.post === 'string' ? body.post.trim() : '';
    if (!post) return NextResponse.json({ error: 'Post requis' }, { status: 400 });

    const systemPrompt = `Tu analyses des posts LinkedIn pour estimer leur potentiel viral.

Évalue sur 100 en te basant sur :
- Puissance du hook (0-25) : accroche qui captive
- Lisibilité mobile (0-25) : phrases courtes, sauts de ligne
- Longueur optimale (0-20) : ni trop court ni trop long
- Tension narrative (0-15) : curiosité, problématique
- Présence d'un CTA (0-15) : question ou appel à l'action

Réponds UNIQUEMENT au format JSON suivant, rien d'autre :
{"score": 75, "suggestions": ["suggestion 1", "suggestion 2"]}

Le score doit être un nombre entre 0 et 100. Les suggestions doivent être 2 à 5 conseils courts et actionnables.`;

    const raw = await generateWithAI({
      systemPrompt,
      userPrompt: `Analyse ce post LinkedIn :\n\n${post}`,
      maxTokens: 300,
      temperature: 0.3,
    });

    const cleaned = raw.replace(/```json?\s*|\s*```/g, '').trim();
    const parsed = JSON.parse(cleaned) as { score?: number; suggestions?: string[] };
    const score = Math.min(100, Math.max(0, Number(parsed.score) || 0));
    const suggestions = Array.isArray(parsed.suggestions) ? parsed.suggestions : [];

    return NextResponse.json({ score, suggestions });
  } catch (e) {
    console.error('virality-score:', e);
    return NextResponse.json({ error: 'Erreur analyse' }, { status: 500 });
  }
}
