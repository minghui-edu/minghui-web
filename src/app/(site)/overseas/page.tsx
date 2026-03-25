import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import DestinationTabs from './DestinationTabs';

export const metadata: Metadata = {
  title: '海外名校遊學',
  description: '東京 × 澳洲兩大遊學行程，走訪 QS 前 25 頂尖名校，與在校學長姐閉門交流，提前掌握留學關鍵資訊。',
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
        <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(232,144,39,0.07) 0%, transparent 60%)' }}
        />
        <div className={`relative ${inner}`}>
          <SectionLabel light>海外名校遊學</SectionLabel>
          <h1
            className="font-display font-bold leading-[1.1] mb-6"
            style={{ color: '#FFFFFF', fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
          >
            走進頂尖名校
            <br />
            <em style={{ color: 'var(--accent-light)', fontStyle: 'italic' }}>親身感受留學生活</em>
          </h1>
          <div className="gold-rule w-20 mb-8" aria-hidden="true" />
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.62)' }}>
            精選東京 × 澳洲兩大行程，帶你走訪 QS 前 25 頂尖名校、與在校學長姐閉門交流，
            在正式申請前搶先掌握留學關鍵資訊，確認自己是否真的適合。
          </p>
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
            href="#"
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
