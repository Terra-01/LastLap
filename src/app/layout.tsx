import type { Metadata } from "next";
import { Funnel_Display, Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { site, siteUrl } from "@/lib/content";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const title = "LastLap · Sim Racing Lounge & Cafe in Bengaluru";
const description =
  "Professional racing simulators and a serious cafe, opening in Brookfield, Bengaluru on 1 July 2026. No license, no deposit. Join the waitlist for 25% off your first race.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s · LastLap" },
  description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  // og:image and the Twitter image come from app/opengraph-image.tsx.
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${funnelDisplay.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
