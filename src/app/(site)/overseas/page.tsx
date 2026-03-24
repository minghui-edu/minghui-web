'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';

export default function OverseasPage() {
  const [activeCountry, setActiveCountry] = useState<'japan' | 'australia'>('japan');

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">海外名校遊學</h1>
        <p className="text-slate-600">結合「學」與「玩」，預先體驗當地生活，一次探訪多間頂尖名校</p>
      </div>

      {/* 國家切換 Tab */}
      <div className="flex justify-center mb-12">
        <div className="bg-white p-1 rounded-full shadow-sm border border-slate-200 inline-flex" role="group" aria-label="選擇遊學國家">
          <button
            onClick={() => setActiveCountry('japan')}
            aria-pressed={activeCountry === 'japan'}
            className={`px-8 py-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ${
              activeCountry === 'japan' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            日本探索營
          </button>
          <button
            onClick={() => setActiveCountry('australia')}
            aria-pressed={activeCountry === 'australia'}
            className={`px-8 py-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ${
              activeCountry === 'australia' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            澳洲探索營
          </button>
        </div>
      </div>

      {/* 日本 */}
      {activeCountry === 'japan' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-200 rounded-2xl min-h-[300px] flex items-center justify-center">
            <span className="text-slate-500 flex flex-col items-center">
              <Globe aria-hidden="true" className="w-12 h-12 mb-2 opacity-50" />
              [日本活動照片]
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">東京頂尖學府參訪行程</h2>
            <p className="text-slate-600 mb-6">
              精選熱門留學城市，帶領學生一次走訪東京大學、早稻田大學、慶應義塾大學。不僅體驗日本文化，更邀請當地學長姐獨家分享網路上找不到的申請秘訣與獎學金資訊。
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex bg-white p-4 rounded-lg shadow-sm border border-slate-100 items-start gap-4">
                <div className="text-blue-600 font-bold shrink-0 w-16 text-center">
                  <div>特色 1</div>
                  <div className="text-xs font-normal text-slate-400">學與玩</div>
                </div>
                <p className="text-slate-700 text-sm">抵達東京，在地生活與文化深度體驗，在正式申請前預先感受留學日常。</p>
              </div>
              <div className="flex bg-white p-4 rounded-lg shadow-sm border border-slate-100 items-start gap-4">
                <div className="text-blue-600 font-bold shrink-0 w-16 text-center">
                  <div>特色 2</div>
                  <div className="text-xs font-normal text-slate-400">閉門分享</div>
                </div>
                <p className="text-slate-700 text-sm">東京大學學術參訪，學長姐閉門分享會（獨家申請秘訣與生活指南）。</p>
              </div>
            </div>
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md self-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              填寫日本遊學報名表單
            </a>
          </div>
        </div>
      )}

      {/* 澳洲 */}
      {activeCountry === 'australia' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-200 rounded-2xl min-h-[300px] flex items-center justify-center order-last lg:order-first">
            <span className="text-slate-500 flex flex-col items-center">
              <Globe aria-hidden="true" className="w-12 h-12 mb-2 opacity-50" />
              [澳洲活動照片]
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">澳洲八大名校深度探索</h2>
            <p className="text-slate-600 mb-6">
              走進南半球的學術殿堂，一次探訪雪梨大學、墨爾本大學等。完美結合英語沉浸式學習、生態探索與留學生真實生活體驗。
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex bg-white p-4 rounded-lg shadow-sm border border-slate-100 gap-4">
                <div className="text-emerald-600 font-bold shrink-0 w-20">學長姐導覽</div>
                <p className="text-slate-700 text-sm">獲取網路上難以找到的獨家學校資訊與留學生當地生活指南。</p>
              </div>
              <div className="flex bg-white p-4 rounded-lg shadow-sm border border-slate-100 gap-4">
                <div className="text-emerald-600 font-bold shrink-0 w-20">學玩結合</div>
                <p className="text-slate-700 text-sm">在正式決定留學前，全方位評估自己是否適應當地的生活與學習環境。</p>
              </div>
            </div>
            <a
              href="#"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-md self-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              填寫澳洲遊學報名表單
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
