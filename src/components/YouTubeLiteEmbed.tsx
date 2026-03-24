'use client';

import { useState } from 'react';
import { Play, Youtube } from 'lucide-react';

type Props = { videoId: string; title: string };

export default function YouTubeLiteEmbed({ videoId, title }: Props) {
  const [active, setActive] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden" style={{ background: '#000' }}>
      {active ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          onClick={() => setActive(true)}
          className="group absolute inset-0 w-full h-full"
          aria-label={`播放影片：${title}`}
        >
          {/* Thumbnail from YouTube */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay */}
          <div
            className="absolute inset-0 transition-colors duration-150 group-hover:bg-black/10"
            style={{ background: 'rgba(11,10,63,0.35)' }}
            aria-hidden="true"
          />
          {/* dot-grid texture */}
          <div className="dot-grid absolute inset-0 pointer-events-none opacity-40" aria-hidden="true" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div
              className="w-14 h-14 flex items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110 motion-reduce:group-hover:scale-100"
              style={{ background: 'var(--accent)', boxShadow: '0 0 0 8px rgba(232,144,39,0.18)' }}
            >
              <Play size={22} style={{ color: 'var(--navy)', marginLeft: '2px' }} />
            </div>
          </div>
          {/* YouTube badge */}
          <span
            className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 pointer-events-none"
            style={{ background: 'rgba(255,0,0,0.88)', color: '#fff' }}
            aria-hidden="true"
          >
            <Youtube size={11} /> YouTube
          </span>
        </button>
      )}
    </div>
  );
}
