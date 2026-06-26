import type { Metadata } from "next";

import { StaticMarketingPage } from "@/components/pages/static-marketing-page";
import { pageContent } from "@/content/pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/services");

export default function ServicesPage() {
  return <StaticMarketingPage content={pageContent.services} path="/services" />;
}
