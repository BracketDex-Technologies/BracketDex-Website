import type { MarketingContent } from "@/content/marketing";

export function CapabilityIndex({ content }: { content: MarketingContent }) {
  return (
    <section
      aria-labelledby="fresh-capability-title"
      className="bd-fresh-capability"
      data-motion-section
      id="industries"
    >
      <p className="bd-fresh-eyebrow bd-fresh-capability__eyebrow">Capability index</p>
      <h2 id="fresh-capability-title">Technology depth. Industry context.</h2>
      <div className="bd-fresh-capability__grid">
        <div>
          <h3>Technologies</h3>
          {content.technologyStack.map((group) => (
            <div className="bd-fresh-capability__row" key={group.category}>
              <strong>{group.category}</strong>
              <span>{group.items.join(" · ")}</span>
            </div>
          ))}
        </div>
        <div>
          <h3>Industries we serve</h3>
          {content.industries.map((industry) => (
            <div className="bd-fresh-capability__row" key={industry.title}>
              <strong>{industry.title}</strong>
              <span>{industry.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
