import type { DtuRecord, LigneAnalyse, NiveauConfiance } from './types';
import { buildAlertes } from './alertes';
import { extractDevisLines } from './extract-lines';
import { detectHorsDtu, rankDtus, stripAccentsLower } from './match-dtu';
import { fusionnerRectification } from './rectification';

function pickArticles(entry: DtuRecord): string[] {
  const raw = entry.articles_typiques;
  return raw.slice(0, Math.min(5, raw.length));
}

function confidenceFrom(alertes: string[], concurrentCount: number, score: number): NiveauConfiance {
  const inco = alertes.some((a) => a.startsWith('INCOHERENCE'));
  if (inco || alertes.length >= 3) return 'Faible';
  if (alertes.length >= 2 || concurrentCount > 0 || score < 14) return 'Moyen';
  if (alertes.length === 1) return 'Moyen';
  return 'Élevé';
}

function analyserUneLigneBase(line: string, dtus: DtuRecord[]): Omit<LigneAnalyse, 'ligne_devis_rectifiee' | 'rectifications_appliquees'> {
  const hors = detectHorsDtu(line);
  if (hors) {
    const alertes = buildAlertes(line, null, { concurrentRefs: [], hors });
    return {
      ligne_devis: line,
      ouvrage_detecte: hors.label,
      dtu_probable: '—',
      dtu_titre_court: '',
      articles_a_verifier: [
        'Repérer la norme ou le fascicule applicable au marché',
        'Article exact à confirmer dans le document officiel',
      ],
      niveau_confiance: 'Faible',
      alertes,
      notes: hors.orient,
    };
  }

  const ranked = rankDtus(line, dtus);
  if (ranked.length === 0) {
    const alertes = buildAlertes(line, null, { concurrentRefs: [] });
    return {
      ligne_devis: line,
      ouvrage_detecte: 'Non classé (base projet)',
      dtu_probable: 'À identifier',
      dtu_titre_court: '',
      articles_a_verifier: [
        'Consulter le référentiel DTU sur boutique.afnor.org ou boutique.cstb.fr',
        'Article exact à confirmer dans le document officiel',
      ],
      niveau_confiance: 'Faible',
      alertes,
      notes: 'Aucun mot-clé métier reconnu dans la base interne — enrichir le libellé ou la base.',
    };
  }

  const best = ranked[0]!;
  const second = ranked[1];
  const third = ranked[2];

  const concurrentRefs: string[] = [];
  if (second && second.score >= best.score * 0.62 && second.score >= 7) {
    concurrentRefs.push(second.entry.reference);
  }
  if (third && third.score >= best.score * 0.5 && third.score >= 6) {
    concurrentRefs.push(third.entry.reference);
  }
  const uniqueConcurrent = [...new Set(concurrentRefs)];

  const n = stripAccentsLower(line);
  if (
    (n.includes('plomberie') && (n.includes('complete') || n.includes('complète'))) ||
    n.includes('installation sanitaire complete') ||
    n.includes('installation sanitaire complète')
  ) {
    for (const ref of ['NF DTU 60.11', 'NF DTU 60.5']) {
      if (!uniqueConcurrent.includes(ref) && best.entry.reference !== ref) {
        uniqueConcurrent.push(ref);
      }
    }
  }

  let alertes = buildAlertes(line, best.entry, { concurrentRefs: uniqueConcurrent });

  let conf = confidenceFrom(alertes, uniqueConcurrent.length, best.score);

  if (conf === 'Moyen' && alertes.length === 0) {
    alertes = [
      ...alertes,
      'MANQUE_CONTEXTE: précisions de local ou d’exposition utiles pour verrouiller le DTU au document officiel',
    ];
    conf = 'Moyen';
  }
  if (conf === 'Faible' && alertes.filter((a) => !a.startsWith('DTU_CONCURRENT')).length === 0) {
    alertes = [
      ...alertes,
      'AUTRE: affiner le libellé avec le corps d’état pour réduire l’incertitude DTU',
    ];
  }

  if (conf === 'Élevé' && uniqueConcurrent.length > 0) {
    conf = 'Moyen';
  }

  return {
    ligne_devis: line,
    ouvrage_detecte: `${best.entry.famille} — ${best.entry.titre_court}`,
    dtu_probable: best.entry.reference,
    dtu_titre_court: best.entry.titre_court,
    articles_a_verifier: pickArticles(best.entry),
    niveau_confiance: conf,
    alertes,
    notes:
      uniqueConcurrent.length > 1
        ? `Autres DTU à croiser : ${uniqueConcurrent.filter((r) => r !== best.entry.reference).join(', ')}`
        : '',
  };
}

function analyserUneLigne(line: string, dtus: DtuRecord[]): LigneAnalyse {
  return fusionnerRectification(line, analyserUneLigneBase(line, dtus));
}

export function analyzeDevisText(raw: string, dtus: DtuRecord[]): LigneAnalyse[] {
  const lines = extractDevisLines(raw);
  return lines.map((line) => analyserUneLigne(line, dtus));
}
