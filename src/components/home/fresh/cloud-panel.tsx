import type { MarketingContent } from "@/content/marketing";
import { CloudDevOpsVisual } from "@/components/home/post-hero/system-visuals";

export function CloudPanel({ content }: { content: MarketingContent }) {
  const service = content.services[3];
  const groups = content.technologyStack.filter(
    (group) => group.category === "Cloud" || group.category === "DevOps",
  );

  return (
    <section className="bd-cloud-panel" data-motion-section aria-labelledby="cloud-title">
      <div className="bd-cloud-panel__copy">
        <p className="bd-post-kicker">Infrastructure</p>
        <h2 id="cloud-title">{service.title}</h2>
        <p className="bd-cloud-panel__description">{service.description}</p>
        <dl className="bd-cloud-panel__groups">
          {groups.map((group) => (
            <div key={group.category}>
              <dt>{group.category}</dt>
              <dd>{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </div>
      <CloudDevOpsVisual groups={groups} />
    </section>
  );
}
