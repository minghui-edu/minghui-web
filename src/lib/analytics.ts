/** GA4 事件的共用參數，名稱要和 GA4 後台的自訂維度一致 */
export type TrackParams = {
  cta_location?: string;
  item_name?: string;
  item_category?: string;
  line_keyword?: string;
  content_id?: string;
};

/** 只送匿名的動作，不送姓名、聯絡方式、成績或作答內容 */
export function track(event: string, params: TrackParams = {}) {
  const { gtag } = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof gtag === 'function') gtag('event', event, params);
}

const CATEGORY_BY_PATH: Record<string, string> = {
  '': 'home',
  about: 'about',
  exploration: 'camp',
  overseas: 'overseas',
  notes: 'notes',
  tutor: 'tutor',
  thesis: 'thesis',
  articles: 'article',
  'major-quiz': 'quiz',
  'gsat-check': 'gsat',
};

/** 從網址推出服務類別與內容編號，例如 /notes/english_note → notes、english_note */
export function pageParams(pathname: string): TrackParams {
  const [section = '', id] = pathname.split('/').filter(Boolean);
  return {
    item_category: CATEGORY_BY_PATH[section] ?? section,
    ...(id && { content_id: decodeURIComponent(id) }),
  };
}
