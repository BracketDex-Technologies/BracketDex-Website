import { HomePage, HOMEPAGE_HERO_PLACEMENT } from "./home-page";
import { HeroWorkflow } from "./hero-workflow";

import { marketingContent } from "@/content/marketing";

type Expect<T extends true> = T;

type HeroPlacementIsCentered = typeof HOMEPAGE_HERO_PLACEMENT extends "centered" ? true : false;

export type HomePageHeroFeedbackContract = [
  Expect<HeroPlacementIsCentered>,
];

export const homePageContract = <HomePage content={marketingContent} />;

export const heroWorkflowContract = (
  <HeroWorkflow activeLabel="AI Automation" steps={marketingContent.homepage.heroWorkflow} />
);
