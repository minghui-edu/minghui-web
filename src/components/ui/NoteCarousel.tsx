'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

type CarouselImage = { src: string; alt: string };

type Props = { images: CarouselImage[] };

export default function NoteCarousel({ images }: Props) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [lbVisible, setLbVisible] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length],
  );
  const prevLb = useCallback(
    () => setLightbox((l) => (l !== null ? (l - 1 + images.length) % images.length : null)),
    [images.length],
  );
  const nextLb = useCallback(
    () => setLightbox((l) => (l !== null ? (l + 1) % images.length : null)),
    [images.length],
  );

  const openLightbox = useCallback((idx: number) => {
    setLightbox(idx);
    // Next tick so CSS transition picks up from opacity:0
    requestAnimationFrame(() => setLbVisible(true));
  }, []);

  const closeLightbox = useCallback(() => {
    setLbVisible(false);
    setTimeout(() => {
      setLightbox(null);
      triggerRef.current?.focus();
    }, 200);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLb();
      if (e.key === 'ArrowRight') nextLb();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, prevLb, nextLb, closeLightbox]);

  if (images.length === 0) return null;

  return (
    <>
      {/* ── Carousel ───────────────────────────── */}
      <div className="select-none">
        {/* Main image */}
        <button
          ref={triggerRef}
          type="button"
          className="relative w-full overflow-hidden cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:brightness-90"
          style={{
            aspectRatio: '1/1',
            background: 'rgba(11,10,63,0.04)',
            border: '1px solid var(--border)',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            outlineColor: 'var(--accent)',
            transition: 'filter 100ms ease',
          }}
          onClick={() => openLightbox(current)}
          aria-label={`查看第 ${current + 1} 張圖片（點擊放大）`}
        >
          <Image
            src={images[current].src}
            alt={images[current].alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 560px"
            priority={current === 0}
          />
          <div
            className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 text-[11px] font-medium pointer-events-none"
            style={{ background: 'rgba(0,0,0,0.48)', color: '#fff' }}
          >
            <ZoomIn size={11} aria-hidden="true" />
            點擊放大
          </div>
          {images.length > 1 && (
            <div
              className="absolute bottom-3 left-3 text-[11px] font-medium px-2 py-1 pointer-events-none"
              style={{ background: 'rgba(0,0,0,0.48)', color: '#fff' }}
            >
              {current + 1} / {images.length}
            </div>
          )}
        </button>

        {/* Prev / Next — padded to 44px touch target */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white hover:brightness-125 active:scale-90"
              style={{
                width: '44px',
                height: '44px',
                background: 'rgba(0,0,0,0.4)',
                color: '#fff',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                transition: 'filter 100ms ease, transform 100ms ease',
              }}
              aria-label="上一張"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white hover:brightness-125 active:scale-90"
              style={{
                width: '44px',
                height: '44px',
                background: 'rgba(0,0,0,0.4)',
                color: '#fff',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                transition: 'filter 100ms ease, transform 100ms ease',
              }}
              aria-label="下一張"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </>
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`第 ${i + 1} 張`}
                aria-pressed={i === current}
                className="relative shrink-0 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 hover:opacity-80 active:scale-95"
                style={{
                  width: '60px',
                  height: '60px',
                  border: i === current ? '2px solid var(--accent)' : '2px solid transparent',
                  background: 'rgba(11,10,63,0.04)',
                  opacity: i === current ? 1 : 0.5,
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  transition: 'opacity 150ms ease, border-color 150ms ease, transform 100ms ease',
                  outlineColor: 'var(--accent)',
                }}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="60px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ───────────────────────────── */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="筆記預覽放大"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'rgba(0,0,0,0.92)',
            overscrollBehavior: 'contain',
            opacity: lbVisible ? 1 : 0,
            transition: 'opacity 200ms ease',
          }}
          onClick={closeLightbox}
        >
          {/* Image */}
          <div
            className="relative"
            style={{
              width: 'min(90vw, 640px)',
              height: 'min(90vh, 640px)',
              transform: lbVisible ? 'scale(1)' : 'scale(0.95)',
              transition: 'transform 200ms ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Counter */}
          {images.length > 1 && (
            <p
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium px-3 py-1"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
            >
              {lightbox + 1} / {images.length}
            </p>
          )}

          {/* Close — 48px target */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white hover:brightness-150 active:scale-90"
            style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              transition: 'filter 100ms ease, transform 100ms ease',
            }}
            aria-label="關閉"
          >
            <X size={20} aria-hidden="true" />
          </button>

          {/* Prev / Next — 48px target */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prevLb(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white hover:brightness-150 active:scale-90"
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  transition: 'filter 100ms ease, transform 100ms ease',
                }}
                aria-label="上一張"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); nextLb(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white hover:brightness-150 active:scale-90"
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  transition: 'filter 100ms ease, transform 100ms ease',
                }}
                aria-label="下一張"
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
