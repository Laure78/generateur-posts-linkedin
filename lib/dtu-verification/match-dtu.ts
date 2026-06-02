import type { DtuRecord } from './types';

export function stripAccentsLower(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();
}

export function scoreDtu(lineNorm: string, entry: DtuRecord): number {
  let score = 0;
  for (const m of entry.metiers) {
    const k = stripAccentsLower(m);
    if (k.length >= 3 && lineNorm.includes(k)) score += 14;
  }
  for (const word of entry.mots_cles) {
    const k = stripAccentsLower(word);
    if (k.length >= 3 && lineNorm.includes(k)) score += 5;
  }
  return score;
}

export type ScoredDtu = { entry: DtuRecord; score: number };

export function rankDtus(line: string, dtus: DtuRecord[]): ScoredDtu[] {
  const lineNorm = stripAccentsLower(line);
  return dtus
    .map((entry) => ({ entry, score: scoreDtu(lineNorm, entry) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
}

const HORS_DTU_PATTERNS: { test: RegExp; label: string; orient: string }[] = [
  {
    test: /\b(enrob|enrobe|enrobé|voirie\s|routière|routier)\b/i,
    label: 'Voirie / enrobés',
    orient: 'Norme NF P 98-150 et fascicules CCTG selon marché — hors périmètre DTU bâtiment courant.',
  },
  {
    test: /\b(géotechnique|géologie|étude\s+de\s+sol|sondage)\b/i,
    label: 'Géotechnique / études de sol',
    orient: 'Rapports géotechniques et normes terrain — hors DTU de mise en œuvre courants listés ici.',
  },
  {
    test: /\bcoordination\s+sps\b/i,
    label: 'Coordination SPS',
    orient: 'Obligations réglementaires coordination — pas de rapprochement DTU ouvrage.',
  },
];

export function detectHorsDtu(line: string): { label: string; orient: string } | null {
  for (const h of HORS_DTU_PATTERNS) {
    if (h.test.test(line)) return { label: h.label, orient: h.orient };
  }
  return null;
}
