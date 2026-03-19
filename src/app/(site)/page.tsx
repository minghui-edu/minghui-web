import Link from 'next/link';
import { MapPin, BookOpen, Users, ChevronRight } from 'lucide-react';

function ServiceCard({
  icon,
  title,
  desc,
  action,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  action: string;
  href: string;
}) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 flex flex-col h-full">
      <div className="mb-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-600 mb-8 flex-grow">{desc}</p>
      <Link
        href={href}
        className="text-blue-600 font-semibold flex items-center group mt-auto"
      >
        {action}
        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">啟發潛能，探索無限未來</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            我們提供最專業的科系探索營隊、海外名校參訪、頂尖家教媒合與學霸筆記，為您的升學之路保駕護航。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/exploration"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1"
            >
              探索主打營隊
            </Link>
            <Link
              href="/tutor"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-3 px-8 rounded-full backdrop-blur-sm transition-colors"
            >
              尋找專業家教
            </Link>
          </div>
        </div>
      </div>

      {/* 核心服務 */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">我們的核心服務</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<MapPin className="w-8 h-8 text-blue-600" />}
            title="熱門營隊活動"
            desc="國內外頂尖大學科系探索，豐富學習歷程，釐清未來志向。"
            action="查看梯次"
            href="/exploration"
          />
          <ServiceCard
            icon={<BookOpen className="w-8 h-8 text-yellow-500" />}
            title="學霸筆記商品"
            desc="嚴選台清交成筆記，結合觀念講解影片，高效提升學習成效。"
            action="前往選購"
            href="/notes"
          />
          <ServiceCard
            icon={<Users className="w-8 h-8 text-emerald-500" />}
            title="國外升學家教媒合"
            desc="零抽成、透明化的優質家教平台，專注於國外升學輔導與留學諮詢。"
            action="尋找老師"
            href="/tutor"
          />
        </div>
      </div>
    </div>
  );
}
