import { marketingContent } from "./marketing";

type RequiredMarketingContent = {
  company: {
    name: string;
    tagline: string;
    positioning: string;
  };
  navigation: readonly {
    label: string;
    href: string;
  }[];
  homepage: {
    navigationCta: string;
    hero: {
      capabilities: readonly [string, string, string];
      headline: string;
      subheadline: string;
      primaryCta: string;
    };
    trustMetricPlaceholders: readonly {
      label: string;
      placeholder: string;
    }[];
  };
  services: readonly {
    title: string;
    description: string;
  }[];
  solutions: readonly {
    title: string;
    outcome: string;
  }[];
  industries: readonly {
    title: string;
    description: string;
  }[];
  whyChooseUs: readonly {
    title: string;
    description: string;
  }[];
  process: readonly {
    step: string;
    title: string;
    description: string;
  }[];
  technologyStack: readonly {
    category: string;
    items: readonly string[];
  }[];
  faqs: readonly {
    question: string;
    answer: string;
  }[];
  ctas: readonly string[];
  projectPlaceholders: readonly {
    label: string;
    reason: string;
  }[];
};

export const marketingContentContract: RequiredMarketingContent = marketingContent;
