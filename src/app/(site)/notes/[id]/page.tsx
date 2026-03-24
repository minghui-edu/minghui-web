import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShoppingCart, BookOpen, List, Package } from 'lucide-react';

/* ─── Shared layout token ───────────────────── */
const inner = 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8';

/* ─── Data ──────────────────────────────────── */

const notes: Record<string, {
  title: string;
  subject: string;
  level: string;
  author: string;
  price: string;
  pages: number;
  desc: string;
  contents: string[];
  includes: string[];
  tags: string[];
  color: string;
  bg: string;
  buyHref: string;
}> = {
  physics: {
    title: '高中物理總複習精華',
    subject: '物理',
    level: '高中',
    author: '台大物理系學長',
    price: 'NT$ 450',
    pages: 68,
    desc: '涵蓋高中物理全程範圍，以圖解方式呈現難以理解的抽象概念，搭配公式整理與解題技巧，讓你用最短時間掌握考試重點。特別適合學測、指考前的密集複習。',
    contents: [
      '力學：牛頓定律、動量守恆、能量守恆',
      '熱學：熱力學定律、氣體狀態方程式',
      '波動：聲波、光波、干涉與繞射',
      '電磁學：靜電場、直流電路、電磁感應',
      '近代物理：量子力學基礎、放射性衰變',
    ],
    includes: ['PDF 筆記全文（68 頁）', '重點公式速查卡', '解題思路影片 5 支'],
    tags: ['高中', '物理', '學測', '指考'],
    color: 'var(--navy)',
    bg: 'rgba(11,10,63,0.06)',
    buyHref: '#',
  },
  calculus: {
    title: '大一微積分考古題詳解',
    subject: '數學',
    level: '大學',
    author: '台大數學系學姐',
    price: 'NT$ 380',
    pages: 52,
    desc: '精選近五年台大、清大、交大微積分期中期末考古題，每題皆附完整解題步驟與解題思路說明，幫助你快速掌握出題模式與常見陷阱。',
    contents: [
      '極限與連續性：ε-δ 定義、夾擠定理',
      '微分：鏈鎖律、隱函數微分、相關變率',
      '積分：定積分技巧、換元法、分部積分',
      '多變數函數：偏微分、梯度、拉格朗日乘數',
      '無窮級數：泰勒展開、收斂半徑判別',
    ],
    includes: ['PDF 考古題詳解（52 頁）', '解題公式整理速查表', '重點觀念說明影片 3 支'],
    tags: ['大學', '微積分', '考古題', '期末考'],
    color: '#0F5132',
    bg: 'rgba(15,81,50,0.06)',
    buyHref: '#',
  },
  ielts: {
    title: '雅思 IELTS 寫作高分模板',
    subject: '英文',
    level: '國際檢定',
    author: 'IELTS Overall 8.5 學姐',
    price: 'NT$ 500',
    pages: 44,
    desc: '由雅思寫作 8.5 分學姐親手整理，涵蓋 Task 1 圖表分析與 Task 2 議論文寫作，提供可直接套用的高分句型與段落架構模板，附 10 篇滿分範文全文解析。',
    contents: [
      'Task 1 圖表類型解析（折線、柱狀、圓餅、地圖流程）',
      'Task 1 高分句型 50 組完整整理',
      'Task 2 議題分類與立場決策框架',
      'Task 2 段落架構、連接詞與邏輯串接',
      '實戰範文 10 篇全文精析與批改說明',
    ],
    includes: ['PDF 模板全文（44 頁）', '高分範文 10 篇', '常用學術詞彙表'],
    tags: ['英文', 'IELTS', '寫作', '國際檢定'],
    color: '#1E56A0',
    bg: 'rgba(30,86,160,0.06)',
    buyHref: '#',
  },
  biology: {
    title: '生物重點圖解記憶法',
    subject: '生物',
    level: '高中',
    author: '台大生命科學系學長',
    price: 'NT$ 420',
    pages: 76,
    desc: '以大量圖解取代文字堆疊，將複雜的生化路徑、細胞結構與遺傳機制視覺化，搭配記憶口訣，讓你在最短時間建立紮實的生物知識架構，大幅提升背誦效率。',
    contents: [
      '細胞：構造比較、細胞分裂、膜運輸機制',
      '遺傳：孟德爾遺傳定律、DNA 複製、蛋白質合成',
      '代謝：光合作用路徑圖解、細胞呼吸 ATP 計算',
      '生態：族群動態模型、生態系能量流動',
      '演化：天擇理論、物種形成機制、系統分類',
    ],
    includes: ['PDF 圖解筆記（76 頁）', '記憶口訣速查卡', '考前衝刺重點影片 4 支'],
    tags: ['高中', '生物', '學測', '圖解記憶'],
    color: '#7B4F12',
    bg: 'rgba(123,79,18,0.06)',
    buyHref: '#',
  },
};

