import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // non-www → www（統一域名，修正重複索引）
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'minghuiedu.com' }],
        destination: 'https://www.minghuiedu.com/:path*',
        permanent: true,
      },
      // 舊網站中文路徑 → 新路由
      { source: '/科系探索活動', destination: '/exploration', permanent: true },
      { source: '/科系探索活動/', destination: '/exploration', permanent: true },
      { source: '/科系探索領袖營', destination: '/exploration', permanent: true },
      { source: '/科系探索領袖營/', destination: '/exploration', permanent: true },
      // 舊版 tutor UUID 路徑 → 師資列表
      {
        source: '/tutor/de989ab8-d714-4812-aa63-2eae26f3b6e3',
        destination: '/tutor',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'cdn2.ettoday.net' },
    ],
  },
  transpilePackages: ['next-sanity'],
};

export default nextConfig;
