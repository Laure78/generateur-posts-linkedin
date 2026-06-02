'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';

type MissionSkillRunnerProps = {
  missionId: string;
  status: string;
  aiResult: string | null;
  integrated: boolean;
  skillName: string;
};

export function MissionSkillRunner({
  missionId,
  status,
  aiResult,
  integrated,
  skillName,
}: MissionSkillRunnerProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const waiting = !integrated && !aiResult && (status === 'recue' || status === 'en_cours');

  const triggerRun = useCallback(async () => {
    setRunning(true);
    setError(null);
    try {
      const res = await fetch('/api/skills/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ missionId }),
      });
      const data = (await res.json()) as {
        error?: string;
        processing?: boolean;
      };

      if (!res.ok) {
        throw new Error(data.error || 'Traitement impossible');
      }

      if (!data.processing) {
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de traitement');
    } finally {
      setRunning(false);
    }
  }, [missionId, router]);

  useEffect(() => {
    if (!waiting) return;

    if (status === 'recue') {
      void triggerRun();
      return;
    }

    const poll = window.setInterval(() => router.refresh(), 3000);
    return () => window.clearInterval(poll);
  }, [waiting, status, triggerRun, router]);

  if (!waiting && !running) return null;

  if (error) {
    return (
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800">
        <AlertCircle size={20} className="mt-0.5 shrink-0" />
        <div>
          <p className="font-medium">Le traitement a échoué</p>
          <p className="mt-1">{error}</p>
          <button
            type="button"
            onClick={() => void triggerRun()}
            className="mt-3 font-medium text-[var(--bework-blue)] hover:underline"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bework-card-tech bework-card mt-6 flex items-center gap-4 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--bework-blue-soft)]">
        <Loader2 size={22} className="animate-spin text-[var(--bework-blue)]" />
      </div>
      <div>
        <p className="font-semibold text-[var(--bework-navy)]">Traitement en cours…</p>
        <p className="mt-1 text-sm text-slate-600">
          L&apos;assistant <strong>{skillName}</strong> traite votre demande avec le skill sélectionné.
        </p>
      </div>
    </div>
  );
}
