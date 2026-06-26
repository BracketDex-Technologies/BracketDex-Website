import type { Metadata } from "next";

import { marketingContent } from "@/content/marketing";
import { HomePage } from "@/components/home/home-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/");

export default function Home() {
  return <HomePage content={marketingContent} />;
}
