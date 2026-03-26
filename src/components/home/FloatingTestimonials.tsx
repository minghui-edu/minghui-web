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

/* Predefined grid positions (left%, top%) — up to 10 cards, no overlap */
const POSITIONS = [
  { left:  3, top:  6 },
  { left: 33, top:  2 },
  { left: 62, top:  5 },
  { left: 79, top:  2 },
  { left:  8, top: 50 },
  { left: 40, top: 52 },
  { left: 68, top: 48 },
  { left: 20, top: 75 },
  { left: 52, top: 76 },
  { left: 78, top: 70 },
];

/* Each card gets its own float speed & phase so they look independent */
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

  return (
    <section className="py-20" style={{ background: 'var(--navy)' }}>
      {/* Inject keyframes */}
      <style>{`
        @keyframes mh-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
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
          className="relative hidden md:block"
          style={{ height: '520px' }}
          aria-label="YouTube 留言截圖牆"
        >
          {mounted && cards.map((item, i) => {
            const pos = POSITIONS[i];
            const v = FLOAT_VARIANTS[i];
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  animation: reducedMotion
                    ? 'none'
                    : `mh-float ${v.duration}s ease-in-out ${v.delay}s infinite`,
                  zIndex: 1,
                }}
              >
                <figure
                  className="overflow-hidden shadow-2xl"
                  style={{
                    width: '180px',
                    border: '2px solid rgba(255,255,255,0.10)',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.04)',
                  }}
                >
                  <div className="relative" style={{ aspectRatio: '4/5' }}>
                    <Image
                      src={item.screenshot}
                      alt={`${item.name} 的 YouTube 留言`}
                      fill
                      className="object-cover object-top"
                      sizes="180px"
                    />
                  </div>
                  <figcaption
                    className="px-3 py-2 flex items-center gap-1.5"
                    style={{ background: 'rgba(0,0,0,0.5)' }}
                  >
                    <Youtube aria-hidden="true" size={11} style={{ color: '#FF0000', flexShrink: 0 }} />
                    <span className="text-[11px] font-medium truncate" style={{ color: 'rgba(255,255,255,0.7)' }}>
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
              className="overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              <div className="relative" style={{ aspectRatio: '4/5' }}>
                <Image
                  src={item.screenshot}
                  alt={`${item.name} 的 YouTube 留言`}
                  fill
                  className="object-cover object-top"
                  sizes="50vw"
                />
              </div>
              <figcaption
                className="px-3 py-2 flex items-center gap-1.5"
                style={{ background: 'rgba(0,0,0,0.5)' }}
              >
                <Youtube aria-hidden="true" size={11} style={{ color: '#FF0000', flexShrink: 0 }} />
                <span className="text-[11px] font-medium truncate" style={{ color: 'rgba(255,255,255,0.7)' }}>
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
