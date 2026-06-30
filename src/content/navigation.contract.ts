import { seoRoutes } from "@/lib/seo";

import { marketingContent } from "./marketing";
import { pageContent } from "./pages";

type Expect<T extends true> = T;

type NavigationHref = (typeof marketingContent.navigation)[number]["href"];
type PageContentKey = keyof typeof pageContent;
type SeoPath = (typeof seoRoutes)[number]["path"];
type SolutionSectionTitle = (typeof pageContent.solutions.sections)[number]["title"];

type HasNoBlogRoute = Extract<NavigationHref | SeoPath, "/blog"> extends never ? true : false;
type HasNoBlogContent = "blog" extends PageContentKey ? false : true;
type SolutionsCarryWhyChooseContent = Extract<
  SolutionSectionTitle,
  "Why Choose BracketDex"
> extends never
  ? false
  : true;

export type NavigationContract = [
  Expect<HasNoBlogRoute>,
  Expect<HasNoBlogContent>,
  Expect<SolutionsCarryWhyChooseContent>,
];
