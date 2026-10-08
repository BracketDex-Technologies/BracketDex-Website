import { caseStudies, featuredCaseStudies } from "@/content/case-studies";
import { BadgeCheck, Building2, Sprout, Users, BriefcaseBusiness } from "lucide-react";

const projectIcons = [BadgeCheck, Building2, Users, Sprout];

export function ProjectsSection({ all = false }: { all?: boolean }) {
  const studies = all ? caseStudies : featuredCaseStudies;
  return (
    <section aria-labelledby={all ? "portfolio-title" : "fresh-projects-title"} className={`bd-fresh-projects${all ? "" : " bd-fresh-projects--featured"}`} data-motion-section id={all ? "portfolio" : "projects"}>
      <div className="content-shell">
        <p className="bd-fresh-eyebrow">20+ projects delivered</p>
        <div className="bd-fresh-why__head">
          <h2 id={all ? "portfolio-title" : "fresh-projects-title"}>{all ? "Selected projects and use cases." : "Built for everyday business."}</h2>
          <p>Real businesses. Everyday challenges. A few of the systems we’ve built to make work simpler.</p>
        </div>
        <ul className="bd-fresh-projects__grid">
          {studies.map((study, index) => {
            const Icon = projectIcons[index] ?? BriefcaseBusiness;
            return (
            <li className="bd-fresh-projects__card" key={study.name}>
              <div className="bd-case-topline" aria-hidden="true">
                <span className="bd-case-icon"><Icon size={23} strokeWidth={1.6} /></span>
                <span className="bd-case-number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <p className="bd-case-category">{study.category}</p>
              <h3>{study.name}</h3>
              <p className="bd-case-summary">{study.summary}</p>
              <div className="bd-case-result">
                <span className="bd-case-result-label">The difference</span>
                <p className="bd-case-highlight">{study.benefit}</p>
              </div>
            </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
