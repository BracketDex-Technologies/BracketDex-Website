import type { MarketingContent } from "@/content/marketing";
import { FreshCta } from "@/components/home/fresh/cta-section";
import { CapabilityIndex } from "@/components/home/fresh/capability-index";
import { ProblemSection } from "@/components/home/fresh/problem-section";
import { ProcessRail } from "@/components/home/fresh/process-rail";
import { ProjectsSection } from "@/components/home/fresh/projects-section";
import { TrustStrip } from "@/components/home/fresh/trust-strip";
import { WhySection } from "@/components/home/fresh/why-section";
import { ServicesBento } from "@/components/home/fresh/services-bento";
import { PostHeroMotion } from "./post-hero-motion";

export const POST_HERO_DESIGN = "dark-systems-lab" as const;
export const POST_HERO_STARTS_AFTER_HERO = true as const;

export function PostHeroHome({ content }: { content: MarketingContent }) {
  return (
    <div className="bd-post-hero" data-post-hero-design={POST_HERO_DESIGN}>
      <PostHeroMotion />
      <TrustStrip content={content} />
      <ProblemSection content={content} />
      <ServicesBento content={content} />
      <div className="bd-post-dark">
        <ProcessRail content={content} />
      </div>
      <CapabilityIndex content={content} />
      <WhySection content={content} />
      <ProjectsSection />
      <FreshCta content={content} />
    </div>
  );
}
