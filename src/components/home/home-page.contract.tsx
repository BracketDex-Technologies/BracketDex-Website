import { HomePage, HOMEPAGE_HERO_COPY_OFFSET_PX } from "./home-page";

import { marketingContent } from "@/content/marketing";

type Expect<T extends true> = T;

type HeroCopyOffsetIsApprovedFeedback = typeof HOMEPAGE_HERO_COPY_OFFSET_PX extends 40 ? true : false;

export type HomePageHeroFeedbackContract = [
  Expect<HeroCopyOffsetIsApprovedFeedback>,
];

export const homePageContract = <HomePage content={marketingContent} />;
