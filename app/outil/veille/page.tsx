'use client';

import { useState } from 'react';
import Link from 'next/link';

type TabId = 'newsletters' | 'youtube' | 'linkedin' | 'shorts';

const NEWSLETTERS = {
  fr: [
    {
      name: 'IA pour tous',
      author: 'Formation & vulgarisation IA',
      url: 'https://ia-pour-tous.substack.com',
      desc: 'Actualités et tutoriels IA en français',
    },
    {
      name: 'Le Brief IA',
      author: 'Veille IA francophone',
      url: 'https://substack.com/discover/fr/ai',
      desc: 'Sélection hebdo des tendances IA',
    },
    {
      name: 'Prompteur Pro',
      author: 'Formateurs & consultants',
      url: 'https://substack.com/discover/fr',
      desc: 'Prompts, cas d\'usage, productivité',
    },
    {
      name: 'Transformation Numérique',
      author: 'Consultants & formateurs',
      url: 'https://substack.com/discover',
      desc: 'IA en entreprise, adoption, formation',
    },
  ],
  us: [
    {
      name: 'The Batch',
      author: 'Andrew Ng (DeepLearning.AI)',
      url: 'https://www.deeplearning.ai/the-batch/',
      desc: 'Actualités IA, recherche, tendances',
    },
    {
      name: 'The Rundown AI',
      author: 'Rowan Cheung',
      url: 'https://www.therundown.ai/',
      desc: 'Résumé quotidien des nouveautés IA',
    },
    {
      name: 'AI Explained',
      author: 'Vidéos + newsletter',
      url: 'https://www.aiexplained.com/',
      desc: 'Analyses accessibles, tendances',
    },
    {
      name: 'Ben\'s Bites',
      author: 'Ben Tossell',
      url: 'https://www.bensbites.beehiiv.com/',
      desc: 'Newsletter IA quotidienne',
    },
    {
      name: 'The AI Edge',
      author: 'Nathan Latka',
      url: 'https://www.theaiedge.io/',
      desc: 'Outils, startups, applications IA',
    },
  ],
};

const YOUTUBE = {
  fr: [
    {
      name: 'Hugging Face',
      url: 'https://www.youtube.com/@HuggingFace',
      desc: 'Modèles open source, LLMs, tutoriels',
    },
    {
      name: 'Underscore_',
      url: 'https://www.youtube.com/@Underscore_',
      desc: 'Tech, IA, développement',
    },
    {
      name: 'Grafikart',
      url: 'https://www.youtube.com/@grafikart',
      desc: 'Dev, IA, outils (FR)',
    },
    {
      name: 'Le Réveilleur',
      url: 'https://www.youtube.com/@lereveilleur',
      desc: 'Science, tech, vulgarisation',
    },
    {
      name: 'Tech avec Thomas',
      url: 'https://www.youtube.com/@TechAvecThomas',
      desc: 'IA, ChatGPT, productivité',
    },
  ],
  us: [
    {
      name: 'AI Explained',
      url: 'https://www.youtube.com/@aiexplained-official',
      desc: 'Actualités IA, analyses hebdo',
    },
    {
      name: 'Two Minute Papers',
      url: 'https://www.youtube.com/@TwoMinutePapers',
      desc: 'Recherche IA/ML vulgarisée',
    },
    {
      name: 'Yannic Kilcher',
      url: 'https://www.youtube.com/@YannicKilcher',
      desc: 'Papers, recherche, analyses',
    },
    {
      name: 'Matt Wolfe',
      url: 'https://www.youtube.com/@mreflow',
      desc: 'Outils IA, tutoriels, démos',
    },
    {
      name: 'Allie K. Miller',
      url: 'https://www.youtube.com/@alliekmiller',
      desc: 'IA business, stratégie',
    },
    {
      name: 'David Shapiro',
      url: 'https://www.youtube.com/@DavidShapiroAutomation',
      desc: 'Automatisation, agents IA',
    },
  ],
};

