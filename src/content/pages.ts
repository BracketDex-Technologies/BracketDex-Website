import { marketingContent } from "./marketing";
import { caseStudyCards } from "./case-studies";
import { contactDetails } from "@/lib/site";

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
        label: "Metrics",
        title: "Measured progress, shared carefully",
        description:
          "A few grounded outcomes from systems we have delivered and initiatives we are building in public.",
        cards: [
          {
            title: "ID-card manufacturing",
            description:
              "An AI-assisted school ID-card workflow helped the delivery operation achieve an 8× increase in business while reducing repetitive preparation and avoidable errors.",
          },
          {
            title: "Digital mandal operations",
            description:
              "Samavet is our first-of-its-kind digital platform for mandals, helping connect brands and mandals while making contribution and event workflows easier to manage.",
          },
          {
            title: "GreenPune initiative",
            description:
              "Our citizen-led urban greening initiative for Pune supports better coordination around native tree planting, neighbourhood participation, and long-term care.",
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
  privacy: {
    title: "Privacy Policy",
    description:
      "How BracketDex Technologies handles information when you browse our website or contact us about a project.",
    eyebrow: "Privacy",
    primaryCta: "Contact Us",
    sections: [
      {
        label: "Scope",
        title: "Your information and this website",
        description:
          "This Privacy Policy covers the BracketDex Technologies website and enquiries made through it. It explains what information the website processes, why it is used, and how to contact us with a privacy question. Last updated: 31 October 2026.",
      },
      {
        label: "What We Collect",
        title: "Information you choose to share",
        cards: [
          { title: "Project enquiries", description: "The contact form asks for your name, email address, optional company name, and a message about your requirements. Please avoid including passwords, payment details, or sensitive personal information in your message." },
          { title: "How the form works", description: "Your form entries are sent to the website server for validation. If validation succeeds, the site opens a draft in your email application. You choose whether to send that email. The contact endpoint does not save the enquiry to a database or send it automatically." },
          { title: "Technical information", description: "The contact endpoint temporarily holds an IP address and request timestamps in server memory to limit repeated submissions. Hosting and network providers may also process technical information needed to deliver and secure the website, such as IP addresses, requested pages, and browser details." },
        ],
      },
      {
        label: "Use",
        title: "Why we use this information",
        description:
          "Information you send by email helps us respond to your enquiry, understand your requirements, discuss a proposal, and maintain the correspondence needed for that conversation. The website also processes technical information to validate submissions and limit abusive traffic.",
      },
      {
        label: "Browser Storage",
        title: "Cookies and analytics",
        description:
          "The website currently does not integrate advertising trackers or Google Analytics, and it does not store analytics consent or theme preferences in your browser. External services you choose to open from the website may use their own cookies and tracking technologies under their own policies.",
      },
      {
        label: "External Services",
        title: "Email and third-party links",
        description:
          "When you send an enquiry, your email provider and our email provider process the message to deliver and store the correspondence. The website also relies on hosting and network services to serve its pages. Links to other websites take you to services with their own privacy practices; review their policies before sharing information with them.",
      },
      {
        label: "Retention",
        title: "Storage and security",
        description:
          "Sent enquiries become email correspondence. How long a message needs to be kept depends on the enquiry, any resulting business relationship, and applicable record-keeping requirements. The contact endpoint keeps its rate-limit records in temporary server memory rather than a permanent enquiry database. No online service or email system can guarantee complete security; avoid sending confidential credentials through this form or by email.",
      },
      {
        label: "Your Choices",
        title: "Questions about your information",
        description:
          `You can choose not to submit the form or send the email draft. If you have already contacted us, email ${contactDetails.email} to ask about information you shared, request a correction, or request deletion of correspondence. We may need to confirm your identity and understand which messages your request concerns. The rights and exceptions that apply depend on applicable law.`,
      },
      {
        label: "Contact and Updates",
        title: "Contact BracketDex Technologies",
        description:
          `For privacy enquiries, email ${contactDetails.email} or write to BracketDex Technologies, ${contactDetails.location}. This policy may change when the website or its information-handling practices change. The updated policy and its revision date will appear on this page.`,
      },
    ],
  },
} as const satisfies Record<string, StaticPageContent>;
