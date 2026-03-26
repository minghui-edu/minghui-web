'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Youtube } from 'lucide-react';

export type ScreenshotTestimonial = {
  name: string;
  context?: string;
  screenshot: string;
  quote: string;
};

/* Card width in px — used for position clamping */
const CARD_W = 260;

/*
 * 20 positions (left px from container left, top px from container top).
 * Cards deliberately overlap for a natural "scattered" look.
 * Container is 800px tall. Max left = 1280 - CARD_W = ~1020px.
 */
const POSITIONS = [
  { left:  20, top:  20 },
  { left: 220, top:   8 },
  { left: 430, top:  30 },
  { left: 650, top:  10 },
  { left: 860, top:  25 },

  { left: 100, top: 210 },
  { left: 320, top: 195 },
  { left: 540, top: 215 },
  { left: 750, top: 200 },
  { left: 960, top: 185 },

  { left:  30, top: 400 },
  { left: 240, top: 385 },
  { left: 460, top: 405 },
  { left: 680, top: 390 },
  { left: 900, top: 375 },

  { left: 130, top: 580 },
  { left: 360, top: 565 },
  { left: 580, top: 585 },
  { left: 790, top: 570 },
  { left: 990, top: 560 },
];

/* Rotation per card: subtle, alternating */
const ROTATIONS = [
  -2.5,  1.8, -1.2,  2.1, -0.8,
   1.5, -2.0,  0.7, -1.7,  2.3,
  -1.0,  1.2, -2.2,  0.5, -1.5,
   2.0, -0.6,  1.9, -1.3,  0.9,
];

/* Float variants — independent per card */
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

/* z-index: cards further down in the list appear on top */
const Z_INDICES = [
  2, 3, 2, 4, 2,
  3, 5, 3, 4, 3,
  2, 4, 3, 5, 2,
  4, 3, 5, 3, 4,
];

export default function FloatingTestimonials({ items }: { items: ScreenshotTestimonial[] }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const cards = items.slice(0, POSITIONS.length);
  /* Container height: enough rows to show all cards */
  const rows = Math.ceil(cards.length / 5);
  const containerH = rows <= 1 ? 280 : rows <= 2 ? 480 : rows <= 3 ? 680 : 800;

  return (
    <section className="py-20" style={{ background: 'var(--navy)' }}>
      <style>{`
        @keyframes mh-float {
          0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
          50%       { transform: translateY(-12px) rotate(var(--rot)); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Desktop: floating wall */}
        <div
          className="relative hidden md:block overflow-hidden"
          style={{ height: `${containerH}px` }}
          aria-label="YouTube 留言截圖牆"
        >
          {mounted && cards.map((item, i) => {
            const pos = POSITIONS[i];
            const v   = FLOAT_VARIANTS[i];
            const rot = ROTATIONS[i];
            const z   = Z_INDICES[i];
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${pos.left}px`,
                  top:  `${pos.top}px`,
                  '--rot': `${rot}deg`,
                  transform: `rotate(${rot}deg)`,
                  animation: reducedMotion
                    ? 'none'
                    : `mh-float ${v.duration}s ease-in-out ${v.delay}s infinite`,
                  zIndex: z,
                } as React.CSSProperties}
              >
                <figure
                  className="overflow-hidden shadow-2xl"
                  style={{
                    width: `${CARD_W}px`,
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
                    sizes={`${CARD_W}px`}
                    style={{ width: `${CARD_W}px`, height: 'auto', display: 'block' }}
                  />
                  <figcaption
                    className="px-3 py-2 flex items-center gap-1.5"
                    style={{ background: 'rgba(10,12,40,0.88)' }}
                  >
                    <Youtube aria-hidden="true" size={12} style={{ color: '#FF0000', flexShrink: 0 }} />
                    <span className="text-[12px] font-medium truncate" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      {item.name}
                    </span>
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>

        {/* Mobile: 2-column grid */}
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
              <figcaption
                className="px-3 py-2 flex items-center gap-1.5"
                style={{ background: 'rgba(10,12,40,0.88)' }}
              >
                <Youtube aria-hidden="true" size={11} style={{ color: '#FF0000', flexShrink: 0 }} />
                <span className="text-[11px] font-medium truncate" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {item.name}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
