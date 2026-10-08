import { marketingContent } from "@/content/marketing";

export const siteConfig = {
  name: marketingContent.company.name,
  tagline: marketingContent.company.tagline,
  description:
    "BracketDex Technologies helps startups and businesses build software, automation, and AI systems that help growing businesses operate faster, work smarter, and scale with confidence.",
  url: "https://bracketdex.com",
};

export const contactDetails = {
  email: "bracketdevs.teams@gmail.com",
  phone: "+91 8605589062",
  phoneHref: "tel:+918605589062",
  location: "Pune, Maharashtra",
} as const;
