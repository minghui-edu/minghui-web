import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle, Facebook, Instagram, Youtube, MessageCircle, Target, TrendingUp, Compass, ExternalLink } from 'lucide-react';
import { TrackedLink } from '@/components/ui/TrackedLink';

export const metadata: Metadata = {
  title: '關於明慧教育',
  description: '明慧教育創立於2025年，在此之前團隊已累積了12年的補教教育經驗，並曾舉辦超過 20 梯次營隊，協助 10,000+ 學生找到未來方向， 120+ 錄取世界前100名校。',
  openGraph: {
    title: '關於明慧教育',
    description: '12年補教教育經驗，舉辦超過 20 梯次營隊，協助 10,000+ 學生找到未來方向。',
    url: 'https://www.minghuiedu.com/about',
  },
  alternates: { canonical: 'https://www.minghuiedu.com/about' },
};

/* ─── Shared layout token ───────────────────── */
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

/* ─── Data ──────────────────────────────────── */

const achievements = [
  {
    heading: '全球實績',
    items: [
      { label: '萬名見證', desc: '服務超過 10,000 名學員，足跡遍及台灣、上海、深圳、北京、東莞、英國、越南、關島、奧勒岡、紐約、墨爾本。' },
      { label: '專業巡迴', desc: '受邀至台北、北京、重慶、長沙、廣東等地舉辦筆記教學講座，聽眾累計 6,000 人。' },
      { label: '百大推手', desc: '120+ 位學子錄取世界前 100 名校，教學成果斐然。' },
    ],
  },
  {
    heading: '頂尖榜單',
    items: [
      { label: '海外名校', desc: '哈佛、MIT、紐約大學、柏克萊、羅德島設計學院、西北大學、賓州大學、康乃爾、墨爾本大學、倫敦國王學院、香港大學等。' },
      { label: '國內指標', desc: '台大（電機、物理、法律、牙醫）、北醫醫學、陽明醫學等頂尖系所。' },
    ],
  },
];

const timeline: {
  period: string;
  year: string;
  desc?: string;
  items?: string[];
}[] = [
  {
    period: '投身補教',
    year: '2014',
    desc: '創辦人賴森奎投入補教界，任教台北南陽街知名補習班，開始深耕教育事業。',
  },
  {
    period: '桃李遍地',
    year: '2018',
    desc: '所教家教學生達數百名，多人錄取國內外頂尖名校，教學成果備受肯定。',
  },
  {
    period: '開拓媒體',
    year: '2020',
    desc: '成立 YouTube 頻道「Go To NTU 奎哥我要上台大」，將升學知識化為公開免費資源。',
  },
  {
    period: '媒體採訪',
    year: '2021',
    desc: '因家教經驗豐富受邀各大媒體採訪，包含1111人力銀行、Dcard、中廣、民視、八大、聯合新聞、蘋果新聞、年代新聞、今周刊、ETtoday財經雲等。',
  },
  {
    period: 'DELC 誕生',
    year: '2022',
    desc: '創立 DELC 科系探索領袖營，帶領學生實際走訪各大學科系，突破升學資訊落差。',
  },
  {
    period: '廣傳教育',
    year: '2023',
    desc: '教育文章廣獲各大媒體轉發，包含 1111大學網等平台，持續擴大社會影響力。',
  },
  {
    period: '明慧啟航',
    year: '2025',
    items: [
      '正式成立明慧教育有限公司',
      '獲得台北市政府青年局補助指導',
      '與東京大學、慶應大學台灣留學生會建立合作關係',
    ],
  },
];

const coreValues = [
  {
    icon: Target,
    title: '個人化學習',
    desc: '我們相信每位學生的學習路徑都是獨一無二的。從需求評估到課程規劃，由專業教師團隊量身打造最適合的成長學習方案，而非套用統一教材、模板。',
    color: 'var(--navy)',
    bg: 'rgba(11,10,63,0.06)',
  },
  {
    icon: TrendingUp,
    title: '高效成長',
    desc: '嚴選師資、精煉課程內容，讓每一分投入都能帶來最大回報。我們以可見的成果說話——從大學錄取名單到每位學生的學習歷程，數字是最好的證明。',
    color: '#0F5132',
    bg: 'rgba(15,81,50,0.06)',
  },
  {
    icon: Compass,
    title: '未來探索',
    desc: '升學不只是考試，更是找到人生方向的過程。透過營隊、遊學與深度諮詢， 93% 參與學生在踏入大學前，就對未來有更清晰的輪廓、更清楚未來科系選擇。',
    color: '#1E56A0',
    bg: 'rgba(30,86,160,0.06)',
  },
];

