import { pageContent, type StaticPageContent } from "./pages";
export const routedPages: Record<string, StaticPageContent> = {
  ...pageContent,
  faq: { title: "Questions, answered clearly.", description: "Direct answers about BracketDex services and working style.", eyebrow: "FAQ", sections: [] },
};
