import { marketingContent } from "@/content/marketing";
import {
  buildPostHeroContent,
  POST_HERO_THEME_TOGGLE,
  type PostHeroContent,
} from "./post-hero-content";

type Expect<T extends true> = T;
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;

const content: PostHeroContent = buildPostHeroContent(marketingContent);

export type PostHeroContentContract = [
  Expect<Equal<typeof POST_HERO_THEME_TOGGLE, false>>,
  Expect<Equal<(typeof content.serviceChapters)[number]["visual"], "software" | "ai" | "automation">>,
];

export const postHeroContentContract = content;
