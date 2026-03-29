'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users, ChevronRight, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { urlFor } from '@/lib/sanity/image';

export type ActivityStatus = '報名中' | '即將開放' | '已額滿' | '已結束';

export type SanityActivity = {
  title: string;
  slug: string;
  date?: string;
  audience?: string;
  tags?: string[];
  status?: ActivityStatus;
  featured?: boolean;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
};

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
  '報名中':   { bg: 'rgba(15,81,50,0.1)',       color: '#0F5132',       border: 'rgba(15,81,50,0.25)' },
  '即將開放': { bg: 'rgba(232,144,39,0.1)',      color: 'var(--accent)', border: 'rgba(232,144,39,0.3)' },
  '已額滿':   { bg: 'rgba(100,100,100,0.08)',    color: '#6B7280',       border: 'rgba(100,100,100,0.2)' },
  '已結束':   { bg: 'rgba(100,100,100,0.08)',    color: '#6B7280',       border: 'rgba(100,100,100,0.2)' },
};

const INITIAL_COUNT = 6;

/** 從活動日期字串中提取可排序數字（越大越新）。
 *  支援格式：2025/10/12、2025/9/13、2026/2/7～2/8、2025年8月15日 等 */
function parseDateForSort(dateStr?: string): number {
  if (!dateStr) return 0;
  const m = dateStr.match(/(\d{4})[\/\-年](\d{1,2})[\/\-月]?(\d{1,2})?/);
  if (!m) return 0;
  return parseInt(m[1]) * 10000 + parseInt(m[2]) * 100 + parseInt(m[3] ?? '1');
}

function ActivityCard({ act, large = false }: { act: SanityActivity; large?: boolean }) {
  const s = statusStyle[act.status ?? '即將開放'] ?? statusStyle['即將開放'];
  const closed = act.status === '已額滿' || act.status === '已結束';
  const imageUrl = act.image
    ? urlFor(act.image).width(large ? 800 : 480).height(large ? 480 : 320).fit('crop').url()
    : null;

  return (
    <div
      className={`bg-white flex ${large ? 'flex-col md:flex-row' : 'flex-col sm:flex-row'} overflow-hidden`}
      style={{
        border: '1px solid var(--border)',
        borderTop: large ? '3px solid var(--accent)' : '1px solid var(--border)',
        opacity: closed ? 0.55 : 1,
        transition: 'opacity 150ms',
      }}
    >
      {/* Photo */}
      <div
        className={`${large ? 'md:w-2/5' : 'sm:w-2/5'} shrink-0 relative flex items-center justify-center`}
        style={{
          minHeight: large ? '260px' : '160px',
          background: 'rgba(11,10,63,0.05)',
          borderRight: '1px solid var(--border-light)',
        }}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt={act.title} fill className="object-cover" sizes={large ? '40vw' : '20vw'} />
        ) : (
          <ImageIcon aria-hidden="true" size={large ? 36 : 28} style={{ color: 'rgba(11,10,63,0.18)' }} />
        )}
        {large && (
          <span
            className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 tracking-wide"
            style={{ background: 'var(--accent)', color: 'var(--navy)' }}
          >
            主打活動
          </span>
        )}
        {act.status && (
          <span
            className="absolute text-[11px] font-bold px-2.5 py-1"
            style={{
              top: large ? '3rem' : '0.75rem',
              left: '0.75rem',
              background: s.bg,
              color: s.color,
              border: `1px solid ${s.border}`,
              marginTop: large ? '0.25rem' : undefined,
            }}
          >
            {act.status}
          </span>
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 flex flex-col ${large ? 'p-8' : 'p-6'}`}>
        <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--muted)' }}>
          {act.date && (
            <>
              <Calendar aria-hidden="true" size={13} />
              <span className="text-xs font-medium">{act.date}</span>
            </>
          )}
          {act.date && act.audience && <span className="text-xs" style={{ color: 'var(--border)' }}>·</span>}
          {act.audience && (
            <>
              <Users aria-hidden="true" size={13} />
              <span className="text-xs font-medium">{act.audience}</span>
            </>
          )}
        </div>
        <h3
          className={`font-display font-bold mb-3 ${large ? 'text-2xl md:text-3xl' : 'text-lg'}`}
          style={{ color: 'var(--navy)' }}
        >
          {act.title}
        </h3>
        {large && act.description && (
          <p
            className="text-sm leading-relaxed mb-5"
            style={{
              color: 'var(--muted)',
              WebkitLineClamp: 3,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {act.description}
          </p>
        )}
        {act.tags && act.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {act.tags.map((tag) => (
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
        {closed && (
          <span className="mt-auto text-xs font-semibold" style={{ color: 'var(--muted)' }}>
            {act.status === '已額滿' ? '名額已額滿' : '活動已結束，點擊查看回顧'}
          </span>
        )}
        <Link
          href={`/exploration/${act.slug}`}
          className={`${closed ? '' : 'mt-auto'} inline-flex items-center gap-1.5 font-semibold group hover:underline active:opacity-70 transition-opacity duration-100 ${large ? 'text-sm mt-6' : 'text-xs mt-3'}`}
          style={{ color: closed ? 'var(--muted)' : 'var(--accent)' }}
        >
          {closed ? '查看活動回顧' : '查看詳細簡章 / 立即報名'}
          <ChevronRight aria-hidden="true" size={large ? 15 : 13} className="transition-transform duration-100 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export function ActivitiesGrid({ activities }: { activities: SanityActivity[] }) {
  const [expanded, setExpanded] = useState(false);

  if (activities.length === 0) {
    return (
      <p className="text-center py-12" style={{ color: 'var(--muted)' }}>
        目前尚無公開活動，請稍後再查看。
      </p>
    );
  }

  const featuredAct = activities.find((a) => a.featured);
  const restActs = [...activities.filter((a) => !a.featured)]
    .sort((a, b) => parseDateForSort(b.date) - parseDateForSort(a.date));
  const visibleRest = expanded ? restActs : restActs.slice(0, INITIAL_COUNT);
  const hiddenCount = restActs.length - INITIAL_COUNT;

  return (
    <div className="flex flex-col gap-6">
      {featuredAct && <ActivityCard act={featuredAct} large />}

      {visibleRest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleRest.map((act) => (
            <ActivityCard key={act.slug} act={act} />
          ))}
        </div>
      )}

      {!expanded && hiddenCount > 0 && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--navy)',
              background: 'transparent',
              touchAction: 'manipulation',
            }}
          >
            查看更多活動（{hiddenCount} 個）
            <ChevronDown aria-hidden="true" size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
