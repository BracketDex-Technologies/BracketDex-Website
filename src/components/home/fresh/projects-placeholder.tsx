import Link from "next/link";
import { ArrowRightIcon, FolderOpenIcon, QuoteIcon } from "lucide-react";

import type { MarketingContent } from "@/content/marketing";

export function ProjectsPlaceholder({ content }: { content: MarketingContent }) {
  const [featured, testimonials] = content.projectPlaceholders;

  return (
    <section
      aria-labelledby="fresh-projects-title"
      className="bd-fresh-projects"
      data-motion-section
    >
      <div className="content-shell">
        <p className="bd-fresh-eyebrow">Projects</p>
        <div className="bd-fresh-why__head">
          <h2 id="fresh-projects-title">Case studies need real evidence.</h2>
          <p>
            Public pages answer what problem existed, what shipped, and what outcome
            followed — published only with real data.
          </p>
        </div>
        <ul className="bd-fresh-projects__grid">
          <li className="bd-fresh-projects__card">
            <span aria-hidden="true" className="bd-fresh-why__icon">
              <FolderOpenIcon />
            </span>
            <h3>{featured.label}</h3>
            <p>{featured.reason}</p>
          </li>
          <li className="bd-fresh-projects__card">
            <span aria-hidden="true" className="bd-fresh-why__icon">
              <QuoteIcon />
            </span>
            <h3>{testimonials.label}</h3>
            <p>{testimonials.reason}</p>
          </li>
        </ul>
        <Link className="bd-fresh-projects__link" href="/contact">
          Start your project
          <ArrowRightIcon aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
