import {
  BadgeCheckIcon,
  BlocksIcon,
  HandshakeIcon,
  MessagesSquareIcon,
  RocketIcon,
  ScanEyeIcon,
  TrendingUpIcon,
} from "lucide-react";

import type { MarketingContent } from "@/content/marketing";

const icons = [
  BadgeCheckIcon,
  RocketIcon,
  ScanEyeIcon,
  TrendingUpIcon,
  BlocksIcon,
  HandshakeIcon,
  MessagesSquareIcon,
] as const;

export function WhySection({ content }: { content: MarketingContent }) {
  return (
    <section
      aria-labelledby="fresh-why-title"
      className="bd-fresh-why"
      data-motion-section
    >
      <div className="content-shell">
        <p className="bd-fresh-eyebrow">Why BracketDex</p>
        <div className="bd-fresh-why__head">
          <h2 id="fresh-why-title">A partner, not a vendor.</h2>
          <p>Business-first thinking, transparent communication, and architecture built for growth.</p>
        </div>
        <ul className="bd-fresh-why__grid">
          {content.whyChooseUs.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li className="bd-fresh-why__card" key={item.title}>
                <span aria-hidden="true" className="bd-fresh-why__icon">
                  <Icon />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
