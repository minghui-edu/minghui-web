import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Lightbulb, Award, ChevronRight, Zap, Puzzle, FlaskConical, Bot, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { ActivitiesGrid, type SanityActivity } from './ActivitiesGrid';
import FaqSection from '@/components/ui/FaqSection';
import TestimonialsCarousel, { type Testimonial } from '@/components/home/TestimonialsCarousel';
import { ParallaxBg } from '@/components/ui/ParallaxBg';
import { FadeIn } from '@/components/ui/FadeIn';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { sanityClient } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';

export const revalidate = 60;

// 替換成真實照片路徑，例如 '/images/hero-exploration.jpg'
const heroImage: string | null = null;

export const metadata: Metadata = {
  title: '科系探索營隊',
  description: '明慧教育科系探索營隊，帶領高中生深入台大等頂尖大學，釐清興趣志向，專題實作豐富備審學習歷程，已累積超過 20 梯次，10,000+ 學生受益。',
  openGraph: {
    title: '科系探索營隊 | 明慧教育',
    description: '帶領高中生深入了解大學熱門科系，釐清興趣志向，豐富備審學習歷程。',
    url: 'https://www.minghuiedu.com/exploration',
  },
  alternates: { canonical: 'https://www.minghuiedu.com/exploration' },
};

const inner = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 flex items-center gap-2"
      style={{ color: light ? 'var(--accent-light)' : 'var(--accent)' }}>
      <span className="w-5 h-px shrink-0" style={{ background: 'currentColor' }} aria-hidden="true" />
      {children}
    </p>
  );
}

/* ─── Data ──────────────────────────────────── */

const stats = [
  { value: '12',     unit: '年', label: '補教教育經驗' },
  { value: '20',     unit: '+', label: '營隊舉辦梯次' },
  { value: '10,000', unit: '+', label: '活動受益學生' },
  { value: '93',    unit: '%', label: '學員釐清科系選擇' },
];

const modes = [
  {
    icon: Lightbulb,
    title: '多元科系探索營',
    badge: '適合尚未定向',
    desc: '不限單一科系，透過跨領域的營隊活動，讓尚未決定志願方向的學生，透過學長姐分享，深入了解各科系學習內容、畢業出路。',
    points: [
      { icon: Zap,    text: '科技黑客松實作：完整體驗專案開發與跨領域團隊合作，進而發掘自身興趣' },
      { icon: Puzzle, text: '校園實境解謎：以有趣互動遊戲，認識頂大校園環境，提升備考動機' },
    ],
    color: 'var(--navy)',
    bg: 'rgba(11,10,63,0.06)',
  },
  {
    icon: Award,
    title: '單一科系深度講座 & 實作',
    badge: '適合已有目標',
    desc: '專為已有心儀科系的學生設計。由該科系畢業、從業中的學長姐帶領，深入解析科系核心知識，並親手完成相關專題實作，直接豐富學習歷程。',
    points: [
      { icon: FlaskConical, text: '專題實作：針對該科系熱門議題，產出高品質實作成果，大幅為學習歷程加分' },
      { icon: CheckCircle,  text: '科系真實樣貌：破除網路迷思，聽聽畢業生怎麼說，提前具備該系核心素養' },
    ],
    color: '#0F5132',
    bg: 'rgba(15,81,50,0.06)',
  },
];

const highlights = [
  { icon: Zap,          title: '科技黑客松',   desc: '跨領域組隊，48 小時從零打造產品原型、設計商業策略，體驗業界真實工作流程。',       color: 'var(--navy)' },
  { icon: Puzzle,       title: '校園實境解謎', desc: '獨家設計的台大校園解謎關卡 APP ，寓教於樂，留下對大學最深刻的印象。',   color: '#1E56A0'      },
  { icon: FlaskConical, title: '專題實作',     desc: '在專業人員帶領下完成實作成品，提前感受關於心儀科系的核心學習內容。',           color: '#7B4F12'      },
  { icon: Bot,          title: '大學模擬面試',  desc: '具有豐富面試經驗的學長姐擔任面試官，給予最直接的回饋，學習如何有效自我行銷。',    color: '#0F5132'      },
];

const ACTIVITIES_QUERY = `*[_type == "activity"] | order(featured desc, date desc) {
  title,
  "slug": slug.current,
  date,
  audience,
  tags,
  status,
  featured,
  description,
  image
}`;

// 活動照片佔位格數量（Sanity 無資料時顯示）
const photoSlots = 6;

