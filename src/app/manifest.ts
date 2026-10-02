import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "لیوشا",
    short_name: "Liosha",
    description: "سیستم‌عامل ساخت، آموزش و نمایش کسب‌وکار",
    start_url: `${base}/`,
    scope: `${base}/`,
    display: "standalone",
    orientation: "portrait",
    dir: "rtl",
    lang: "fa",
    background_color: "#120f2a",
    theme_color: "#4f46e5",
    icons: [
      { src: `${base}/icon.svg`, sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: `${base}/icon-192.png`, sizes: "192x192", type: "image/png", purpose: "any" },
      { src: `${base}/icon-512.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
