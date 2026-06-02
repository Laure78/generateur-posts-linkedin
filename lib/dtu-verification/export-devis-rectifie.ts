import type { LigneAnalyse } from './types';

function escapeCsvCell(value: string): string {
  const v = value.replace(/"/g, '""');
  return `"${v}"`;
}

/** Texte plat : une ligne numérotée = un libellé rectifié à recoller dans un bordereau. */
export function devisRectifieToTxt(
  rows: LigneAnalyse[],
  opts: { client: string; projet: string; date: string }
): string {
  const { client, projet, date } = opts;
  const head = [
    `Devis rectifié — ${client} — ${projet} — ${date}`,
    '',
    'Une ligne numérotée = un libellé proposé pour reprise dans votre tableau de prix (montants hors périmètre).',
    '—',
    '',
  ].join('\n');
  const body = rows.map((r, i) => `${i + 1}.\t${r.ligne_devis_rectifiee}`).join('\n');
  return `${head}${body}\n`;
}

/** CSV séparateur point-virgule + BOM UTF-8 pour Excel (FR). */
export function devisRectifieToCsv(rows: LigneAnalyse[]): string {
  const header = ['Ordre', 'Ligne origine', 'Ligne rectifiée', 'DTU probable', 'Confiance'];
  const lines = [header.map(escapeCsvCell).join(';')];
  rows.forEach((r, i) => {
    lines.push(
      [
        String(i + 1),
        r.ligne_devis,
        r.ligne_devis_rectifiee,
        r.dtu_probable,
        r.niveau_confiance,
      ]
        .map(escapeCsvCell)
        .join(';')
    );
  });
  return `\uFEFF${lines.join('\n')}\n`;
}

/** Texte simple : libellés rectifiés séparés par des sauts de ligne (copie presse-papiers). */
export function devisRectifiePlainLines(rows: LigneAnalyse[]): string {
  return rows.map((r) => r.ligne_devis_rectifiee).join('\n');
}
