import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Calendar, Users, MapPin, Clock, Tag, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { sanityClient } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { ParallaxBg } from '@/components/ui/ParallaxBg';
import { FadeIn } from '@/components/ui/FadeIn';

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

const ACTIVITY_QUERY = `*[_type == "activity" && slug.current == $slug][0]{
  _id,
  title,
  category,
  date,
  duration,
  audience,
  location,
  price,
  maxParticipants,
  tags,
  description,
  schedule,
  includes,
  notes,
  image,
  photos[],
  registrationUrl,
  status
}`;

const ALL_SLUGS_QUERY = `*[_type == "activity" && defined(slug.current)]{ "slug": slug.current }`;

type Activity = {
  _id: string;
  title: string;
  category?: string;
  date?: string;
  duration?: string;
  audience?: string;
  location?: string;
  price?: number;
  maxParticipants?: number;
  tags?: string[];
  description?: string;
  schedule?: string[];
  includes?: string[];
  notes?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photos?: any[];
  registrationUrl?: string;
  status?: string;
};

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient.fetch(ALL_SLUGS_QUERY);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const activity: Activity | null = await sanityClient.fetch(ACTIVITY_QUERY, { slug });
  if (!activity) return { title: '活動不存在' };
  return {
    title: activity.title,
    description: activity.description?.slice(0, 120),
  };
}

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
  '報名中':   { bg: 'rgba(15,81,50,0.1)',      color: '#0F5132',       border: 'rgba(15,81,50,0.25)' },
  '即將開放': { bg: 'rgba(232,144,39,0.1)',     color: 'var(--accent)', border: 'rgba(232,144,39,0.3)' },
  '已額滿':   { bg: 'rgba(100,100,100,0.08)',   color: '#6B7280',       border: 'rgba(100,100,100,0.2)' },
  '已結束':   { bg: 'rgba(100,100,100,0.08)',   color: '#6B7280',       border: 'rgba(100,100,100,0.2)' },
};

