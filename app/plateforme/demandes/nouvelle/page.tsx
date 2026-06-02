'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MISSION_TYPES } from '@/lib/bework/config';
import { getSkillForMissionType } from '@/lib/skills/registry';

export default function NouvelleDemandePage() {
  const router = useRouter();
  const [type, setType] = useState<string>(MISSION_TYPES[0].id);
  const [title, setTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [chantier, setChantier] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const skill = getSkillForMissionType(type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/demandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, title, brief, chantier }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');

      if (skill?.integrated && skill.toolPath) {
        router.push(`${skill.toolPath}?mission=${data.id}`);
      } else {
        router.push(`/plateforme/demandes/${data.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-8">
      <Link href="/plateforme" className="text-sm text-[var(--bework-blue)] hover:underline">
        ← Tableau de bord
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold">Nouvelle demande</h1>
      <p className="mt-2 text-slate-600">
        Décrivez votre besoin : devis, dossier chantier, relance MOE, vérification DTU… Un Beworker qualifie et traite
        avec l&apos;IA.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Type de demande</label>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {MISSION_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t.id)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                  type === t.id
                    ? 'border-[var(--bework-blue)] bg-blue-50 ring-1 ring-[var(--bework-blue)]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="mr-2">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
          {skill && (
            <p className="mt-2 text-xs text-slate-500">
              Skill IA : <strong>{skill.name}</strong>
              {skill.integrated ? ' (outil intégré)' : ' (traitement Claude à venir)'}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Titre / référence
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Ex : Mémoire technique — AO Mairie"
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--bework-blue)] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label htmlFor="chantier" className="block text-sm font-medium text-slate-700">
            Chantier / marché (optionnel)
          </label>
          <input
            id="chantier"
            value={chantier}
            onChange={(e) => setChantier(e.target.value)}
            placeholder="Réf. marché, adresse, MOE…"
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--bework-blue)] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label htmlFor="brief" className="block text-sm font-medium text-slate-700">
            Brief / contenu
          </label>
          <textarea
            id="brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            required
            rows={8}
            placeholder="Collez le devis, décrivez la relance attendue, les pièces manquantes…"
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 font-mono text-sm focus:border-[var(--bework-blue)] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[var(--bework-blue)] py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Envoi…' : 'Envoyer la demande'}
        </button>
      </form>
    </div>
  );
}
