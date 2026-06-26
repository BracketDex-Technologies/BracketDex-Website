import { marketingContent } from "./marketing";

export type PageCard = {
  title: string;
  description: string;
};

export type PageSection = {
  label: string;
  title: string;
  description?: string;
  cards?: readonly PageCard[];
  list?: readonly string[];
};

export type StaticPageContent = {
  title: string;
  description: string;
  eyebrow: string;
  primaryCta?: string;
  secondaryCta?: string;
  sections: readonly PageSection[];
};

const contactCta = "Contact Us";
const projectPlaceholderCards = marketingContent.projectPlaceholders.map((placeholder) => ({
  title: placeholder.label,
  description: placeholder.reason,
}));

export const pageContent = {
  services: {
    title: "Software Development & Technology Services",
    description:
      "Custom software development, AI solutions, automation systems, cloud infrastructure, and digital growth services.",
    eyebrow: "Services",
    primaryCta: "Book Consultation",
    secondaryCta: "View Projects",
    sections: [
      {
        label: "Capabilities",
        title: "Service Categories",
        description:
          "Practical technology services for businesses that need software, automation, AI, and reliable infrastructure.",
        cards: marketingContent.services,
      },
      {
        label: "Process",
        title: "How Work Moves Forward",
        description: "A structured delivery path keeps scope, quality, and communication clear.",
        cards: marketingContent.process.map((step) => ({
          title: `${step.step}. ${step.title}`,
          description: step.description,
        })),
      },
      {
        label: "Technology",
        title: "Technology Stack",
        description: "Implementation choices stay aligned with documented modern software and cloud capabilities.",
        cards: marketingContent.technologyStack.map((group) => ({
          title: group.category,
          description: group.items.join(", "),
        })),
      },
    ],
  },
  solutions: {
    title: "Business Technology Solutions",
    description:
      "Technology solutions designed to improve efficiency, automate operations, and support business growth.",
    eyebrow: "Solutions",
    primaryCta: "Book Consultation",
    secondaryCta: "View Services",
    sections: [
      {
        label: "Problems",
        title: "Business Problems",
        description:
          "Solutions start with the operational, product, and scaling challenges documented for growing businesses.",
        cards: marketingContent.homepage.problemGroups.map((group) => ({
          title: group.title,
          description: group.challenges.join(", "),
        })),
      },
      {
        label: "Outcomes",
        title: "Solution Categories",
        description: "Each category is framed around the business outcome it supports.",
        cards: marketingContent.solutions.map((solution) => ({
          title: solution.title,
          description: solution.outcome,
        })),
      },
      {
        label: "Case Studies",
        title: "Proof Requires Real Project Data",
        description:
          "Case studies will be added only after real project names, industries, problems, solutions, technologies, outcomes, and screenshots are available.",
        cards: projectPlaceholderCards,
      },
    ],
  },
  industries: {
    title: "Industry-Specific Technology Solutions",
    description:
      "Software and technology solutions tailored for startups, FinTech, healthcare, e-commerce, real estate, and more.",
    eyebrow: "Industries",
    primaryCta: "Book Consultation",
    secondaryCta: "View Solutions",
    sections: [
      {
        label: "Industries",
        title: "Industry Grid",
        description:
          "Domain-aware software and automation for operations, workflows, platforms, and customer experiences.",
        cards: marketingContent.industries,
      },
      {
        label: "Challenges",
        title: "Common Industry Challenges",
        description: "Each industry page should stay focused on real business pain points before proposing technology.",
        list: [
          "Manual operations and disconnected systems",
          "Legacy software that limits growth",
          "Scalability, integrations, and reporting needs",
        ],
      },
      {
        label: "Case Studies",
        title: "Industry Case Studies",
        description:
          "Industry case studies will remain placeholders until real project details and permission to publish are available.",
        cards: projectPlaceholderCards,
      },
    ],
  },
  whyChooseUs: {
    title: "Why Choose BracketDex",
    description:
      "Business-focused technology work with practical pricing, transparent communication, scalable architecture, and long-term support.",
    eyebrow: "Why Choose Us",
    primaryCta: "Book Consultation",
    secondaryCta: "View Projects",
    sections: [
      {
        label: "Principles",
        title: "Core Principles",
        description: "The working model favors clarity, simplicity, practical technology, and long-term value.",
        cards: marketingContent.whyChooseUs,
      },
      {
        label: "Comparison",
        title: "Outcome-Focused Partnership",
        description:
          "The documented positioning is not feature vending. BracketDex should read as a strategic technology partner.",
        cards: [
          {
            title: "Traditional Agency",
            description: "Feature-focused, limited support, short-term engagement.",
          },
          {
            title: "BracketDex Technologies",
            description: "Outcome-focused, strategic partnership, long-term collaboration.",
          },
        ],
      },
      {
        label: "Client Stories",
        title: "Client Stories Require Permission",
        description:
          "Testimonials, client names, companies, feedback, and measurable results must be supplied before this page presents them as proof.",
        cards: projectPlaceholderCards,
      },
    ],
  },
  projects: {
    title: "Projects & Case Studies",
    description:
      "Explore software projects, AI solutions, automation systems, and technology case studies delivered by BracketDex Technologies.",
    eyebrow: "Projects",
    primaryCta: contactCta,
    secondaryCta: "View Services",
    sections: [
      {
        label: "Portfolio",
        title: "Case Studies Need Real Evidence",
        description:
          "Public project pages should answer what problem existed, what was built, why it was built, and what outcome was achieved.",
        cards: projectPlaceholderCards,
      },
      {
        label: "Format",
        title: "Case Study Structure",
        description: "Every project should follow a consistent format before publication.",
        list: [
          "Client, industry, and project category",
          "Business problem and solution",
          "Technologies used and measurable results",
          "Desktop, tablet, and mobile screenshots",
        ],
      },
    ],
  },
  about: {
    title: "About BracketDex Technologies",
    description:
      "Learn about BracketDex Technologies, our mission, vision, and commitment to helping businesses grow through technology.",
    eyebrow: "About",
    primaryCta: contactCta,
    secondaryCta: "View Services",
    sections: [
      {
        label: "Story",
        title: "Company Story",
        description:
          "BracketDex Technologies was founded with a simple goal: make high-quality technology solutions accessible to growing businesses.",
      },
      {
        label: "Mission and Vision",
        title: "Why The Company Exists",
        cards: [
          {
            title: "Mission",
            description: marketingContent.company.mission,
          },
          {
            title: "Vision",
            description: marketingContent.company.vision,
          },
        ],
      },
      {
        label: "Values",
        title: "Core Values",
        list: [
          "Quality First",
          "Simplicity",
          "Transparency",
          "Innovation",
          "Long-Term Partnership",
          "Continuous Improvement",
        ],
      },
      {
        label: "Achievements",
        title: "Achievements Need Source Data",
        description:
          "Awards, certifications, client logos, metrics, and leadership details will remain unpublished until accurate source information is supplied.",
      },
    ],
  },
  blog: {
    title: "Blog",
    description:
      "Helpful writing on software development, AI, automation, cloud, product development, technology trends, and industry insights.",
    eyebrow: "Blog",
    primaryCta: contactCta,
    secondaryCta: "View Services",
    sections: [
      {
        label: "Topics",
        title: "Content Categories",
        description: "Blog content should educate visitors, demonstrate expertise, and generate qualified organic traffic.",
        list: [
          "Software Development",
          "AI & Automation",
          "Business Technology",
          "Cloud & DevOps",
          "Case Studies",
          "Startup Growth",
          "Industry Insights",
        ],
      },
      {
        label: "Upcoming",
        title: "Article Placeholders",
        description:
          "Articles will be added through the approved MDX content phase. Until then, this page avoids thin placeholder posts.",
        cards: [
          {
            title: "How Custom Software Helps Businesses Scale",
            description: "Planned SEO topic from the documented blog strategy.",
          },
          {
            title: "AI Automation for Small Businesses",
            description: "Planned SEO topic from the documented blog strategy.",
          },
          {
            title: "Choosing the Right Technology Stack",
            description: "Planned SEO topic from the documented blog strategy.",
          },
        ],
      },
    ],
  },
  contact: {
    title: "Contact BracketDex Technologies",
    description:
      "Discuss your project, software requirements, AI initiatives, or automation goals with our team.",
    eyebrow: "Contact",
    sections: [
      {
        label: "Start",
        title: "Let's Discuss Your Project",
        description:
          "Have an idea, project, or business challenge? Let's discuss how technology can help achieve your goals.",
      },
      {
        label: "Contact Details",
        title: "Business Details Pending",
        description:
          "Email, phone, location, calendar, and social links should be added only after verified business contact details are supplied.",
      },
    ],
  },
} satisfies Record<string, StaticPageContent>;
