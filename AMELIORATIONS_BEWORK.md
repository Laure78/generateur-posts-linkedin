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

## Livré — UX assistants (2026-06)

| # | Fonctionnalité |
|---|----------------|
| 11 | Recherche, favoris et récents dans le sélecteur d’assistant |
| 12 | Tableau de bord en accordéon par thème checklist |
| 13 | Briefs guidés par type (web + mobile) |
| 14 | Checklists avant envoi par famille (CR, marchés, financier, GPA, DC4…) |
| 15 | File validation chef + rappel > 7 j (`POST /api/admin/remind-pending`, Resend optionnel) |
| 16 | Skills IA : DCE/DPGF, DC4, DOE, levées de réserves |
| 17 | Dictée vocale du brief (web, Chrome/Edge/Safari) |

Rappel chef (> 7 j) : mêmes variables que les notifs — `RESEND_API_KEY` + `BEWORK_NOTIFY_EMAIL` (+ `BEWORK_EMAIL_FROM`).

## UX plateforme (2026-06)

| # | Amélioration |
|---|----------------|
| 18 | Tableau de bord : demandes d’abord, catalogue assistants replié |
| 19 | Lanceur global + raccourcis favoris/récents |
| 20 | Compteurs « en cours » / « à valider » cliquables |
| 21 | Brouillon auto-sauvegardé (nouvelle demande) |
| 22 | Parcours raccourci : Entrée / double-clic → étape 2 |
| 23 | Options IA repliées par défaut, barre d’envoi sticky |
| 24 | Filtre recherche menu latéral |

## Pistes ultérieures

- Téléchargement livrable natif (expo-file-system + partage)
- Dictée vocale native mobile (expo-speech / Voice)
- Versioning fichiers .docx sur disque (v2, v3)
- Dictée vocale → brief
- Rappel automatique demandes non validées > 7 jours
- Export RGPD par utilisateur
- Publication App Store / Play Store (EAS Build)
