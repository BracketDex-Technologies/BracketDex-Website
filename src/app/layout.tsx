import type { Metadata } from "next";
import { Geist } from "next/font/google";

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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.variable}>{children}</body>
    </html>
  );
}

