import type { Metadata } from 'next';
import { Lightbulb, Award, ChevronRight, Zap, Puzzle, FlaskConical, Bot, Calendar, Users, CheckCircle, Image as ImageIcon } from 'lucide-react';
import TestimonialsCarousel, { type Testimonial } from '@/components/home/TestimonialsCarousel';

export const metadata: Metadata = {
  title: '科系探索',
  description: '透過實作與參訪，提早認識大學科系，豐富學習歷程。',
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
  { value: '120',    unit: '+', label: '錄取世界前100名校' },
];

const modes = [
  {
    icon: Lightbulb,
    title: '多元科系探索營',
    badge: '適合尚未定向',
    desc: '不限單一科系，透過跨領域的營隊活動，讓尚未決定類組的學生體驗產品從設計、策略、製作到市場分析的多個面向，進而發掘自身興趣。',
    points: [
      { icon: Zap,    text: '科技黑客松實作：完整體驗專案開發與跨領域團隊合作' },
      { icon: Puzzle, text: '校園實境解謎：以有趣互動認識頂大校園，提升備考動機' },
    ],
    color: 'var(--navy)',
    bg: 'rgba(11,10,63,0.06)',
  },
  {
    icon: Award,
    title: '單一科系深度講座 & 實作',
    badge: '適合已有目標',
    desc: '專為已有心儀科系的學生設計。由專業師資與學長姐帶領，深入解析科系核心知識，並親手完成相關專題實作，直接豐富學習歷程。',
    points: [
      { icon: FlaskConical, text: '專題實作產出：直接產出高品質成果，大幅為學習歷程加分' },
      { icon: CheckCircle,  text: '科系真實樣貌：破除網路迷思，提前具備該系核心素養' },
    ],
    color: '#0F5132',
    bg: 'rgba(15,81,50,0.06)',
  },
];

const highlights = [
  { icon: Zap,          title: '科技黑客松',   desc: '跨領域組隊，48 小時從零打造產品原型，體驗業界真實開發流程。',       color: 'var(--navy)' },
  { icon: Puzzle,       title: '校園實境解謎', desc: '獨家設計的台大校園解謎關卡，寓教於樂，留下對大學最深刻的印象。',   color: '#1E56A0'      },
  { icon: FlaskConical, title: '解剖實作',     desc: '在醫學教授帶領下完成真實解剖課，提前感受醫學系核心學習。',           color: '#7B4F12'      },
  { icon: Bot,          title: 'AI 模型訓練',  desc: '從 Python 基礎到訓練自己的 AI 模型，親手完成可放入備審的成果。',    color: '#0F5132'      },
];

type ActivityStatus = '報名中' | '即將開放' | '已截止';

const activities: { title: string; date: string; audience: string; tags: string[]; status: ActivityStatus; registrationHref: string }[] = [
  {
    title: '醫學系探索營',
    date: '2025 暑期梯次',
    audience: '高一、高二',
    tags: ['解剖實作', 'PBL討論', '醫院參訪'],
    status: '即將開放',
    registrationHref: '#',
  },
  {
    title: '資工 AI 實作營',
    date: '2025 暑期梯次',
    audience: '國中、高中',
    tags: ['Python基礎', 'AI模型訓練', '專案發表'],
    status: '即將開放',
    registrationHref: '#',
  },
  {
    title: 'DELC 科系探索領袖營',
    date: '2025 寒假梯次',
    audience: '國中、高一',
    tags: ['黑客松', '校園解謎', '跨領域實作'],
    status: '報名中',
    registrationHref: '#',
  },
  {
    title: '法律系深度講座 & 模擬法庭',
    date: '2025 秋季梯次',
    audience: '高一、高二',
    tags: ['模擬法庭', '法條解析', '職涯分享'],
    status: '即將開放',
    registrationHref: '#',
  },
];

const statusStyle = {
  '報名中':   { bg: 'rgba(15,81,50,0.1)',       color: '#0F5132',      border: 'rgba(15,81,50,0.25)' },
  '即將開放': { bg: 'rgba(232,144,39,0.1)',      color: 'var(--accent)', border: 'rgba(232,144,39,0.3)' },
  '已截止':   { bg: 'rgba(100,100,100,0.08)',    color: '#6B7280',      border: 'rgba(100,100,100,0.2)' },
};

// 活動照片佔位格數量
const photoSlots = 6;

const explorationTestimonials: Testimonial[] = [
  {
    quote: '參加明慧的科系探索營，讓我第一次真正了解電機系的日常。豐富的實作課程大大充實了我的學習歷程，最後順利考上了心目中的科系。',
    name: '王同學',
    context: '台大電機系 · 探索營學員',
    year: '2023',
  },
  {
    quote: '黑客松讓我在短短兩天內跟完全不認識的同學合作完成一個 APP，這個經驗讓我確定自己想念資工系，也讓我的學習歷程有了真正有說服力的作品。',
    name: '李同學',
    context: '台大資工系 · DELC 領袖營學員',
    year: '2024',
  },
  {
    quote: '解剖實作那天是我高中最難忘的一天。明慧讓我提早確認了對醫學的熱情，備考期間每次想放棄都會想起那天的感受，最後如願考上醫學系。',
    name: '陳同學',
    context: '北醫醫學系 · 醫學系探索營學員',
    year: '2024',
  },
  {
    quote: '校園實境解謎讓我第一次踏進台大校園就愛上了那裡的氛圍。回家當天就把台大列為第一志願，後來也真的如願了。',
    name: '張同學',
    context: '台大法律系 · 科系探索營學員',
    year: '2023',
  },
];

/* ─── Page ──────────────────────────────────── */

