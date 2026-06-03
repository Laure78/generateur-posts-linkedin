import { Lock } from 'lucide-react';

/** Accès réservé aux équipes MOEX — affiché sur les pages d'authentification. */
export function AuthBeworkerBadge() {
  return (
    <p className="mx-auto mt-4 inline-flex max-w-md items-center justify-center gap-2 rounded-full border border-[var(--bework-blue)]/25 bg-[var(--bework-blue-soft)] px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-[var(--bework-navy)]">
      <Lock size={14} className="shrink-0 text-[var(--bework-blue)]" aria-hidden />
      Accès Beworker — outil interne MOEX
    </p>
  );
}
