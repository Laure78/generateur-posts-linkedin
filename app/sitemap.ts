import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/bework/site-url';

/** Une seule URL indexable : la landing d'accès à la plateforme. */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
