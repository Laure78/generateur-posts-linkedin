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

        {/* Résumé du style (optionnel) */}
        <section className="rounded-2xl border border-violet-200 bg-violet-50/30 p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-semibold text-neutral-800">
            Résumé de ton style
          </h2>
          <p className="mb-4 text-sm text-neutral-500">
            Utilise &quot;Analyser mon style&quot; dans le générateur pour extraire les caractéristiques de tes posts, puis sauvegarde ici. Ce résumé sera appliqué à toutes les générations.
          </p>
          <textarea
            value={styleSummary}
            onChange={(e) => setStyleSummary(e.target.value)}
            placeholder="Ex : • Ton direct et concret • Phrases courtes • Utilise des questions en accroche • Vocabulaire terrain BTP..."
            rows={5}
            className="w-full rounded-xl border border-violet-200 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
        </section>

        {/* Anciens posts */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-semibold text-neutral-800">
            Anciens posts (exemples de ton style)
          </h2>
          <p className="mb-4 text-sm text-neutral-500">
            Colle ici des posts que tu as déjà publiés. L&apos;IA les utilisera
            pour reproduire ton ton et tes structures.
          </p>
          <textarea
            value={oldPosts}
            onChange={(e) => setOldPosts(e.target.value)}
            placeholder="Colle tes anciens posts LinkedIn ici, un par paragraphe ou séparés par ---..."
            rows={10}
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
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
