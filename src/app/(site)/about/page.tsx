import type { Metadata } from 'next';
import { CheckCircle, History, Star, Users, Facebook, Instagram, Youtube, MessageCircle, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: '關於我們',
  description: '了解明慧教育的創辦理念、團隊背景與10年發展歷程。',
};

function SocialButton({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <a
      href="#"
      className={`${color} text-white flex items-center px-4 py-2 rounded-full hover:opacity-90 transition-opacity shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-50`}
    >
      <span aria-hidden="true" className="mr-2 w-5 h-5 flex items-center justify-center">{icon}</span>
      <span className="font-medium text-sm">{label}</span>
    </a>
  );
}

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">關於明慧</h1>
        <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
        <div>
          <div className="bg-slate-200 aspect-video md:aspect-[4/3] rounded-2xl flex items-center justify-center overflow-hidden shadow-inner mb-6">
            <span className="text-slate-400 font-medium flex flex-col items-center">
              <Users aria-hidden="true" className="w-12 h-12 mb-2 opacity-50" />
              [創辦人及團隊照片]
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-blue-900">創辦人經歷與宗旨</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            明慧教育由台大校友創立。我們深知許多學生在求學階段對未來感到迷惘，因此致力於打造一個資源共享的平台。
            我們的宗旨是透過真實的體驗與專業的引導，打破資訊落差，讓每一位學生都能勇敢追尋自己的夢想。
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle aria-hidden="true" className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span className="text-slate-700">台大優質團隊背景</span>
            </li>
            <li className="flex items-start">
              <CheckCircle aria-hidden="true" className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span className="text-slate-700">超過 10 年教育創新經驗</span>
            </li>
            <li className="flex items-start">
              <CheckCircle aria-hidden="true" className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span className="text-slate-700">專注於實作與啟發的教學理念</span>
            </li>
          </ul>
        </div>

        {/* 里程碑 Timeline */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center mb-6">
            <History aria-hidden="true" className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-slate-800">我們的10年里程碑</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                label: '至今',
                desc: '籌備全新學習 APP，舉辦超過多屆探索營隊，影響數千名學子。',
                highlight: true,
              },
              {
                label: '發展期',
                desc: '推出「家教媒合平台」與「海外名校遊學」，打造升學一條龍服務。',
                highlight: false,
              },
              {
                label: '深耕期',
                desc: '擴展單一科系深度講座與專題實作，協助學生豐富學習歷程。',
                highlight: false,
              },
              {
                label: '創立初期',
                desc: '明慧教育團隊正式成立，舉辦第一屆台大科系探索營隊。',
                highlight: false,
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.highlight ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                  {item.highlight ? <Star aria-hidden="true" className="w-5 h-5" /> : <div className="w-3 h-3 bg-slate-400 rounded-full" />}
                </div>
                <div className={`flex-1 p-4 rounded-xl border ${item.highlight ? 'bg-blue-50 border-blue-100' : 'bg-white border-slate-100'}`}>
                  <h3 className={`font-bold mb-1 ${item.highlight ? 'text-blue-900 text-lg' : 'text-slate-800'}`}>{item.label}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold mb-6 text-slate-800">追蹤我們的社群，獲取最新教育資訊</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <SocialButton icon={<Facebook size={18} />} label="營隊 FB" color="bg-[#1877F2]" />
          <SocialButton icon={<Instagram size={18} />} label="官方 IG" color="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]" />
          <SocialButton icon={<MessageCircle size={18} />} label="LINE 官方" color="bg-[#00B900]" />
          <SocialButton icon={<Youtube size={18} />} label="YouTube" color="bg-[#FF0000]" />
          <SocialButton icon={<GraduationCap size={18} />} label="Go to NTU" color="bg-blue-800" />
        </div>
      </div>
    </div>
  );
}
