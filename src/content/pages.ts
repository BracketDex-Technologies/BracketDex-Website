import { marketingContent } from "./marketing";
import { caseStudyCards } from "./case-studies";

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
        title: "Practical Solutions In Action",
        description:
          "From school ID cards to community operations: a glimpse of how we turn recurring work into useful software.",
        cards: caseStudyCards,
      },
      {
        label: "Why BracketDex",
        title: "Why Choose BracketDex",
        description:
          "The solution model favors business-first thinking, transparent communication, scalable architecture, and long-term value.",
        cards: marketingContent.whyChooseUs,
      },
      {
        label: "Partnership",
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
          "Selected work across education, community organisations, housing societies, and professional services.",
        cards: caseStudyCards,
      },
    ],
  },
  projects: {
    title: "Projects & Case Studies",
    description:
      "Explore selected software, AI, automation, and digital operations work delivered by BracketDex Technologies.",
    eyebrow: "Projects",
    primaryCta: contactCta,
    secondaryCta: "View Services",
    sections: [],
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
        label: "Operating Principles",
        title: "How We Work Together",
        description:
          "Seven practical principles keep communication clear, ownership visible, and delivery dependable.",
        cards: [
          {
            title: "DAD / ID",
            description:
              "What is not in writing has never been said or discussed. We use DAD — Discuss, Agree, and Document — or ID — Inform and Document — as the situation requires.",
          },
          {
            title: "No SPOFs",
            description:
              "We avoid bottlenecks by designing for no single points of failure and sharing context across the team.",
          },
          {
            title: "PQR through Accurate Speed",
            description:
              "We deliver Performance, Quality, and Reliability by moving with accuracy and intention.",
          },
          {
            title: "No Negative Bonding",
            description:
              "We aim to be the best-performing team by building trust, staying constructive, and refusing to bond through negativity.",
          },
          {
            title: "Know the Why",
            description:
              "We understand why we are doing what we are doing. Clarity helps us explain, align, and make better decisions.",
          },
          {
            title: "R u G’ing The JD?",
            description:
              "Are we getting the job done? When we find a missing link, we highlight it to the team and take ownership to fix it.",
          },
          {
            title: "Chew, Digest, Deliver",
            description:
              "We assess the work on our plate and choose the next items according to our RPK index and SPPS SMART goals, so the other six principles remain achievable.",
          },
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
} as const satisfies Record<string, StaticPageContent>;
