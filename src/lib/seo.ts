import type { Metadata } from "next";

import { marketingContent } from "@/content/marketing";
import { siteConfig } from "@/lib/site";

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

export const seoRoutes = [
  {
    path: "/",
    title: "BracketDex Technologies | Engineering Solutions For Growing Businesses",
    description: siteConfig.description,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/services",
    title: "Software Development & Technology Services | BracketDex Technologies",
    description:
      "Custom software development, AI solutions, automation systems, cloud infrastructure, and digital growth services.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/solutions",
    title: "Business Technology Solutions | BracketDex Technologies",
    description:
      "Technology solutions designed to improve efficiency, automate operations, and support business growth.",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/industries",
    title: "Industry-Specific Technology Solutions | BracketDex Technologies",
    description:
      "Software and technology solutions tailored for startups, FinTech, healthcare, e-commerce, real estate, and more.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/projects",
    title: "Projects & Case Studies | BracketDex Technologies",
    description:
      "Explore software projects, AI solutions, automation systems, and technology case studies delivered by BracketDex Technologies.",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: "/about",
    title: "About BracketDex Technologies",
    description:
      "Learn about BracketDex Technologies, our mission, vision, and commitment to helping businesses grow through technology.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/contact",
    title: "Contact BracketDex Technologies",
    description:
      "Discuss your project, software requirements, AI initiatives, or automation goals with our team.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
] satisfies readonly SeoRoute[];

const routeMap = new Map(seoRoutes.map((route) => [route.path, route]));

export function getCanonicalUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function getSeoRoute(path: string) {
  const route = routeMap.get(path);

  if (!route) {
    throw new Error(`Missing SEO route for ${path}`);
  }

  return route;
}

export function buildPageMetadata(path: string): Metadata {
  const route = getSeoRoute(path);
  const canonical = getCanonicalUrl(path);

  return {
    title: {
      absolute: route.title,
    },
    description: route.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: route.title,
      description: route.description,
      siteName: siteConfig.name,
      type: "website",
      url: canonical,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} brand image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: ["/opengraph-image"],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: marketingContent.company.shortDescription,
  slogan: siteConfig.tagline,
  sameAs: [],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
};

export function buildBreadcrumbJsonLd(path: string) {
  const route = getSeoRoute(path);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getCanonicalUrl("/"),
      },
      ...(path === "/"
        ? []
        : [
            {
              "@type": "ListItem",
              position: 2,
              name: route.title.replace(" | BracketDex Technologies", ""),
              item: getCanonicalUrl(path),
            },
          ]),
    ],
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: marketingContent.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
