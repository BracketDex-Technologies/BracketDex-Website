"use client";

import { useState } from "react";
import { caseStudies, featuredCaseStudies } from "@/content/case-studies";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import styles from "./projects-section.module.css";
import { caseStudyDetails } from "@/content/case-study-details";
import { matchesProjectSearch } from "@/content/project-search";
import { projectCategories as categories, type ProjectCategory } from "@/content/project-categories";

export function ProjectsSection({ all = false, atlas = false, filterCategory, searchQuery = "" }: { all?: boolean; atlas?: boolean; filterCategory?: ProjectCategory; searchQuery?: string }) {
  const studies = all ? caseStudies : featuredCaseStudies;
  const [localCategory, setCategory] = useState<ProjectCategory>("All");
  const category = filterCategory ?? localCategory;
  const visibleStudies = studies.filter((study) => matchesProjectSearch(study, category, searchQuery));
  return (
    <section
      aria-labelledby={all ? "portfolio-title" : "fresh-projects-title"}
      className={`bd-fresh-projects ${styles.section}${all ? "" : ` bd-fresh-projects--featured ${styles.featured}`}`}
      data-motion-section
      id={all ? "portfolio" : "projects"}
    >
      <div className={`content-shell ${styles.shell}`}>
        {atlas ? <h2 className="sr-only" id="portfolio-title">Projects</h2> : <header className={styles.header}>
          <h2 id={all ? "portfolio-title" : "fresh-projects-title"}>{all ? "Selected projects and use cases." : "Built for everyday business."}</h2>
          <p>A few systems we’ve built to make everyday work simpler.</p>
        </header>}

        {all && !atlas && <nav className={styles.filters} aria-label="Project categories">
          {categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </nav>}
        {all && !atlas && <p className={styles.resultCount} role="status">{visibleStudies.length} {visibleStudies.length === 1 ? "project" : "projects"} · {category}</p>}
        <ul className={`bd-fresh-projects__grid ${styles.grid}`}>
          {visibleStudies.map((study) => {
            const labels = study.category.split(" · ");
            const detail = caseStudyDetails[study.name];
            return (
            <li className={`bd-fresh-projects__card ${styles.card}`} data-project-card key={study.name}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{study.name}</h3>
              </div>

              <div className={styles.rows}>
                <div className={styles.row} data-project-row="category">
                  <span>Category</span>
                  <p>{detail?.focus ?? study.category}</p>
                </div>
                {detail && <div className={styles.row}><span>Problem</span><p>{detail.problem}</p></div>}
                <div className={styles.row} data-project-row="summary">
                  <span>{detail ? "Solution" : "System"}</span>
                  <p>{study.summary}</p>
                </div>
                {detail && <div className={styles.row}><span>Technology</span><p>{detail.technology}</p></div>}
                <div className={styles.row} data-project-row="benefit">
                  <span>{detail ? "Result" : "Value"}</span>
                  <p>{study.benefit}</p>
                </div>
              </div>

              <ul aria-label={`${study.name} categories`} className={styles.labels}>
                {labels.map((label) => <li key={label}>{label}</li>)}
              </ul>
              {all && <Link className={styles.projectEnquiry} href={`/contact?project=${encodeURIComponent(study.name)}`}>Discuss a similar project<span className="sr-only"> to {study.name}</span><ArrowUpRight aria-hidden="true" size={16} /></Link>}
            </li>
            );
          })}
        </ul>
        {visibleStudies.length === 0 && <p className={styles.emptyResults}>No projects match these filters. Try a different search or clear the filters above.</p>}

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
