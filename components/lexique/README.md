# Lexique BTP — composant réutilisable

Application d'apprentissage autonome : dictionnaire, flashcards et quiz sur le vocabulaire BTP / marchés publics.

## Fichiers

| Fichier | Rôle |
|---------|------|
| `data/lexique-btp.ts` | Données typées (~110 termes, 22 familles) + helpers `normalize`, `filtrerTermes`, `melanger` |
| `lib/lexique-favoris.ts` | Persistance des favoris (`localStorage`) |
| `components/lexique/LexiqueApp.tsx` | Conteneur avec onglets et en-tête OFC |
| `components/lexique/Dictionnaire.tsx` | Recherche, filtres, accordéon, favoris |
| `components/lexique/Flashcards.tsx` | Révision par familles ou favoris |
| `components/lexique/Quiz.tsx` | QCM 10 questions |
| `app/lexique/page.tsx` | Route `/lexique` (police Poppins) |

## Intégration dans un autre projet Next.js

1. Copier les dossiers `data/`, `lib/lexique-favoris.ts` et `components/lexique/`.
2. Vérifier que `lucide-react` est installé (ou remplacer les icônes).
3. Monter le composant où vous voulez :

```tsx
import { LexiqueApp } from '@/components/lexique/LexiqueApp';

export default function MaPage() {
  return <LexiqueApp />;
}
```

4. Ou créer une route dédiée en important `LexiqueApp` dans `app/lexique/page.tsx`.

## Charte graphique

- Bleu principal : `#377CF3`
- Fonds : blanc `#FFFFFF`, cartes `#F2F2F2`
- Quiz : vert `#2BB673` (correct), orange `#F5A623` (à revoir)
- Police recommandée : Poppins (voir `app/lexique/page.tsx`)

## localStorage

- Clé `ofc-lexique-favoris` : liste des IDs de termes favoris
