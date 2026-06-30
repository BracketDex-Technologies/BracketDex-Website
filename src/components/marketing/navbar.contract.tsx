import { Navbar, NAVBAR_CONTROL_RADIUS_PX, NAVBAR_LOGO_TEXT } from "./navbar";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
] as const;

type Expect<T extends true> = T;

type LogoTextIsBracketDex = typeof NAVBAR_LOGO_TEXT extends "BracketDex" ? true : false;
type ReferenceRadiusIsEight = typeof NAVBAR_CONTROL_RADIUS_PX extends 8 ? true : false;

export type NavbarContract = [
  Expect<LogoTextIsBracketDex>,
  Expect<ReferenceRadiusIsEight>,
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
