import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { PortableText, type PortableTextComponents } from 'next-sanity';
import { sanityClient } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { categories, formatDate } from '@/lib/articleMeta';
import { getArticle, getRelatedArticles } from '@/lib/articles';
import { ArticleCardItem } from '../ArticlesGrid';

export const revalidate = 60;

const BASE_URL = 'https://www.minghuiedu.com';
const inner = 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8';

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient
    .fetch(`*[_type == "article" && defined(slug.current)]{ "slug": slug.current }`)
    .catch(() => []);
  return slugs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  const title = article.seoTitle ?? article.title;
  const description = article.seoDescription ?? article.summary;
  const url = `${BASE_URL}/articles/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: `${title} | 明慧教育`,
      description,
      url,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      images: [{ url: urlFor(article.cover).width(1200).height(630).fit('crop').url(), width: 1200, height: 630 }],
    },
  };
}

const bodyComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure>
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt ?? ''}
          width={1200}
          height={675}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, 720px"
        />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
    table: ({ value }) => {
      const [head, ...rows]: { cells?: string[] }[] = value.rows ?? [];
      return (
        <div className="article-table">
          <table>
            {head && <thead><tr>{head.cells?.map((cell, i) => <th key={i} scope="col">{cell}</th>)}</tr></thead>}
            <tbody>
              {rows.map((row, r) => <tr key={r}>{row.cells?.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? '#';
      return href.startsWith('/')
        ? <Link href={href}>{children}</Link>
        : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
    },
  },
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article.category, slug);
  const category = categories[article.category];
  const url = `${BASE_URL}/articles/${slug}`;
  const modified = article.updatedAt ?? article.publishedAt;
  const authorUrl = article.author?.id ? `/tutor/${article.author.id}` : undefined;

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.seoDescription ?? article.summary,
      image: urlFor(article.cover).width(1200).height(630).fit('crop').url(),
      datePublished: article.publishedAt,
      dateModified: modified,
      author: { '@type': 'Person', name: article.author?.name, ...(authorUrl && { url: `${BASE_URL}${authorUrl}` }) },
      publisher: { '@type': 'Organization', name: '明慧教育', url: BASE_URL },
      mainEntityOfPage: url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首頁', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: '升學文章', item: `${BASE_URL}/articles` },
        { '@type': 'ListItem', position: 3, name: article.title, item: url },
      ],
    },
  ];

  return (
    <div style={{ background: 'var(--surface)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, '\\u003c') }}
      />
      <article className={`${inner} py-12`}>
        <nav aria-label="頁面路徑" className="text-xs mb-6" style={{ color: 'var(--muted)' }}>
          <Link href="/" className="hover:underline">首頁</Link>
          {' / '}
          <Link href="/articles" className="hover:underline">升學文章</Link>
          {' / '}
          <span>{category?.label}</span>
        </nav>

        <h1 className="font-display font-bold leading-[1.3] mb-4" style={{ color: 'var(--navy)', fontSize: 'clamp(1.75rem, 4.5vw, 2.5rem)' }}>
          {article.title}
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
          {article.author?.name} · 最後更新 {formatDate(modified)} · 閱讀 {article.readingMinutes} 分鐘
        </p>

        <div className="relative mb-8" style={{ aspectRatio: '16 / 9', background: 'var(--border-light)' }}>
          <Image
            src={urlFor(article.cover).width(1440).height(810).fit('crop').url()}
            alt={article.cover?.alt ?? article.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>

        <aside className="p-6 mb-10" style={{ background: 'var(--cream)', borderLeft: '4px solid var(--accent)' }}>
          <p className="font-semibold text-sm mb-2" style={{ color: 'var(--navy)' }}>本文重點</p>
          <p className="text-base leading-relaxed" style={{ color: 'var(--navy)' }}>{article.summary}</p>
        </aside>

        <div className="article-body">
          <PortableText value={article.body} components={bodyComponents} />
        </div>

        {category && (
          <div className="mt-12 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ background: 'var(--navy)' }}>
            <p className="font-display font-bold text-xl text-white">{category.ctaText}</p>
            <Link href={category.ctaHref} className="hero-cta-primary inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm shrink-0">
              了解更多
              <ChevronRight aria-hidden="true" size={15} />
            </Link>
          </div>
        )}

        {article.author && (
          <div className="mt-10 pt-8 flex items-center gap-4" style={{ borderTop: '1px solid var(--border-light)' }}>
            <div className="w-16 h-16 rounded-full shrink-0 overflow-hidden flex items-center justify-center font-display font-bold" style={{ background: 'rgba(11,10,63,0.07)', color: 'var(--navy)' }}>
              {article.author.photo ? (
                <Image src={urlFor(article.author.photo).width(128).height(128).fit('crop').url()} alt={article.author.name} width={64} height={64} className="object-cover w-full h-full" />
              ) : (
                <span aria-hidden="true">{article.author.name[0]}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>關於作者</p>
              {authorUrl ? (
                <Link href={authorUrl} className="font-bold hover:underline" style={{ color: 'var(--navy)' }}>{article.author.name}</Link>
              ) : (
                <p className="font-bold" style={{ color: 'var(--navy)' }}>{article.author.name}</p>
              )}
              {article.author.title && <p className="text-sm" style={{ color: 'var(--muted)' }}>{article.author.title}</p>}
              {article.author.shortExp && <p className="text-sm" style={{ color: 'var(--muted)' }}>{article.author.shortExp}</p>}
            </div>
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section style={{ background: 'var(--cream)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h2 className="font-display font-bold text-2xl mb-8" style={{ color: 'var(--navy)' }}>相關文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => <ArticleCardItem key={item.slug} article={item} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
