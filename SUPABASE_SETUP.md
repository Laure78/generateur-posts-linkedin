# Configuration Supabase - Guide Complet

> **Note** : Le formulaire de contact a été retiré. Le projet utilise Supabase pour stocker les **posts** (Mes posts, générateur, éditeur). Sans Supabase configuré, les posts restent en localStorage.

## 📋 Checklist de Configuration

### 1. 🔐 Variables d'Environnement Requises

Créez un fichier `.env.local` à la racine du projet avec :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key

# Admin Configuration
ADMIN_SECRET=votre_mot_de_passe_admin_securise
```

**Où trouver ces valeurs :**
- Allez dans votre projet Supabase
- Settings → API
- `NEXT_PUBLIC_SUPABASE_URL` = Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` = service_role key (⚠️ gardez-le secret !)

### 2. 📦 Dépendances NPM

Les paquets `@supabase/supabase-js` et `pg` sont déjà installés. Pour lancer les migrations en ligne de commande :

```bash
# Ajoute dans .env.local (optionnel, pour migrations en CLI) :
# DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
# Puis :
npm run db:migrate
```

Sinon, exécute `migrations/create_posts_table.sql` manuellement dans le SQL Editor Supabase.

### 3. ✅ Vérification

- **Admin** : Connectez-vous sur `/admin/login` avec votre `ADMIN_SECRET` — après connexion, redirection vers `/outil`

---

## 🚨 Problèmes Courants

### Erreur "SUPABASE URL not set"
→ Vérifiez que `.env.local` contient bien `NEXT_PUBLIC_SUPABASE_URL`

---

## 📝 Notes Importantes

- ⚠️ Ne commitez **JAMAIS** le fichier `.env.local` (il est dans `.gitignore`)
- 🔐 Le `SUPABASE_SERVICE_ROLE_KEY` donne un accès complet à la base — gardez-le secret

---

## 📦 Table Posts

Pour stocker les posts en base :

1. **Supabase Dashboard** → **SQL Editor** → **New query**
2. Colle et exécute le contenu de `migrations/create_posts_table.sql`

Une fois la table créée et les variables d'environnement configurées, les posts seront automatiquement sauvegardés dans Supabase (sinon fallback localStorage).

---

**Date de création** : 2025
**Version** : 1.1
