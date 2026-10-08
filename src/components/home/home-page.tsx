import Link from "next/link";
import { Fragment } from "react";
import { siteNavigation } from "@/content/site-navigation";
import { ScrollChoreography } from "@/components/motion/scroll-choreography";

import type { MarketingContent } from "@/content/marketing";
import { Footer } from "@/components/marketing/footer";
import { Navbar } from "@/components/marketing/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { EditorialMotion } from "./editorial-motion";
import { StructureFlow } from "./structure-flow";
import { PostHeroHome } from "./post-hero/post-hero-home";

type HomePageProps = {
  content: MarketingContent;
};

export const HOMEPAGE_HERO_PLACEMENT = "split";

function renderWords(text: string) {
  return text.split(" ").filter(Boolean).map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      <span className="bd-hero-word-mask"><span className="bd-hero-word">{word}</span></span>{" "}
    </Fragment>
  ));
}

function renderHeadline(text: string, accent: string) {
  const index = accent ? text.indexOf(accent) : -1;

  if (index === -1) {
    return renderWords(text);
  }

  return (
    <>
      {renderWords(text.slice(0, index))}
      <span className="bd-hero-accent">{renderWords(accent)}</span>
      {renderWords(text.slice(index + accent.length))}
    </>
  );
}

export function HomePage({ content }: HomePageProps) {
  const hero = content.homepage.hero;

  return (
    <main className="bd-landing min-h-screen" id="main-content" tabIndex={-1}>
      <JsonLd data={buildBreadcrumbJsonLd("/")} />
      <EditorialMotion />
      <ScrollChoreography />

      <Navbar
        activeHref="/"
        brandName={content.company.name}
        ctaHref="/contact"
        ctaLabel={hero.primaryCta}
        items={siteNavigation}
        transparentOnHero
      />

      <div className="bd-hero">
        <div aria-hidden="true" className="bd-hero-bg-slot">
          <div className="bd-editorial-grid" />
        </div>

        <section className="content-shell bd-hero-layout">
          <div className="bd-hero-copy">
            <h1 className="bd-hero-title" aria-label={hero.headline}>
              <span aria-hidden="true">{renderHeadline(hero.headline, hero.headlineAccent)}</span>
            </h1>
            <p className="bd-hero-subtitle">{hero.subheadline}</p>
            <div className="bd-hero-actions">
              <Link className="bd-hero-primary-cta" href="/contact">
                {hero.primaryCta} <span aria-hidden="true">↗</span>
              </Link>
              <Link className="bd-hero-secondary-cta" href="#services">
                {hero.secondaryCta}
              </Link>
            </div>
          </div>
          <StructureFlow />
        </section>
      </div>

      <PostHeroHome content={content} />

      <Footer
        brandName={content.company.name}
        description={content.company.footerDescription}
        navigation={siteNavigation}
      />
    </main>
  );
}
