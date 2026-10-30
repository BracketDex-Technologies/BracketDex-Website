export const projectCategories = ["All", "CRM & professional services", "Business & operations", "Education", "Community & lifestyle", "AI & automation"] as const;
export type ProjectCategory = typeof projectCategories[number];

const projectGroups: Readonly<Record<string, ProjectCategory>> = {
  Education: "Education",
  Housing: "Business & operations", Community: "Community & lifestyle",
  Agriculture: "Business & operations", Agency: "Business & operations",
  "Professional services": "CRM & professional services", "Home interiors": "CRM & professional services",
  "Local business": "Business & operations", Finance: "CRM & professional services",
  "Civic work": "Community & lifestyle", "Business community": "Community & lifestyle",
  Fitness: "Community & lifestyle", Travel: "Community & lifestyle", Media: "AI & automation",
};

export function projectMatchesCategory(category: string, selected: ProjectCategory) {
  return selected === "All" || projectGroups[category.split(" · ")[0]] === selected;
}
