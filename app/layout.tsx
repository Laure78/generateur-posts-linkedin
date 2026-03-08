import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Laure Olivié — Créateur de contenu LinkedIn",
    template: "%s | Laure Olivié"
  },
  description: "Plateforme outil dédiée à la création de contenu pour LinkedIn. Générateur de posts, idées, accroches et suivi pour développer ta présence professionnelle.",
  keywords: ["LinkedIn", "création de contenu", "posts LinkedIn", "générateur de posts", "Laure Olivié", "réseau professionnel"],
  authors: [{ name: "Laure Olivié", url: "https://www.linkedin.com/in/laure-olivie/" }],
  creator: "Laure Olivié",
  metadataBase: new URL("https://laureolivie.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://laureolivie.fr",
    siteName: "Laure Olivié — Créateur LinkedIn",
    title: "Laure Olivié — Créateur de contenu LinkedIn",
    description: "Plateforme outil dédiée à la création de contenu pour LinkedIn. Générateur de posts, idées et suivi.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laure Olivié — Créateur LinkedIn",
    description: "Plateforme de création de contenu pour LinkedIn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: '#FAFBFC',
          color: '#1a202c',
        }}
      >
        {children}
      </body>
    </html>
  );
}
