import type { MarketingContent } from "@/content/marketing";
import { CapabilityIndex } from "@/components/home/fresh/capability-index";
import { ProcessRail } from "@/components/home/fresh/process-rail";
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
      <WhySection content={content} />
      <ServicesBento content={content} />
      <ProcessRail content={content} />
      <CapabilityIndex content={content} />
    </div>
  );
}
