import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "via.placeholder.com",
      "raw.githubusercontent.com",
      "cdn.jsdelivr.net",
    ],
  },
};

export default nextConfig;
