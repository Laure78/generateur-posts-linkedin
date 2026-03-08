import { NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { generateWithAI } from '@/lib/aiProvider';

const SZ = 1080;
const PADDING = 80;
const TITLE_SIZE = 48;
const BODY_SIZE = 32;
const BG_RGB = rgb(0.216, 0.486, 0.953); // #377CF3
const TEXT_RGB = rgb(1, 1, 1);
const ACCENT_RGB = rgb(0.9, 0.95, 1);

function sanitize(text: string): string {
  return text.replace(/[\u0000-\u001F]/g, '').replace(/\u2028|\u2029/g, '\n').trim() || ' ';
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const postText = typeof body.post === 'string' ? body.post.trim() : '';
    if (!postText) return NextResponse.json({ error: 'Post requis' }, { status: 400 });

    const extractPrompt = `À partir du post LinkedIn ci-dessous, extrais :
1. UN TITRE court (5-8 mots max)
2. 3 à 5 POINTS CLÉS (phrases courtes, 5-10 mots chacune)

Format de réponse STRICT, rien d'autre :
TITRE: [le titre]
1. [point 1]
2. [point 2]
3. [point 3]
4. [point 4]
5. [point 5]

Post :
---
${postText}
---`;

    const raw = await generateWithAI({
      systemPrompt: 'Tu extrais un titre et des points clés. Réponds UNIQUEMENT au format demandé.',
      userPrompt: extractPrompt,
      maxTokens: 200,
      temperature: 0.4,
    });

    let title = 'Infographie';
    const points: string[] = [];
    for (const line of raw.split('\n')) {
      const t = line.match(/^TITRE:\s*(.+)$/i);
      if (t) title = t[1].trim().slice(0, 50);
      const p = line.match(/^\d+\.\s*(.+)$/);
      if (p) points.push(p[1].trim().slice(0, 60));
    }
    const items = points.slice(0, 5);

    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.HelveticaBold);
    const fontReg = await doc.embedFont(StandardFonts.Helvetica);
    const page = doc.addPage([SZ, SZ]);

    page.drawRectangle({ x: 0, y: 0, width: SZ, height: SZ, color: BG_RGB });

    let y = SZ - PADDING - 60;
    page.drawText(sanitize(title), {
      x: PADDING,
      y,
      size: TITLE_SIZE,
      font,
      color: TEXT_RGB,
      maxWidth: SZ - PADDING * 2,
    });
    y -= 80;

    for (let i = 0; i < items.length; i++) {
      page.drawText(`•`, { x: PADDING, y, size: BODY_SIZE, font: fontReg, color: ACCENT_RGB });
      page.drawText(sanitize(items[i]), {
        x: PADDING + 40,
        y,
        size: BODY_SIZE,
        font: fontReg,
        color: TEXT_RGB,
        maxWidth: SZ - PADDING * 2 - 50,
      });
      y -= 70;
    }

    const pdfBytes = await doc.save();
    const buffer = Buffer.from(pdfBytes as unknown as ArrayBuffer);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="infographie-linkedin.pdf"',
      },
    });
  } catch (e) {
    console.error('generate-infographic:', e);
    return NextResponse.json({ error: 'Erreur génération infographie' }, { status: 500 });
  }
}
