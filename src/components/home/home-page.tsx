import Link from "next/link";

import type { MarketingContent } from "@/content/marketing";
import { Footer } from "@/components/marketing/footer";
import { FaqSection } from "@/components/marketing/faq-section";
import { Navbar } from "@/components/marketing/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo";
import {
  AssetSlot,
  GuideCard,
  InterfaceRow,
  OperatingMap,
  ProductPanel,
  WordGrid,
} from "./landing-visuals";
import { HeroWorkflow } from "./hero-workflow";

type HomePageProps = {
  content: MarketingContent;
};

export const HOMEPAGE_HERO_PLACEMENT = "centered";

const operatingNodes = [
  { label: "Software", x: "42%", y: "12%" },
  { label: "AI", x: "70%", y: "25%" },
  { label: "Automation", x: "13%", y: "42%" },
  { label: "Cloud", x: "70%", y: "61%" },
  { label: "Growth", x: "35%", y: "76%" },
] as const;

const proofTasks = [
  { label: "Project proof", state: "Required" },
  { label: "Client feedback", state: "Required" },
  { label: "Measured results", state: "Required" },
] as const;

export function HomePage({ content }: HomePageProps) {
  const hero = content.homepage.hero;
  const guideCards = content.process.slice(0, 4);
  const serviceRows = [
    {
      title: content.services[0].title,
      description: content.services[0].description,
      href: "/services",
      linkLabel: "View software services",
      imageLabel: "Software product image will be here",
      tasks: [
        { label: "Business requirements", state: "Mapped" },
        { label: "Custom application", state: "Built" },
        { label: "Scalable architecture", state: "Planned" },
      ],
    },
    {
      title: content.services[1].title,
      description: content.services[1].description,
      href: "/solutions",
      linkLabel: "View AI solutions",
      imageLabel: "AI workflow image will be here",
      tasks: [
        { label: "AI assistants", state: "Supported" },
        { label: "Chatbots", state: "Supported" },
        { label: "AI integrations", state: "Supported" },
      ],
    },
    {
      title: content.services[2].title,
      description: content.services[2].description,
      href: "/solutions",
      linkLabel: "View automation solutions",
      imageLabel: "Automation system image will be here",
      tasks: [
        { label: "Workflow automation", state: "Designed" },
        { label: "Internal tools", state: "Built" },
        { label: "CRM and ERP solutions", state: "Available" },
      ],
    },
  ] as const;

  return (
    <main className="bd-landing min-h-screen" id="main-content" tabIndex={-1}>
      <JsonLd data={buildBreadcrumbJsonLd("/")} />
      <JsonLd data={buildFaqJsonLd()} />

      <div className="bd-hero">
        <div aria-hidden="true" className="bd-hero-bg-slot" />
        <Navbar
          activeHref="/"
          brandName={content.company.name}
          ctaHref="/contact"
          ctaLabel={hero.primaryCta}
          items={content.navigation}
        />

        <section className="content-shell bd-hero-layout">
          <div className="bd-hero-copy">
            <h1 className="bd-hero-title">{hero.headline}</h1>
            <p className="bd-hero-subtitle">{hero.subheadline}</p>
            <div className="bd-hero-actions">
              <Link className="bd-hero-primary-cta" href="/contact">
                {hero.primaryCta}
              </Link>
              <Link className="bd-hero-secondary-cta" href="/projects">
                {hero.secondaryCta}
              </Link>
            </div>
            <HeroWorkflow activeLabel="AI Automation" steps={content.homepage.heroWorkflow} />
          </div>
        </section>
      </div>

      <section className="content-shell py-28 text-center sm:py-36">
        <h2 className="mx-auto max-w-5xl text-4xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
          {content.company.name} is a software development and technology solutions partner{" "}
          <span className="text-muted-foreground">
            helping businesses build, automate, and scale through modern software and AI.
          </span>
        </h2>
      </section>

      <section className="content-shell pb-24">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <OperatingMap nodes={operatingNodes} />
          <ProductPanel
            tasks={[
              { label: "Software development", state: "Service" },
              { label: "AI solutions", state: "Service" },
              { label: "Business automation", state: "Service" },
              { label: "Cloud and DevOps", state: "Service" },
            ]}
            title="Technology partner workspace"
          />
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {content.homepage.problemGroups.map((group) => (
            <div key={group.title}>
              <p className="text-base leading-7 text-muted-foreground">
                <strong className="font-semibold text-foreground">{group.title}</strong> -{" "}
                {group.challenges.join(", ")}.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bd-grid-paper py-24 sm:py-32">
        <div className="content-shell text-center">
          <h2 className="text-4xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
            A clear path from idea to scalable system
          </h2>
          <p className="mx-auto mt-5 max-w-[28rem] text-base leading-7 text-muted-foreground">
            The documented process keeps discovery, planning, design, development, testing, deployment, and support visible.
          </p>

          <div className="mx-auto mt-16 grid max-w-4xl gap-10 md:grid-cols-2">
            {guideCards.map((step) => (
              <GuideCard
                chapter={`Phase ${step.step}`}
                href="/services"
                imageLabel={`${step.title} image will be here`}
                key={step.step}
                title={step.title}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="content-shell py-10">
        <div className="grid gap-10 py-20 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <h2 className="max-w-xl text-4xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
              Build, automate, and operate with focused technology services
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
              Every service stays tied to documented BracketDex capabilities and business outcomes.
            </p>
          </div>
          <div className="bd-panel p-4">
            <AssetSlot className="min-h-[18rem]" label="Services overview image will be here" />
          </div>
        </div>

        {serviceRows.map((row) => (
          <InterfaceRow
            description={row.description}
            href={row.href}
            imageLabel={row.imageLabel}
            key={row.title}
            linkLabel={row.linkLabel}
            tasks={row.tasks}
            title={row.title}
          />
        ))}
      </section>

      <section className="content-shell py-28 text-center sm:py-36">
        <div>
          <h2 className="mx-auto max-w-2xl text-4xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
            All the tools and systems your business needs
          </h2>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-3">
            {content.whyChooseUs.slice(0, 3).map((item) => (
              <div className="border-l border-border px-5 text-left" key={item.title}>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-16 max-w-4xl rounded-2xl border border-border bg-card/80 p-4 shadow-soft">
            <ProductPanel
              tasks={[
                { label: "Frontend", state: "React / Next.js / TypeScript" },
                { label: "Backend", state: "Node.js / NestJS / Python" },
                { label: "Database", state: "PostgreSQL / MongoDB" },
                { label: "AI", state: "OpenAI / LangChain / Vector Databases" },
              ]}
              title="Technology stack"
            />
          </div>
        </div>
      </section>

      <section className="content-shell py-28 text-center sm:py-36">
        <h2 className="text-4xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
          Build across industries
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          Documented industries include startups, FinTech, e-commerce, healthcare, real estate, media, and professional services.
        </p>
        <div className="mx-auto mt-16 max-w-4xl">
          <WordGrid />
        </div>
      </section>

      <section className="bd-grid-paper py-24 sm:py-32">
        <div className="content-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <h2 className="text-4xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
              Real proof goes here when source data is ready
            </h2>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Projects, outcomes, screenshots, and testimonials remain explicit placeholders until verified public details are supplied.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {content.projectPlaceholders.map((placeholder) => (
              <div className="bd-panel p-6" key={placeholder.label}>
                <AssetSlot className="min-h-[10rem]" label={`${placeholder.label} image will be here`} />
                <h3 className="mt-6 text-2xl font-medium leading-tight text-foreground">{placeholder.label}</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{placeholder.reason}</p>
              </div>
            ))}
            <div className="bd-panel p-6 md:col-span-2">
              <ProductPanel tasks={proofTasks} title="Case study evidence checklist" />
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell grid gap-12 py-24 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <h2 className="text-4xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            Direct answers based on documented BracketDex services and working style.
          </p>
        </div>
        <FaqSection defaultOpenFirst items={content.faqs} />
      </section>

      <section className="content-shell pb-24">
        <div className="bd-panel grid gap-10 overflow-hidden p-8 md:grid-cols-[1fr_0.8fr] md:p-12">
          <div>
            <h2 className="max-w-xl text-4xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
              {content.ctas[0]}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
              {content.company.shortDescription}
            </p>
            <Link
              className="mt-8 inline-flex rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background shadow-lift transition-opacity hover:opacity-90"
              href="/contact"
            >
              Contact Us
            </Link>
          </div>
          <AssetSlot className="min-h-[18rem]" label="Final CTA image will be here" />
        </div>
      </section>

      <Footer
        brandName={content.company.name}
        description={content.company.footerDescription}
        navigation={content.navigation}
      />
    </main>
  );
}
