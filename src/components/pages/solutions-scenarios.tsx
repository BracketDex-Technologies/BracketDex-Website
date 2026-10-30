import Image from "next/image";
import Link from "next/link";
import { DM_Sans, Newsreader } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { ProblemSection } from "@/components/home/fresh/problem-section";
import { JsonLd } from "@/components/seo/json-ld";
import { marketingContent } from "@/content/marketing";
import { siteNavigation } from "@/content/site-navigation";
import { solutionTestQuestions } from "@/content/solution-scenarios";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { ChangeScenarios } from "./change-scenarios";
import closingStyles from "@/components/home/fresh/home-closing-stack.module.css";
import styles from "./solutions-scenarios.module.css";

const newsreader = Newsreader({ subsets: ["latin"], display: "swap", variable: "--font-scenario-heading" });
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-scenario-body" });

export function SolutionsScenarios() {
  return (
    <main className={`${styles.page} ${newsreader.variable} ${dmSans.variable} bd-landing bd-inner-page`} data-page="solutions" data-solutions-scenarios id="main-content" tabIndex={-1}>
      <JsonLd data={buildBreadcrumbJsonLd("/solutions")} />
      <Navbar activeHref="/solutions" brandName={marketingContent.company.name} ctaHref="/contact" ctaLabel={marketingContent.homepage.navigationCta} items={siteNavigation} />
      <ChangeScenarios />
      <ProblemSection content={marketingContent} />
      <section aria-labelledby="solution-test-title" className={`${styles.editorial} ${styles.test}`}>
        <div className={`${styles.shell} ${styles.testSpread}`}>
          <div className={styles.notebook}><Image alt="An open notebook with a checklist, pen, orange note and a cup of coffee." height={992} sizes="(max-width: 700px) 95vw, 48vw" src="/media/solutions-scenarios/notebook.png" width={1586} /></div>
          <div className={styles.testCopy}>
            <h2 id="solution-test-title"><span>A useful solution</span>{" "}<span>has a clear test.</span></h2>
            <div className={styles.questions}>
              {solutionTestQuestions.map(({ question, guidance }) => <details key={question}><summary>{question}<ArrowRight aria-hidden="true" size={25} strokeWidth={1.2} /></summary><p>{guidance}</p></details>)}
            </div>
            <Link className={styles.describe} href="/contact?topic=define-change">Describe the change you need</Link>
          </div>
        </div>
      </section>
      <div className={closingStyles.section} data-home-closing-shell data-inner-closing-shell>
        <div className={`content-shell ${closingStyles.shell}`}><div className={closingStyles.card}>
          <Footer brandName={marketingContent.company.name} description={marketingContent.company.footerDescription} navigation={siteNavigation} />
        </div></div>
      </div>
    </main>
  );
}
