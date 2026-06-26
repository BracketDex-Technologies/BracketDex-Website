import type { Metadata } from "next";

import { StaticMarketingPage } from "@/components/pages/static-marketing-page";
import { pageContent } from "@/content/pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/about");

export default function AboutPage() {
  return <StaticMarketingPage content={pageContent.about} path="/about" />;
}
