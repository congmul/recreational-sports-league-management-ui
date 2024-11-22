import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'recreationalsports.blob.core.windows.net',
        port: '',
        pathname: '/profileteamlogo/**',
      },
    ],
  },
};

export default nextConfig;
