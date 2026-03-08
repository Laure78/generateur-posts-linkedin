'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const STORAGE_POSTS = 'createur_posts';

function EditeurPage() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('post');
  const [content, setContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [loading, setLoading] = useState(!!postId);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            setContent(data.content || '');
            setPostTitle(data.title || '');
          }
        } else if (typeof window !== 'undefined') {
          try {
            const raw = localStorage.getItem(STORAGE_POSTS);
            const list = raw ? JSON.parse(raw) : [];
            const p = list.find((x: { id: string }) => x.id === postId);
            if (p && !cancelled) {
              setContent(p.content || '');
              setPostTitle(p.title || '');
            }
          } catch {}
        }
      } catch {
        if (typeof window !== 'undefined') {
          try {
            const raw = localStorage.getItem(STORAGE_POSTS);
            const list = raw ? JSON.parse(raw) : [];
            const p = list.find((x: { id: string }) => x.id === postId);
            if (p && !cancelled) {
              setContent(p.content || '');
              setPostTitle(p.title || '');
            }
          } catch {}
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [postId]);

  useEffect(() => {
    if (!postId || !content) return;
    saveTimeoutRef.current = setTimeout(() => {
      fetch(`/api/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      }).then((res) => {
        if (res.status === 503 && typeof window !== 'undefined') {
          try {
            const raw = localStorage.getItem(STORAGE_POSTS);
            const list = raw ? JSON.parse(raw) : [];
            const idx = list.findIndex((x: { id: string }) => x.id === postId);
            if (idx >= 0) {
              list[idx] = { ...list[idx], content, title: content.split('\n')[0]?.trim().slice(0, 80) || list[idx].title || 'Nouveau post' };
              localStorage.setItem(STORAGE_POSTS, JSON.stringify(list));
            }
          } catch {}
        }
      });
    }, 800);
    return () => { if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current); };
  }, [postId, content]);

  const handleAITransform = async () => {
    if (!content.trim()) return;
    setIsTransforming(true);
    try {
      const res = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: content.trim(),
          postType: 'instructif',
          category: 'auto',
          style: 'neutre',
          btpMode: true,
          btpAudience: 'artisans',
          length: 'moyen',
        }),
      });
      const data = await res.json();
      if (res.ok && data.content) {
        setContent(data.content);
      }
    } catch {
      // ignore
    } finally {
      setIsTransforming(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Éditeur {postId && postTitle && <span className="font-normal text-neutral-500">— {postTitle}</span>}</h1>
        <p className="text-neutral-600">
          Rédige et peaufine tes posts avant publication. {postId && <span className="text-xs text-neutral-400">(Sauvegarde automatique)</span>}
        </p>
      </div>

      {loading && <p className="mb-4 text-sm text-neutral-500">Chargement du post…</p>}

      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
        {/* Header avec profil */}
        <div className="flex items-start justify-between border-b border-neutral-100 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#377CF3]/10 text-[#377CF3] font-bold text-lg">
              LO
            </div>
            <div>
              <p className="font-bold text-neutral-900">Laure Olivié</p>
              <p className="text-sm text-neutral-500">Formatrice IA BTP</p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
            title="Plus d&apos;options"
          >
            <span className="text-lg">⋮</span>
          </button>
        </div>

        {/* Zone de contenu */}
        <div className="p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Rédige ton post ici ou insère un sujet à transformer avec l'IA..."
            rows={10}
            className="w-full resize-none border-0 bg-transparent text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-0"
          />
        </div>

        {/* Barre d&apos;outils */}
        <div className="flex items-center justify-between border-t border-neutral-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
              title="Emoji"
            >
              <span className="text-lg">😊</span>
            </button>
            <button
              type="button"
              className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
              title="Intégrer"
            >
              <span className="text-lg">🖥</span>
            </button>
            <button
              type="button"
              className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
              title="Image"
            >
              <span className="text-lg">🖼</span>
            </button>
          </div>
          <div className="h-6 w-px bg-neutral-200" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
              title="Paramètres"
            >
              <span className="text-lg">⚙</span>
            </button>
            <button
              type="button"
              onClick={handleAITransform}
              disabled={isTransforming || !content.trim()}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#377CF3] text-white hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Transformer avec l'IA"
            >
              <span className="text-lg">✨</span>
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#377CF3] border border-[#377CF3]/20">
                A
              </span>
            </button>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-neutral-500">
        <Link href="/outil/generateur" className="text-[#377CF3] hover:underline">
          Générer un post depuis le sujet
        </Link>
      </p>
    </div>
  );
}

export default function EditeurPageWrapper() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-neutral-500">Chargement…</div>}>
      <EditeurPage />
    </Suspense>
  );
}
