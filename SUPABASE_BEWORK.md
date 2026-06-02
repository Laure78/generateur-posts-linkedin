# Supabase — Plateforme BeWork

## 1. Projet Supabase BeWork

**Projet :** [hiskonqyzpkjcvdsfyho](https://supabase.com/dashboard/project/hiskonqyzpkjcvdsfyho)

Si `npm run check:supabase` affiche **Invalid API key**, régénère les clés :
**Settings → API → anon public → Regenerate** (puis mets à jour `.env.local` et Railway).

Copie dans `.env.local` (voir aussi `.env.local.example`) :

```env
NEXT_PUBLIC_SUPABASE_URL=https://TON_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...   # ou clé publishable sb_...
SUPABASE_SERVICE_ROLE_KEY=eyJ...       # secret — jamais côté navigateur
DATABASE_URL=postgresql://postgres.[ref]:[MOT_DE_PASSE]@...pooler.supabase.com:6543/postgres
```

`DATABASE_URL` : **Settings → Database → Connection string → URI** (mode Transaction ou Session).

## 2. Migration (tables missions)

**Option A — SQL Editor (recommandé la 1ère fois)**

1. **SQL Editor → New query**
2. Colle le contenu de `supabase/migrations/001_bework_platform.sql`
3. **Run**

**Option B — CLI**

```bash
npm run db:bework
```

(nécessite `DATABASE_URL` dans `.env.local`)

## 3. Authentification email

1. **Authentication → Providers → Email** : activé
2. **Authentication → URL Configuration** :
   - Site URL : `https://app.bework.fr` (prod) ou `http://localhost:3000` (dev)
   - Redirect URLs :
     - `http://localhost:3000/**`
     - `https://app.bework.fr/**`

## 4. Enregistrer les clés dans `.env.local`

```bash
npm run env:supabase -- "eyJ...anon..." "eyJ...service_role..."
```

(les guillemets évitent que le shell coupe la clé JWT)

## 5. Vérifier

```bash
npm run check:supabase
```

Puis `npm run dev` → inscription sur `/auth/inscription` → tableau de bord `/plateforme`.
