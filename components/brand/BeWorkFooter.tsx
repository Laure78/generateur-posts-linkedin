import { ExternalLink } from 'lucide-react';
import { BEWORK } from '@/lib/bework/config';

type BeWorkFooterProps = {
  className?: string;
  /** Version courte pour la plateforme et l’auth */
  compact?: boolean;
};

export function BeWorkFooter({ className = '', compact = false }: BeWorkFooterProps) {
  const siteHost = new URL(BEWORK.url).host.replace(/^www\./, '');

  return (
    <footer
      className={`border-t border-slate-200/80 bg-white/90 px-4 py-6 text-center text-sm text-slate-600 backdrop-blur-sm ${className}`}
    >
      {!compact && (
        <p className="font-medium text-[var(--bework-navy)]">
          {BEWORK.name} — {BEWORK.brandTagline}
        </p>
      )}
      <p className={compact ? '' : 'mt-2'}>
        <a
          href={BEWORK.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 font-semibold text-[var(--bework-blue)] hover:underline"
        >
          {siteHost}
          <ExternalLink size={14} aria-hidden />
        </a>
        {!compact && (
          <>
            <span className="mx-2 text-slate-300">·</span>
            <a
              href={`mailto:${BEWORK.email}`}
              className="font-medium text-slate-500 hover:text-[var(--bework-blue)] hover:underline"
            >
              {BEWORK.email}
            </a>
          </>
        )}
      </p>
      {!compact && (
        <p className="mt-3 text-xs text-slate-400">
          © {new Date().getFullYear()} {BEWORK.name} — Relais administratif marchés travaux BTP
        </p>
      )}
    </footer>
  );
}
