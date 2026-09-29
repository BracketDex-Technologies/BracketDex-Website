import { AlertCircleIcon } from "lucide-react";

import type { MarketingContent } from "@/content/marketing";

export function ProblemSection({ content }: { content: MarketingContent }) {
  return (
    <section
      aria-labelledby="fresh-problems-title"
      className="bd-fresh-problems"
      data-motion-section
    >
      <div className="content-shell">
        <p className="bd-fresh-eyebrow">Problems we solve</p>
        <div className="bd-fresh-problems__head">
          <h2 id="fresh-problems-title">Real business friction, named clearly.</h2>
          <p>{content.company.mission} We start from pain, then shape software around it.</p>
        </div>
        <ul className="bd-fresh-problems__grid">
          {content.homepage.problemGroups.map((group) => (
            <li className="bd-fresh-problems__card" key={group.title}>
              <span aria-hidden="true" className="bd-fresh-trust__icon bd-fresh-trust__icon--card">
                <AlertCircleIcon />
              </span>
              <h3>{group.title}</h3>
              <ul>
                {group.challenges.map((challenge) => (
                  <li key={challenge}>{challenge}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
