# Améliorations et Optimisations du Site

## 🔍 SEO et Métadonnées

### 1. ✅ Metadata à Personnaliser (URGENT)

**Fichier** : `app/layout.tsx`

Le metadata est encore au défaut "Create Next App". À remplacer par :

```typescript
export const metadata: Metadata = {
  title: "Formation IA BTP - OFC Création d'Entreprise",
  description: "Formations professionnelles en Intelligence Artificielle pour le secteur BTP. 70% de pratique, certifié Qualiopi. Formations inter et intra-entreprises.",
  keywords: "formation IA BTP, intelligence artificielle BTP, formation professionnelle, ChatGPT BTP, Qualiopi",
  authors: [{ name: "Laure OLIVIÉ" }],
  openGraph: {
    title: "Formation IA BTP - OFC Création d'Entreprise",
    description: "Formations professionnelles en Intelligence Artificielle pour le secteur BTP",
    url: "https://laureolivie.fr",
    siteName: "Formation IA BTP",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formation IA BTP",
    description: "Formations professionnelles en Intelligence Artificielle pour le secteur BTP",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 2. 📄 Robots.txt

**À créer** : `public/robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://laureolivie.fr/sitemap.xml
```

### 3. 🗺️ Sitemap.xml

**À créer** : `app/sitemap.ts` (Next.js 13+ génère automatiquement)

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://laureolivie.fr'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/formations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cgv`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // Ajouter les formations dynamiques
    ...['btp-01', 'btp-02', 'btp-03', 'btp-04', 'btp-05', 'btp-06'].map(slug => ({
      url: `${baseUrl}/formations/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ]
}
```

### 4. 🏷️ Schema.org (Données Structurées)

**À ajouter** : Dans `app/layout.tsx` ou via un composant

```typescript
// JSON-LD pour Organisation
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "OFC Création d'Entreprise",
  "url": "https://laureolivie.fr",
  "logo": "https://laureolivie.fr/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "6 Rue Henri Dunant",
    "addressLocality": "Guyancourt",
    "postalCode": "78280",
    "addressCountry": "FR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+33-6-95-66-18-18",
    "contactType": "customer service",
    "email": "laureolivie@yahoo.fr"
  }
}
```

---

## 🎨 Design et UX

### 5. 📱 Favicon Personnalisé

**À créer** : Remplacer `app/favicon.ico` par votre logo

**Recommandation** : Créer plusieurs tailles (16x16, 32x32, 192x192, 512x512)

### 6. 🚫 Page 404 Personnalisée

**À créer** : `app/not-found.tsx`

```typescript
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAFBFC] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-black text-primary-900 mb-4">404</h1>
        <p className="text-xl text-primary-700 mb-8">Page introuvable</p>
        <Link href="/" className="inline-block rounded-2xl bg-accent-500 px-6 py-3 text-white font-extrabold hover:bg-accent-600 transition-colors">
          Retour à l'accueil
        </Link>
      </div>
    </main>
  )
}
```

### 7. ⚡ Optimisations Performance

- **Images** : Utiliser `next/image` pour toutes les images
- **Lazy loading** : Pour les sections non critiques
- **Fonts** : Optimiser le chargement des polices (déjà fait avec Geist)

---

## 📊 Analytics et Tracking

### 8. 📈 Google Analytics / Plausible

**À ajouter** : Script de tracking (optionnel mais recommandé)

```typescript
// app/components/Analytics.tsx
'use client'
import Script from 'next/script'

export default function Analytics() {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>
    </>
  )
}
```

---

## 🎯 Fonctionnalités Manquantes

### 9. ❓ Page FAQ

**À créer** : `app/faq/page.tsx`

Questions fréquentes sur :
- Les formations
- Le financement
- Les modalités
- Les prérequis

### 10. 💬 Témoignages / Avis Clients

**À ajouter** : Section témoignages sur la page d'accueil

Améliore la crédibilité et la conversion.

### 11. 📧 Newsletter / Mailing List

**À ajouter** : Formulaire d'inscription newsletter (optionnel)

Intégration possible avec :
- Mailchimp
- Sendinblue
- Supabase (créer une table `newsletter`)

### 12. 🔍 Recherche de Formations

**À ajouter** : Barre de recherche fonctionnelle sur `/formations`

Filtrage par :
- Niveau (Débutant, Intermédiaire, Avancé)
- Durée
- Public cible

---

## 🔒 Sécurité et Conformité

### 13. ✅ Cookies / Consentement RGPD

**À ajouter** : Bannière de consentement cookies (si analytics)

**Recommandation** : Utiliser une solution comme `react-cookie-consent` ou créer un composant custom.

### 14. 🔐 HTTPS et Headers Sécurité

**Vérifier** : Headers de sécurité en production

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

---

## 📱 Accessibilité

### 15. ♿ Améliorations Accessibilité

- **Alt text** : Vérifier que toutes les images ont des alt text
- **ARIA labels** : Ajouter sur les boutons iconiques
- **Contraste** : Vérifier le ratio de contraste (WCAG AA minimum)
- **Navigation clavier** : Tester la navigation au clavier
- **Focus visible** : S'assurer que les éléments focusables sont visibles

---

## 🚀 Optimisations Techniques

### 16. 📦 Bundle Size

- Vérifier les dépendances inutiles
- Utiliser dynamic imports pour les composants lourds

### 17. 🖼️ Images Optimisées

- Convertir les SVG en composants React si possible
- Utiliser WebP pour les images
- Implémenter le lazy loading

### 18. 🔄 Cache et Performance

- Configurer le cache des assets statiques
- Optimiser les fonts (déjà fait)

---

## 📝 Contenu

### 19. 📄 Page "À propos" / "Qui sommes-nous"

**À créer** : `app/a-propos/page.tsx`

Présentation détaillée :
- Laure OLIVIÉ
- L'organisme OFC
- L'approche pédagogique
- Les valeurs

### 20. 📰 Blog / Actualités (Optionnel)

**À créer** : `app/blog/page.tsx` et `app/blog/[slug]/page.tsx`

Pour :
- Articles sur l'IA et le BTP
- Témoignages clients
- Actualités formations
- Conseils pratiques

---

## ✅ Priorités

### 🔴 Urgent
1. **Metadata personnalisée** (SEO)
2. **Robots.txt et Sitemap** (SEO)
3. **Page 404** (UX)

### 🟡 Important
4. **Favicon personnalisé** (Branding)
5. **Schema.org** (SEO)
6. **Page FAQ** (Conversion)

### 🟢 Optionnel
7. **Analytics** (Tracking)
8. **Newsletter** (Marketing)
9. **Témoignages** (Crédibilité)
10. **Blog** (Content Marketing)

---

**Date de création** : 2025
**Version** : 1.0
