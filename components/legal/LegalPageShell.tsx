import Link from 'next/link';
import { BeWorkLogo } from '@/components/brand/BeWorkLogo';
import { BeWorkFooter } from '@/components/brand/BeWorkFooter';
import { LEGAL } from '@/lib/bework/legal';
import { LEGAL_NAV } from '@/lib/bework/legal-nav';
import { ArrowLeft } from 'lucide-react';

type LegalPageShellProps = {
  title: string;
  children: React.ReactNode;
};

export function LegalPageShell({ title, children }: LegalPageShellProps) {
  return (
    <div className="bework-blueprint-bg flex min-h-screen flex-col">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-[4.5rem] max-w-4xl items-center justify-between px-4 lg:px-6">
          <BeWorkLogo variant="header" href="/" showTagline={false} />
          <Link href="/" className="bework-btn-ghost text-sm">
            <ArrowLeft size={16} />
            Accueil
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 lg:px-6 lg:py-14">
        <nav aria-label="Documents juridiques" className="mb-8 flex flex-wrap gap-2 text-sm">
          {LEGAL_NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600 transition-colors hover:border-[var(--bework-blue)]/40 hover:text-[var(--bework-blue)]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <article className="bework-card legal-prose p-6 sm:p-8">
          <header className="border-b border-slate-100 pb-6">
            <h1 className="font-display text-2xl font-bold text-[var(--bework-navy)] sm:text-3xl">{title}</h1>
            <p className="mt-2 text-sm text-slate-500">Dernière mise à jour : {LEGAL.lastUpdated}</p>
          </header>
          <div className="mt-8">{children}</div>
        </article>
      </main>

      <BeWorkFooter />
    </div>
  );
}
