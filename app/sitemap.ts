import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/bework/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  return [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/auth/connexion`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/auth/inscription`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    {
      url: `${baseUrl}/plateforme/outils/verification-dtu`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    { url: `${baseUrl}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cgu`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cgv`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    { url: `${baseUrl}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