const mediaItems = [
  {
    outlet: '壹電視 NEXT TV',
    title: '台大碩士生「黃金家教」年收破百萬，家教行程滿檔，學生凌晨2點也要上課！',
    href: 'https://youtu.be/5OYc3CdTUEQ?si=kp3iLx6QLt60Hm0W',
    image: 'https://img.youtube.com/vi/5OYc3CdTUEQ/hqdefault.jpg',
  },
  {
    outlet: '1111人力銀行',
    title: '明慧教育創辦人賴森奎，因家教經驗豐富，受邀分享未來線上教育趨勢',
    href: 'https://youtu.be/QQ3POug3gwc?si=2YKW_lthl3m05PWm&t=136',
    image: 'https://img.youtube.com/vi/QQ3POug3gwc/hqdefault.jpg',
  },
  {
    outlet: 'ETtoday 財經雲',
    title: '台大男擔任家教，一週教13名學生，成績、家教、活動樣樣兼顧，網全跪了',
    href: 'https://finance.ettoday.net/news/1958005',
    image: 'https://cdn2.ettoday.net/images/4276/e4276749.jpg',
  },
];

const socials = [
  { href: 'https://www.facebook.com/delc2022', label: '明慧教育 Facebook 粉絲專頁', icon: Facebook, handle: '營隊 Facebook' },
  { href: 'https://www.instagram.com/delc_2022', label: '明慧教育 Instagram 官方帳號', icon: Instagram, handle: '官方 Instagram' },
  { href: 'https://lin.ee/6uAXvJu', label: '明慧教育 LINE 官方帳號', icon: MessageCircle, handle: 'LINE 官方帳號' },
  { href: 'https://www.youtube.com/@gotontu4507', label: '明慧教育 YouTube 頻道', icon: Youtube, handle: 'YouTube 頻道' },
];

/* ─── Structured Data ───────────────────────── */

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.minghuiedu.com/#organization',
  name: '明慧教育',
  alternateName: 'MingHui Education',
  url: 'https://www.minghuiedu.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.minghuiedu.com/logo.png',
  },
  description: '明慧教育由台大校友創立，深耕補教教育超過12年，協助10,000+學生找到未來方向，120+學生錄取世界前100名校。',
  foundingDate: '2025',
  founders: [
    {
      '@type': 'Person',
      name: '賴森奎',
      jobTitle: '創辦人',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: '國立臺灣大學',
      },
    },
  ],
  areaServed: 'TW',
  knowsAbout: ['升學輔導', '科系探索', '海外遊學', '家教媒合'],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.minghuiedu.com/about#webpage',
  url: 'https://www.minghuiedu.com/about',
  name: '關於明慧教育',
  description: '明慧教育創立於2012年，12年補教教育經驗，協助10,000+學生找到未來方向。',
  isPartOf: { '@id': 'https://www.minghuiedu.com/#website' },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2'],
  },
};

/* ─── Page ──────────────────────────────────── */

