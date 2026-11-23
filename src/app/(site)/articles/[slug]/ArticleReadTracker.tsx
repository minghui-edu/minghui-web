'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

const MIN_SECONDS = 15;

/** 內文捲到 75% 且停留滿 15 秒，送一次 article_read */
export function ArticleReadTracker({ slug, title }: { slug: string; title: string }) {
  useEffect(() => {
    const body = document.querySelector('.article-body');
    if (!body) return;
    const startedAt = Date.now();

    const check = () => {
      const { top, height } = body.getBoundingClientRect();
      const reached = window.innerHeight - top >= height * 0.75;
      if (!reached || Date.now() - startedAt < MIN_SECONDS * 1000) return;
      stop();
      track('article_read', { item_category: 'article', item_name: title, content_id: slug });
    };
    const timer = window.setTimeout(check, MIN_SECONDS * 1000);
    const stop = () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', check);
    };

    window.addEventListener('scroll', check, { passive: true });
    return stop;
  }, [slug, title]);

  return null;
}
