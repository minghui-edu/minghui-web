import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MessageCircle } from 'lucide-react';

const tutors: Record<string, {
  name: string;
  title: string;
  tags: string[];
  intro: string;
  exp: string;
  philosophy: string;
}> = {
  jason: {
    name: '王老師 (Jason)',
    title: 'Stanford University 電機碩士',
    tags: ['留學申請輔導', 'SOP撰寫', 'TOEFL/GRE'],
    intro: '我擅長引導學生發掘自身優勢，並將其轉化為具備說服力的申請文件。上課氛圍輕鬆但邏輯嚴密，透過不斷的提問與討論，確保每一堂課都有實質產出。',
    exp: '曾任矽谷頂尖科技公司工程師，具備 5 年留學代辦與家教經驗。過去三年內，輔導超過 20 位學生成功申請上 Stanford, MIT, CMU 等頂尖學府的碩博士班。',
    philosophy: '我認為「申請」不只是單純的包裝，而是一個重新認識自己、釐清職涯目標的過程。我會陪著學生一起梳理過去的經歷，找出最閃亮的珍珠，串成獨一無二的專屬故事。',
  },
  sarah: {
    name: '林老師 (Sarah)',
    title: 'Cambridge University 生物博士',
    tags: ['IB/AP 生物', '英國大學申請', '面試輔導'],
    intro: '以啟發式教學為主，跳脫傳統的背誦框架。我會透過實際生活案例與最新權威期刊論文，帶領學生探討科學本質，讓高中生物變得生動且靈活運用。',
    exp: '擁有劍橋大學入學面試官的相關訓練經驗，熟知英國教育體制與入學門檻。已輔導多名高中生順利進入牛津、劍橋與帝國理工學院等 G5 名校。',
    philosophy: '真正的學習發生在學生提出好問題的那個時刻。比起直接給予正確答案，我更傾向帶領學生一步步推導過程，建立他們堅實且獨立的科學思考邏輯。',
  },
  kevin: {
    name: '陳老師 (Kevin)',
    title: '台大資工系學士 / 競賽保送生',
    tags: ['APCS 檢定', 'C++/Python', '演算法競賽'],
    intro: '程式碼的背後是嚴謹的邏輯與數學。上課時我會從最底層的運算邏輯教起，搭配大量的上機實作與觀念刻意練習，幫助學生突破思考盲點。',
    exp: '曾獲全國資訊學科能力競賽一等獎，目前擔任多所知名高中資訊社團的指導老師。累積輔導超過 50 名學生取得 APCS 實作四級分以上的優異成績。',
    philosophy: '寫程式從來就不該是複製貼上，而是理解每一個指令背後的意義與效能。我希望能培養出能獨立解決問題、並享受 Coding 樂趣的學生。',
  },
};

export async function generateStaticParams() {
  return Object.keys(tutors).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const tutor = tutors[id];
  if (!tutor) return {};
  return {
    title: `${tutor.name} — 師資介紹`,
    description: tutor.intro.slice(0, 100),
  };
}

const tabs = [
  { key: 'intro', label: '簡介與教學方式' },
  { key: 'exp', label: '經歷與教學成果' },
  { key: 'philosophy', label: '特色與教學理念' },
] as const;

export default async function TutorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tutor = tutors[id];

  if (!tutor) notFound();

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <Link
        href="/tutor"
        className="flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> 返回師資列表
      </Link>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
        {/* 頭部資訊 */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-100">
          <div className="flex items-center">
            <div className="w-24 h-24 bg-slate-200 rounded-full mr-6 flex items-center justify-center text-slate-400 shrink-0 shadow-inner">
              照片
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{tutor.name}</h1>
              <p className="text-lg text-blue-600 font-medium mb-3">{tutor.title}</p>
              <div className="flex flex-wrap gap-2">
                {tutor.tags.map((tag, i) => (
                  <span key={i} className="bg-slate-100 text-slate-600 text-sm px-3 py-1 rounded-md">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <a
            href="https://line.me/R/ti/p/@minghui_official"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-8 py-4 bg-[#00B900] hover:bg-[#009900] text-white font-bold rounded-xl shadow-md flex items-center justify-center transition-transform hover:-translate-y-1"
          >
            <MessageCircle className="w-5 h-5 mr-2" /> 透過官方 LINE 預約
          </a>
        </div>

        {/* 詳細介紹 */}
        <div className="space-y-8">
          {tabs.map((tab) => (
            <div key={tab.key}>
              <h2 className="text-lg font-bold text-slate-700 mb-3 border-l-4 border-blue-500 pl-3">{tab.label}</h2>
              <p className="text-slate-600 leading-relaxed">{tutor[tab.key]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
