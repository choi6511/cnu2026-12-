import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  distDir: ".next-build",
  reactStrictMode: true,
  typedRoutes: true,
};

export default nextConfig;
