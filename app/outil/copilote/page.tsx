'use client';

import { useState } from 'react';
import { Copy, Sparkles } from 'lucide-react';
import { OPENROUTER_MODELS } from '../../../lib/aiProvider';

const BLUE = '#377CF3';
const PROVIDERS = [
  { value: 'openrouter', label: 'OpenRouter' },
  { value: 'openai', label: 'OpenAI (GPT)' },
  { value: 'claude', label: 'Claude (Anthropic)' },
] as const;
const OBJECTIVES = [
  { value: 'visibilité', label: 'Visibilité' },
  { value: 'leads', label: 'Leads' },
  { value: 'autorité', label: 'Autorité' },
  { value: 'storytelling', label: 'Storytelling' },
] as const;

export default function CopilotePage() {
  const [profile, setProfile] = useState('');
  const [niche, setNiche] = useState('');
  const [objective, setObjective] = useState<'visibilité' | 'leads' | 'autorité' | 'storytelling'>('visibilité');
  const [pastPosts, setPastPosts] = useState('');
  const [provider, setProvider] = useState<'openrouter' | 'openai' | 'claude'>('openrouter');
  const defaultModel: string = OPENROUTER_MODELS[0].id;
  const [openRouterModel, setOpenRouterModel] = useState<string>(defaultModel);
  const [result, setResult] = useState<{
    profileSummary: string;
    recommendedTopic: string;
    post: string;
    score: number;
    scoreDetails: string;
  } | null>(null);
  const [variants, setVariants] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [variantsLoading, setVariantsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!profile.trim()) return;
    setError(null);
    setLoading(true);
    setResult(null);
    setVariants([]);
    try {
      const res = await fetch('/api/copilote-linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: profile.trim(),
          niche: niche.trim() || undefined,
          objective,
          pastPosts: pastPosts.trim() || undefined,
          provider,
          openRouterModel: provider === 'openrouter' ? openRouterModel : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setResult({
        profileSummary: data.profileSummary || '',
        recommendedTopic: data.recommendedTopic || '',
        post: data.post || '',
        score: data.score ?? 0,
        scoreDetails: data.scoreDetails || '',
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const handleVariants = async () => {
    if (!result?.recommendedTopic) return;
    setVariantsLoading(true);
    setVariants([]);
    try {
      const res = await fetch('/api/copilote-linkedin-variants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileSummary: result.profileSummary,
          recommendedTopic: result.recommendedTopic,
          objective,
          provider,
          openRouterModel: provider === 'openrouter' ? openRouterModel : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setVariants(data.variants || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setVariantsLoading(false);
    }
  };

  const copyPost = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">
          Copilote LinkedIn
        </h1>
        <p className="mt-1 text-neutral-600">
          Assistant stratégique : analyse ton profil, identifie la meilleure opportunité, génère le post le plus engageant pour aujourd&apos;hui.
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold" style={{ color: BLUE }}>
          Paramètres
        </h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Profil LinkedIn (headline, bio, expériences)
            </label>
            <textarea
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              placeholder="Colle le contenu de ton profil LinkedIn..."
              rows={5}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Niche / secteur
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Ex : BTP, IA, marketing digital..."
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Modèle IA
            </label>
            <div className="mb-2 flex flex-wrap gap-2">
              {PROVIDERS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setProvider(p.value)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
                    provider === p.value ? 'text-white' : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                  }`}
                  style={provider === p.value ? { backgroundColor: BLUE } : undefined}
                >
                  {p.label}
                </button>
              ))}
            </div>
            {provider === 'openrouter' && (
              <select
                value={openRouterModel}
                onChange={(e) => setOpenRouterModel(String(e.target.value))}
                className="w-full max-w-xs rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-800 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
              >
                {OPENROUTER_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label} ({m.cost})
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Objectif du post
            </label>
            <div className="flex flex-wrap gap-2">
              {OBJECTIVES.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setObjective(o.value)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    objective === o.value ? 'text-white' : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                  }`}
                  style={objective === o.value ? { backgroundColor: BLUE } : undefined}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Historique de posts (optionnel)
            </label>
            <textarea
              value={pastPosts}
              onChange={(e) => setPastPosts(e.target.value)}
              placeholder="Colle quelques-uns de tes posts passés pour affiner l'analyse..."
              rows={4}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
            />
          </div>
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading || !profile.trim()}
            className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
            style={{ backgroundColor: BLUE }}
          >
            <Sparkles size={18} />
            {loading ? 'Analyse…' : 'Analyser et proposer un post'}
          </button>
        </div>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>

      {result && (
        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
            <h3 className="mb-2 text-sm font-semibold text-neutral-800">
              Analyse du profil
            </h3>
            <p className="whitespace-pre-wrap text-sm text-neutral-700">
              {result.profileSummary}
            </p>
          </div>

          <div className="rounded-xl border border-[#377CF3]/20 bg-[#377CF3]/5 p-4">
            <h3 className="mb-2 text-sm font-semibold" style={{ color: BLUE }}>
              Sujet recommandé pour aujourd&apos;hui
            </h3>
            <p className="text-neutral-700">{result.recommendedTopic}</p>
          </div>

          <div className="rounded-xl border-2 border-[#377CF3]/30 bg-[#377CF3]/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold" style={{ color: BLUE }}>
                Post généré
              </h3>
              <button
                type="button"
                onClick={() => copyPost(result.post)}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-[#377CF3] hover:bg-[#377CF3]/10"
              >
                <Copy size={16} />
                {copied ? '✓ Copié' : 'Copier'}
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-neutral-700 font-sans">
              {result.post}
            </pre>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <h3 className="mb-2 text-sm font-semibold text-neutral-800">
              Score potentiel
            </h3>
            <div className="flex items-center gap-4">
              <span
                className="text-3xl font-bold"
                style={{ color: BLUE }}
              >
                {result.score}/100
              </span>
              {result.scoreDetails && (
                <p className="text-sm text-neutral-600">{result.scoreDetails}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleVariants}
            disabled={variantsLoading}
            className="flex items-center gap-2 rounded-xl border-2 px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
            style={{ borderColor: BLUE, color: BLUE }}
          >
            {variantsLoading ? '…' : 'Générer 3 variantes'}
          </button>

          {variants.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-neutral-800">3 variantes</h3>
              {variants.map((v, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-neutral-200 bg-white p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{ backgroundColor: `${BLUE}20`, color: BLUE }}
                    >
                      Variante {i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyPost(v)}
                      className="text-xs text-[#377CF3] hover:underline"
                    >
                      Copier
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-neutral-700 font-sans">
                    {v}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
