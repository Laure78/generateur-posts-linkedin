'use client';

import { useState } from 'react';
import { useTeam } from '@/lib/TeamContext';

const BLUE = '#377CF3';

type Comment = { text: string; type?: string };

export default function CommenterPostPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">
          Commenter un post
        </h1>
        <p className="mt-1 text-neutral-600">
          Générateur de commentaires pertinents pour engager sur les posts LinkedIn.
        </p>
      </div>

      <CommenterTab />
    </div>
  );
}

function CommenterTab() {
  const { canCreate } = useTeam();
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
      {!canCreate && (
        <p className="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800">
          Mode lecture seule : tu n&apos;as pas les droits pour générer.
        </p>
      )}
      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading || !post.trim() || !canCreate}
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
