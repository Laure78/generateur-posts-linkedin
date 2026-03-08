'use client';

import { useState } from 'react';
import { Copy, LayoutGrid } from 'lucide-react';

const BLUE = '#377CF3';

type HookItem = { text: string; category: string };
type PostItem = { type: string; content: string };

export default function ContenuAvancePage() {
  const [activeTab, setActiveTab] = useState<'hooks' | 'transform' | 'viral'>('hooks');

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">
          Contenu avancé
        </h1>
        <p className="mt-1 text-neutral-600">
          Hooks viraux, transformateur de contenu et analyse de posts performants.
        </p>
      </div>

      <div className="mb-6 flex gap-2 rounded-xl bg-neutral-100 p-1">
        <button
          type="button"
          onClick={() => setActiveTab('hooks')}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'hooks'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-800'
          }`}
        >
          Hooks viraux
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('transform')}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'transform'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-800'
          }`}
        >
          Transformer contenu
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('viral')}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'viral'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-800'
          }`}
        >
          Analyser post viral
        </button>
      </div>

      {activeTab === 'hooks' && <HooksVirauxTab />}
      {activeTab === 'transform' && <TransformerContenuTab />}
      {activeTab === 'viral' && <AnalyserPostViralTab />}
    </div>
  );
}

function HooksVirauxTab() {
  const [subject, setSubject] = useState('IA dans le BTP');
  const [hooks, setHooks] = useState<HookItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!subject.trim()) return;
    setError(null);
    setLoading(true);
    setHooks([]);
    try {
      const res = await fetch('/api/generate-hooks-viral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: subject.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setHooks(data.hooks || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Group by category
  const byCategory = hooks.reduce<Record<string, HookItem[]>>((acc, h) => {
    if (!acc[h.category]) acc[h.category] = [];
    acc[h.category].push(h);
    return acc;
  }, {});

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold" style={{ color: BLUE }}>
        Générateur de hooks
      </h2>
      <p className="mb-4 text-sm text-neutral-600">
        Saisis un sujet et génère 100 hooks LinkedIn classés par catégorie.
      </p>
      <div className="mb-4 flex gap-3">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Ex : IA dans le BTP, productivité chantier..."
          className="flex-1 rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
          style={{ backgroundColor: BLUE }}
        >
          {loading ? 'Génération…' : 'Générer hooks'}
        </button>
      </div>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {hooks.length > 0 && (
        <div className="mt-6 space-y-6">
          <p className="text-sm font-medium text-neutral-600">
            {hooks.length} hooks générés
          </p>
          {Object.entries(byCategory).map(([cat, items]) => (
            <div key={cat}>
              <h3 className="mb-2 text-sm font-semibold text-neutral-800">
                {cat}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((h, i) => {
                  const id = `${cat}-${i}`;
                  return (
                    <div
                      key={id}
                      className="group flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm transition-colors hover:border-[#377CF3]/30 hover:bg-[#377CF3]/5"
                    >
                      <span className="flex-1 text-neutral-700">{h.text}</span>
                      <button
                        type="button"
                        onClick={() => copy(h.text, id)}
                        className="rounded-lg p-1.5 text-neutral-500 hover:bg-[#377CF3]/10 hover:text-[#377CF3]"
                        title="Copier"
                      >
                        {copiedId === id ? (
                          <span className="text-xs text-emerald-600">✓</span>
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TransformerContenuTab() {
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [carouselLoading, setCarouselLoading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!content.trim()) return;
    setError(null);
    setLoading(true);
    setPosts([]);
    try {
      const res = await fetch('/api/transform-content-to-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setPosts(data.posts || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const transformToCarousel = async (postContent: string, index: number) => {
    setCarouselLoading(index);
    try {
      const res = await fetch('/api/generate-carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: postContent,
          viral: true,
          maxSlides: 7,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error || 'Erreur');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'carrousel-linkedin.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError('Erreur génération carrousel');
    } finally {
      setCarouselLoading(null);
    }
  };

  const isCarouselLoading = (idx: number) => carouselLoading === idx;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold" style={{ color: BLUE }}>
        Transformer contenu en posts
      </h2>
      <p className="mb-4 text-sm text-neutral-600">
        Colle un article ou la transcription d&apos;une vidéo pour générer 10 posts LinkedIn.
      </p>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Colle ici ton article ou la transcription de ta vidéo..."
        rows={8}
        className="mb-4 w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
      />
      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading || !content.trim()}
        className="rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
        style={{ backgroundColor: BLUE }}
      >
        {loading ? 'Génération…' : 'Générer posts'}
      </button>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {posts.length > 0 && (
        <div className="mt-6 space-y-6">
          <p className="text-sm font-medium text-neutral-600">
            10 posts générés
          </p>
          {posts.map((p, i) => {
            const id = `post-${i}`;
            return (
              <div
                key={id}
                className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: `${BLUE}20`, color: BLUE }}
                  >
                    {p.type}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => transformToCarousel(p.content, i)}
                      disabled={carouselLoading !== null}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-[#377CF3]/10 hover:text-[#377CF3] disabled:opacity-50"
                      title="Transformer en carrousel"
                    >
                      <LayoutGrid size={14} />
                      {isCarouselLoading(i) ? '…' : 'Carrousel'}
                    </button>
                    <button
                      type="button"
                      onClick={() => copy(p.content, id)}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-[#377CF3]/10 hover:text-[#377CF3]"
                      title="Copier"
                    >
                      {copiedId === id ? (
                        <span className="text-emerald-600">✓ Copié</span>
                      ) : (
                        <>
                          <Copy size={14} />
                          Copier
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <pre className="whitespace-pre-wrap text-sm text-neutral-700 font-sans">
                  {p.content}
                </pre>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AnalyserPostViralTab() {
  const [post, setPost] = useState('');
  const [subject, setSubject] = useState('IA dans le BTP et productivité');
  const [audience, setAudience] = useState('Artisans, dirigeants PME BTP');
  const [result, setResult] = useState<{
    analysis: string;
    structure: string;
    newPost: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!post.trim()) return;
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/analyze-viral-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post: post.trim(),
          subject: subject.trim() || undefined,
          audience: audience.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setResult({
        analysis: data.analysis || '',
        structure: data.structure || '',
        newPost: data.newPost || '',
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const copyPost = () => {
    if (result?.newPost) {
      navigator.clipboard?.writeText(result.newPost);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold" style={{ color: BLUE }}>
        Analyser un post viral
      </h2>
      <p className="mb-4 text-sm text-neutral-600">
        Colle un post viral et indique ton sujet + audience. L&apos;IA extrait la structure narrative et génère un nouveau post original en conservant la mécanique d&apos;engagement (sans copier le contenu).
      </p>
      <div className="mb-4 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Post viral à analyser
          </label>
          <textarea
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder="Colle ici le post LinkedIn performant..."
            rows={6}
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Sujet pour le nouveau post
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Ex : IA dans le BTP, productivité chantier..."
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Audience cible
          </label>
          <input
            type="text"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="Ex : Artisans BTP, dirigeants PME, freelances..."
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
          />
        </div>
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading || !post.trim()}
          className="rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
          style={{ backgroundColor: BLUE }}
        >
          {loading ? 'Analyse…' : 'Analyser et générer'}
        </button>
      </div>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {result && (
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
            <h3 className="mb-2 text-sm font-semibold text-neutral-800">
              ANALYSE DU POST VIRAL
            </h3>
            <p className="whitespace-pre-wrap text-sm text-neutral-700">
              {result.analysis}
            </p>
          </div>
          <div className="rounded-xl border border-[#377CF3]/20 bg-[#377CF3]/5 p-4">
            <h3 className="mb-2 text-sm font-semibold" style={{ color: BLUE }}>
              STRUCTURE EXTRAITE
            </h3>
            <p className="whitespace-pre-wrap text-sm text-neutral-700">
              {result.structure}
            </p>
          </div>
          <div className="rounded-xl border-2 border-[#377CF3]/30 bg-[#377CF3]/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold" style={{ color: BLUE }}>
                NOUVEAU POST GÉNÉRÉ
              </h3>
              <button
                type="button"
                onClick={copyPost}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#377CF3] hover:bg-[#377CF3]/10"
              >
                <Copy size={14} />
                {copied ? '✓ Copié' : 'Copier'}
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-neutral-700 font-sans">
              {result.newPost}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
