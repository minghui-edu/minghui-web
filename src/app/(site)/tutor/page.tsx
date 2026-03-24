import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Banknote, GraduationCap, ChevronRight, ClipboardList, UserCheck, MessageCircle, Handshake } from 'lucide-react';

export const metadata: Metadata = {
  title: '專業家教',
  description: '零抽成、透明化的優質家教平台，專注於國外升學輔導與留學諮詢。',
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

const features = [
  {
    icon: ShieldCheck,
    title: '嚴格把關，保證品質',
    desc: '與一般市面上的家教平台不同，我們不接受隨意刊登。平台上的每一位老師都必須經過官方的嚴格查核，確認其學歷真偽，並評估其實際教學能力。',
    color: 'var(--navy)',
    bg: 'rgba(11,10,63,0.06)',
  },
  {
    icon: Banknote,
    title: '創造雙贏的收費機制',
    desc: '平台在日後的家教費上絕不抽成，僅在媒合成功時收取一次性的合理媒合費。讓老師獲得完整報酬，家長享受高性價比的教學服務。',
    color: '#0F5132',
    bg: 'rgba(15,81,50,0.06)',
  },
];

const steps = [
  {
    num: '01',
    icon: ClipboardList,
    title: '老師填表申請',
    desc: '老師線上填寫表單並上傳履歷，由我們把關師資品質。',
  },
  {
    num: '02',
    icon: UserCheck,
    title: '人工上架曝光',
    desc: '審核通過後，由官方人工上架履歷至網站，供學生瀏覽。',
  },
  {
    num: '03',
    icon: MessageCircle,
    title: 'LINE 官方預約',
    desc: '學生透過 LINE 提出需求，由官方協助聯繫與確認意願。',
  },
  {
    num: '04',
    icon: Handshake,
    title: '媒合成功收費',
    desc: '向老師收取媒合費後，提供雙方聯絡方式，開始試教。',
  },
];

const tutors = [
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

/* ─── Page ──────────────────────────────────── */

export default function TutorPage() {
  return (
    <div>

      {/* ── Hero ──────────────────────────────── */}
      <section className="relative overflow-hidden py-28" style={{ background: 'var(--navy)' }}>
        <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{ width: '50vw', height: '100%', background: 'radial-gradient(ellipse at 80% 30%, rgba(232,144,39,0.06) 0%, transparent 65%)' }}
          aria-hidden="true"
        />
        <div className={`relative ${inner}`}>
          <SectionLabel light>師資媒合平台</SectionLabel>
          <h1
            className="font-display font-bold leading-[1.1] mb-6"
            style={{ color: '#FFFFFF', fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
          >
            找到最適合你的老師
            <br />
            <em style={{ color: 'var(--accent-light)', fontStyle: 'italic' }}>零抽成，透明媒合</em>
          </h1>
          <div className="gold-rule w-20 mb-8" aria-hidden="true" />
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.62)' }}>
            我們專注於國外升學輔導與留學諮詢，嚴選頂尖師資，以半人工精緻媒合，讓每一次配對都真正有效。
          </p>
        </div>
      </section>

      {/* ── 平台特色 ───────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--cream)' }}>
        <div className={inner}>
          <div className="text-center mb-14">
            <SectionLabel>平台特色</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
              為什麼選擇明慧家教
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
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

      {/* ── 媒合流程 ───────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--surface)' }}>
        <div className={inner}>
          <div className="text-center mb-14">
            <SectionLabel>媒合流程</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
              半人工精緻媒合流程
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {steps.map(({ num, icon: Icon, title, desc }) => (
              <div
                key={num}
                className="p-6 relative overflow-hidden"
                style={{ border: '1px solid var(--border)', borderTop: '3px solid var(--accent)' }}
              >
                <span
                  className="font-display absolute top-3 right-4 text-7xl font-bold select-none pointer-events-none leading-none"
                  style={{ color: 'rgba(11,10,63,0.04)' }}
                  aria-hidden="true"
                >
                  {num}
                </span>
                <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ background: 'var(--accent-dim)' }}>
                  <Icon aria-hidden="true" size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--navy)' }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <a
              href="#"
              className="hero-cta-primary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide"
            >
              <GraduationCap aria-hidden="true" size={18} />
              老師填寫履歷表單
            </a>
          </div>
        </div>
      </section>

      {/* ── 師資列表 ───────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--cream)' }}>
        <div className={inner}>
          <div className="flex items-end justify-between mb-12 gap-4">
            <div>
              <SectionLabel>精選師資</SectionLabel>
              <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
                國外升學專區
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor) => (
              <Link
                key={tutor.id}
                href={`/tutor/${tutor.id}`}
                className="group bg-white p-6 flex flex-col transition-shadow duration-200 hover:shadow-lg"
                style={{ border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-4 mb-5 pb-5" style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <div
                    className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center font-display font-bold"
                    style={{ background: 'rgba(11,10,63,0.07)', color: 'var(--navy)', fontSize: '1.25rem' }}
                    aria-hidden="true"
                  >
                    {tutor.name[0]}
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="font-bold text-base leading-tight mb-1 transition-colors duration-150 group-hover:text-[#1E56A0]"
                      style={{ color: 'var(--navy)' }}
                    >
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
                <span className="inline-flex items-center gap-1 text-xs font-semibold mt-auto" style={{ color: 'var(--accent)' }}>
                  查看完整介紹
                  <ChevronRight
                    aria-hidden="true"
                    size={13}
                    className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
