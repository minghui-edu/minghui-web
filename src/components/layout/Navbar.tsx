'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Menu, X } from 'lucide-react';

const navItems = [
  { href: '/about', label: '關於我們' },
  { href: '/tutor', label: '專業家教' },
  { href: '/notes', label: '高分筆記' },
  { href: '/exploration', label: '科系探索' },
  { href: '/overseas', label: '海外遊學' },
  { href: '/thesis', label: '論文顧問' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <GraduationCap className="text-blue-900" size={24} />
            </div>
            <span className="font-bold text-xl tracking-wider text-blue-900">明慧教育</span>
          </Link>

          {/* 桌面版選單 */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* 手機版漢堡選單按鈕 */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-500 hover:text-slate-700 p-2"
              aria-label="開啟選單"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* 手機版選單 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-2 pt-2 pb-3 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-3 rounded-md text-base font-medium ${
                pathname === item.href
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
