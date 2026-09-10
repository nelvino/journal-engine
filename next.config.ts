import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  async redirects() {
    return [
      { source: '/journal', destination: '/journal/new', permanent: false },
      { source: '/settings', destination: '/you', permanent: false },
      { source: '/goals', destination: '/practice', permanent: false },
      { source: '/progress', destination: '/practice', permanent: false },
    ];
  },
};

export default nextConfig;
