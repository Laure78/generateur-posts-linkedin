import type { DtuRecord } from './types';
import { stripAccentsLower } from './match-dtu';

export type AlertesOptions = {
  concurrentRefs: string[];
  hors?: { label: string; orient: string } | null;
};

/**
 * Alertes de complétude (codes du cahier BeWork) — heuristiques locales, sans chiffrage normatif.
 */
export function buildAlertes(line: string, match: DtuRecord | null, opts: AlertesOptions): string[] {
  const alertes: string[] = [];
  const n = stripAccentsLower(line);

  if (opts.hors) {
    alertes.push(`HORS_DTU: ${opts.hors.label} — ${opts.hors.orient}`);
    return alertes;
  }

  if (opts.concurrentRefs.length > 0) {
    alertes.push(
      `DTU_CONCURRENT: plusieurs familles probables (${opts.concurrentRefs.join(' / ')}) — arbitrage métier nécessaire`
    );
  }

  if (!match) {
    alertes.push('AUTRE: ouvrage non couvert par la base projet — croiser liste FFB / boutiques AFNOR et CSTB');
    return alertes;
  }

  if (
    (n.includes('peinture') || n.includes('acrylique') || n.includes('glycero') || n.includes('glycéro')) &&
    !/\bclasse\b.*\b[abcd]\b/i.test(line) &&
    !/\bfinition\b.*\b[abcd]\b/i.test(line)
  ) {
    alertes.push('MANQUE_CLASSE: indice de finition (famille décorative) non explicite au devis');
  }

  if (
    (n.includes('carrelage') || n.includes('faience') || n.includes('faïence') || n.includes('gres cerame')) &&
    !n.includes('chape') &&
    !n.includes('dalle') &&
    !n.includes('ancien carrelage') &&
    !n.includes('support')
  ) {
    alertes.push('MANQUE_SUPPORT: nature du support (chape, dalle, rénovation sur ancien revêtement…) non précisée');
  }

  if (
    (n.includes('carrelage') || n.includes('faience') || n.includes('faïence')) &&
    (n.includes('salle de bain') || n.includes('sdb') || n.includes('douche') || n.includes('local humide')) &&
    !n.includes('sel') &&
    !n.includes('spec') &&
    !n.includes('etancheite sous carrelage') &&
    !n.includes('étanchéité sous carrelage')
  ) {
    alertes.push(
      'MANQUE_ACCESSOIRES: local humide — prévoir un système sous carrelage adapté (à chiffrer et à valider au DTU officiel)'
    );
  }

  if (
    (n.includes('isolation') || n.includes('isolant')) &&
    !n.includes('souffle') &&
    !n.includes('deroule') &&
    !n.includes('déroulé') &&
    !n.includes('ite') &&
    !n.includes('iti') &&
    !n.includes('rampant') &&
    !n.includes('combles')
  ) {
    alertes.push('MANQUE_TECHNIQUE: procédé d’isolation (soufflé, déroulé, ITE/ITI, etc.) non choisi au libellé');
  }

  if (
    match.famille === 'Étanchéité' &&
    !n.includes('bitume') &&
    !n.includes('pvc') &&
    !n.includes('epdm') &&
    !n.includes('membrane')
  ) {
    alertes.push('MANQUE_TECHNIQUE: famille de membrane ou procédé d’étanchéité non identifiée sur la ligne');
  }

  if (n.includes('fenetre') || n.includes('fenêtre') || n.includes('menuiserie')) {
    if (!n.includes('applique') && !n.includes('tunnel') && !n.includes('rénovation') && !n.includes('renovation')) {
      alertes.push('MANQUE_TECHNIQUE: mode de pose menuiserie (applique, tunnel, rénovation…) non précisé');
    }
  }

  if (
    (n.includes('plancher chauffant') || n.includes('plancher radiante')) &&
    !n.includes('essai') &&
    !n.includes('pression')
  ) {
    alertes.push(
      'MANQUE_ACCESSOIRES: prévoir essais de mise en pression / constats si réseau encastré (à confirmer au lot CVC ou plomberie)'
    );
  }

  if (!/\d/.test(line) && line.length < 55 && !/\bforfait\b/i.test(line)) {
    alertes.push('MANQUE_SURFACE: pas de quantité visible sur la ligne — vérifier unités au bordereau');
  }

  if (n.includes('tuile') && n.includes('mecanique') && /\b5\s*%|5\s*pour\s*cents/i.test(line)) {
    alertes.push(
      'INCOHERENCE: faible pente évoquée pour couverture tuiles — à valider avec avis couvreur et documents officiels'
    );
  }

  return alertes;
}
