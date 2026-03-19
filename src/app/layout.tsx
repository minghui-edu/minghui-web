import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
