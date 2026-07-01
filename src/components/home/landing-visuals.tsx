import Link from "next/link";

type AssetSlotProps = {
  label: string;
  className?: string;
};

type MapNode = {
  label: string;
  x: string;
  y: string;
};

type ProductTask = {
  label: string;
  state: string;
};

type GuideCardProps = {
  chapter: string;
  title: string;
  href: string;
  imageLabel: string;
};

type InterfaceRowProps = {
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  imageLabel: string;
  tasks: readonly ProductTask[];
};

const wordLetters = [
  ["Q", "W", "S", "O", "F", "T", "W", "A", "R", "E", "P", "L", "A", "T", "F", "M"],
  ["A", "I", "S", "O", "L", "U", "T", "I", "O", "N", "S", "B", "V", "C", "X", "Z"],
  ["A", "U", "T", "O", "M", "A", "T", "I", "O", "N", "E", "L", "O", "P", "L", "K"],
  ["C", "L", "O", "U", "D", "D", "E", "V", "O", "P", "S", "I", "D", "E", "T", "Y"],
  ["F", "I", "N", "T", "E", "C", "H", "H", "E", "A", "L", "T", "H", "C", "A", "R"],
  ["C", "O", "N", "S", "U", "L", "T", "I", "N", "G", "B", "V", "C", "X", "Z", "Q"],
];

const highlightedWords = new Set([
  "0-1",
  "0-2",
  "0-3",
  "0-4",
  "0-5",
  "0-6",
  "0-7",
  "0-8",
  "0-9",
  "1-0",
  "1-1",
  "1-2",
  "1-3",
  "1-4",
  "1-5",
  "1-6",
  "1-7",
  "1-8",
  "1-9",
  "1-10",
  "2-0",
  "2-1",
  "2-2",
  "2-3",
  "2-4",
  "2-5",
  "2-6",
  "2-7",
  "2-8",
  "2-9",
  "3-0",
  "3-1",
  "3-2",
  "3-3",
  "3-4",
  "3-5",
  "3-6",
  "3-7",
  "3-8",
  "3-9",
  "3-10",
  "4-0",
  "4-1",
  "4-2",
  "4-3",
  "4-4",
  "4-5",
  "4-6",
  "4-8",
  "4-9",
  "4-10",
  "4-11",
  "4-12",
  "4-13",
  "5-0",
  "5-1",
  "5-2",
  "5-3",
  "5-4",
  "5-5",
  "5-6",
  "5-7",
  "5-8",
  "5-9",
]);

function highlightedEdge(row: number, column: number) {
  const key = `${row}-${column}`;
  if (!highlightedWords.has(key)) {
    return "";
  }

  const previous = `${row}-${column - 1}`;
  const next = `${row}-${column + 1}`;
  const start = highlightedWords.has(previous) ? "" : " is-highlighted-start";
  const end = highlightedWords.has(next) ? "" : " is-highlighted-end";

  return `is-highlighted${start}${end}`;
}

export function AssetSlot({ className = "", label }: AssetSlotProps) {
  return <div className={`bd-image-slot ${className}`}>{label}</div>;
}

export function OperatingMap({ nodes }: { nodes: readonly MapNode[] }) {
  return (
    <div className="bd-panel relative min-h-[28rem] overflow-hidden p-5">
      <div className="absolute inset-5 rounded-xl border border-dashed border-border bg-white/35" />
      <div className="bd-brand-font absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border border-border bg-card text-center text-xs font-semibold text-foreground shadow-soft">
        BracketDex
      </div>
      {nodes.map((node) => (
        <div
          className="absolute rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-soft"
          key={node.label}
          style={{ left: node.x, top: node.y }}
        >
          {node.label}
        </div>
      ))}
      <div className="absolute bottom-5 left-5 bd-mono text-xs text-muted-foreground">
        Workflow map image will be here
      </div>
    </div>
  );
}

export function ProductPanel({ tasks, title }: { tasks: readonly ProductTask[]; title: string }) {
  return (
    <div className="bd-panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="bd-mono text-xs text-muted-foreground">UI image will be here</p>
      </div>
      <div className="grid gap-3 p-5">
        {tasks.map((task) => (
          <div className="rounded-lg border border-border bg-card p-4" key={task.label}>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-foreground">{task.label}</p>
              <span className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground">{task.state}</span>
            </div>
          </div>
        ))}
        <div className="rounded-lg border border-dashed border-border bg-muted p-4 text-sm text-muted-foreground">
          Product interface placeholder will be replaced with custom UI assets.
        </div>
      </div>
    </div>
  );
}

export function GuideCard({ chapter, href, imageLabel, title }: GuideCardProps) {
  return (
    <Link className="group block" href={href}>
      <article className="bd-panel h-full p-8 transition-transform duration-300 group-hover:-translate-y-1">
        <p className="bd-mono text-xs text-muted-foreground">{chapter}</p>
        <h3 className="mt-3 max-w-44 text-2xl font-medium leading-none text-foreground">{title}</h3>
        <div className="my-7 h-px bg-border" />
        <AssetSlot className="min-h-[11rem]" label={imageLabel} />
        <p className="bd-mono mt-7 text-xs text-muted-foreground">Read this section</p>
      </article>
    </Link>
  );
}

export function InterfaceRow({
  description,
  href,
  imageLabel,
  linkLabel,
  tasks,
  title,
}: InterfaceRowProps) {
  return (
    <div className="grid gap-10 border-t border-border py-20 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
      <div>
        <div className="bd-icon-slot mb-10">Icon will be here</div>
        <h3 className="max-w-md text-3xl font-medium leading-tight text-foreground sm:text-4xl">{title}</h3>
        <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">{description}</p>
        <Link className="bd-mono mt-8 inline-block text-xs text-muted-foreground transition-colors hover:text-foreground" href={href}>
          {linkLabel}
        </Link>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_0.76fr]">
        <div className="bd-panel p-4">
          <AssetSlot className="min-h-[18rem]" label={imageLabel} />
        </div>
        <ProductPanel tasks={tasks} title={title} />
      </div>
    </div>
  );
}

export function WordGrid() {
  return (
    <div aria-label="Industries and capabilities word grid" className="bd-word-grid">
      {wordLetters.map((row, rowIndex) =>
        row.map((letter, columnIndex) => (
          <span className={highlightedEdge(rowIndex, columnIndex)} key={`${rowIndex}-${columnIndex}`}>
            {letter}
          </span>
        ))
      )}
    </div>
  );
}
