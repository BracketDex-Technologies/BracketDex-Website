import styles from "./industry-card.module.css";

type IndustryCardProps = { title: string; description: string };

export function IndustryCard({ description, title }: IndustryCardProps) {
  return (
    <article className={styles.card} data-industry-card>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
