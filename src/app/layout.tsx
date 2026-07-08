import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { AgentationToolbar } from "@/components/dev/agentation-toolbar";
import { SiteLoader } from "@/components/marketing/site-loader";
import { SITE_LOADER_SESSION_KEY } from "@/components/marketing/site-loader-config";
import { ProgressiveTextReveal } from "@/components/motion-primitives/progressive-text-reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const pally = localFont({
  src: "../assets/fonts/Pally-Variable.woff2",
  variable: "--font-pally",
  display: "swap",
});

const khand = localFont({
  src: "../assets/fonts/Khand-Regular.woff2",
  variable: "--font-khand",
  display: "swap",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${pally.variable} ${khand.variable}`}>
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
        {children}
        <AgentationToolbar />
      </body>
    </html>
  );
}
