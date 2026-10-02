import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  ...(basePath
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
