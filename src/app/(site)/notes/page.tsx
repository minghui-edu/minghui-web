import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ChevronRight, Smartphone, ShoppingCart } from 'lucide-react';
import { sanityClient } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import YouTubeLiteEmbed from '@/components/YouTubeLiteEmbed';

export const metadata: Metadata = {
  title: '高分筆記',
  description: '嚴選台清交成筆記，結合觀念講解影片，高效提升學習成效。',
};

export const revalidate = 60; // ISR：每 60 秒重新驗證

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

/* ─── Types ─────────────────────────────────── */

type SanityNote = {
  _id: string;
  title: string;
  slug: { current: string };
  cover?: { asset: { _ref: string } };
  subject?: string;
  level?: string;
  price?: number;
  purchaseUrl?: string;
};

/* ─── Data ──────────────────────────────────── */

const videos = [
  { id: 'zogyPJGz9fE', title: '【最強】一天速成!! 指考英文作文這是如此簡單' },
  { id: 'uytwHHWCfnM', title: '1%學霸不說的秘密 學測80%考點來自這冊' },
  { id: '5U-UixNj_eE', title: '【最強模板】學測國文的救星 | 最高效率作文準備' },
];

const appFeatures = [
  '隨身攜帶的高效數位化教材',
  '完美整合紙本筆記、題庫與影音資源',
  '智慧學習進度追蹤與弱點分析',
];

/* ─── Page ──────────────────────────────────── */

