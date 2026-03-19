import type { Metadata } from 'next';
import { CheckCircle, Lightbulb, Award, Gamepad2, BookOpen, PlayCircle, Calendar, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '科系探索',
  description: '透過實作與參訪，提早認識大學科系，豐富學習歷程。',
};

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm text-center border border-slate-100">
      <div className="text-3xl font-black text-blue-600 mb-2">{number}</div>
      <div className="text-slate-500 text-sm font-medium">{label}</div>
    </div>
  );
}

function ActivityCard({ title, date, tags }: { title: string; date: string; tags: string[] }) {
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="w-full sm:w-2/5 bg-slate-200 min-h-[150px] flex items-center justify-center">
        <span className="text-slate-400 text-sm">[活動照片]</span>
      </div>
      <div className="w-full sm:w-3/5 p-6 flex flex-col justify-center">
        <div className="text-sm text-blue-600 font-semibold mb-1 flex items-center">
          <Calendar className="w-4 h-4 mr-1" /> {date}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <span key={i} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md">{tag}</span>
          ))}
        </div>
        <a href="#" className="text-blue-600 font-medium text-sm flex items-center mt-auto hover:underline">
          查看詳細簡章 <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
}

export default function ExplorationPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">科系探索活動</h1>
        <p className="text-slate-600">透過實作與參訪，提早認識大學科系，豐富學習歷程</p>
      </div>

      {/* 數據成效 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <StatCard number="10年" label="教育經驗" />
        <StatCard number="50+" label="舉辦梯次" />
        <StatCard number="2,000+" label="參與學生" />
        <StatCard number="15+" label="合作學系" />
      </div>

      {/* 兩大探索模式 */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-900">兩大探索模式，精準對接你的需求</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Lightbulb className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-slate-800">多元科系探索營 <span className="text-sm font-normal text-slate-500">（適合尚未定向）</span></h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              不限單一科系，透過跨領域的營隊活動，讓尚未決定類組的學生，體驗產品從設計、策略、製作到市場分析的多個面向，進而發掘自身興趣。
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-500 mr-2 shrink-0" />
                <span className="text-sm text-slate-700"><strong>科技黑客松實作：</strong> 完整體驗專案開發與跨領域團隊合作。</span>
              </li>
              <li className="flex items-start">
                <Gamepad2 className="w-5 h-5 text-blue-500 mr-2 shrink-0" />
                <span className="text-sm text-slate-700"><strong>校園實境解謎：</strong> 以有趣互動認識頂大校園，留下回憶並提升備考動機。</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-8 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-slate-800">單一科系深度講座 & 實作 <span className="text-sm font-normal text-slate-500">（適合已有目標）</span></h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              專為已經有心儀科系的學生設計。由專業師資與學長姐帶領，深入解析科系核心知識，並親手完成相關專屬的專題實作。
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-2 shrink-0" />
                <span className="text-sm text-slate-700"><strong>專題實作產出：</strong> 直接產出高品質成果，大幅為個人學習歷程加分。</span>
              </li>
              <li className="flex items-start">
                <BookOpen className="w-5 h-5 text-emerald-500 mr-2 shrink-0" />
                <span className="text-sm text-slate-700"><strong>科系真實樣貌：</strong> 破除網路迷思，提前具備該系所需的核心素養與視野。</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 影音與心得 */}
      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 mb-16 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">營隊花絮 & 學生心得</h2>
            <p className="text-slate-400">看看學長姐們在營隊中獲得了什麼啟發</p>
          </div>
          <a href="#" className="flex items-center text-yellow-400 hover:text-yellow-300 font-medium">
            前往 YouTube 觀看更多 <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: '2023 跨領域科技黑客松 精彩總回顧', type: '活動花絮' },
            { title: '「終於找到未來的方向了！」- 台大解謎營學員專訪', type: '心得採訪' },
            { title: '醫學系實作營：從專題實作看見醫學生的日常', type: '活動花絮' },
          ].map((video, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="bg-slate-800 aspect-video rounded-xl relative flex items-center justify-center overflow-hidden mb-3 border border-slate-700">
                <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:scale-110 group-hover:text-yellow-400 transition-all z-10" />
                <span className="absolute top-2 left-2 bg-blue-600 text-xs px-2 py-1 rounded text-white font-medium">{video.type}</span>
              </div>
              <h3 className="font-medium text-slate-200 line-clamp-2 group-hover:text-white">{video.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* 最新活動 */}
      <h2 className="text-2xl font-bold mb-6 text-slate-800">最新特色活動</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <ActivityCard
          title="醫學系探索營"
          date="2024 暑期梯次"
          tags={['解剖實作', 'PBL討論', '醫院參訪']}
        />
        <ActivityCard
          title="資工AI實作營"
          date="2024 暑期梯次"
          tags={['Python基礎', 'AI模型訓練', '專案發表']}
        />
      </div>

      {/* CTA */}
      <div className="bg-blue-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">準備好探索未來了嗎？</h2>
        <p className="mb-6 text-blue-200">名額有限，立即填寫報名表單卡位！</p>
        <a
          href="#"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1"
        >
          前往報名表單
        </a>
      </div>
    </div>
  );
}
