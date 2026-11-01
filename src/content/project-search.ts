import { caseStudyDetails } from "./case-study-details";
import { projectMatchesCategory, type ProjectCategory } from "./project-categories";

export function matchesProjectSearch(study: { name: string; category: string; summary: string; benefit: string }, category: ProjectCategory, query: string) {
  if (!projectMatchesCategory(study.category, category, study.name)) return false;
  const details = caseStudyDetails[study.name];
  const text = [study.name, study.category, study.summary, study.benefit, ...(details ? Object.values(details) : [])].join(" ").toLowerCase();
  return query.trim().toLowerCase().split(/\s+/).every(term => text.includes(term));
}
