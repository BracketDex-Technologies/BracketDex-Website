import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { AgentationToolbar } from "@/components/dev/agentation-toolbar";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const pally = localFont({
  src: "../../docs/Pally_Complete/Fonts/WEB/fonts/Pally-Variable.woff2",
  variable: "--font-pally",
  display: "swap",
});

const khand = localFont({
  src: "../../docs/FontshareKit-2607000102/Khand/Fonts/WEB/fonts/Khand-Regular.woff2",
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
    <html lang="en">
      <body className={`${pally.variable} ${khand.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {children}
        <AgentationToolbar />
      </body>
    </html>
  );
}
