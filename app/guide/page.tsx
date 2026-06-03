import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BeWorkFooter } from '@/components/brand/BeWorkFooter';
import { BeWorkLogo } from '@/components/brand/BeWorkLogo';
import { PlatformGuideContent } from '@/components/platform/PlatformGuideContent';

export const metadata: Metadata = {
  title: "Guide BeWork — assistants travaux & demandes MOEX",
  description:
    "Tutoriel pour les Beworkers : traiter les demandes MOEX externalisées, précautions et vérification obligatoire.",
  robots: { index: true, follow: true },
};

export default function GuidePublicPage() {
  return (
    <div className="bework-blueprint-bg flex min-h-dvh flex-col">
      <header className="border-b border-slate-200/80 bg-white/90 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4">
          <BeWorkLogo variant="header" href="/" showTagline={false} />
          <Link href="/auth/connexion" className="bework-btn-secondary text-sm">
            Se connecter
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-8 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/auth/connexion"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--bework-blue)] hover:underline"
          >
            <ArrowLeft size={16} />
            Retour à la connexion Beworker
          </Link>
          <div className="mt-6">
            <PlatformGuideContent />
          </div>
        </div>
      </main>

      <BeWorkFooter className="mt-auto shrink-0" />
    </div>
  );
}
