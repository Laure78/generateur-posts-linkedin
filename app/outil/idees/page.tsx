'use client';

import { useState } from 'react';
import Link from 'next/link';

const PRESET_THEMES = [
  'Formation IA et ChatGPT',
  'IA dans le BTP',
  'Devis et chiffrage avec l\'IA',
  'Productivité des artisans',
  'Transformation numérique BTP',
];

const CARD_COLORS = [
  'bg-amber-100',
  'bg-emerald-100',
  'bg-[#377CF3]/10',
  'bg-sky-100',
  'bg-rose-100',
  'bg-neutral-100',
];

type Idea = {
  title: string;
  category: string;
};

export default function IdeesPage() {
  const [theme, setTheme] = useState(PRESET_THEMES[0]);
  const [customTheme, setCustomTheme] = useState('');
  const [showNewTheme, setShowNewTheme] = useState(false);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBtp30, setIsLoadingBtp30] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [launchesUsed, setLaunchesUsed] = useState(0);
  const MAX_FREE_LAUNCHES = 5;

  const currentTheme = showNewTheme ? customTheme : theme;

  const handleGenerate = async () => {
    const t = currentTheme.trim();
    if (!t) {
      setError('Saisis ou choisis un thème.');
      return;
    }
    if (launchesUsed >= MAX_FREE_LAUNCHES) {
      setError(`Limite de ${MAX_FREE_LAUNCHES} lancements gratuits atteinte.`);
      return;
    }

    setError(null);
    setIsLoading(true);
    setIdeas([]);

    try {
      const res = await fetch('/api/generate-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: t }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erreur lors de la génération');
        return;
      }
      setIdeas(data.ideas || []);
      setLaunchesUsed((prev) => prev + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur réseau');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate30Btp = async () => {
    if (launchesUsed >= MAX_FREE_LAUNCHES) {
      setError(`Limite de ${MAX_FREE_LAUNCHES} lancements gratuits atteinte.`);
      return;
    }
    setError(null);
    setIsLoadingBtp30(true);
    setIdeas([]);
    try {
      const res = await fetch('/api/generate-ideas-btp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: currentTheme.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Erreur lors de la génération');
        return;
      }
      setIdeas(data.ideas || []);
      setLaunchesUsed((prev) => prev + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur réseau');
    } finally {
      setIsLoadingBtp30(false);
    }
  };

  const toggleFavorite = (index: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleUtiliser = (idea: Idea) => {
    const url = `/outil/generateur?subject=${encodeURIComponent(idea.title)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setShowNewTheme(true);
              setCustomTheme('');
            }}
            className="rounded-xl border border-[#377CF3]/30 bg-[#377CF3]/5 px-4 py-2 text-sm font-medium text-[#377CF3] hover:bg-[#377CF3]/10"
          >
            + Nouveau thème
          </button>
          {showNewTheme ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customTheme}
                onChange={(e) => setCustomTheme(e.target.value)}
                placeholder="Ex : IA et devis BTP"
                className="rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowNewTheme(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>
          ) : (
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-800 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
            >
              {PRESET_THEMES.map((t) => (
                <option key={t} value={t}>
                  {t.length > 28 ? `${t.slice(0, 25)}...` : t}
                </option>
              ))}
            </select>
          )}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 disabled:opacity-50"
            title="Rafraîchir"
          >
            <span className={isLoading ? 'animate-spin' : ''}>↻</span>
          </button>
        </div>
        <span className="text-sm text-neutral-500">
          {launchesUsed}/{MAX_FREE_LAUNCHES} Lancements gratuits
        </span>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">Générateur d&apos;idées</h1>
        <p className="mt-1 text-neutral-600">
          Choisis un thème et génère des idées de posts
        </p>
      </div>

      {/* Generate buttons */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isLoading || isLoadingBtp30 || !currentTheme.trim() || launchesUsed >= MAX_FREE_LAUNCHES}
          className="rounded-xl bg-gradient-to-r from-[#377CF3] to-[#4d8bf7] px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:from-[#2d6ad4] hover:to-[#377CF3] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Génération…' : 'Générer 6 idées'}
        </button>
        <button
          type="button"
          onClick={handleGenerate30Btp}
          disabled={isLoading || isLoadingBtp30 || launchesUsed >= MAX_FREE_LAUNCHES}
          className="rounded-xl border-2 border-[#377CF3] bg-white px-8 py-3.5 text-base font-semibold text-[#377CF3] hover:bg-[#377CF3]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoadingBtp30 ? 'Génération…' : 'Générer 30 idées BTP'}
        </button>
        <p className="self-center text-sm text-neutral-500">
          {currentTheme.trim() ? 'Thème : ' + currentTheme : '30 idées BTP variées'}
        </p>
      </div>

      {error && (
        <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {/* Idea cards */}
      {ideas.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea, index) => (
            <div
              key={`${idea.title}-${index}`}
              className={`relative rounded-2xl p-5 ${CARD_COLORS[index % CARD_COLORS.length]} border border-white/50`}
            >
              <button
                type="button"
                onClick={() => toggleFavorite(index)}
                className="absolute right-3 top-3 rounded-lg p-1.5 text-neutral-500 hover:bg-white/50 hover:text-rose-500 transition-colors"
                title={favorites.has(index) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <span className={favorites.has(index) ? 'text-rose-500' : ''}>
                  {favorites.has(index) ? '❤️' : '🤍'}
                </span>
              </button>
              <p className="pr-10 text-sm font-medium text-neutral-800 leading-snug">
                {idea.title}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-lg bg-white/70 px-2.5 py-1 text-xs font-medium text-neutral-600">
                  {idea.category}
                </span>
                <button
                  type="button"
                  onClick={() => handleUtiliser(idea)}
                  className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-[#377CF3] shadow-sm hover:bg-[#377CF3]/5 transition-colors"
                >
                  <span>↗</span>
                  Utiliser
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && ideas.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 py-16 text-center text-neutral-500">
          <span className="text-4xl">💡</span>
          <p className="mt-4 font-medium">Aucune idée pour l&apos;instant</p>
          <p className="mt-1 text-sm">Choisis un thème et clique sur &quot;Générer les idées&quot;</p>
        </div>
      )}
    </div>
  );
}
