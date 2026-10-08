import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource-variable/manrope";
import "@fontsource-variable/fraunces/full.css";

import { AgentationToolbar } from "@/components/dev/agentation-toolbar";
import { SiteLoader } from "@/components/marketing/site-loader";
import { SITE_LOADER_SESSION_KEY } from "@/components/marketing/site-loader-config";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { ProgressiveTextReveal } from "@/components/motion-primitives/progressive-text-reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { ThemeHotkey } from "@/components/theme-hotkey";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import "./globals.css";
import "./editorial.css";
import "./scroll-pages.css";
import "./premium.css";
import "./typography.css";
import "./light-theme.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider>
          <ThemeToggle />
          <SmoothScroll root lerp={0.06} duration={1.6} wheelMultiplier={0.8} touch>
            <a className="skip-link" href="#main-content">
              Skip to main content
            </a>
            <JsonLd data={organizationJsonLd} />
            <JsonLd data={websiteJsonLd} />
            <script
              dangerouslySetInnerHTML={{
                __html: `try{if(window.sessionStorage.getItem("${SITE_LOADER_SESSION_KEY}")==="true"){document.documentElement.classList.add("bd-site-loader-skip")}}catch(e){}`,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `try{document.documentElement.classList.add("bd-progressive-text-active")}catch(e){}`,
              }}
            />
            <SiteLoader />
            <ProgressiveTextReveal />
            <ThemeHotkey />
            {children}
            <AgentationToolbar />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
