import {
  ContactForm,
  CtaSection,
  FaqSection,
  Footer,
  HeroSection,
  IndustryCard,
  Navbar,
  ProjectCard,
  SectionContainer,
  SectionHeader,
  ServiceCard,
} from "./index";

const navigation = [{ label: "Home", href: "/" }] as const;
const faqs = [{ question: "Question?", answer: "Answer." }] as const;

export const componentContract = (
  <>
    <Navbar brandName="BracketDex Technologies" items={navigation} ctaLabel="Book Consultation" ctaHref="/contact" />
    <HeroSection
      headline="Engineering Solutions For Growing Businesses."
      subheadline="We build software, automation, and AI systems that help growing businesses operate faster, work smarter, and scale with confidence."
      primaryCta={{ label: "Book Consultation", href: "/contact" }}
      secondaryCta={{ label: "View Projects", href: "/projects" }}
    />
    <SectionContainer>
      <SectionHeader title="Services" description="Custom applications built around business requirements." />
      <ServiceCard title="Software Development" description="Custom applications built around business requirements." />
      <IndustryCard title="FinTech" description="Payments, banking platforms, financial dashboards." />
      <ProjectCard
        title="Project details required"
        category="Placeholder"
        industry="Placeholder"
        description="Real project names, screenshots, clients, metrics, and outcomes must be supplied before public case studies are shown."
      />
      <FaqSection items={faqs} />
      <ContactForm />
      <CtaSection headline="Let's Build Something Great Together." cta={{ label: "Contact Us", href: "/contact" }} />
    </SectionContainer>
    <Footer
      brandName="BracketDex Technologies"
      description="BracketDex Technologies helps businesses build, automate, and scale through software development, AI solutions, cloud infrastructure, and digital transformation."
      navigation={navigation}
    />
  </>
);
