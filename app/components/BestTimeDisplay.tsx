'use client';

import { useState, useEffect } from 'react';

export default function BestTimeDisplay({ sector = 'btp' }: { sector?: string }) {
  const [data, setData] = useState<{ times: string[]; note: string } | null>(null);

  useEffect(() => {
    fetch(`/api/best-posting-time?sector=${sector}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, [sector]);

  if (!data) return <p className="text-xs text-neutral-500">Chargement…</p>;
  return (
    <div className="text-xs text-neutral-600">
      <p className="mb-1">{data.times.join(' • ')}</p>
      <p className="text-neutral-500">{data.note}</p>
    </div>
  );
}
