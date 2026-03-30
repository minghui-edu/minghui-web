'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Quote, ChevronLeft, ChevronRight, Youtube } from 'lucide-react';

const testimonials = [
  {
    quote: '這是我參加過內容最豐富的營隊，兩天時間濃縮了其他營隊五天的內容，雖然真的超累，但真人圖書館活動讓我更加確認了對電機系的熱情，後來唸書時每次快放棄都會想起學長的分享與鼓勵，真的收穫滿滿。',
    name: '陳同學',
    context: '第四屆科系探索領袖營學員',
    year: '2023',
  },
  {
    quote: '我是在要填志願前參加了 DELC 的科系探索營，真人圖書館讓我第一次真正了解企管系、法律系、財金系的學習內容，了解到原本心儀的科系不如想像中美好，真正找到了喜歡的方向，最後也順利錄取了，感謝這次活動的經驗讓我沒有不小心選錯科系。',
    name: '王同學',
    context: '第五屆科系探索領袖營學員',
    year: '2024',
  },
  {
    quote: '透過老師推薦找到的家教，本來還以為數學沒救了，但賴老師講課很仔細，讓我終於懂了各種題型的核心觀念，最後也在學測時拿到比預期還要高的成績，順利錄取理想學校。',
    name: '陳同學',
    context: '澳洲新南威爾斯大學 電腦科學 · 家教媒合學員',
    year: '2022',
  },
  {
    quote: '之前找過很多次家教老師，一直找不到適合的，以為找家教很麻煩，某次經其他家長介紹認識奎哥，奎哥很細心，能馬上點出小孩的問題所在，讓我跟爸爸都很放心。',
    name: '黃同學家長',
    context: '台大財金系 · 家教媒合學員',
    year: '2025',
  },
  {
    quote: '學霸筆記讓我在期中考前兩週就把微積分搞定，搭配 YouTube 上的免費影片，複習效果超好，比去補習班還有用！',
    name: '張同學',
    context: '台大 · 學霸筆記學員',
    year: '2025',
  },
  {
    quote: '在學測考前一週，英文作文從來沒寫到第二段的我，在 YouTube 上看到奎哥的作文筆記，馬上就買來用，最後學測作文拿到15分（滿分20），真的超神！',
    name: '王同學',
    context: '輔大 · 學霸筆記學員',
    year: '2024',
  },
  {
    quote: '東京探索計劃讓我提前感受留學生活，學長姐分享的申請秘訣、獎學金資訊完全是網路上找不到的，讓我下定決心申請早稻田大學。',
    name: '楊同學',
    context: '高中三年級 · 東京探索計劃學員',
    year: '2026',
  },
  {
    quote: '一開始抱著看看的心態，在實際走訪完三間學校後，更清楚知道分別有什麼特色，確定了未來研究所要申請的方向、目前要準備的經驗與能力。',
    name: '高同學',
    context: '大學一年級 · 東京探索計劃學員',
    year: '2026',
  },
  {
    quote: '原本只是想去日本玩看看，沒想到參訪慶應大學後整個人燃起來了，參加講座後，問到很多網路上根本不會說的真實情況，還有學長分享的租屋經驗、獎學金申請，很期待未來的留學生活。',
    name: '林同學',
    context: '高中二年級 · 東京探索計劃學員',
    year: '2026',
  },
];

export type Testimonial = { quote: string; name: string; context: string; year: string; screenshot?: string };

export default function TestimonialsCarousel({ items }: { items?: Testimonial[] }) {
  const list: Testimonial[] = items ?? testimonials;
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const go = (newIdx: number) => {
    if (newIdx === idx || fading) return;
    if (reducedMotion) { setIdx(newIdx); return; }
    setFading(true);
    timerRef.current = setTimeout(() => {
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
          className="flex-1 flex flex-col md:flex-row"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderTop: '3px solid var(--accent)',
            opacity: fading ? 0 : 1,
            transition: reducedMotion ? 'none' : 'opacity 0.18s ease',
            minHeight: '260px',
          }}
        >
          {/* Screenshot (if available) */}
          {t.screenshot && (
            <div className="relative shrink-0 md:w-52 overflow-hidden" style={{ minHeight: '160px' }}>
              <Image
                src={t.screenshot}
                alt={`${t.name} 的 YouTube 留言截圖`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 208px"
              />
              <div
                className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold"
                style={{ background: '#FF0000', color: '#fff' }}
              >
                <Youtube aria-hidden="true" size={10} />
                YouTube
              </div>
            </div>
          )}

          {/* Text */}
          <div className="flex flex-col flex-grow p-8 md:p-10">
            <Quote
              aria-hidden="true"
              size={28}
              className="mb-5 shrink-0"
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
                {[t.context, t.year].filter(Boolean).join(' · ')}
              </p>
            </div>
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
            className="py-5 flex items-center"
          >
            <span
              className="h-[3px] rounded-full transition-[width,background-color] duration-300"
              style={{
                width: i === idx ? '28px' : '8px',
                background: i === idx ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
