import type { MetadataRoute } from 'next';
import { sanityClient } from '@/lib/sanity/client';

const BASE_URL = 'https://www.minghuiedu.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/exploration`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/overseas`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/tutor`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/notes`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/thesis`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Dynamic: exploration activities
  const camps: { slug: { current: string }; _updatedAt: string }[] = await sanityClient
    .fetch(`*[_type == "activity" && defined(slug.current)]{ slug, _updatedAt }`)
    .catch(() => []);

  const campPages: MetadataRoute.Sitemap = camps.map((c) => ({
    url: `${BASE_URL}/exploration/${c.slug.current}`,
    lastModified: c._updatedAt,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic: notes
  const notes: { slug: { current: string }; _updatedAt: string }[] = await sanityClient
    .fetch(`*[_type == "note" && defined(slug.current)]{ slug, _updatedAt }`)
    .catch(() => []);

  const notePages: MetadataRoute.Sitemap = notes.map((n) => ({
    url: `${BASE_URL}/notes/${n.slug.current}`,
    lastModified: n._updatedAt,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  // Dynamic: tutors
  const tutors: { slug: { current: string }; _updatedAt: string }[] = await sanityClient
    .fetch(`*[_type == "tutor" && defined(slug.current)]{ slug, _updatedAt }`)
    .catch(() => []);

  const tutorPages: MetadataRoute.Sitemap = tutors.map((t) => ({
    url: `${BASE_URL}/tutor/${t.slug.current}`,
    lastModified: t._updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic: articles（還沒有文章時不列入 /articles）
  const articles: { slug: { current: string }; _updatedAt: string }[] = await sanityClient
    .fetch(`*[_type == "article" && defined(slug.current) && publishedAt <= now()]{ slug, _updatedAt }`)
    .catch(() => []);

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/articles/${a.slug.current}`,
    lastModified: a._updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const articleIndex: MetadataRoute.Sitemap = articles.length > 0
    ? [{ url: `${BASE_URL}/articles`, changeFrequency: 'weekly', priority: 0.8 }]
    : [];

  return [...staticPages, ...articleIndex, ...campPages, ...notePages, ...tutorPages, ...articlePages];
}
