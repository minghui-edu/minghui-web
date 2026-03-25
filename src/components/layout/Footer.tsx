import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, MessageCircle, Mail } from 'lucide-react';

const quickLinks = [
  { href: '/exploration', label: '科系探索營隊' },
  { href: '/overseas', label: '海外遊學參訪' },
  { href: '/tutor', label: '家教媒合平台' },
  { href: '/thesis', label: '論文與研究顧問' },
  { href: '/notes', label: '高分筆記商城' },
];

const socialLinks = [
  { href: 'https://www.facebook.com/delc2022', label: 'Facebook', icon: Facebook },
  { href: 'https://www.instagram.com/delc_2022', label: 'Instagram', icon: Instagram },
  { href: 'https://lin.ee/6uAXvJu', label: 'LINE', icon: MessageCircle },
  { href: 'https://www.youtube.com/@gotontu4507', label: 'YouTube', icon: Youtube },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', color: '#94A3B8' }}>
      {/* Gold top rule */}
      <div className="gold-rule" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.svg"
                alt="明慧教育 Logo"
                width={36}
                height={36}
                className="rounded-full shrink-0"
              />
              <div>
                <span
                  className="font-display font-bold text-lg leading-none block"
                  style={{ color: 'var(--accent-light)' }}
                >
                  明慧教育
                </span>
                <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(232,144,39,0.6)' }}>
                  Minghui Education
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: '#7A8FA8' }}>
              致力於提供最優質的科系探索、海外名校營隊與專業家教媒合服務，幫助學生找到未來的方向。
            </p>

            <div className="flex gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="footer-social w-9 h-9 flex items-center justify-center rounded"
                >
                  <Icon aria-hidden="true" size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="hidden md:block md:col-span-4">
            <h4
              className="text-xs font-semibold tracking-[0.12em] uppercase mb-5"
              style={{ color: 'var(--accent)' }}
            >
              服務項目
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="footer-link text-sm flex items-center gap-2">
                    <span className="footer-link-line" aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4
              className="text-xs font-semibold tracking-[0.12em] uppercase mb-5"
              style={{ color: 'var(--accent)' }}
            >
              合作聯繫
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: '#7A8FA8' }}>
              <li className="flex items-center gap-2">
                <Mail aria-hidden="true" size={14} className="shrink-0" style={{ color: 'var(--accent)', opacity: 0.7 }} />
                <a href="mailto:timy@minghuiedu.com" className="hover:text-white transition-colors duration-150">timy@minghuiedu.com</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle aria-hidden="true" size={14} className="shrink-0" style={{ color: 'var(--accent)', opacity: 0.7 }} />
                <span>@minghuiedu</span>
              </li>
              <li className="hidden md:block mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <a
                  href="mailto:timy@minghuiedu.com"
                  className="footer-cta block text-center text-xs font-semibold tracking-wider py-3 px-4"
                  style={{ letterSpacing: '0.08em' }}
                >
                  企業 / 學校 合作提案
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: '#4A5A6A' }}
        >
          <span>© {new Date().getFullYear()} 明慧教育. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <span className="w-4 h-px" style={{ background: 'var(--accent)', opacity: 0.4 }} aria-hidden="true" />
            <span style={{ color: 'rgba(232,144,39,0.5)' }}>啟發潛能，探索無限未來</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
