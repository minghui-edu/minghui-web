import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShoppingCart, BookOpen, List, Package, Users, Star, UserRound } from 'lucide-react';
import { sanityClient } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import NoteCarousel from '@/components/ui/NoteCarousel';

/* ─── Shared layout token ───────────────────── */
const inner = 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8';

export const revalidate = 60;

/* ─── Types ─────────────────────────────────── */

type SanityNote = {
  _id: string;
  title: string;
  slug: { current: string };
  cover?: { asset: { _ref: string } };
  subject?: string;
  level?: string;
  author?: string;
  pages?: number;
  price?: number;
  description?: string;
  targetAudience?: string;
  features?: string;
  aboutAuthor?: string;
  contents?: string[];
  includes?: string[];
  tags?: string[];
  purchaseUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  previewImages?: any[];
};

/* ─── Static params ─────────────────────────── */

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await sanityClient.fetch(
    `*[_type == "note" && defined(slug.current)]{ slug }`
  );
  return slugs.map((s) => ({ id: s.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const note: Pick<SanityNote, 'title' | 'description' | 'targetAudience'> | null = await sanityClient.fetch(
    `*[_type == "note" && slug.current == $slug][0]{ title, description, targetAudience }`,
    { slug: id }
  );
  if (!note) return {};
  return {
    title: `${note.title} — 高分筆記`,
    description: (note.targetAudience ?? note.description)?.slice(0, 100),
  };
}

/* ─── Page ──────────────────────────────────── */

export default async function NoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const note: SanityNote | null = await sanityClient.fetch(
    `*[_type == "note" && slug.current == $slug][0]{
      _id, title, slug, cover, subject, level, author, pages,
      price, description, targetAudience, features, aboutAuthor,
      contents, includes, tags, purchaseUrl, previewImages
    }`,
    { slug: id }
  );

  if (!note) notFound();

  const priceLabel = note.price != null ? `NT$ ${note.price.toLocaleString()}` : '洽詢價格';
  const buyHref = note.purchaseUrl ?? '#';

  /* Preview images → carousel-ready array */
  const carouselImages = (note.previewImages ?? []).map((img, i) => ({
    src: urlFor(img).width(800).height(800).fit('clip').url(),
    alt: `${note.title} 筆記預覽 ${i + 1}`,
  }));

  /* Whether new structured description fields are filled */
  const hasNewDesc = !!(note.targetAudience || note.features || note.aboutAuthor);

  return (
    <div>

      {/* ── Header ────────────────────────────── */}
      <section className="relative overflow-hidden py-20" style={{ background: 'var(--navy)' }}>
        <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className={`relative ${inner}`}>

          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            <ArrowLeft aria-hidden="true" size={15} />
            返回筆記商城
          </Link>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            {/* Title block */}
            <div className="flex gap-6 items-start flex-1 min-w-0">
              {/* Cover thumbnail */}
              <div
                className="hidden sm:block relative shrink-0 overflow-hidden"
                style={{ width: '80px', height: '80px', border: '2px solid rgba(232,144,39,0.4)' }}
              >
                {note.cover ? (
                  <Image
                    src={urlFor(note.cover).width(160).height(160).fit('crop').url()}
                    alt={note.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <span className="font-display font-bold text-3xl" style={{ color: 'rgba(255,255,255,0.2)' }}>
                      {note.subject?.[0] ?? '筆'}
                    </span>
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  {note.subject && (
                    <span
                      className="text-[11px] font-semibold tracking-wide px-2.5 py-1"
                      style={{ background: 'rgba(232,144,39,0.15)', color: 'var(--accent-light)', border: '1px solid rgba(232,144,39,0.3)' }}
                    >
                      {note.subject}
                    </span>
                  )}
                  {note.level && (
                    <span
                      className="text-[11px] font-semibold tracking-wide px-2.5 py-1"
                      style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)' }}
                    >
                      {note.level}
                    </span>
                  )}
                </div>
                <h1
                  className="font-display font-bold leading-tight mb-2"
                  style={{ color: '#FFFFFF', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}
                >
                  {note.title}
                </h1>
                {(note.author || note.pages) && (
                  <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {[note.author, note.pages ? `${note.pages} 頁` : null].filter(Boolean).join(' · ')}
                  </p>
                )}
                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 font-medium"
                        style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.1)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price + CTA */}
            <div className="shrink-0 flex flex-col items-start md:items-end gap-3">
              <div className="font-display font-bold" style={{ color: 'var(--accent-light)', fontSize: '2rem' }}>
                {priceLabel}
              </div>
              <a
                href={buyHref}
                target={note.purchaseUrl ? '_blank' : undefined}
                rel={note.purchaseUrl ? 'noopener noreferrer' : undefined}
                className="hero-cta-primary inline-flex items-center gap-2 px-7 py-4 font-semibold text-sm tracking-wide"
              >
                <ShoppingCart aria-hidden="true" size={17} />
                立即購買
              </a>
            </div>
          </div>

          <div className="mt-10 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
        </div>
      </section>

      {/* ── Content sections ──────────────────── */}
      <section className="py-16" style={{ background: 'var(--cream)' }}>
        <div className={inner}>
          <div className="space-y-6">

            {/* ① 筆記預覽（輪播） */}
            {carouselImages.length > 0 && (
              <div
                className="p-8"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)' }}
              >
                <h2 className="font-display font-bold text-lg mb-6" style={{ color: 'var(--navy)' }}>筆記預覽</h2>
                <div className="max-w-sm mx-auto relative">
                  <NoteCarousel images={carouselImages} />
                </div>
              </div>
            )}

            {/* ② 新版結構化說明（三欄），若都未填則 fallback 顯示舊 description */}
            {hasNewDesc ? (
              <>
                {note.targetAudience && (
                  <div
                    className="p-8"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--navy)' }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: 'rgba(11,10,63,0.06)' }}>
                        <Users aria-hidden="true" size={18} style={{ color: 'var(--navy)' }} />
                      </div>
                      <h2 className="font-display font-bold text-lg" style={{ color: 'var(--navy)' }}>誰必須買</h2>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', whiteSpace: 'pre-line' }}>{note.targetAudience}</p>
                  </div>
                )}

                {note.features && (
                  <div
                    className="p-8"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #1E56A0' }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: 'rgba(30,86,160,0.06)' }}>
                        <Star aria-hidden="true" size={18} style={{ color: '#1E56A0' }} />
                      </div>
                      <h2 className="font-display font-bold text-lg" style={{ color: 'var(--navy)' }}>筆記特色</h2>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', whiteSpace: 'pre-line' }}>{note.features}</p>
                  </div>
                )}

                {note.aboutAuthor && (
                  <div
                    className="p-8"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #0F5132' }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: 'rgba(15,81,50,0.06)' }}>
                        <UserRound aria-hidden="true" size={18} style={{ color: '#0F5132' }} />
                      </div>
                      <h2 className="font-display font-bold text-lg" style={{ color: 'var(--navy)' }}>關於作者</h2>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', whiteSpace: 'pre-line' }}>{note.aboutAuthor}</p>
                  </div>
                )}
              </>
            ) : note.description ? (
              <div
                className="p-8"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--navy)' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: 'rgba(11,10,63,0.06)' }}>
                    <BookOpen aria-hidden="true" size={18} style={{ color: 'var(--navy)' }} />
                  </div>
                  <h2 className="font-display font-bold text-lg" style={{ color: 'var(--navy)' }}>筆記簡介</h2>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', whiteSpace: 'pre-line' }}>{note.description}</p>
              </div>
            ) : null}

            {/* ③ 內容目錄 */}
            {note.contents && note.contents.length > 0 && (
              <div
                className="p-8"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #0F5132' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: 'rgba(15,81,50,0.06)' }}>
                    <List aria-hidden="true" size={18} style={{ color: '#0F5132' }} />
                  </div>
                  <h2 className="font-display font-bold text-lg" style={{ color: 'var(--navy)' }}>內容目錄</h2>
                </div>
                <ol className="space-y-2">
                  {note.contents.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm" style={{ color: 'var(--muted)' }}>
                      <span className="shrink-0 font-bold text-xs mt-0.5 w-5 text-right" style={{ color: '#0F5132', opacity: 0.7 }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* ④ 購買包含 */}
            {note.includes && note.includes.length > 0 && (
              <div
                className="p-8"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #1E56A0' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: 'rgba(30,86,160,0.06)' }}>
                    <Package aria-hidden="true" size={18} style={{ color: '#1E56A0' }} />
                  </div>
                  <h2 className="font-display font-bold text-lg" style={{ color: 'var(--navy)' }}>購買包含</h2>
                </div>
                <ul className="space-y-2.5">
                  {note.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--muted)' }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#1E56A0' }} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────── */}
      <section className="py-16" style={{ background: 'var(--navy)' }}>
        <div className={`${inner} text-center`}>
          <p className="font-display italic text-lg mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {note.title}
          </p>
          <p className="font-display font-bold mb-8" style={{ color: 'var(--accent-light)', fontSize: '1.75rem' }}>
            {priceLabel}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={buyHref}
              target={note.purchaseUrl ? '_blank' : undefined}
              rel={note.purchaseUrl ? 'noopener noreferrer' : undefined}
              className="hero-cta-primary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide"
            >
              <ShoppingCart aria-hidden="true" size={17} />
              立即購買
            </a>
            <Link
              href="/notes"
              className="hero-cta-secondary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide"
            >
              返回商城
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
