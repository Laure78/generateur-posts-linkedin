import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from 'docx';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import PptxGenJS from 'pptxgenjs';
import { promises as fs } from 'fs';
import {
  type DeliverableFormat,
  deliverableExtension,
} from '@/lib/bework/deliverable-formats';
import { ensureOutputDir, missionDeliverablePath } from './mission-output';

const BLUE = '1D4ED8';
const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN = 50;
const LINE_HEIGHT = 14;
const FONT_SIZE = 11;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function splitSections(content: string): { title: string; body: string }[] {
  const parts = content.split(/(?=^##\s)/m).filter((p) => p.trim());
  if (parts.length <= 1 && !content.includes('\n## ')) {
    return [{ title: 'Livrable', body: content.trim() }];
  }
  return parts.map((block) => {
    const lines = block.trim().split('\n');
    const first = lines[0] ?? '';
    const title = first.replace(/^#+\s*/, '').trim() || 'Section';
    const body = lines.slice(1).join('\n').trim() || block.trim();
    return { title, body };
  });
}

function plainLines(content: string): string[] {
  return content
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.replace(/^#+\s*/, '').replace(/\*\*/g, '').replace(/\*/g, '').trimEnd());
}

async function buildDocxBuffer(title: string, content: string, skillName?: string): Promise<Buffer> {
  const children: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [new TextRun({ text: title, bold: true, color: BLUE, size: 32 })],
    }),
  ];

  if (skillName) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: `Assistant : ${skillName}`, italics: true, size: 20, color: '64748B' })],
      })
    );
  }

  children.push(new Paragraph({ children: [new TextRun('')] }));

  for (const line of plainLines(content)) {
    if (!line.trim()) {
      children.push(new Paragraph({ children: [new TextRun('')] }));
      continue;
    }
    const isHeading = /^[A-ZÉÈÊÀÂÔÛÎÜÇ0-9][^.]{0,80}$/.test(line.trim()) && line.length < 90;
    children.push(
      new Paragraph({
        heading: isHeading ? HeadingLevel.HEADING_2 : undefined,
        children: [new TextRun({ text: line, size: isHeading ? 24 : 22 })],
      })
    );
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });
  return Buffer.from(await Packer.toBuffer(doc));
}

async function buildPdfBuffer(title: string, content: string, skillName?: string): Promise<Buffer> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  const drawLine = (text: string, bold = false) => {
    const maxWidth = PAGE_WIDTH - 2 * MARGIN;
    const f = bold ? fontBold : font;
    const words = text.split(/\s+/);
    let line = '';
    const lines: string[] = [];

    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (f.widthOfTextAtSize(test, FONT_SIZE) > maxWidth) {
        if (line) lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);

    for (const ln of lines.length ? lines : ['']) {
      if (y < MARGIN + LINE_HEIGHT) {
        page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        y = PAGE_HEIGHT - MARGIN;
      }
      page.drawText(ln, {
        x: MARGIN,
        y,
        size: FONT_SIZE,
        font: f,
        color: rgb(0.1, 0.15, 0.25),
        maxWidth,
      });
      y -= LINE_HEIGHT;
    }
  };

  drawLine(title, true);
  y -= 6;
  if (skillName) {
    drawLine(`Assistant : ${skillName}`);
    y -= 8;
  }

  for (const line of plainLines(content)) {
    if (!line.trim()) {
      y -= LINE_HEIGHT / 2;
      continue;
    }
    drawLine(line);
  }

  return Buffer.from(await pdf.save());
}

function buildXlsBuffer(title: string, content: string): Buffer {
  const rows = [
    ['Titre', title],
    [''],
    ...plainLines(content).map((l) => [l]),
  ];
  const tableRows = rows
    .map(
      (cells) =>
        `<Row>${cells.map((c) => `<Cell><Data ss:Type="String">${escapeXml(c)}</Data></Cell>`).join('')}</Row>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Worksheet ss:Name="Livrable">
<Table>${tableRows}</Table>
</Worksheet>
</Workbook>`;
  return Buffer.from(xml, 'utf8');
}

async function buildPptxBuffer(title: string, content: string, skillName?: string): Promise<Buffer> {
  const pptx = new PptxGenJS();
  pptx.author = 'BeWork';
  pptx.title = title;

  const titleSlide = pptx.addSlide();
  titleSlide.addText(title, {
    x: 0.6,
    y: 1.2,
    w: 8.8,
    h: 1.2,
    fontSize: 28,
    bold: true,
    color: BLUE,
  });
  if (skillName) {
    titleSlide.addText(skillName, {
      x: 0.6,
      y: 2.6,
      w: 8.8,
      h: 0.6,
      fontSize: 14,
      color: '64748B',
    });
  }

  for (const section of splitSections(content)) {
    const slide = pptx.addSlide();
    slide.addText(section.title, {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 0.8,
      fontSize: 20,
      bold: true,
      color: BLUE,
    });
    const body = section.body.slice(0, 3500);
    slide.addText(body, {
      x: 0.5,
      y: 1.3,
      w: 9,
      h: 5.5,
      fontSize: 12,
      valign: 'top',
    });
  }

  const out = (await pptx.write({ outputType: 'nodebuffer' })) as Buffer;
  return Buffer.from(out);
}

export type ExportDeliverableInput = {
  missionId: string;
  title: string;
  content: string;
  format: DeliverableFormat;
  skillName?: string;
};

/** Génère le fichier livrable sur disque (.data/mission-outputs). */
export async function exportMissionDeliverable(input: ExportDeliverableInput): Promise<{
  path: string;
  filename: string;
}> {
  const { missionId, title, content, format, skillName } = input;
  await ensureOutputDir();

  const safeTitle = title
    .replace(/[^\w\s-àâäéèêëïîôùûüçÀÂÄÉÈÊËÏÎÔÙÛÜÇ]/gi, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 50) || 'Livrable_BeWork';

  const ext = deliverableExtension(format);
  const filename = `${safeTitle}${ext}`;
  const outPath = missionDeliverablePath(missionId, format);

  let buffer: Buffer;
  switch (format) {
    case 'docx':
    case 'doc':
      buffer = await buildDocxBuffer(title, content, skillName);
      break;
    case 'pdf':
      buffer = await buildPdfBuffer(title, content, skillName);
      break;
    case 'xls':
      buffer = buildXlsBuffer(title, content);
      break;
    case 'pptx':
      buffer = await buildPptxBuffer(title, content, skillName);
      break;
    default:
      buffer = await buildDocxBuffer(title, content, skillName);
  }

  await fs.writeFile(outPath, buffer);
  return { path: outPath, filename };
}
