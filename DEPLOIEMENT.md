# Guide de déploiement Railway — Pour débutantes

Ce guide détaille étape par étape comment mettre ton générateur de posts LinkedIn en ligne sur **Railway**, avec des explications simples.

---

## C’est quoi « déployer » ?

Déployer = mettre ton site sur un serveur accessible sur Internet. Actuellement, ton site tourne sur ton ordinateur (localhost). Après déploiement, tout le monde pourra y accéder via une adresse web.

---

## Vue d’ensemble

1. Mettre ton code sur GitHub (stockage en ligne)
2. Connecter GitHub à Railway (hébergement)
3. Donner à Railway tes clés secrètes (API OpenAI, Supabase, etc.)
4. Railway lance ton site et te donne une URL

---

# ÉTAPE 1 : Créer un compte GitHub (si tu n’en as pas)

1. Va sur [github.com](https://github.com)
2. Clique sur **Sign up**
3. Crée un compte (email, mot de passe)

---

# ÉTAPE 2 : Mettre ton code sur GitHub

## 2.1 Créer un dépôt sur GitHub

1. Connecte-toi sur [github.com](https://github.com)
2. Clique sur le **+** en haut à droite → **New repository**
3. **Repository name** : par exemple `generateur-posts-linkedin`
4. Laisse **Public** cochée
5. Ne coche pas « Add a README » (tu as déjà du code)
6. Clique sur **Create repository**

Tu obtiens une page avec une URL du type :  
`https://github.com/TON-PSEUDO/generateur-posts-linkedin`

## 2.2 Envoyer ton code depuis ton ordinateur

Ouvre un **Terminal** (ou l’outil intégré dans Cursor) dans ton dossier projet.

Tape ces commandes **une par une** :

```bash
# 1. Initialiser Git (si pas déjà fait)
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Faire un « enregistrement » (commit)
git commit -m "Prêt pour déploiement"

# 4. Nommer la branche principale « main »
git branch -M main

# 5. Lier ton dossier au dépôt GitHub
# Remplace TON-PSEUDO et TON-REPO par tes vraies valeurs !
git remote add origin https://github.com/TON-PSEUDO/TON-REPO.git

# 6. Envoyer le code sur GitHub
git push -u origin main
```

Si on te demande de te connecter :
- GitHub peut te demander ton identifiant et un **token** (pas ton mot de passe)
- Va sur GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Donne les droits **repo** au token
- Utilise ce token comme mot de passe quand tu tapes `git push`

Quand c’est fait, ton code est sur GitHub. Tu peux vérifier en allant sur la page de ton dépôt : tu dois y voir tous tes fichiers.

---

# ÉTAPE 3 : Créer un compte Railway

1. Va sur [railway.com](https://railway.com)
2. Clique sur **Login**
3. Choisis **Login with GitHub**
4. Autorise Railway à accéder à ton compte GitHub (c’est normal, c’est pour voir tes dépôts)

---

# ÉTAPE 4 : Créer un nouveau projet Railway

1. Sur Railway, clique sur **New Project** (ou **+ New Project**)
2. Tu vois plusieurs options :
   - **Deploy from GitHub repo** ← c’est celle-ci
   - Ou **Empty Project** si tu ne vois pas l’option GitHub

3. Clique sur **Deploy from GitHub repo**
4. Si demandé, clique sur **Configure GitHub App** pour autoriser Railway à voir tes dépôts
5. Choisis le dépôt où tu as poussé ton code (ex : `generateur-posts-linkedin`)
6. Clique dessus

Railway va alors :
- Récupérer ton code
- Détecter que c’est un projet Next.js
- Lancer un premier build (construction du site)
- Ça prend 2 à 4 minutes la première fois

Tu peux suivre la progression dans les **Logs** (journaux).  
Si tout va bien, tu verras à la fin quelque chose comme : **Deployed successfully** ou **Build completed**.

---

# ÉTAPE 5 : Obtenir une URL publique

Par défaut, ton site n’a pas encore d’adresse web. Il faut générer un domaine.

1. Une fois le déploiement terminé, clique sur ton **service** (la carte avec le nom de ton projet)
2. Va dans l’onglet **Settings** (Paramètres)
3. Descends jusqu’à la section **Networking** ou **Public Networking**
4. Clique sur **Generate Domain** (ou **+ Generate Domain**)
5. Railway crée une URL du type :  
   `https://generateur-posts-linkedin-production-xxxx.up.railway.app`
6. Clique sur cette URL pour l’ouvrir

**Attention** : à ce stade, ton site peut afficher une erreur ou une page blanche, car les **variables d’environnement** (clés secrètes) ne sont pas encore configurées. C’est normal, on y vient.

---

# ÉTAPE 6 : Configurer les variables d’environnement

Les variables d’environnement sont des informations secrètes que ton site utilise (clé OpenAI, mot de passe admin, etc.). Elles ne doivent pas être dans le code, mais dans la configuration Railway.

## 6.1 Où les ajouter ?

1. Dans ton projet Railway, clique sur ton **service** (le déploiement)
2. Va dans l’onglet **Variables** (ou **Environment**)
3. Tu verras une zone pour ajouter des variables
4. Clique sur **+ New Variable** ou **Add Variable** pour chacune

## 6.2 Liste des variables à ajouter

Ajoute ces variables **une par une** :

| Nom de la variable | Où trouver la valeur ? | Obligatoire ? |
|--------------------|------------------------|---------------|
| `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com) → API keys → Create new secret key | Oui |
| `ADMIN_SECRET` | Mot de passe que tu choisis pour te connecter à `/admin/login` | Oui |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL | Recommandé |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon public | Recommandé |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role (cliquer sur Reveal) | Recommandé |

Pour chaque variable :
- **Variable** = le nom (ex : `OPENAI_API_KEY`)
- **Value** = la valeur (ta clé ou ton mot de passe)
- Ne mets pas d’espaces avant ou après

## 6.3 Obtenir la clé OpenAI

1. Va sur [platform.openai.com](https://platform.openai.com)
2. Connecte-toi (ou crée un compte)
3. Menu **API keys** (ou Developers → API keys)
4. **Create new secret key**
5. Copie la clé (elle commence par `sk-...`)
6. Colle-la dans Railway pour la variable `OPENAI_API_KEY`

## 6.4 Après avoir ajouté les variables

Railway va **redéployer automatiquement** ton site avec les nouvelles variables. Attends 1 à 2 minutes, puis rafraîchis l’URL de ton site.

---

# ÉTAPE 7 : Tester ton site

1. Ouvre l’URL Railway (ex : `https://ton-projet.up.railway.app`)
2. Tu dois voir la page d’accueil « Laure Olivié — Créateur LinkedIn »
3. Clique sur **Accéder à l’outil**
4. Va sur le **Générateur**
5. Génère un post pour vérifier que l’IA fonctionne
6. Va sur **Mes posts** et clique sur **+ Mes posts** pour vérifier la sauvegarde (si Supabase est configuré)

---

# ÉTAPE 8 : Mettre à jour ton site plus tard

Chaque fois que tu modifies ton code et que tu veux mettre à jour le site :

```bash
git add .
git commit -m "Description de tes modifications"
git push origin main
```

Railway détecte le nouveau push et relance automatiquement un déploiement. Attends 1 à 3 minutes, puis rafraîchis ton site.

---

# Dépannage : Erreurs fréquentes

## « Build failed » ou le build échoue

1. Va dans Railway → ton service → **Deployments**
2. Clique sur le dernier déploiement (celui en échec)
3. Ouvre les **Logs** et regarde les dernières lignes en rouge
4. Souvent c’est une variable manquante ou une erreur de code — relis le message pour comprendre

## Erreur 500 quand tu génères un post

- Vérifie que `OPENAI_API_KEY` est bien définie dans Railway
- Vérifie que la clé est valide (pas expirée, pas supprimée sur OpenAI)

## Page blanche

- Ouvre les outils de développement du navigateur (F12 ou clic droit → Inspecter)
- Onglet **Console** : regarde s’il y a des erreurs en rouge
- Peut venir d’une variable `NEXT_PUBLIC_...` manquante ou incorrecte

## « Mes posts » ne sauvegarde pas

- Vérifie que tu as bien ajouté les 3 variables Supabase dans Railway
- Vérifie que la table `posts` existe dans Supabase (voir `SUPABASE_SETUP.md`)

## Le site ne se met pas à jour après un `git push`

- Attends 2 à 3 minutes
- Vérifie dans Railway → Deployments que un nouveau déploiement est en cours ou terminé
- Rafraîchis la page avec Ctrl+F5 (ou Cmd+Shift+R sur Mac) pour vider le cache

---

# Récapitulatif en 5 points

1. **GitHub** : ton code est en ligne
2. **Railway** : connecté à GitHub, lance ton site à chaque modification
3. **Variables** : `OPENAI_API_KEY`, `ADMIN_SECRET`, et Supabase si tu l’utilises
4. **Domaine** : Generate Domain dans Settings pour obtenir l’URL
5. **Mises à jour** : `git add .` → `git commit` → `git push` et Railway redéploie tout seul

Bonne mise en ligne.
