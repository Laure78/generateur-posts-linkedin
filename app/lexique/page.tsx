import type { Metadata } from 'next';
import { LexiqueApp } from '@/components/lexique/LexiqueApp';

export const metadata: Metadata = {
  title: 'Lexique & apprentissage BTP',
  description:
    'Parcours guidés, schémas et lexique interactif pour comprendre le vocabulaire des marchés publics et du chantier.',
};

export default function LexiquePage() {
  return <LexiqueApp />;
}
