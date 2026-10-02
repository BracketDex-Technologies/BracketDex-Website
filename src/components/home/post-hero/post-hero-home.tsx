import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import type { MarketingContent } from "@/content/marketing";
import { FaqSection } from "@/components/marketing/faq-section";
import { CapabilityIndex } from "@/components/home/fresh/capability-index";
import { CloudPanel } from "@/components/home/fresh/cloud-panel";
import { ProblemSection } from "@/components/home/fresh/problem-section";
import { ProcessRail } from "@/components/home/fresh/process-rail";
import { ProjectsPlaceholder } from "@/components/home/fresh/projects-placeholder";
import { ServicesSection } from "@/components/home/fresh/services-section";
import { TrustStrip } from "@/components/home/fresh/trust-strip";
import { WhySection } from "@/components/home/fresh/why-section";
import { buildPostHeroContent } from "./post-hero-content";
import { PostHeroMotion } from "./post-hero-motion";

export const POST_HERO_DESIGN = "dark-systems-lab" as const;
export const POST_HERO_STARTS_AFTER_HERO = true as const;

export function PostHeroHome({ content }: { content: MarketingContent }) {
  const postHero = buildPostHeroContent(content);

  return (
    <div className="bd-post-hero" data-post-hero-design={POST_HERO_DESIGN}>
      <PostHeroMotion />
      <TrustStrip content={content} />
      <ProblemSection content={content} />
      <ServicesSection content={content} />

      <div className="bd-post-dark">
        <div className="content-shell">
          <CloudPanel content={content} />

          <ProcessRail content={content} />

          <CapabilityIndex content={content} />
        </div>
      </div>

      <WhySection content={content} />
      <ProjectsPlaceholder content={content} />

      <section className="bd-post-faq" aria-labelledby="post-faq-title">
        <div className="content-shell bd-post-faq__grid">
          <div>
            <p className="bd-post-kicker">FAQ</p>
            <h2 id="post-faq-title">Questions, answered clearly.</h2>
            <p>Direct answers based on documented BracketDex services and working style.</p>
          </div>
          <FaqSection defaultOpenFirst items={content.faqs} />
        </div>
      </section>

      <section className="bd-post-cta" aria-labelledby="post-cta-title">
        <div className="content-shell bd-post-cta__grid">
          <div>
            <p className="bd-post-kicker">Start a project</p>
            <h2 id="post-cta-title">{postHero.closingCta}</h2>
            <p>{content.company.shortDescription}</p>
          </div>
          <Link href="/contact">
            Book Consultation
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