const sections = [
  { key: 'desc' as const,     label: '筆記簡介',   icon: BookOpen },
  { key: 'contents' as const, label: '內容目錄',   icon: List },
  { key: 'includes' as const, label: '購買包含',   icon: Package },
] as const;

export async function generateStaticParams() {
  return Object.keys(notes).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const note = notes[id];
  if (!note) return {};
  return {
    title: `${note.title} — 高分筆記`,
    description: note.desc.slice(0, 100),
  };
}

/* ─── Page ──────────────────────────────────── */

export default async function NoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = notes[id];
  if (!note) notFound();

  return (
    <div>

      {/* ── Header ────────────────────────────── */}
      <section className="relative overflow-hidden py-20" style={{ background: 'var(--navy)' }}>
        <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className={`relative ${inner}`}>

          {/* Back link */}
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            <ArrowLeft aria-hidden="true" size={15} />
            返回筆記商城
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            {/* Title block */}
            <div className="flex gap-6 items-start">
              {/* Cover thumbnail */}
              <div
                className="hidden sm:flex w-20 h-28 shrink-0 items-center justify-center"
                style={{ background: note.bg, border: `2px solid ${note.color}`, borderTopColor: note.color, opacity: 0.9 }}
                aria-hidden="true"
              >
                <span className="font-display font-bold text-3xl" style={{ color: note.color, opacity: 0.3 }}>
                  {note.subject[0]}
                </span>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className="text-[11px] font-semibold tracking-wide px-2.5 py-1"
                    style={{ background: 'rgba(232,144,39,0.15)', color: 'var(--accent-light)', border: '1px solid rgba(232,144,39,0.3)' }}
                  >
                    {note.subject}
                  </span>
                  <span
                    className="text-[11px] font-semibold tracking-wide px-2.5 py-1"
                    style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    {note.level}
                  </span>
                </div>
                <h1
                  className="font-display font-bold leading-tight mb-2"
                  style={{ color: '#FFFFFF', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}
                >
                  {note.title}
                </h1>
                <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {note.author} · {note.pages} 頁
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 font-medium"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Price + CTA */}
            <div className="shrink-0 flex flex-col items-start md:items-end gap-3">
              <div className="font-display font-bold" style={{ color: 'var(--accent-light)', fontSize: '2rem' }}>
                {note.price}
              </div>
              <a
                href={note.buyHref}
                className="hero-cta-primary inline-flex items-center gap-2 px-7 py-4 font-semibold text-sm tracking-wide"
              >
                <ShoppingCart aria-hidden="true" size={17} />
                立即購買
              </a>
            </div>
          </div>

          <div className="mt-10 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
        </div>
      </section>

      {/* ── Content sections ──────────────────── */}
      <section className="py-16" style={{ background: 'var(--cream)' }}>
        <div className={inner}>
          <div className="space-y-6">

            {/* 簡介 */}
            <div
              className="p-8"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${note.color}` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: note.bg }}>
                  <BookOpen aria-hidden="true" size={18} style={{ color: note.color }} />
                </div>
                <h2 className="font-display font-bold text-lg" style={{ color: 'var(--navy)' }}>筆記簡介</h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{note.desc}</p>
            </div>

            {/* 目錄 */}
            <div
              className="p-8"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${note.color}` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: note.bg }}>
                  <List aria-hidden="true" size={18} style={{ color: note.color }} />
                </div>
                <h2 className="font-display font-bold text-lg" style={{ color: 'var(--navy)' }}>內容目錄</h2>
              </div>
              <ol className="space-y-2">
                {note.contents.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm" style={{ color: 'var(--muted)' }}>
                    <span
                      className="shrink-0 font-bold text-xs mt-0.5 w-5 text-right"
                      style={{ color: note.color, opacity: 0.7 }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            {/* 包含項目 */}
            <div
              className="p-8"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${note.color}` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: note.bg }}>
                  <Package aria-hidden="true" size={18} style={{ color: note.color }} />
                </div>
                <h2 className="font-display font-bold text-lg" style={{ color: 'var(--navy)' }}>購買包含</h2>
              </div>
              <ul className="space-y-2.5">
                {note.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--muted)' }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: note.color }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────── */}
      <section className="py-16" style={{ background: 'var(--navy)' }}>
        <div className={`${inner} text-center`}>
          <p className="font-display italic text-lg mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {note.title}
          </p>
          <p className="font-display font-bold mb-8" style={{ color: 'var(--accent-light)', fontSize: '1.75rem' }}>
            {note.price}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={note.buyHref}
              className="hero-cta-primary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide"
            >
              <ShoppingCart aria-hidden="true" size={17} />
              立即購買
            </a>
            <Link
              href="/notes"
              className="hero-cta-secondary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide"
            >
              返回商城
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
