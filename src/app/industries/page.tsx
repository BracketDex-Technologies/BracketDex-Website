import type { Metadata } from "next";

import { StaticMarketingPage } from "@/components/pages/static-marketing-page";
import { pageContent } from "@/content/pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/industries");

export default function IndustriesPage() {
  return <StaticMarketingPage content={pageContent.industries} path="/industries" />;
}
