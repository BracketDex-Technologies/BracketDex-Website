import Link from "next/link";

import type { MarketingContent } from "@/content/marketing";
import { Footer } from "@/components/marketing/footer";
import { Navbar } from "@/components/marketing/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo";
import { PostHeroHome } from "./post-hero/post-hero-home";

type HomePageProps = {
  content: MarketingContent;
};

export const HOMEPAGE_HERO_PLACEMENT = "centered";

export function HomePage({ content }: HomePageProps) {
  const hero = content.homepage.hero;

  return (
    <main className="bd-landing min-h-screen" id="main-content" tabIndex={-1}>
      <JsonLd data={buildBreadcrumbJsonLd("/")} />
      <JsonLd data={buildFaqJsonLd()} />

      <Navbar
        activeHref="/"
        brandName={content.company.name}
        ctaHref="/contact"
        ctaLabel={hero.primaryCta}
        items={content.navigation}
        transparentOnHero
      />

      <div className="bd-hero">
        <div aria-hidden="true" className="bd-hero-bg-slot" />

        <section className="content-shell bd-hero-layout">
          <div className="bd-hero-copy">
            <h1 className="bd-hero-title">{hero.headline}</h1>
            <p className="bd-hero-subtitle">{hero.subheadline}</p>
            <div className="bd-hero-actions">
              <Link className="bd-hero-primary-cta" href="/contact">
                {hero.primaryCta}
              </Link>
              <Link className="bd-hero-secondary-cta" href="/projects">
                {hero.secondaryCta}
              </Link>
            </div>
          </div>
        </section>
      </div>

      <PostHeroHome content={content} />

      <Footer
        brandName={content.company.name}
        description={content.company.footerDescription}
        navigation={content.navigation}
      />
    </main>
  );
}
