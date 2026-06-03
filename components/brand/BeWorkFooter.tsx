import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { BEWORK } from '@/lib/bework/config';
import { LEGAL_NAV } from '@/lib/bework/legal-nav';

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

      <nav
        aria-label="Informations légales"
        className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-2 ${compact ? 'text-xs' : 'mt-4 text-xs sm:text-sm'}`}
      >
        {LEGAL_NAV.map(({ href, label }, i) => (
          <span key={href} className="inline-flex items-center gap-3">
            {i > 0 && <span className="hidden text-slate-300 sm:inline" aria-hidden>|</span>}
            <Link
              href={href}
              className="font-medium text-slate-600 hover:text-[var(--bework-blue)] hover:underline"
            >
              {label}
            </Link>
          </span>
        ))}
      </nav>

      <p className={compact ? 'mt-3' : 'mt-4'}>
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

      <p className={`text-xs text-slate-400 ${compact ? 'mt-2' : 'mt-3'}`}>
        © {new Date().getFullYear()} {BEWORK.name} — {BEWORK.tagline}
      </p>
    </footer>
  );
}