export default function ExplorationPage() {
  return (
    <div>

      {/* ── Hero ──────────────────────────────── */}
      <section className="relative overflow-hidden py-28" style={{ background: 'var(--navy)' }}>
        <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 right-0 pointer-events-none" style={{ width: '50vw', height: '100%', background: 'radial-gradient(ellipse at 80% 30%, rgba(232,144,39,0.06) 0%, transparent 65%)' }} aria-hidden="true" />
        <div className={`relative ${inner}`}>
          <SectionLabel light>科系探索營隊</SectionLabel>
          <h1 className="font-display font-bold leading-[1.1] mb-6" style={{ color: '#FFFFFF', fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}>
            在選擇科系之前
            <br />
            <em style={{ color: 'var(--accent-light)', fontStyle: 'italic' }}>先來親身體驗看看</em>
          </h1>
          <div className="gold-rule w-20 mb-8" aria-hidden="true" />
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.62)' }}>
            透過真實的實作、參訪與跨領域挑戰，讓你在高中階段就確認未來方向，讓學習歷程有真正說得出口的故事。
          </p>
          {/* Stats strip */}
          <div className="mt-16 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {stats.map(({ value, unit, label }) => (
              <div key={label} className="py-6 pr-8">
                <div className="font-display font-bold leading-none mb-1" style={{ color: '#FFFFFF', fontSize: '2.25rem' }}>
                  {value}<span style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>{unit}</span>
                </div>
                <div className="text-xs tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELC 品牌特寫 ──────────────────────── */}
      <section className="py-20" style={{ background: 'var(--cream)' }}>
        <div className={inner}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
                我們相信，真正的科系探索不是坐在台下聽學長姐說，而是親手做、親眼看、親身感受。每一屆 DELC 都致力於創造讓學員帶著走的記憶與成果。
              </p>
              <div className="flex flex-wrap gap-3">
                {['黑客松實作', '校園實境解謎', '跨領域挑戰', '學習歷程加分'].map((tag) => (
                  <span key={tag} className="text-xs font-semibold px-3 py-1.5" style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid rgba(232,144,39,0.3)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* DELC visual placeholder */}
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
          </div>
        </div>
      </section>

      {/* ── 兩大探索模式 ───────────────────────── */}
      <section className="py-20" style={{ background: 'var(--surface)' }}>
        <div className={inner}>
          <div className="text-center mb-14">
            <SectionLabel>課程設計</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
              兩大探索模式，精準對接需求
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((act) => {
              const s = statusStyle[act.status];
              return (
                <div key={act.title} className="bg-white flex flex-col sm:flex-row overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  {/* Photo placeholder */}
                  <div className="sm:w-2/5 shrink-0 relative min-h-[160px] flex items-center justify-center" style={{ background: 'rgba(11,10,63,0.05)', borderRight: '1px solid var(--border-light)' }}>
                    <ImageIcon aria-hidden="true" size={28} style={{ color: 'rgba(11,10,63,0.18)' }} />
                    <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1" style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                      {act.status}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--muted)' }}>
                      <Calendar aria-hidden="true" size={13} />
                      <span className="text-xs font-medium">{act.date}</span>
                      <span className="text-xs" style={{ color: 'var(--border)' }}>·</span>
                      <Users aria-hidden="true" size={13} />
                      <span className="text-xs font-medium">{act.audience}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg mb-3" style={{ color: 'var(--navy)' }}>{act.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {act.tags.map((tag) => (
                        <span key={tag} className="text-[11px] px-2 py-0.5 font-medium" style={{ background: 'rgba(11,10,63,0.05)', color: 'var(--navy)', border: '1px solid rgba(11,10,63,0.1)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={act.registrationHref}
                      className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-150"
                      style={{ color: act.status === '已截止' ? 'var(--muted)' : 'var(--accent)' }}
                      aria-disabled={act.status === '已截止'}
                    >
                      {act.status === '已截止' ? '報名已截止' : '查看詳細簡章 / 立即報名'}
                      {act.status !== '已截止' && <ChevronRight aria-hidden="true" size={13} className="transition-transform duration-150 group-hover:translate-x-0.5" />}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 活動照片 ───────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--navy)' }}>
        <div className={inner}>
          <div className="text-center mb-14">
            <SectionLabel light>活動花絮</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: '#FFFFFF' }}>
              現場是這樣的
            </h2>
          </div>
          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: photoSlots }).map((_, i) => (
              <div
                key={i}
                className="relative overflow-hidden flex items-center justify-center"
                style={{
                  aspectRatio: i === 0 ? '16/9' : '4/3',
                  gridColumn: i === 0 ? 'span 2' : undefined,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <ImageIcon aria-hidden="true" size={24} style={{ color: 'rgba(255,255,255,0.15)' }} />
                <span className="absolute top-0 left-0 w-6 h-6 pointer-events-none" style={{ borderTop: '1px solid rgba(232,144,39,0.3)', borderLeft: '1px solid rgba(232,144,39,0.3)' }} aria-hidden="true" />
                <span className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none" style={{ borderBottom: '1px solid rgba(232,144,39,0.3)', borderRight: '1px solid rgba(232,144,39,0.3)' }} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* ── CTA ───────────────────────────────── */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className={`${inner} text-center`}>
          <SectionLabel>立即行動</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: 'var(--navy)' }}>
            名額有限，及早卡位
          </h2>
          <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
            每屆營隊名額嚴格控管，確保每位學員都能獲得充分的互動與指導。填表登記後我們將第一時間通知你開放報名。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="hero-cta-primary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide">
              前往報名表單
              <ChevronRight aria-hidden="true" size={16} />
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide transition-colors duration-150" style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}>
              加入 LINE 接收通知
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
