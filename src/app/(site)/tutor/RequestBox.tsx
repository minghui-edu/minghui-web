'use client';

import { useState } from 'react';
import { MessageCircle, Copy } from 'lucide-react';

const TEMPLATE = `年級／科目：
目標（段考、學測、分科、其他）：
上課方式（線上／實體，實體請寫地區）：
可上課時段：
老師偏好（性別、風格，可不填）：`;

/** 家長需求格式：複製後貼到 LINE，減少來回詢問 */
export default function RequestBox() {
  const [status, setStatus] = useState('');

  async function copy() {
    try {
      await navigator.clipboard.writeText(TEMPLATE);
      setStatus('已複製，貼到 LINE 填好送出就可以');
    } catch {
      setStatus('請長按下方文字複製');
    }
  }

  return (
    <section className="py-20" style={{ background: 'var(--cream)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
          <span className="w-5 h-px shrink-0" style={{ background: 'currentColor' }} aria-hidden="true" />
          家長預約
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: 'var(--navy)' }}>
          把需求貼到 LINE，我們幫你找老師
        </h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
          複製下面的格式，填好後傳到明慧教育官方 LINE。姓名、學校和住址先不用填，等雙方確認意願後再聯絡。
        </p>
        <pre
          className="p-5 mb-5 text-sm leading-loose whitespace-pre-wrap bg-white"
          style={{ border: '1px solid var(--border)', color: 'var(--navy)', fontFamily: 'inherit' }}
        >
          {TEMPLATE}
        </pre>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm"
            style={{ border: '1px solid var(--navy)', color: 'var(--navy)' }}
          >
            <Copy aria-hidden="true" size={16} />
            複製需求格式
          </button>
          <a
            href="https://lin.ee/6uAXvJu"
            target="_blank"
            rel="noopener noreferrer"
            data-track="tutor_contact_click"
            data-cta-location="request_box"
            data-item-name="家長需求格式"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm"
            style={{ background: '#00B900', color: '#FFFFFF' }}
          >
            <MessageCircle aria-hidden="true" size={16} />
            透過官方 LINE 預約
          </a>
          <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }} role="status" aria-live="polite">{status}</span>
        </div>
      </div>
    </section>
  );
}
