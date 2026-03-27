import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ShieldCheck, Banknote, Award } from 'lucide-react';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import FloatingTestimonials from '@/components/home/FloatingTestimonials';
import { ParallaxBg } from '@/components/ui/ParallaxBg';
import { FadeIn } from '@/components/ui/FadeIn';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { sanityClient } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';

type FeaturedTutor = {
  id: string;
  name: string;
  title?: string;
  tags?: string[];
  shortExp?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo?: any;
};

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
  { value: '12', unit: '年', label: '補教教育經驗' },
  { value: '20', unit: '+', label: '營隊舉辦梯次' },
  { value: '10,000', unit: '+', label: '活動受益學生' },
  { value: '120', unit: '+', label: '錄取世界前100名校' },
];

const whyUs = [
  {
    icon: ShieldCheck,
    title: '嚴格師資把關',
    desc: '每位家教老師皆經官方審核學歷與教學能力，絕非隨意刊登，確保每次媒合都能找到真正合適的師資。',
    color: 'var(--navy)',
    bg: 'rgba(11,10,63,0.06)',
  },
  {
    icon: Banknote,
    title: '零抽成透明收費',
    desc: '媒合成功後，老師日後收到的家教費用我們絕不抽成。僅收一次性媒合費，讓雙方都能獲得最大利益。',
    color: '#0F5132',
    bg: 'rgba(15,81,50,0.06)',
  },
  {
    icon: Award,
    title: '12 年深耕教育',
    desc: '自創立以來專注台灣教育領域超過十二年，服務超過 10,000 位學生，積累豐富的升學輔導與活動策劃經驗。',
    color: '#1E56A0',
    bg: 'rgba(30,86,160,0.06)',
  },
];


const partners = [
  { name: '台北市政府青年局',       abbr: '北市府' },
  { name: '東京大學台灣留學生會',   abbr: 'UTokyo' },
  { name: '慶應義塾大學台灣留學生會', abbr: 'Keio'  },
  { name: '北京大學兩岸文化交流協會', abbr: 'PKU'   },
  { name: '星創音樂',               abbr: '星創'   },
];

/* ─── Shared layout token ───────────────────── */
// All sections use this same inner wrapper for consistent alignment
const inner = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

/* ─── Sub-components ────────────────────────── */

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

function ServiceCard({ num, title, desc, cta, href, accentVar, accentBg, accentBorder }: (typeof services)[0]) {
  return (
    <Link
      href={href}
      className="group block bg-white p-8 relative overflow-hidden transition-shadow duration-300 hover:shadow-xl"
      style={{ border: '1px solid var(--border)', borderTop: `3px solid ${accentVar}` }}
    >
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
        <h3 className="font-display font-bold text-xl mb-3 leading-snug" style={{ color: 'var(--navy)' }}>
          {title}
        </h3>
        <div className="h-px mb-4" style={{ background: 'var(--border)' }} />
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>{desc}</p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: accentVar }}>
          {cta}
          <ChevronRight aria-hidden="true" size={15} className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
        </span>
      </div>
    </Link>
  );
}

/* ─── Page ──────────────────────────────────── */

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: '明慧教育',
  alternateName: 'Minghui Education',
  url: 'https://www.minghuiedu.com',
  logo: 'https://www.minghuiedu.com/logo.svg',
  description: '明慧教育提供科系探索營隊、海外名校遊學、專業家教媒合、高分筆記與論文顧問服務，幫助學生找到未來的方向。',
  foundingDate: '2012',
  areaServed: 'TW',
  sameAs: [
    'https://www.facebook.com/delc2022',
    'https://www.instagram.com/delc_2022',
    'https://www.youtube.com/@gotontu4507',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'timy@minghuiedu.com',
    contactType: 'customer service',
    availableLanguage: 'Chinese',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '明慧教育',
  url: 'https://www.minghuiedu.com',
};

export const revalidate = 60;

