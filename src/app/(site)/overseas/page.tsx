import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import FaqSection from '@/components/ui/FaqSection';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import DestinationTabs from './DestinationTabs';
import { ParallaxBg } from '@/components/ui/ParallaxBg';
import { FadeIn } from '@/components/ui/FadeIn';


export const metadata: Metadata = {
  title: '海外名校遊學參訪',
  description: '明慧教育海外遊學參訪，東京 × 澳洲兩大行程，走訪 QS 前 25 頂尖名校，與在校學長姐閉門交流，帶領高中生提前掌握留學申請關鍵資訊。',
  openGraph: {
    title: '海外名校遊學參訪 | 明慧教育',
    description: '東京 × 澳洲兩大遊學行程，走訪 QS 前 25 頂尖名校，提前掌握留學關鍵資訊。',
    url: 'https://www.minghuiedu.com/overseas',
  },
  alternates: { canonical: 'https://www.minghuiedu.com/overseas' },
};

const inner = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 flex items-center gap-2"
      style={{ color: light ? 'var(--accent-light)' : 'var(--accent)' }}
    >
      <span className="w-5 h-px shrink-0" style={{ background: 'currentColor' }} aria-hidden="true" />
      {children}
    </p>
  );
}

export default function OverseasPage() {
  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28" style={{ background: 'var(--navy)' }}>
        <ParallaxBg>
          {/* Right-side YouTube Short — cover fill (md+) */}
          <div className="hidden md:block absolute inset-0">
            <div className="absolute inset-y-0 right-0 w-[52%] overflow-hidden">
              {/* Scale iframe to cover: 9:16 video stretched to fill container width,
                  then centered vertically so top/bottom overflow is hidden */}
              <iframe
                src="https://www.youtube-nocookie.com/embed/D0gyBKUT8Q0?autoplay=1&mute=1&controls=0&loop=1&playlist=D0gyBKUT8Q0&playsinline=1&rel=0&modestbranding=1"
                title="海外遊學短片"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  /* height = width × (16/9) so portrait video fills & overflows container vertically */
                  height: 'calc(100% * 16 / 9)',
                  minHeight: '100%',
                  border: 'none',
                  display: 'block',
                  pointerEvents: 'none',
                }}
              />
            </div>
            {/* Fade gradient: navy → transparent */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--navy) 32%, rgba(11,10,63,0.92) 48%, rgba(11,10,63,0.35) 68%, transparent 84%)' }} />
          </div>
          <div className="dot-grid absolute inset-0" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(232,144,39,0.07) 0%, transparent 60%)' }}
          />
        </ParallaxBg>
        <div className={`relative ${inner}`}>
          <FadeIn delay={0}><SectionLabel light>海外名校遊學</SectionLabel></FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="font-display font-bold leading-[1.1] mb-6"
              style={{ color: '#FFFFFF', fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
            >
              台灣高中生海外名校遊學參訪
              <br />
              <em style={{ color: 'var(--accent-light)', fontStyle: 'italic' }}>親身感受留學生活</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}><div className="gold-rule w-20 mb-8" aria-hidden="true" /></FadeIn>
          <FadeIn delay={0.25}>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.62)' }}>
              精選東京 × 澳洲兩大行程，帶你走訪 QS 前 25 頂尖名校、與在校學長姐閉門交流，
              在正式申請前搶先掌握留學關鍵資訊，確認自己是否真的適合。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Destination Tabs ──────────────────────────────────── */}
      <DestinationTabs />

      {/* ── 學員心聲 ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20" style={{ background: 'var(--navy)' }}>
        <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className={`relative ${inner}`}>
          <SectionLabel light>學員心聲</SectionLabel>
          <h2
            className="font-display font-bold text-3xl md:text-4xl mb-12"
            style={{ color: '#fff' }}
          >
            他們這樣說
          </h2>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <FaqSection items={[
        { q: '海外遊學適合哪些學生？', a: '海外遊學適合想提升語言能力、體驗不同教育文化、拓展視野，或希望提早接觸國際學習環境的學生。高一到高三都適合，越早參加越能將名校資訊運用到備審與未來規劃。' },
        { q: '有海外經驗的學生也適合參加海外遊學嗎？', a: '適合。每位學生的國際學習起點不同，即使曾有海外經驗，透過明慧教育有系統的名校參訪與留學生交流，仍能獲得不同的視角與收穫，逐步建立對國際環境的適應力與自信。' },
        { q: '海外遊學可以帶來哪些收穫？', a: '除了語言與文化的沉浸體驗，海外遊學也能幫助學生提升獨立性、跨文化理解能力，以及對未來升學與發展的想像。親自走進世界名校，親身感受頂尖學術環境，往往能激發內在學習動力。' },
        { q: '目前有哪些遊學目的地？', a: '目前提供東京（東京大學、慶應義塾大學等日本頂尖名校）及澳洲（QS 前 25 大學，含澳洲國立大學、墨爾本大學等）兩大行程，各有不同的文化與學術風格。' },
        { q: '遊學行程和一般旅遊有什麼不同？', a: '我們的行程包含正式校園深度參訪、與在校台灣留學生閉門交流座談、留學申請資訊講座，以及文化沉浸體驗。是有教育目的的深度學習之旅，不是觀光旅遊。' },
        { q: '需要先會日文或英文才能參加嗎？', a: '不需要。行程全程有中文翻譯與帶隊老師陪同，但我們鼓勵學員積極嘗試使用英文與當地學生交流，這也是遊學最寶貴的體驗之一。' },
      ]} />

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--cream)' }}>
        <div className={`${inner} text-center`}>
          <SectionLabel>立即諮詢</SectionLabel>
          <h2
            className="font-display font-bold text-3xl md:text-4xl mb-4"
            style={{ color: 'var(--navy)' }}
          >
            名額有限，把握機會
          </h2>
          <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
            每梯次嚴格控管人數，確保每位學員都能充分互動。加入 LINE 官方帳號，立即諮詢報名細節。
          </p>
          <a
            href="https://lin.ee/6uAXvJu"
            className="hero-cta-primary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide"
          >
            加入 LINE 諮詢
            <ChevronRight aria-hidden="true" size={16} />
          </a>
        </div>
      </section>

    </div>
  );
}
