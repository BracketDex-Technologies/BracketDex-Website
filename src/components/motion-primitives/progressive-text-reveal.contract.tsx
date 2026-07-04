import {
  PROGRESSIVE_TEXT_REVEAL_DURATION_MS,
  PROGRESSIVE_TEXT_REVEAL_ROOT_CLASS,
  PROGRESSIVE_TEXT_REVEAL_VISIBLE_CLASS,
  ProgressiveTextReveal,
} from "./progressive-text-reveal";

type Expect<T extends true> = T;

type RevealDurationIsHalfSecond = typeof PROGRESSIVE_TEXT_REVEAL_DURATION_MS extends 500 ? true : false;
type RootClassIsStable = typeof PROGRESSIVE_TEXT_REVEAL_ROOT_CLASS extends "bd-progressive-text-active" ? true : false;
type VisibleClassIsStable = typeof PROGRESSIVE_TEXT_REVEAL_VISIBLE_CLASS extends "bd-text-effect-visible" ? true : false;

export type ProgressiveTextRevealContract = [
  Expect<RevealDurationIsHalfSecond>,
  Expect<RootClassIsStable>,
  Expect<VisibleClassIsStable>,
];

export const progressiveTextRevealContract = <ProgressiveTextReveal />;
