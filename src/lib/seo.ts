import type { Metadata } from "next";

import { marketingContent } from "@/content/marketing";
import { siteConfig } from "@/lib/site";
import { routedPages } from "@/content/routed-pages";

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
  ...Object.entries(routedPages).map(([slug, content]): SeoRoute => ({
    path: `/${slug}`, title: `${content.eyebrow} | BracketDex Technologies`,
    description: content.description, changeFrequency: "monthly", priority: 0.7,
  })),
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
