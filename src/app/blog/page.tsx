import type { Metadata } from "next";

import { StaticMarketingPage } from "@/components/pages/static-marketing-page";
import { pageContent } from "@/content/pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/blog");

export default function BlogPage() {
  return <StaticMarketingPage content={pageContent.blog} path="/blog" />;
}
