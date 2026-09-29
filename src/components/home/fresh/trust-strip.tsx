import {
  CrosshairIcon,
  LayersIcon,
  MessagesSquareIcon,
  WrenchIcon,
} from "lucide-react";

import type { MarketingContent } from "@/content/marketing";

const trustItems = [
  { key: "focused", Icon: CrosshairIcon },
  { key: "transparent", Icon: MessagesSquareIcon },
  { key: "scalable", Icon: LayersIcon },
  { key: "support", Icon: WrenchIcon },
] as const;

export function TrustStrip({ content }: { content: MarketingContent }) {
  const pick = [
    content.whyChooseUs[3],
    content.whyChooseUs[6],
    content.whyChooseUs[4],
    content.whyChooseUs[5],
  ];

  const stack = content.technologyStack.flatMap((group) => [...group.items]);
  const marquee = [...stack, ...stack];

  return (
    <div className="bd-fresh-trust" data-fresh="trust">
      <section
        aria-label="Why businesses trust BracketDex"
        className="bd-fresh-trust__light"
        data-motion-section
      >
        <ul className="content-shell bd-fresh-trust__row">
          {pick.map((item, i) => {
            const { Icon } = trustItems[i];
            return (
              <li className="bd-fresh-trust__item" key={item.title}>
                <span aria-hidden="true" className="bd-fresh-trust__icon">
                  <Icon />
                </span>
                <span className="bd-fresh-trust__text">
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-label="Technology stack"
        className="bd-fresh-trust__dark"
        data-motion-section
      >
        <div className="content-shell bd-fresh-trust__marquee-wrap">
          <p className="bd-fresh-trust__label">
            Built on
            <br />
            modern stack
          </p>
          <div className="bd-fresh-trust__marquee" role="presentation">
            <div className="bd-fresh-trust__track">
              {marquee.map((tech, i) => (
                <span
                  aria-hidden={i >= stack.length}
                  className="bd-fresh-trust__logo"
                  key={`${tech}-${i}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
