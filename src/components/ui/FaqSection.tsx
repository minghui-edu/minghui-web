'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type FaqItem = { q: string; a: string };

const inner = 'max-w-3xl mx-auto';

export default function FaqSection({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <section className="py-20" style={{ background: 'var(--cream)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 flex items-center justify-center gap-2" style={{ color: 'var(--accent)' }}>
            <span className="w-5 h-px" style={{ background: 'currentColor' }} aria-hidden="true" />
            常見問題
            <span className="w-5 h-px" style={{ background: 'currentColor' }} aria-hidden="true" />
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
            你可能想問的問題
          </h2>
        </div>

        <div className={`${inner} space-y-3`}>
          {items.map(({ q, a }, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border)',
                  borderLeft: isOpen ? '4px solid var(--accent)' : '1px solid var(--border)',
                  background: 'var(--surface)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent)]"
                  style={{ touchAction: 'manipulation' }}
                >
                  <span className="font-display font-bold text-base" style={{ color: 'var(--navy)' }}>
                    {q}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    size={18}
                    className="shrink-0 transition-transform duration-200"
                    style={{
                      color: 'var(--accent)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                <div
                  className="overflow-hidden motion-safe:transition-[max-height] motion-safe:duration-200"
                  style={{ maxHeight: isOpen ? '400px' : '0px' }}
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'var(--muted)', whiteSpace: 'pre-line' }}>
                    {a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
