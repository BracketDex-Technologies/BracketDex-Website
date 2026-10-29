import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Syne } from "next/font/google";
import localFont from "next/font/local";

import { AgentationToolbar } from "@/components/dev/agentation-toolbar";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { ProgressiveTextReveal } from "@/components/motion-primitives/progressive-text-reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import "./globals.css";
import "./editorial.css";
import "./scroll-pages.css";
import "./premium.css";
import "./typography.css";

const pontano = localFont({
  src: "../assets/fonts/pontano-sans/PontanoSans-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-body",
  weight: "300 700",
});

const stint = localFont({
  src: "../assets/fonts/stint-ultra-expanded/StintUltraExpanded-Regular.ttf",
  display: "swap",
  variable: "--font-display",
  weight: "400",
});

const instrumentSans = Instrument_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-hero-body",
  weight: "variable",
});

const syne = Syne({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-hero-display",
  weight: "variable",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "BracketDex Technologies | Engineering Solutions For Growing Businesses",
    template: "%s | BracketDex Technologies",
  },
  description: siteConfig.description,
  openGraph: {
    title: "BracketDex Technologies | Engineering Solutions For Growing Businesses",
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} brand image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BracketDex Technologies | Engineering Solutions For Growing Businesses",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className={`${pontano.variable} ${stint.variable} ${instrumentSans.variable} ${syne.variable}`}>
          <SmoothScroll root lerp={0.15} wheelMultiplier={1}>
            <a className="skip-link" href="#main-content">
              Skip to main content
            </a>
            <JsonLd data={organizationJsonLd} />
            <JsonLd data={websiteJsonLd} />
            <ProgressiveTextReveal />
            {children}
            <AgentationToolbar />
          </SmoothScroll>
      </body>
    </html>
  );
}
