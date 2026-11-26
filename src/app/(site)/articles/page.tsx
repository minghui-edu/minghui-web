import type { Metadata } from 'next';
import { ParallaxBg } from '@/components/ui/ParallaxBg';
import { FadeIn } from '@/components/ui/FadeIn';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { notFound } from 'next/navigation';
import { getArticles } from '@/lib/articles';
import ArticlesGrid from './ArticlesGrid';

export const revalidate = 60;

const inner = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

export const metadata: Metadata = {
  title: '升學文章',
  description: '給高中生與家長的升學資訊：營隊選擇、科系探索、家教費用、讀書方法與海外升學，由明慧教育團隊整理第一手經驗。',
  openGraph: {
    title: '升學文章 | 明慧教育',
    description: '給高中生與家長的升學資訊，由明慧教育團隊整理第一手經驗。',
    url: 'https://www.minghuiedu.com/articles',
  },
  alternates: { canonical: 'https://www.minghuiedu.com/articles' },
};

export default async function ArticlesPage() {
  const articles = await getArticles();
  if (articles.length === 0) notFound();

  return (
    <div>
      <section className="relative overflow-hidden py-20" style={{ background: 'var(--navy)' }}>
        <ParallaxBg>
        <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        </ParallaxBg>
        <div className={`relative ${inner}`}>
          <FadeIn delay={0}>
          <p className="text-xs font-semibold tracking-[0.15em] mb-3 flex items-center gap-2" style={{ color: 'var(--accent-light)' }}>
            <span className="w-5 h-px shrink-0" style={{ background: 'currentColor' }} aria-hidden="true" />
            升學文章
          </p>
          </FadeIn>
          <FadeIn delay={0.1}>
          <h1 className="font-display font-bold leading-[1.15] mb-4" style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}>
            升學路上的第一手資訊
          </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.62)' }}>
            營隊選擇、科系探索、家教費用與讀書方法，寫給高中生和家長。
          </p>
          </FadeIn>
        </div>
      </section>
      <section style={{ background: 'var(--cream)' }}>
        <RevealOnScroll>
        <div className={`${inner} py-12`}>
          <ArticlesGrid articles={articles} />
        </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