export default async function HomePage() {
  const [sanityTestimonials, featuredTutors] = await Promise.all([
    sanityClient
      .fetch<{ quote: string; name: string; context?: string; year?: string; screenshot?: { asset: { _ref: string } } }[]>(
        `*[_type == "testimonial" && featured == true] | order(order asc){ quote, name, context, year, screenshot }`
      )
      .catch(() => []),
    sanityClient
      .fetch<FeaturedTutor[]>(
        `*[_type == "tutor" && isActive == true] | order(order asc)[0...3]{ "id": slug.current, name, title, tags, shortExp, photo }`
      )
      .catch(() => []),
  ]);

  // Split on raw Sanity data BEFORE URL conversion, so we don't rely on urlFor() returning truthy
  const rawWithScreenshot = sanityTestimonials.filter((t) => t.screenshot?.asset?._ref);
  const rawTextOnly       = sanityTestimonials.filter((t) => !t.screenshot?.asset?._ref);

  // Screenshot testimonials → FloatingTestimonials wall
  const screenshotItems = rawWithScreenshot.map((t) => ({
    quote: t.quote,
    name: t.name,
    context: t.context,
    screenshot: urlFor(t.screenshot).width(800).url(),
  }));

  // Text-only testimonials → carousel (falls back to hardcoded if none from Sanity)
  const textMapped = rawTextOnly.map((t) => ({
    quote: t.quote,
    name: t.name,
    context: t.context ?? '',
    year: t.year ?? '',
  }));
  const carouselItems = textMapped.length > 0 ? textMapped : undefined;
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]) }}
      />

      {/* ── Hero ──────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'var(--navy)', minHeight: '88svh', display: 'flex', alignItems: 'center' }}
      >
        <ParallaxBg>
          <div className="dot-grid absolute inset-0" />
        </ParallaxBg>

        <div className={`relative ${inner} py-24 w-full`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: text */}
            <div>
              <FadeIn delay={0}>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-8 h-px" style={{ background: 'var(--accent)' }} aria-hidden="true" />
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>
                    台灣頂尖教育顧問平台
                  </span>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1
                  className="font-display font-bold leading-[1.1] mb-6"
                  style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
                >
                  啟發潛能
                  <br />
                  <em style={{ color: 'var(--accent-light)', fontStyle: 'italic' }}>探索無限未來</em>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}><div className="gold-rule w-20 mb-8" aria-hidden="true" /></FadeIn>
              <FadeIn delay={0.25}>
                <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  我們提供最專業的科系探索營隊、海外名校參訪、頂尖家教媒合與學霸筆記，為您的升學之路保駕護航。
                </p>
              </FadeIn>
              <FadeIn delay={0.35}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/exploration" className="hero-cta-primary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide">
                    探索主打營隊
                    <ChevronRight aria-hidden="true" size={16} />
                  </Link>
                  <Link href="/tutor" className="hero-cta-secondary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide">
                    尋找專業家教
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right: hero image
                ── 換上正式照片時，把下方佔位 div 換成：
                   <Image src="/hero-photo.jpg" alt="明慧教育師生互動" fill className="object-cover" />
                   並把外層 div 加上 style={{ position: 'relative' }}
            */}
            <div className="hidden lg:block">
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: '4 / 5',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {/* ── 照片佔位 ── 取得正式照片後替換 ── */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21,15 16,10 5,21" />
                  </svg>
                  <span className="text-xs tracking-widest uppercase">Hero Photo</span>
                </div>
                {/* Gold accent corners */}
                <span className="absolute top-0 left-0 w-10 h-10 pointer-events-none" style={{ borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', opacity: 0.5 }} aria-hidden="true" />
                <span className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none" style={{ borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)', opacity: 0.5 }} aria-hidden="true" />
              </div>
              {/* Offset gold block behind image */}
              <div
                className="absolute -bottom-4 -right-4 w-2/3 h-2/3 pointer-events-none -z-10"
                style={{ background: 'rgba(232,144,39,0.06)' }}
                aria-hidden="true"
              />
            </div>

          </div>

          {/* Stats row */}
          <div className="mt-20 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {stats.map(({ value, unit, label }) => (
              <div key={label} className="py-6 pr-4 sm:pr-8">
                <div className="font-display font-bold leading-none mb-1" style={{ color: '#FFFFFF', fontSize: '2.25rem' }}>
                  {value}<span style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>{unit}</span>
                </div>
                <div className="text-xs tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── B: 為什麼選我們 ────────────────────── */}
      <section className="py-20" style={{ background: 'var(--surface)' }}>
        <div className={inner}>
          <RevealOnScroll>
          <div className="text-center mb-14">
            <SectionLabel>我們的承諾</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
              為什麼選擇明慧教育
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUs.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="p-8"
                style={{ border: '1px solid var(--border)', borderLeft: `4px solid ${color}` }}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ background: bg }}>
                  <Icon aria-hidden="true" size={24} style={{ color }} />
                </div>
                <h3 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--navy)' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── YouTube 留言截圖牆（只有 Sanity 有截圖資料時才顯示）── */}
      {screenshotItems.length > 0 && (
        <FloatingTestimonials items={screenshotItems} />
      )}

      {/* ── Services ──────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--surface)' }}>
        <div className={inner}>
          <RevealOnScroll>
          <div className="flex items-end justify-between mb-12 gap-4">
            <div>
              <SectionLabel>核心服務</SectionLabel>
              <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
                我們能為你做什麼
              </h2>
            </div>
            <Link href="/about" className="about-link hidden sm:inline-flex items-center gap-1 text-sm font-medium shrink-0">
              關於明慧 <ChevronRight aria-hidden="true" size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => <ServiceCard key={s.num} {...s} />)}
          </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── D: 精選師資 ───────────────────────── */}
      <section className="py-20" style={{ background: 'var(--cream)' }}>
        <div className={inner}>
          <RevealOnScroll>
          <div className="flex items-end justify-between mb-12 gap-4">
            <div>
              <SectionLabel>師資陣容</SectionLabel>
              <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
                精選頂尖師資
              </h2>
            </div>
            <Link href="/tutor" className="about-link hidden sm:inline-flex items-center gap-1 text-sm font-medium shrink-0">
              查看全部師資 <ChevronRight aria-hidden="true" size={14} />
            </Link>
          </div>
          {featuredTutors.length === 0 ? (
            <p className="text-center py-8" style={{ color: 'var(--muted)' }}>師資資料整理中，敬請期待。</p>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTutors.map((tutor) => {
              const photoUrl = tutor.photo
                ? urlFor(tutor.photo).width(112).height(112).fit('crop').url()
                : null;
              return (
                <Link
                  key={tutor.id ?? tutor.name}
                  href={tutor.id ? `/tutor/${tutor.id}` : '/tutor'}
                  className="group bg-white p-6 flex flex-col transition-shadow duration-200 hover:shadow-lg"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <div className="flex items-center gap-4 mb-5 pb-5" style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <div className="w-14 h-14 rounded-full shrink-0 overflow-hidden flex items-center justify-center font-display font-bold"
                      style={{ background: 'rgba(11,10,63,0.07)', color: 'var(--navy)', fontSize: '1.25rem' }}>
                      {photoUrl ? (
                        <Image src={photoUrl} alt={tutor.name} width={56} height={56} className="object-cover w-full h-full" />
                      ) : (
                        <span aria-hidden="true">{tutor.name[0]}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-base leading-tight mb-1 group-hover:text-[#1E56A0] transition-colors" style={{ color: 'var(--navy)' }}>
                        {tutor.name}
                      </h3>
                      {tutor.title && <p className="text-xs leading-snug" style={{ color: 'var(--muted)' }}>{tutor.title}</p>}
                    </div>
                  </div>
                  {tutor.tags && tutor.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tutor.tags.map((tag) => (
                        <span key={tag} className="text-[11px] px-2 py-0.5 font-medium"
                          style={{ background: 'rgba(11,10,63,0.05)', color: 'var(--navy)', border: '1px solid rgba(11,10,63,0.1)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {tutor.shortExp && (
                    <p className="text-sm leading-relaxed flex-grow mb-4" style={{ color: 'var(--muted)' }}>
                      {tutor.shortExp}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs font-semibold mt-auto" style={{ color: 'var(--accent)' }}>
                    查看完整介紹
                    <ChevronRight aria-hidden="true" size={13} className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
                  </span>
                </Link>
              );
            })}
          </div>
          )}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── A: 學員心聲輪播 ────────────────────── */}
      <section className="py-20" style={{ background: 'var(--navy)' }}>
        <div className={inner}>
          <div className="text-center mb-14">
            <SectionLabel light>學員心聲</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: '#FFFFFF' }}>
              他們的故事
            </h2>
          </div>
          <TestimonialsCarousel items={carouselItems} />
        </div>
      </section>

      {/* ── E: 過往合作夥伴 ───────────────────── */}
      <section className="py-16 overflow-hidden" style={{ background: 'var(--surface)' }}>
        <style>{`
          @keyframes partners-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .partners-track { animation: none !important; }
          }
        `}</style>
        <div className={`${inner} mb-10`}>
          <SectionLabel>信任與合作</SectionLabel>
          <h2 className="font-display font-bold text-2xl md:text-3xl" style={{ color: 'var(--navy)' }}>
            過往合作夥伴
          </h2>
        </div>

        {/* Marquee strip */}
        <div style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage:        'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}>
          <div
            className="partners-track flex items-center"
            style={{
              width: 'max-content',
              gap: '32px',
              animation: 'partners-scroll 28s linear infinite',
            }}
          >
            {[...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-4 shrink-0 px-6 py-4"
                style={{
                  border: '1px solid var(--border)',
                  background: '#fff',
                  minWidth: '240px',
                }}
              >
                {/* 1:1 logo placeholder — replace with <Image> when logo is ready */}
                <div
                  className="shrink-0 flex items-center justify-center font-display font-bold text-sm"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: 'rgba(11,10,63,0.06)',
                    border: '1px solid rgba(11,10,63,0.10)',
                    color: 'var(--navy)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {p.abbr}
                </div>
                <span className="font-medium text-sm leading-snug" style={{ color: 'var(--navy)' }}>
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand quote strip ─────────────────── */}
      <section className="py-16" style={{ background: 'var(--navy)' }}>
        <div className={`${inner} text-center`}>
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
