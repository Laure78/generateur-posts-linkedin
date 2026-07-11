# BeWork Mobile

Application **iOS / Android** (Expo) pour les assistants travaux et les chefs d'équipe — même compte Supabase que le site [app.laureolivie.fr](https://app.laureolivie.fr).

## Prérequis

- Node.js 20+
- [Expo Go](https://expo.dev/go) sur téléphone, ou simulateur iOS / Android

## Configuration

```bash
cd mobile
npm install
cp .env.example .env
```

Renseigner dans `.env` (mêmes clés que le projet web) :

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_API_URL` → `https://app.laureolivie.fr`

## Lancer

```bash
npm start
```

Puis scanner le QR code avec Expo Go (iOS/Android).

## Fonctionnalités

| Écran | Description |
|-------|-------------|
| **Demandes** | Liste, recherche, filtre « À valider » |
| **Nouvelle** | Création demande champs CR, import PDF/Word |
| **Admin** | File validation chef (rôles `chef_equipe` / `admin`) |
| **Compte** | Profil et déconnexion |
| **Détail** | Suivi IA, validation livrable, lien téléchargement |

## Build stores (plus tard)

```bash
npx eas build --platform all
```

Comptes Apple Developer / Google Play requis.

## API mobile

Le backend accepte l’en-tête `Authorization: Bearer <jwt_supabase>` sur toutes les routes `/api/*`.
