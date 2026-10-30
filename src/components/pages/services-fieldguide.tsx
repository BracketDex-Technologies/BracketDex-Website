import Image from "next/image";
import Link from "next/link";
import { DM_Sans, Newsreader } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/marketing/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { marketingContent } from "@/content/marketing";
import { serviceFieldguide as content } from "@/content/services-fieldguide";
import { siteNavigation } from "@/content/site-navigation";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { Navbar } from "@/components/marketing/navbar";
import closingStyles from "@/components/home/fresh/home-closing-stack.module.css";
import styles from "./services-fieldguide.module.css";

const newsreader = Newsreader({ subsets: ["latin"], display: "swap", variable: "--font-fieldguide-heading" });
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-fieldguide-body" });

function Action({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={styles.action} href={href}><span>{children}</span><span aria-hidden="true" className={styles.actionIcon}><ArrowRight size={20} strokeWidth={1.15} /></span></Link>;
}

export function ServicesFieldguide() {
  return (
    <main className={`${styles.page} ${newsreader.variable} ${dmSans.variable} bd-inner-page`} data-page="services" data-services-fieldguide id="main-content" tabIndex={-1}>
      <JsonLd data={buildBreadcrumbJsonLd("/services")} />
      <Navbar activeHref="/services" brandName={marketingContent.company.name} ctaHref="/contact" ctaLabel={marketingContent.homepage.navigationCta} items={siteNavigation} />
      <div className={styles.content}>
        <div className={styles.shell}>
          <section aria-labelledby="fieldguide-title" className={styles.intro}>
            <h1 id="fieldguide-title">{content.title}<span className={styles.period}>.</span></h1>
            <nav aria-label="Service chapters" className={styles.chapterNav}>
              {content.chapters.map(({ id, label }) => <a href={`#${id}`} key={id}>{label}</a>)}
            </nav>
            <span aria-hidden="true" className={styles.sideLabel}>Services · BracketDex</span>
          </section>

          <section aria-labelledby="software-title" className={styles.software} id="build">
            <figure aria-label="Software is organised into interface, logic and data layers" className={styles.softwareFigure}>
              <dl className={styles.layerLabels}>
                {content.software.layers.map(({ title, description }) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}
              </dl>
              <div className={styles.stackArt}><Image alt="An exploded technical drawing of an application’s interface, orange logic layer and data layer." className={styles.stackImage} height={1322} priority sizes="(max-width: 700px) 84vw, 46vw" src="/media/services-fieldguide/software-stack.png" width={1190} /></div>
            </figure>
            <div className={styles.softwareCopy}>
              <p className={styles.kicker}>{content.software.label}</p>
              <h2 id="software-title">{content.software.title}<span className={styles.period}>.</span></h2>
              <dl className={styles.scopeDetails}>
                {content.software.details.map(({ title, description }) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}
              </dl>
              <Action href={content.software.href}>{content.software.action}</Action>
            </div>
          </section>

          <section aria-labelledby="ai-title" className={styles.intelligence} id="intelligence">
            <div className={styles.aiCopy}>
              <p className={styles.kicker}>{content.ai.label}</p>
              <h2 id="ai-title"><span className={styles.aiTitleLine}>Make intelligence</span>{" "}<span className={styles.aiTitleLine}>part of the work.</span></h2>
              <p className={styles.aiDescription}>{content.ai.description}</p>
              <Action href={content.ai.href}>{content.ai.action}</Action>
            </div>
            <figure className={styles.aiFigure}>
              <ol className={styles.aiStages}>
                {content.ai.stages.map(({ title, description }) => <li key={title}><h3>{title}</h3><p>{description}</p></li>)}
              </ol>
              <div className={styles.aiArtwork}><Image alt="Documents flow to an AI assistant, a person reviews the output, and an approved decision returns to the system." className={styles.aiImage} height={724} sizes="(max-width: 700px) 100vw, 64vw" src="/media/services-fieldguide/ai-workflow.png" width={2172} /></div>
              <figcaption>Illustrative concept</figcaption>
            </figure>
          </section>

          <div className={styles.supporting}>
            {content.supporting.map((service) => (
              <section aria-labelledby={`${service.id}-title`} className={styles.supportingService} id={service.id} key={service.id}>
                <p className={styles.kicker}>{service.label}</p>
                <div className={styles.supportingArt} data-art={service.image}><Image alt={service.alt} className={styles.supportingImage} height={994} sizes="(max-width: 700px) 100vw, 34vw" src={`/media/services-fieldguide/${service.image}.png`} width={1582} /></div>
                <h2 id={`${service.id}-title`}>{service.title}</h2>
                <p className={styles.supportingDescription}>{service.description}</p>
                <Action href={service.href}>{service.action}</Action>
              </section>
            ))}
          </div>
        </div>
      </div>
      <div className={`${styles.footer} bd-landing`}>
        <div className={closingStyles.section} data-home-closing-shell data-inner-closing-shell>
          <div className={`content-shell ${closingStyles.shell}`}>
            <div className={closingStyles.card}>
              <Footer brandName={marketingContent.company.name} description={marketingContent.company.footerDescription} navigation={siteNavigation} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
