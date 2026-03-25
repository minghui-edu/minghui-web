'use client';

import { useState } from 'react';
import { GraduationCap, Wrench, Compass, Globe2, BookOpen, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Dest = 'japan' | 'australia';

const inner = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 flex items-center gap-2"
       style={{ color: 'var(--accent)' }}>
      <span className="w-5 h-px shrink-0" style={{ background: 'currentColor' }} aria-hidden="true" />
      {children}
    </p>
  );
}

type Pillar = { icon: LucideIcon; label: string };
type University = { name: string; note: string };
type TriptychCard = { label: string; items: string[]; featured?: boolean };

type DestData = {
  tagline: string;
  title: string;
  dates: string;
  duration: string;
  price: number;
  audience: string;
  minPeople: number;
  pillars: Pillar[];
  triptych: TriptychCard[];
  universities: University[];
  includes: string[];
  excludes: string[];
  registrationFlow: string[];
  cancelPolicy: string;
  visa: string;
};

const destinations: Record<Dest, DestData> = {
  japan: {
    tagline: '日本 · 7 天 6 晚文化參訪',
    title: '東京名校文化探索計劃',
    dates: '2026 / 08 / 01 — 08 / 07',
    duration: '7 天 6 晚',
    price: 75000,
    audience: '國中生 ～ 高中生',
    minPeople: 10,
    pillars: [
      { icon: GraduationCap, label: '名校探索' },
      { icon: Wrench,        label: '手作體驗' },
      { icon: Globe2,        label: '文化交流' },
      { icon: BookOpen,      label: '升學分享' },
    ],
    triptych: [
      { label: '文化景點', items: ['東京鐵塔', '淺草觀音寺', '明治神宮'] },
      { label: '名校參訪', items: ['東京大學', '早稻田大學', '慶應義塾大學', '學長姐交流 × 校園美食'], featured: true },
      { label: '特色體驗', items: ['遊覽富士山', '淺草和服 & 浴衣', '深度走訪東京周邊'] },
    ],
    universities: [
      { name: '東京大學',     note: '日本最高學府' },
      { name: '早稻田大學',   note: '日本頂尖私立大學' },
      { name: '慶應義塾大學', note: '日本頂尖私立大學' },
    ],
    includes: [
      '住宿（4 人房）',
      '行程內餐費（7 餐）',
      '全程景點門票',
      '全程專業領隊隨行',
      '旅遊平安險',
      '行前說明會',
    ],
    excludes: ['來回機票（台灣護照赴日免簽）', '個人消費', '自選加購行程'],
    registrationFlow: [
      '填寫線上報名表',
      '繳交訂金 NT$10,000',
      '確認錄取通知',
      '出發前 60 天繳清尾款',
    ],
    cancelPolicy: '依中華民國旅行業管理規則辦理退費，報名前請詳閱報名合約。',
    visa: '台灣護照赴日免簽，無需另行辦理簽證。',
  },

  australia: {
    tagline: '澳洲 · 10 天 9 晚文化參訪',
    title: '澳洲名校文化探索計劃',
    dates: '2026 / 07 / 20 — 07 / 29',
    duration: '10 天 9 晚',
    price: 150000,
    audience: '國中生 ～ 高中生',
    minPeople: 10,
    pillars: [
      { icon: GraduationCap, label: '名校探索' },
      { icon: Compass,       label: '深度體驗' },
      { icon: Globe2,        label: '文化交流' },
      { icon: BookOpen,      label: '升學分享' },
    ],
    triptych: [
      { label: '文化景點', items: ['雪梨歌劇院', '藍山國家公園', '蘿拉小鎮'] },
      { label: '名校參訪', items: ['QS 19 墨爾本大學', 'QS 20 新南威爾斯大學', 'QS 25 雪梨大學', '學長姐交流 × 校園美食'], featured: true },
      { label: '特色體驗', items: ['濱海七彩沙灘屋', '維多利亞藝術中心', '古董蒸氣火車'] },
    ],
    universities: [
      { name: '墨爾本大學',     note: 'QS 世界排名 第 19 名' },
      { name: '新南威爾斯大學', note: 'QS 世界排名 第 20 名' },
      { name: '雪梨大學',       note: 'QS 世界排名 第 25 名' },
    ],
    includes: [
      '住宿（4 人房）',
      '行程內餐費（部分）',
      '全程景點門票',
      '全程專業領隊隨行',
      '旅遊平安險',
      '行前說明會',
    ],
    excludes: ['來回機票', '澳洲 ETA 電子簽（約 NT$100）', '個人消費', '自選加購行程'],
    registrationFlow: [
      '填寫線上報名表',
      '繳交訂金 NT$20,000',
      '確認錄取通知',
      '出發前 60 天繳清尾款',
    ],
    cancelPolicy: '依中華民國旅行業管理規則辦理退費，報名前請詳閱報名合約。',
    visa: '需自行申辦澳洲 ETA 電子簽（費用約 NT$100），可於線上辦理，通常即時核准。',
  },
};

