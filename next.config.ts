import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "dukaan.b-cdn.net", // Add your image domain(s) here
      // ... other domains if needed
    ],
  },
};

export default nextConfig;
