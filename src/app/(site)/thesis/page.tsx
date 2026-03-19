import type { Metadata } from 'next';
import { CheckCircle, Target, FileText, Cpu, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: '論文顧問',
  description: '專業學術研究指導，提供期刊發表顧問、文獻速讀導讀與 AI 文獻助手服務。',
};

export default function ThesisPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">學術研究與論文顧問</h1>
        <div className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed bg-yellow-50 p-4 rounded-xl border border-yellow-100">
          <strong>【學術倫理聲明】</strong>我們堅守學術倫理，<strong>絕不提供任何形式的代寫服務</strong>。
          我們的目標是擔任您研究路上的「學術教練」，提供專業的方法論指導與文獻導讀，助您突破研究瓶頸，產出真正屬於您的學術著作。
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* 期刊發表顧問 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <Target className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">期刊發表顧問</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6 min-h-24">
            針對準備投稿國內外學術期刊的學者與研究生，提供一對一的論文健檢。我們專注於「研究邏輯梳理」、「論述架構優化」與「審查意見回覆策略指導」。
          </p>
          <ul className="space-y-3">
            <li className="flex items-start text-sm text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" /> 研究假說與架構驗證</li>
            <li className="flex items-start text-sm text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" /> 格式與寫作邏輯潤飾指導</li>
            <li className="flex items-start text-sm text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" /> 投稿期刊落點分析與建議</li>
          </ul>
        </div>

        {/* 文獻速讀 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">系統化文獻速讀導讀</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6 min-h-24">
            面對海量外文文獻不知從何下手？顧問將帶您建立「文獻矩陣」，教學如何快速萃取核心變數、研究方法與結論，精準找出研究缺口。
          </p>
          <ul className="space-y-3">
            <li className="flex items-start text-sm text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" /> 系統性文獻回顧教學</li>
            <li className="flex items-start text-sm text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" /> 核心論文深度導讀與探討</li>
            <li className="flex items-start text-sm text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" /> 提升學術英文閱讀與解構能力</li>
          </ul>
        </div>

        {/* AI 文獻助手 */}
        <div className="bg-slate-900 p-8 rounded-2xl shadow-md relative overflow-hidden">
          <span className="absolute top-4 right-4 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 rounded">即將推出</span>
          <div className="w-14 h-14 bg-slate-800 text-yellow-400 rounded-2xl flex items-center justify-center mb-6 border border-slate-700">
            <Cpu className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white mb-4">AI 智慧文獻助手</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 min-h-24">
            專為研究者打造的 AI 輔助工具。未來只需上傳 PDF，系統將自動提取摘要，並允許您透過自然語言對個人文獻庫進行「語意搜尋」，大幅降低文獻管理的時間成本。
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start text-sm text-slate-300"><Lightbulb className="w-4 h-4 text-yellow-500 mr-2 shrink-0 mt-0.5" /> AI 自動摘要與關鍵字提取</li>
            <li className="flex items-start text-sm text-slate-300"><Lightbulb className="w-4 h-4 text-yellow-500 mr-2 shrink-0 mt-0.5" /> 個人化文獻庫自然語言問答</li>
            <li className="flex items-start text-sm text-slate-300"><Lightbulb className="w-4 h-4 text-yellow-500 mr-2 shrink-0 mt-0.5" /> 視覺化文獻關聯圖譜生成</li>
          </ul>
          <button className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 text-sm font-medium py-3 rounded-lg transition-colors">
            訂閱開發進度通知
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between border border-blue-100 shadow-sm gap-6">
        <div>
          <h3 className="text-xl font-bold text-blue-900 mb-2">需要量身定制的學術建議嗎？</h3>
          <p className="text-slate-600 text-sm max-w-xl leading-relaxed">
            預約 30 分鐘初步線上諮詢，讓顧問了解您的研究方向與目前遇到的困難，為您規劃最合適的階段性指導方案。
          </p>
        </div>
        <a
          href="#"
          className="w-full md:w-auto whitespace-nowrap px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-transform hover:-translate-y-1"
        >
          預約初步諮詢
        </a>
      </div>
    </div>
  );
}
