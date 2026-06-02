import Anthropic from '@anthropic-ai/sdk';
import { extractJsonFromText } from './extract-json';
import { generate3dmCrDocx } from './generate-3dm-cr-docx';
import type { MissionForSkill } from './run-mission';

const CR_JSON_SYSTEM = `Tu es l'assistant compte rendu de chantier 3D MANAGER (MOEX, Île-de-France).
À partir du brief client, produis UN SEUL objet JSON valide pour le script de génération Word.

Schéma obligatoire (tous les champs string sauf listes indiquées) :
operation, adresse, moex, architecte, bureau_controle, csps, cr_numero (number),
date_visite, redacteur, diffusion, meteo, presents (array string), absents (array string),
avancement (string 3-5 lignes),
lots (array de { nom, entreprise?, observations: [{ num, texte, echeance, statut }] }),
points_soldes (array string), points_attente (array string), decisions (array string),
prochaine_reunion: { date, ordre_du_jour },
mention_approbation (string).

Statuts observation : Levé | En cours | En attente | Nouveau.
Préfixes num : GO-, FAC-, ETA-, MEXT-, CLO-, ELE-, CVC-, VRD-, GEN-.
Reprends les points non soldés du CR précédent si mentionnés dans le brief.
Ton factuel, neutre, sans jugement.

RÈGLE ABSOLUE : réponds UNIQUEMENT avec le JSON (pas de markdown, pas de \`\`\`, pas de texte avant/après).`;

function buildCrSummary(crData: Record<string, unknown>, filename: string): string {
  const op = String(crData.operation ?? 'Opération');
  const crNum = crData.cr_numero != null ? ` n°${crData.cr_numero}` : '';
  const date = String(crData.date_visite ?? '');
  const lots = Array.isArray(crData.lots) ? crData.lots.length : 0;

  return `## Compte rendu de chantier — ${op}${crNum}

**Date de visite :** ${date || '—'}  
**Lots traités :** ${lots}

Le document Word à la charte **3D MANAGER** a été généré : **${filename}**.

Téléchargez le fichier ci-dessous, relisez-le et validez avant diffusion (délai d’approbation mentionné dans le CR).

### Avancement (extrait)
${String(crData.avancement ?? '—')}
`;
}

export async function run3dmCrChantierSkill(mission: MissionForSkill): Promise<string> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    system: CR_JSON_SYSTEM,
    messages: [
      {
        role: 'user',
        content: `Titre mission : ${mission.title}
Chantier : ${mission.chantier || '—'}

Brief / notes de visite :
${mission.brief}`,
      },
    ],
  });

  const rawText = message.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n');

  if (message.stop_reason === 'max_tokens') {
    throw new Error(
      'Réponse trop longue (limite atteinte). Réduisez le brief ou scindez en deux demandes.'
    );
  }

  const crData = extractJsonFromText(rawText) as Record<string, unknown>;
  const { filename } = await generate3dmCrDocx(crData, mission.id);

  return buildCrSummary(crData, filename);
}
