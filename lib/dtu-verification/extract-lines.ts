const EXCLUSIONS = [
  /^compte\s+prorata/i,
  /^installations?\s+(de\s+)?chantier/i,
  /^plans?\s+exe/i,
  /^compte\s+général/i,
  /\bétudes?\b/i,
  /\bcoordination\s+sps\b/i,
  /bureau\s+d['']études/i,
  /^totaux?\b/i,
  /^sous[-\s]?totaux?\b/i,
  /\btva\b/i,
  /^frais\s+de\s+fich/i,
  /^débours/i,
  /^acompte/i,
  /^option(s)?\s+(non\s+)?chiffr/i,
];

function isExcludedLine(line: string): boolean {
  const t = line.trim();
  if (t.length < 8) return true;
  return EXCLUSIONS.some((re) => re.test(t));
}

/**
 * Découpe le texte collé en lignes de prestations (une ligne = souvent une ligne de devis ou DPGF).
 */
export function extractDevisLines(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((l) =>
      l
        .trim()
        .replace(/^[-•*\d.]+\s*/, '')
        .replace(/\s+/g, ' ')
    )
    .filter((l) => l.length > 0 && !isExcludedLine(l));
}
