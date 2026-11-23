'use client';

import { useEffect } from 'react';
import { pageParams, track } from '@/lib/analytics';

const LINE_HOST = /(^|\.)(lin\.ee|line\.me)$/;

function isLineLink(el: Element) {
  return el instanceof HTMLAnchorElement && LINE_HOST.test(el.hostname);
}

function defaultLocation(el: Element) {
  if (el.closest('footer')) return 'footer';
  if (el.closest('header')) return 'nav';
  return 'page';
}

/**
 * 全站點擊追蹤：在按鈕或連結加上 data-track="事件名稱" 就會送 GA4 事件。
 * 連到 LINE 的連結不用加，一律送 line_click；同時有 data-track 時兩個事件都送。
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const el = e.target.closest<HTMLElement>('a, button');
      if (!el) return;

      const { track: event, ctaLocation, itemName, itemCategory, contentId, lineKeyword } = el.dataset;
      const isLine = isLineLink(el);
      if (!event && !isLine) return;

      const params = {
        ...pageParams(window.location.pathname),
        cta_location: ctaLocation ?? defaultLocation(el),
        ...(itemName && { item_name: itemName }),
        ...(itemCategory && { item_category: itemCategory }),
        ...(contentId && { content_id: contentId }),
        ...(lineKeyword && { line_keyword: lineKeyword }),
      };
      if (isLine) track('line_click', params);
      if (event && event !== 'line_click') track(event, params);
    };

    // capture：元件內有 stopPropagation 時也收得到
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
