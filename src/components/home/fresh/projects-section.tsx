import { caseStudies, featuredCaseStudies } from "@/content/case-studies";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import styles from "./projects-section.module.css";

export function ProjectsSection({ all = false }: { all?: boolean }) {
  const studies = all ? caseStudies : featuredCaseStudies;
  return (
    <section
      aria-labelledby={all ? "portfolio-title" : "fresh-projects-title"}
      className={`bd-fresh-projects ${styles.section}${all ? "" : ` bd-fresh-projects--featured ${styles.featured}`}`}
      data-motion-section
      id={all ? "portfolio" : "projects"}
    >
      <div className={`content-shell ${styles.shell}`}>
        <header className={styles.header}>
          <h2 id={all ? "portfolio-title" : "fresh-projects-title"}>{all ? "Selected projects and use cases." : "Built for everyday business."}</h2>
          <p>A few systems we’ve built to make everyday work simpler.</p>
        </header>

        <ul className={`bd-fresh-projects__grid ${styles.grid}`}>
          {studies.map((study) => {
            const labels = study.category.split(" · ");
            return (
            <li className={`bd-fresh-projects__card ${styles.card}`} data-project-card key={study.name}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{study.name}</h3>
                <Link
                  aria-label={all ? `Discuss ${study.name}` : `View ${study.name} in all projects`}
                  className={styles.cardArrow}
                  href={all ? "/contact" : "/projects"}
                >
                  <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
                </Link>
              </div>

              <div className={styles.rows}>
                <div className={styles.row} data-project-row="category">
                  <span>Category</span>
                  <p>{study.category}</p>
                </div>
                <div className={styles.row} data-project-row="summary">
                  <span>System</span>
                  <p>{study.summary}</p>
                </div>
                <div className={styles.row} data-project-row="benefit">
                  <span>Value</span>
                  <p>{study.benefit}</p>
                </div>
              </div>

              <ul aria-label={`${study.name} categories`} className={styles.labels}>
                {labels.map((label) => <li key={label}>{label}</li>)}
              </ul>
            </li>
            );
          })}
        </ul>

        {!all ? (
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/projects">
              View all projects
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </Link>
            <Link className={styles.secondaryAction} href="/contact">
              Start a project
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