export default async function NotesPage() {
  const notes: SanityNote[] = await sanityClient.fetch(
    `*[_type == "note" && isAvailable == true] | order(_createdAt desc) {
      _id, title, slug, cover, subject, level, price, purchaseUrl
    }`
  );

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
          <SectionLabel light>學霸筆記商城</SectionLabel>
          <h1
            className="font-display font-bold leading-[1.1] mb-6"
            style={{ color: '#FFFFFF', fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
          >
            名校學長姐的秘密武器
            <br />
            <em style={{ color: 'var(--accent-light)', fontStyle: 'italic' }}>嚴選筆記，高效學習</em>
          </h1>
          <div className="gold-rule w-20 mb-8" aria-hidden="true" />
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.62)' }}>
            嚴選台清交成頂尖學長姐親手整理的精華筆記，搭配觀念講解影片，讓你用最少時間掌握最多重點。
          </p>
        </div>
      </section>

      {/* ── YouTube 影片 ───────────────────────── */}
      <section className="py-20" style={{ background: 'var(--cream)' }}>
        <div className={inner}>
          <div className="flex items-end justify-between mb-12 gap-4">
            <div>
              <SectionLabel>免費資源</SectionLabel>
              <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
                學霸解題 YouTube 影片
              </h2>
            </div>
            <a href="https://www.youtube.com/@gotontu4507" className="about-link hidden sm:inline-flex items-center gap-1 text-sm font-medium shrink-0">
              前往頻道看更多 <ChevronRight aria-hidden="true" size={14} />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((v) => (
              <div key={v.id}>
                <YouTubeLiteEmbed videoId={v.id} title={v.title} />
                <h3
                  className="mt-3 text-sm font-medium leading-snug line-clamp-2"
                  style={{ color: 'var(--navy)' }}
                >
                  {v.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 筆記商城 ───────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--surface)' }}>
        <div className={inner}>
          <div className="mb-12">
            <SectionLabel>官方商城</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
              精選筆記商品
            </h2>
          </div>

          {notes.length === 0 ? (
            <p className="text-center py-16 text-sm" style={{ color: 'var(--muted)' }}>
              商品上架中，敬請期待。
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {notes.map((item) => (
                <div key={item._id} className="bg-white flex flex-col" style={{ border: '1px solid var(--border)' }}>
                  {/* Cover */}
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: '1/1', background: 'rgba(11,10,63,0.05)', borderBottom: '3px solid var(--accent)' }}
                  >
                    {item.cover ? (
                      <Image
                        src={urlFor(item.cover).width(400).height(400).fit('crop').url()}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display font-bold text-5xl" style={{ color: 'var(--navy)', opacity: 0.1 }}>
                          {item.subject?.[0] ?? '筆'}
                        </span>
                      </div>
                    )}
                    {item.level && (
                      <span
                        className="absolute top-3 left-3 text-[10px] font-semibold tracking-wide px-2 py-0.5"
                        style={{ background: 'rgba(11,10,63,0.08)', color: 'var(--navy)', border: '1px solid rgba(11,10,63,0.15)' }}
                      >
                        {item.level}
                      </span>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-5 flex flex-col flex-grow">
                    {item.subject && (
                      <span className="text-[11px] font-medium mb-2" style={{ color: 'var(--accent)' }}>{item.subject}</span>
                    )}
                    <h3 className="font-bold text-sm leading-snug flex-grow mb-3" style={{ color: 'var(--navy)' }}>
                      {item.title}
                    </h3>
                    <div className="font-display font-bold text-xl mb-4" style={{ color: 'var(--accent)' }}>
                      {item.price != null ? `NT$ ${item.price.toLocaleString()}` : '洽詢價格'}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <Link
                        href={`/notes/${item.slug.current}`}
                        className="text-center text-xs font-semibold py-2.5 hover:bg-gray-50 transition-colors duration-150"
                        style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                      >
                        查看詳情
                      </Link>
                      {item.purchaseUrl ? (
                        <a
                          href={item.purchaseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-center text-xs font-semibold py-2.5 hover:opacity-85 transition-opacity duration-150 inline-flex items-center justify-center gap-1"
                          style={{ background: 'var(--accent)', color: 'var(--navy)' }}
                        >
                          <ShoppingCart aria-hidden="true" size={12} />
                          立即購買
                        </a>
                      ) : (
                        <Link
                          href={`/notes/${item.slug.current}`}
                          className="text-center text-xs font-semibold py-2.5 hover:opacity-85 transition-opacity duration-150 inline-flex items-center justify-center gap-1"
                          style={{ background: 'var(--accent)', color: 'var(--navy)' }}
                        >
                          <ShoppingCart aria-hidden="true" size={12} />
                          立即購買
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── APP 預告 ───────────────────────────── */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'var(--navy)' }}>
        <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className={`relative ${inner}`}>
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="md:flex-1">
              <span
                className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 mb-6"
                style={{ background: 'var(--accent)', color: 'var(--navy)' }}
              >
                即將推出 Coming Soon
              </span>
              <SectionLabel light>明慧學習 APP</SectionLabel>
              <h2
                className="font-display font-bold leading-tight mb-6"
                style={{ color: '#FFFFFF', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
              >
                筆記數位化
                <br />
                <em style={{ color: 'var(--accent-light)', fontStyle: 'italic' }}>隨時隨地高效學習</em>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
                我們正致力於將學霸筆記與教材數位化！透過專屬 APP，隨身攜帶教材、重點標記、觀看解題影片，結合強大互動功能。
              </p>
              <ul className="space-y-3 mb-10">
                {appFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <CheckCircle aria-hidden="true" size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://lin.ee/6uAXvJu"
                className="hero-cta-primary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide"
              >
                預約登記早鳥通知
                <ChevronRight aria-hidden="true" size={16} />
              </a>
            </div>
            <div className="shrink-0 flex justify-center">
              <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{ width: '180px', height: '360px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '32px' }}
              >
                <Smartphone aria-hidden="true" size={48} style={{ color: 'rgba(255,255,255,0.15)' }} />
                <span className="absolute bottom-8 text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  APP 開發中
                </span>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full" style={{ width: '48px', height: '6px', background: 'rgba(255,255,255,0.1)' }} aria-hidden="true" />
                <span className="absolute top-0 left-0 w-8 h-8" style={{ borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', opacity: 0.4, borderRadius: '32px 0 0 0' }} aria-hidden="true" />
                <span className="absolute bottom-0 right-0 w-8 h-8" style={{ borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)', opacity: 0.4, borderRadius: '0 0 32px 0' }} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
