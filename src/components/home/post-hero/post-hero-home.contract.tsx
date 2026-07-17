import { marketingContent } from "@/content/marketing";
import {
  PostHeroHome,
  POST_HERO_DESIGN,
  POST_HERO_STARTS_AFTER_HERO,
} from "./post-hero-home";

type Expect<T extends true> = T;
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;

export type PostHeroHomeContract = [
  Expect<Equal<typeof POST_HERO_DESIGN, "dark-systems-lab">>,
  Expect<Equal<typeof POST_HERO_STARTS_AFTER_HERO, true>>,
];

export const postHeroHomeContract = <PostHeroHome content={marketingContent} />;
