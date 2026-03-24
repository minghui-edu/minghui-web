import type { Metadata } from 'next';
import { Libre_Baskerville, Outfit } from 'next/font/google';
import './globals.css';

const baskerville = Libre_Baskerville({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-baskerville',
  display: 'swap',
});

const outfit = Outfit({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | 明慧教育',
    default: '明慧教育 — 啟發潛能，探索無限未來',
  },
  description: '明慧教育提供科系探索營隊、海外名校遊學、專業家教媒合、高分筆記與論文顧問服務，幫助學生找到未來的方向。',
  keywords: ['明慧教育', '科系探索', '海外遊學', '家教媒合', '高分筆記', '論文顧問'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className={`${baskerville.variable} ${outfit.variable}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg"
          style={{ color: 'var(--navy)' }}
        >
          跳至主要內容
        </a>
        {children}
      </body>
    </html>
  );
}
