import type { NextConfig } from "next";

const serverOrigin = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/api$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${serverOrigin}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