const LINKEDIN = {
  fr: [
    { name: 'Laure Olivié', url: 'https://www.linkedin.com/in/laure-olivie/', desc: 'Formatrice IA BTP, formation professionnelle' },
    { name: 'Julien Dubois', url: 'https://www.linkedin.com/in/juliendubois/', desc: 'IA, transformation digitale, conseil' },
    { name: 'Anne-Sophie de Branche', url: 'https://www.linkedin.com/in/annesophiedebranche/', desc: 'IA générative, formation, RH' },
    { name: 'Fabien Girardin', url: 'https://www.linkedin.com/in/fabiengirardin/', desc: 'Data science, IA, innovation' },
    { name: 'Marie de Moy', url: 'https://www.linkedin.com/in/mariedemoy/', desc: 'IA, transformation, conseil' },
  ],
  us: [
    { name: 'Andrew Ng', url: 'https://www.linkedin.com/in/andrewyng/', desc: 'DeepLearning.AI, ML, formation IA' },
    { name: 'Allie K. Miller', url: 'https://www.linkedin.com/in/alliekmiller/', desc: 'IA business, product, stratégie' },
    { name: 'Ethan Mollick', url: 'https://www.linkedin.com/in/emollick/', desc: 'IA en éducation, recherche Wharton' },
    { name: 'Linus Lee', url: 'https://www.linkedin.com/in/linuslee/', desc: 'IA, productivité, outils' },
    { name: 'Rowan Cheung', url: 'https://www.linkedin.com/in/rowancheung/', desc: 'The Rundown AI, actualités IA' },
  ],
};

const YOUTUBE_SHORTS = {
  fr: [
    { name: 'Tech avec Thomas', url: 'https://www.youtube.com/@TechAvecThomas/shorts', desc: 'Shorts IA, ChatGPT, astuces' },
    { name: 'Grafikart', url: 'https://www.youtube.com/@grafikart/shorts', desc: 'Shorts dev, IA, tutoriels rapides' },
    { name: 'Underscore_', url: 'https://www.youtube.com/@Underscore_/shorts', desc: 'Shorts tech, IA, code' },
    { name: 'Le Réveilleur', url: 'https://www.youtube.com/@lereveilleur/shorts', desc: 'Shorts science, tech, vulgarisation' },
  ],
  us: [
    { name: 'AI Explained', url: 'https://www.youtube.com/@aiexplained-official/shorts', desc: 'Shorts actualités IA, tendances' },
    { name: 'Matt Wolfe', url: 'https://www.youtube.com/@mreflow/shorts', desc: 'Shorts outils IA, démos rapides' },
    { name: 'Two Minute Papers', url: 'https://www.youtube.com/@TwoMinutePapers/shorts', desc: 'Shorts recherche IA/ML' },
    { name: 'Allie K. Miller', url: 'https://www.youtube.com/@alliekmiller/shorts', desc: 'Shorts IA business, tips' },
  ],
};

