import Link from "next/link";

import type { NavigationItem } from "@/content/marketing";
import { logoFont } from "./logo-font";
import { NAVBAR_LOGO_TEXT } from "./navbar";

type FooterProps = {
  brandName: string;
  description: string;
  navigation: readonly NavigationItem[];
};

export function Footer({ brandName, navigation }: FooterProps) {
  return (
    <footer className="bd-fresh-footer">
      <div className="content-shell bd-fresh-footer__top">
        <nav aria-label="Footer navigation" className="bd-fresh-footer__nav">
          {navigation.map((item) => (
            <Link className="bd-fresh-footer__link" href={item.href} key={item.href}>
              {item.label === "Contact" ? "Contact us" : item.label}
            </Link>
          ))}
        </nav>
        <address className="bd-fresh-footer__contact">
          <a href="mailto:bracketdex@gmail.com">E-mail: bracketdex@gmail.com</a>
          <span>Pune, India</span>
        </address>
      </div>
      <p aria-hidden="true" className="bd-fresh-footer__word">
        <span
          className="bd-wordmark bd-fresh-footer__logo"
          data-site-wordmark
          style={{ fontFamily: logoFont.style.fontFamily }}
        >
          {`{${NAVBAR_LOGO_TEXT}}`}
        </span>
      </p>
      <div className="content-shell">
        <p className="bd-fresh-footer__base">
          © {new Date().getFullYear()} {brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
