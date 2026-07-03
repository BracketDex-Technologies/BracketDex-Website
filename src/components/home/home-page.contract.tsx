import { HomePage, HOMEPAGE_HERO_PLACEMENT } from "./home-page";

import { marketingContent } from "@/content/marketing";

type Expect<T extends true> = T;

type HeroPlacementIsTopCenter = typeof HOMEPAGE_HERO_PLACEMENT extends "top-center" ? true : false;

export type HomePageHeroFeedbackContract = [
  Expect<HeroPlacementIsTopCenter>,
];

export const homePageContract = <HomePage content={marketingContent} />;
