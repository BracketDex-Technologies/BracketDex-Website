import Link from "next/link";
import {
  ArrowRightIcon,
  Code2Icon,
  PackageCheckIcon,
  ShieldCheckIcon,
  WorkflowIcon,
} from "lucide-react";

import type { MarketingContent } from "@/content/marketing";
import { FaqSection } from "@/components/marketing/faq-section";
import { CloudPanel } from "@/components/home/fresh/cloud-panel";
import { ProblemSection } from "@/components/home/fresh/problem-section";
import { ProcessRail } from "@/components/home/fresh/process-rail";
import { ServicesSection } from "@/components/home/fresh/services-section";
import { TrustStrip } from "@/components/home/fresh/trust-strip";
import { buildPostHeroContent } from "./post-hero-content";
import { PostHeroMotion } from "./post-hero-motion";

export const POST_HERO_DESIGN = "dark-systems-lab" as const;
export const POST_HERO_STARTS_AFTER_HERO = true as const;

const proofIcons = [WorkflowIcon, Code2Icon, PackageCheckIcon, ShieldCheckIcon] as const;

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

          <section
            className="bd-capability-index"
            data-motion-section
            aria-labelledby="capabilities-title"
          >
            <div className="bd-section-heading">
              <p className="bd-post-kicker">Capability index</p>
              <h2 id="capabilities-title">Technology depth. Industry context.</h2>
            </div>
            <div className="bd-capability-index__grid">
              <div>
                <h3>Technologies</h3>
                {content.technologyStack.map((group) => (
                  <div className="bd-capability-row" key={group.category}>
                    <strong>{group.category}</strong>
                    <span>{group.items.join(" · ")}</span>
                  </div>
                ))}
              </div>
              <div>
                <h3>Industries we serve</h3>
                {content.industries.map((industry) => (
                  <div className="bd-capability-row" key={industry.title}>
                    <strong>{industry.title}</strong>
                    <span>{industry.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bd-proof-craft" data-motion-section aria-label="Proof of craft">
            {postHero.proofOfCraft.map((item, index) => {
              const Icon = proofIcons[index];

              return (
                <article key={item.title}>
                  <Icon aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link href={item.href}>
                    {item.linkLabel}
                    <ArrowRightIcon aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </section>
        </div>
      </div>

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
