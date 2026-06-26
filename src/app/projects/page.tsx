import type { Metadata } from "next";

import { StaticMarketingPage } from "@/components/pages/static-marketing-page";
import { pageContent } from "@/content/pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/projects");

export default function ProjectsPage() {
  return <StaticMarketingPage content={pageContent.projects} path="/projects" />;
}
