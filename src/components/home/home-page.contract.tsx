import { HomePage, HOMEPAGE_HERO_PLACEMENT } from "./home-page";

import { marketingContent } from "@/content/marketing";

type Expect<T extends true> = T;

type HeroPlacementIsBottomLeft = typeof HOMEPAGE_HERO_PLACEMENT extends "bottom-left" ? true : false;

export type HomePageHeroFeedbackContract = [
  Expect<HeroPlacementIsBottomLeft>,
];

export const homePageContract = <HomePage content={marketingContent} />;
