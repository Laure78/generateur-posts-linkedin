'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'createur_knowledge_base';

type Reference = {
  id: string;
  label: string;
  url: string;
  content: string;
};

type KnowledgeBase = {
  references: Reference[];
  oldPosts: string;
  styleSummary?: string;
};

const DEFAULT_KB: KnowledgeBase = {
  references: [],
  oldPosts: '',
  styleSummary: '',
};

function loadKnowledge(): KnowledgeBase {
  if (typeof window === 'undefined') return DEFAULT_KB;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<KnowledgeBase>;
      return {
        references: Array.isArray(parsed?.references) ? parsed.references : [],
        oldPosts: typeof parsed?.oldPosts === 'string' ? parsed.oldPosts : '',
        styleSummary: typeof parsed?.styleSummary === 'string' ? parsed.styleSummary : '',
      };
    }
  } catch {
    // ignore
  }
  return DEFAULT_KB;
}

function saveKnowledge(kb: KnowledgeBase) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(kb));
  } catch {
    // ignore
  }
}

export default function BaseConnaissancePage() {
  const [references, setReferences] = useState<Reference[]>([]);
  const [oldPosts, setOldPosts] = useState('');
  const [saved, setSaved] = useState(false);

  const [styleSummary, setStyleSummary] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const kb = loadKnowledge();
    setReferences(kb.references);
    setOldPosts(kb.oldPosts);
    setStyleSummary(kb.styleSummary || '');
  }, []);

  const handleSave = () => {
    saveKnowledge({ references, oldPosts, styleSummary });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addReference = () => {
    setReferences([
      ...references,
      { id: crypto.randomUUID(), label: '', url: '', content: '' },
    ]);
  };

  const updateReference = (id: string, updates: Partial<Reference>) => {
    setReferences(
      references.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  const removeReference = (id: string) => {
    setReferences(references.filter((r) => r.id !== id));
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">
          Base de connaissance
        </h1>
        <p className="mt-2 text-neutral-600">
          Enrichis le contexte de l&apos;IA avec des URLs, des articles ou tes
          anciens posts. Ces éléments seront utilisés pour personnaliser la
          génération de contenus.
        </p>
      </div>

      <div className="space-y-8">
        {/* Références / URLs */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-semibold text-neutral-800">
            Références et liens
          </h2>
          <p className="mb-4 text-sm text-neutral-500">
            Ajoute des URLs (articles, posts LinkedIn, pages web) et colle le
            contenu pertinent. L&apos;IA s&apos;en servira pour s&apos;aligner
            sur ton style ou tes sujets.
          </p>
          <div className="space-y-4">
            {references.map((ref) => (
              <div
                key={ref.id}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
              >
                <div className="mb-2 flex gap-2">
                  <input
                    type="text"
                    value={ref.label}
                    onChange={(e) =>
                      updateReference(ref.id, { label: e.target.value })
                    }
                    placeholder="Label (ex : Article IA BTP)"
                    className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  />
                  <input
                    type="url"
                    value={ref.url}
                    onChange={(e) =>
                      updateReference(ref.id, { url: e.target.value })
                    }
                    placeholder="URL (optionnel)"
                    className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeReference(ref.id)}
                    className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    title="Supprimer"
                  >
                    ✕
                  </button>
                </div>
                <textarea
                  value={ref.content}
                  onChange={(e) =>
                    updateReference(ref.id, { content: e.target.value })
                  }
                  placeholder="Colle le contenu de la page ou un extrait pertinent..."
                  rows={3}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addReference}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 py-4 text-sm font-medium text-neutral-600 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700"
            >
              + Ajouter une référence
            </button>
          </div>
        </section>

        {/* Mes posts — source pour Apprendre mon style */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-semibold text-neutral-800">
            Mes posts LinkedIn (5 à 10 pour apprendre mon style)
          </h2>
          <p className="mb-4 text-sm text-neutral-500">
            Colle ici tes posts publiés. Clique sur &quot;Analyser et extraire mon style&quot; pour créer ton profil d&apos;écriture.
          </p>
          <textarea
            value={oldPosts}
            onChange={(e) => setOldPosts(e.target.value)}
            placeholder="Colle tes anciens posts LinkedIn ici, un par paragraphe ou séparés par ---..."
            rows={10}
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
        </section>

        {/* APPRENDRE MON STYLE */}
        <section className="rounded-2xl border-2 border-[#377CF3]/30 bg-[#377CF3]/5 p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-semibold text-[#377CF3]">
            Apprendre mon style
          </h2>
          <p className="mb-4 text-sm text-neutral-600">
            L&apos;IA analyse ton ton, la longueur des phrases, le vocabulaire et la structure, puis adapte toutes les prochaines générations.
          </p>
          <div className="mb-4 flex gap-3">
            <button
              type="button"
              onClick={async () => {
                const posts = oldPosts.trim();
                if (!posts) return;
                setAnalyzing(true);
                try {
                  const res = await fetch('/api/analyze-style', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ posts }),
                  });
                  const d = await res.json();
                  if (res.ok && d.styleSummary) setStyleSummary(d.styleSummary);
                } finally {
                  setAnalyzing(false);
                }
              }}
              disabled={!oldPosts.trim() || analyzing}
              className="rounded-xl bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2d6ad4] disabled:opacity-50"
            >
              {analyzing ? 'Analyse…' : 'Analyser et extraire mon style'}
            </button>
          </div>
          <p className="mb-2 text-xs font-medium text-neutral-600">Profil d&apos;écriture extrait :</p>
          <textarea
            value={styleSummary}
            onChange={(e) => setStyleSummary(e.target.value)}
            placeholder="• Ton direct et concret • Phrases courtes • Questions en accroche... (rempli après analyse)"
            rows={5}
            className="w-full rounded-xl border border-[#377CF3]/30 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
          />
        </section>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            href="/outil/generateur"
            className="text-sm text-violet-600 hover:underline"
          >
            ← Retour au Générateur
          </Link>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
          >
            {saved ? '✓ Enregistré' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  );
}
