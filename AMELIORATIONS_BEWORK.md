# Améliorations BeWork — plateforme MOEX

## Déjà livré (2026)

| # | Fonctionnalité |
|---|----------------|
| 2 | Import PDF/Word/texte dans « Nouvelle demande » |
| 1 | Espace `/plateforme/admin` — validation livrable chef d'équipe |
| 3 | Rôles `beworker`, `chef_equipe`, `admin` + RLS Supabase |
| 4 | Filtres, recherche, pagination tableau de bord |
| 5 | Relance IA, duplication, aperçu texte, commentaire interne |
| 6 | Champs CR structurés + checklist avant envoi client |
| 7 | Estimation coût tokens par mission |
| 8 | Tests rôles (`npm test`) + README à jour |
| 9 | Notification email optionnelle (Resend) |
| 10 | Journal d'audit téléchargements / validations |

## Migration Supabase

Exécuter `supabase/migrations/004_mission_validation_admin.sql` dans le SQL Editor.

Attribuer les rôles dans `profiles` :

```sql
update public.profiles set role = 'chef_equipe' where email = 'chef@votredomaine.fr';
update public.profiles set role = 'admin' where email = 'admin@votredomaine.fr';
```

## Mode dev local

- Assistant : `demo@bework.fr`
- Chef : `chef@bework.fr` ou `user+chef@…`
- Admin : `admin@bework.fr`

## Application mobile (Expo)

Dossier `mobile/` — iOS/Android avec connexion Supabase, API Bearer, onglets Demandes / Nouvelle / Admin / Compte.

```bash
npm run mobile:install
cd mobile && cp .env.example .env
npm run mobile
```

## Pistes ultérieures

- Téléchargement livrable natif (expo-file-system + partage)
- Versioning fichiers .docx sur disque (v2, v3)
- Dictée vocale → brief
- Rappel automatique demandes non validées > 7 jours
- Export RGPD par utilisateur
- Publication App Store / Play Store (EAS Build)
