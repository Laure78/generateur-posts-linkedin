import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MissionsParLotContent } from '@/components/platform/MissionsParLotContent';
import { createAppPageMetadata } from '@/lib/bework/seo';

export const metadata: Metadata = createAppPageMetadata({
  title: 'Missions confiées — par lot et transversales',
  description:
    'Catalogue des missions BeWork confiables : missions transversales et missions spécifiques lots 01 à 16 (gros œuvre, fluides, VRD, désamiantage…).',
  path: '/plateforme/missions',
  index: false,
});

export default function PlateformeMissionsPage() {
  return (
    <div className="px-6 py-8 lg:px-10">
      <Link
        href="/plateforme"
        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--bework-blue)] hover:underline"
      >
        <ArrowLeft size={16} />
        Tableau de bord
      </Link>
      <div className="mt-6">
        <MissionsParLotContent />
      </div>
    </div>
  );
}
