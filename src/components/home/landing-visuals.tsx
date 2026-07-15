import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BellIcon,
  CheckCircle2Icon,
  Code2Icon,
  LayoutDashboardIcon,
  Layers3Icon,
  RefreshCwIcon,
  RocketIcon,
  SearchIcon,
  WorkflowIcon,
} from "lucide-react";

type AssetSlotProps = {
  label: string;
  className?: string;
};

type WorkflowStep = {
  step: string;
  title: string;
  detail: string;
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

const workflowIcons = [SearchIcon, WorkflowIcon, Code2Icon, RocketIcon, RefreshCwIcon] as const;

const workspaceTasks = [
  { label: "Design system", state: "Complete" },
  { label: "Core workflow", state: "In progress" },
  { label: "Launch checklist", state: "Ready" },
] as const;

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

export function OperatingMap({ steps }: { steps: readonly WorkflowStep[] }) {
  return (
    <section aria-labelledby="delivery-workflow-title" className="bd-panel overflow-hidden p-6 sm:p-8">
      <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="bd-mono text-xs uppercase text-muted-foreground">Delivery workflow</p>
          <h3 className="mt-3 max-w-md text-3xl font-normal leading-tight text-foreground" id="delivery-workflow-title">
            From business need to working system
          </h3>
        </div>
        <p className="max-w-64 text-sm leading-6 text-muted-foreground">
          One visible path keeps priorities, decisions, delivery, and release aligned.
        </p>
      </div>

      <ol className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {steps.map((item, index) => {
          const Icon = workflowIcons[index % workflowIcons.length];

          return (
            <li className="relative min-w-0" key={item.step}>
              <div className="h-full min-h-44 rounded-lg border border-border bg-card p-4 shadow-soft">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-10 place-items-center rounded-md border border-border bg-background text-foreground">
                    <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
                  </span>
                  <span className="bd-mono text-[0.68rem] text-muted-foreground">{item.step}</span>
                </div>
                <h4 className="mt-7 text-xl font-medium leading-none text-foreground">{item.title}</h4>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </div>
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -right-2 top-1/2 z-10 hidden size-4 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-[0.65rem] text-muted-foreground xl:flex"
                >
                  <ArrowRightIcon className="size-2.5" strokeWidth={1.8} />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <CheckCircle2Icon aria-hidden="true" className="size-4 text-foreground" />
          Clear ownership
        </span>
        <span className="inline-flex items-center gap-2">
          <CheckCircle2Icon aria-hidden="true" className="size-4 text-foreground" />
          Visible milestones
        </span>
        <span className="inline-flex items-center gap-2">
          <CheckCircle2Icon aria-hidden="true" className="size-4 text-foreground" />
          Continuous improvement
        </span>
      </div>
    </section>
  );
}

export function ProductWorkspacePreview({ imageSrc }: { imageSrc: string }) {
  return (
    <section aria-label="Demo product delivery workspace" className="bd-panel overflow-hidden">
      <div className="flex min-h-12 items-center justify-between border-b border-border bg-card px-4">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="size-2 rounded-full bg-foreground/25" />
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/10" />
        </div>
        <p className="bd-mono text-[0.68rem] text-muted-foreground">Demo product interface</p>
        <BellIcon aria-hidden="true" className="size-4 text-muted-foreground" strokeWidth={1.7} />
      </div>

      <div className="grid min-h-[31rem] grid-cols-[3.4rem_minmax(0,1fr)]">
        <aside aria-label="Demo workspace navigation" className="flex flex-col items-center gap-3 border-r border-border bg-foreground py-4 text-background">
          <span className="bd-brand-font grid size-8 place-items-center rounded-md bg-background text-xs text-foreground">B</span>
          {[LayoutDashboardIcon, Layers3Icon, WorkflowIcon].map((Icon, index) => (
            <span
              className={`grid size-8 place-items-center rounded-md ${index === 0 ? "bg-background/16" : "text-background/55"}`}
              key={Icon.displayName ?? index}
            >
              <Icon aria-hidden="true" className="size-4" strokeWidth={1.7} />
            </span>
          ))}
        </aside>

        <div className="min-w-0 bg-background p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="bd-mono text-[0.68rem] uppercase text-muted-foreground">Product delivery</p>
              <h3 className="mt-2 text-2xl font-normal leading-none text-foreground">Operations workspace</h3>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              On track
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["Scope", "Approved"],
              ["Build", "Active"],
              ["Release", "Prepared"],
            ].map(([label, value]) => (
              <div className="border-l border-border pl-3" key={label}>
                <p className="text-[0.68rem] uppercase text-muted-foreground">{label}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-5 min-h-44 overflow-hidden rounded-lg border border-border bg-foreground">
            <Image
              alt="Abstract demo visual inside the product workspace"
              className="object-cover opacity-65"
              fill
              sizes="(min-width: 1024px) 34vw, 90vw"
              src={imageSrc}
            />
            <div className="absolute inset-0 bg-foreground/32" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-background">
              <div>
                <p className="bd-mono text-[0.65rem] uppercase text-background/65">Live environment</p>
                <p className="mt-1 text-base font-semibold">Release preview</p>
              </div>
              <span className="grid size-9 place-items-center rounded-md bg-background text-foreground">
                <ArrowUpRightIcon aria-hidden="true" className="size-4" />
              </span>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase text-foreground">Delivery board</p>
              <p className="bd-mono text-[0.65rem] text-muted-foreground">Current sprint</p>
            </div>
            <div className="mt-2 divide-y divide-border border-y border-border">
              {workspaceTasks.map((task) => (
                <div className="flex items-center justify-between gap-4 py-2.5" key={task.label}>
                  <p className="text-xs font-medium text-foreground">{task.label}</p>
                  <span className="text-[0.68rem] text-muted-foreground">{task.state}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
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
