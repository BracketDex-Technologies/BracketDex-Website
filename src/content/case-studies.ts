/** Short public descriptions. No demo credentials or private operating details. */
export const caseStudies = [
  { name: "WiseMelon", category: "Education · Manufacturing", summary: "School ID-card production with online data collection, AI-assisted photo preparation, review, and batch export.", benefit: "Less repetitive preparation for teams working with 50+ schools." },
  { name: "ReManage Society", category: "Housing · SaaS", summary: "One place for society maintenance, resident communication, and visitor management at the gate.", benefit: "Helps committees, residents, and guards coordinate everyday work." },
  { name: "Samavet", category: "Community · Operations", summary: "Digital contribution receipts and event workflows for trusts, temples, mandals, and community groups.", benefit: "Clearer records and easier sharing for organisers and contributors." },
  { name: "NativeBerry", category: "Agriculture · Supply chain", summary: "A strawberry business workspace for orders, deliveries, payments, leads, and expenses.", benefit: "Day-to-day supply chain information in one view." },
  { name: "CreativeMark Hub", category: "Agency · Operations", summary: "An agency workspace connecting client records, leads, projects, quotations, schedules, and reporting.", benefit: "Fewer disconnected tools for field and office teams." },
  { name: "Regulatory Services Portal", category: "Professional services · Web", summary: "A responsive multi-page website with clear service pages and an official regulatory announcements feed.", benefit: "A simpler way for visitors to explore services and relevant updates." },
  { name: "QuoteFlow", category: "Local business · Documents", summary: "A lightweight tool that turns entered customer and service details into a formatted PDF quotation.", benefit: "Quicker quotations without rebuilding documents by hand." },
  { name: "Easy ITR Filing", category: "Finance · Guided software", summary: "A guided experience for identifying an income-tax return category, with a crypto tax calculator.", benefit: "Makes the initial filing journey easier to navigate." },
  { name: "RMM", category: "Community · Administration", summary: "An organisation workspace for contribution slips, vendor records, expenses, and event paperwork.", benefit: "Less fragmented administration for community teams." },
  { name: "Praja", category: "Civic work · Workflow", summary: "A constituency workspace for organising outreach and tracking public work requests.", benefit: "A clearer view of requests and follow-up work." },
  { name: "Network Compass", category: "Business community · Discovery", summary: "A place to discover and compare networking groups, meetups, and trade events.", benefit: "Helps professionals find relevant communities and organisers present events." },
  { name: "Gym Engine", category: "Fitness · Management", summary: "A shared workspace for gym administrators, trainers, and members to manage memberships and progress.", benefit: "Daily gym information organised by role." },
  { name: "Group Trek Bot", category: "Travel · Group planning", summary: "A simple group-code tool for splitting trip expenses and coordinating vehicles and meals.", benefit: "Trip planning without requiring every participant to create an account." },
  { name: "Smart Tap AI", category: "Local business · Customer feedback", summary: "A QR standee and web experience that drafts review suggestions for customers to choose from and edit.", benefit: "An easier starting point for customers who want to share feedback in their own words." },
  { name: "Schedule Poster Studio", category: "Media · OCR automation", summary: "A local workflow that converts structured schedule documents into editable records and print-ready poster artwork for commercial teams.", benefit: "Consistent vector PDFs, combined documents, and PNG assets from one reviewed source." },
] as const;

export const featuredCaseStudies = caseStudies.slice(0, 4);

export const caseStudyCards = caseStudies.map((study) => ({
  title: study.name,
  description: `${study.summary} ${study.benefit}`,
}));
