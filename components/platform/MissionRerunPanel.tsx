'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';

type MissionRerunPanelProps = {
  missionId: string;
  currentBrief: string;
};

export function MissionRerunPanel({ missionId, currentBrief }: MissionRerunPanelProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [brief, setBrief] = useState(currentBrief);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bework-btn-secondary mt-4 inline-flex text-sm"
      >
        <RefreshCw size={16} />
        Relancer l&apos;IA avec un brief modifié
      </button>
    );
  }

  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-medium text-slate-800">Relancer le traitement</p>
      <textarea
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        rows={8}
        className="bework-input mt-2 font-mono text-sm"
      />
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          disabled={loading || !brief.trim()}
          className="bework-btn-primary text-sm"
          onClick={async () => {
            setLoading(true);
            setError(null);
            try {
              const res = await fetch(`/api/missions/${missionId}/rerun`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ brief }),
              });
              const data = (await res.json()) as { error?: string };
              if (!res.ok) throw new Error(data.error || 'Erreur');
              router.refresh();
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Erreur');
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? 'Relance…' : 'Relancer'}
        </button>
        <button type="button" className="bework-btn-secondary text-sm" onClick={() => setOpen(false)}>
          Annuler
        </button>
      </div>
    </div>
  );
}
