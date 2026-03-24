import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Users, GraduationCap, MessageCircle, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '專業家教',
  description: '零抽成、透明化的優質家教平台，專注於國外升學輔導與留學諮詢。',
};

const tutors = [
  {
    id: 'jason',
    name: '王老師 (Jason)',
    title: 'Stanford University 電機碩士',
    tags: ['留學申請輔導', 'SOP撰寫', 'TOEFL/GRE'],
    shortExp: '協助 20+ 學生錄取美國 Top 30 名校。',
  },
  {
    id: 'sarah',
    name: '林老師 (Sarah)',
    title: 'Cambridge University 生物博士',
    tags: ['IB/AP 生物', '英國大學申請', '面試輔導'],
    shortExp: '專精英國 G5 大學申請與全英面試特訓。',
  },
  {
    id: 'kevin',
    name: '陳老師 (Kevin)',
    title: '台大資工系學士 / 競賽保送生',
    tags: ['APCS 檢定', 'C++/Python', '演算法競賽'],
    shortExp: '帶領多位高中生於資訊學科能力競賽獲獎。',
  },
];

export default function TutorPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">專業家教媒合平台</h1>
        <p className="text-slate-600">專注於國外升學與專業科目的頂尖師資</p>
      </div>

      {/* 特色說明 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center mb-4">
            <ShieldCheck aria-hidden="true" className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-slate-800">嚴格把關，保證品質</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            與一般市面上的家教平台不同，我們不接受隨意刊登。平台上的每一位老師都必須經過官方的嚴格查核，確認其學歷真偽，並評估其實際教學能力。
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center mb-4">
            <Users aria-hidden="true" className="w-8 h-8 text-emerald-600 mr-3" />
            <h2 className="text-2xl font-bold text-slate-800">創造雙贏的收費機制</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            平台在日後的家教費上<strong>絕不抽成</strong>，僅在媒合成功時收取一次性的合理媒合費。讓老師獲得完整報酬，家長享受高性價比的教學服務。
          </p>
        </div>
      </div>

      {/* 媒合流程 */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-16 border border-blue-100">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">半人工精緻媒合流程</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { step: '1', title: '老師填表申請', desc: '老師線上填寫表單並上傳履歷，由我們把關師資品質。', color: 'bg-blue-600 text-white' },
            { step: '2', title: '人工上架曝光', desc: '審核通過後，由官方人工上架履歷至網站，供學生瀏覽。', color: 'bg-blue-600 text-white' },
            { step: '3', title: 'LINE 官方預約', desc: '學生透過 LINE 提出需求，由官方協助聯繫與確認意願。', color: 'bg-yellow-400 text-blue-900' },
            { step: '4', title: '媒合成功收費', desc: '向老師收取媒合費後，提供雙方聯絡方式開始試教。', color: 'bg-emerald-500 text-white' },
          ].map((item) => (
            <div key={item.step} className="bg-white p-6 rounded-2xl shadow-sm text-center relative mt-4">
              <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center font-bold absolute -top-5 left-1/2 -translate-x-1/2 border-4 border-blue-50`}>
                {item.step}
              </div>
              <h3 className="font-bold text-base mt-2 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <a
            href="#"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-md flex items-center transition-transform motion-reduce:transition-none hover:-translate-y-1 motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-50"
          >
            <GraduationCap aria-hidden="true" className="mr-2" /> 老師填寫履歷表單
          </a>
        </div>
      </div>

      {/* 師資列表 */}
      <h2 className="text-2xl font-bold mb-6 text-slate-800">最新精選師資（國外升學專區）</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.map((tutor) => (
          <Link
            key={tutor.id}
            href={`/tutor/${tutor.id}`}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow group flex flex-col h-full hover:-translate-y-1 motion-reduce:hover:translate-y-0 transition-transform motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-slate-200 rounded-full mr-4 flex items-center justify-center text-slate-400 group-hover:ring-4 ring-blue-50 transition-all shrink-0">
                頭像
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">{tutor.name}</h3>
                <p className="text-sm text-blue-600">{tutor.title}</p>
              </div>
            </div>
            <div className="mb-6 text-sm text-slate-600 flex-grow">
              <p className="mb-2"><strong>專長：</strong>{tutor.tags.join('、')}</p>
              <p><strong>經歷：</strong>{tutor.shortExp}</p>
            </div>
            <div className="w-full py-3 bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 font-medium rounded-xl transition-colors flex items-center justify-center mt-auto">
              查看詳細介紹 <ChevronRight aria-hidden="true" className="w-4 h-4 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
