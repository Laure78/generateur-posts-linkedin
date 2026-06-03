import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PlatformGuideContent } from '@/components/platform/PlatformGuideContent';

export const metadata: Metadata = {
  title: 'Ressources — Guide BeWork MOEX',
  description:
    "Bon usage de BeWork, précautions et obligation de vérification des livrables IA avant diffusion.",
  robots: { index: false, follow: false },
};

export default function PlateformeRessourcesPage() {
  return (
    <div className="px-6 py-8 lg:px-10">
      <Link
        href="/plateforme"
        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--bework-blue)] hover:underline"
      >
        <ArrowLeft size={16} />
        Tableau de bord
      </Link>
      <p className="mt-4 text-sm text-slate-500">
        <a href="/guide" className="font-medium text-[var(--bework-blue)] hover:underline">
          Lien public du guide
        </a>{' '}
        (partageable avant connexion).
      </p>
      <div className="mt-6">
        <PlatformGuideContent />
      </div>
    </div>
  );
}
