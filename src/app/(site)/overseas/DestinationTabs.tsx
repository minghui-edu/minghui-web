'use client';

import { useState } from 'react';
import { GraduationCap, Wrench, Compass, Globe2, BookOpen, Check, ChevronRight } from 'lucide-react';
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
type University = { name: string; note: string; desc: string };
type TriptychCard = { label: string; desc: string; items: string[]; featured?: boolean };

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
  registrationUrl: string;
};

const destinations: Record<Dest, DestData> = {
  japan: {
    tagline: '日本 · 7 天 6 晚文化參訪',
    title: '東京名校文化探索計劃',
    dates: '2026 / 08 / 01 — 08 / 07',
    duration: '7 天 6 晚',
    price: 75000,
    audience: '國中生 ～ 大學生',
    minPeople: 10,
    pillars: [
      { icon: GraduationCap, label: '名校探索' },
      { icon: Wrench,        label: '手作體驗' },
      { icon: Globe2,        label: '文化交流' },
      { icon: BookOpen,      label: '升學分享' },
    ],
    triptych: [
      {
        label: '文化景點',
        desc: '不只是觀光打卡——每個景點都搭配深度導覽，幫助你在出發前就真正了解日本的文化底蘊與生活節奏，讓留學的選擇建立在真實體驗上。',
        items: ['東京鐵塔', '淺草觀音寺', '明治神宮'],
      },
      {
        label: '名校參訪',
        desc: '走進東京大學的赤門、坐進早稻田的學生食堂，再聽在校學長姐親口分享升學歷程與留學生活——比任何網路文章都真實、直接，讓你提前感受自己未來四年的樣子。',
        items: ['東京大學', '早稻田大學', '慶應義塾大學', '學長姐交流 × 校園美食'],
        featured: true,
      },
      {
        label: '特色體驗',
        desc: '穿上和服漫步淺草、站在富士山腳下仰望——讓留學的想像變得具體可感受。帶著這些真實記憶回台灣，再做人生最重要的決定。',
        items: ['遊覽富士山', '淺草和服 & 浴衣', '深度走訪東京周邊'],
      },
    ],
    universities: [
      {
        name: '東京大學',
        note: '日本最高學府',
        desc: '位居 QS 亞洲排名前茅，以嚴謹的學術訓練與跨領域研究聞名全球。工學、醫學、法學、理學均享有國際頂尖聲譽，是眾多台灣學生留日的第一志願，入學競爭極為激烈。',
      },
      {
        name: '早稻田大學',
        note: '日本頂尖私立大學',
        desc: '日本最具代表性的私立大學之一，擁有超過百年歷史。國際化程度高，提供多元英語授課課程，政治學、商學、文學等科系在業界極具影響力，校友遍及政界、媒體、企業高層。',
      },
      {
        name: '慶應義塾大學',
        note: '日本頂尖私立大學',
        desc: '與早稻田並列日本私立兩強，以培育商界與政界精英著稱。醫學部享有極高聲譽，SFC（環境情報學部）更是日本跨領域、創新課程的先驅，深受志向多元的學生青睞。',
      },
    ],
    includes: [
      '來回機票',
      '住宿（2 或 4 人房）',
      '行程內餐費（7 餐）',
      '全程景點門票',
      '全程專業領隊隨行',
      '旅遊平安險',
      '行前說明會',
    ],
    excludes: ['個人消費'],
    registrationFlow: [
      '填寫線上報名表',
      '繳交訂金 NT$10,000',
      '確認錄取通知',
      '出發前 60 天繳清尾款',
    ],
    cancelPolicy: '依中華民國旅行業管理規則辦理退費，報名前請詳閱報名合約。',
    visa: '台灣護照赴日免簽，無需另行辦理簽證。',
    registrationUrl: 'https://forms.gle/yeSuA9z9TG7Xi71Q8',
  },

  australia: {
    tagline: '澳洲 · 10 天 9 晚文化參訪',
    title: '澳洲名校文化探索計劃',
    dates: '2026 / 07 / 20 — 07 / 29',
    duration: '10 天 9 晚',
    price: 150000,
    audience: '國中生 ～ 大學生',
    minPeople: 10,
    pillars: [
      { icon: GraduationCap, label: '名校探索' },
      { icon: Compass,       label: '深度體驗' },
      { icon: Globe2,        label: '文化交流' },
      { icon: BookOpen,      label: '升學分享' },
    ],
    triptych: [
      {
        label: '文化景點',
        desc: '從地標性的雪梨歌劇院到壯闊的藍山國家公園，感受澳洲獨特的自然與人文交融，理解為什麼這裡每年吸引來自全球數十萬名學生前來求學、定居。',
        items: ['雪梨歌劇院', '藍山國家公園', '蘿拉小鎮'],
      },
      {
        label: '名校參訪',
        desc: '三所 QS 前 25 頂尖大學一次走訪，在校學長姐帶你深入校園各角落，獨家分享如何拿到澳洲名校錄取通知，以及留學生真實的每日生活、費用、打工心得。',
        items: ['QS 19 墨爾本大學', 'QS 20 新南威爾斯大學', 'QS 25 雪梨大學', '學長姐交流 × 校園美食'],
        featured: true,
      },
      {
        label: '特色體驗',
        desc: '七彩沙灘屋、古董蒸氣火車、維多利亞藝術中心……每一個體驗都讓你感受到澳洲文化的多樣性，也幫你在決定留學前，評估自己是否真的適合在這片土地生活。',
        items: ['濱海七彩沙灘屋', '維多利亞藝術中心', '古董蒸氣火車'],
      },
    ],
    universities: [
      {
        name: '墨爾本大學',
        note: 'QS 世界排名 第 19 名',
        desc: '澳洲排名第一，以研究型教學體系著稱，醫學、法學、建築均為世界頂尖。校園坐落墨爾本市區，生活機能完善，多元文化交融，是台灣學生赴澳留學的首選目標。',
      },
      {
        name: '新南威爾斯大學',
        note: 'QS 世界排名 第 20 名',
        desc: '工程與商學在澳洲首屈一指，與業界合作緊密，畢業生就業率極高。雪梨校區地理位置絕佳，鄰近商業中心，理工科與商科志向的學生尤其趨之若鶩。',
      },
      {
        name: '雪梨大學',
        note: 'QS 世界排名 第 25 名',
        desc: '澳洲歷史最悠久的大學，哥德式建築校園是雪梨最具代表性的地標之一。人文社科、醫學、法學實力均屬世界一流，豐富的社團與多元的學生族群造就了獨特的校園文化。',
      },
    ],
    includes: [
      '來回機票',
      '住宿（2 或 4 人房）',
      '行程內餐費（部分）',
      '全程景點門票',
      '全程專業領隊隨行',
      '旅遊平安險',
      '行前說明會',
    ],
    excludes: ['澳洲 ETA 電子簽（約 NT$100）', '個人消費'],
    registrationFlow: [
      '填寫線上報名表',
      '繳交訂金 NT$20,000',
      '確認錄取通知',
      '出發前 60 天繳清尾款',
    ],
    cancelPolicy: '依中華民國旅行業管理規則辦理退費，報名前請詳閱報名合約。',
    visa: '需自行申辦澳洲 ETA 電子簽（費用約 NT$100），可於線上辦理，通常即時核准。',
    registrationUrl: 'https://forms.gle/itv9yCRyqCFHcVuT9',
  },
};

