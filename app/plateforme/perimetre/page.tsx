import type { Metadata } from 'next';
import { Suspense } from 'react';
import { createAppPageMetadata } from '@/lib/bework/seo';
import { PerimetrePageContent } from '@/components/platform/PerimetrePageContent';

export const metadata: Metadata = createAppPageMetadata({
  title: 'Périmètre BeWork',
  description:
    'Ce que BeWork prend en charge et ce qui reste du ressort de l’entreprise travaux.',
  path: '/plateforme/perimetre',
  index: false,
});

export default function PlateformePerimetrePage() {
  return (
    <Suspense fallback={<div className="px-6 py-8 text-sm text-[#64748B]">Chargement…</div>}>
      <PerimetrePageContent />
    </Suspense>
  );
}
