import { FAQ_INTERACTION, FaqSection } from "./faq-section";

import { marketingContent } from "@/content/marketing";

export const faqInteractionContract: "button-panels" = FAQ_INTERACTION;

export const faqSectionContract = (
  <FaqSection defaultOpenFirst items={marketingContent.faqs} />
);
