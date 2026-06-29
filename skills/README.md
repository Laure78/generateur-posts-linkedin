# Skills BeWork

Chaque skill = un dossier `<id>/SKILL.md` (consignes métier pour Claude).

| ID | Type de mission | Intégré |
|----|-----------------|--------|
| `verification-dtu-bework` | `verification-dtu` | Oui → `/plateforme/outils/verification-dtu` |
| `3dmanager-cr-chantier` | `cr-chantier-3dm` | Claude |
| `promotech-cr-chantier` | `cr-chantier-moex` | Claude |
| `promotech-courrier-moe` | `courrier-moe` | Claude |
| `promotech-pv-reserves` | `pv-reserves` | Claude |
| `promotech-ordre-de-service` | `ordre-service` | Claude |
| `promotech-analyse-dce` | `analyse-dce-moex` | Claude |
| `promotech-comparatif-offres` | `comparatif-offres` | Claude |
| `balas-analyser-dce-mh` | `analyse-dce-mh` | Claude |
| `balas-gonogo-mh` | `gonogo-mh` | Claude |
| `controle-memoire-technique-btp` | `controle-memoire` | Claude |
| `dossier-intervention` | `dossier-intervention` | Claude |
| `situation-travaux` | `situation-travaux` | Claude |
| `moex-pieces-dce` | `pieces-ecrites-dce`, `tableau-dpgf` | Claude |
| `moex-dc4-sous-traitance` | DC4, agrément, registre sous-traitants… | Claude |
| `moex-doe-livraison` | `constitution-doe` | Claude |
| `moex-suivi-levees-reserves` | `suivi-levees-reserves` | Claude |
| `assistant-travaux` | tâches admin sans skill dédié, `autre` | Claude |

Catalogue : `lib/skills/registry.ts` — exécution API : `POST /api/skills/run` avec `missionId`.
