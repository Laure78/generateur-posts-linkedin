'use client';

import { useState } from 'react';

export default function AccrochesPage() {
  const [subject, setSubject] = useState('');
  const [hooks, setHooks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!subject.trim()) {
      setError('Saisis un sujet.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setHooks([]);

    try {
      const res = await fetch('/api/generate-hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: subject.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erreur lors de la génération');
        return;
      }
      setHooks(data.hooks || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur réseau');
    } finally {
      setIsLoading(false);
    }
  };

  const copyHook = (hook: string) => {
    navigator.clipboard.writeText(hook);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">Générateur d&apos;accroches</h1>
        <p className="mt-2 text-neutral-600">
          Insère un sujet de post et génère des accroches captivantes.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Les 4 étapes pour..."
          className="flex-1 rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isLoading}
          className="rounded-xl bg-gradient-to-r from-[#377CF3] to-[#4d8bf7] px-6 py-3 font-semibold text-white hover:from-[#2d6ad4] hover:to-[#377CF3] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          {isLoading ? 'Génération…' : 'Générer les accroches'}
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {hooks.length > 0 && (
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-semibold text-neutral-800">Accroches générées</h2>
          <ul className="space-y-3">
            {hooks.map((hook, i) => (
              <li
                key={i}
                className="group flex items-center justify-between gap-4 rounded-xl border border-neutral-100 bg-neutral-50/50 px-4 py-3 hover:bg-[#377CF3]/5 transition-colors"
              >
                <span className="text-neutral-800">{hook}</span>
                <button
                  type="button"
                  onClick={() => copyHook(hook)}
                  className="shrink-0 rounded-lg p-2 text-neutral-400 hover:bg-[#377CF3]/10 hover:text-[#377CF3] transition-colors"
                  title="Copier"
                >
                  📋
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
