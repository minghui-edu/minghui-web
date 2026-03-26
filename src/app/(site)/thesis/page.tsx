import type { Metadata } from 'next';
import Image from 'next/image';
import { ChevronRight, Users, Zap, RefreshCcw, FileSearch, Upload, FileText, Bot, Search, PenLine, Send, MessageSquare, Shield, Image as ImageIcon } from 'lucide-react';
import FaqSection from '@/components/ui/FaqSection';
import { ParallaxBg } from '@/components/ui/ParallaxBg';
import { FadeIn } from '@/components/ui/FadeIn';

// 替換成真實照片路徑，例如 '/images/hero-thesis.jpg'
const heroImage: string | null = null;

export const metadata: Metadata = {
  title: '論文與研究顧問',
  description: '明慧教育論文顧問服務，由知名期刊編輯坐鎮指導，提供期刊選擇策略、審稿加速、重修再投稿與文獻速讀整理，全面提升學術論文發表成功率。',
  openGraph: {
    title: '論文與研究顧問 | 明慧教育',
    description: '知名期刊編輯坐鎮指導，提供期刊選擇、審稿加速、重修再投稿服務，全面提升學術發表成功率。',
    url: 'https://www.minghuiedu.com/thesis',
  },
  alternates: { canonical: 'https://www.minghuiedu.com/thesis' },
};

const inner = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 flex items-center gap-2"
       style={{ color: light ? 'var(--accent-light)' : 'var(--accent)' }}>
      <span className="w-5 h-px shrink-0" style={{ background: 'currentColor' }} aria-hidden="true" />
      {children}
    </p>
  );
}

const advantages = [
  {
    icon: Users,
    title: '知名期刊編輯坐鎮',
    desc: '顧問團隊涵蓋國內外知名期刊現任與前任編輯，深諳審稿邏輯與發表眉角。',
  },
  {
    icon: Zap,
    title: '審稿程序速通',
    desc: '憑藉業界人脈與投稿經驗，協助你選對期刊、走對程序，縮短漫長等待周期。',
  },
  {
    icon: RefreshCcw,
    title: '重修再投稿支援',
    desc: '收到審稿意見不知如何回覆？我們協助你逐條規劃修改策略，提升接受率。',
  },
  {
    icon: FileSearch,
    title: '文獻整理到位',
    desc: '將你需要閱讀的文獻交給我們，我們萃取核心重點，交付一份清晰的速讀整理報告。',
  },
];

const journeySteps = [
  {
    icon: Search,
    num: '01',
    title: '期刊選擇建議',
    desc: '根據你的研究領域、論文主題與目標受眾，由編輯顧問推薦最適合的國內外期刊，避免方向錯誤造成的時間浪費。',
  },
  {
    icon: PenLine,
    num: '02',
    title: '論文邏輯優化',
    desc: '針對研究架構、論述邏輯、方法論呈現進行一對一健檢與指導，強化論文說服力，提升通過初審的機率。',
  },
  {
    icon: Send,
    num: '03',
    title: '審稿程序加速',
    desc: '顧問熟悉各期刊的投稿眉眉角角與編輯偏好，協助你在投稿格式與流程上做到位，減少因形式問題被退稿的機會。',
  },
  {
    icon: MessageSquare,
    num: '04',
    title: '重修回覆規劃',
    desc: '收到審稿意見（Reviewer Comments）後，逐條協助你擬定回覆策略與修改方向，讓重修再投稿的成功率大幅提升。',
  },
];

const litSteps = [
  {
    icon: Upload,
    num: '1',
    title: '上傳文獻',
    desc: '將需要閱讀的學術論文（PDF 或連結）提交給我們，不限語言、不限數量。',
  },
  {
    icon: FileText,
    num: '2',
    title: '顧問整理重點',
    desc: '由專業顧問閱讀全文，萃取研究問題、方法、主要發現與對你研究的啟發，結構化整理成速讀報告。',
  },
  {
    icon: FileSearch,
    num: '3',
    title: '收到速讀報告',
    desc: '你收到一份清晰的整理文件，直接掌握文獻精髓，省下逐字閱讀的時間，專注在真正的研究工作。',
  },
];

