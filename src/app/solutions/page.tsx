import type { Metadata } from "next";

import { StaticMarketingPage } from "@/components/pages/static-marketing-page";
import { pageContent } from "@/content/pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/solutions");

export default function SolutionsPage() {
  return <StaticMarketingPage content={pageContent.solutions} ctaHref="/contact" path="/solutions" />;
}
