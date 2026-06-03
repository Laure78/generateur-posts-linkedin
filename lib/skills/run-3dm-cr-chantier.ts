import Anthropic from '@anthropic-ai/sdk';
import { resolveAnthropicApiModel } from '@/lib/bework/anthropic-models';
import { extractJsonFromText } from './extract-json';
import { generate3dmCrDocx } from './generate-3dm-cr-docx';
import type { MissionForSkill } from './run-mission';

const CR_JSON_SYSTEM = `Tu es l'assistant compte rendu de chantier 3D MANAGER (bureau d'études TCE, MOEX certifié ISO 9001, agence Île-de-France).
Le CR fait foi : factuel, neutre, exhaustif, traçable. Le MOEX valide ; tu produis le JSON pour le .docx à la charte graphique officielle.

À partir du brief, produis UN SEUL objet JSON valide pour scripts/generate_cr.py (charte officielle : anthracite #2A2A2A, rouge #CC2A2A, fonds #F2F2F2, logo blanc sur bandeau anthracite, liséré noir #000000 sous le bandeau, pied de page BET TCE · MOEX · ISO 9001 et réseau d'agences).

Schéma obligatoire :
operation, adresse, moex (défaut "3D MANAGER · Agence Île-de-France"), architecte, bureau_controle, csps,
cr_numero (number), date_visite, redacteur, diffusion (défaut "sous 24 h, par voie dématérialisée"), meteo,
presents (array string), absents (array string),
avancement (3 à 5 lignes : phase, points bloquants, planning),
lots (array { nom, entreprise?, observations: [{ num, texte, echeance, statut }] }) — classer GO → second œuvre → techniques → VRD → finitions → GEN,
points_soldes (array string), points_attente (array string), decisions (array string),
prochaine_reunion: { date, ordre_du_jour },
mention_approbation (défaut : approuvé sans observation écrite sous 8 jours).

Statuts : Levé | En cours | En attente | Nouveau.
Préfixes num continus, jamais renumérotés : GO-, FAC-, ETA-, MEXT-, CLO-, ELE-, CVC-, VRD-, GEN-.
Si CR précédent dans le brief : reconduire TOUS les points non soldés avec statut à jour.
Pas de jugement ; décrire défaut + référence DTU/plan/CCTP si pertinent.

RÈGLE ABSOLUE : réponds UNIQUEMENT avec le JSON (pas de markdown, pas de \`\`\`, pas de texte avant/après).`;

function buildCrSummary(
  crData: Record<string, unknown>,
  filename: string,
  outputFormat?: string
): string {
  const op = String(crData.operation ?? 'Opération');
  const crNum = crData.cr_numero != null ? ` n°${crData.cr_numero}` : '';
  const date = String(crData.date_visite ?? '');
  const lots = Array.isArray(crData.lots) ? crData.lots.length : 0;

  return `## Compte rendu de chantier — ${op}${crNum}

**Date de visite :** ${date || '—'}  
**Lots traités :** ${lots}

Le document à la charte **3D MANAGER** a été généré : **${filename}**.
${outputFormat && outputFormat !== 'docx' ? `\nUn export **.${outputFormat}** est également disponible au téléchargement.` : ''}

Téléchargez le fichier ci-dessous, relisez-le, faites valider par le **chef d'équipe**, puis transmettez au MOEX ou au client selon votre circuit (délai d’approbation mentionné dans le CR).

### Avancement (extrait)
${String(crData.avancement ?? '—')}
`;
}

export async function run3dmCrChantierSkill(mission: MissionForSkill): Promise<string> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await anthropic.messages.create({
    model: resolveAnthropicApiModel(mission.ai_model),
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

  return buildCrSummary(crData, filename, mission.output_format ?? 'docx');
}
