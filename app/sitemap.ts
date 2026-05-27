import type { MetadataRoute } from 'next';

const SITE = 'https://jezpereira.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE}/story`, lastModified: now, changeFrequency: 'yearly', priority: 0.9 },
    { url: `${SITE}/music`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/live`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/family`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
