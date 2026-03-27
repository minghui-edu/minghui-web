import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, MessageCircle, BookOpen, Trophy, Lightbulb } from 'lucide-react';
import { sanityClient } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';

export const revalidate = 60;

const inner = 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8';

const TUTOR_QUERY = `*[_type == "tutor" && slug.current == $id][0]{
  name,
  "slug": slug.current,
  title,
  photo,
  tags,
  tier,
  intro,
  exp,
  philosophy
}`;

const ALL_SLUGS_QUERY = `*[_type == "tutor" && defined(slug.current)]{ "id": slug.current }`;

type TutorTier = 'A' | 'S' | 'SS';

type Tutor = {
  name: string;
  slug: string;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo?: any;
  tags?: string[];
  tier?: TutorTier;
  intro?: string;
  exp?: string;
  philosophy?: string;
};

const tierConfig: Record<TutorTier, { label: string; bg: string; color: string; border: string }> = {
  SS: { label: 'SS 級', bg: 'rgba(232,144,39,0.15)', color: 'var(--accent-light)', border: 'rgba(232,144,39,0.45)' },
  S:  { label: 'S 級',  bg: 'rgba(255,255,255,0.1)',  color: 'rgba(255,255,255,0.75)', border: 'rgba(255,255,255,0.25)' },
  A:  { label: 'A 級',  bg: 'rgba(30,86,160,0.2)',    color: '#93B4D8',               border: 'rgba(30,86,160,0.4)' },
};

const sections = [
  { key: 'intro' as const,       label: '簡介與教學方式', icon: BookOpen,  color: 'var(--navy)',  bg: 'rgba(11,10,63,0.06)'   },
  { key: 'exp' as const,         label: '經歷與教學成果', icon: Trophy,    color: '#0F5132',      bg: 'rgba(15,81,50,0.06)'   },
  { key: 'philosophy' as const,  label: '特色與教學理念', icon: Lightbulb, color: '#1E56A0',      bg: 'rgba(30,86,160,0.06)'  },
];

export async function generateStaticParams() {
  const slugs: { id: string }[] = await sanityClient.fetch(ALL_SLUGS_QUERY);
  return slugs;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const tutor: Tutor | null = await sanityClient.fetch(TUTOR_QUERY, { id });
  if (!tutor) return {};
  return {
    title: `${tutor.name} — 師資介紹`,
    description: tutor.intro?.slice(0, 100),
  };
}

export default async function TutorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tutor: Tutor | null = await sanityClient.fetch(
    TUTOR_QUERY,
    { id },
    { next: { revalidate: 60 } },
  );
  if (!tutor) notFound();

  const photoUrl = tutor.photo
    ? urlFor(tutor.photo).width(160).height(160).fit('crop').url()
    : null;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: tutor.name,
    ...(tutor.title && { jobTitle: tutor.title }),
    ...(tutor.tags && tutor.tags.length > 0 && { knowsAbout: tutor.tags }),
    ...(photoUrl && { image: photoUrl }),
    url: `https://www.minghuiedu.com/tutor/${tutor.slug}`,
    worksFor: { '@type': 'Organization', name: '明慧教育', url: 'https://www.minghuiedu.com' },
  };

  return (
    <div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* ── Header ────────────────────────────── */}
      <section className="relative overflow-hidden py-20" style={{ background: 'var(--navy)' }}>
        <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className={`relative ${inner}`}>

          <Link
            href="/tutor"
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            <ArrowLeft aria-hidden="true" size={15} />
            返回師資列表
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={tutor.name}
                  width={80}
                  height={80}
                  className="rounded-full shrink-0 object-cover"
                  style={{ border: '2px solid rgba(232,144,39,0.3)' }}
                />
              ) : (
                <div
                  className="w-20 h-20 rounded-full shrink-0 flex items-center justify-center font-display font-bold text-2xl"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--accent-light)', border: '2px solid rgba(232,144,39,0.3)' }}
                  aria-hidden="true"
                >
                  {tutor.name[0]}
                </div>
              )}
              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h1
                    className="font-display font-bold leading-tight"
                    style={{ color: '#FFFFFF', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}
                  >
                    {tutor.name}
                  </h1>
                  {tutor.tier && tierConfig[tutor.tier] && (
                    <span
                      className="text-xs font-display font-bold px-2.5 py-1 shrink-0"
                      style={{
                        background: tierConfig[tutor.tier].bg,
                        color: tierConfig[tutor.tier].color,
                        border: `1px solid ${tierConfig[tutor.tier].border}`,
                      }}
                    >
                      {tierConfig[tutor.tier].label}
                    </span>
                  )}
                </div>
                {tutor.title && (
                  <p className="text-base font-medium mb-4" style={{ color: 'var(--accent-light)' }}>
                    {tutor.title}
                  </p>
                )}
                {tutor.tags && tutor.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tutor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-1 font-medium"
                        style={{ background: 'rgba(232,144,39,0.12)', color: 'var(--accent-light)', border: '1px solid rgba(232,144,39,0.25)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <a
              href="https://lin.ee/6uAXvJu"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-7 py-4 font-semibold text-sm tracking-wide"
              style={{ background: '#00B900', color: '#FFFFFF' }}
            >
              <MessageCircle aria-hidden="true" size={17} />
              透過官方 LINE 預約
            </a>
          </div>

          <div className="mt-10 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
        </div>
      </section>

      {/* ── Content sections ──────────────────── */}
      <section className="py-16" style={{ background: 'var(--cream)' }}>
        <div className={inner}>
          <div className="space-y-6">
            {sections.map(({ key, label, icon: Icon, color, bg }) => {
              const content = tutor[key];
              if (!content) return null;
              return (
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
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', whiteSpace: 'pre-line' }}>{content}</p>
                </div>
              );
            })}
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
            href="https://lin.ee/6uAXvJu"
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
