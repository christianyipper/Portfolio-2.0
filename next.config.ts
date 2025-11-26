import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 👈 required for static export in Next.js 13+ (comment out when running development server (npm run dev))
  trailingSlash: true, // 👈 optional but helpful for routing on shared hostsnpm run 
};

export default nextConfig;
