import {
  Navbar,
  NAVBAR_CONTROL_HEIGHT_PX,
} from "./navbar";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
] as const;

type Expect<T extends true> = T;

type ControlHeightIsFortyFour = typeof NAVBAR_CONTROL_HEIGHT_PX extends 44 ? true : false;

export type NavbarContract = [
  Expect<ControlHeightIsFortyFour>,
];

export const navbarContract = (
  <Navbar
    activeHref="#services"
    brandName="BracketDex Technologies"
    ctaHref="#contact"
    ctaLabel="Book Consultation"
    items={navigation}
  />
);
