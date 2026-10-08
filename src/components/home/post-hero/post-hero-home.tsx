import type { MarketingContent } from "@/content/marketing";
import { FreshCta } from "@/components/home/fresh/cta-section";
import { ProcessRail } from "@/components/home/fresh/process-rail";
import { ProjectsSection } from "@/components/home/fresh/projects-section";
import { ServicesSection } from "@/components/home/fresh/services-section";
import { Manifesto } from "@/components/home/manifesto";
import { PostHeroMotion } from "./post-hero-motion";

export const POST_HERO_DESIGN = "dark-systems-lab" as const;
export const POST_HERO_STARTS_AFTER_HERO = true as const;

export function PostHeroHome({ content }: { content: MarketingContent }) {
  return (
    <div className="bd-post-hero" data-post-hero-design={POST_HERO_DESIGN}>
      <PostHeroMotion />
      <ServicesSection content={content} />
      <Manifesto text={content.company.mission} />
      <div className="bd-post-dark">
        <div className="content-shell">
          <ProcessRail content={content} compact />
        </div>
      </div>
      <ProjectsSection />
      <FreshCta content={content} />
    </div>
  );
}
