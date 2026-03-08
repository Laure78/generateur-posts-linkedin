# Charte Graphique - Formation Professionnelle B2B

## 🎨 Palette de Couleurs

### Couleur Primaire Institutionnelle
**Bleu Institutionnel Profond**
- **Primaire 900** : `#0F2B46` - Titres principaux, éléments structurants
- **Primaire 700** : `#1A4A6B` - Titres secondaires, navigation
- **Primaire 500** : `#2563A8` - Éléments interactifs, liens
- **Primaire 300** : `#5B8FC7` - États hover légers
- **Primaire 50** : `#F0F5F9` - Fonds très légers, zones de contraste

### Couleur Secondaire
**Bleu-Gris Professionnel**
- **Secondaire 600** : `#4A5568` - Textes secondaires, métadonnées
- **Secondaire 400** : `#718096` - Textes tertiaires, labels
- **Secondaire 200** : `#CBD5E0` - Bordures subtiles
- **Secondaire 100** : `#E2E8F0` - Séparateurs, lignes
- **Secondaire 50** : `#F7FAFC` - Fonds de sections

### Couleur d'Accent (CTA & Actions)
**Bleu Action Professionnel**
- **Accent 600** : `#2C5F8D` - Boutons CTA principaux
- **Accent 500** : `#3B82C1` - Boutons CTA, liens importants
- **Accent 400** : `#5A9FD4` - États hover
- **Accent 50** : `#EBF4FB` - Fonds de highlight légers

### Couleurs Neutres
**Gris Professionnels**
- **Neutre 900** : `#1A202C` - Textes principaux (corps)
- **Neutre 700** : `#4A5568` - Textes secondaires
- **Neutre 500** : `#718096` - Textes tertiaires, placeholders
- **Neutre 300** : `#CBD5E0` - Bordures
- **Neutre 200** : `#E2E8F0` - Bordures légères
- **Neutre 100** : `#EDF2F7` - Fonds de cartes
- **Neutre 50** : `#F7FAFC` - Fonds de pages
- **Blanc** : `#FFFFFF` - Fonds principaux, cartes

### États Fonctionnels
- **Succès** : `#2D8659` (vert discret)
- **Avertissement** : `#C05621` (orange discret)
- **Erreur** : `#C53030` (rouge discret mais professionnel)
- **Info** : `#2C5F8D` (bleu institutionnel)

---

## 📐 Règles d'Utilisation

### Fonds de Pages
- **Fond principal** : `#FFFFFF` (blanc pur)
- **Fond alterné** : `#F7FAFC` (Neutre 50) - Pour créer des zones visuelles
- **Fond de sections** : `#F0F5F9` (Primaire 50) - Pour mettre en valeur
- **Fond de cartes** : `#FFFFFF` avec ombre légère

### Titres et Textes
- **Titre H1** : `#0F2B46` (Primaire 900) - Font-weight: 800
- **Titre H2** : `#1A4A6B` (Primaire 700) - Font-weight: 700
- **Titre H3** : `#2563A8` (Primaire 500) - Font-weight: 600
- **Texte principal** : `#1A202C` (Neutre 900) - Font-weight: 400
- **Texte secondaire** : `#4A5568` (Neutre 700) - Font-weight: 400
- **Texte tertiaire** : `#718096` (Neutre 500) - Font-weight: 400
- **Liens** : `#2563A8` (Primaire 500) - Soulignés au survol

### Boutons Principaux (CTA)
- **Fond** : `#3B82C1` (Accent 500)
- **Texte** : `#FFFFFF` (blanc)
- **Hover** : `#2C5F8D` (Accent 600)
- **Active** : `#1A4A6B` (Primaire 700)
- **Bordures** : Aucune (plein)
- **Ombre** : Légère au hover uniquement

### Boutons Secondaires
- **Fond** : Transparent
- **Texte** : `#2563A8` (Primaire 500)
- **Bordure** : `#CBD5E0` (Neutre 300) - 1px
- **Hover** : Fond `#F0F5F9` (Primaire 50)
- **Active** : Fond `#E2E8F0` (Neutre 200)

### États Hover et Actif
- **Liens** : Soulignement + couleur `#2C5F8D` (Accent 600)
- **Boutons primaires** : Assombrissement de 10-15%
- **Boutons secondaires** : Fond léger `#F0F5F9`
- **Cartes** : Légère élévation (shadow) au hover
- **Transitions** : 200ms ease-in-out (toujours fluides)

---

## 🎭 Ambiance Visuelle

### Mots-clés d'Ambiance
- **Institutionnel** : Autorité, crédibilité, expertise
- **Moderne** : Contemporain sans être trendy
- **Épuré** : Espace blanc, aération, clarté
- **Professionnel** : Sérieux, structuré, méthodique
- **Confiance** : Stable, rassurant, fiable
- **Intemporel** : Design qui ne vieillit pas

