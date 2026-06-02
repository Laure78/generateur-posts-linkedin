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

## 2. Migrations (tables missions)

**Option A — SQL Editor (recommandé)**

1. **SQL Editor → New query**
2. Exécute dans l’ordre :
   - `supabase/migrations/001_bework_platform.sql`
   - `supabase/migrations/002_mission_deliverable_options.sql` *(format livrable + charte skill)*

**Option B — CLI**

```bash
npm run db:bework
```

(nécessite `DATABASE_URL` dans `.env.local` — applique toutes les migrations du dossier)

Si erreur *« Could not find the output_format column »* : la migration **002** n’est pas appliquée. Colle uniquement :

```sql
alter table public.missions
  add column if not exists output_format text not null default 'docx'
    check (output_format in ('docx', 'doc', 'pdf', 'xls', 'pptx'));

alter table public.missions
  add column if not exists use_skill_charter boolean not null default true;
```

Puis **Settings → API → Reload schema** (ou attendre 1–2 min).

## 3. Authentification email

1. **Authentication → Providers → Email** : activé  
   (pour tests rapides : désactiver « Confirm email » ; en prod, laisser activé → l’utilisateur reçoit un lien avant la 1ʳᵉ connexion)
2. **Authentication → URL Configuration** :
  - Site URL : `https://app.laureolivie.fr` (prod) ou `http://localhost:3000` (dev)
   - Redirect URLs :
     - `http://localhost:3000/**`
    - `https://app.laureolivie.fr/**`

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
