import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 1080, 1920],
    imageSizes: [32, 64, 128, 256],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