const explorationTestimonials: Testimonial[] = [
  {
    quote: '這是我參加過內容最豐富的營隊，雖然真的超累，但真人圖書館活動讓我更加確認了對財金的熱情，後來唸書時每次快放棄都會想起學長的分享與鼓勵，真的收穫滿滿。',
    name: '陳同學',
    context: '第五屆科系探索領袖營學員',
    year: '2024',
  },
  {
    quote: '黑客松讓我在短短兩天內跟完全不認識的同學合作完成一個網頁工具，這個經驗讓我確定自己想念資工系，也讓我第一次有了真正有說服力的作品。',
    name: '李同學',
    context: '第九屆科系探索領袖營學員',
    year: '2026',
  },
  {
    quote: '這次講座讓我第一次了解到物治系究竟在學什麼、需要掌握哪些核心知識，專題實作老師也一一點評了大家的實作成果、並給出很多實用的建議，讓我更堅定想考物治系了！',
    name: '張同學',
    context: '物治系講座學員',
    year: '2025',
  },
  {
    quote: '參加 DELC 的科系探索營，讓我第一次真正了解心理系的日常，專題實作也大大充實了我的學習歷程，最後順利錄取了喜歡的科系。',
    name: '王同學',
    context: '第四屆科系探索領袖營學員',
    year: '2023',
  },
  {
    quote: '講座內容超充實，老師分享了大學真正在學的課程、筆記簡報，也了解到臨床心理師、諮商心理師原來是不一樣的！實作內容也很有趣，希望未來能如願考上心理系',
    name: '謝同學',
    context: '心理系講座學員',
    year: '2025',
  },
];

/* ─── Page ──────────────────────────────────── */

