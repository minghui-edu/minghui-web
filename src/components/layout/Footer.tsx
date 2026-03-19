import Link from 'next/link';
import { GraduationCap, Facebook, Instagram, Youtube, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 品牌介紹 */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center mr-2">
              <GraduationCap className="text-blue-900" size={20} />
            </div>
            <span className="font-bold text-lg text-white">明慧教育</span>
          </div>
          <p className="text-sm text-slate-400 mb-4 max-w-sm">
            致力於提供最優質的科系探索、海外名校營隊與專業家教媒合服務，幫助學生找到未來的方向。
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LINE" className="hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* 快速連結 */}
        <div>
          <h4 className="text-white font-semibold mb-4">快速連結</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/exploration" className="hover:text-white transition-colors">科系探索營隊</Link></li>
            <li><Link href="/overseas" className="hover:text-white transition-colors">海外遊學參訪</Link></li>
            <li><Link href="/tutor" className="hover:text-white transition-colors">家教媒合平台</Link></li>
            <li><Link href="/thesis" className="hover:text-white transition-colors">論文與研究顧問</Link></li>
            <li><Link href="/notes" className="hover:text-white transition-colors">高分筆記商城</Link></li>
          </ul>
        </div>

        {/* 合作聯繫 */}
        <div>
          <h4 className="text-white font-semibold mb-4">合作聯繫</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <Mail className="w-4 h-4 mr-2 shrink-0" />
              <span>contact@minghui.edu.tw</span>
            </li>
            <li className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-2 shrink-0" />
              <span>@minghui_official</span>
            </li>
            <li className="mt-4 pt-4 border-t border-slate-700">
              <a
                href="mailto:contact@minghui.edu.tw"
                className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm w-full text-center transition-colors"
              >
                企業/學校 合作提案
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} 明慧教育. All rights reserved.
      </div>
    </footer>
  );
}
