'use client';

import { useRef, useState } from 'react';
import { FileUp, Loader2, X } from 'lucide-react';

type BriefFileUploadProps = {
  onTextExtracted: (text: string, fileName: string) => void;
  disabled?: boolean;
};

const ACCEPT = '.pdf,.doc,.docx,.txt,.md,.csv';

export function BriefFileUpload({ onTextExtracted, disabled }: BriefFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFile, setLastFile] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setLoading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/extract-file-text', { method: 'POST', body: form });
      const data = (await res.json()) as { text?: string; error?: string };
      if (!res.ok) throw new Error(data.error || 'Extraction impossible');
      const text = data.text?.trim();
      if (!text) throw new Error('Aucun texte extrait de ce fichier');
      setLastFile(file.name);
      onTextExtracted(text, file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
      setLastFile(null);
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
      <p className="text-sm font-medium text-slate-700">Importer une pièce (PDF, Word, texte)</p>
      <p className="mt-1 text-xs text-slate-500">
        Le texte est extrait et ajouté au contenu de la demande (max 10 Mo).
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          disabled={disabled || loading}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleFile(f);
          }}
        />
        <button
          type="button"
          disabled={disabled || loading}
          onClick={() => inputRef.current?.click()}
          className="bework-btn-secondary inline-flex text-sm"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <FileUp size={16} />}
          {loading ? 'Extraction…' : 'Choisir un fichier'}
        </button>
        {lastFile && !loading && (
          <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-xs text-emerald-800">
            {lastFile}
            <button
              type="button"
              className="rounded p-0.5 hover:bg-emerald-100"
              aria-label="Effacer l’indication de fichier"
              onClick={() => setLastFile(null)}
            >
              <X size={12} />
            </button>
          </span>
        )}
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
