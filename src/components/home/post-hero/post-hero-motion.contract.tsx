import {
  PostHeroMotion,
  POST_HERO_FLOW_TARGET,
  POST_HERO_MOTION_SCOPE,
} from "./post-hero-motion";

type Expect<T extends true> = T;
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;

export type PostHeroMotionContract = [
  Expect<Equal<typeof POST_HERO_MOTION_SCOPE, "[data-post-hero-design]">>,
  Expect<Equal<typeof POST_HERO_FLOW_TARGET, "[data-flow-step] > .bd-system-node__icon">>,
];

export const postHeroMotionContract = <PostHeroMotion />;
