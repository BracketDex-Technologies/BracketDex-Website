import type { Metadata } from "next";

import { ContactForm } from "@/components/marketing/contact-form";
import { CtaSection } from "@/components/marketing/cta-section";
import { Footer } from "@/components/marketing/footer";
import { HeroSection } from "@/components/marketing/hero-section";
import { Navbar } from "@/components/marketing/navbar";
import { SectionContainer } from "@/components/marketing/section-container";
import { SectionHeader } from "@/components/marketing/section-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { marketingContent } from "@/content/marketing";
import { pageContent } from "@/content/pages";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/contact");

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground" id="main-content" tabIndex={-1}>
      <JsonLd data={buildBreadcrumbJsonLd("/contact")} />
      <Navbar
        activeHref="/contact"
        brandName={marketingContent.company.name}
        ctaHref="/contact"
        ctaLabel="Book Consultation"
        items={marketingContent.navigation}
      />
      <HeroSection
        eyebrow={pageContent.contact.eyebrow}
        headline={pageContent.contact.title}
        primaryCta={{ href: "#contact-form", label: "Start Conversation" }}
        secondaryCta={{ href: "/services", label: "View Services" }}
        subheadline={pageContent.contact.description}
      />
      <SectionContainer tone="muted">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            description={pageContent.contact.sections[0].description}
            label={pageContent.contact.sections[0].label}
            title={pageContent.contact.sections[0].title}
          />
          <div id="contact-form">
            <ContactForm />
          </div>
        </div>
      </SectionContainer>
      <SectionContainer>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-dashed shadow-none">
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>Verified email address required.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-dashed shadow-none">
            <CardHeader>
              <CardTitle>Phone</CardTitle>
              <CardDescription>Verified phone number required.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-dashed shadow-none">
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Verified business location required.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </SectionContainer>
      <SectionContainer>
        <CtaSection
          cta={{ href: "/services", label: "View Services" }}
          description={marketingContent.company.shortDescription}
          headline={marketingContent.ctas[2]}
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
