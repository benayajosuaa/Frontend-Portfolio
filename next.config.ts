import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'rwgzfgeeghqeufknekru.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Izinkan localhost untuk development
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Bypass localhost restriction untuk development
  experimental: {
    allowedRevalidateHeaderKeys: [],
  },
};

export default nextConfig;