export default function DestinationTabs() {
  const [active, setActive] = useState<Dest>('japan');
  const d = destinations[active];

  return (
    <>
      {/* ── Tab Selector + 行程概覽（同一 navy 區塊）────────────── */}
      <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className={inner}>
          {/* Pill buttons */}
          <div className="flex flex-wrap gap-3 pt-8 pb-6" role="group" aria-label="選擇遊學目的地">
            {(['japan', 'australia'] as Dest[]).map((dest) => {
              const item = destinations[dest];
              const isActive = active === dest;
              return (
                <button
                  key={dest}
                  onClick={() => setActive(dest)}
                  aria-pressed={isActive}
                  className="px-6 py-2.5 text-sm font-semibold transition-[background-color,color,border-color] duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  style={{
                    background: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? 'var(--navy)' : 'rgba(255,255,255,0.6)',
                    border: `1.5px solid ${isActive ? 'var(--accent)' : 'rgba(255,255,255,0.25)'}`,
                    borderRadius: '9999px',
                  }}
                >
                  {dest === 'japan' ? '🇯🇵' : '🇦🇺'}&ensp;{item.duration}&ensp;·&ensp;{item.title}
                </button>
              );
            })}
          </div>

          {/* 行程概覽 + 報名說明會按鈕 */}
          <div
            className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
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
            {/* 報名線上說明會 */}
            <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
              <a
                href={d.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-primary inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm tracking-wide"
              >
                報名線上說明會
                <ChevronRight aria-hidden="true" size={15} />
              </a>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>
                ＊詳細行程及費用以說明會內容為主
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 三格照片卡 ───────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)' }}>
        <div className={`${inner} py-16`}>
          <SectionLabel>行程亮點</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-10" style={{ color: 'var(--navy)' }}>
            一次行程，三重收穫
          </h2>
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
                    height: card.featured ? '180px' : '140px',
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
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-xs font-bold tracking-[0.1em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
                    {card.label}
                  </p>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>
                    {card.desc}
                  </p>
                  <ul className="space-y-2 mt-auto pt-4" style={{ borderTop: '1px solid var(--border)' }}>
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
      <section style={{ background: 'var(--surface)', paddingBottom: '4rem' }}>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {d.universities.map((u) => (
              <div
                key={u.name}
                className="p-6 bg-white flex flex-col"
                style={{ border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)' }}
              >
                <p className="font-display font-bold text-lg mb-0.5" style={{ color: 'var(--navy)' }}>{u.name}</p>
                <p className="text-xs font-semibold mb-4" style={{ color: 'var(--accent)' }}>{u.note}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{u.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            每所大學均安排在校學長姐進行閉門分享，涵蓋升學路徑、選系建議、獎學金申請秘訣，都是網路上找不到的第一手資訊。
          </p>
        </div>
      </section>

      {/* ── 費用說明 ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)' }}>
        <div className={`${inner} py-16`}>
          <SectionLabel>費用說明</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-1" style={{ color: 'var(--navy)' }}>
            NT$&nbsp;<span style={{ color: 'var(--accent)' }}>{new Intl.NumberFormat('zh-TW').format(d.price)}</span>&nbsp;包含以下項目
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
          {d.excludes.length > 0 && (
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              ＊費用不含：{d.excludes.join('、')}
            </p>
          )}
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

          {/* 報名線上說明會 CTA（重複，底部強調） */}
          <div
            className="mt-12 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: 'var(--navy)' }}
          >
            <div>
              <p className="font-display font-bold text-xl text-white mb-1">還有疑問？先來線上說明會</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                行程詳情、費用、報名流程，我們在說明會上一次說清楚。
              </p>
            </div>
            <a
              href="#"
              className="hero-cta-primary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide shrink-0"
            >
              報名線上說明會
              <ChevronRight aria-hidden="true" size={15} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
