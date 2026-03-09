'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Zap, Lightbulb, LayoutGrid, BarChart2, PenLine } from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';

const QUICK_ACTIONS = [
  { href: '/outil/ghostwriter', label: 'Ghostwriter', Icon: PenLine, desc: 'Assistant rédactionnel avec base de connaissance' },
  { href: '/outil/generateur', label: 'Générer un post', Icon: Sparkles, desc: 'Crée un post LinkedIn à partir d\'un sujet' },
  { href: '/outil/contenu-avance', label: 'Générer des hooks', Icon: Zap, desc: 'Accroches percutantes pour tes posts' },
  { href: '/outil/idees', label: 'Générateur d\'idées', Icon: Lightbulb, desc: 'Trouve des sujets à traiter' },
];

const STORAGE_POSTS = 'createur_posts';

type PostPreview = { id: string; title: string; date: string };

function loadRecentPosts(): PostPreview[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_POSTS);
    if (!raw) return [];
    const posts = JSON.parse(raw) as Array<{ id: string; title?: string; date?: string }>;
    return (Array.isArray(posts) ? posts : [])
      .filter((p) => p?.id)
      .slice(0, 5)
      .map((p) => ({
        id: p.id,
        title: p.title || 'Sans titre',
        date: p.date || '',
      }));
  } catch {
    return [];
  }
}

export default function OutilPage() {
  const [recentPosts, setRecentPosts] = useState<PostPreview[]>([]);

  useEffect(() => {
    setRecentPosts(loadRecentPosts());
  }, []);

  return (
    <div className="space-y-10">
      <SectionHeader
        title="Tableau de bord"
        description="Bienvenue. Choisis une action rapide ou explore les modules."
      />

      {/* Quick actions */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-800">Actions rapides</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((item) => {
            const Icon = item.Icon;
            return (
              <Link key={item.href} href={item.href}>
                <Card hover padding="lg" className="h-full transition-transform hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: 'rgba(55, 124, 243, 0.1)' }}
                    >
                      <Icon size={24} style={{ color: '#377CF3' }} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-neutral-800">{item.label}</h3>
                      <p className="mt-1 text-sm text-neutral-500">{item.desc}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent drafts */}
        <section>
          <Card>
            <CardHeader
              title="Brouillons récents"
              description="Tes 5 derniers posts"
              action={
                recentPosts.length > 0 && (
                  <Link
                    href="/outil/mes-posts"
                    className="text-sm font-medium text-[#377CF3] hover:underline"
                  >
                    Voir tout
                  </Link>
                )
              }
            />
            {recentPosts.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 py-8 text-center">
                <LayoutGrid size={32} className="mx-auto text-neutral-300" />
                <p className="mt-2 text-sm text-neutral-500">Aucun brouillon</p>
                <Link href="/outil/generateur" className="mt-3 inline-block">
                  <Button variant="primary" size="sm">
                    Créer un post
                  </Button>
                </Link>
              </div>
            ) : (
              <ul className="space-y-2">
                {recentPosts.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/outil/mes-posts`}
                      className="block rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    >
                      <span className="line-clamp-1 font-medium">{p.title}</span>
                      {p.date && <span className="text-xs text-neutral-400">{p.date}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>

        {/* Metrics snapshot */}
        <section>
          <Card>
            <CardHeader
              title="Aperçu des métriques"
              description="Tes performances LinkedIn"
              action={
                <Link
                  href="/outil/metriques"
                  className="text-sm font-medium text-[#377CF3] hover:underline"
                >
                  Détails
                </Link>
              }
            />
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-neutral-50 p-4 text-center">
                <p className="text-2xl font-bold text-neutral-800">—</p>
                <p className="mt-1 text-xs text-neutral-500">Posts</p>
              </div>
              <div className="rounded-xl bg-neutral-50 p-4 text-center">
                <p className="text-2xl font-bold text-neutral-800">—</p>
                <p className="mt-1 text-xs text-neutral-500">Impressions</p>
              </div>
              <div className="rounded-xl bg-neutral-50 p-4 text-center">
                <p className="text-2xl font-bold text-neutral-800">—</p>
                <p className="mt-1 text-xs text-neutral-500">Engagement</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-neutral-400">
              Connecte ton compte LinkedIn pour voir tes métriques.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
