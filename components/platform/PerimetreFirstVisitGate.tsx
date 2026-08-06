'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const STORAGE_KEY = 'bework_perimetre_seen';

/**
 * Affiche la page Périmètre une fois à la 1ʳᵉ connexion
 * (sauf si l'utilisateur a coché « ne plus afficher »).
 */
export function PerimetreFirstVisitGate() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathname?.startsWith('/plateforme/perimetre')) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return;
      router.replace('/plateforme/perimetre?first=1');
    } catch {
      /* localStorage indisponible */
    }
  }, [pathname, router]);

  return null;
}

export function markPerimetreSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* ignore */
  }
}

export function isPerimetreSeen(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}
