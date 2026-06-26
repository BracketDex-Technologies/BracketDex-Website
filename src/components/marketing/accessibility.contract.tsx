import { Navbar } from "./navbar";

import { StaticMarketingPage } from "@/components/pages/static-marketing-page";
import { marketingContent } from "@/content/marketing";
import { pageContent } from "@/content/pages";

export const accessibilityContract = (
  <>
    <Navbar
      activeHref="/services"
      brandName={marketingContent.company.name}
      ctaHref="/contact"
      ctaLabel="Book Consultation"
      items={marketingContent.navigation}
    />
    <StaticMarketingPage
      activeHref="/services"
      content={pageContent.services}
      path="/services"
    />
  </>
);
