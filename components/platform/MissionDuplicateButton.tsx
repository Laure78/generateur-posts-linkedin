'use client';

import { useRouter } from 'next/navigation';
import { Copy } from 'lucide-react';
import { useState } from 'react';

export function MissionDuplicateButton({ missionId }: { missionId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      className="bework-btn-secondary inline-flex text-sm"
      onClick={async () => {
        setLoading(true);
        const res = await fetch(`/api/missions/${missionId}/duplicate`, { method: 'POST' });
        const data = (await res.json()) as { id?: string; error?: string };
        setLoading(false);
        if (data.id) router.push(`/plateforme/demandes/${data.id}`);
      }}
    >
      <Copy size={16} />
      {loading ? 'Copie…' : 'Dupliquer la demande'}
    </button>
  );
}
