import { sanityClient } from '@/lib/sanity/client';
import type { ArticleCard, ArticleCategory } from '@/lib/articleMeta';

export type Article = ArticleCard & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  seoTitle?: string;
  seoDescription?: string;
  author?: {
    name: string;
    title?: string;
    shortExp?: string;
    id?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    photo?: any;
  };
};

/** 只顯示發布日期已到的文章（草稿本來就不會被查到） */
const PUBLISHED = `_type == "article" && defined(slug.current) && publishedAt <= now()`;

const CARD_FIELDS = `
  title,
  "slug": slug.current,
  category,
  summary,
  publishedAt,
  updatedAt,
  cover,
  "authorName": author->name,
  "readingMinutes": round(length(pt::text(body)) / 400) + 1
`;

const fetchOptions = { next: { revalidate: 60 } };

export function getArticles(): Promise<ArticleCard[]> {
  return sanityClient
    .fetch<ArticleCard[]>(`*[${PUBLISHED}] | order(publishedAt desc){ ${CARD_FIELDS} }`, {}, fetchOptions)
    .catch(() => []);
}

export function getArticle(slug: string): Promise<Article | null> {
  return sanityClient.fetch<Article | null>(
    `*[${PUBLISHED} && slug.current == $slug][0]{
      ${CARD_FIELDS},
      body,
      seoTitle,
      seoDescription,
      "author": author->{ name, title, shortExp, photo, "id": slug.current }
    }`,
    { slug },
    fetchOptions
  );
}

export function getRelatedArticles(category: ArticleCategory, slug: string): Promise<ArticleCard[]> {
  return sanityClient
    .fetch<ArticleCard[]>(
      `*[${PUBLISHED} && category == $category && slug.current != $slug] | order(publishedAt desc)[0...3]{ ${CARD_FIELDS} }`,
      { category, slug },
      fetchOptions
    )
    .catch(() => []);
}

/** 導覽列用：還沒有文章時不顯示「升學文章」 */
export function hasArticles(): Promise<boolean> {
  return sanityClient
    .fetch<number>(`count(*[${PUBLISHED}])`, {}, fetchOptions)
    .then((count) => count > 0)
    .catch(() => false);
}
