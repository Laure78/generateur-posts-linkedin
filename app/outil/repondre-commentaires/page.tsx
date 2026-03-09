'use client';

import { useState } from 'react';
import { useTeam } from '@/lib/TeamContext';
import { Copy, Sparkles, Check } from 'lucide-react';
import { OPENROUTER_MODELS } from '../../../lib/aiProvider';

const BLUE = '#377CF3';

export default function RepondreCommentairesPage() {
  const { canCreate } = useTeam();
  const [comments, setComments] = useState('');
  const [originalPost, setOriginalPost] = useState('');
  const [provider, setProvider] = useState<'openrouter' | 'openai'>('openrouter');
  const [openRouterModel, setOpenRouterModel] = useState<string>(OPENROUTER_MODELS[0].id);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!comments.trim()) return;
    setError(null);
    setResult('');
    setLoading(true);
    try {
      const res = await fetch('/api/repondre-commentaires', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comments: comments.trim(),
          originalPost: originalPost.trim() || undefined,
          provider,
          openRouterModel: provider === 'openrouter' ? openRouterModel : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setResult(data.content || '');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    navigator.clipboard?.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">
          Répondre aux commentaires
        </h1>
        <p className="mt-1 text-neutral-600">
          Génère des réponses humaines et percutantes à tes commentaires LinkedIn. Naturel, court, engageant.
        </p>
      </div>

      <div className="space-y-6">
        {/* Commentaires */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Commentaires reçus
          </label>
          <p className="mb-2 text-xs text-neutral-500">
            Colle un ou plusieurs commentaires (un par ligne ou en bloc).
          </p>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder={"Ex :\nSuper contenu Laure ! Tu as des tips pour débuter ?\n\nIntéressant, mais je ne suis pas d'accord sur le point 3..."}
            rows={6}
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
          />
        </div>

        {/* Post original (optionnel) */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Ton post original <span className="font-normal text-neutral-500">(optionnel)</span>
          </label>
          <p className="mb-2 text-xs text-neutral-500">
            Pour adapter le ton et le contexte des réponses.
          </p>
          <textarea
            value={originalPost}
            onChange={(e) => setOriginalPost(e.target.value)}
            placeholder="Colle le texte de ton post LinkedIn pour plus de pertinence..."
            rows={4}
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
          />
        </div>

        {/* Modèle */}
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3">
          <span className="text-xs font-medium text-neutral-500">Modèle :</span>
          <button
            type="button"
            onClick={() => setProvider('openrouter')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium ${provider === 'openrouter' ? 'text-white' : 'bg-white text-neutral-600'}`}
            style={provider === 'openrouter' ? { backgroundColor: BLUE } : undefined}
          >
            OpenRouter
          </button>
          <button
            type="button"
            onClick={() => setProvider('openai')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium ${provider === 'openai' ? 'text-white' : 'bg-white text-neutral-600'}`}
            style={provider === 'openai' ? { backgroundColor: BLUE } : undefined}
          >
            OpenAI
          </button>
          {provider === 'openrouter' && (
            <select
              value={openRouterModel}
              onChange={(e) => setOpenRouterModel(String(e.target.value))}
              className="rounded-lg border border-neutral-200 bg-white px-2 py-1 text-xs"
            >
              {OPENROUTER_MODELS.map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          )}
        </div>

        {!canCreate && (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800">
            Mode lecture seule : tu n&apos;as pas les droits pour générer des réponses.
          </p>
        )}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !comments.trim() || !canCreate}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-white disabled:opacity-50"
          style={{ backgroundColor: BLUE }}
        >
          <Sparkles size={18} />
          {loading ? 'Génération…' : 'Générer les réponses'}
        </button>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {result && (
          <div className="rounded-2xl border-2 border-[#377CF3]/20 bg-[#377CF3]/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-neutral-800" style={{ color: BLUE }}>
                Réponses proposées
              </h2>
              <button
                type="button"
                onClick={copyResult}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#377CF3]/10"
                style={{ color: BLUE }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copié' : 'Copier'}
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-neutral-700 font-sans">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
