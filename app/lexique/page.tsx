import type { Metadata } from 'next';
import { LexiqueApp } from '@/components/lexique/LexiqueApp';
import { createAppPageMetadata } from '@/lib/bework/seo';

export const metadata: Metadata = createAppPageMetadata({
  title: 'Lexique & apprentissage BTP',
  description:
    'Parcours guidés, schémas et lexique interactif pour comprendre le vocabulaire des marchés publics et du chantier.',
  path: '/lexique',
  index: false,
});

export default function LexiquePage() {
  return <LexiqueApp />;
}
