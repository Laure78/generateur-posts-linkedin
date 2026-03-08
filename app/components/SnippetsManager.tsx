'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'createur_snippets';

export interface Snippet {
  id: string;
  label: string;
  content: string;
}

export default function SnippetsManager({
  onInsert,
  className = '',
}: {
  onInsert: (text: string) => void;
  className?: string;
}) {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as Snippet[];
        setSnippets(Array.isArray(data) ? data : []);
      }
    } catch {
      setSnippets([]);
    }
  }, []);

  const save = (list: Snippet[]) => {
    setSnippets(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const add = () => {
    if (!newLabel.trim() || !newContent.trim()) return;
    const s: Snippet = {
      id: crypto.randomUUID(),
      label: newLabel.trim(),
      content: newContent.trim(),
    };
    save([...snippets, s]);
    setNewLabel('');
    setNewContent('');
    setShowAdd(false);
  };

  const remove = (id: string) => {
    save(snippets.filter((x) => x.id !== id));
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-neutral-700">Snippets</p>
        <button
          type="button"
          onClick={() => setShowAdd(!showAdd)}
          className="text-sm text-[#377CF3] hover:text-[#2d6ad4]"
        >
          {showAdd ? 'Annuler' : '+ Ajouter'}
        </button>
      </div>

      {showAdd && (
        <div className="mt-3 space-y-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
          <input
            type="text"
            placeholder="Nom (ex: CTA devis)"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="w-full rounded border border-neutral-200 px-3 py-2 text-sm"
          />
          <textarea
            placeholder="Contenu du snippet..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={2}
            className="w-full rounded border border-neutral-200 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={add}
            className="rounded bg-[#377CF3] px-3 py-1.5 text-sm text-white"
          >
            Enregistrer
          </button>
        </div>
      )}

      <ul className="mt-2 space-y-1">
        {snippets.map((s) => (
          <li key={s.id} className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 text-sm shadow-sm">
            <button
              type="button"
              onClick={() => onInsert(s.content)}
              className="flex-1 truncate text-left text-neutral-700 hover:text-[#377CF3]"
              title={s.content}
            >
              {s.label}
            </button>
            <button
              type="button"
              onClick={() => remove(s.id)}
              className="text-neutral-400 hover:text-red-500"
              title="Supprimer"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      {snippets.length === 0 && !showAdd && (
        <p className="mt-1 text-xs text-neutral-500">Aucun snippet. Ajoute des signatures, CTA ou phrases récurrentes.</p>
      )}
    </div>
  );
}
