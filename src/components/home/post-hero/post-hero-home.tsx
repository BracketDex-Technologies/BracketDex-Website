import type { MarketingContent } from "@/content/marketing";
import { FreshCta } from "@/components/home/fresh/cta-section";
import { ProblemSection } from "@/components/home/fresh/problem-section";
import { ProcessRail } from "@/components/home/fresh/process-rail";
import { ProjectsSection } from "@/components/home/fresh/projects-section";
import { TrustStrip } from "@/components/home/fresh/trust-strip";
import { ChapterBlock } from "./chapter-block";
import { buildPostHeroContent } from "./post-hero-content";
import { PostHeroMotion } from "./post-hero-motion";

export const POST_HERO_DESIGN = "dark-systems-lab" as const;
export const POST_HERO_STARTS_AFTER_HERO = true as const;

export function PostHeroHome({ content }: { content: MarketingContent }) {
  const chapters = buildPostHeroContent(content).serviceChapters;
  return (
    <div className="bd-post-hero" data-post-hero-design={POST_HERO_DESIGN}>
      <PostHeroMotion />
      <TrustStrip content={content} />
      <ProblemSection content={content} />
      <section aria-label="Services" data-home-section="services" id="services">
        {chapters.map((chapter, index) => <ChapterBlock chapter={chapter} flipped={index % 2 === 1} key={chapter.index} />)}
      </section>
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
