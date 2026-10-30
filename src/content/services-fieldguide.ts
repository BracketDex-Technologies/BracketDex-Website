export const serviceFieldguide = {
  title: "The service fieldguide",
  chapters: [
    { id: "build", label: "Build" },
    { id: "intelligence", label: "Intelligence" },
    { id: "operations", label: "Operations" },
    { id: "infrastructure", label: "Infrastructure" },
    { id: "growth", label: "Growth" },
  ],
  software: {
    label: "Build / Software Development",
    title: "A useful product starts with a clear boundary",
    details: [
      { title: "What takes shape", description: "Web and mobile experiences, working software, connected data." },
      { title: "What needs definition", description: "Who uses it, what it changes, and where it connects." },
    ],
    layers: [
      { title: "Interface", description: "What people see and do." },
      { title: "Logic", description: "How it works and connects." },
      { title: "Data", description: "What it stores and shares." },
    ],
    action: "Talk through a software scope",
    href: "/contact?service=software-development",
  },
  ai: {
    label: "Intelligence / AI Solutions",
    title: "Make intelligence part of the work.",
    description: "A place for AI to assist, a point for people to review, and a clear next action.",
    action: "Explore AI possibilities",
    href: "/contact?service=ai-solutions",
    stages: [
      { title: "Document", description: "Information in various forms." },
      { title: "Assistant", description: "Understands, organises and suggests." },
      { title: "Human review", description: "People validate, add context and decide." },
      { title: "Decision", description: "Action in your systems." },
    ],
  },
  supporting: [
    {
      id: "operations", label: "Operations / Business Automation", title: "Which handoff repeats?",
      description: "Turn recurring steps into reliable automation, with the right people in the loop.",
      action: "Map an automation opportunity", href: "/contact?service=business-automation",
      image: "automation", alt: "Documents pass through an automation step to three reviewed tasks.",
    },
    {
      id: "infrastructure", label: "Infrastructure / Cloud & DevOps", title: "What must stay dependable?",
      description: "Design, build and operate infrastructure that is secure, observable and ready for what’s next.",
      action: "Discuss your infrastructure", href: "/contact?service=cloud-devops",
      image: "cloud", alt: "Cloud infrastructure connects servers, a security shield and an observability chart.",
    },
    {
      id: "growth", label: "Growth / Digital Growth", title: "Where does attention become action?",
      description: "Turn interest into meaningful engagement across web, product and campaigns.",
      action: "Plan a growth initiative", href: "/contact?service=digital-growth",
      image: "growth", alt: "A rising chart connects a digital experience with its audience.",
    },
  ],
} as const;