export default function ThesisPage() {
  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28" style={{ background: 'var(--navy)' }}>
        <ParallaxBg>
          {/* Right-side hero photo (md+) */}
          <div className="hidden md:block absolute inset-0">
            <div className="absolute inset-y-0 right-0 w-[58%]">
              {heroImage ? (
                <Image src={heroImage} alt="" fill className="object-cover object-center" priority sizes="58vw" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ background: 'rgba(255,255,255,0.025)' }}>
                  <ImageIcon size={32} style={{ color: 'rgba(255,255,255,0.08)' }} />
                  <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.06)' }}>Hero Photo</span>
                </div>
              )}
            </div>
            {/* Fade gradient: navy → transparent */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--navy) 32%, rgba(11,10,63,0.92) 48%, rgba(11,10,63,0.35) 68%, transparent 84%)' }} />
          </div>
          <div className="dot-grid absolute inset-0" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 65% 40%, rgba(232,144,39,0.07) 0%, transparent 60%)' }}
          />
        </ParallaxBg>
        <div className={`relative ${inner}`}>
          <FadeIn delay={0}><SectionLabel light>論文顧問</SectionLabel></FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="font-display font-bold leading-[1.1] mb-6"
              style={{ color: '#FFFFFF', fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
            >
              台灣專業學術論文顧問
              <br />
              <em style={{ color: 'var(--accent-light)', fontStyle: 'italic' }}>提升論文發表成功率</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}><div className="gold-rule w-20 mb-8" aria-hidden="true" /></FadeIn>
          <FadeIn delay={0.25}>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.62)' }}>
              期刊選擇、論文優化、審稿加速、重修再投稿——顧問團隊涵蓋知名期刊現任與前任編輯，
              以業界視角全程陪你走過學術發表之路。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── 核心優勢 ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)' }}>
        <div className={`${inner} py-20`}>
          <SectionLabel>為什麼選擇我們</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-12" style={{ color: 'var(--navy)' }}>
            四大核心優勢
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 bg-white flex flex-col"
                style={{ border: '1px solid var(--border)', borderTop: '3px solid var(--accent)' }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center mb-5 shrink-0"
                  style={{ background: 'rgba(11,10,63,0.05)' }}
                >
                  <Icon aria-hidden="true" size={22} style={{ color: 'var(--navy)' }} />
                </div>
                <p className="font-bold text-base mb-3" style={{ color: 'var(--navy)' }}>{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 期刊發表顧問 ──────────────────────────────────────── */}
      <section style={{ background: 'var(--surface)' }}>
        <div className={`${inner} py-20`}>
          <SectionLabel>服務一</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: 'var(--navy)' }}>
            期刊發表顧問
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mb-14" style={{ color: 'var(--muted)' }}>
            從選定目標期刊到收到接受通知，每個環節都有業界顧問陪同把關。不論你是第一次投稿，
            還是已被退稿想重新出發，我們都能提供針對性的指導方案。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {journeySteps.map(({ icon: Icon, num, title, desc }) => (
              <div
                key={num}
                className="p-8 bg-white flex gap-6"
                style={{ border: '1px solid var(--border)' }}
              >
                <div className="shrink-0">
                  <div
                    className="w-12 h-12 flex items-center justify-center"
                    style={{ background: 'var(--navy)' }}
                  >
                    <Icon aria-hidden="true" size={20} style={{ color: 'var(--accent)' }} />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest mb-1" style={{ color: 'var(--accent)' }}>
                    STEP {num}
                  </p>
                  <p className="font-display font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 文獻速讀服務 ──────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)' }}>
        <div className={`${inner} py-20`}>
          <SectionLabel>服務二</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: 'var(--navy)' }}>
            文獻速讀整理服務
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mb-14" style={{ color: 'var(--muted)' }}>
            面對大量外文文獻不知從何下手？把文獻交給我們，我們替你整理好核心重點，
            讓你用最少的時間掌握最多的研究精髓。
          </p>

          {/* 3-step flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-16">
            {litSteps.map(({ icon: Icon, num, title, desc }, i) => (
              <div key={num} className="relative flex flex-col">
                {/* Arrow connector */}
                {i < litSteps.length - 1 && (
                  <div
                    className="hidden md:flex absolute top-10 -right-3 w-6 items-center justify-center z-10"
                    aria-hidden="true"
                  >
                    <ChevronRight size={20} style={{ color: 'var(--accent)' }} />
                  </div>
                )}
                <div
                  className="p-8 bg-white h-full flex flex-col"
                  style={{
                    border: '1px solid var(--border)',
                    borderLeft: i === 0 ? '4px solid var(--accent)' : '1px solid var(--border)',
                    marginLeft: i === 0 ? 0 : '-1px',
                  }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0"
                      style={{ background: 'var(--accent)', color: 'var(--navy)' }}
                    >
                      {num}
                    </span>
                    <div
                      className="w-10 h-10 flex items-center justify-center"
                      style={{ background: 'rgba(11,10,63,0.05)' }}
                    >
                      <Icon aria-hidden="true" size={20} style={{ color: 'var(--navy)' }} />
                    </div>
                  </div>
                  <p className="font-display font-bold text-lg mb-3" style={{ color: 'var(--navy)' }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* AI 助手預告 */}
          <div
            className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 bg-white"
            style={{ border: '2px dashed var(--accent)', borderRadius: 0 }}
          >
            <div
              className="shrink-0 w-14 h-14 flex items-center justify-center"
              style={{ background: 'rgba(232,144,39,0.08)', border: '1px solid rgba(232,144,39,0.25)' }}
            >
              <Bot aria-hidden="true" size={28} style={{ color: 'var(--accent)' }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <p className="font-display font-bold text-xl" style={{ color: 'var(--navy)' }}>
                  AI 智慧文獻助手
                </p>
                <span
                  className="text-[10px] font-bold tracking-widest uppercase px-2 py-1"
                  style={{ background: 'var(--accent)', color: 'var(--navy)' }}
                >
                  即將推出
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                同樣的三步驟流程——上傳、整理、交付——未來將由 AI 在線上自動完成。
                上傳 PDF 後即時生成速讀報告，支援自然語言提問與語意搜尋，大幅降低文獻管理的時間成本。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 學術倫理聲明 ──────────────────────────────────────── */}
      <section style={{ background: 'var(--surface)' }}>
        <div className={`${inner} py-10`}>
          <div
            className="flex items-start gap-5 p-6"
            style={{ borderLeft: '4px solid var(--accent)', background: 'var(--cream)' }}
          >
            <Shield aria-hidden="true" size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p className="font-semibold text-sm mb-1.5" style={{ color: 'var(--navy)' }}>
                學術倫理聲明
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                我們堅守學術誠信，<strong style={{ color: 'var(--navy)' }}>絕不提供任何形式的代寫服務</strong>。
                我們的角色是「研究教練」——協助你梳理架構、強化邏輯、理解文獻，
                但每一個論點、每一段文字，都必須出自你本人。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <FaqSection items={[
        { q: '論文顧問可以協助什麼？', a: '論文顧問可協助研究主題聚焦、章節架構規劃、文獻整理、研究設計、寫作邏輯與修改方向。也可以提供後續投遞期刊的方向建議，從撰寫到發表提供全流程支援。' },
        { q: '如果是第一次寫論文，也適合找論文顧問嗎？', a: '很適合。第一次接觸論文寫作的學生，通常更需要有人協助建立研究與寫作的基本架構。我們的顧問會從基礎開始引導，讓你在過程中真正學會如何做研究、寫論文。' },
        { q: '論文顧問服務適合哪些人？', a: '適合大學生、研究生、博士生，以及需要在國際期刊發表論文的學術研究者。無論是第一次投稿，還是已被拒稿需要重修，我們都能提供針對性的指導。' },
        { q: '如果論文被退稿，你們能協助重投嗎？', a: '可以。這是我們最常見的服務之一。我們會仔細分析審稿意見，協助你針對性地修改論文，撰寫有力的 Rebuttal Letter，提升重投後被接受的機率。' },
        { q: '服務有保密協議嗎？', a: '有。我們對所有客戶的研究內容、投稿目標與合作細節嚴格保密，絕不對外揭露，請放心諮詢。' },
        { q: '費用如何計算？', a: '依論文類型、字數、服務項目（審閱、修改、翻譯、回覆審稿意見等）進行客製化報價。請加入 LINE 說明你的研究狀況，我們將提供免費的初步諮詢。' },
      ]} />

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)' }}>
        <div className={`${inner} py-20 text-center`}>
          <SectionLabel>開始合作</SectionLabel>
          <h2
            className="font-display font-bold text-3xl md:text-4xl mb-4"
            style={{ color: 'var(--navy)' }}
          >
            準備好提升發表成功率了嗎？
          </h2>
          <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
            費用依需求客製，加入 LINE 說明你的研究方向與目前遇到的困難，顧問將為你規劃最合適的方案。
          </p>
          <a
            href="https://lin.ee/6uAXvJu"
            className="hero-cta-primary inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wide"
          >
            加入 LINE 諮詢
            <ChevronRight aria-hidden="true" size={16} />
          </a>
        </div>
      </section>

    </div>
  );
}
