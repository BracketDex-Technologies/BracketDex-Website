import {
  BoxIcon,
  CheckCircle2Icon,
  CloudIcon,
  Code2Icon,
  ContainerIcon,
  DatabaseIcon,
  GitBranchIcon,
  NetworkIcon,
  RouteIcon,
  ServerIcon,
  ShieldCheckIcon,
  WorkflowIcon,
} from "lucide-react";
import type { PostHeroVisual } from "./post-hero-content";

type VisualStep = { label: string; meta: string };

const flows: Record<PostHeroVisual, readonly VisualStep[]> = {
  software: [
    { label: "Business requirements", meta: "Discovery" },
    { label: "Application architecture", meta: "System" },
    { label: "Product interface", meta: "Experience" },
    { label: "Release pipeline", meta: "Delivery" },
  ],
  ai: [
    { label: "User request", meta: "Input" },
    { label: "Context retrieval", meta: "Knowledge" },
    { label: "Model reasoning", meta: "Intelligence" },
    { label: "Verified response", meta: "Output" },
  ],
  automation: [
    { label: "Business trigger", meta: "Event" },
    { label: "Validation rules", meta: "Control" },
    { label: "System action", meta: "Execution" },
    { label: "Audit record", meta: "Trace" },
  ],
};

export function SystemVisual({ variant }: { variant: PostHeroVisual }) {
  const labels = {
    software: "Software delivery system",
    ai: "AI solution pipeline",
    automation: "Business automation workflow",
  } as const;

  return (
    <div aria-label={labels[variant]} className="bd-system-visual" data-visual={variant}>
      <div className="bd-system-visual__bar">
        <span>{labels[variant]}</span>
        <span>Configured workflow</span>
      </div>
      <ol className="bd-system-flow">
        {flows[variant].map((step, index) => (
          <li className="bd-system-node" data-flow-step key={step.label}>
            <span className="bd-system-node__icon" aria-hidden="true">
              {index === 0 ? <RouteIcon /> : index === 1 ? <DatabaseIcon /> : index === 2 ? <WorkflowIcon /> : <CheckCircle2Icon />}
            </span>
            <strong>{step.label}</strong>
            <small>{step.meta}</small>
          </li>
        ))}
      </ol>
      <div className="bd-system-visual__status" aria-label="Workflow qualities">
        <span>
          <ShieldCheckIcon aria-hidden="true" /> Controlled
        </span>
        <span>
          <GitBranchIcon aria-hidden="true" /> Traceable
        </span>
        <span>
          <Code2Icon aria-hidden="true" /> Maintainable
        </span>
      </div>
    </div>
  );
}

export function CloudDevOpsVisual() {
  const nodes = [
    { label: "Users", Icon: NetworkIcon },
    { label: "Application", Icon: BoxIcon },
    { label: "Services", Icon: ServerIcon },
    { label: "Data", Icon: DatabaseIcon },
    { label: "Delivery", Icon: ContainerIcon },
    { label: "Cloud", Icon: CloudIcon },
  ] as const;

  return (
    <div aria-label="Cloud and DevOps capability architecture" className="bd-cloud-visual">
      {nodes.map(({ label, Icon }) => (
        <span className="bd-cloud-node" key={label}>
          <Icon aria-hidden="true" />
          {label}
        </span>
      ))}
    </div>
  );
}
