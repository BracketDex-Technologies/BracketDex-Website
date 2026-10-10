import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import type { MarketingContent } from "@/content/marketing";
import { siteNavigation } from "@/content/site-navigation";
import { Footer } from "@/components/marketing/footer";
import { Navbar } from "@/components/marketing/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { HeroSystemIllustration } from "./hero-system-illustration";
import { PostHeroHome } from "./post-hero/post-hero-home";
import styles from "./home-hero.module.css";

type HomePageProps = { content: MarketingContent };

export const HOMEPAGE_HERO_PLACEMENT = "copy-before-illustration";

export function HomePage({ content }: HomePageProps) {
  const hero = content.homepage.hero;
  const opening = "AI that works";
  const hasOpening = hero.headline.startsWith(opening);

  return (
    <main className="bd-landing min-h-screen" id="main-content" tabIndex={-1}>
      <JsonLd data={buildBreadcrumbJsonLd("/")} />
      <Navbar
        activeHref="/"
        brandName={content.company.name}
        ctaHref="/contact"
        ctaLabel={hero.primaryCta}
        items={siteNavigation}
        transparentOnHero
      />
      <section aria-labelledby="home-hero-title" className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>{content.company.positioning}</p>
            <h1 className={styles.title} id="home-hero-title" aria-label={hero.headline}>
              {hasOpening ? <><span className={styles.display}>{opening}</span>{hero.headline.slice(opening.length)}</> : hero.headline}
            </h1>
            <p className={styles.subtitle}>{hero.subheadline}</p>
            <div className={styles.actions}>
              <Link className={styles.primaryCta} href="/contact">
                {hero.primaryCta}<ArrowUpRight aria-hidden="true" size={18} />
              </Link>
              <Link className={styles.secondaryCta} href="#services">
                {hero.secondaryCta}<ArrowDownRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
          <HeroSystemIllustration />
        </div>
        <div aria-hidden="true" className={styles.bottomRule} />
      </section>
      <PostHeroHome content={content} />
      <Footer brandName={content.company.name} description={content.company.footerDescription} navigation={siteNavigation} />
    </main>
  );
}
