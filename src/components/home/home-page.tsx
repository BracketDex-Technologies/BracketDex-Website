import type { MarketingContent } from "@/content/marketing";
import { siteNavigation } from "@/content/site-navigation";
import { Footer } from "@/components/marketing/footer";
import { Navbar } from "@/components/marketing/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { HomeHero } from "./home-hero";
import { PostHeroHome } from "./post-hero/post-hero-home";

type HomePageProps = { content: MarketingContent };

export const HOMEPAGE_HERO_PLACEMENT = "centered-over-media";

export function HomePage({ content }: HomePageProps) {
  const hero = content.homepage.hero;
  return (
    <main className="bd-landing min-h-screen" id="main-content" tabIndex={-1}>
      <JsonLd data={buildBreadcrumbJsonLd("/")} />
      <Navbar
        activeHref="/"
        brandName={content.company.name}
        ctaHref="/contact"
        ctaLabel={content.homepage.navigationCta}
        items={siteNavigation}
        transparentOnHero
      />
      <HomeHero hero={hero} />
      <PostHeroHome content={content} />
      <Footer brandName={content.company.name} description={content.company.footerDescription} navigation={siteNavigation} />
    </main>
  );
}
