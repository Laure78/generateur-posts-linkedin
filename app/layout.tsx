import type { Metadata } from 'next';
import { DM_Sans, Outfit } from 'next/font/google';
import { getSiteUrl } from '@/lib/bework/site-url';
import './globals.css';

const dmSans = DM_Sans({ variable: '--font-sans', subsets: ['latin'] });
const outfit = Outfit({ variable: '--font-display', subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'BeWork — Plateforme assistants MOEX',
    template: '%s | BeWork MOEX',
  },
  description:
    "Connexion à la plateforme BeWork pour les assistants MOEX : dépôt de demandes, suivi des livrables et assistants chantier augmentés par l'IA, supervisés depuis la France.",
  metadataBase: new URL(getSiteUrl()),
  manifest: '/manifest.webmanifest',
  themeColor: '#2563EB',
  appleWebApp: {
    capable: true,
    title: 'BeWork',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/icon-192.png', sizes: '180x180', type: 'image/png' }],
  },
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
