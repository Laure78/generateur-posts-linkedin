import type { Metadata } from 'next';
import { DM_Sans, Outfit } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ variable: '--font-sans', subsets: ['latin'] });
const outfit = Outfit({ variable: '--font-display', subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'BeWork — Plateforme assistants travaux BTP',
    template: '%s | BeWork',
  },
  description:
    'Relais administratif des marchés travaux pour entreprises BTP et MOE. Assistants travaux augmentés par l\'IA, supervisés depuis la France.',
  metadataBase: new URL('https://www.bework.fr'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${dmSans.variable} ${outfit.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
