import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import type { MarketingContent } from "@/content/marketing";
import { buildPostHeroContent } from "@/components/home/post-hero/post-hero-content";

export function FreshCta({ content }: { content: MarketingContent }) {
  const postHero = buildPostHeroContent(content);

  return (
    <section aria-labelledby="fresh-cta-title" className="bd-fresh-cta" data-motion-section>
      <div className="content-shell">
        <div className="bd-fresh-cta__card">
          <div>
            <p className="bd-fresh-eyebrow bd-fresh-cta__eyebrow">Start a project</p>
            <h2 id="fresh-cta-title">{postHero.closingCta}</h2>
            <p>{content.company.shortDescription}</p>
          </div>
          <Link className="bd-fresh-cta__btn" href="#contact">
            Book Consultation
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
