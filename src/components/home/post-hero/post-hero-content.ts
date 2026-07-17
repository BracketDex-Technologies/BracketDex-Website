import type { MarketingContent } from "@/content/marketing";

export const POST_HERO_THEME_TOGGLE = false as const;

export type PostHeroVisual = "software" | "ai" | "automation";

export type PostHeroServiceChapter = {
  index: "01" | "02" | "03";
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  capabilities: readonly { title: string; outcome: string }[];
  visual: PostHeroVisual;
};

export type ProofOfCraftItem = {
  title: "Methodology" | "Engineering Standards" | "Deliverables" | "Quality & Security";
  description: string;
  href: string;
  linkLabel: string;
};

export type PostHeroContent = {
  serviceChapters: readonly PostHeroServiceChapter[];
  proofOfCraft: readonly ProofOfCraftItem[];
  closingCta: string;
};

export function buildPostHeroContent(content: MarketingContent): PostHeroContent {
  return {
    serviceChapters: [
      { index: "01", eyebrow: content.services[0].title, title: "Build reliable software that ships", description: content.services[0].description, href: "/services", linkLabel: "Explore development services", capabilities: [content.solutions[0], content.solutions[1], content.solutions[4]], visual: "software" },
      { index: "02", eyebrow: content.services[1].title, title: "Build intelligent experiences", description: content.services[1].description, href: "/solutions", linkLabel: "Explore AI solutions", capabilities: [content.solutions[2], content.solutions[3], content.solutions[4]], visual: "ai" },
      { index: "03", eyebrow: content.services[2].title, title: "Automate workflows that move your business", description: content.services[2].description, href: "/solutions", linkLabel: "Explore automation services", capabilities: [content.solutions[3], content.solutions[4], content.solutions[5]], visual: "automation" },
    ],
    proofOfCraft: [
      { title: "Methodology", description: content.whyChooseUs[6].description, href: "/services", linkLabel: "See our process" },
      { title: "Engineering Standards", description: content.whyChooseUs[4].description, href: "/services", linkLabel: "Engineering approach" },
      { title: "Deliverables", description: content.whyChooseUs[1].description, href: "/services", linkLabel: "What you receive" },
      { title: "Quality & Security", description: content.process[4].description, href: "/services", linkLabel: "Quality approach" },
    ],
    closingCta: content.ctas[2],
  };
}
