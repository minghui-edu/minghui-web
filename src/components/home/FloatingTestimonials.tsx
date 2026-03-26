'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export type ScreenshotTestimonial = {
  name: string;
  context?: string;
  screenshot: string;
  quote: string;
};

/* ── Card widths — mixed L/M/S by position ──────────
   Sizes spread across the wall so each row has variety.
   Right-edge positions (left > 700) are capped at M or S
   to avoid overflowing the ~1200px container.

   Row 1: L  S  M  L  S
   Row 2: M  L  M  S  L
   Row 3: M  S  M  S  L
   Row 4: M  S  S  M  S
─────────────────────────────────────────────────── */
const CARD_WIDTHS = [
  440, 260, 350, 440, 260,
  350, 440, 350, 260, 440,
  350, 260, 350, 260, 440,
  350, 260, 260, 350, 260,
];

/*
 * Positions (left px, top px) — designed for ~1200px inner width.
 * Large cards: right edge ≤ 1200 (max left 760)
 * Medium cards: right edge ≤ 1200 (max left 850)
 * Small cards:  right edge ≤ 1200 (max left 940)
 * Cards overlap intentionally for a natural scattered feel.
 */
const POSITIONS = [
  { left:   0, top:  15 },  // 0  L
  { left: 400, top:   0 },  // 1  S
  { left: 720, top:  18 },  // 2  M
  { left: 190, top: 225 },  // 3  L
  { left: 610, top: 210 },  // 4  S
  { left:  55, top: 110 },  // 5  M
  { left: 440, top:  98 },  // 6  L
  { left: 820, top: 112 },  // 7  M
  { left:  15, top: 385 },  // 8  S
  { left: 400, top: 368 },  // 9  L
  { left: 770, top: 380 },  // 10 M
  { left: 230, top: 500 },  // 11 S
  { left: 580, top: 492 },  // 12 M
  { left: 880, top: 482 },  // 13 S
  { left: 130, top: 298 },  // 14 L
  { left: 710, top: 285 },  // 15 M
  { left: 340, top: 102 },  // 16 S
  { left: 940, top: 272 },  // 17 S
  { left: 488, top: 562 },  // 18 M
  { left: 745, top: 558 },  // 19 S
];

/* Rotation per card — subtle, natural scatter */
const ROTATIONS = [
  -2.2,  1.5, -0.8,  2.4, -1.3,
   1.8, -2.5,  0.6, -1.0,  2.1,
  -0.5,  1.4, -2.0,  0.9, -1.6,
   2.3, -0.7,  1.1, -1.8,  0.4,
];

/* Float animation — independent per card */
const FLOAT_VARIANTS = [
  { duration: 5.2, delay: 0.0 },
  { duration: 6.1, delay: 1.3 },
  { duration: 4.8, delay: 2.7 },
  { duration: 5.7, delay: 0.8 },
  { duration: 6.4, delay: 3.2 },
  { duration: 5.0, delay: 1.9 },
  { duration: 6.8, delay: 0.4 },
  { duration: 5.5, delay: 2.1 },
  { duration: 4.6, delay: 3.8 },
  { duration: 6.2, delay: 1.5 },
  { duration: 5.3, delay: 0.6 },
  { duration: 4.9, delay: 2.4 },
  { duration: 6.6, delay: 1.1 },
  { duration: 5.1, delay: 3.5 },
  { duration: 4.7, delay: 0.9 },
  { duration: 6.3, delay: 2.8 },
  { duration: 5.8, delay: 1.7 },
  { duration: 4.5, delay: 3.1 },
  { duration: 6.0, delay: 0.3 },
  { duration: 5.4, delay: 2.0 },
];

/* z-index — larger z = appears on top */
const Z_INDICES = [
  2, 3, 2, 4, 3,
  5, 4, 3, 4, 5,
  3, 4, 6, 5, 6,
  5, 6, 5, 6, 6,
];

/* Pop-in stagger: each card waits 70ms more than the previous */
const POP_STAGGER_MS = 70;

export default function FloatingTestimonials({ items }: { items: ScreenshotTestimonial[] }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted,       setMounted]       = useState(false);
  const [inView,        setInView]        = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* IntersectionObserver — trigger pop-in when section scrolls into view */
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const cards = items.slice(0, POSITIONS.length);
  /* Container height — expands with more rows */
  const rows = Math.ceil(cards.length / 5);
  const containerH = rows <= 1 ? 260 : rows <= 2 ? 400 : rows <= 3 ? 540 : rows <= 4 ? 670 : 670;

  return (
    <section ref={sectionRef} className="py-20" style={{ background: 'var(--navy)' }}>
      <style>{`
        @keyframes mh-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 flex items-center justify-center gap-2"
             style={{ color: 'var(--accent)' }}>
            <span className="w-5 h-px" style={{ background: 'currentColor' }} aria-hidden="true" />
            YouTube 留言
            <span className="w-5 h-px" style={{ background: 'currentColor' }} aria-hidden="true" />
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: '#FFFFFF' }}>
            他們這樣說
          </h2>
        </div>

        {/* ── Desktop floating wall ── */}
        <div
          className="relative hidden md:block"
          style={{ height: `${containerH}px` }}
          aria-label="YouTube 留言截圖牆"
        >
          {mounted && cards.map((item, i) => {
            const pos  = POSITIONS[i];
            const v    = FLOAT_VARIANTS[i];
            const rot  = ROTATIONS[i];
            const z    = Z_INDICES[i];
            const w    = CARD_WIDTHS[i] ?? 350;
            /* Pop-in delay (staggered) — after pop completes, float starts */
            const popDelay  = reducedMotion ? 0 : i * POP_STAGGER_MS;
            const popVisible = inView || reducedMotion;

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${pos.left}px`,
                  top:  `${pos.top}px`,
                  zIndex: z,
                  /* Float lives on the outer wrapper — translateY only */
                  animation: (popVisible && !reducedMotion)
                    ? `mh-float ${v.duration}s ease-in-out ${v.delay + popDelay / 1000 + 0.5}s infinite`
                    : 'none',
                }}
              >
                {/*
                  Inner wrapper handles:
                  - rotation (static transform)
                  - pop-in (opacity + scale transition)
                  Keeping float on outer avoids transform conflicts.
                */}
                <div
                  style={{
                    transform: `rotate(${rot}deg) scale(${popVisible ? 1 : 0.65})`,
                    opacity: popVisible ? 1 : 0,
                    transition: reducedMotion
                      ? 'none'
                      : `opacity 0.42s cubic-bezier(0.34,1.56,0.64,1) ${popDelay}ms,
                         transform 0.42s cubic-bezier(0.34,1.56,0.64,1) ${popDelay}ms`,
                  }}
                >
                  <figure
                    className="overflow-hidden shadow-2xl"
                    style={{
                      width: `${w}px`,
                      border: '2px solid rgba(255,255,255,0.12)',
                      borderRadius: '14px',
                      background: '#fff',
                    }}
                  >
                    <Image
                      src={item.screenshot}
                      alt={`${item.name} 的 YouTube 留言`}
                      width={0}
                      height={0}
                      sizes={`${w}px`}
                      style={{ width: `${w}px`, height: 'auto', display: 'block' }}
                    />
                  </figure>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Mobile: 2-column grid ── */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {cards.map((item, i) => (
            <figure
              key={i}
              className="overflow-hidden shadow-lg"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                background: '#fff',
              }}
            >
              <Image
                src={item.screenshot}
                alt={`${item.name} 的 YouTube 留言`}
                width={0}
                height={0}
                sizes="50vw"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
