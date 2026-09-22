import Link from "next/link";

import type { MarketingContent } from "@/content/marketing";
import { Footer } from "@/components/marketing/footer";
import { Navbar } from "@/components/marketing/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo";
import { HeroConstellation } from "./hero-constellation";
import { PostHeroHome } from "./post-hero/post-hero-home";

type HomePageProps = {
  content: MarketingContent;
};

export const HOMEPAGE_HERO_PLACEMENT = "centered";

function renderHeadline(text: string, accent: string) {
  const index = accent ? text.indexOf(accent) : -1;

  if (index === -1) {
    return text;
  }

  return (
    <>
      {text.slice(0, index)}
      <span className="bd-hero-accent">{accent}</span>
      {text.slice(index + accent.length)}
    </>
  );
}

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
        <div aria-hidden="true" className="bd-hero-bg-slot">
          <HeroConstellation />
        </div>

        <section className="content-shell bd-hero-layout">
          <div className="bd-hero-copy">
            <p className="bd-hero-eyebrow">{hero.eyebrow}</p>
            <h1 className="bd-hero-title">{renderHeadline(hero.headline, hero.headlineAccent)}</h1>
            <p className="bd-hero-subtitle">{hero.subheadline}</p>
            <div className="bd-hero-actions">
              <Link className="bd-hero-primary-cta" href="/contact">
                {hero.primaryCta}
              </Link>
              <Link className="bd-hero-secondary-cta" href="/services">
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