### Éléments Visuels à Éviter Absolument
❌ **Dégradés flashy** ou effets de couleur trop vifs
❌ **Animations excessives** ou distractantes
❌ **Couleurs néon** ou très saturées
❌ **Contrastes trop forts** (rouge vif, jaune flashy)
❌ **Effets 3D** ou ombres prononcées
❌ **Icônes trop stylisées** ou décoratives
❌ **Typographies fantaisistes** ou difficiles à lire
❌ **Espacements serrés** ou mise en page dense
❌ **Couleurs multiples** dans un même élément
❌ **Effets de survol** trop marqués ou agressifs

### Éléments Visuels à Privilégier
✅ **Espace blanc généreux** (breathing room)
✅ **Typographie claire** et hiérarchisée
✅ **Bordures subtiles** (1px, couleurs douces)
✅ **Ombres légères** et discrètes
✅ **Icônes minimalistes** et fonctionnelles
✅ **Contraste optimal** pour l'accessibilité
✅ **Alignements rigoureux** et grille structurée
✅ **Couleurs monochromatiques** avec un seul accent
✅ **Transitions douces** et naturelles

---

## 💻 Implémentation Technique

### Variables CSS (globals.css)

```css
:root {
  /* Couleur Primaire Institutionnelle */
  --primary-900: #0F2B46;
  --primary-700: #1A4A6B;
  --primary-500: #2563A8;
  --primary-300: #5B8FC7;
  --primary-50: #F0F5F9;

  /* Couleur Secondaire */
  --secondary-600: #4A5568;
  --secondary-400: #718096;
  --secondary-200: #CBD5E0;
  --secondary-100: #E2E8F0;
  --secondary-50: #F7FAFC;

  /* Couleur d'Accent */
  --accent-600: #2C5F8D;
  --accent-500: #3B82C1;
  --accent-400: #5A9FD4;
  --accent-50: #EBF4FB;

  /* Couleurs Neutres */
  --neutral-900: #1A202C;
  --neutral-700: #4A5568;
  --neutral-500: #718096;
  --neutral-300: #CBD5E0;
  --neutral-200: #E2E8F0;
  --neutral-100: #EDF2F7;
  --neutral-50: #F7FAFC;
  --white: #FFFFFF;

  /* États Fonctionnels */
  --success: #2D8659;
  --warning: #C05621;
  --error: #C53030;
  --info: #2C5F8D;
}
```

### Configuration Tailwind (extension dans tailwind.config)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F5F9',
          300: '#5B8FC7',
          500: '#2563A8',
          700: '#1A4A6B',
          900: '#0F2B46',
        },
        secondary: {
          50: '#F7FAFC',
          100: '#E2E8F0',
          200: '#CBD5E0',
          400: '#718096',
          600: '#4A5568',
        },
        accent: {
          50: '#EBF4FB',
          400: '#5A9FD4',
          500: '#3B82C1',
          600: '#2C5F8D',
        },
        neutral: {
          50: '#F7FAFC',
          100: '#EDF2F7',
          200: '#E2E8F0',
          300: '#CBD5E0',
          500: '#718096',
          700: '#4A5568',
          900: '#1A202C',
        },
      },
    },
  },
}
```

### Classes Tailwind Recommandées

**Fonds :**
- `bg-white` - Fond principal
- `bg-neutral-50` - Fond alterné
- `bg-primary-50` - Fond de section
- `bg-accent-50` - Fond de highlight

**Textes :**
- `text-primary-900` - Titre H1
- `text-primary-700` - Titre H2
- `text-primary-500` - Titre H3, liens
- `text-neutral-900` - Texte principal
- `text-neutral-700` - Texte secondaire
- `text-neutral-500` - Texte tertiaire

**Boutons :**
- `bg-accent-500 hover:bg-accent-600 text-white` - CTA principal
- `border border-neutral-300 text-primary-500 hover:bg-primary-50` - Bouton secondaire

**Bordures :**
- `border-neutral-200` - Bordures légères
- `border-neutral-300` - Bordures standard
- `border-primary-300` - Bordures accent

---

## 📊 Exemples d'Application

### Header/Navigation
- Fond : `bg-white`
- Texte : `text-neutral-900`
- Liens : `text-primary-500 hover:text-accent-600`
- Bordure : `border-b border-neutral-200`

### Cartes de Formation
- Fond : `bg-white`
- Bordure : `border border-neutral-200`
- Ombre : `shadow-sm`
- Titre : `text-primary-900`
- Texte : `text-neutral-700`
- CTA : `bg-accent-500 hover:bg-accent-600`

### Footer
- Fond : `bg-primary-900`
- Texte : `text-white` / `text-primary-300`
- Liens : `text-primary-300 hover:text-white`

### Sections Alternées
- Section 1 : `bg-white`
- Section 2 : `bg-neutral-50`
- Section 3 : `bg-primary-50` (pour mise en valeur)

---

## ✅ Checklist de Conformité

- [ ] Utilisation exclusive de la palette définie
- [ ] Contraste minimum 4.5:1 pour les textes (WCAG AA)
- [ ] Espace blanc généreux (minimum 40px entre sections)
- [ ] Typographie hiérarchisée clairement
- [ ] Transitions fluides (200ms)
- [ ] Pas d'effets visuels distractants
- [ ] Design responsive et mobile-first
- [ ] Cohérence sur toutes les pages

---

**Date de création** : 2025
**Version** : 1.0
**Statut** : Production
