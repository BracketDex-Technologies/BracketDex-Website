import { HomePage, HOMEPAGE_HERO_PLACEMENT } from "./home-page";
import { POST_HERO_STARTS_AFTER_HERO } from "./post-hero/post-hero-home";

import { marketingContent } from "@/content/marketing";

type Expect<T extends true> = T;

type HeroPlacementIsSplit = typeof HOMEPAGE_HERO_PLACEMENT extends "split" ? true : false;
type PostHeroStartsAfterHero = typeof POST_HERO_STARTS_AFTER_HERO extends true ? true : false;

export type HomePageHeroFeedbackContract = [
  Expect<HeroPlacementIsSplit>,
  Expect<PostHeroStartsAfterHero>,
];

export const homePageContract = <HomePage content={marketingContent} />;
