/**
 * Suggestions de hashtags par secteur
 */

export const HASHTAG_SECTORS: Record<string, string[]> = {
  btp: [
    '#BTP',
    '#Construction',
    '#Artisanat',
    '#Chantier',
    '#TravauxPublics',
    '#TPE',
    '#Devis',
    '#Rénovation',
    '#TransformationNumérique',
    '#IA',
    '#Innovation',
    '#FormationPro',
  ],
  tech: [
    '#Tech',
    '#IA',
    '#Innovation',
    '#Productivité',
    '#Outils',
    '#Numérique',
  ],
  business: [
    '#Business',
    '#Leadership',
    '#Entrepreneuriat',
    '#Réseau',
    '#Pro',
  ],
};

export function getHashtagsForSector(sector: string, count = 8): string[] {
  const list = HASHTAG_SECTORS[sector] || HASHTAG_SECTORS.btp;
  return list.slice(0, count);
}
