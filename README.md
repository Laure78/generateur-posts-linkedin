# BeWork — Plateforme assistants travaux (MOEX)

Outil interne pour les **assistants travaux (Beworkers)** : traitement des demandes des MOEX externalisés (CR chantier, courriers, marchés, GPA). L'IA prépare des brouillons ; **validation chef d'équipe** obligatoire avant envoi client.

- App : [app.laureolivie.fr](https://app.laureolivie.fr)
- Site : [bework.fr](https://www.bework.fr)

## Démarrage

```bash
npm install
cp .env.example .env.local
# Supabase + ANTHROPIC_API_KEY
npm run dev
```

## Supabase

Exécuter dans l'ordre :

1. `supabase/migrations/001_bework_platform.sql`
2. `002_mission_deliverable_options.sql`
3. `003_mission_ai_model.sql`
4. `004_mission_validation_admin.sql`

Rôles : `beworker` (défaut), `chef_equipe`, `admin` — les deux derniers accèdent à `/plateforme/admin`.

## Routes principales

| Route | Description |
|-------|-------------|
| `/plateforme` | Tableau de bord assistant |
| `/plateforme/admin` | Validation chef d'équipe |
| `/plateforme/demandes/nouvelle` | Nouvelle demande (+ import PDF/Word) |
| `/plateforme/ressources` | Guide d'utilisation |
| `/api/skills/run` | Traitement Claude |

## Tests

```bash
npm test
```

## Skills

Voir `skills/README.md` et `lib/skills/registry.ts`.
