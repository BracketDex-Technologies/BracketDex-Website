import {
  BotIcon,
  BoxesIcon,
  BrainCircuitIcon,
  Building2Icon,
  CheckCircle2Icon,
  CloudIcon,
  Code2Icon,
  CpuIcon,
  DatabaseIcon,
  FactoryIcon,
  Globe2Icon,
  GraduationCapIcon,
  HeartPulseIcon,
  Layers3Icon,
  LineChartIcon,
  MapPinIcon,
  RocketIcon,
  ShoppingCartIcon,
  SmartphoneIcon,
  SparklesIcon,
  WorkflowIcon,
  type LucideIcon,
} from "lucide-react";

import type { MarketingContent } from "@/content/marketing";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { Footer } from "@/components/marketing/footer";
import { HeroSection } from "@/components/marketing/hero-section";
import { IndustryCard } from "@/components/marketing/industry-card";
import { Navbar } from "@/components/marketing/navbar";
import { ProjectCard } from "@/components/marketing/project-card";
import { SectionContainer } from "@/components/marketing/section-container";
import { SectionHeader } from "@/components/marketing/section-header";
import { ServiceCard } from "@/components/marketing/service-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type HomePageProps = {
  content: MarketingContent;
};

const serviceIcons: Record<string, LucideIcon> = {
  "AI Solutions": BrainCircuitIcon,
  "Business Automation": WorkflowIcon,
  "Cloud & DevOps": CloudIcon,
  "Digital Growth": LineChartIcon,
  "Software Development": Code2Icon,
};

const industryIcons: Record<string, LucideIcon> = {
  "E-Commerce": ShoppingCartIcon,
  Education: GraduationCapIcon,
  FinTech: LineChartIcon,
  Healthcare: HeartPulseIcon,
  Logistics: MapPinIcon,
  Manufacturing: FactoryIcon,
  Media: Globe2Icon,
  "Professional Services": Building2Icon,
  "Real Estate": Building2Icon,
};

const solutionIcons: Record<string, LucideIcon> = {
  "AI Solutions": BotIcon,
  "Business Automation": WorkflowIcon,
  "Cloud Infrastructure": CloudIcon,
  "Enterprise Systems": DatabaseIcon,
  "MVP Development": RocketIcon,
  "SaaS Platforms": Layers3Icon,
};

const technologyIcons: Record<string, LucideIcon> = {
  AI: BrainCircuitIcon,
  Backend: CpuIcon,
  Cloud: CloudIcon,
  Database: DatabaseIcon,
  DevOps: BoxesIcon,
  Frontend: Code2Icon,
  Mobile: SmartphoneIcon,
};

