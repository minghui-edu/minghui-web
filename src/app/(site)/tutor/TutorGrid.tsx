'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, MapPin } from 'lucide-react';
import { urlFor } from '@/lib/sanity/image';

type TutorTier = 'A' | 'S' | 'SS';

type SanityTutor = {
  name: string;
  slug: string;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo?: any;
  tags?: string[];
  locations?: string[];
  shortExp?: string;
  tier?: TutorTier;
};

const tierConfig: Record<TutorTier, { label: string; bg: string; color: string; border: string }> = {
  SS: { label: 'SS 級', bg: 'rgba(232,144,39,0.12)', color: 'var(--accent)',  border: 'rgba(232,144,39,0.4)' },
  S:  { label: 'S 級',  bg: 'rgba(148,163,184,0.12)', color: '#94A3B8',       border: 'rgba(148,163,184,0.4)' },
  A:  { label: 'A 級',  bg: 'rgba(30,86,160,0.1)',    color: '#1E56A0',        border: 'rgba(30,86,160,0.3)' },
};

/** 依老師的專長標籤分類；一位老師可以同時出現在多個分類 */
const FILTERS: { key: string; label: string; match: (tag: string) => boolean }[] = [
  { key: 'senior', label: '高中學測', match: (t) => t.startsWith('高中') },
  { key: 'junior', label: '國中會考', match: (t) => t.startsWith('國中') },
  { key: 'intl', label: '國際課程（SAT、AP、IB）', match: (t) => /SAT|AP |IB |A Level|IGCSE|AMC/.test(t) },
  { key: 'art', label: '才藝與作品集', match: (t) => /作品集|書法|水墨|水彩|素描|設計|建模/.test(t) },
];

export default function TutorGrid({ tutors }: { tutors: SanityTutor[] }) {
  const [filter, setFilter] = useState('senior');
  const rule = FILTERS.find((f) => f.key === filter);
  const shown = rule ? tutors.filter((t) => (t.tags ?? []).some(rule.match)) : tutors;
  const options = [...FILTERS.map(({ key, label }) => ({ key, label })), { key: 'all', label: '全部' }];

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="依課程篩選老師">
        {options.map(({ key, label }) => {
          const active = filter === key;
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              aria-pressed={active}
              className="px-4 py-1.5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              style={{
                background: active ? 'var(--accent)' : 'transparent',
                color: active ? 'var(--navy)' : 'var(--muted)',
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '9999px',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
      {shown.length === 0 ? (
        <p className="text-center py-12" style={{ color: 'var(--muted)' }}>這個分類的老師整理中，可以先看「全部」或加 LINE 詢問。</p>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shown.map((tutor) => {
              const photoUrl = tutor.photo
                ? urlFor(tutor.photo).width(112).height(112).fit('crop').url()
                : null;
              return (
                <Link
                  key={tutor.slug}
                  href={`/tutor/${tutor.slug}`}
                  className="group bg-white p-6 flex flex-col card-lift relative"
                  style={{ border: '1px solid var(--border)' }}
                >
                  {tutor.tier && tierConfig[tutor.tier] && (
                    <span
                      className="absolute top-4 right-4 text-[11px] font-display font-bold px-2 py-0.5"
                      style={{
                        background: tierConfig[tutor.tier].bg,
                        color: tierConfig[tutor.tier].color,
                        border: `1px solid ${tierConfig[tutor.tier].border}`,
                      }}
                    >
                      {tierConfig[tutor.tier].label}
                    </span>
                  )}
                  <div className="flex items-center gap-4 mb-5 pb-5" style={{ borderBottom: '1px solid var(--border-light)' }}>
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={tutor.name}
                        width={56}
                        height={56}
                        className="rounded-full shrink-0 object-cover"
                      />
                    ) : (
                      <div
                        className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center font-display font-bold"
                        style={{ background: 'rgba(11,10,63,0.07)', color: 'var(--navy)', fontSize: '1.25rem' }}
                        aria-hidden="true"
                      >
                        {tutor.name[0]}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3
                        className="font-bold text-base leading-tight mb-1 transition-colors duration-150 text-[var(--navy)] group-hover:text-[var(--accent)]"
                      >
                        {tutor.name}
                      </h3>
                      {tutor.title && (
                        <p className="text-xs leading-snug" style={{ color: 'var(--muted)' }}>{tutor.title}</p>
                      )}
                    </div>
                  </div>
                  {tutor.tags && tutor.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
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
                  )}
                  {tutor.locations && tutor.locations.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tutor.locations.map((loc) => (
                        <span
                          key={loc}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 font-medium"
                          style={{ background: 'rgba(30,86,160,0.07)', color: '#1E56A0', border: '1px solid rgba(30,86,160,0.18)' }}
                        >
                          <MapPin aria-hidden="true" size={10} />
                          {loc}
                        </span>
                      ))}
                    </div>
                  )}
                  {tutor.shortExp && (
                    <p className="text-sm leading-relaxed flex-grow mb-4" style={{ color: 'var(--muted)' }}>
                      {tutor.shortExp}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs font-semibold mt-auto" style={{ color: 'var(--accent)' }}>
                    查看完整介紹
                    <ChevronRight
                      aria-hidden="true"
                      size={13}
                      className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
      )}
    </>
  );
}
