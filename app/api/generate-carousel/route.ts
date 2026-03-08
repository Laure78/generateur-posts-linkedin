import { NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { generateWithAI } from '@/lib/aiProvider';

const W = 1080;
const H = 1350;
const PADDING = 80;
const BODY_SIZE = 36;
const MAX_WIDTH = W - PADDING * 2;
const LINE_HEIGHT = 52;
const MAX_LINES = 12;

const BG_RGB = rgb(0.486, 0.227, 0.929); // #7c3aed
const TEXT_RGB = rgb(1, 1, 1);
const ACCENT_RGB = rgb(0.914, 0.835, 1); // #e9d5ff

async function viralSlides(content: string): Promise<string[]> {
  const prompt = `Transform this LinkedIn post into a viral carousel.
7 slides maximum.
Short sentences. Powerful hooks. Mobile friendly.
Structure: Hook, Problem, Insight, Solution, Method, Conclusion, CTA.
Output format: one slide per line, prefix each with "SLIDE: "
Example:
SLIDE: L'IA n'est pas que pour les informaticiens.
SLIDE: 3 artisans sur 4 perdent 2h/jour sur les devis.
...

Post:
---
${content}
---`;

  const raw = await generateWithAI({
    systemPrompt: 'Tu transformes des posts en structure de carrousel viral. Réponds UNIQUEMENT avec les lignes SLIDE:',
    userPrompt: prompt,
    maxTokens: 400,
    temperature: 0.5,
  });

  const slides = raw
    .split(/\n+/)
    .map((s) => s.replace(/^SLIDE:\s*/i, '').trim())
    .filter((s) => s.length > 2)
    .slice(0, 7);
  return slides.length ? slides : [content.trim().slice(0, 200)];
}

function splitIntoSlides(content: string, maxSlides = 12): string[] {
  const trimmed = content.trim();
  if (!trimmed) return ['Slide vide'];
  const paragraphs = trimmed.split(/\n\n+/).filter(Boolean);
  if (paragraphs.length <= maxSlides) {
    return paragraphs.map((p) => p.replace(/\n/g, ' ').trim()).filter(Boolean);
  }
  const slideLength = Math.ceil(trimmed.length / maxSlides);
  const slides: string[] = [];
  let remaining = trimmed;
  while (remaining && slides.length < maxSlides) {
    const chunk = remaining.slice(0, slideLength);
    const lastSpace = chunk.lastIndexOf(' ');
    const cut = lastSpace > slideLength * 0.5 ? lastSpace : slideLength;
    slides.push(remaining.slice(0, cut).trim());
    remaining = remaining.slice(cut).trim();
  }
  if (remaining) slides.push(remaining);
  return slides.filter(Boolean);
}

function sanitizeForPdf(text: string): string {
  return text
    .replace(/[\u0000-\u001F]/g, '')
    .replace(/\u2028|\u2029/g, '\n')
    .trim() || ' ';
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const content = typeof body.content === 'string' ? body.content.trim() : '';
    const maxSlides = typeof body.maxSlides === 'number' ? Math.min(20, Math.max(1, body.maxSlides)) : 10;
    const viral = !!body.viral;

    if (!content) {
      return NextResponse.json({ error: 'Contenu requis' }, { status: 400 });
    }

    const slides = viral ? await viralSlides(content) : splitIntoSlides(content, maxSlides);
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

    for (let i = 0; i < slides.length; i++) {
      const page = doc.addPage([W, H]);

      // Fond bleu #377CF3
      page.drawRectangle({
        x: 0,
        y: 0,
        width: W,
        height: H,
        color: BG_RGB,
      });

      // Numéro de slide (bas droite)
      const numText = `${i + 1}/${slides.length}`;
      page.drawText(numText, {
        x: W - PADDING - 60,
        y: 40,
        size: 24,
        font: fontBold,
        color: ACCENT_RGB,
      });

      // Contenu principal (avec retour à la ligne automatique)
      const safeText = sanitizeForPdf(slides[i]);
      page.drawText(safeText, {
        x: PADDING,
        y: H - PADDING - 60,
        size: BODY_SIZE,
        font,
        color: TEXT_RGB,
        maxWidth: MAX_WIDTH,
        lineHeight: LINE_HEIGHT,
        wordBreaks: [' ', '-', '\n'],
      });
    }

    const pdfBytes = await doc.save();
    const buffer = Buffer.from(pdfBytes as unknown as ArrayBuffer);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="carrousel-linkedin.pdf"',
      },
    });
  } catch (e) {
    console.error('generate-carousel:', e);
    return NextResponse.json({ error: 'Erreur lors de la génération' }, { status: 500 });
  }
}
