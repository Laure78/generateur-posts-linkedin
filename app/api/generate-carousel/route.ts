import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

const W = 1080;
const H = 1350;
const PADDING = 80;
const TITLE_SIZE = 56;
const BODY_SIZE = 32;
const MAX_CHARS_PER_LINE = 35;
const MAX_LINES = 12;
const BG_COLOR = '#7c3aed';
const TEXT_COLOR = '#ffffff';
const ACCENT_COLOR = '#e9d5ff';

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const w of words) {
    if ((current + ' ' + w).trim().length <= maxChars) {
      current = (current + ' ' + w).trim();
    } else {
      if (current) lines.push(current);
      current = w.length > maxChars ? w.slice(0, maxChars) : w;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, MAX_LINES);
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

function buildSlideSvg(slideContent: string, index: number, total: number): string {
  const lines = wrapText(slideContent, MAX_CHARS_PER_LINE);
  const lineHeight = 48;
  const startY = H - PADDING - 80;
  const textEls = lines
    .map(
      (line, i) =>
        `<text x="${PADDING}" y="${startY - i * lineHeight}" font-family="Arial, sans-serif" font-size="${BODY_SIZE}" fill="${TEXT_COLOR}">${escapeXml(line)}</text>`
    )
    .join('\n');
  const numText = `${index + 1}/${total}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG_COLOR}"/>
  <text x="${W - PADDING}" y="${H - 40}" font-family="Arial, sans-serif" font-size="24" fill="${ACCENT_COLOR}" text-anchor="end">${escapeXml(numText)}</text>
  ${textEls}
</svg>`;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const content = typeof body.content === 'string' ? body.content.trim() : '';
    const maxSlides = typeof body.maxSlides === 'number' ? Math.min(20, Math.max(1, body.maxSlides)) : 10;

    if (!content) {
      return NextResponse.json({ error: 'Contenu requis' }, { status: 400 });
    }

    const slides = splitIntoSlides(content, maxSlides);
    const doc = await PDFDocument.create();

    for (let i = 0; i < slides.length; i++) {
      const svg = buildSlideSvg(slides[i], i, slides.length);
      const png = await sharp(Buffer.from(svg))
        .png()
        .toBuffer();

      const page = doc.addPage([W, H]);
      const img = await doc.embedPng(png);
      page.drawImage(img, { x: 0, y: 0, width: W, height: H });
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
