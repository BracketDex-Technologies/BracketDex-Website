import type { Metadata, Viewport } from "next";

import { marketingContent } from "@/content/marketing";
import { HomePage } from "@/components/home/home-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/");

export const viewport: Viewport = {
  colorScheme: "only light",
};

export default function Home() {
  return <HomePage content={marketingContent} />;
}
