import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { GrosOeuvreKitContent } from '@/components/platform/GrosOeuvreKitContent';
import { createAppPageMetadata } from '@/lib/bework/seo';

export const metadata: Metadata = createAppPageMetadata({
  title: 'Kit gros œuvre — outils Beworker',
  description:
    'Traitez les missions gros œuvre / CRM Construction : démarches, réservations, PV béton, AO bailleurs, situations, sous-traitance, DOE.',
  path: '/plateforme/outils/gros-oeuvre',
  index: false,
});

export default function GrosOeuvreKitPage() {
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
        <GrosOeuvreKitContent />
      </div>
    </div>
  );
}
