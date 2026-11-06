export type ArticleCategory = 'overseas' | 'exploration' | 'tutor' | 'study';

export const categories: Record<ArticleCategory, { label: string; ctaText: string; ctaHref: string }> = {
  overseas:    { label: '海外升學', ctaText: '想親自走進海外名校？',     ctaHref: '/overseas' },
  exploration: { label: '科系探索', ctaText: '想更了解自己適合的科系？', ctaHref: '/exploration' },
  tutor:       { label: '家教選擇', ctaText: '想找適合孩子的老師？',     ctaHref: '/tutor' },
  study:       { label: '讀書方法', ctaText: '想看學霸怎麼整理重點？',   ctaHref: '/notes' },
};

export type ArticleCard = {
  title: string;
  slug: string;
  category: ArticleCategory;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  authorName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cover: any;
};

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('zh-TW', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(date));
}
