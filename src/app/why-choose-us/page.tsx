import type { Metadata } from "next";

import { StaticMarketingPage } from "@/components/pages/static-marketing-page";
import { pageContent } from "@/content/pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/why-choose-us");

export default function WhyChooseUsPage() {
  return <StaticMarketingPage content={pageContent.whyChooseUs} path="/why-choose-us" />;
}
