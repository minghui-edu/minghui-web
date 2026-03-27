'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export type ScreenshotTestimonial = {
  name: string;
  context?: string;
  screenshot: string;
  quote: string;
};

const CARD_W = 300;   // px
const GAP    = 14;    // px between cards
/* Each row scrolls at a slightly different speed for organic feel */
const SPEEDS  = [38, 32, 42]; // seconds per cycle

export default function FloatingTestimonials({ items }: { items: ScreenshotTestimonial[] }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  /* Distribute cards into 3 rows interleaved (0,3,6… / 1,4,7… / 2,5,8…)
     so "best" items aren't all bunched in one row */
  const rows = [0, 1, 2].map((offset) =>
    items.filter((_, i) => i % 3 === offset)
  );

  return (
    <section className="py-20" style={{ background: 'var(--cream)', overflow: 'hidden' }}>
      <style>{`
        @keyframes mh-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes mh-marquee-r {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .mh-track:hover { animation-play-state: paused !important; }
      `}</style>

      {/* Heading */}
      <div className="mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 flex items-center gap-2"
           style={{ color: 'var(--accent)' }}>
          <span className="w-5 h-px" style={{ background: 'currentColor' }} aria-hidden="true" />
          YouTube 留言
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
          他們這樣說
        </h2>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-4" aria-label="YouTube 留言截圖牆">
        {rows.map((row, ri) => {
          if (row.length === 0) return null;
          const reversed = ri % 2 === 1;
          /* Duplicate cards for seamless infinite loop */
          const doubled = [...row, ...row];

          return (
            <div
              key={ri}
              style={{
                /* Fade edges so cards smoothly appear / disappear */
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              }}
            >
              <div
                className="mh-track flex"
                style={{
                  width: 'max-content',
                  gap: `${GAP}px`,
                  animation: reducedMotion
                    ? 'none'
                    : `${reversed ? 'mh-marquee-r' : 'mh-marquee'} ${SPEEDS[ri]}s linear infinite`,
                }}
              >
                {doubled.map((item, i) => (
                  <figure
                    key={i}
                    className="shrink-0 overflow-hidden relative"
                    style={{
                      width: `${CARD_W}px`,
                      aspectRatio: '9 / 16',
                      borderRadius: 0,
                      background: '#fff',
                      boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
                    }}
                    aria-hidden={i >= row.length} /* duplicates are decorative */
                  >
                    <Image
                      src={item.screenshot}
                      alt={i < row.length ? `${item.name} 的 YouTube 留言` : ''}
                      fill
                      sizes={`${CARD_W}px`}
                      className="object-cover object-top"
                    />
                  </figure>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
