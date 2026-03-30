import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'minghuiedu.com' }],
        destination: 'https://www.minghuiedu.com/:path*',
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
