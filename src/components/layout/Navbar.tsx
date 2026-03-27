'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className="sticky top-0 z-50 bg-white transition-shadow duration-300"
      style={{ boxShadow: scrolled ? '0 1px 12px rgba(11,10,63,0.08)' : 'none' }}
    >
      {/* Gold top stripe */}
      <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, var(--navy) 0%, var(--accent) 50%, var(--navy) 100%)' }} />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="明慧教育 — 首頁"
          >
            <Image
              src="/logo.svg"
              alt="明慧教育 Logo"
              width={40}
              height={40}
              priority
              className="rounded-full transition-transform duration-200 group-hover:scale-110 motion-reduce:group-hover:scale-100"
            />
            <div>
              <span
                className="font-display font-bold text-lg leading-none tracking-wide"
                style={{ color: 'var(--navy)' }}
              >
                明慧教育
              </span>
              <span
                className="block text-[10px] tracking-[0.15em] uppercase font-sans font-medium"
                style={{ color: 'var(--accent)' }}
              >
                Minghui Education
              </span>
            </div>
          </Link>

          {/* 桌面版選單 */}
          <div className="hidden md:flex items-center">
            {navItems.map((item, idx) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-150"
                  style={{ color: active ? 'var(--navy)' : 'var(--muted)' }}
                >
                  {item.label}
                  <span
                    className="nav-underline absolute bottom-0 left-4 right-4 h-[2px] transition-transform duration-200 origin-left"
                    style={{
                      background: 'var(--accent)',
                      transform: active ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                    aria-hidden="true"
                  />
                  {idx < navItems.length - 1 && (
                    <span
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px]"
                      style={{ color: 'var(--border)' }}
                      aria-hidden="true"
                    >·</span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* 手機版漢堡按鈕 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label={mobileMenuOpen ? '關閉選單' : '開啟選單'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            style={{ color: 'var(--navy)', touchAction: 'manipulation' }}
          >
            {mobileMenuOpen
              ? <X aria-hidden="true" size={22} />
              : <Menu aria-hidden="true" size={22} />
            }
          </button>
        </div>
      </nav>

      {/* Bottom border */}
      <div style={{ height: '1px', background: 'var(--border-light, #EDE9E3)' }} />

      {/* 手機版選單 */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-6 py-4 text-base font-medium border-b transition-colors duration-150"
                style={{
                  borderColor: 'var(--border-light, #EDE9E3)',
                  color: active ? 'var(--navy)' : 'var(--muted)',
                  background: active ? 'var(--accent-dim)' : 'transparent',
                }}
              >
                {active && (
                  <span
                    className="w-[3px] h-4 rounded-full mr-3 shrink-0"
                    style={{ background: 'var(--accent)' }}
                    aria-hidden="true"
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
