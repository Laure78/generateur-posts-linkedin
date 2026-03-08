'use client';

import { useState } from 'react';

type ListTab = 'createurs' | 'amis' | 'magicpost' | 'prospects' | 'seo';

const TABS: { id: ListTab; label: string }[] = [
  { id: 'createurs', label: 'Créateurs' },
  { id: 'amis', label: 'Amis' },
  { id: 'magicpost', label: 'MagicPost' },
  { id: 'prospects', label: 'Prospects' },
  { id: 'seo', label: 'SEO' },
];

const MOCK_POSTS = [
  {
    id: '1',
    name: 'Arthur Auboeuf',
    avatar: 'AA',
    time: '2h',
    followers: '202k',
    excerpt: 'BDO France investit dans la formation...',
    media: 'BDO',
    likes: null,
    comments: null,
  },
  {
    id: '2',
    name: 'Caroline Mignaux',
    avatar: 'CM',
    time: '1j',
    followers: '163k',
    excerpt: 'Le contrôle technique en 5 questions...',
    media: 'car',
    likes: null,
    comments: null,
  },
  {
    id: '3',
    name: 'Hugo Gedio',
    avatar: 'HG',
    time: '2j',
    followers: '43k',
    excerpt: 'Comment l\'IA transforme la formation en entreprise...',
    media: 'cat',
    likes: 16,
    comments: 7,
  },
];

export default function EngagementPage() {
  const [activeTab, setActiveTab] = useState<ListTab>('createurs');

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Engagement</h1>
        <p className="mt-1 text-neutral-600">
          Engage avec les posts LinkedIn des personnes que tu suis.
        </p>
      </div>

      {/* Upgrade banner */}
      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
        <p className="text-neutral-700">
          Ajoute les profils que tu veux engager au quotidien.
        </p>
        <p className="mt-2 text-sm text-neutral-600">
          Passe au plan Créateur ou supérieur pour débloquer l&apos;engagement LinkedIn.
        </p>
        <button
          type="button"
          className="mt-4 rounded-xl bg-[#377CF3] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#2d6ad4]"
        >
          Mettre à niveau mon plan
        </button>
      </div>

      {/* Tabs + Daily goals */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-wrap gap-1 rounded-xl bg-neutral-100 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            type="button"
            className="rounded-lg px-4 py-2 text-sm font-medium text-[#377CF3] hover:bg-[#377CF3]/5"
          >
            Ajouter une liste +
          </button>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-700">Objectifs du jour</span>
            <span className="rounded p-1 text-neutral-400 hover:bg-neutral-100">⚙</span>
          </div>
          <div className="mt-2 flex gap-4">
            <div>
              <p className="text-2xl font-bold text-neutral-900">6/10</p>
              <p className="text-xs text-neutral-500">Likes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">3/5</p>
              <p className="text-xs text-neutral-500">Commentaires</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-neutral-800">Derniers posts des profils</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">Mis à jour il y a 13 min</span>
            <button type="button" className="rounded p-1.5 text-neutral-400 hover:bg-neutral-100">↻</button>
            <button
              type="button"
              className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Modifier la liste
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {MOCK_POSTS.map((post) => (
            <div
              key={post.id}
              className="flex flex-wrap gap-4 rounded-xl border border-neutral-200 bg-neutral-50/50 p-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#377CF3]/10 text-[#377CF3] font-bold">
                {post.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-neutral-900">{post.name}</span>
                  <span className="text-neutral-500">· {post.time}</span>
                  <span className="text-neutral-400">{post.followers} abonnés</span>
                </div>
                <p className="mt-1 text-sm text-neutral-700">
                  {post.excerpt} <span className="text-[#377CF3]">... Voir plus</span>
                </p>
                <div className="mt-2 flex h-16 w-24 items-center justify-center rounded-lg bg-neutral-200 text-xs text-neutral-500">
                  {post.media}
                </div>
                {(post.likes != null || post.comments != null) && (
                  <p className="mt-2 text-xs text-neutral-500">
                    👍 {post.likes} · 💬 {post.comments} commentaires
                  </p>
                )}
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    J&apos;aime
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    Commenter
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-neutral-200 bg-white p-1.5 text-neutral-500 hover:bg-neutral-50"
                  >
                    ↗
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
