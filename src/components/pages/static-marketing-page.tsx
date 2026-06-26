import type { StaticPageContent } from "@/content/pages";
import { marketingContent } from "@/content/marketing";
import { CtaSection } from "@/components/marketing/cta-section";
import { Footer } from "@/components/marketing/footer";
import { HeroSection } from "@/components/marketing/hero-section";
import { Navbar } from "@/components/marketing/navbar";
import { SectionContainer } from "@/components/marketing/section-container";
import { SectionHeader } from "@/components/marketing/section-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

type StaticMarketingPageProps = {
  activeHref?: string;
  content: StaticPageContent;
  ctaHref?: string;
  path: string;
};

export function StaticMarketingPage({
  activeHref,
  content,
  ctaHref = "/contact",
  path,
}: StaticMarketingPageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground" id="main-content" tabIndex={-1}>
      <JsonLd data={buildBreadcrumbJsonLd(path)} />
      <Navbar
        activeHref={activeHref ?? path}
        brandName={marketingContent.company.name}
        ctaHref="/contact"
        ctaLabel="Book Consultation"
        items={marketingContent.navigation}
      />
      <HeroSection
        eyebrow={content.eyebrow}
        headline={content.title}
        primaryCta={{ href: ctaHref, label: content.primaryCta ?? "Contact Us" }}
        secondaryCta={{ href: "/services", label: content.secondaryCta ?? "View Services" }}
        subheadline={content.description}
      />
      {content.sections.map((section, index) => (
        <SectionContainer key={section.title} tone={index % 2 === 0 ? "muted" : "default"}>
          <SectionHeader description={section.description} label={section.label} title={section.title} />
          {section.cards ? (
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {section.cards.map((card) => (
                <Card className="h-full shadow-none transition-shadow hover:shadow-soft" key={card.title}>
                  <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : null}
          {section.list ? (
            <div className="mt-12 grid gap-3 md:grid-cols-2">
              {section.list.map((item) => (
                <div className="rounded-xl border border-border bg-card p-5 text-sm font-medium text-card-foreground" key={item}>
                  {item}
                </div>
              ))}
            </div>
          ) : null}
        </SectionContainer>
      ))}
      <SectionContainer>
        <CtaSection
          cta={{ href: "/contact", label: "Contact Us" }}
          description={marketingContent.company.shortDescription}
          headline={marketingContent.ctas[0]}
        />
      </SectionContainer>
      <Footer
        brandName={marketingContent.company.name}
        description={marketingContent.company.footerDescription}
        navigation={marketingContent.navigation}
      />
    </main>
  );
}
