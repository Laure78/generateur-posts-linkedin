'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type PostStatus = 'tous' | 'brouillons' | 'planifies' | 'publies' | 'favoris';
type PostLabel = 'Instructif' | 'Inspirant' | 'Storytelling' | 'Conseil' | 'Ressources';

type Post = {
  id: string;
  title: string;
  content: string;
  status: 'brouillon' | 'planifie' | 'publie';
  label: PostLabel;
  date: string;
  scheduledAt?: string;
  publishedAt?: string;
  favorite: boolean;
  hasMedia: boolean;
};

const STORAGE_POSTS = 'createur_posts';

const DEFAULT_POSTS: Post[] = [
  {
    id: '1',
    title: "Ceux qui pensent que l'IA c'est pour les informaticiens n'ont...",
    content: '',
    status: 'brouillon',
    label: 'Instructif',
    date: '2025-12-30',
    favorite: false,
    hasMedia: false,
  },
  {
    id: '2',
    title: "Après avoir testé +30 outils d'IA générative. Je vous dévoile...",
    content: '',
    status: 'brouillon',
    label: 'Ressources',
    date: '2025-10-21',
    favorite: false,
    hasMedia: false,
  },
  {
    id: '3',
    title: "Les 5 manières de prompter avec ChatGPT (et dominer l'IA) ✨",
    content: '',
    status: 'brouillon',
    label: 'Instructif',
    date: '2025-01-20',
    favorite: true,
    hasMedia: false,
  },
  {
    id: '4',
    title: "47 TPE ont explosé leur productivité avec cette base de...",
    content: '',
    status: 'brouillon',
    label: 'Conseil',
    date: '2025-03-21',
    favorite: false,
    hasMedia: false,
  },
];

