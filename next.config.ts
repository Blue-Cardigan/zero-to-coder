import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    PROJECT_URL: process.env.PROJECT_URL,
    ANON_KEY: process.env.ANON_KEY,
  },
};

export default nextConfig;
