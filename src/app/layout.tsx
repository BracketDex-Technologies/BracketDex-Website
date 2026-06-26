import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.variable}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {children}
      </body>
    </html>
  );
}
