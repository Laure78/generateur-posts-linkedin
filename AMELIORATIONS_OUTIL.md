# Améliorations — Outil Créateur LinkedIn

## ✅ Déjà implémenté

### Base de connaissance
- **Page** : `/outil/base-connaissance` (menu GÉRER)
- **Références / URLs** : ajoute des liens (articles, posts LinkedIn) et colle le contenu pertinent
- **Anciens posts** : colle tes posts publiés pour que l’IA s’aligne sur ton style
- Données stockées en `localStorage` et injectées automatiquement dans les prompts

### Support Claude (Anthropic)
- **Choix du modèle** : Paramètres du Générateur → Modèle IA → OpenAI (GPT) ou Claude
- **Configuration** : ajoute `ANTHROPIC_API_KEY` dans `.env.local` (voir `.env.example`)
- Toutes les API (posts, accroches, idées) supportent les deux fournisseurs

---

## 🔮 Améliorations possibles

### Court terme
1. **Import de fichier** (PDF, Word) dans le Générateur — extraction de texte pour enrichir le contexte
2. **Synchronisation Calendrier ↔ Mes posts** — statut planifié mis à jour automatiquement
3. **Sauvegarde des posts générés en base** (Supabase) — historique, favoris, planification
4. **Export des métriques** (CSV/PDF) — pour le reporting

### Moyen terme
5. **Récupération automatique d’URL** — API pour extraire le contenu d’une page (avec limites CORS)
6. **Import LinkedIn** — connexion OAuth pour récupérer tes posts automatiquement
7. **Multi-langues** — génération en anglais, espagnol, etc.
8. **Templates de posts** — modèles réutilisables par catégorie

### Long terme
9. **RAG avancé** — embeddings + recherche sémantique sur ta base de connaissance
10. **Planification réelle** — envoi automatique vers LinkedIn (API ou Zapier)

---

**Date** : janvier 2025
