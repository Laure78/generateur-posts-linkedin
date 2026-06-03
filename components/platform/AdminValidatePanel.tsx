'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

type AdminValidatePanelProps = {
  missionId: string;
  alreadyValidated: boolean;
  validatedAt?: string | null;
  validationNote?: string | null;
};

export function AdminValidatePanel({
  missionId,
  alreadyValidated,
  validatedAt,
  validationNote,
}: AdminValidatePanelProps) {
  const router = useRouter();
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (alreadyValidated) {
    return (
      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="inline-flex items-center gap-2 font-semibold text-emerald-900">
          <CheckCircle2 size={20} />
          Validé par le chef d&apos;équipe
        </p>
        {validatedAt && (
          <p className="mt-1 text-sm text-emerald-800">
            {new Date(validatedAt).toLocaleString('fr-FR')}
          </p>
        )}
        {validationNote && (
          <p className="mt-2 text-sm text-emerald-900/90">{validationNote}</p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border border-[var(--bework-blue)]/25 bg-[var(--bework-blue-soft)] p-5">
      <p className="inline-flex items-center gap-2 font-semibold text-[var(--bework-navy)]">
        <ShieldCheck size={20} className="text-[var(--bework-blue)]" />
        Validation chef d&apos;équipe
      </p>
      <p className="mt-2 text-sm text-slate-600">
        Après relecture du livrable, validez pour autoriser la transmission au MOEX ou au client.
      </p>
      <label htmlFor="validation-note" className="mt-4 block text-sm font-medium text-slate-700">
        Note (optionnel)
      </label>
      <textarea
        id="validation-note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        className="bework-input mt-1.5 resize-y text-sm"
        placeholder="Ex. : Validé après correction lot 03"
      />
      {error && (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      <button
        type="button"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          setError(null);
          try {
            const res = await fetch(`/api/missions/${missionId}/validate`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ note }),
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
        className="bework-btn-primary mt-4"
      >
        <CheckCircle2 size={18} />
        {loading ? 'Validation…' : 'Valider le livrable'}
      </button>
    </div>
  );
}
