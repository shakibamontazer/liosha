import type { Metadata, Viewport } from "next";
import { Almarai, Cairo, Vazirmatn } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazir",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const almarai = Almarai({
  subsets: ["arabic", "latin"],
  weight: ["400", "700", "800"],
  variable: "--font-almarai",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "کسب‌وکارساز هوشمند",
    template: "%s | کسب‌وکارساز هوشمند",
  },
  description:
    "سیستم‌عامل کسب‌وکار برای ساخت گام‌به‌گام، تولید محتوا، آموزش فروش و ویترین تبلیغاتی. پروتوتایپ تعاملی.",
  applicationName: "کسب‌وکارساز هوشمند",
  appleWebApp: {
    capable: true,
    title: "کسب‌وکارساز",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef0fb" },
    { media: "(prefers-color-scheme: dark)", color: "#120f2a" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={`${vazir.variable} ${cairo.variable} ${almarai.variable} h-full antialiased`}
    >
      <body className={`${vazir.className} min-h-full`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
