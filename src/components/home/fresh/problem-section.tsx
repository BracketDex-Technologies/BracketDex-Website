import type { MarketingContent } from "@/content/marketing";
import { pageContent } from "@/content/pages";
import { ProblemStoryRail, type ProblemStory } from "./problem-story-rail";
import styles from "./problem-section.module.css";

const problemSolutionPairs = [
  { groupIndex: 0, solutionIndex: 0 },
  { groupIndex: 1, solutionIndex: 3 },
  { groupIndex: 2, solutionIndex: 4 },
  { groupIndex: 3, solutionIndex: 5 },
] as const;

export function ProblemSection({ content }: { content: MarketingContent }) {
  const section = pageContent.solutions.sections[0];
  const stories = problemSolutionPairs.flatMap(({ groupIndex, solutionIndex }) => {
    const group = content.homepage.problemGroups[groupIndex];
    const solution = content.solutions[solutionIndex];
    if (!group || !solution) return [];

    return [{
      challenges: group.challenges,
      outcome: solution.outcome,
      problem: group.title,
      solution: solution.title,
    } satisfies ProblemStory];
  });

  return (
    <section aria-labelledby="home-problems-title" className={styles.section} data-home-section="problems" data-motion-section id="problems">
      <div className={styles.inner}>
        <ProblemStoryRail
          description={section.description}
          label={section.label}
          stories={stories}
          title={section.title}
        />
      </div>
    </section>
  );
}
