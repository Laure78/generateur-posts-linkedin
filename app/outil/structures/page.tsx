'use client';

import { useState, useMemo } from 'react';
import { Copy, Shuffle } from 'lucide-react';
import {
  LINKEDIN_STRUCTURES,
  STRUCTURE_CATEGORIES,
  type LinkedInStructure,
  type StructureCategory,
} from '../../../lib/linkedinStructures';

const BLUE = '#377CF3';

export default function StructuresPage() {
  const [selectedStructure, setSelectedStructure] = useState<LinkedInStructure | null>(null);
  const [subject, setSubject] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<StructureCategory | 'Tous'>('Tous');
  const [copied, setCopied] = useState(false);

  const filteredStructures = useMemo(() => {
    if (filterCategory === 'Tous') return LINKEDIN_STRUCTURES;
    return LINKEDIN_STRUCTURES.filter((s) => s.category === filterCategory);
  }, [filterCategory]);

  const handleGenerate = async () => {
    const struct = selectedStructure;
    const subj = subject.trim();
    if (!struct || !subj) return;
    setError(null);
    setLoading(true);
    setGeneratedPost('');
    try {
      const res = await fetch('/api/generate-post-from-structure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structureId: struct.id,
          subject: subj,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setGeneratedPost(data.content || '');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = async () => {
    const random = filteredStructures[Math.floor(Math.random() * filteredStructures.length)];
    setSelectedStructure(random);
    const subj = subject.trim() || 'Productivité et IA en entreprise';
    if (!subject.trim()) setSubject(subj);
    setError(null);
    setLoading(true);
    setGeneratedPost('');
    try {
      const res = await fetch('/api/generate-post-from-structure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ structureId: random.id, subject: subj }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setGeneratedPost(data.content || '');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const copyPost = () => {
    if (generatedPost) {
      navigator.clipboard?.writeText(generatedPost);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">
          Bibliothèque de structures
        </h1>
        <p className="mt-1 text-neutral-600">
          50 structures virales utilisées par les créateurs LinkedIn. Sélectionne une structure, entre un sujet, génère.
        </p>
      </div>

      {/* Sujet + Générer */}
      <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap gap-3">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Sujet du post (ex : productivité avec l'IA)"
            className="flex-1 min-w-[200px] rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
          />
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading || !selectedStructure || !subject.trim()}
            className="rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
            style={{ backgroundColor: BLUE }}
          >
            {loading ? 'Génération…' : 'Générer un post'}
          </button>
          <button
            type="button"
            onClick={handleRandom}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold disabled:opacity-50"
            style={{ borderColor: BLUE, color: BLUE }}
          >
            <Shuffle size={18} />
            Structure aléatoire
          </button>
        </div>
        {selectedStructure && (
          <p className="text-sm text-neutral-500">
            Structure sélectionnée : <strong>{selectedStructure.name}</strong>
          </p>
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      {/* Filtre catégorie */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilterCategory('Tous')}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            filterCategory === 'Tous'
              ? 'text-white'
              : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
          }`}
          style={filterCategory === 'Tous' ? { backgroundColor: BLUE } : undefined}
        >
          Tous
        </button>
        {STRUCTURE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              filterCategory === cat
                ? 'text-white'
                : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
            }`}
            style={filterCategory === cat ? { backgroundColor: BLUE } : undefined}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cartes structures */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-neutral-800">
          Structures de posts
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStructures.map((s) => (
            <div
              key={s.id}
              className={`rounded-2xl border-2 p-5 transition-all ${
                selectedStructure?.id === s.id
                  ? 'border-[#377CF3] bg-[#377CF3]/5'
                  : 'border-neutral-200 bg-white hover:border-[#377CF3]/40 hover:shadow-sm'
              }`}
            >
              <span
                className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{ backgroundColor: `${BLUE}20`, color: BLUE }}
              >
                {s.category}
              </span>
              <h3 className="font-semibold text-neutral-800">{s.name}</h3>
              <p className="mt-1 text-sm text-neutral-600">{s.description}</p>
              <p className="mt-2 text-xs text-neutral-500">{s.structure}</p>
              <button
                type="button"
                onClick={() => setSelectedStructure(s)}
                className="mt-4 w-full rounded-xl py-2.5 text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: selectedStructure?.id === s.id ? BLUE : 'transparent',
                  color: selectedStructure?.id === s.id ? 'white' : BLUE,
                  border: `2px solid ${BLUE}`,
                }}
              >
                {selectedStructure?.id === s.id ? '✓ Sélectionnée' : 'Utiliser cette structure'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Post généré */}
      {generatedPost && (
        <div className="rounded-2xl border-2 border-[#377CF3]/30 bg-[#377CF3]/5 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-neutral-800">Post généré</h2>
            <button
              type="button"
              onClick={copyPost}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-[#377CF3] hover:bg-[#377CF3]/10"
            >
              <Copy size={16} />
              {copied ? '✓ Copié' : 'Copier'}
            </button>
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-white p-4 text-sm text-neutral-700 font-sans">
            {generatedPost}
          </pre>
        </div>
      )}
    </div>
  );
}
