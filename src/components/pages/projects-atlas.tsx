import { DM_Sans, Newsreader } from "next/font/google";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { marketingContent } from "@/content/marketing";
import { siteNavigation } from "@/content/site-navigation";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { ProjectAtlas } from "./project-atlas";
import closingStyles from "@/components/home/fresh/home-closing-stack.module.css";
import styles from "./projects-atlas.module.css";

const newsreader = Newsreader({ subsets: ["latin"], display: "swap", variable: "--font-atlas-heading" });
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-atlas-body" });

export function ProjectsAtlasPage() {
  return <main className={`${styles.page} ${newsreader.variable} ${dmSans.variable} bd-landing bd-inner-page`} data-page="projects" data-project-atlas id="main-content" tabIndex={-1}>
    <JsonLd data={buildBreadcrumbJsonLd("/projects")} />
    <Navbar activeHref="/projects" brandName={marketingContent.company.name} ctaHref="/contact" ctaLabel={marketingContent.homepage.navigationCta} items={siteNavigation} />
    <ProjectAtlas />
    <div className={closingStyles.section} data-home-closing-shell data-inner-closing-shell>
      <div className={`content-shell ${closingStyles.shell}`}><div className={closingStyles.card}>
        <Footer brandName={marketingContent.company.name} description={marketingContent.company.footerDescription} navigation={siteNavigation} />
      </div></div>
    </div>
  </main>;
}
