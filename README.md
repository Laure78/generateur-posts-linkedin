# BeWork — Plateforme client

Relais administratif pour marchés travaux BTP / MOE. Les entreprises clientes déposent des demandes ; les **skills Claude AI** (vérification DTU, CR chantier, relances MOE, etc.) préparent le travail.

Site vitrine : [bework.fr](https://www.bework.fr)

## Démarrage

```bash
npm install
cp .env.example .env.local
# Remplir Supabase + ANTHROPIC_API_KEY
npm run dev
```

## Supabase

Exécuter `supabase/migrations/001_bework_platform.sql` dans le SQL Editor du projet Supabase.

Activer **Email** dans Authentication → Providers.

## Structure

| Route | Description |
|-------|-------------|
| `/` | Accueil plateforme |
| `/auth/connexion` | Connexion entreprise |
| `/plateforme` | Tableau de bord |
| `/plateforme/demandes/nouvelle` | Nouvelle demande |
| `/plateforme/outils/verification-dtu` | Outil DTU intégré |
| `/api/skills/run` | Traitement Claude (autres skills) |

## Skills

- **verification-dtu-bework** — intégré (`lib/dtu-verification/`)
- Autres skills — prompts dans `app/api/skills/run/route.ts` + fichier `.cursor/skills/`
