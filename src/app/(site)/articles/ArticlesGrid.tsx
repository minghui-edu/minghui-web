'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import { categories, formatDate, type ArticleCard, type ArticleCategory } from '@/lib/articleMeta';

type Filter = 'all' | ArticleCategory;

export function ArticleCardItem({ article }: { article: ArticleCard }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group bg-white flex flex-col overflow-hidden transition-shadow duration-200 hover:shadow-lg"
      style={{ border: '1px solid var(--border)' }}
    >
      <div className="relative" style={{ aspectRatio: '16 / 9', background: 'var(--border-light)' }}>
        <Image
          src={urlFor(article.cover).width(720).height(405).fit('crop').url()}
          alt={article.cover?.alt ?? article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-xs font-bold tracking-[0.1em] mb-2" style={{ color: 'var(--accent)' }}>
          {categories[article.category]?.label}
        </p>
        <h2 className="font-display font-bold text-lg leading-snug mb-3" style={{ color: 'var(--navy)' }}>
          {article.title}
        </h2>
        <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--muted)' }}>{article.summary}</p>
        <p className="text-xs mt-auto" style={{ color: 'var(--muted)' }}>
          {article.authorName} · {formatDate(article.updatedAt ?? article.publishedAt)} · 閱讀 {article.readingMinutes} 分鐘
        </p>
      </div>
    </Link>
  );
}

export default function ArticlesGrid({ articles }: { articles: ArticleCard[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  const shown = filter === 'all' ? articles : articles.filter((a) => a.category === filter);
  const filters: { value: Filter; label: string }[] = [
    { value: 'all', label: '全部' },
    ...(Object.keys(categories) as ArticleCategory[]).map((value) => ({ value, label: categories[value].label })),
  ];

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="篩選文章分類">
        {filters.map(({ value, label }) => {
          const isActive = filter === value;
          return (
            <button
              key={value}
              onClick={() => setFilter(value)}
              aria-pressed={isActive}
              className="px-4 py-1.5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              style={{
                background: isActive ? 'var(--accent)' : 'transparent',
                color: isActive ? 'var(--navy)' : 'var(--muted)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '9999px',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
      {shown.length === 0 ? (
        <p className="py-8" style={{ color: 'var(--muted)' }}>這個分類的文章整理中，敬請期待。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shown.map((article) => <ArticleCardItem key={article.slug} article={article} />)}
        </div>
      )}
    </>
  );
}