export function HomePage({ content }: HomePageProps) {
  const hero = content.homepage.hero;
  const featuredProjectPlaceholder = content.projectPlaceholders[0];
  const testimonialPlaceholder = content.projectPlaceholders[1];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar
        brandName={content.company.name}
        ctaHref="/contact"
        ctaLabel={hero.primaryCta}
        items={content.navigation}
      />
      <HeroSection
        headline={hero.headline}
        primaryCta={{ href: "/contact", label: hero.primaryCta }}
        secondaryCta={{ href: "/projects", label: hero.secondaryCta }}
        subheadline={hero.subheadline}
      />

      <SectionContainer className="pt-0">
        <div className="grid gap-4 md:grid-cols-5">
          {content.homepage.trustMetricPlaceholders.map((metric) => (
            <Card className="bg-surface/70 shadow-none" key={metric.label}>
              <CardHeader className="gap-3">
                <CardTitle className="text-sm">{metric.label}</CardTitle>
                <CardDescription>{metric.placeholder}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer tone="muted">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            description="We focus on practical business challenges first, then choose the technology path that solves them clearly."
            label="Problems"
            title="Problems We Solve"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {content.homepage.problemGroups.map((group) => (
              <Card className="h-full shadow-none" key={group.title}>
                <CardHeader>
                  <CardTitle>{group.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-3 text-sm leading-6 text-muted-foreground">
                    {group.challenges.map((challenge) => (
                      <li className="flex gap-2" key={challenge}>
                        <CheckCircle2Icon aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <SectionHeader
          align="center"
          description="Each solution is framed around a business outcome, not only a technical deliverable."
          label="Solutions"
          title="Solutions We Provide"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.solutions.map((solution) => {
            const Icon = solutionIcons[solution.title] ?? SparklesIcon;

            return (
              <Card className="h-full transition-shadow hover:shadow-soft" key={solution.title}>
                <CardHeader>
                  <div className="mb-2 grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon aria-hidden="true" />
                  </div>
                  <CardTitle>{solution.title}</CardTitle>
                  <CardDescription>{solution.outcome}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </SectionContainer>

      <SectionContainer tone="dark">
        <SectionHeader
          description={content.company.longDescription}
          label="Services"
          title="Technology services built for growth"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service) => (
            <ServiceCard
              description={service.description}
              icon={serviceIcons[service.title]}
              key={service.title}
              title={service.title}
            />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer>
        <SectionHeader
          align="center"
          description="The working style is designed to stay transparent, practical, and aligned with long-term product value."
          label="Why BracketDex"
          title="Why Choose BracketDex"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.whyChooseUs.map((feature, index) => (
            <Card
              className={index === 0 ? "h-full border-primary/30 bg-primary/5 lg:col-span-2" : "h-full"}
              key={feature.title}
            >
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer tone="muted">
        <SectionHeader
          description="Domain-aware software and automation for operations, platforms, workflows, and customer experiences."
          label="Industries"
          title="Industries We Serve"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.industries.map((industry) => (
            <IndustryCard
              description={industry.description}
              icon={industryIcons[industry.title]}
              key={industry.title}
              title={industry.title}
            />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader
            description="Public case studies will use real project details only. Until then, the site keeps proof areas honest and clearly marked."
            label="Projects"
            title="Featured Projects"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <ProjectCard
              category="Placeholder"
              description={featuredProjectPlaceholder.reason}
              industry="Project proof required"
              title={featuredProjectPlaceholder.label}
            />
            <ProjectCard
              category="Placeholder"
              description={testimonialPlaceholder.reason}
              industry="Client proof required"
              title={testimonialPlaceholder.label}
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer tone="dark">
        <SectionHeader
          align="center"
          description="A clear delivery path from business understanding to continuous improvement."
          label="Process"
          title="Development Process"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.process.map((step) => (
            <Card className="h-full bg-card/80" key={step.step}>
              <CardHeader>
                <p className="text-sm font-semibold text-secondary">{step.step}</p>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            description="Client feedback will be added only after real names, companies, feedback, and permission are available."
            label="Testimonials"
            title="Client Stories"
          />
          <Card className="border-dashed bg-surface/70 shadow-none">
            <CardHeader>
              <CardTitle>{testimonialPlaceholder.label}</CardTitle>
              <CardDescription>{testimonialPlaceholder.reason}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </SectionContainer>

      <SectionContainer>
        <SectionHeader
          description="The stack reflects documented capabilities and common implementation paths for modern software, cloud, and AI work."
          label="Technology"
          title="Technology Stack"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.technologyStack.map((group) => {
            const Icon = technologyIcons[group.category] ?? CpuIcon;

            return (
              <Card className="h-full" key={group.category}>
                <CardHeader>
                  <div className="mb-2 grid size-10 place-items-center rounded-lg bg-secondary/15 text-secondary">
                    <Icon aria-hidden="true" />
                  </div>
                  <CardTitle>{group.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </SectionContainer>

      <SectionContainer tone="muted">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            description="Direct answers based on documented BracketDex services and working style."
            label="FAQ"
            title="Frequently Asked Questions"
          />
          <FaqSection items={content.faqs} />
        </div>
      </SectionContainer>

      <SectionContainer>
        <CtaSection
          cta={{ href: "/contact", label: "Contact Us" }}
          description={content.company.shortDescription}
          headline={content.ctas[0]}
        />
      </SectionContainer>

      <Footer
        brandName={content.company.name}
        description={content.company.footerDescription}
        navigation={content.navigation}
      />
    </main>
  );
}
