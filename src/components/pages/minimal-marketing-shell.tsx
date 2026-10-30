import type { ReactNode } from "react";
import { DM_Sans, Newsreader } from "next/font/google";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { marketingContent } from "@/content/marketing";
import { siteNavigation } from "@/content/site-navigation";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import closingStyles from "@/components/home/fresh/home-closing-stack.module.css";
import styles from "./minimal-pages.module.css";

const newsreader = Newsreader({ subsets: ["latin"], display: "swap", variable: "--font-minimal-heading" });
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-minimal-body" });

export function MinimalMarketingShell({ page, children }: { page: "about" | "faq"; children: ReactNode }) {
  return <main className={`${styles.page} ${newsreader.variable} ${dmSans.variable} bd-landing bd-inner-page`} data-page={page} data-minimal-page={page} id="main-content" tabIndex={-1}>
    <JsonLd data={buildBreadcrumbJsonLd(`/${page}`)} />
    <Navbar activeHref={`/${page}`} brandName={marketingContent.company.name} ctaHref="/contact" ctaLabel={marketingContent.homepage.navigationCta} items={siteNavigation} />
    {children}
    <div className={closingStyles.section} data-home-closing-shell data-inner-closing-shell>
      <div className={`content-shell ${closingStyles.shell}`}><div className={closingStyles.card}>
        <Footer brandName={marketingContent.company.name} description={marketingContent.company.footerDescription} navigation={siteNavigation} />
      </div></div>
    </div>
  </main>;
}
