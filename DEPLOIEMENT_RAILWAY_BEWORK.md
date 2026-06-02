# Déploiement Railway — Plateforme BeWork

## Prérequis

- Code sur GitHub : `Laure78/generateur-posts-linkedin` (dépôt `bework`)
- Projet Supabase configuré → voir `SUPABASE_BEWORK.md`
- Compte [Railway](https://railway.com)

## 1. Créer le service Railway

1. [railway.com](https://railway.com) → **Login with GitHub**
2. **New Project** → **Deploy from GitHub repo**
3. Choisir le dépôt `generateur-posts-linkedin` (dossier racine = projet Next.js `bework`)
4. Railway détecte Next.js et lance un build

## 2. Variables d'environnement (onglet Variables)

| Variable | Obligatoire | Description |
|----------|-------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Oui | URL projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Oui | Clé anon / publishable |
| `ANTHROPIC_API_KEY` | Oui | Skills Claude (demandes hors DTU) |
| `NEXT_PUBLIC_SITE_URL` | Oui | URL Railway générée, ex. `https://xxx.up.railway.app` |
| `SUPABASE_SERVICE_ROLE_KEY` | Recommandé | Tâches serveur si besoin |
| `NEXT_PUBLIC_DEV_BYPASS` | Oui (prod) | `false` en production |
| `DEV_BYPASS` | Oui (prod) | `false` en production |
| `ANTHROPIC_MODEL` | Non | Défaut : `claude-sonnet-4-20250514` |

Après ajout des variables, Railway redéploie automatiquement.

## 3. Domaine public

**Settings → Networking → Generate Domain**

Copie l’URL dans `NEXT_PUBLIC_SITE_URL` et dans Supabase (redirect URLs).

## 4. Domaine custom (optionnel)

**Settings → Networking → Custom Domain** → ex. `app.bework.fr`

Mettre à jour Supabase redirect URLs en conséquence.

## 5. Mises à jour

```bash
git add .
git commit -m "Description"
git push origin main
```

Railway rebuild en 1–3 min.

## Dépannage

- **Build OK mais page erreur auth** : vérifier `NEXT_PUBLIC_SUPABASE_*` et redirect URLs Supabase
- **Demandes non enregistrées** : migration SQL non appliquée (`missions` table)
- **Skills Claude** : `ANTHROPIC_API_KEY` manquante ou invalide
