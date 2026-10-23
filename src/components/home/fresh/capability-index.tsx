import type { MarketingContent } from "@/content/marketing";
import { pageContent } from "@/content/pages";
import { TechnologyNetwork } from "./technology-network";

export function CapabilityIndex({ content }: { content: MarketingContent }) {
  const technology = pageContent.services.sections[2];
  return (
    <section aria-labelledby="home-capability-title" data-home-section="capabilities">
      <TechnologyNetwork groups={content.technologyStack} label={technology.label} title={technology.title} />
    </section>
  );
}
