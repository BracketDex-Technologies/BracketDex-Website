import { notFound } from "next/navigation";
import { routedPages } from "@/content/routed-pages";
import { StaticMarketingPage } from "@/components/pages/static-marketing-page";
import { buildPageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(routedPages).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!Object.hasOwn(routedPages, slug)) notFound();
  return buildPageMetadata(`/${slug}`);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!Object.hasOwn(routedPages, slug)) notFound();
  return <StaticMarketingPage content={routedPages[slug]} path={`/${slug}`} />;
}
