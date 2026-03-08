# LinkedIn Content Studio — Architecture & Documentation

Plateforme de génération de contenu LinkedIn : post viral, image, infographie, carrousel, idées — en moins de 60 secondes.

---

## 1. Architecture technique

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 16)                      │
├─────────────────────────────────────────────────────────────────┤
│  /outil/generateur     → Post + visuels + booster + score        │
│  /outil/idees          → Idées 6 ou 30 BTP                       │
│  /outil/base-connaissance → Apprendre mon style, réfs, posts    │
│  /outil/inspirations   → Inspirations                            │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API ROUTES (Next.js)                       │
├─────────────────────────────────────────────────────────────────┤
│  /api/generate-post         │ Post LinkedIn (style, secteur)     │
│  /api/generate-ideas         │ 6 idées (thème libre)               │
│  /api/generate-ideas-btp     │ 30 idées BTP spécialisées           │
│  /api/boost-virality        │ Réécriture post viral              │
│  /api/virality-score        │ Score /100 + suggestions           │
│  /api/generate-visual-image │ Image Replicate (Flux/SDXL)         │
│  /api/generate-infographic  │ PDF infographie 1080x1080           │
│  /api/generate-carousel     │ PDF carrousel (mode viral option)   │
│  /api/generate-hooks        │ Accroches A/B                       │
│  /api/analyze-style         │ Profil écriture (5-10 posts)        │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SERVICES IA                               │
├─────────────────────────────────────────────────────────────────┤
│  LLM    → OpenAI GPT-4o-mini / Claude (via lib/aiProvider)        │
│  Images → Replicate (Flux Schnell, SDXL)                          │
│  PDF    → pdf-lib (infographies, carrousels)                      │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                        STOCKAGE                                  │
├─────────────────────────────────────────────────────────────────┤
│  localStorage  → Base connaissance, style, posts créés (client)   │
│  Supabase     → Posts, leads (si configuré)                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Composants React principaux

| Composant | Fichier | Rôle |
|-----------|---------|------|
| **GenerateurPage** | `app/outil/generateur/page.tsx` | Formulaire sujet, style de post, secteur, génération post + visuels |
| **VisualsSection** | `app/components/VisualsSection.tsx` | Image, infographie, carrousel, carrousel viral |
| **PostPreview** | `app/components/PostPreview.tsx` | Aperçu post style LinkedIn mobile |
| **IdeesPage** | `app/outil/idees/page.tsx` | Générateur idées 6 ou 30 BTP |
| **BaseConnaissancePage** | `app/outil/base-connaissance/page.tsx` | Références, anciens posts, style appris |
| **VoiceRecorder** | `app/components/VoiceRecorder.tsx` | Voix → sujet |
| **SnippetsManager** | `app/components/SnippetsManager.tsx` | Snippets réutilisables |
| **BestTimeDisplay** | `app/components/BestTimeDisplay.tsx` | Meilleurs moments pour poster |

---

## 3. Structure API

### Génération de contenu

| Route | Méthode | Body | Réponse |
|-------|---------|------|---------|
| `/api/generate-post` | POST | `{ subject, postStyleModule, secteur, ... }` | `{ content, variants }` |
| `/api/generate-ideas` | POST | `{ theme }` | `{ ideas: [{ title, category }] }` |
| `/api/generate-ideas-btp` | POST | `{}` ou `{ theme }` | `{ ideas: [{ title, category }] }` (30) |
| `/api/boost-virality` | POST | `{ post }` | `{ content }` |
| `/api/virality-score` | POST | `{ post }` | `{ score, suggestions }` |
| `/api/generate-visual-image` | POST | `{ post }` | `{ url, prompt }` |
| `/api/generate-infographic` | POST | `{ post }` | PDF blob |
| `/api/generate-carousel` | POST | `{ content, viral?: boolean }` | PDF blob |
| `/api/generate-hooks` | POST | `{ subject }` | `{ hooks }` |
| `/api/analyze-style` | POST | `{ posts }` | `{ styleSummary }` |

