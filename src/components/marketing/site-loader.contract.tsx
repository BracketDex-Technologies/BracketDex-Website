import {
  SITE_LOADER_BACKGROUND,
  SITE_LOADER_DURATION_MS,
  SITE_LOADER_SESSION_KEY,
} from "./site-loader-config";
import {
  SiteLoader,
} from "./site-loader";

type Expect<T extends true> = T;

type LoaderDurationIsFourSeconds = typeof SITE_LOADER_DURATION_MS extends 4000 ? true : false;
type LoaderUsesCharcoalBackground = typeof SITE_LOADER_BACKGROUND extends "#10100e" ? true : false;
type LoaderSessionKeyIsStable = typeof SITE_LOADER_SESSION_KEY extends "bracketdex-site-loader-seen" ? true : false;

export type SiteLoaderContract = [
  Expect<LoaderDurationIsFourSeconds>,
  Expect<LoaderUsesCharcoalBackground>,
  Expect<LoaderSessionKeyIsStable>,
];

export const siteLoaderContract = <SiteLoader />;
