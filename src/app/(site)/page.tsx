import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

/* ─── Data ──────────────────────────────────── */

const services = [
  {
    num: '01',
    title: '熱門營隊活動',
    desc: '國內外頂尖大學科系探索，豐富學習歷程，釐清未來志向。',
    cta: '查看梯次',
    href: '/exploration',
    accentVar: 'var(--navy)',
    accentBg: 'rgba(11,10,63,0.06)',
    accentBorder: 'rgba(11,10,63,0.12)',
  },
  {
    num: '02',
    title: '學霸筆記商品',
    desc: '嚴選台清交成筆記，結合觀念講解影片，高效提升學習成效。',
    cta: '前往選購',
    href: '/notes',
    accentVar: '#1E56A0',
    accentBg: 'rgba(30,86,160,0.06)',
    accentBorder: 'rgba(30,86,160,0.15)',
  },
  {
    num: '03',
    title: '國外升學家教媒合',
    desc: '零抽成、透明化的優質家教平台，專注於國外升學輔導與留學諮詢。',
    cta: '尋找老師',
    href: '/tutor',
    accentVar: '#0F5132',
    accentBg: 'rgba(15,81,50,0.06)',
    accentBorder: 'rgba(15,81,50,0.15)',
  },
];

const stats = [
  { value: '10', unit: '年', label: '教育經驗' },
  { value: '50', unit: '+', label: '舉辦梯次' },
  { value: '2,000', unit: '+', label: '受益學生' },
  { value: '15', unit: '+', label: '合作學系' },
];

/* ─── Service Card ──────────────────────────── */

function ServiceCard({ num, title, desc, cta, href, accentVar, accentBg, accentBorder }: (typeof services)[0]) {
  return (
    <Link
      href={href}
      className="group block bg-white p-8 relative overflow-hidden transition-shadow duration-300 hover:shadow-xl"
      style={{
        border: '1px solid var(--border)',
        borderTop: `3px solid ${accentVar}`,
      }}
    >
      {/* Large muted background number */}
      <span
        className="font-display absolute top-3 right-5 text-8xl font-bold select-none pointer-events-none leading-none"
        style={{ color: 'rgba(11,10,63,0.035)' }}
        aria-hidden="true"
      >
        {num}
      </span>

      <div className="relative">
        <span
          className="inline-block text-[10px] font-semibold tracking-[0.14em] uppercase mb-5 px-2 py-1"
          style={{ background: accentBg, color: accentVar, border: `1px solid ${accentBorder}` }}
        >
          {num}
        </span>

        <h3
          className="font-display font-bold text-xl mb-3 leading-snug"
          style={{ color: 'var(--navy)' }}
        >
          {title}
        </h3>

        <div className="h-px mb-4" style={{ background: 'var(--border)' }} />

        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
          {desc}
        </p>

        <span
          className="inline-flex items-center gap-1 text-sm font-semibold"
          style={{ color: accentVar }}
        >
          {cta}
          <ChevronRight
            aria-hidden="true"
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
          />
        </span>
      </div>
    </Link>
  );
}

/* ─── Page ──────────────────────────────────── */

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'var(--navy)', minHeight: '88vh', display: 'flex', alignItems: 'center' }}
      >
        {/* Dot pattern */}
        <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

        {/* Diagonal accent */}
        <div
          className="absolute right-0 top-0 bottom-0 pointer-events-none"
          style={{
            width: '40vw',
            background: 'linear-gradient(135deg, transparent 60%, rgba(232,144,39,0.04) 100%)',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">

            {/* Eyebrow label */}
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px" style={{ background: 'var(--accent)' }} aria-hidden="true" />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: 'var(--accent)' }}
              >
                台灣頂尖教育顧問平台
              </span>
            </div>

            {/* Display heading */}
            <h1
              className="font-display font-bold leading-[1.1] mb-6"
              style={{ color: '#FFFFFF', fontSize: 'clamp(2.6rem, 6vw, 4.5rem)' }}
            >
              啟發潛能
              <br />
              <em style={{ color: 'var(--accent-light)', fontStyle: 'italic' }}>探索無限未來</em>
            </h1>

            {/* Gold rule */}
            <div className="gold-rule w-20 mb-8" aria-hidden="true" />

            <p
              className="text-lg leading-relaxed mb-10 max-w-xl"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              我們提供最專業的科系探索營隊、海外名校參訪、頂尖家教媒合與學霸筆記，為您的升學之路保駕護航。
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/exploration"
                className="hero-cta-primary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide"
              >
                探索主打營隊
                <ChevronRight aria-hidden="true" size={16} />
              </Link>
              <Link
                href="/tutor"
                className="hero-cta-secondary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide"
              >
                尋找專業家教
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div
            className="mt-20 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-px"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            {stats.map(({ value, unit, label }) => (
              <div key={label} className="py-6 pr-8">
                <div
                  className="font-display font-bold leading-none mb-1"
                  style={{ color: '#FFFFFF', fontSize: '2.25rem' }}
                >
                  {value}
                  <span style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>{unit}</span>
                </div>
                <div className="text-xs tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────── */}
      <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 gap-4">
          <div>
            <p
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 flex items-center gap-2"
              style={{ color: 'var(--accent)' }}
            >
              <span className="w-5 h-px" style={{ background: 'var(--accent)' }} aria-hidden="true" />
              核心服務
            </p>
            <h2
              className="font-display font-bold text-3xl md:text-4xl"
              style={{ color: 'var(--navy)' }}
            >
              我們能為你做什麼
            </h2>
          </div>
          <Link
            href="/about"
            className="about-link hidden sm:inline-flex items-center gap-1 text-sm font-medium shrink-0"
          >
            關於明慧
            <ChevronRight aria-hidden="true" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.num} {...s} />
          ))}
        </div>
      </section>

      {/* ── Brand quote strip ─────────────────── */}
      <section className="py-16 px-4" style={{ background: 'var(--navy)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="font-display italic text-2xl md:text-3xl leading-relaxed mb-6"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            &ldquo;打破資訊落差，讓每一位學生都能
            <span style={{ color: 'var(--accent-light)' }}>勇敢追尋自己的夢想。</span>&rdquo;
          </p>
          <div
            className="flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase"
            style={{ color: 'rgba(232,144,39,0.5)' }}
          >
            <span className="w-8 h-px" style={{ background: 'currentColor' }} aria-hidden="true" />
            明慧教育創辦理念
            <span className="w-8 h-px" style={{ background: 'currentColor' }} aria-hidden="true" />
          </div>
        </div>
      </section>
    </div>
  );
}