export default async function ExplorationPage() {
  const [activities, campHighlights, guests] = await Promise.all([
    sanityClient.fetch<SanityActivity[]>(ACTIVITIES_QUERY, {}, { next: { revalidate: 60 } }),
    sanityClient.fetch<{ photo: { asset: { _ref: string } }; caption?: string }[]>(
      `*[_type == "campHighlight"] | order(order asc){ photo, caption }`,
      {}, { next: { revalidate: 60 } }
    ).catch(() => []) as Promise<{ photo: { asset: { _ref: string } }; caption?: string }[]>,
    sanityClient.fetch<{ photo: { asset: { _ref: string } }; name: string; title: string }[]>(
      `*[_type == "campGuest"] | order(order asc){ photo, name, title }`,
      {}, { next: { revalidate: 60 } }
    ).catch(() => []),
  ]);

  return (
    <div>

      {/* ── Hero ──────────────────────────────── */}
      <section className="relative overflow-hidden py-28" style={{ background: 'var(--navy)' }}>
        {/* Parallax background */}
        <ParallaxBg>
          <div className="hidden md:block absolute inset-0">
            <div className="absolute inset-y-0 right-0 w-[58%]">
              {heroImage ? (
                <Image src={heroImage} alt="" fill className="object-cover object-center" priority sizes="58vw" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ background: 'rgba(255,255,255,0.025)' }}>
                  <ImageIcon size={32} style={{ color: 'rgba(255,255,255,0.08)' }} />
                  <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.06)' }}>Hero Photo</span>
                </div>
              )}
            </div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--navy) 32%, rgba(11,10,63,0.92) 48%, rgba(11,10,63,0.35) 68%, transparent 84%)' }} />
          </div>
          <div className="dot-grid absolute inset-0" />
          <div className="absolute top-0 right-0" style={{ width: '50vw', height: '100%', background: 'radial-gradient(ellipse at 80% 30%, rgba(232,144,39,0.06) 0%, transparent 65%)' }} />
        </ParallaxBg>
        <div className={`relative ${inner}`}>
          <FadeIn delay={0}><SectionLabel light>科系探索營隊</SectionLabel></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display font-bold leading-[1.1] mb-6" style={{ color: '#FFFFFF', fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}>
              高中生科系探索營隊推薦
              <br />
              <em style={{ color: 'var(--accent-light)', fontStyle: 'italic' }}>親身體驗，豐富學習經驗</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}><div className="gold-rule w-20 mb-8" aria-hidden="true" /></FadeIn>
          <FadeIn delay={0.25}>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.62)' }}>
              透過科系實作、大學參訪與跨領域挑戰，讓你釐清各科系學習內容，確認自身興趣與未來方向，讓學習歷程有真正說得出口的經驗。
            </p>
          </FadeIn>
          {/* Stats strip */}
          <FadeIn delay={0.35}>
            <div className="mt-16 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {stats.map(({ value, unit, label }) => (
                <div key={label} className="py-6 pr-4 sm:pr-8">
                  <div className="font-display font-bold leading-none mb-1" style={{ color: '#FFFFFF', fontSize: '2.25rem' }}>
                    {value}<span style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>{unit}</span>
                  </div>
                  <div className="text-xs tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── DELC 品牌特寫 ──────────────────────── */}
      <section className="py-20" style={{ background: 'var(--cream)' }}>
        <div className={inner}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <RevealOnScroll delay={0}>
            <div>
              <SectionLabel>旗艦品牌</SectionLabel>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-2" style={{ color: 'var(--navy)' }}>
                DELC
              </h2>
              <p className="font-display italic text-lg mb-6" style={{ color: 'var(--accent)' }}>
                科系探索領袖營
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                DELC（Department Exploration Leadership Camp）是明慧教育自主研發的旗艦營隊品牌，結合黑客松實作、校園實境解謎與跨領域挑戰，打破傳統「聽講式」體驗營的框架。
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
                我們相信，真正的科系探索不只是坐在台下聽學長姐說，更要親手做、親眼看、親身感受。每一屆 DELC 都致力於創造讓學員帶著走的記憶與成果。
              </p>
              <div className="flex flex-wrap gap-3">
                {['黑客松實作', '校園實境解謎', '跨領域挑戰', '學習歷程加分'].map((tag) => (
                  <span key={tag} className="text-xs font-semibold px-3 py-1.5" style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid rgba(232,144,39,0.3)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            </RevealOnScroll>
            {/* DELC visual placeholder */}
            <RevealOnScroll delay={0.15}>
            <div className="relative">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: 'rgba(11,10,63,0.06)', border: '1px solid var(--border)' }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ color: 'rgba(11,10,63,0.18)' }}>
                  <ImageIcon aria-hidden="true" size={36} />
                  <span className="text-xs tracking-widest uppercase">DELC Camp Photo</span>
                </div>
                <span className="absolute top-0 left-0 w-10 h-10 pointer-events-none" style={{ borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', opacity: 0.5 }} aria-hidden="true" />
                <span className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none" style={{ borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)', opacity: 0.5 }} aria-hidden="true" />
              </div>
              {/* Accent label */}
              <div className="absolute -bottom-4 -left-4 px-5 py-3 font-display font-bold text-sm" style={{ background: 'var(--accent)', color: 'var(--navy)' }}>
                自 2022 年起
              </div>
            </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── 兩大探索模式 ───────────────────────── */}
      <section className="py-20" style={{ background: 'var(--surface)' }}>
        <div className={inner}>
          <div className="text-center mb-14">
            <SectionLabel>課程設計</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
              兩大探索模式，精準滿足需求
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modes.map(({ icon: Icon, title, badge, desc, points, color, bg }) => (
              <div key={title} className="p-8" style={{ border: '1px solid var(--border)', borderLeft: `4px solid ${color}` }}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center shrink-0" style={{ background: bg }}>
                    <Icon aria-hidden="true" size={24} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl leading-snug" style={{ color: 'var(--navy)' }}>{title}</h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 mt-1 inline-block" style={{ background: bg, color, border: `1px solid ${color}`, opacity: 0.85 }}>
                      {badge}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>{desc}</p>
                <ul className="space-y-3">
                  {points.map(({ icon: PIcon, text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <PIcon aria-hidden="true" size={16} className="shrink-0 mt-0.5" style={{ color }} />
                      <span className="text-sm" style={{ color: 'var(--muted)' }}>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 獨家體驗亮點 ───────────────────────── */}
      <section className="py-20" style={{ background: 'var(--cream)' }}>
        <div className={inner}>
          <div className="text-center mb-14">
            <SectionLabel>只有這裡有</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
              獨家體驗，讓你真的學到東西
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="p-6 bg-white" style={{ border: '1px solid var(--border)', borderTop: `3px solid ${color}` }}>
                <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ background: 'var(--cream)' }}>
                  <Icon aria-hidden="true" size={20} style={{ color }} />
                </div>
                <h3 className="font-display font-bold text-base mb-3" style={{ color: 'var(--navy)' }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 最新梯次 ───────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--surface)' }}>
        <div className={inner}>
          <div className="text-center mb-14">
            <SectionLabel>梯次資訊</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
              最新特色活動
            </h2>
          </div>
          <ActivitiesGrid activities={activities} />
        </div>
      </section>

      {/* ── 活動花絮 跑馬燈 ─────────────────────── */}
      <section className="py-20 overflow-hidden" style={{ background: 'var(--navy)' }}>
        <style>{`
          @keyframes highlights-l { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes highlights-r { from { transform: translateX(-50%); } to { transform: translateX(0); } }
          @media (prefers-reduced-motion: reduce) {
            .highlights-track { animation: none !important; }
          }
        `}</style>
        <div className={`${inner} mb-12`}>
          <SectionLabel light>活動花絮</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: '#FFFFFF' }}>
            現場是這樣的
          </h2>
        </div>

        {campHighlights.length > 0 ? (
          <div className="flex flex-col gap-4">
            {[0, 1].map((row) => {
              const rowItems = campHighlights.filter((_, i) => i % 2 === row);
              if (rowItems.length === 0) return null;
              const doubled = [...rowItems, ...rowItems];
              return (
                <div key={row} style={{
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
                }}>
                  <div className="highlights-track flex" style={{
                    width: 'max-content',
                    gap: '12px',
                    animation: `${row === 0 ? 'highlights-l' : 'highlights-r'} ${row === 0 ? 36 : 42}s linear infinite`,
                  }}>
                    {doubled.map((h, i) => (
                      <div key={i} className="shrink-0 relative overflow-hidden" style={{ width: '320px', aspectRatio: '16/9' }}>
                        <Image
                          src={urlFor(h.photo).width(640).url()}
                          alt={h.caption ?? '活動花絮'}
                          fill
                          className="object-cover"
                          sizes="320px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 佔位格（尚未上傳照片時） */
          <div className={`${inner} grid grid-cols-2 md:grid-cols-3 gap-3`}>
            {Array.from({ length: photoSlots }).map((_, i) => (
              <div key={i} className="relative overflow-hidden flex items-center justify-center"
                style={{
                  aspectRatio: i === 0 ? '16/9' : '4/3',
                  gridColumn: i === 0 ? 'span 2' : undefined,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <ImageIcon aria-hidden="true" size={24} style={{ color: 'rgba(255,255,255,0.15)' }} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── 誰來營隊 ─────────────────────────────── */}
      {guests.length > 0 && (
        <section className="py-20" style={{ background: 'var(--surface)' }}>
          <div className={inner}>
            <div className="mb-12">
              <SectionLabel>特邀嘉賓</SectionLabel>
              <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
                誰來營隊
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guests.map((g, i) => (
                <figure key={i} className="overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  <div className="relative" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={urlFor(g.photo).width(640).height(360).fit('crop').url()}
                      alt={g.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <figcaption className="px-4 py-3" style={{ background: 'var(--navy)', borderTop: '2px solid var(--accent)' }}>
                    <p className="font-display font-bold text-base" style={{ color: '#FFFFFF' }}>{g.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{g.title}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 學員心聲 ───────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--navy)' }}>
        <div className={inner}>
          <div className="text-center mb-14">
            <SectionLabel light>學員心聲</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: '#FFFFFF' }}>
              他們參加後這樣說
            </h2>
          </div>
          <TestimonialsCarousel items={explorationTestimonials} />
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────── */}
      <FaqSection items={[
        { q: '科系探索營隊是什麼？', a: '科系探索營隊是透過課程體驗、主題活動、案例討論與互動任務，幫助學生了解不同科系的內容與未來方向。不是一般的體驗活動，而是有系統地引導學生認識科系學習內容、能力需求與職涯出路。' },
        { q: '哪些學生適合參加科系探索營隊？', a: '對未來科系還不確定、想提早了解大學學習內容，或希望更認識自己興趣與能力方向的學生，都很適合參加。越早探索，填志願時就越有把握。' },
        { q: '明慧教育的科系探索營隊和一般體驗營有什麼不同？', a: '明慧教育的科系探索營隊不只重視活動趣味，也重視學生是否真正理解科系內容、能力需求與未來方向。我們邀請具有相關科系業界經驗的講師，從長遠觀點協助學生做科系探索。' },
        { q: '參加營隊可以用在學習歷程備審嗎？', a: '可以。明慧教育的科系探索營隊具有正式活動記錄、證書，參加後可作為高中學習歷程的課外活動佐證資料，呈現自主學習與科系探索的動機與歷程。' },
        { q: '科系探索營隊費用是多少？', a: '費用依梯次、目的地與行程天數而有所不同，詳細金額請參閱各梯次頁面，或加入 LINE 官方帳號詢問最新報價與早鳥/團報優惠。' },
      ]} />

      {/* ── CTA ───────────────────────────────── */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'var(--surface)' }}>
        <div className={`${inner} text-center`}>
          <SectionLabel>立即行動</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: 'var(--navy)' }}>
            名額有限，及早卡位
          </h2>
          <p className="text-base mb-10" style={{ color: 'var(--muted)' }}>
            營隊名額嚴格控管，確保每位學員都能獲得充分的互動與指導。馬上加入 LINE 官方帳號，第一時間接收開放報名通知。
          </p>
          <a href="https://lin.ee/6uAXvJu" target="_blank" rel="noopener noreferrer" className="hero-cta-primary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide">
            加入 LINE 諮詢
            <ChevronRight aria-hidden="true" size={16} />
          </a>
        </div>
      </section>

    </div>
  );
}
