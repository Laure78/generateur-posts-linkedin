import type { LigneAnalyse } from './types';

/**
 * Complète les libellés de devis de façon prudente (information contractuelle générique).
 * Pas de citations normatives ni de valeurs réglementaires chiffrées.
 */
export function enrichirRectification(ligneOriginale: string, analyse: Omit<LigneAnalyse, 'ligne_devis_rectifiee' | 'rectifications_appliquees'>): Pick<LigneAnalyse, 'ligne_devis_rectifiee' | 'rectifications_appliquees'> {
  const suffixes: string[] = [];
  const rectifs: string[] = [];

  for (const a of analyse.alertes) {
    const code = a.includes(':') ? a.split(':')[0]!.trim() : a;
    const expl = a.includes(':') ? a.slice(a.indexOf(':') + 1).trim() : '';

    switch (code) {
      case 'MANQUE_CLASSE':
        suffixes.push(
          'Précision demandée sur le niveau de finition / qualité décorative prévue avec le dossier projet (sans préjuger du libellé exact au DTU officiel).'
        );
        rectifs.push('Ajout demande explicite de niveau décoratif ou de finition sur le dossier.');
        break;
      case 'MANQUE_SUPPORT':
        suffixes.push('Préciser le support prévu ou existant avant mise en œuvre (rénovation, chape neuve, plancher brut, ancien revêtement, etc.).');
        rectifs.push('Complément sur nature du subjectile / du support.');
        break;
      case 'MANQUE_CONTEXTE':
        suffixes.push('Préciser le contexte spatial ou d’usage (locale sèche, pièce avec effet d’eau, façade, etc.) lorsque pertinent pour qualifier le marché.');
        rectifs.push('Complément description local ou exposition générale.');
        break;
      case 'MANQUE_SURFACE':
        suffixes.push('Reporter les quantités avec unités explicites (m², ml, nombre d’éléments…) alignées avec le métreur et le LOT concerné.');
        rectifs.push('Demande quantités et unités sur la ligne.');
        break;
      case 'MANQUE_ACCESSOIRES':
        suffixes.push(
          'Ajouter tout lot ou sous-détail d’interfaces ou de protections indispensables dont la charge doit être attribuée (selon dossier chantier ; à cadre lors de l’analyse officielle AFNOR/CSTB si applicable).'
        );
        rectifs.push('Ouverture sur interfaces / lots associés potentiellement manquants au libellé.');
        break;
      case 'MANQUE_TECHNIQUE':
        suffixes.push('Préciser le procédé ou la famille de mise en œuvre retenue entre les variantes équivalentes courantes dans le dossier projet.');
        rectifs.push('Choix ou famille technique à expliciter par le métier.');
        break;
      case 'INCOHERENCE':
        suffixes.push('Voir arbitrage métier urgente : anomalies signalées dans le lien libellé / situation courante.');
        rectifs.push('Signalement contradiction à corriger avant engagement.');
        break;
      case 'DTU_CONCURRENT':
        suffixes.push('Voir note de dossier croisée entre plusieurs références applicables avant engagement contractuel définitif.');
        rectifs.push('Rappel d’ambigüité plusieurs familles NF DTU possibles.');
        break;
      case 'HORS_DTU':
        suffixes.push(
          expl
            ? `Orientation hors périmètre DTU catalogue courant — ${expl}`
            : 'Orientation hors périmètre DTU catalogue courant — confirmer le référentiel réglementaire applicable.'
        );
        rectifs.push('Renvoi hors base DTU bâtiment classique.');
        break;
      case 'AUTRE':
        suffixes.push('Compléments libres à préciser lors de la relecture interne dossier chantier.');
        rectifs.push(expl ? `Observation : ${expl}` : 'Observation métier générique.');
        break;
      default:
        if (expl) {
          suffixes.push(expl.endsWith('.') ? expl : `${expl}.`);
          rectifs.push(`Traitement alerte ${code}.`);
        }
        break;
    }
  }

  if (analyse.dtu_probable && analyse.dtu_probable !== '—' && analyse.dtu_probable !== 'À identifier') {
    const refNote = ` Référence à rapprocher en document officiel : ${analyse.dtu_probable} (${analyse.dtu_titre_court || 'voir AFNOR/CSTB'}).`;
    if (!suffixes.some((s) => s.includes(analyse.dtu_probable))) {
      suffixes.push(refNote.trim());
      rectifs.push('Rappel de la famille DTU projet pour confrontation au catalogue officiel payant.');
    }
  }

  if (suffixes.length === 0) {
    if (analyse.niveau_confiance === 'Élevé') {
      return {
        ligne_devis_rectifiee: ligneOriginale.trim(),
        rectifications_appliquees: [
          analyse.dtu_probable && analyse.dtu_probable !== '—'
            ? 'Libellé exploitable tel quel après contrôle projet ; confrontation DTU officiel recommandée pour signature.'
            : 'Libellé conservé après filtrage — contrôle dossier projet recommandé.',
        ],
      };
    }
    return {
      ligne_devis_rectifiee: ligneOriginale.trim(),
      rectifications_appliquees: [
        analyse.notes?.trim()
          ? `Note dossier ajoutée : ${analyse.notes}`
          : 'Ajustement mineur : reprendre le libellé en intégrant les clarifications chantier lors de la prochaine version écrite.',
      ],
    };
  }

  const joint = [...new Set(suffixes)].join(' ');
  const rectified = `${ligneOriginale.trim()} — ${joint}`;
  return {
    ligne_devis_rectifiee: rectified.length > 2000 ? `${rectified.slice(0, 1997)}…` : rectified,
    rectifications_appliquees: rectifs.length > 0 ? rectifs : suffixes.slice(0, 4),
  };
}

export function fusionnerRectification(ligneOriginale: string, analyseSansRectif: Omit<LigneAnalyse, 'ligne_devis_rectifiee' | 'rectifications_appliquees'>): LigneAnalyse {
  const { ligne_devis_rectifiee, rectifications_appliquees } = enrichirRectification(ligneOriginale, analyseSansRectif);
  return {
    ...analyseSansRectif,
    ligne_devis_rectifiee,
    rectifications_appliquees,
  };
}
