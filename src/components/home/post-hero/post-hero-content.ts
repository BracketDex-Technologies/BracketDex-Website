import type { MarketingContent } from "@/content/marketing";
import { siteNavigation } from "@/content/site-navigation";

export type PostHeroVisual = "software" | "ai" | "automation";

export type PostHeroServiceChapter = {
  index: "01" | "02" | "03";
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  capabilities: readonly { title: string; outcome: string }[];
  visual: PostHeroVisual;
};

export type PostHeroContent = {
  serviceChapters: readonly PostHeroServiceChapter[];
  closingCta: string;
};

const labelFor = (href: string) => siteNavigation.find((item) => item.href === href)?.label ?? "";

export function buildPostHeroContent(content: MarketingContent): PostHeroContent {
  return {
    serviceChapters: [
      { index: "01", title: content.services[0].title, description: content.services[0].description, href: "/services", linkLabel: labelFor("/services"), capabilities: [content.solutions[0], content.solutions[1], content.solutions[4]], visual: "software" },
      { index: "02", title: content.services[1].title, description: content.services[1].description, href: "/solutions", linkLabel: labelFor("/solutions"), capabilities: [content.solutions[2], content.solutions[3], content.solutions[4]], visual: "ai" },
      { index: "03", title: content.services[2].title, description: content.services[2].description, href: "/solutions", linkLabel: labelFor("/solutions"), capabilities: [content.solutions[3], content.solutions[4], content.solutions[5]], visual: "automation" },
    ],
    closingCta: content.ctas[2],
  };
}
