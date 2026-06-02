'use client';

import { useEffect, useState } from 'react';

/** Vérifie Supabase côté serveur (variables Railway), pas le bundle client. */
export function useSupabaseReady() {
  const [ready, setReady] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/health/supabase')
      .then((r) => r.json())
      .then((d: { ok?: boolean }) => setReady(Boolean(d.ok)))
      .catch(() => setReady(false));
  }, []);

  return ready;
}