export default function VeillePage() {
  const [activeTab, setActiveTab] = useState<TabId>('newsletters');

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">Veille IA</h1>
        <p className="mt-2 text-neutral-600">
          Newsletters Substack, comptes LinkedIn, chaînes YouTube et Shorts IA
          francophones et américains — pour rester à jour et nourrir tes posts.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 rounded-xl bg-neutral-100 p-1">
        <button
          type="button"
          onClick={() => setActiveTab('newsletters')}
          className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'newsletters'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-800'
          }`}
        >
          📬 Newsletters
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('linkedin')}
          className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'linkedin'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-800'
          }`}
        >
          💼 LinkedIn
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('youtube')}
          className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'youtube'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-800'
          }`}
        >
          ▶️ YouTube
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('shorts')}
          className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'shorts'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-800'
          }`}
        >
          Shorts
        </button>
      </div>

      {activeTab === 'newsletters' && (
        <div className="space-y-8">
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-800">
              <span className="rounded bg-blue-100 px-2 py-0.5 text-sm">🇫🇷</span>
              Formateurs & consultants — France
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {NEWSLETTERS.fr.map((n) => (
                <a
                  key={n.name}
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-xl border border-neutral-200 p-4 transition-colors hover:border-[#377CF3]/30 hover:bg-[#377CF3]/5"
                >
                  <span className="font-medium text-neutral-800">{n.name}</span>
                  <span className="text-xs text-neutral-500">{n.author}</span>
                  <p className="mt-1 text-sm text-neutral-600">{n.desc}</p>
                </a>
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-800">
              <span className="rounded bg-amber-100 px-2 py-0.5 text-sm">🇺🇸</span>
              Formateurs & consultants — USA
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {NEWSLETTERS.us.map((n) => (
                <a
                  key={n.name}
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-xl border border-neutral-200 p-4 transition-colors hover:border-[#377CF3]/30 hover:bg-[#377CF3]/5"
                >
                  <span className="font-medium text-neutral-800">{n.name}</span>
                  <span className="text-xs text-neutral-500">{n.author}</span>
                  <p className="mt-1 text-sm text-neutral-600">{n.desc}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'youtube' && (
        <div className="space-y-8">
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-800">
              <span className="rounded bg-blue-100 px-2 py-0.5 text-sm">🇫🇷</span>
              YouTube IA — Francophone
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {YOUTUBE.fr.map((c) => (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-xl border border-neutral-200 p-4 transition-colors hover:border-[#377CF3]/30 hover:bg-[#377CF3]/5"
                >
                  <span className="font-medium text-neutral-800">{c.name}</span>
                  <p className="mt-1 text-sm text-neutral-600">{c.desc}</p>
                </a>
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-800">
              <span className="rounded bg-amber-100 px-2 py-0.5 text-sm">🇺🇸</span>
              YouTube IA — USA
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {YOUTUBE.us.map((c) => (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-xl border border-neutral-200 p-4 transition-colors hover:border-[#377CF3]/30 hover:bg-[#377CF3]/5"
                >
                  <span className="font-medium text-neutral-800">{c.name}</span>
                  <p className="mt-1 text-sm text-neutral-600">{c.desc}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'linkedin' && (
        <div className="space-y-8">
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-800">
              <span className="rounded bg-blue-100 px-2 py-0.5 text-sm">🇫🇷</span>
              Comptes LinkedIn — France
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {LINKEDIN.fr.map((c) => (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-xl border border-neutral-200 p-4 transition-colors hover:border-[#377CF3]/30 hover:bg-[#377CF3]/5"
                >
                  <span className="font-medium text-neutral-800">{c.name}</span>
                  <p className="mt-1 text-sm text-neutral-600">{c.desc}</p>
                </a>
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-800">
              <span className="rounded bg-amber-100 px-2 py-0.5 text-sm">🇺🇸</span>
              Comptes LinkedIn — USA
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {LINKEDIN.us.map((c) => (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-xl border border-neutral-200 p-4 transition-colors hover:border-[#377CF3]/30 hover:bg-[#377CF3]/5"
                >
                  <span className="font-medium text-neutral-800">{c.name}</span>
                  <p className="mt-1 text-sm text-neutral-600">{c.desc}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'shorts' && (
        <div className="space-y-8">
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-800">
              <span className="rounded bg-blue-100 px-2 py-0.5 text-sm">🇫🇷</span>
              YouTube Shorts — Francophone
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {YOUTUBE_SHORTS.fr.map((c) => (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-xl border border-neutral-200 p-4 transition-colors hover:border-[#377CF3]/30 hover:bg-[#377CF3]/5"
                >
                  <span className="font-medium text-neutral-800">{c.name}</span>
                  <p className="mt-1 text-sm text-neutral-600">{c.desc}</p>
                </a>
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-800">
              <span className="rounded bg-amber-100 px-2 py-0.5 text-sm">🇺🇸</span>
              YouTube Shorts — USA
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {YOUTUBE_SHORTS.us.map((c) => (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-xl border border-neutral-200 p-4 transition-colors hover:border-[#377CF3]/30 hover:bg-[#377CF3]/5"
                >
                  <span className="font-medium text-neutral-800">{c.name}</span>
                  <p className="mt-1 text-sm text-neutral-600">{c.desc}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-neutral-500">
        Sources sélectionnées pour ta veille IA — tu peux les compléter dans ta{' '}
        <Link href="/outil/base-connaissance" className="text-[#377CF3] hover:underline">
          base de connaissance
        </Link>
        .
      </p>
    </div>
  );
}
