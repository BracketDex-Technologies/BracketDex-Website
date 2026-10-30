"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, ChartNoAxesColumnIncreasing, House, Settings, UsersRound } from "lucide-react";
import { useState } from "react";
import { ProjectsSection } from "@/components/home/fresh/projects-section";
import { caseStudies } from "@/content/case-studies";
import { projectMatchesCategory, type ProjectCategory } from "@/content/project-categories";
import styles from "./projects-atlas.module.css";

const contexts = [
  { category: "Education", image: "education", Icon: BookOpen, lines: ["Education"] },
  { category: "Business & operations", image: "operations", Icon: ChartNoAxesColumnIncreasing, lines: ["Business &", "operations"] },
  { category: "CRM & professional services", image: "crm", Icon: UsersRound, lines: ["CRM &", "professional services"] },
  { category: "Community & lifestyle", image: "community", Icon: House, lines: ["Community", "& lifestyle"] },
  { category: "AI & automation", image: "automation", Icon: Settings, lines: ["AI &", "automation"] },
] as const;

export function ProjectAtlas() {
  const [category, setCategory] = useState<ProjectCategory>("All");
  const visibleCount = caseStudies.filter((study) => projectMatchesCategory(study.category, category)).length;

  return <>
    <section aria-labelledby="atlas-title" className={`${styles.editorial} ${styles.intro}`}>
      <div className={styles.shell}>
        <p className={styles.eyebrow}>Projects</p>
        <h1 id="atlas-title"><span>Different contexts.</span>{" "}<span>Useful systems.</span></h1>
        <p className={styles.description}>Choose a context to explore its work.</p>
        <nav aria-label="Project contexts" className={styles.contexts}>
          {contexts.map(({ category: value, image, Icon, lines }) => <button aria-label={`Show ${value} projects`} aria-pressed={category === value} className={styles.context} data-atlas-context={image} key={value} onClick={() => setCategory(value)} type="button">
            <span aria-hidden="true" className={styles.orbital}>
              <Image alt="" height={1254} priority sizes="(max-width: 700px) 136px, 18vw" src={`/media/project-atlas/${image}.png`} width={1254} />
              <Icon className={styles.contextIcon} strokeWidth={1.05} />
              <span className={styles.selectionMark} />
            </span>
            <span className={styles.contextLabel}>{lines.map((line) => <span key={line}>{line}</span>)}</span>
          </button>)}
        </nav>
        <div className={styles.toolbar}>
          <p role="status">{category === "All" ? "All sectors" : category} · {visibleCount} {visibleCount === 1 ? "project" : "projects"}</p>
          <span aria-hidden="true" className={styles.rule} />
          <div className={styles.selectWrap}>
            <select aria-label="Project context" onChange={(event) => setCategory(event.target.value as ProjectCategory)} value={category}>
              <option value="All">All sectors</option>
              {contexts.map(({ category: value }) => <option key={value} value={value}>{value}</option>)}
            </select>
            <ArrowRight aria-hidden="true" className={styles.selectArrow} size={22} strokeWidth={1.2} />
          </div>
        </div>
      </div>
    </section>
    <div className={styles.collection}><ProjectsSection all atlas filterCategory={category} /></div>
    <section aria-labelledby="project-brief-title" className={`${styles.editorial} ${styles.closing}`}>
      <div className={styles.closingTitle}><span aria-hidden="true" /><h2 id="project-brief-title">Your context may be different.</h2><span aria-hidden="true" /></div>
      <Link href="/contact?topic=project-brief">Share a project brief<ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.2} /></Link>
    </section>
  </>;
}