export default async function ActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity: Activity | null = await sanityClient.fetch(
    ACTIVITY_QUERY,
    { slug },
    { next: { revalidate: 60 } },
  );

  if (!activity) notFound();

  const s = activity.status ? (statusStyle[activity.status] ?? statusStyle['即將開放']) : statusStyle['即將開放'];
  const canRegister = activity.status === '報名中';

  // Hero 橫式裁切（16:9 landscape）
  const heroImageUrl = activity.image
    ? urlFor(activity.image).width(1200).height(675).fit('crop').url()
    : null;
  // 詳情頁海報直式裁切（3:4 portrait）
  const posterImageUrl = activity.image
    ? urlFor(activity.image).width(720).height(960).fit('crop').url()
    : null;

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: activity.title,
    description: activity.description,
    ...(activity.date && { startDate: activity.date }),
    ...(activity.location && {
      location: { '@type': 'Place', name: activity.location, address: { '@type': 'PostalAddress', addressCountry: 'TW' } },
    }),
    ...(activity.price != null && {
      offers: {
        '@type': 'Offer',
        price: activity.price,
        priceCurrency: 'TWD',
        availability: activity.status === '報名中'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/SoldOut',
        ...(activity.registrationUrl && { url: activity.registrationUrl }),
      },
    }),
    organizer: { '@type': 'Organization', name: '明慧教育', url: 'https://www.minghuiedu.com' },
    ...(heroImageUrl && { image: heroImageUrl }),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28" style={{ background: 'var(--navy)' }}>
        <ParallaxBg>
          {/* Right-side hero photo (md+) — uses activity's own image */}
          {heroImageUrl && (
            <div className="hidden md:block absolute inset-0">
              <div className="absolute inset-y-0 right-0 w-[58%]">
                <Image src={heroImageUrl} alt="" fill className="object-cover object-center" priority sizes="58vw" />
              </div>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--navy) 32%, rgba(11,10,63,0.92) 48%, rgba(11,10,63,0.35) 68%, transparent 84%)' }} />
            </div>
          )}
          <div className="dot-grid absolute inset-0" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 65% 40%, rgba(232,144,39,0.07) 0%, transparent 60%)' }}
          />
        </ParallaxBg>
        <div className={`relative ${inner}`}>
          <FadeIn delay={0}>
            <div className="mb-4">
              <Link
                href="/exploration"
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-opacity hover:opacity-70"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                ← 返回活動列表
              </Link>
            </div>
            <SectionLabel light>{activity.category ?? '科系探索營隊'}</SectionLabel>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {activity.status && (
                <span
                  className="text-xs font-bold px-3 py-1"
                  style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                >
                  {activity.status}
                </span>
              )}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="font-display font-bold leading-[1.1] mb-6"
              style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              {activity.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}><div className="gold-rule w-20 mb-8" aria-hidden="true" /></FadeIn>
          {/* Meta strip */}
          <FadeIn delay={0.25}>
            <div className="flex flex-wrap gap-6">
              {activity.date && (
                <div className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.62)' }}>
                  <Calendar aria-hidden="true" size={15} style={{ color: 'var(--accent)' }} />
                  <span className="text-sm">{activity.date}</span>
                </div>
              )}
              {activity.duration && (
                <div className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.62)' }}>
                  <Clock aria-hidden="true" size={15} style={{ color: 'var(--accent)' }} />
                  <span className="text-sm">{activity.duration}</span>
                </div>
              )}
              {activity.audience && (
                <div className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.62)' }}>
                  <Users aria-hidden="true" size={15} style={{ color: 'var(--accent)' }} />
                  <span className="text-sm">{activity.audience}</span>
                </div>
              )}
              {activity.location && (
                <div className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.62)' }}>
                  <MapPin aria-hidden="true" size={15} style={{ color: 'var(--accent)' }} />
                  <span className="text-sm">{activity.location}</span>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 主視覺 + 簡介 ────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)' }}>
        <div className={`${inner} py-20`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Photo — portrait poster */}
            <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', background: 'rgba(11,10,63,0.05)', border: '1px solid var(--border)' }}>
              {posterImageUrl ? (
                <Image
                  src={posterImageUrl}
                  alt={activity.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ color: 'rgba(11,10,63,0.18)' }}>
                  <ImageIcon aria-hidden="true" size={40} />
                  <span className="text-xs tracking-widest uppercase">Activity Photo</span>
                </div>
              )}
              <span className="absolute top-0 left-0 w-10 h-10 pointer-events-none" style={{ borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', opacity: 0.5 }} aria-hidden="true" />
              <span className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none" style={{ borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)', opacity: 0.5 }} aria-hidden="true" />
            </div>

            {/* Info */}
            <div>
              <SectionLabel>活動簡介</SectionLabel>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-6" style={{ color: 'var(--navy)' }}>
                {activity.title}
              </h2>

              {activity.description && (
                <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', whiteSpace: 'pre-line' }}>
                  {activity.description}
                </p>
              )}

              {/* Tags */}
              {activity.tags && activity.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {activity.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5"
                      style={{ background: 'rgba(11,10,63,0.06)', color: 'var(--navy)', border: '1px solid rgba(11,10,63,0.12)' }}>
                      <Tag aria-hidden="true" size={11} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Price + CTA */}
              <div className="p-6 bg-white" style={{ border: '1px solid var(--border)', borderTop: '3px solid var(--accent)' }}>
                {activity.price != null && (
                  <div className="mb-4">
                    <span className="text-xs font-semibold tracking-wide" style={{ color: 'var(--muted)' }}>活動費用</span>
                    <div className="font-display font-bold text-3xl mt-1" style={{ color: 'var(--navy)' }}>
                      NT$&nbsp;{new Intl.NumberFormat('zh-TW').format(activity.price)}
                    </div>
                  </div>
                )}
                {activity.maxParticipants != null && (
                  <p className="text-xs mb-5" style={{ color: 'var(--muted)' }}>
                    名額限制：{activity.maxParticipants} 人（額滿截止）
                  </p>
                )}
                {canRegister && activity.registrationUrl ? (
                  <a
                    href={activity.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta-primary w-full flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-sm tracking-wide"
                  >
                    立即報名
                    <ChevronRight aria-hidden="true" size={16} />
                  </a>
                ) : (
                  <div className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold"
                    style={{ background: 'rgba(100,100,100,0.08)', color: '#9CA3AF', cursor: 'not-allowed' }}>
                    {activity.status === '即將開放' ? '報名尚未開放' : '報名已截止'}
                  </div>
                )}
                <p className="text-center text-xs mt-3" style={{ color: 'var(--muted)' }}>
                  有疑問？
                  <a href="https://lin.ee/6uAXvJu" className="font-semibold" style={{ color: 'var(--accent)' }}> 加入 LINE 諮詢</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 課程大綱 ──────────────────────────────────────────── */}
      {activity.schedule && activity.schedule.length > 0 && (
        <section style={{ background: 'var(--surface)' }}>
          <div className={`${inner} py-20`}>
            <SectionLabel>課程規劃</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-10" style={{ color: 'var(--navy)' }}>
              行程大綱
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
              {activity.schedule.map((item, i) => (
                <div key={i} className="flex gap-4 pb-6">
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="w-8 h-8 flex items-center justify-center font-display font-bold text-sm shrink-0"
                      style={{ background: 'var(--navy)', color: 'var(--accent)' }}
                    >
                      {i + 1}
                    </div>
                    <div className="w-px flex-1 mt-2" style={{ background: 'var(--border)', minHeight: '1rem' }} />
                  </div>
                  <p className="text-sm leading-relaxed pt-1.5 pb-2" style={{ color: 'var(--muted)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 費用包含 + 注意事項 ────────────────────────────────── */}
      {((activity.includes && activity.includes.length > 0) || (activity.notes && activity.notes.length > 0)) && (
        <section style={{ background: 'var(--cream)' }}>
          <div className={`${inner} py-20`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {activity.includes && activity.includes.length > 0 && (
                <div>
                  <SectionLabel>費用說明</SectionLabel>
                  <h3 className="font-display font-bold text-2xl mb-6" style={{ color: 'var(--navy)' }}>費用包含</h3>
                  <ul className="space-y-3">
                    {activity.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle aria-hidden="true" size={16} className="shrink-0 mt-0.5" style={{ color: '#0F5132' }} />
                        <span className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activity.notes && activity.notes.length > 0 && (
                <div>
                  <SectionLabel>報名須知</SectionLabel>
                  <h3 className="font-display font-bold text-2xl mb-6" style={{ color: 'var(--navy)' }}>注意事項</h3>
                  <ul className="space-y-3">
                    {activity.notes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <AlertCircle aria-hidden="true" size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                        <span className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* ── 活動回顧（已結束時顯示） ──────────────────────────── */}
      {activity.status === '已結束' && activity.photos && activity.photos.length > 0 && (
        <section style={{ background: 'var(--surface)' }}>
          <div className={`${inner} py-20`}>
            <SectionLabel>活動回顧</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-10" style={{ color: 'var(--navy)' }}>
              活動花絮
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {activity.photos.map((photo, i) => (
                <div key={i} className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={urlFor(photo).width(800).height(600).fit('crop').url()}
                    alt={`活動花絮 ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'var(--navy)' }}>
        <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className={`relative ${inner} py-20 text-center`}>
          <SectionLabel light>立即行動</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: '#FFFFFF' }}>
            名額有限，把握機會
          </h2>
          <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.62)' }}>
            有任何疑問歡迎加入 LINE 官方帳號，我們將為你說明詳細內容。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {canRegister && activity.registrationUrl && (
              <a
                href={activity.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-primary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide"
              >
                立即報名
                <ChevronRight aria-hidden="true" size={16} />
              </a>
            )}
            <a
              href="https://lin.ee/6uAXvJu"
              className="hero-cta-secondary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide"
            >
              加入 LINE 諮詢
              <ChevronRight aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
