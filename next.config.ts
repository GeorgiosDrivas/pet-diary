import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Applies to all routes
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "unsafe-none", // Fixes COOP blocking issue
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
