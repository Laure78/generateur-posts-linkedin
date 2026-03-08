'use client';

import { useState } from 'react';
import Link from 'next/link';

type PostCategory = 'tous' | 'instructif' | 'storytelling' | 'conseil' | 'ressources' | 'promotionnel';

const INSPIRATION_POSTS = [
  {
    id: '1',
    title: 'L\'accroche question qui crée le débat',
    category: 'instructif' as const,
    excerpt: 'Et vous, combien d\'heures perdez-vous chaque semaine sur vos devis ? La question ouvre le débat et pousse au commentaire.',
    format: 'Question + valeur',
    metrics: 'Taux de commentaires élevé',
    fullText: 'Et vous, combien d\'heures perdez-vous chaque semaine sur vos devis ?\n\nJ\'ai posé la question à 50 artisans. La moyenne : 5h.\n\n5 heures qu\'on pourrait passer sur le chantier.\n\nVoici ce qui a changé pour ceux qui ont testé l\'IA : devis en 10 min au lieu de 2h.',
  },
  {
    id: '2',
    title: 'Le chiffre qui accroche',
    category: 'instructif' as const,
    excerpt: '3 erreurs. 5 étapes. 7 outils. Les listes chiffrées performent car elles promettent une lecture rapide et actionnable.',
    format: 'Liste chiffrée',
    metrics: 'Fort taux de clics',
    fullText: '3 erreurs que font 90% des artisans sur leurs devis.\n\n1. Trop de détails techniques (le client s\'y perd)\n2. Pas de variante "option" (opportunité manquée)\n3. Relance manuelle (le temps file)\n\nL\'IA ne fait pas tout. Mais elle corrige ces 3 points en 2 clics.',
  },
  {
    id: '3',
    title: 'L\'anecdote chantier',
    category: 'storytelling' as const,
    excerpt: 'Une histoire vécue crée la connexion. Le lecteur se projette et retient le message.',
    format: 'Storytelling',
    metrics: 'Engagement émotionnel',
    fullText: 'Mardi 8h. Un artisan m\'appelle : "J\'ai passé 3h sur un devis hier soir. Le client a choisi le concurrent."\n\nÇa m\'a rappelé pourquoi j\'ai créé mes premiers prompts IA.\n\nPas pour remplacer le métier. Pour le recentrer sur ce qui compte : le chantier, le client, la qualité.',
  },
  {
    id: '4',
    title: 'Le conseil percutant',
    category: 'conseil' as const,
    excerpt: 'Une affirmation forte + une preuve ou un exemple. Direct, mémorable.',
    format: 'Conseil punch',
    metrics: 'Partages élevés',
    fullText: 'Arrêtez d\'écrire vos devis à la main.\n\nJe ne parle pas de tout déléguer à l\'IA. Je parle de gagner 2h par devis.\n\nCeux qui ont testé : même qualité, moitié moins de temps. La différence ? Un bon prompt + une relecture humaine.',
  },
  {
    id: '5',
    title: 'Les ressources utiles',
    category: 'ressources' as const,
    excerpt: 'Partager une liste d\'outils ou de ressources positionne comme expert et génère des sauvegardes.',
    format: 'Ressources',
    metrics: 'Sauvegardes ++',
    fullText: '5 outils IA que j\'utilise chaque semaine pour mes formations BTP :\n\n1. ChatGPT — devis, emails, CR\n2. Canva — visuels chantier\n3. Notion — base de connaissances\n4. ...\n\nLe 5e ? Je le garde pour la formation 😉\n\nQuel outil vous intrigue le plus ?',
  },
  {
    id: '6',
    title: 'La transformation avant/après',
    category: 'instructif' as const,
    excerpt: 'Montrer le passage d\'un état à un autre crée l\'aspiration et la crédibilité.',
    format: 'Avant / Après',
    metrics: 'Conversion élevée',
    fullText: 'Avant l\'IA : 2h pour un devis, 1h pour les relances, 30 min pour le CR.\n\nAprès : 15 min, 5 min, 5 min.\n\nCe n\'est pas de la magie. C\'est des trames + des prompts adaptés au BTP.\n\nFormation la semaine prochaine. 3 places restantes.',
  },
  {
    id: '7',
    title: 'Le post promotionnel soft',
    category: 'promotionnel' as const,
    excerpt: 'Valeur d\'abord, offre à la fin. 80% contenu utile, 20% CTA.',
    format: 'Promo soft',
    metrics: 'Qualité des leads',
    fullText: 'J\'ai formé 1500 artisans à l\'IA cette année.\n\nLe point commun de ceux qui réussissent ? Ils commencent petit : un type de document, un process, une habitude.\n\nPas tout changer d\'un coup.\n\nProchaine session : 12 places. Lien en bio.',
  },
  {
    id: '8',
    title: 'La leçon apprise',
    category: 'storytelling' as const,
    excerpt: 'Vulnérabilité + apprentissage = authenticité. Très apprécié sur LinkedIn.',
    format: 'Leçon vécue',
    metrics: 'Confiance',
    fullText: 'J\'ai cru que l\'IA allait tout résoudre.\n\nErreur. Sans méthode, c\'est le bazar.\n\nCe qui marche : 1 outil, 1 cas d\'usage, 1 prompt qu\'on affine. Puis on scale.\n\nLa formation que je propose aujourd\'hui, c\'est exactement ce parcours.',
  },
  {
    id: '9',
    title: 'Le système 60 min LinkedIn (4 mouvements)',
    category: 'conseil' as const,
    excerpt: 'Structure : accroche + 4 mouvements + PS + CTA repartage + signature. Inspiré du LinkedIn Content System.',
    format: 'Système / Méthode',
    metrics: 'Engagement, conversion',
    fullText: `Comment utiliser 60 minutes sur LinkedIn pour que ça compte vraiment.

Parce qu'en 2026, le jeu ne se joue plus aux impressions.
C'est une visibilité structurée.
Une portée qui convertit.
Des conversations qui se transforment en clients.

Ce que la plupart des gens font : ils scrollent 60 minutes, ils likent deux trois posts, et ils repartent les mains vides.

À la place, découpe en 4 mouvements :

1- Chauffe le feed : commente 5 posts de ta cible avant de publier. L'algo te voit. Les gens te voient.

2- Lance avec structure : ton premier commentaire sous ton propre post, tu le poses dans la minute. Ça booste la portée et ça donne le ton.

3- Engage vraiment : réponds à chaque commentaire comme si c'était un café. Pas "Merci !", une vraie phrase. C'est là que les relations se construisent.

4- Relance tes DM : prends 10 minutes pour écrire à 3 personnes qui ont interagi cette semaine. Pas un pitch.

Une heure bien utilisée vaut mieux que 5 posts balancés dans le vide.

Le système complet est dans le visuel. Prends-le. Adapte-le. Applique-le.

PS : Si tu veux comprendre LinkedIn et attirer plus de clients : [lien]

♻️ Si ce post t'aide, repartage-le

👋 Laure Formatrice IA BTP
J'aide les artisans et TPE du BTP à :
→ Gagner 5h/semaine sur les devis et l'admin
→ Utiliser l'IA sans jargon technique
→ Transformer leur expertise en gains mesurés`,
  },
  {
    id: '10',
    title: 'Référence : LinkedIn Content System (Hana | Zee Scale)',
    category: 'conseil' as const,
    excerpt: 'Version originale du PDF — Structure 4 mouvements, PS1/PS2, CTA repartage. Source : Le LinkedIn Content System.',
    format: 'Référence / Modèle original',
    metrics: 'Structure type',
    fullText: `Comment utiliser 60 minutes sur LinkedIn pour que ça compte vraiment.

Parce qu'en 2026, le jeu ne se joue plus aux impressions.
C'est une visibilité structurée.
Une portée qui convertit.
Des conversations qui se transforment en clients.

Ce que la plupart des gens font : ils scrollent 60 minutes, ils likent deux trois posts, et ils repartent les mains vides.

À la place, découpe en 4 mouvements :

1- Chauffe le feed : commente 5 posts de ta cible avant de publier. L'algo te voit. Les gens te voient.

2- Lance avec structure : ton premier commentaire sous ton propre post, tu le poses dans la minute. Ça booste la portée et ça donne le ton.

3- Engage vraiment : réponds à chaque commentaire comme si c'était un café. Pas "Merci !", une vraie phrase. C'est là que les relations se construisent.

4- Relance tes DM : prends 10 minutes pour écrire à 3 personnes qui ont interagi cette semaine. Pas un pitch.

Une heure bien utilisée vaut mieux que 5 posts balancés dans le vide.

Le système complet est dans le visuel. Prends-le. Adapte-le. Applique-le.

PS 1: Commente VIRAL pour recevoir les 5 agents Claude à intégrer

PS 2: Si tu veux comprendre LinkedIn et attirer plus de clients : https://lnkd.in/d5jkssDv

♻️ Si ce post t'aide, repartage-le

👋 Moi c'est Hana | Zee Scale
J'aide les coachs, freelances et salariés en transition à :
→ Créer des offres digitales qui se vendent vraiment
→ Attirer leurs clients idéaux sur LinkedIn et Instagram
→ Transformer leur expertise en machine à cash`,
  },
];