export default function DestinationTabs() {
  const [active, setActive] = useState<Dest>('japan');
  const d = destinations[active];

  return (
    <>
      {/* ── Tab Selector ─────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', borderBottom: '2px solid var(--border)' }}>
        <div className={inner}>
          <div className="grid grid-cols-2" role="group" aria-label="選擇遊學目的地">
            {(['japan', 'australia'] as Dest[]).map((dest) => {
              const item = destinations[dest];
              const isActive = active === dest;
              return (
                <button
                  key={dest}
                  onClick={() => setActive(dest)}
                  aria-pressed={isActive}
                  className="relative p-6 md:p-10 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400"
                  style={{
                    background: isActive ? 'var(--navy)' : 'transparent',
                    borderTop: `4px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                    borderRight: dest === 'japan' ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <p
                    className="text-xs font-semibold tracking-[0.12em] uppercase mb-2"
                    style={{ color: isActive ? 'var(--accent-light)' : 'var(--muted)' }}
                  >
                    {item.tagline}
                  </p>
                  <p
                    className="font-display font-bold text-xl md:text-2xl mb-3 leading-tight"
                    style={{ color: isActive ? '#fff' : 'var(--navy)' }}
                  >
                    {item.title}
                  </p>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="text-sm" style={{ color: isActive ? 'rgba(255,255,255,0.5)' : 'var(--muted)' }}>
                      {item.dates}
                    </span>
                    <span className="font-display font-bold text-2xl md:text-3xl" style={{ color: 'var(--accent)' }}>
                      NT$&nbsp;{item.price.toLocaleString()}
                    </span>
                  </div>
                  {/* Active bottom rule */}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: 'var(--accent)' }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 行程概覽橫條 ─────────────────────────────────────── */}
      <div style={{ background: 'var(--navy)' }}>
        <div className={`${inner} py-8`}>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {([
              { label: '出發日期', value: d.dates },
              { label: '行程天數', value: d.duration },
              { label: '適合對象', value: d.audience },
              { label: '最低成團', value: `${d.minPeople} 人` },
            ] as { label: string; value: string }[]).map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</dt>
                <dd className="font-semibold text-sm" style={{ color: '#fff' }}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ── 三格照片卡 ───────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)' }}>
        <div className={`${inner} py-16`}>
          <SectionLabel>行程亮點</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-10" style={{ color: 'var(--navy)' }}>
            一次行程，三重收穫
          </h2>
          {/* Cards: middle one elevated */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
            {d.triptych.map((card) => (
              <div
                key={card.label}
                className="flex flex-col bg-white overflow-hidden"
                style={card.featured ? {
                  marginTop: '-1rem',
                  marginBottom: '-0.5rem',
                  boxShadow: '0 8px 32px rgba(11,10,63,0.14)',
                  zIndex: 1,
                  position: 'relative',
                } : {}}
              >
                {/* Placeholder image area */}
                <div
                  className="relative flex items-center justify-center overflow-hidden"
                  style={{
                    height: card.featured ? '200px' : '150px',
                    background: card.featured ? 'var(--navy)' : 'rgba(11,10,63,0.03)',
                    borderBottom: `${card.featured ? 3 : 1}px solid ${card.featured ? 'var(--accent)' : 'var(--border)'}`,
                  }}
                >
                  {card.featured && (
                    <span
                      className="absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase px-2 py-1"
                      style={{ background: 'var(--accent)', color: 'var(--navy)' }}
                    >
                      核心亮點
                    </span>
                  )}
                  {/* Watermark */}
                  <span
                    className="font-display font-bold select-none pointer-events-none"
                    style={{
                      fontSize: '7rem',
                      lineHeight: 1,
                      color: card.featured ? 'rgba(255,255,255,0.05)' : 'rgba(11,10,63,0.05)',
                    }}
                    aria-hidden="true"
                  >
                    {card.label[0]}
                  </span>
                </div>
                {/* Content */}
                <div className="p-6 flex-1">
                  <p className="text-xs font-bold tracking-[0.1em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
                    {card.label}
                  </p>
                  <ul className="space-y-2.5">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-[5px] shrink-0"
                          style={{ background: card.featured ? 'var(--accent)' : 'rgba(11,10,63,0.25)' }}
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-snug" style={{ color: 'var(--navy)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 四大主題 ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)', paddingBottom: '4rem' }}>
        <div className={inner}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {d.pillars.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 p-6 bg-white text-center"
                style={{ border: '1px solid var(--border)', borderTop: '3px solid var(--accent)' }}
              >
                <Icon aria-hidden="true" size={26} style={{ color: 'var(--navy)' }} />
                <span className="font-semibold text-sm" style={{ color: 'var(--navy)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 名校參訪 ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--surface)' }}>
        <div className={`${inner} py-16`}>
          <SectionLabel>名校清單</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-8" style={{ color: 'var(--navy)' }}>
            參訪大學 × 學長姐閉門分享
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {d.universities.map((u) => (
              <div
                key={u.name}
                className="p-6 bg-white"
                style={{ border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)' }}
              >
                <p className="font-display font-bold text-lg mb-1" style={{ color: 'var(--navy)' }}>{u.name}</p>
                <p className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{u.note}</p>
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--muted)' }}>
            每所大學均安排在校學長姐進行閉門分享，涵蓋升學路徑、選系建議、獎學金申請秘訣，都是網路上找不到的第一手資訊。
          </p>
        </div>
      </section>

      {/* ── 費用說明 ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)' }}>
        <div className={`${inner} py-16`}>
          <SectionLabel>費用說明</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-1" style={{ color: 'var(--navy)' }}>
            NT$&nbsp;<span style={{ color: 'var(--accent)' }}>{d.price.toLocaleString()}</span>&nbsp;包含以下項目
          </h2>
          <p className="text-sm mb-10" style={{ color: 'var(--muted)' }}>每人含稅總費用</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {d.includes.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-4 bg-white"
                style={{ border: '1px solid var(--border)' }}
              >
                <Check aria-hidden="true" size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span className="text-sm font-medium" style={{ color: 'var(--navy)' }}>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            ＊費用不含：{d.excludes.join('、')}
          </p>
        </div>
      </section>

      {/* ── 注意事項 ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--surface)' }}>
        <div className={`${inner} py-16`}>
          <SectionLabel>報名前確認</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-10" style={{ color: 'var(--navy)' }}>
            注意事項
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 報名流程 */}
            <div className="p-6 bg-white" style={{ border: '1px solid var(--border)' }}>
              <p className="font-semibold text-sm mb-5" style={{ color: 'var(--navy)' }}>報名流程</p>
              <ol className="space-y-4">
                {d.registrationFlow.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: 'var(--accent)', color: 'var(--navy)' }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm pt-0.5" style={{ color: 'var(--navy)' }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            {/* 其他說明 */}
            <div className="space-y-4">
              {([
                {
                  label: '成團人數',
                  content: `最低 ${d.minPeople} 人成團。若未達人數，將於出發前 45 天提前通知並全額退款。`,
                },
                { label: '簽證說明', content: d.visa },
                { label: '退費規定', content: d.cancelPolicy },
              ] as { label: string; content: string }[]).map(({ label, content }) => (
                <div key={label} className="p-5 bg-white" style={{ border: '1px solid var(--border)' }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: 'var(--accent)' }}>{label}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--navy)' }}>{content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
