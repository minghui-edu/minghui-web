'use client';

import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: '參加明慧的科系探索營，讓我第一次真正了解電機系的日常。豐富的實作課程大大充實了我的學習歷程，最後順利考上了心目中的科系。',
    name: '王同學',
    context: '台大電機系 · 探索營學員',
    year: '2023',
  },
  {
    quote: '透過明慧找到的家教老師，不只幫我準備完整的留學文件，更讓我重新認識自己的研究方向。最終拿到 CMU 電腦科學碩士的入學許可。',
    name: '陳同學',
    context: 'CMU 電腦科學碩士 · 家教媒合學員',
    year: '2023',
  },
  {
    quote: '東京遊學行程讓我提前感受留學生活，學長姐分享的申請秘訣完全是網路上找不到的乾貨，讓我下定決心申請早稻田大學。',
    name: '林同學',
    context: '高中三年級 · 海外遊學學員',
    year: '2024',
  },
  {
    quote: '學霸筆記讓我在期中考前兩週就把整本有機化學搞定，配合講解影片觀念直接到位。最後台大化工系如願錄取！',
    name: '張同學',
    context: '台大化工系 · 學霸筆記學員',
    year: '2024',
  },
  {
    quote: '明慧的論文顧問幫我把雜亂的研究方向梳理清楚，從選題到口試全程專業指導，最後以優等完成碩士論文，非常感謝。',
    name: '吳同學',
    context: '政大法研所 · 論文顧問學員',
    year: '2024',
  },
  {
    quote: '以為找家教很麻煩，結果明慧媒合效率超高，一週內就配對到合適的老師，收費透明、零抽成讓我跟老師都很放心。',
    name: '黃同學',
    context: '台大財金系 · 家教媒合學員',
    year: '2025',
  },
];

export type Testimonial = (typeof testimonials)[0];

export default function TestimonialsCarousel({ items }: { items?: Testimonial[] }) {
  const list = items ?? testimonials;
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  const go = (newIdx: number) => {
    if (newIdx === idx || fading) return;
    setFading(true);
    setTimeout(() => {
      setIdx(newIdx);
      setFading(false);
    }, 180);
  };

  const prev = () => go((idx - 1 + list.length) % list.length);
  const next = () => go((idx + 1) % list.length);

  const t = list[idx];

  return (
    <div>
      {/* Card + arrows */}
      <div className="flex items-center gap-4 md:gap-8">
        {/* Prev */}
        <button
          onClick={prev}
          aria-label="上一則心聲"
          className="testimonial-nav-btn shrink-0 w-11 h-11 flex items-center justify-center rounded-full transition-colors duration-150"
          style={{
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          <ChevronLeft aria-hidden="true" size={20} />
        </button>

        {/* Card */}
        <div
          className="flex-1 p-8 md:p-12 flex flex-col"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderTop: '3px solid var(--accent)',
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.18s ease',
            minHeight: '260px',
          }}
        >
          <Quote
            aria-hidden="true"
            size={32}
            className="mb-6 shrink-0"
            style={{ color: 'var(--accent)', opacity: 0.55 }}
          />
          <p
            className="font-display italic leading-relaxed flex-grow mb-8 text-base md:text-lg"
            style={{ color: 'rgba(255,255,255,0.82)' }}
          >
            {t.quote}
          </p>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
            <p className="font-semibold text-sm" style={{ color: 'var(--accent-light)' }}>
              {t.name}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
              {t.context} · {t.year}
            </p>
          </div>
        </div>

        {/* Next */}
        <button
          onClick={next}
          aria-label="下一則心聲"
          className="testimonial-nav-btn shrink-0 w-11 h-11 flex items-center justify-center rounded-full transition-colors duration-150"
          style={{
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          <ChevronRight aria-hidden="true" size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center items-center gap-2 mt-10" role="tablist" aria-label="心聲導覽">
        {list.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            role="tab"
            aria-selected={i === idx}
            aria-label={`第 ${i + 1} 則心聲`}
            className="h-[3px] rounded-full transition-all duration-300"
            style={{
              width: i === idx ? '28px' : '8px',
              background: i === idx ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