function loadPostsFromStorage(): Post[] {
  if (typeof window === 'undefined') return DEFAULT_POSTS;
  try {
    const raw = localStorage.getItem(STORAGE_POSTS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_POSTS;
}

function savePostsToStorage(posts: Post[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_POSTS, JSON.stringify(posts));
  } catch {}
}

const LABEL_COLORS: Record<PostLabel, string> = {
  Instructif: 'bg-amber-100 text-amber-800',
  Inspirant: 'bg-rose-100 text-rose-800',
  Storytelling: 'bg-[#377CF3]/10 text-[#377CF3]',
  Conseil: 'bg-emerald-100 text-emerald-800',
  Ressources: 'bg-sky-100 text-sky-800',
};

export default function MesPostsPage() {
  const [posts, setPosts] = useState<Post[]>(DEFAULT_POSTS);
  const [filter, setFilter] = useState<PostStatus>('tous');
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [useSupabase, setUseSupabase] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json().catch(() => ({}));
        if (!cancelled) {
          if (res.ok && !data.error) {
            setPosts(data.posts?.length ? data.posts : DEFAULT_POSTS);
            setUseSupabase(true);
          } else {
            setPosts(loadPostsFromStorage());
          }
        }
      } catch {
        if (!cancelled) setPosts(loadPostsFromStorage());
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!useSupabase && posts.length) savePostsToStorage(posts);
  }, [posts, useSupabase]);

  const filtered = posts.filter((p) => {
    if (filter === 'brouillons' && p.status !== 'brouillon') return false;
    if (filter === 'planifies' && p.status !== 'planifie') return false;
    if (filter === 'publies' && p.status !== 'publie') return false;
    if (filter === 'favoris' && !p.favorite) return false;
    if (search.trim() && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleFavorite = async (id: string) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    const next = !post.favorite;
    if (useSupabase) {
      try {
        const res = await fetch(`/api/posts/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ favorite: next }) });
        if (res.ok) setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, favorite: next } : p)));
      } catch {}
    } else {
      setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, favorite: next } : p)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map((p) => p.id)));
  };

  const updateLabel = async (id: string, label: PostLabel) => {
    if (useSupabase) {
      try {
        const res = await fetch(`/api/posts/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ label }) });
        if (res.ok) setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, label } : p)));
      } catch {}
    } else {
      setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, label } : p)));
    }
  };

  const deletePost = async (id: string) => {
    if (useSupabase) {
      try {
        const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setPosts((prev) => prev.filter((p) => p.id !== id));
          setSelectedIds((prev) => { const next = new Set(prev); next.delete(id); return next; });
        }
      } catch {}
    } else {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setSelectedIds((prev) => { const next = new Set(prev); next.delete(id); return next; });
    }
  };

  const addPost = async () => {
    if (useSupabase) {
      try {
        const res = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'Nouveau post', status: 'brouillon', label: 'Instructif' }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.id) {
          setPosts((prev) => [{
            id: data.id,
            title: data.title || 'Nouveau post',
            content: data.content || '',
            status: data.status || 'brouillon',
            label: data.label || 'Instructif',
            date: data.date || new Date().toISOString().slice(0, 10),
            favorite: data.favorite ?? false,
            hasMedia: data.hasMedia ?? false,
            scheduledAt: data.scheduledAt,
            publishedAt: data.publishedAt,
          }, ...prev]);
        }
      } catch {}
    } else {
      const id = crypto.randomUUID();
      const date = new Date().toISOString().slice(0, 10);
      setPosts((prev) => [{ id, title: 'Nouveau post', content: '', status: 'brouillon', label: 'Instructif', date, favorite: false, hasMedia: false }, ...prev]);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Mes posts</h1>
        <p className="mt-1 text-neutral-600">Prépare tes posts pour les publier. {useSupabase && <span className="text-xs text-emerald-600">(Supabase)</span>}</p>
      </div>

      {loading && (
        <p className="mb-4 text-sm text-neutral-500">Chargement…</p>
      )}

      {/* Filtres + Actions */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(['tous', 'brouillons', 'planifies', 'publies', 'favoris'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-neutral-200 text-neutral-900'
                  : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {f === 'tous' && 'Tous'}
              {f === 'brouillons' && <>📄 Brouillons</>}
              {f === 'planifies' && <>📅 Planifiés</>}
              {f === 'publies' && <>✓ Publiés</>}
              {f === 'favoris' && <>★ Favoris</>}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Chercher un post..."
              className="w-56 rounded-xl border border-neutral-200 py-2 pl-9 pr-4 text-sm"
            />
          </div>
          <Link
            href="/outil/generateur"
            className="flex items-center gap-2 rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2d6ad4]"
          >
            <span>+</span>
            Créer un post
          </Link>
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="w-10 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={filtered.length > 0 && selectedIds.size === filtered.length}
                  onChange={toggleSelectAll}
                  className="rounded"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-neutral-500">Post</th>
              <th className="w-28 px-4 py-3 text-left text-xs font-semibold uppercase text-neutral-500">Statut</th>
              <th className="w-28 px-4 py-3 text-left text-xs font-semibold uppercase text-neutral-500">Publication</th>
              <th className="w-24 px-4 py-3 text-left text-xs font-semibold uppercase text-neutral-500">Média</th>
              <th className="w-32 px-4 py-3 text-left text-xs font-semibold uppercase text-neutral-500">Label</th>
              <th className="w-20 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((post) => (
              <tr key={post.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(post.id)}
                    onChange={() => toggleSelect(post.id)}
                    className="rounded"
                  />
                </td>
                <td className="px-4 py-3">
                  <Link href={`/outil/editeur?post=${post.id}`} className="block">
                    <p className="font-medium text-neutral-900 line-clamp-1">{post.title}</p>
                    <p className="text-xs text-neutral-500">
                      {post.date} | Standard
                    </p>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">
                    📄 {post.status === 'brouillon' ? 'Brouillon' : post.status === 'planifie' ? 'Planifié' : 'Publié'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-neutral-500">
                  {post.scheduledAt || post.publishedAt || '—'}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className="rounded-lg border border-dashed border-neutral-200 px-2 py-1 text-xs text-neutral-500 hover:bg-neutral-50"
                  >
                    + Ajouter
                  </button>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={post.label}
                    onChange={(e) => updateLabel(post.id, e.target.value as PostLabel)}
                    className={`rounded-lg border-0 px-2 py-1 text-xs font-medium ${LABEL_COLORS[post.label]}`}
                  >
                    {(Object.keys(LABEL_COLORS) as PostLabel[]).map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(post.id)}
                      className={`rounded p-1.5 ${post.favorite ? 'text-rose-500' : 'text-neutral-400 hover:text-rose-400'}`}
                    >
                      {post.favorite ? '♥' : '♡'}
                    </button>
                    <div className="relative group">
                      <button type="button" className="rounded p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600">
                        ⋮
                      </button>
                      <div className="absolute right-0 top-full z-10 mt-1 hidden w-36 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg group-hover:block">
                        <Link
                          href={`/outil/editeur?post=${post.id}`}
                          className="block px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
                        >
                          Modifier
                        </Link>
                        <button
                          type="button"
                          onClick={() => deletePost(post.id)}
                          className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-center text-neutral-500">
          Aucun post trouvé. <Link href="/outil/generateur" className="text-[#377CF3] hover:underline">Créer un post</Link>
        </p>
      )}
    </div>
  );
}
