export type NavigationItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  title: string;
  description: string;
};

export type SolutionItem = {
  title: string;
  outcome: string;
};

export type IndustryItem = {
  title: string;
  description: string;
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type TechnologyGroup = {
  category: string;
  items: readonly string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type TrustMetricPlaceholder = {
  label: string;
  placeholder: string;
};

export type ProblemGroup = {
  title: string;
  challenges: readonly string[];
};

export const marketingContent = {
  company: {
    name: "BracketDex Technologies",
    tagline: "Engineering Solutions For Growing Businesses.",
    positioning: "Software Development & Technology Solutions Partner.",
    shortDescription:
      "BracketDex Technologies is a software development and technology solutions company helping businesses build, automate, and scale through modern software and AI solutions.",
    longDescription:
      "BracketDex Technologies provides custom software development, AI solutions, business automation, cloud infrastructure, and digital growth services. We work with startups and businesses to build scalable solutions that solve real business challenges and create long-term value.",
    mission:
      "Help businesses leverage modern technology to improve efficiency, automate processes, and accelerate growth.",
    vision: "Make enterprise-grade technology accessible to businesses of all sizes.",
    footerDescription:
      "BracketDex Technologies helps businesses build, automate, and scale through software development, AI solutions, cloud infrastructure, and digital transformation.",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Projects", href: "/projects" },
    { label: "Industries", href: "/industries" },
    { label: "Why Choose Us", href: "/why-choose-us" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ] satisfies readonly NavigationItem[],
  homepage: {
    hero: {
      headline: "Engineering Solutions For Growing Businesses.",
      subheadline:
        "We help startups and businesses build software, automation systems, and AI-powered solutions that improve efficiency and accelerate growth.",
      primaryCta: "Book Consultation",
      secondaryCta: "View Projects",
    },
    trustMetricPlaceholders: [
      {
        label: "Projects Delivered",
        placeholder: "Real project count required",
      },
      {
        label: "Happy Clients",
        placeholder: "Real client count required",
      },
      {
        label: "Years Experience",
        placeholder: "Real operating history required",
      },
      {
        label: "Countries Served",
        placeholder: "Real geography data required",
      },
      {
        label: "Technologies Used",
        placeholder: "Use approved stack and real capabilities only",
      },
    ],
    problemGroups: [
      {
        title: "Startup Challenges",
        challenges: ["No technical co-founder", "MVP delays", "Product uncertainty"],
      },
      {
        title: "Business Challenges",
        challenges: ["Manual workflows", "Inefficient operations", "Legacy software"],
      },
      {
        title: "Enterprise Challenges",
        challenges: ["Scalability issues", "System integrations", "Complex processes"],
      },
    ] satisfies readonly ProblemGroup[],
  },
  services: [
    {
      title: "Software Development",
      description: "Custom applications built around business requirements.",
    },
    {
      title: "AI Solutions",
      description: "Intelligent systems that automate and improve workflows.",
    },
    {
      title: "Business Automation",
      description: "Reduce manual work and increase operational efficiency.",
    },
    {
      title: "Cloud & DevOps",
      description: "Reliable infrastructure and deployment pipelines.",
    },
    {
      title: "Digital Growth",
      description: "Advertising, analytics, and conversion optimization.",
    },
  ] satisfies readonly ServiceItem[],
  solutions: [
    {
      title: "MVP Development",
      outcome: "Launch products faster.",
    },
    {
      title: "SaaS Platforms",
      outcome: "Build scalable software businesses.",
    },
    {
      title: "AI Solutions",
      outcome: "Automate repetitive tasks.",
    },
    {
      title: "Business Automation",
      outcome: "Increase operational efficiency.",
    },
    {
      title: "Enterprise Systems",
      outcome: "Improve large-scale operations.",
    },
    {
      title: "Cloud Infrastructure",
      outcome: "Scale securely and reliably.",
    },
  ] satisfies readonly SolutionItem[],
  industries: [
    {
      title: "Healthcare",
      description: "Patient portals, telemedicine, healthcare systems.",
    },
    {
      title: "FinTech",
      description: "Payments, banking platforms, financial dashboards.",
    },
    {
      title: "E-Commerce",
      description: "Marketplaces, inventory systems, commerce platforms.",
    },
    {
      title: "Logistics",
      description: "Fleet management, tracking systems, warehouse software.",
    },
    {
      title: "Education",
      description: "LMS platforms and learning applications.",
    },
    {
      title: "Manufacturing",
      description: "ERP systems and production management systems.",
    },
    {
      title: "Real Estate",
      description: "Property workflows, listing systems, and operational tools.",
    },
    {
      title: "Media",
      description: "Content platforms, media workflows, and analytics systems.",
    },
    {
      title: "Professional Services",
      description: "Business management software and process automation solutions.",
    },
  ] satisfies readonly IndustryItem[],
  whyChooseUs: [
    {
      title: "Fair Pricing",
      description: "Practical technology solutions without unnecessary complexity.",
    },
    {
      title: "Fast Delivery",
      description: "Focused execution for startups and growing businesses.",
    },
    {
      title: "Modern Technology",
      description: "Current development practices and scalable architecture choices.",
    },
    {
      title: "Business-Focused Solutions",
      description: "Technology decisions shaped around real business outcomes.",
    },
    {
      title: "Scalable Architecture",
      description: "Systems designed to support future growth.",
    },
    {
      title: "Long-Term Support",
      description: "Ongoing maintenance, improvements, and support after launch.",
    },
    {
      title: "Transparent Communication",
      description: "Clear milestones, visibility, and practical collaboration.",
    },
  ] satisfies readonly FeatureItem[],
  process: [
    {
      step: "01",
      title: "Discovery",
      description: "Understand business needs.",
    },
    {
      step: "02",
      title: "Planning",
      description: "Define roadmap.",
    },
    {
      step: "03",
      title: "Design",
      description: "Create user experience.",
    },
    {
      step: "04",
      title: "Development",
      description: "Build the solution.",
    },
    {
      step: "05",
      title: "Testing",
      description: "Ensure quality.",
    },
    {
      step: "06",
      title: "Deployment",
      description: "Launch product.",
    },
    {
      step: "07",
      title: "Support",
      description: "Continuous improvement.",
    },
  ] satisfies readonly ProcessStep[],
  technologyStack: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript"],
    },
    {
      category: "Backend",
      items: ["Node.js", "NestJS", "Python"],
    },
    {
      category: "Mobile",
      items: ["React Native", "Flutter"],
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MongoDB"],
    },
    {
      category: "Cloud",
      items: ["AWS", "Azure", "Google Cloud"],
    },
    {
      category: "DevOps",
      items: ["Docker", "Kubernetes", "CI/CD"],
    },
    {
      category: "AI",
      items: ["OpenAI", "LangChain", "Vector Databases"],
    },
  ] satisfies readonly TechnologyGroup[],
  faqs: [
    {
      question: "What industries do you work with?",
      answer:
        "We work with startups, FinTech, E-Commerce, Healthcare, Real Estate, Media, and Professional Services.",
    },
    {
      question: "Do you provide support after launch?",
      answer: "Yes. We provide ongoing maintenance, improvements, and support.",
    },
    {
      question: "Can you work with existing systems?",
      answer: "Yes. We can integrate, improve, or modernize existing systems.",
    },
    {
      question: "Do you build custom solutions?",
      answer: "Yes. Every solution is tailored to business requirements.",
    },
    {
      question: "Do you provide AI solutions?",
      answer:
        "Yes. We build AI assistants, chatbots, automations, and AI integrations.",
    },
  ] satisfies readonly FaqItem[],
  ctas: [
    "Let's Build Something Great Together.",
    "Ready To Scale Your Business?",
    "Let's Discuss Your Project.",
    "Transform Your Ideas Into Reality.",
    "Build Smarter. Grow Faster.",
    "Start Your Digital Transformation Today.",
  ],
  projectPlaceholders: [
    {
      label: "Featured projects",
      reason:
        "Real project names, screenshots, clients, metrics, and outcomes must be supplied before public case studies are shown.",
    },
    {
      label: "Testimonials",
      reason:
        "Client names, companies, photos, feedback, and measurable results must be supplied before testimonials are shown.",
    },
  ],
} as const;

export type MarketingContent = typeof marketingContent;
