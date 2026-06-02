import fs from 'fs';
import path from 'path';
import {
  AlignmentType,
  Document,
  Footer,
  Header,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import { NextResponse } from 'next/server';
import type { LigneAnalyse, RapportDtuPayload } from '@/lib/dtu-verification/types';

export const runtime = 'nodejs';

const BLUE = '1D4ED8';
const LIGHT_BLUE = 'DBEAFE';
const DARK = '0F172A';
const LIGHT_GRAY = 'F1F5F9';

function isLigne(x: unknown): x is LigneAnalyse {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.ligne_devis === 'string' &&
    typeof o.ligne_devis_rectifiee === 'string' &&
    Array.isArray(o.rectifications_appliquees) &&
    o.rectifications_appliquees.every((r): r is string => typeof r === 'string') &&
    typeof o.ouvrage_detecte === 'string' &&
    typeof o.dtu_probable === 'string' &&
    typeof o.dtu_titre_court === 'string' &&
    typeof o.niveau_confiance === 'string' &&
    typeof o.notes === 'string' &&
    Array.isArray(o.articles_a_verifier) &&
    o.articles_a_verifier.every((a): a is string => typeof a === 'string') &&
    Array.isArray(o.alertes) &&
    o.alertes.every((a): a is string => typeof a === 'string')
  );
}

function parsePayload(body: unknown): RapportDtuPayload | null {
  if (!body || typeof body !== 'object') return null;
  const o = body as Record<string, unknown>;
  if (typeof o.client !== 'string' || typeof o.projet !== 'string' || typeof o.date !== 'string') return null;
  if (!Array.isArray(o.lignes) || !o.lignes.every(isLigne)) return null;
  if (!Array.isArray(o.memo_paragraphs) || !o.memo_paragraphs.every((p): p is string => typeof p === 'string'))
    return null;
  const memo_paragraphs = o.memo_paragraphs.map((p) => p.slice(0, 4000));
  return {
    client: o.client.slice(0, 200),
    projet: o.projet.slice(0, 300),
    date: o.date.slice(0, 32),
    redacteur: typeof o.redacteur === 'string' ? o.redacteur.slice(0, 80) : 'BeWork',
    lignes: o.lignes as LigneAnalyse[],
    memo_paragraphs,
  };
}

function cell(children: Paragraph[], shaded = false): TableCell {
  return new TableCell({
    shading: shaded
      ? {
          fill: LIGHT_GRAY,
          type: ShadingType.CLEAR,
          color: 'auto',
        }
      : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children,
  });
}

function readLogoBuffer(): Buffer | null {
  try {
    const p = path.join(process.cwd(), 'public', 'images', 'bework-logo-blueprint.png');
    return fs.readFileSync(p);
  } catch {
    return null;
  }
}

