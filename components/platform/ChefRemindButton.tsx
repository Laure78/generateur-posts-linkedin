'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';

type ChefRemindButtonProps = {
  overdueCount: number;
};

export function ChefRemindButton({ overdueCount }: ChefRemindButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (overdueCount === 0) return null;

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          setMessage(null);
          try {
            const res = await fetch('/api/admin/remind-pending', { method: 'POST' });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? 'Erreur');
            setMessage(data.message ?? 'Rappel enregistré.');
          } catch (e) {
            setMessage(e instanceof Error ? e.message : 'Erreur');
          } finally {
            setLoading(false);
          }
        }}
        className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100 disabled:opacity-50"
      >
        <Bell size={14} />
        {loading ? 'Envoi…' : `Rappeler (${overdueCount})`}
      </button>
      {message && <span className="text-xs text-slate-500">{message}</span>}
    </div>
  );
}
