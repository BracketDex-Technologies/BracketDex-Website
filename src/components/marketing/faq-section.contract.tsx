import { FaqSection } from "./faq-section";

import { marketingContent } from "@/content/marketing";

export const faqSectionContract = (
  <FaqSection defaultOpenFirst items={marketingContent.faqs} />
);
