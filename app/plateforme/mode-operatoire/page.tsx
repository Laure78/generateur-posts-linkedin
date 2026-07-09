import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AssistantTravauxOfferingContent } from '@/components/platform/AssistantTravauxOfferingContent';
import { createAppPageMetadata } from '@/lib/bework/seo';

export const metadata: Metadata = createAppPageMetadata({
  title: 'Mode opératoire — Assistant travaux externalisé',
  description:
    "Méthode BeWork : 4 phases de cadrage, mode opératoire J0 à DOE, périmètre client et livrables types pour les entreprises d'exécution.",
  path: '/plateforme/mode-operatoire',
  index: false,
});

export default function PlateformeModeOperatoirePage() {
  return (
    <div className="px-6 py-8 lg:px-10">
      <Link
        href="/plateforme"
        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--bework-blue)] hover:underline"
      >
        <ArrowLeft size={16} />
        Tableau de bord
      </Link>

      <div className="mx-auto mt-6 max-w-4xl">
        <AssistantTravauxOfferingContent />
      </div>
    </div>
  );
}
