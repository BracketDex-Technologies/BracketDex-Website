import Link from "next/link";
import type { StaticPageContent } from "@/content/pages";
import { marketingContent } from "@/content/marketing";
import { siteNavigation } from "@/content/site-navigation";
import { Footer } from "@/components/marketing/footer";
import { Navbar } from "@/components/marketing/navbar";
import { ContactForm } from "@/components/marketing/contact-form";
import { FaqSection } from "@/components/marketing/faq-section";
import { ScrollChoreography } from "@/components/motion/scroll-choreography";
import { ScrollWords } from "@/components/motion/scroll-words";
import { ProjectsSection } from "@/components/home/fresh/projects-section";
import { CloudPanel } from "@/components/home/fresh/cloud-panel";
import { CapabilityIndex } from "@/components/home/fresh/capability-index";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo";

type Props = { activeHref?: string; content: StaticPageContent; ctaHref?: string; path: string };

export function StaticMarketingPage({ activeHref, content, ctaHref = "/contact", path }: Props) {
  const isContact = path === "/contact";
  const isFaq = path === "/faq";
  const isProjects = path === "/projects";
  const label = content.eyebrow.toUpperCase();
  return <main className="bd-landing bd-inner-page" data-page={path.slice(1)} id="main-content" tabIndex={-1}>
    <JsonLd data={buildBreadcrumbJsonLd(path)} />
    {isFaq && <JsonLd data={buildFaqJsonLd()} />}
    <ScrollChoreography />
    <Navbar activeHref={activeHref ?? path} brandName={marketingContent.company.name} ctaHref="/contact" ctaLabel="Let’s talk ↗" items={siteNavigation} />
    <section className="bd-page-hero">
      <div className="content-shell">
        <div className="bd-page-intro">
          <p className="bd-scene-label">BracketDex / {content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
        </div>
        <div className="bd-page-display" aria-hidden="true">
          {label.split("").map((letter, index) => <span key={index}>{letter}</span>)}
        </div>
        <div className="bd-page-index">
          {isContact ? <><a href="mailto:bracketdex@gmail.com">bracketdex@gmail.com ↗</a><span>Pune, India</span></> : isFaq ? <><a href="#answers">Explore the answers ↓</a><Link href="/contact">Ask us a question ↗</Link></> : isProjects ? <><span>Software &amp; automation</span><span>14 examples below</span></> : content.sections.map((section, index) => (
            <a href={`#chapter-${index + 1}`} key={section.title}><span>{String(index + 1).padStart(2, "0")}</span>{section.label}</a>
          ))}
        </div>
      </div>
    </section>
    {path === "/industries" && <div className="bd-post-dark"><div className="content-shell"><CapabilityIndex content={marketingContent} /></div></div>}
    {isProjects ? <ProjectsSection all /> : isContact ? <section className="bd-page-chapter content-shell" id="contact">
      <div className="bd-chapter-heading"><p className="bd-scene-label">Start a conversation</p><h2><ScrollWords text="Let’s discuss your project." /></h2><p>{content.sections[0]?.description}</p><a href="mailto:bracketdex@gmail.com">bracketdex@gmail.com ↗</a></div>
      <div><ContactForm /></div>
    </section> : isFaq ? <section className="bd-page-chapter content-shell" id="answers">
      <div className="bd-chapter-heading"><p className="bd-scene-label">Before we begin</p><h2><ScrollWords text="The details that matter." /></h2></div>
      <FaqSection defaultOpenFirst items={marketingContent.faqs} />
    </section> : content.sections.map((section, index) => <section className={`bd-page-chapter content-shell${path === "/about" && section.label === "Mission and Vision" ? " bd-page-chapter--mission" : ""}`} id={`chapter-${index + 1}`} key={section.title}>
      <div className="bd-chapter-heading"><p className="bd-scene-label">{String(index + 1).padStart(2, "0")} / {section.label}</p><h2><ScrollWords text={section.title} /></h2>{section.description && <p>{section.description}</p>}</div>
      <div className="bd-chapter-rows">
        {section.cards?.map((card, i) => <article className="bd-chapter-row" data-scroll-row key={card.title}>
          <span className="bd-scene-label">{String(i + 1).padStart(2, "0")}</span><div><h3>{card.title}</h3><p>{card.description}</p></div><span aria-hidden="true">↗</span>
        </article>)}
        {section.list?.map((item, i) => <div className="bd-chapter-row" data-scroll-row key={item}><span className="bd-scene-label">{String(i + 1).padStart(2, "0")}</span><h3>{item}</h3></div>)}
      </div>
    </section>)}
    {path === "/services" && <div className="bd-post-dark"><div className="content-shell"><CloudPanel content={marketingContent} /></div></div>}
    {!isContact && <section className="bd-page-outro content-shell"><p className="bd-scene-label">Build with BracketDex</p><h2><ScrollWords text={marketingContent.ctas[0]} /></h2><Link className="bd-hero-primary-cta" href={ctaHref}>{content.primaryCta ?? "Start a conversation"} ↗</Link></section>}
    <Footer brandName={marketingContent.company.name} description={marketingContent.company.footerDescription} navigation={siteNavigation} />
  </main>;
}
