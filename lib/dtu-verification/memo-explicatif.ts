import type { LigneAnalyse } from './types';

/** Paragraphes du mémo bordereau (ton interne dossier chantier — pas de texte officiel DTU). */
export function construireMemoExplicatif(opts: {
  client: string;
  projet: string;
  date: string;
  lignes: LigneAnalyse[];
}): string[] {
  const { client, projet, date, lignes } = opts;
  const nb = lignes.length;
  const eleve = lignes.filter((l) => l.niveau_confiance === 'Élevé').length;
  const moyen = lignes.filter((l) => l.niveau_confiance === 'Moyen').length;
  const faible = lignes.filter((l) => l.niveau_confiance === 'Faible').length;
  const dtuSet = new Set<string>();
  for (const l of lignes) {
    if (l.dtu_probable && l.dtu_probable !== '—' && l.dtu_probable !== 'À identifier') {
      dtuSet.add(l.dtu_probable);
    }
  }
  const listeDtu = [...dtuSet].sort().join(', ') || 'Aucune référence NF DTU retenue de façon sûre sur l’ensemble.';

  const critiques = lignes.filter((l) => l.niveau_confiance !== 'Élevé' || l.alertes.some((x) => x.startsWith('INCOHERENCE')));
  const vignettes = critiques.slice(0, 4).map((l, i) => `${i + 1}. (${l.niveau_confiance}) ${l.ligne_devis.slice(0, 140)}${l.ligne_devis.length > 140 ? '…' : ''}`);

  return [
    `Objet du présent mémo : aide à la relecture normative indicative pour le dossier « ${projet} », commanditaire ou destinataire identifié « ${client} ». Date du lot d’analyse automatisée : ${date}.`,
    'Méthodologie utilisée dans l’outil prototype : segmentation des lignes « prestations d’exécution », mise en relation textuelle avec une base projet de références NF DTU courantes sous forme de mots-clés et de reformulations internes uniquement ; détection automatisée d’éléments manquants pour figer au libellé le marché avant signature.',
    'Rappel impératif : aucun passage du présent fichier ne doit être assimilé au contenu officiel d’un NF DTU. Seuls les brochures et fichiers téléchargeables sur boutique.afnor.org et boutique.cstb.fr ont valeur de référence normative exhaustive. Mention obligatoire sur chaque point détaillé : « Article exact à confirmer dans le document officiel ».',
    `Synthèse quantitative : ${nb} lignes analysées après filtrages administratifs. Confiances : ${eleve} élevée${eleve > 1 ? 's' : ''}, ${moyen} moyenne${moyen > 1 ? 's' : ''}, ${faible} faible${faible > 1 ? 's' : ''}. Références NF DTU distinctes envisagées (non contractuellement validées avant achat officiel du document concerné) : ${listeDtu}.`,
    vignettes.length
      ? `Points de dossier méritant clarification rapide avant émission de prix ou ordre de service (extraits) :\n${vignettes.join('\n')}`
      : 'Aucune ligne particulièrement critique ne ressort après filtrage — conserver cependant une relecture humaine métier systématique.',
    'Proposition de lignes rectifiées : le tableau « devis rectifié » agrège sous forme exhaustive les compléments de libellés et demandes descriptives identifiées par le moteur. Il doit être recyclé dans votre fichier de prix ou tableau de prix sous format interne après validation financière locale ; aucun montant ou unitaire n’a été régénéré ici.',
    'Prochaines étapes recommandées : acheminer cette version au conducteur ou au métreur pour arbitrage chantier ouvert sur les lignes en confiance Moyen ou Faible ; télécharger depuis AFNOR/CSTB chaque NF DTU retenue pour la défense contractuelle définitive ; archiver aussi la version brute du devis d’entrée comme trace dossier avant rectification.',
    'Pour poursuivre la chaîne valeur interne ou externalisée par BeWork après phase test : faire appel à un Beworker — stats indicatives du site bework.fr : 3 à 5 jours opérationnel / 0 recrutement / 100 % supervisé en France.',
    'Assistants travaux augmentés par l’IA · BeWork — Relais bureau-chantier BTP · bework.fr',
  ];
}
