import { getSkillById } from './registry';

/** Bloc système selon activation de la charte du skill. */
export function buildCharterSystemBlock(skillId: string, useSkillCharter: boolean): string {
  const skill = getSkillById(skillId);

  if (useSkillCharter) {
    return `CHARTE ET CONVENTIONS DU SKILL (obligatoire) :
Tu dois appliquer intégralement les instructions du skill actif : structure documentaire, ton, mentions légales, formats de nommage et charte graphique décrits ci-dessous (ex. charte 3D MANAGER, format PROMOTECH, etc.).
Ne produis pas un document « générique » si le skill impose un modèle précis.
Skill : ${skill?.name ?? skillId}`;
  }

  return `MODE SANS CHARTE PROPRIÉTAIRE :
Ne pas appliquer de charte graphique ou de modèle exclusif client (3D MANAGER, PROMOTECH…).
Rédige un livrable professionnel neutre BeWork, structuré et actionnable, adapté au brief.`;
}

export function buildDeliverableFormatBlock(outputFormat: string): string {
  return `FORMAT DE LIVRABLE DEMANDÉ : ${outputFormat.toUpperCase()}
Le client téléchargera le résultat en .${outputFormat}. Structure le contenu pour être exporté proprement (titres, sections, tableaux en markdown si pertinent).`;
}
