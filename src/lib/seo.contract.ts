import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  getCanonicalUrl,
  organizationJsonLd,
  seoRoutes,
  websiteJsonLd,
} from "./seo";

export const seoContract = {
  breadcrumbs: buildBreadcrumbJsonLd("/services"),
  canonical: getCanonicalUrl("/services"),
  homeMetadata: buildPageMetadata("/"),
  organization: organizationJsonLd,
  routeCount: seoRoutes.length,
  website: websiteJsonLd,
};
