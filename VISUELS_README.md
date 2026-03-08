# Section VISUELS DU POST — LinkedIn Content Studio

## Fonctionnalités

| Bouton | Action | API | Coût |
|--------|--------|-----|------|
| **Générer une image** | Crée une illustration IA du post | Replicate Flux Schnell + OpenAI (prompt) | ~0,004 € |
| **Générer une infographie** | PDF 1080×1080 avec titre + points clés | OpenAI (extraction) + pdf-lib | ~0,001 € |
| **Générer un carrousel** | PDF 1080×1350, slides du post | pdf-lib | 0 € |
| **Carrousel viral** | 7 slides structurés (Hook, Problème, Solution, CTA…) | OpenAI + pdf-lib | ~0,002 € |
| **Générer tous les visuels** | Lance les 3 en parallèle | — | ~0,007 € |

---

## Configuration

### Variables d'environnement

| Variable | Obligatoire pour | Où l'obtenir |
|----------|-----------------|--------------|
| `OPENAI_API_KEY` | Tous les visuels | platform.openai.com |
| `REPLICATE_API_TOKEN` | Image uniquement | replicate.com/account/api-tokens |

Sans `REPLICATE_API_TOKEN`, le bouton "Générer une image" affiche une erreur. Les autres visuels fonctionnent.

---

## APIs créées

- `POST /api/generate-image-prompt` — Génère un prompt image à partir du post
- `POST /api/generate-visual-image` — Génère l'image via Replicate
- `POST /api/generate-infographic` — Génère l'infographie PDF
- `POST /api/generate-carousel` — Génère le carrousel (paramètre `viral: true` pour le mode viral)

---

## Design

- Couleur principale : **#377CF3** (bleu)
- Section visible après génération d'un post
- Aperçu de l'image générée + boutons Télécharger / Régénérer
- Aperçu de l'infographie (iframe PDF)
