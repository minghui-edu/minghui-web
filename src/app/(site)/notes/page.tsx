import type { Metadata } from 'next';
import { Video, ShoppingBag, CheckCircle, ChevronRight, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
  title: '高分筆記',
  description: '嚴選台清交成筆記，結合觀念講解影片，高效提升學習成效。',
};

const notes = [
  { title: '高中物理總複習精華', price: 'NT$ 450', href: '#' },
  { title: '大一微積分考古題詳解', price: 'NT$ 380', href: '#' },
  { title: '雅思 IELTS 寫作高分模板', price: 'NT$ 500', href: '#' },
  { title: '生物重點圖解記憶法', price: 'NT$ 420', href: '#' },
];

export default function NotesPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">學霸筆記 & 教學資源</h1>
        <p className="text-slate-600">統整重點精華，搭配線上影片，學習事半功倍</p>
      </div>

      {/* YouTube 影片 */}
      <div className="mb-16">
        <div className="flex items-center mb-6">
          <Video className="w-6 h-6 text-red-600 mr-2" />
          <h2 className="text-2xl font-bold text-slate-800">學霸解題 YouTube 影片</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <a key={i} href="#" className="group cursor-pointer">
              <div className="bg-slate-800 aspect-video rounded-xl relative flex items-center justify-center overflow-hidden mb-3">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform z-10">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-white border-b-8 border-b-transparent ml-1" />
                </div>
                <div className="absolute inset-0 bg-slate-700 opacity-50" />
              </div>
              <h3 className="font-medium text-slate-800 line-clamp-2 group-hover:text-blue-600">
                【微積分基礎】學長帶你五分鐘搞懂極限與連續的概念（附筆記講義）
              </h3>
            </a>
          ))}
        </div>
        <div className="text-center mt-6">
          <a href="#" className="text-blue-600 font-medium hover:underline inline-flex items-center">
            前往 YouTube 頻道看更多 <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 筆記商城 */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-16">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center">
            <ShoppingBag className="w-6 h-6 text-orange-500 mr-2" />
            <h2 className="text-2xl font-bold text-slate-800">官方線上筆記商城</h2>
          </div>
          <div className="flex gap-2">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">官網專屬購物車</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">支援綠界收款</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {notes.map((item, i) => (
            <div key={i} className="border border-slate-100 rounded-xl p-4 hover:border-blue-300 transition-colors flex flex-col h-full">
              <div className="bg-slate-100 aspect-[3/4] rounded-lg mb-4 flex items-center justify-center">
                <span className="text-slate-400 text-sm">[筆記封面]</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2 flex-grow">{item.title}</h3>
              <div className="text-lg font-bold text-blue-600 mb-4">{item.price}</div>
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm py-2 rounded font-medium transition-colors">
                  查看詳情
                </button>
                <a
                  href={item.href}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded font-medium transition-colors flex items-center justify-center"
                >
                  立即購買
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* APP 預告 */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3">
            <span className="inline-block bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-sm">即將推出 Coming Soon</span>
            <h2 className="text-3xl font-bold mb-4">明慧專屬學習 APP</h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-6">
              我們正致力於將學霸筆記與教材數位化！未來透過專屬 APP，你可以將教材隨身攜帶，進行重點標記、觀看解題影片，結合強大的互動功能，隨時隨地高效學習。
            </p>
            <ul className="space-y-3 mb-8 text-blue-200">
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-yellow-400 mr-3" /> 隨身攜帶的高效數位化教材</li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-yellow-400 mr-3" /> 完美整合紙本筆記、題庫與影音資源</li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-yellow-400 mr-3" /> 智慧學習進度追蹤與弱點分析</li>
            </ul>
            <a
              href="#"
              className="inline-block bg-white text-blue-900 font-bold py-3 px-8 rounded-full shadow-md hover:bg-blue-50 transition-colors"
            >
              預約登記早鳥通知
            </a>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="w-56 h-[26rem] bg-slate-800 rounded-[3rem] border-[10px] border-slate-700 shadow-2xl flex items-center justify-center relative overflow-hidden">
              <Smartphone className="w-16 h-16 text-slate-600 opacity-40 absolute" />
              <div className="absolute inset-x-0 top-0 h-6 bg-slate-700 rounded-b-xl mx-12" />
              <p className="text-center text-slate-400 font-medium z-10 px-4">APP 開發中</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
