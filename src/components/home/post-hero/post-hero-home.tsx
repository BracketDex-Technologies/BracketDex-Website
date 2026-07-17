import Link from "next/link";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  Code2Icon,
  PackageCheckIcon,
  ShieldCheckIcon,
  WorkflowIcon,
} from "lucide-react";

import type { MarketingContent } from "@/content/marketing";
import { FaqSection } from "@/components/marketing/faq-section";
import { buildPostHeroContent } from "./post-hero-content";
import { PostHeroMotion } from "./post-hero-motion";
import { CloudDevOpsVisual, SystemVisual } from "./system-visuals";

export const POST_HERO_DESIGN = "dark-systems-lab" as const;
export const POST_HERO_STARTS_AFTER_HERO = true as const;

const proofIcons = [WorkflowIcon, Code2Icon, PackageCheckIcon, ShieldCheckIcon] as const;

export function PostHeroHome({ content }: { content: MarketingContent }) {
  const postHero = buildPostHeroContent(content);
  const cloudService = content.services[3];
  const cloudGroups = content.technologyStack.filter(
    (group) => group.category === "Cloud" || group.category === "DevOps",
  );

  return (
    <div className="bd-post-hero" data-post-hero-design={POST_HERO_DESIGN}>
      <PostHeroMotion />
      <section className="bd-post-intro" aria-labelledby="post-hero-intro-title">
        <div className="content-shell bd-post-intro__grid">
          <div>
            <p className="bd-post-kicker">HOW WE WORK</p>
            <h2 id="post-hero-intro-title">From business need to working system.</h2>
          </div>
          <p>
            {content.company.mission} One visible path keeps priorities, decisions, delivery,
            and release aligned.
          </p>
        </div>
      </section>

      <div className="bd-post-dark">
        <div className="content-shell">
          {postHero.serviceChapters.map((chapter) => (
            <section
              className="bd-service-chapter"
              data-motion-section
              key={chapter.index}
              aria-labelledby={`service-${chapter.index}`}
            >
              <div className="bd-service-chapter__copy">
                <span className="bd-chapter-index">{chapter.index}</span>
                <p className="bd-post-kicker">{chapter.eyebrow}</p>
                <h2 id={`service-${chapter.index}`}>{chapter.title}</h2>
                <p className="bd-service-chapter__description">{chapter.description}</p>
                <ul>
                  {chapter.capabilities.map((item) => (
                    <li key={item.title}>
                      <CheckCircle2Icon aria-hidden="true" />
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.outcome}</small>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link className="bd-post-link" href={chapter.href}>
                  {chapter.linkLabel}
                  <ArrowRightIcon aria-hidden="true" />
                </Link>
              </div>
              <div className="bd-service-chapter__visual" data-motion-visual>
                <SystemVisual variant={chapter.visual} />
              </div>
            </section>
          ))}

          <section className="bd-cloud-strip" data-motion-section aria-labelledby="cloud-title">
            <div className="bd-cloud-strip__copy">
              <p className="bd-post-kicker">Infrastructure</p>
              <h2 id="cloud-title">{cloudService.title}</h2>
              <p>{cloudService.description}</p>
              {cloudGroups.map((group) => (
                <div key={group.category}>
                  <strong>{group.category}</strong>
                  <span>{group.items.join(" · ")}</span>
                </div>
              ))}
            </div>
            <CloudDevOpsVisual />
          </section>

          <section className="bd-delivery" data-motion-section aria-labelledby="delivery-title">
            <p className="bd-post-kicker">Delivery system</p>
            <h2 id="delivery-title">From business need to working system</h2>
            <ol className="bd-delivery-rail">
              {content.process.map((step) => (
                <li data-process-step key={step.step}>
                  <span>{step.step}</span>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </section>

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