const CATEGORY_LABELS: Record<PostCategory, string> = {
  tous: 'Tous',
  instructif: 'Instructif',
  storytelling: 'Storytelling',
  conseil: 'Conseil',
  ressources: 'Ressources',
  promotionnel: 'Promotionnel',
};

const CARD_COLORS = [
  'bg-amber-50 border-amber-200',
  'bg-emerald-50 border-emerald-200',
  'bg-violet-50 border-violet-200',
  'bg-sky-50 border-sky-200',
  'bg-rose-50 border-rose-200',
  'bg-slate-100 border-slate-200',
  'bg-orange-50 border-orange-200',
  'bg-teal-50 border-teal-200',
];

export default function InspirationsPage() {
  const [filter, setFilter] = useState<PostCategory>('tous');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === 'tous'
    ? INSPIRATION_POSTS
    : INSPIRATION_POSTS.filter((p) => p.category === filter);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">Inspirations</h1>
        <p className="mt-1 text-neutral-600">
          Les meilleurs posts LinkedIn pour t&apos;en inspirer. Formats qui performent, exemples BTP & IA.
        </p>
      </div>

      {/* Filtres */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(CATEGORY_LABELS) as PostCategory[]).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              filter === cat
                ? 'bg-violet-600 text-white'
                : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Grille de posts */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, i) => (
          <div
            key={post.id}
            className={`relative rounded-2xl border p-5 transition-shadow hover:shadow-md ${CARD_COLORS[i % CARD_COLORS.length]}`}
          >
            <button
              type="button"
              className="absolute right-3 top-3 rounded-lg p-1.5 text-neutral-400 hover:bg-white/50 hover:text-rose-500"
              title="Favori"
            >
              <span className="text-lg">♡</span>
            </button>

            <h3 className="pr-8 font-semibold text-neutral-900">{post.title}</h3>
            <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{post.excerpt}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-lg bg-white/70 px-2 py-0.5 text-xs font-medium text-neutral-600">
                {post.format}
              </span>
              <span className="rounded-lg bg-white/70 px-2 py-0.5 text-xs text-neutral-500">
                {post.metrics}
              </span>
            </div>

            {expandedId === post.id ? (
              <div className="mt-4 rounded-xl bg-white/60 p-3 text-sm text-neutral-700 whitespace-pre-wrap">
                {post.fullText}
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                {expandedId === post.id ? 'Réduire' : 'Voir le post'}
              </button>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(post.fullText)}
                className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Copier
              </button>
              <Link
                href={`/outil/generateur?subject=${encodeURIComponent(post.fullText.split('\n')[0])}`}
                className="inline-flex items-center gap-1 rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700"
              >
                Utiliser
                <span className="text-xs">↗</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-neutral-500">
        Ces exemples sont adaptés au secteur BTP et à la formation IA. Utilise-les comme base pour tes propres posts.
      </p>
    </div>
  );
}