export default function AboutPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, webPageSchema]) }}
      />

      {/* ── Hero ──────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28"
        style={{ background: 'var(--navy)' }}
      >
        <div className="hidden md:block absolute inset-0">
          <div className="absolute inset-y-0 right-0 w-[50%] overflow-hidden">
            <Image src="/hero-about.png" alt="" fill className="object-cover object-center" priority sizes="50vw" />
          </div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--navy) 35%, rgba(11,10,63,0.9) 50%, rgba(11,10,63,0.3) 70%, transparent 88%)' }} />
        </div>
        <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{ width: '50vw', height: '100%', background: 'radial-gradient(ellipse at 80% 30%, rgba(232,144,39,0.06) 0%, transparent 65%)' }}
          aria-hidden="true"
        />
        <div className={`relative ${inner}`}>
          <SectionLabel light>關於我們</SectionLabel>
          <h1
            className="font-display font-bold leading-[1.1] mb-6"
            style={{ color: '#FFFFFF', fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
          >
            打破資訊落差
            <br />
            <em style={{ color: 'var(--accent-light)', fontStyle: 'italic' }}>讓夢想不再遙遠</em>
          </h1>
          <div className="gold-rule w-20 mb-8" aria-hidden="true" />
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.62)' }}>
            明慧教育由台大校友創立，深信教育不僅是提升成績，更是引導潛力與方向。
            憑藉專業師資與陪伴，為每位學子打造清晰且長遠的成長路徑。
          </p>
        </div>
      </section>

      {/* ── 創辦理念 ───────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--cream)' }}>
        <div className={inner}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">

            {/* Left: text */}
            <div>
              <SectionLabel>創辦理念</SectionLabel>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-6" style={{ color: 'var(--navy)' }}>
                明慧教育：創辦宗旨與卓越實績
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
                由台大校友團隊創立，深耕補教逾 12 年。致力以「沉浸式實作與啟發」教學，打破資訊落差，
                透過資源共享與專業引導，助學子在迷惘中勇敢逐夢。
              </p>
              <div className="space-y-8">
                {achievements.map(({ heading, items }) => (
                  <div key={heading}>
                    <h3
                      className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 flex items-center gap-2"
                      style={{ color: 'var(--accent)' }}
                    >
                      <span className="w-5 h-px shrink-0" style={{ background: 'currentColor' }} aria-hidden="true" />
                      {heading}
                    </h3>
                    <ul className="space-y-3">
                      {items.map(({ label, desc }) => (
                        <li key={label} className="flex items-start gap-3">
                          <CheckCircle
                            aria-hidden="true"
                            size={18}
                            className="shrink-0 mt-0.5"
                            style={{ color: 'var(--accent)' }}
                          />
                          <span className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                            <strong style={{ color: 'var(--navy)' }}>{label}：</strong>{desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: team photo */}
            <div className="flex">
              <div className="relative overflow-hidden w-full min-h-[320px]">
                <Image src="/team-photo.png" alt="明慧教育團隊" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <span className="absolute top-0 left-0 w-10 h-10 pointer-events-none" style={{ borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', opacity: 0.5 }} aria-hidden="true" />
                <span className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none" style={{ borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)', opacity: 0.5 }} aria-hidden="true" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 核心價值 ───────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--surface)' }}>
        <div className={inner}>
          <div className="text-center mb-14">
            <SectionLabel>核心價值</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
              我們相信的三件事
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map(({ icon: Icon, title, desc, color, bg }) => (
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
        </div>
      </section>

      {/* ── 發展歷程 ───────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--surface)' }}>
        <div className={inner}>
          <div className="text-center mb-14">
            <SectionLabel>品牌故事</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
              我們的發展歷程
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical connector line */}
              <div
                className="absolute top-5 bottom-5 pointer-events-none"
                style={{ left: '19px', width: '1px', background: 'var(--border)' }}
                aria-hidden="true"
              />

              <div className="space-y-6">
                {timeline.map((item, idx) => {
                  const isCurrent = idx === timeline.length - 1;
                  return (
                    <div key={idx} className="flex gap-6">
                      {/* Dot */}
                      <div className="relative shrink-0 z-10">
                        <div
                          className="w-10 h-10 flex items-center justify-center font-bold"
                          style={{
                            background: isCurrent ? 'var(--accent)' : 'var(--surface)',
                            border: `2px solid ${isCurrent ? 'var(--accent)' : 'var(--border)'}`,
                            color: isCurrent ? 'var(--navy)' : 'var(--muted)',
                            fontSize: '10px',
                          }}
                        >
                          {item.year.slice(2)}
                        </div>
                      </div>

                      {/* Card */}
                      <div
                        className="flex-1 p-6"
                        style={{
                          border: '1px solid var(--border)',
                          borderLeft: isCurrent ? '4px solid var(--accent)' : '1px solid var(--border)',
                          background: isCurrent ? 'rgba(232,144,39,0.04)' : 'transparent',
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display font-bold text-base" style={{ color: 'var(--navy)' }}>
                            {item.period}
                          </h3>
                          <span
                            className="text-[11px] font-medium px-2 py-0.5 tracking-wide"
                            style={{ background: 'var(--border-light)', color: 'var(--muted)' }}
                          >
                            {item.year}
                          </span>
                        </div>
                        {item.desc && (
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                            {item.desc}
                          </p>
                        )}
                        {item.items && (
                          <ul className="space-y-1.5">
                            {item.items.map((point) => (
                              <li key={point} className="flex items-start gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                                <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--accent)' }} aria-hidden="true" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 媒體報導 ───────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--cream)' }}>
        <div className={inner}>
          <div className="text-center mb-14">
            <SectionLabel>媒體報導</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
              媒體這樣說我們
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaItems.map((item, idx) => (
              <TrackedLink
                key={idx}
                href={item.href}
                ga={{ category: 'media', label: item.outlet }}
                target="_blank"
                rel="noopener noreferrer"
                className="media-card group flex flex-col bg-white transition-shadow duration-200 hover:shadow-lg overflow-hidden"
                style={{ border: '1px solid var(--border)', borderTop: '3px solid var(--accent)' }}
              >
                {/* Thumbnail */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                  <span
                    className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3 px-2 py-1 self-start"
                    style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}
                  >
                    {item.outlet}
                  </span>
                  <p className="font-display font-bold text-base leading-snug flex-grow mb-5" style={{ color: 'var(--navy)' }}>
                    {item.title}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                    閱讀報導
                    <ExternalLink aria-hidden="true" size={12} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
                  </span>
                </div>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── 社群追蹤 ───────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--navy)' }}>
        <div className={`${inner} text-center`}>
          <SectionLabel light>社群媒體</SectionLabel>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-4" style={{ color: '#FFFFFF' }}>
            追蹤我們，掌握最新動態
          </h2>
          <p className="text-sm mb-12" style={{ color: 'rgba(255,255,255,0.45)' }}>
            營隊開放報名資訊、升學重要筆記資源、學員故事——第一時間在社群發布
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socials.map(({ href, label, icon: Icon, handle }) => (
              <TrackedLink
                key={handle}
                href={href}
                ga={{ category: 'social', label: `About ${handle}` }}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social flex items-center gap-3 px-6 py-3"
              >
                <Icon aria-hidden="true" size={16} />
                <span className="text-sm font-medium">{handle}</span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── 品牌 quote strip ───────────────────── */}
      <section className="py-16" style={{ background: 'var(--navy)' }}>
        <div className={`${inner} text-center`}>
          <p
            className="font-display italic text-xl md:text-2xl leading-relaxed mb-6"
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