export async function POST(req: Request): Promise<Response> {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps JSON invalide' }, { status: 400 });
  }

  const data = parsePayload(json);
  if (!data || data.lignes.length === 0) {
    return NextResponse.json({ error: 'Payload invalide ou aucune ligne' }, { status: 400 });
  }

  const logoBuf = readLogoBuffer();

  const headerChildren: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: logoBuf
        ? [
            new ImageRun({
              type: 'png',
              data: logoBuf,
              transformation: { width: 360, height: 106 },
            }),
          ]
        : [
            new TextRun({
              text: 'BeWork',
              bold: true,
              color: BLUE,
              size: 52,
            }),
          ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
      children: [
        new TextRun({
          text: 'Assistants travaux augmentés par l’IA',
          color: DARK,
          bold: true,
          size: 22,
        }),
      ],
    }),
  ];

  const footerParagraph = new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'BeWork — Assistants travaux augmentés par l’IA · bework.fr — Relais bureau-chantier BTP',
        bold: true,
        color: BLUE,
        size: 16,
      }),
    ],
  });

  const headerRowAnalyse = new TableRow({
    tableHeader: true,
    children: [
      cell([new Paragraph({ children: [new TextRun({ text: 'Ligne devis', bold: true, color: DARK })] })]),
      cell([new Paragraph({ children: [new TextRun({ text: 'Ouvrage', bold: true, color: DARK })] })]),
      cell([new Paragraph({ children: [new TextRun({ text: 'DTU probable', bold: true, color: BLUE })] })]),
      cell([
        new Paragraph({
          children: [new TextRun({ text: 'Points à contrôler (reformulations maison)', bold: true, color: DARK })],
        }),
      ]),
      cell([new Paragraph({ children: [new TextRun({ text: 'Confiance', bold: true, color: DARK })] })]),
      cell([new Paragraph({ children: [new TextRun({ text: 'Alertes complétude', bold: true, color: DARK })] })]),
    ],
  });

  const bodyRowsAnalyse = data.lignes.map(
    (ligne, idx) =>
      new TableRow({
        children: [
          cell([
            new Paragraph({
              children: [new TextRun({ text: ligne.ligne_devis.slice(0, 800), color: DARK, size: 18 })],
            }),
          ]),
          cell([
            new Paragraph({
              children: [new TextRun({ text: ligne.ouvrage_detecte.slice(0, 400), color: DARK, size: 18 })],
            }),
          ]),
          cell([
            new Paragraph({
              children: [
                new TextRun({ text: ligne.dtu_probable, bold: true, color: BLUE, size: 20 }),
                new TextRun({
                  text: ligne.dtu_titre_court ? `\n${ligne.dtu_titre_court}` : '',
                  color: DARK,
                  size: 18,
                }),
              ],
            }),
          ]),
          cell(
            ligne.articles_a_verifier.length > 0
              ? ligne.articles_a_verifier.map(
                  (a) =>
                    new Paragraph({
                      bullet: { level: 0 },
                      children: [new TextRun({ text: a.slice(0, 500), color: DARK, size: 18 })],
                    })
                )
              : [
                  new Paragraph({
                    children: [new TextRun({ text: '—', color: DARK, size: 18 })],
                  }),
                ],
            idx % 2 === 1
          ),
          cell(
            [
              new Paragraph({
                children: [
                  new TextRun({ text: ligne.niveau_confiance, bold: true, color: DARK, size: 22 }),
                ],
              }),
            ],
            idx % 2 === 1
          ),
          cell(
            ligne.alertes.length
              ? ligne.alertes.map(
                  (a) =>
                    new Paragraph({
                      children: [new TextRun({ text: a.slice(0, 600), color: DARK, size: 17 })],
                    })
                )
              : [new Paragraph({ children: [new TextRun({ text: '—', color: DARK })] })],
            idx % 2 === 1
          ),
        ],
      })
  );

  const headerRectif = new TableRow({
    tableHeader: true,
    children: [
      cell([new Paragraph({ children: [new TextRun({ text: 'Ligne d’origine', bold: true, color: DARK })] })]),
      cell([
        new Paragraph({
          children: [new TextRun({ text: 'Libellé rectifié proposé', bold: true, color: BLUE })],
        }),
      ]),
      cell([
        new Paragraph({
          children: [new TextRun({ text: 'Synthèse des ajouts métier', bold: true, color: DARK })],
        }),
      ]),
      cell([new Paragraph({ children: [new TextRun({ text: 'Réf DTU indicative', bold: true, color: DARK })] })]),
    ],
  });

  const bodyRectif = data.lignes.map(
    (ligne, idx) =>
      new TableRow({
        children: [
          cell([
            new Paragraph({
              children: [new TextRun({ text: ligne.ligne_devis.slice(0, 700), color: DARK, size: 18 })],
            }),
          ]),
          cell([
            new Paragraph({
              children: [new TextRun({ text: ligne.ligne_devis_rectifiee.slice(0, 2200), color: DARK, size: 18 })],
            }),
          ]),
          cell(
            ligne.rectifications_appliquees.length > 0
              ? ligne.rectifications_appliquees.map(
                  (r) =>
                    new Paragraph({
                      bullet: { level: 0 },
                      children: [new TextRun({ text: r.slice(0, 500), color: DARK, size: 17 })],
                    })
                )
              : [
                  new Paragraph({
                    children: [new TextRun({ text: '—', color: DARK, size: 17 })],
                  }),
                ],
            idx % 2 === 1
          ),
          cell(
            [
              new Paragraph({
                children: [
                  new TextRun({ text: ligne.dtu_probable, bold: true, color: BLUE, size: 20 }),
                ],
              }),
            ],
            idx % 2 === 1
          ),
        ],
      })
  );

  const legal = [
    new Paragraph({
      shading: {
        fill: LIGHT_BLUE,
        type: ShadingType.CLEAR,
        color: 'auto',
      },
      border: {},
      spacing: { after: 200, before: 200 },
      children: [
        new TextRun({
          text: 'Avertissement légal — ',
          bold: true,
          color: BLUE,
        }),
        new TextRun({
          text:
            'Les DTU sont des documents normatifs diffusés par AFNOR (boutique.afnor.org) et le CSTB (boutique.cstb.fr). ' +
            'Ce rapport ne reproduit aucun texte officiel ni citation d’articles. ' +
            'Les libellés rectifiés ci-dessous sont une proposition précontractuelle générique uniquement à valider en interne. ' +
            'Chaque référence doit être confrontée dans le document payant officiel — article exact à confirmer dans le document officiel.',
          color: DARK,
        }),
      ],
    }),
    new Paragraph({ text: '', spacing: { after: 200 } }),
  ];

  const memoBlocks = data.memo_paragraphs.map(
    (p) =>
      new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun({ text: p, color: DARK, size: 20 })],
      })
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        headers: {
          default: new Header({ children: headerChildren }),
        },
        footers: {
          default: new Footer({ children: [footerParagraph] }),
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'Rapport Vérification DTU × devis — tableau d’analyse, devis rectifié proposé & mémo explicatif',
                bold: true,
                color: DARK,
                size: 24,
              }),
            ],
          }),
          ...legal,
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 120 },
            children: [new TextRun({ text: `Client : ${data.client}`, color: BLUE })],
          }),
          new Paragraph({
            children: [new TextRun({ text: `Projet : ${data.projet}`, color: DARK })],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Date du rapport : ${data.date} — Rédacteur : ${data.redacteur}`,
                color: DARK,
              }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 160, after: 120 },
            children: [
              new TextRun({ text: '1. Tableau d’analyse (rapprochement ligne / DTU)', bold: true, color: BLUE }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [headerRowAnalyse, ...bodyRowsAnalyse],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 320, after: 120 },
            children: [
              new TextRun({ text: '2. Proposition de devis rectifié (mémo préparation prix)', bold: true, color: BLUE }),
            ],
          }),
          new Paragraph({
            spacing: { after: 140 },
            children: [
              new TextRun({
                text:
                  'Les montants unitaires ou totaux ne sont pas recalculés par l’outil. Intégrez ces libellés dans votre tableau de prix après décision équipe acheteuse.',
                italics: true,
                color: DARK,
                size: 18,
              }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [headerRectif, ...bodyRectif],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 320, after: 120 },
            children: [
              new TextRun({
                text: '3. Mémo explicatif aux lecteurs dossier chantier ou bureau prix',
                bold: true,
                color: BLUE,
              }),
            ],
          }),
          ...memoBlocks,
          new Paragraph({
            spacing: { before: 400 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'Un assistant travaux à vos côtés pour tenir le rythme du chantier.',
                italics: true,
                bold: true,
                color: BLUE,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text:
                  'Pour aller plus loin : faire appel à un Beworker — stats du site BeWork : 3 à 5 jours opérationnel / 0 recrutement / 100 % supervisé en France.',
                size: 16,
                color: DARK,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const safeClient = data.client.replace(/[^\p{L}\d]+/gu, '').slice(0, 28) || 'Client';
  const filename = `Rapport_DTU_${safeClient}_${data.date.replace(/\//g, '')}.docx`;

  return new NextResponse(Buffer.from(buffer), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
