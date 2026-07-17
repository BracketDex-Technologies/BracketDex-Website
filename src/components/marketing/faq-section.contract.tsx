import { FAQ_INTERACTION, FAQ_PROGRESSIVE_FALLBACK, FaqSection } from "./faq-section";

import { marketingContent } from "@/content/marketing";

export const faqInteractionContract: "button-panels" = FAQ_INTERACTION;
export const faqProgressiveFallbackContract: "noscript-static" = FAQ_PROGRESSIVE_FALLBACK;

export const faqSectionContract = (
  <FaqSection defaultOpenFirst items={marketingContent.faqs} />
);
