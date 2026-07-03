import {
  Navbar,
  NAVBAR_CONTROL_HEIGHT_PX,
  NAVBAR_CONTROL_RADIUS_PX,
  NAVBAR_IS_STICKY,
  NAVBAR_LOGO_TEXT,
  NAVBAR_WORDMARK_DOCK_SELECTOR,
} from "./navbar";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
] as const;

type Expect<T extends true> = T;

type LogoTextIsBracketDex = typeof NAVBAR_LOGO_TEXT extends "BracketDex" ? true : false;
type ReferenceRadiusIsEight = typeof NAVBAR_CONTROL_RADIUS_PX extends 8 ? true : false;
type NavbarStaysSticky = typeof NAVBAR_IS_STICKY extends true ? true : false;
type ReferenceControlHeightIsThirtyTwo = typeof NAVBAR_CONTROL_HEIGHT_PX extends 32 ? true : false;
type WordmarkDockSelectorIsStable = typeof NAVBAR_WORDMARK_DOCK_SELECTOR extends "[data-site-wordmark]" ? true : false;

export type NavbarContract = [
  Expect<LogoTextIsBracketDex>,
  Expect<ReferenceRadiusIsEight>,
  Expect<NavbarStaysSticky>,
  Expect<ReferenceControlHeightIsThirtyTwo>,
  Expect<WordmarkDockSelectorIsStable>,
];

export const navbarContract = (
  <Navbar
    activeHref="/services"
    brandName="BracketDex Technologies"
    ctaHref="/contact"
    ctaLabel="Book Consultation"
    items={navigation}
  />
);
