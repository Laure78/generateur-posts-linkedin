'use client';

import { useState } from 'react';

const BLUE = '#377CF3';

type TabId = 'commenter' | 'planifier' | 'analyser';

type Comment = { text: string; type?: string };
type CalendarEntry = {
  day: number;
  topic: string;
  postType: string;
  hook: string;
  mainMessage: string;
};

export default function CroissancePage() {
  const [activeTab, setActiveTab] = useState<TabId>('commenter');

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">
          LinkedIn Growth Engine
        </h1>
        <p className="mt-1 text-neutral-600">
          Générateur de commentaires, planificateur de contenu et analyseur de profil.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 rounded-xl bg-neutral-100 p-1">
        {(
          [
            { id: 'commenter' as TabId, label: 'Commenter', icon: '💬' },
            { id: 'planifier' as TabId, label: 'Planifier', icon: '📅' },
            { id: 'analyser' as TabId, label: 'Analyser', icon: '📊' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-800'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'commenter' && <CommenterTab />}
      {activeTab === 'planifier' && <PlanifierTab />}
      {activeTab === 'analyser' && <AnalyserTab />}
    </div>
  );
}

function CommenterTab() {
  const [post, setPost] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!post.trim()) return;
    setError(null);
    setLoading(true);
    setComments([]);
    try {
      const res = await fetch('/api/generate-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post: post.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setComments(data.comments || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const copyComment = (text: string) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-[#377CF3]">
        Commenter un post
      </h2>
      <p className="mb-4 text-sm text-neutral-600">
        Colle un post LinkedIn pour générer 5 commentaires pertinents : insight expert, question, expérience, mini insight, engageant.
      </p>
      <textarea
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="Colle ici le post LinkedIn à commenter..."
        rows={6}
        className="mb-4 w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
      />
      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading || !post.trim()}
        className="rounded-xl bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2d6ad4] disabled:opacity-50"
      >
        {loading ? 'Génération…' : 'Générer commentaires'}
      </button>
      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}
      {comments.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="font-medium text-neutral-800">5 commentaires proposés</h3>
          {comments.map((c, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#377CF3]/20 bg-[#377CF3]/5 p-4"
            >
              {c.type && (
                <span className="mb-2 block text-xs font-medium text-[#377CF3]">
                  {c.type}
                </span>
              )}
              <p className="text-neutral-700">{c.text}</p>
              <button
                type="button"
                onClick={() => copyComment(c.text)}
                className="mt-2 text-xs text-[#377CF3] hover:underline"
              >
                Copier
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PlanifierTab() {
  const [theme, setTheme] = useState('IA dans le BTP et productivité');
  const [calendar, setCalendar] = useState<CalendarEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);
    setCalendar([]);
    try {
      const res = await fetch('/api/generate-content-calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: theme.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setCalendar(data.calendar || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-[#377CF3]">
        Planifier mes posts
      </h2>
      <p className="mb-4 text-sm text-neutral-600">
        Génère un calendrier de 30 posts LinkedIn planifiés sur 30 jours à partir d&apos;un thème ou une stratégie.
      </p>
      <input
        type="text"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        placeholder="Ex : IA dans le BTP, productivité, transformation numérique..."
        className="mb-4 w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
      />
      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading}
        className="rounded-xl bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2d6ad4] disabled:opacity-50"
      >
        {loading ? 'Génération…' : 'Générer le calendrier 30 jours'}
      </button>
      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}
      {calendar.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[600px] space-y-3">
            <h3 className="font-medium text-neutral-800">Calendrier 30 jours</h3>
            {calendar.map((entry, i) => (
              <div
                key={i}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-[#377CF3] px-2.5 py-0.5 text-xs font-medium text-white">
                    Jour {entry.day}
                  </span>
                  <span className="text-xs text-neutral-500">{entry.postType}</span>
                </div>
                <p className="font-medium text-neutral-800">{entry.topic}</p>
                <p className="mt-1 text-sm text-neutral-600">
                  <strong>Hook :</strong> {entry.hook}
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  <strong>Idée :</strong> {entry.mainMessage}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AnalyserTab() {
  const [profile, setProfile] = useState('');
  const [result, setResult] = useState<{
    score: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    keywords: string[];
  } | null>(null);
  const [optimized, setOptimized] = useState<{
    headline: string;
    bio: string;
    keywords: string[];
    pitch: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [optimizeLoading, setOptimizeLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!profile.trim()) return;
    setError(null);
    setLoading(true);
    setResult(null);
    setOptimized(null);
    try {
      const res = await fetch('/api/analyze-linkedin-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: profile.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setResult({
        score: data.score,
        strengths: data.strengths || [],
        weaknesses: data.weaknesses || [],
        suggestions: data.suggestions || [],
        keywords: data.keywords || [],
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = async () => {
    if (!profile.trim()) return;
    setError(null);
    setOptimizeLoading(true);
    setOptimized(null);
    try {
      const res = await fetch('/api/optimize-linkedin-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: profile.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setOptimized({
        headline: data.headline || '',
        bio: data.bio || '',
        keywords: data.keywords || [],
        pitch: data.pitch || '',
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setOptimizeLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-[#377CF3]">
        Analyser mon profil LinkedIn
      </h2>
      <p className="mb-4 text-sm text-neutral-600">
        Colle le contenu de ton profil (headline, section À propos, expériences clés). L&apos;IA analyse ton positionnement, ta clarté et propose des optimisations.
      </p>
      <textarea
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
        placeholder="Colle ici ton headline, ton résumé / À propos, tes postes clés..."
        rows={8}
        className="mb-4 w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
      />
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading || !profile.trim()}
          className="rounded-xl bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2d6ad4] disabled:opacity-50"
        >
          {loading ? 'Analyse…' : 'Analyser mon profil'}
        </button>
        <button
          type="button"
          onClick={handleOptimize}
          disabled={optimizeLoading || !profile.trim()}
          className="rounded-xl border-2 border-[#377CF3] bg-white px-6 py-3 text-sm font-semibold text-[#377CF3] hover:bg-[#377CF3]/10 disabled:opacity-50"
        >
          {optimizeLoading ? '…' : 'Optimiser mon profil'}
        </button>
      </div>
      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}
      {result && (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border-2 border-[#377CF3]/30 bg-[#377CF3]/5 p-4">
            <h3 className="mb-2 font-medium text-[#377CF3]">Score d&apos;optimisation</h3>
            <p className="text-3xl font-bold text-[#377CF3]">{result.score}/100</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 p-4">
              <h4 className="mb-2 text-sm font-medium text-neutral-800">Points forts</h4>
              <ul className="list-inside list-disc text-sm text-neutral-600">
                {result.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-neutral-200 p-4">
              <h4 className="mb-2 text-sm font-medium text-neutral-800">Points à améliorer</h4>
              <ul className="list-inside list-disc text-sm text-neutral-600">
                {result.weaknesses.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <h4 className="mb-2 text-sm font-medium text-neutral-800">Recommandations</h4>
            <ul className="list-inside list-disc text-sm text-neutral-600">
              {result.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          {result.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {result.keywords.map((k, i) => (
                <span
                  key={i}
                  className="rounded-full bg-[#377CF3]/10 px-3 py-1 text-xs font-medium text-[#377CF3]"
                >
                  {k}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      {optimized && (
        <div className="mt-6 space-y-4 rounded-xl border-2 border-emerald-200 bg-emerald-50/50 p-6">
          <h3 className="font-semibold text-emerald-800">Profil optimisé</h3>
          <div>
            <p className="mb-1 text-xs font-medium text-neutral-500">Nouveau headline</p>
            <p className="rounded-lg bg-white p-3 text-neutral-800">{optimized.headline}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-neutral-500">Nouvelle bio</p>
            <p className="whitespace-pre-wrap rounded-lg bg-white p-3 text-sm text-neutral-800">
              {optimized.bio}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-neutral-500">Pitch professionnel</p>
            <p className="rounded-lg bg-white p-3 text-sm text-neutral-800">{optimized.pitch}</p>
          </div>
          {optimized.keywords.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium text-neutral-500">Mots-clés SEO LinkedIn</p>
              <div className="flex flex-wrap gap-2">
                {optimized.keywords.map((k, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
