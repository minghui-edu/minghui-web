import Link from 'next/link';
import { ChevronRight, ShieldCheck, Banknote, Award, Quote } from 'lucide-react';

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
    title: '10 年深耕教育',
    desc: '自創立以來專注台灣教育領域超過十年，服務超過 2,000 位學生，積累豐富的升學輔導與活動策劃經驗。',
    color: '#1E56A0',
    bg: 'rgba(30,86,160,0.06)',
  },
];

const featuredTutors = [
  {
    id: 'jason',
    name: '王老師 (Jason)',
    title: 'Stanford University 電機碩士',
    tags: ['留學申請輔導', 'SOP撰寫', 'TOEFL/GRE'],
    shortExp: '協助 20+ 學生錄取美國 Top 30 名校。',
  },
  {
    id: 'sarah',
    name: '林老師 (Sarah)',
    title: 'Cambridge University 生物博士',
    tags: ['IB/AP 生物', '英國大學申請', '面試輔導'],
    shortExp: '專精英國 G5 大學申請與全英面試特訓。',
  },
  {
    id: 'kevin',
    name: '陳老師 (Kevin)',
    title: '台大資工系學士 / 競賽保送生',
    tags: ['APCS 檢定', 'C++/Python', '演算法競賽'],
    shortExp: '帶領多位高中生於資訊學科能力競賽獲獎。',
  },
];

const testimonials = [
  {
    quote: '參加明慧的科系探索營，讓我第一次真正了解電機系的日常。豐富的實作課程大大充實了我的學習歷程，最後順利考上了心目中的科系。',
    name: '王同學',
    context: '台大電機系 · 探索營學員',
    year: '2023',
  },
  {
    quote: '透過明慧找到的家教老師，不只幫我準備完整的留學文件，更讓我重新認識自己的研究方向。最終拿到 CMU 電腦科學碩士的入學許可。',
    name: '陳同學',
    context: 'CMU 電腦科學碩士 · 家教媒合學員',
    year: '2023',
  },
  {
    quote: '東京遊學行程讓我提前感受留學生活，學長姐分享的申請秘訣完全是網路上找不到的乾貨，讓我下定決心申請早稻田大學。',
    name: '林同學',
    context: '高中三年級 · 海外遊學學員',
    year: '2024',
  },
];

const partners = [
  '台北市政府青年局',
  '東京大學台灣留學生會',
  '慶應義塾大學台灣留學生會',
  '北京大學兩岸文化交流協會',
  '星創音樂',
];

/* ─── Sub-components ────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 flex items-center gap-2"
      style={{ color: 'var(--accent)' }}
    >
      <span className="w-5 h-px shrink-0" style={{ background: 'var(--accent)' }} aria-hidden="true" />
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

export default function HomePage() {
  return (
    <div>

      {/* ── Hero ──────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'var(--navy)', minHeight: '88vh', display: 'flex', alignItems: 'center' }}
      >
        <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute right-0 top-0 bottom-0 pointer-events-none"
          style={{ width: '40vw', background: 'linear-gradient(135deg, transparent 60%, rgba(232,144,39,0.04) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px" style={{ background: 'var(--accent)' }} aria-hidden="true" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>
                台灣頂尖教育顧問平台
              </span>
            </div>
            <h1
              className="font-display font-bold leading-[1.1] mb-6"
              style={{ color: '#FFFFFF', fontSize: 'clamp(2.6rem, 6vw, 4.5rem)' }}
            >
              啟發潛能
              <br />
              <em style={{ color: 'var(--accent-light)', fontStyle: 'italic' }}>探索無限未來</em>
            </h1>
            <div className="gold-rule w-20 mb-8" aria-hidden="true" />
            <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
              我們提供最專業的科系探索營隊、海外名校參訪、頂尖家教媒合與學霸筆記，為您的升學之路保駕護航。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/exploration" className="hero-cta-primary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide">
                探索主打營隊
                <ChevronRight aria-hidden="true" size={16} />
              </Link>
              <Link href="/tutor" className="hero-cta-secondary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide">
                尋找專業家教
              </Link>
            </div>
          </div>
          <div className="mt-20 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
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

      {/* ── B: 為什麼選我們 ────────────────────── */}
      <section className="py-20 px-4" style={{ background: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto">
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
                className="p-8 relative"
                style={{ border: '1px solid var(--border)', borderLeft: `4px solid ${color}` }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-6"
                  style={{ background: bg }}
                >
                  <Icon aria-hidden="true" size={24} style={{ color }} />
                </div>
                <h3 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--navy)' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────── */}
      <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
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
      </section>

      {/* ── D: 精選師資 ───────────────────────── */}
      <section className="py-20 px-4" style={{ background: 'var(--cream)' }}>
        <div className="max-w-7xl mx-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTutors.map((tutor) => (
              <Link
                key={tutor.id}
                href={`/tutor/${tutor.id}`}
                className="group bg-white p-6 flex flex-col transition-shadow duration-200 hover:shadow-lg"
                style={{ border: '1px solid var(--border)' }}
              >
                {/* Avatar placeholder */}
                <div className="flex items-center gap-4 mb-5 pb-5" style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <div
                    className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center text-sm font-display font-bold"
                    style={{ background: 'rgba(11,10,63,0.07)', color: 'var(--navy)', fontSize: '1.25rem' }}
                    aria-hidden="true"
                  >
                    {tutor.name[0]}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base leading-tight mb-1 group-hover:text-[#1E56A0] transition-colors" style={{ color: 'var(--navy)' }}>
                      {tutor.name}
                    </h3>
                    <p className="text-xs leading-snug" style={{ color: 'var(--muted)' }}>{tutor.title}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tutor.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 font-medium"
                      style={{ background: 'rgba(11,10,63,0.05)', color: 'var(--navy)', border: '1px solid rgba(11,10,63,0.1)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-grow mb-4" style={{ color: 'var(--muted)' }}>
                  {tutor.shortExp}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold mt-auto"
                  style={{ color: 'var(--accent)' }}
                >
                  查看完整介紹
                  <ChevronRight aria-hidden="true" size={13} className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── A: 學生口碑 ───────────────────────── */}
      <section className="py-20 px-4" style={{ background: 'var(--navy)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>學員心聲</SectionLabel>
            <h2
              className="font-display font-bold text-3xl md:text-4xl"
              style={{ color: '#FFFFFF' }}
            >
              他們的故事
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-8 flex flex-col relative"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderTop: '3px solid var(--accent)',
                }}
              >
                <Quote
                  aria-hidden="true"
                  size={28}
                  className="mb-4 shrink-0"
                  style={{ color: 'var(--accent)', opacity: 0.6 }}
                />
                <p
                  className="text-sm leading-relaxed flex-grow mb-6 font-display italic"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  {t.quote}
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                  <p className="font-semibold text-sm" style={{ color: 'var(--accent-light)' }}>{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{t.context} · {t.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── E: 過往合作夥伴 ───────────────────── */}
      <section className="py-16 px-4" style={{ background: 'var(--surface)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <SectionLabel>信任與合作</SectionLabel>
            <h2 className="font-display font-bold text-2xl md:text-3xl" style={{ color: 'var(--navy)' }}>
              過往合作夥伴
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {partners.map((name, i) => (
              <div
                key={i}
                className="px-6 py-3 text-sm font-medium tracking-wide"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--muted)',
                  background: 'var(--cream)',
                }}
              >
                {name}
              </div>
            ))}
          </div>
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
