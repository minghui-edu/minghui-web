import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MessageCircle, BookOpen, Trophy, Lightbulb } from 'lucide-react';

/* ─── Shared layout token ───────────────────── */
const inner = 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8';

/* ─── Data ──────────────────────────────────── */

const tutors: Record<string, {
  name: string;
  title: string;
  tags: string[];
  intro: string;
  exp: string;
  philosophy: string;
}> = {
  jason: {
    name: '王老師 (Jason)',
    title: 'Stanford University 電機碩士',
    tags: ['留學申請輔導', 'SOP撰寫', 'TOEFL/GRE'],
    intro: '我擅長引導學生發掘自身優勢，並將其轉化為具備說服力的申請文件。上課氛圍輕鬆但邏輯嚴密，透過不斷的提問與討論，確保每一堂課都有實質產出。',
    exp: '曾任矽谷頂尖科技公司工程師，具備 5 年留學代辦與家教經驗。過去三年內，輔導超過 20 位學生成功申請上 Stanford, MIT, CMU 等頂尖學府的碩博士班。',
    philosophy: '我認為「申請」不只是單純的包裝，而是一個重新認識自己、釐清職涯目標的過程。我會陪著學生一起梳理過去的經歷，找出最閃亮的珍珠，串成獨一無二的專屬故事。',
  },
  sarah: {
    name: '林老師 (Sarah)',
    title: 'Cambridge University 生物博士',
    tags: ['IB/AP 生物', '英國大學申請', '面試輔導'],
    intro: '以啟發式教學為主，跳脫傳統的背誦框架。我會透過實際生活案例與最新權威期刊論文，帶領學生探討科學本質，讓高中生物變得生動且靈活運用。',
    exp: '擁有劍橋大學入學面試官的相關訓練經驗，熟知英國教育體制與入學門檻。已輔導多名高中生順利進入牛津、劍橋與帝國理工學院等 G5 名校。',
    philosophy: '真正的學習發生在學生提出好問題的那個時刻。比起直接給予正確答案，我更傾向帶領學生一步步推導過程，建立他們堅實且獨立的科學思考邏輯。',
  },
  kevin: {
    name: '陳老師 (Kevin)',
    title: '台大資工系學士 / 競賽保送生',
    tags: ['APCS 檢定', 'C++/Python', '演算法競賽'],
    intro: '程式碼的背後是嚴謹的邏輯與數學。上課時我會從最底層的運算邏輯教起，搭配大量的上機實作與觀念刻意練習，幫助學生突破思考盲點。',
    exp: '曾獲全國資訊學科能力競賽一等獎，目前擔任多所知名高中資訊社團的指導老師。累積輔導超過 50 名學生取得 APCS 實作四級分以上的優異成績。',
    philosophy: '寫程式從來就不該是複製貼上，而是理解每一個指令背後的意義與效能。我希望能培養出能獨立解決問題、並享受 Coding 樂趣的學生。',
  },
};

const sections = [
  { key: 'intro' as const, label: '簡介與教學方式', icon: BookOpen, color: 'var(--navy)', bg: 'rgba(11,10,63,0.06)' },
  { key: 'exp' as const, label: '經歷與教學成果', icon: Trophy, color: '#0F5132', bg: 'rgba(15,81,50,0.06)' },
  { key: 'philosophy' as const, label: '特色與教學理念', icon: Lightbulb, color: '#1E56A0', bg: 'rgba(30,86,160,0.06)' },
];

export async function generateStaticParams() {
  return Object.keys(tutors).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const tutor = tutors[id];
  if (!tutor) return {};
  return {
    title: `${tutor.name} — 師資介紹`,
    description: tutor.intro.slice(0, 100),
  };
}

/* ─── Page ──────────────────────────────────── */

export default async function TutorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tutor = tutors[id];
  if (!tutor) notFound();

  return (
    <div>

      {/* ── Header ────────────────────────────── */}
      <section className="relative overflow-hidden py-20" style={{ background: 'var(--navy)' }}>
        <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className={`relative ${inner}`}>

          {/* Back link */}
          <Link
            href="/tutor"
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            <ArrowLeft aria-hidden="true" size={15} />
            返回師資列表
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            {/* Name & info */}
            <div className="flex items-center gap-6">
              {/* Avatar placeholder */}
              <div
                className="w-20 h-20 rounded-full shrink-0 flex items-center justify-center font-display font-bold text-2xl"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--accent-light)', border: '2px solid rgba(232,144,39,0.3)' }}
                aria-hidden="true"
              >
                {tutor.name[0]}
              </div>
              <div>
                <h1
                  className="font-display font-bold leading-tight mb-1"
                  style={{ color: '#FFFFFF', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}
                >
                  {tutor.name}
                </h1>
                <p className="text-base font-medium mb-4" style={{ color: 'var(--accent-light)' }}>
                  {tutor.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tutor.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 font-medium"
                      style={{
                        background: 'rgba(232,144,39,0.12)',
                        color: 'var(--accent-light)',
                        border: '1px solid rgba(232,144,39,0.25)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* LINE CTA */}
            <a
              href="https://line.me/R/ti/p/@minghui_official"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-7 py-4 font-semibold text-sm tracking-wide transition-colors duration-150"
              style={{
                background: '#00B900',
                color: '#FFFFFF',
              }}
            >
              <MessageCircle aria-hidden="true" size={17} />
              透過官方 LINE 預約
            </a>
          </div>

          {/* Divider */}
          <div className="mt-10 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
        </div>
      </section>

      {/* ── Content sections ──────────────────── */}
      <section className="py-16" style={{ background: 'var(--cream)' }}>
        <div className={inner}>
          <div className="space-y-6">
            {sections.map(({ key, label, icon: Icon, color, bg }) => (
              <div
                key={key}
                className="p-8"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${color}` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: bg }}>
                    <Icon aria-hidden="true" size={18} style={{ color }} />
                  </div>
                  <h2 className="font-display font-bold text-lg" style={{ color: 'var(--navy)' }}>{label}</h2>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{tutor[key]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────── */}
      <section className="py-16" style={{ background: 'var(--navy)' }}>
        <div className={`${inner} text-center`}>
          <p className="font-display italic text-lg mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
            對這位老師有興趣？透過 LINE 官方帳號與我們聯繫
          </p>
          <a
            href="https://line.me/R/ti/p/@minghui_official"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide transition-opacity duration-150 hover:opacity-90"
            style={{ background: '#00B900', color: '#FFFFFF' }}
          >
            <MessageCircle aria-hidden="true" size={17} />
            透過官方 LINE 預約
          </a>
        </div>
      </section>

    </div>
  );
}