### Variables d'environnement

```
OPENAI_API_KEY=sk-...
REPLICATE_API_TOKEN=...
# Optionnel
ANTHROPIC_API_KEY=...
OPENAI_MODEL=gpt-4o-mini
```

---

## 4. Estimation du coût par génération

| Action | Modèle | Tokens estimés | Coût unitaire (~) |
|--------|--------|----------------|-------------------|
| **Post LinkedIn** | GPT-4o-mini | ~1500 | ~0,002 € |
| **6 idées** | GPT-4o-mini | ~1200 | ~0,002 € |
| **30 idées BTP** | GPT-4o-mini | ~2000 | ~0,003 € |
| **Booster viralité** | GPT-4o-mini | ~800 | ~0,001 € |
| **Score viralité** | GPT-4o-mini | ~400 | ~0,0005 € |
| **Analyse style** | GPT-4o-mini | ~600 | ~0,001 € |
| **Image Replicate** | Flux Schnell | — | ~0,01–0,02 € |
| **Infographie PDF** | GPT-4o-mini + pdf-lib | ~600 | ~0,001 € |
| **Carrousel PDF** | GPT-4o-mini + pdf-lib | ~800 | ~0,001 € |

**Contenu complet (post + image + infographie + carrousel)** : ~0,02–0,03 € par génération.

**Alternative bas coût (OpenRouter)** : DeepSeek, Mistral, Claude Haiku → environ 2–3× moins cher.

---

## 5. Modules implémentés

| Module | Statut | Fichiers |
|--------|--------|----------|
| 1. Style de post (7 options) | ✅ | `generate-post`, `generateur/page` |
| 2. Règles rédaction viral | ✅ | `generate-post` |
| 3. Booster viralité | ✅ | `boost-virality`, `generateur/page` |
| 4. Score de viralité | ✅ | `virality-score`, `generateur/page` |
| 5. Génération images | ✅ | `generate-visual-image`, `VisualsSection` |
| 6. Infographies | ✅ | `generate-infographic` |
| 7. Carrousel | ✅ | `generate-carousel` |
| 8. Carrousel viral | ✅ | `generate-carousel` (viral: true) |
| 9. 30 idées BTP | ✅ | `generate-ideas-btp`, `idees/page` |
| 10. Scraper posts viraux | 📋 À concevoir | Voir § 6 |
| 11. Apprendre mon style | ✅ | `analyze-style`, `base-connaissance` |
| 12. Contenu complet | ✅ | `generateur/page`, `VisualsSection` |
| 13. Secteur BTP | ✅ | `generate-post`, `generateur/page` |
| 14. Stack IA | ✅ | OpenAI, Replicate, pdf-lib |
| 15. Design | ✅ | #377CF3, Inter, Poppins |

---

## 6. Module 10 — Scraper posts viraux (architecture proposée)

**Limite** : Le scraping direct de LinkedIn viole les conditions d’utilisation. Proposition alternative :

1. **Sources alternatives**  
   - Flux RSS LinkedIn (si disponibles)  
   - Import manuel : formulaire « Ajouter un post viral » (coller le texte)  
   - API tierce type PhantomBuster (avec accord)

2. **Schéma de stockage**  
   ```sql
   CREATE TABLE viral_posts (
     id UUID PRIMARY KEY,
     content TEXT,
     source VARCHAR(100),
     hook TEXT,
     structure JSONB,
     score_estimated INT,
     created_at TIMESTAMPTZ
   );
   ```

3. **Workflow**  
   - L’utilisateur colle un post → API `/api/analyze-viral-post`  
   - Extraction : hook, structure, longueur  
   - Stockage en base (Supabase)  
   - Utilisation dans les prompts : « exemples de hooks performants : … »

---

## 7. Déploiement

- **Railway** : connecté à GitHub, déploiement auto sur push  
- **Variables** : `OPENAI_API_KEY`, `REPLICATE_API_TOKEN` dans les secrets Railway  
- **Domaine** : app.laureolivie.fr (configuré via Railway)
