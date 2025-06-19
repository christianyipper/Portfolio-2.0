import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // 👈 required for static export in Next.js 13+ (comment out when running development server)
  trailingSlash: true, // 👈 optional but helpful for routing on shared hosts
};

export default nextConfig;
