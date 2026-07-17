import {
  BellIcon,
  BoxIcon,
  CheckCircle2Icon,
  CircleDotIcon,
  CloudIcon,
  Code2Icon,
  DatabaseIcon,
  GitBranchIcon,
  Globe2Icon,
  MailCheckIcon,
  PackageCheckIcon,
  PlayIcon,
  RefreshCwIcon,
  SearchIcon,
  ServerIcon,
  ShieldCheckIcon,
  SparklesIcon,
  SplitIcon,
  WebhookIcon,
  WorkflowIcon,
} from "lucide-react";

import type { PostHeroVisual } from "./post-hero-content";

export const SYSTEM_VISUAL_LAYOUTS = [
  "order-fulfillment",
  "ai-orchestration",
  "automation-pipeline",
  "cloud-topology",
] as const;

function ActiveStatus() {
  return (
    <span className="bd-diagram-active">
      <span aria-hidden="true" /> Active
    </span>
  );
}

function IllustrativeLabel() {
  return <span className="bd-diagram-demo">Illustrative UI</span>;
}

export function OrderFulfillmentVisual() {
  return (
    <div
      aria-label="Illustrative order fulfilment software workflow"
      className="bd-system-visual bd-order-visual"
      data-visual="software"
      role="group"
    >
      <div className="bd-diagram-bar">
        <div>
          <span>Order Fulfillment Flow</span>
          <ActiveStatus />
          <IllustrativeLabel />
        </div>
        <div className="bd-diagram-actions" aria-hidden="true">
          <span>Edit</span>
          <span className="is-primary"><PlayIcon /> Publish</span>
        </div>
      </div>

      <div className="bd-order-workspace">
        <div className="bd-order-rail" aria-hidden="true">
          <Code2Icon />
          <CircleDotIcon />
          <ShieldCheckIcon />
          <WorkflowIcon />
          <DatabaseIcon />
          <RefreshCwIcon />
        </div>
        <div className="bd-order-canvas">
          <div className="bd-flow-card bd-order-new" data-diagram-node>
            <CircleDotIcon aria-hidden="true" />
            <span><strong>New Order</strong><small>Trigger</small></span>
          </div>
          <div className="bd-flow-card bd-order-validate" data-diagram-node>
            <ShieldCheckIcon aria-hidden="true" />
            <span><strong>Validate Order</strong><small>Service</small></span>
          </div>
          <div className="bd-order-decision" data-diagram-node>
            <span>Inventory<br />Available?</span>
          </div>
          <span className="bd-order-yes">Yes</span>
          <span className="bd-order-no">No</span>
          <div className="bd-flow-card bd-order-create" data-diagram-node>
            <PackageCheckIcon aria-hidden="true" />
            <span><strong>Create Shipment</strong><small>Service</small></span>
          </div>
          <div className="bd-flow-card bd-order-confirm" data-diagram-node>
            <MailCheckIcon aria-hidden="true" />
            <span><strong>Send Confirmation</strong><small>Email</small></span>
          </div>
          <div className="bd-flow-card bd-order-backorder" data-diagram-node>
            <DatabaseIcon aria-hidden="true" />
            <span><strong>Backorder</strong><small>Service</small></span>
          </div>
        </div>
      </div>

      <dl className="bd-run-summary">
        <div><dt>Run</dt><dd>#1267</dd></div>
        <div><dt>Last run</dt><dd>2m ago</dd></div>
        <div><dt>Status</dt><dd className="is-success">Success</dd></div>
        <div><dt>Duration</dt><dd>4.2s</dd></div>
        <div><dt>Record</dt><dd>Example run</dd></div>
      </dl>
    </div>
  );
}

const aiRuns = [
  ["run_8f9c1a", "Completed", "1.42s", "1,298", "$0.013", "2m ago"],
  ["run_7b7ec9", "Completed", "1.18s", "1,192", "$0.011", "6m ago"],
  ["run_1a7eb3", "Completed", "2.05s", "1,842", "$0.019", "12m ago"],
] as const;

export function AiOrchestrationVisual() {
  return (
    <div
      aria-label="Illustrative AI orchestration workflow with run history"
      className="bd-system-visual bd-ai-visual"
      data-visual="ai"
      role="group"
    >
      <div className="bd-diagram-bar">
        <div><span>AI workflow orchestration</span><IllustrativeLabel /></div>
        <div className="bd-diagram-actions" aria-hidden="true">
          <span><Code2Icon /></span>
          <span className="is-primary"><PlayIcon /> Run workflow</span>
        </div>
      </div>

      <div className="bd-ai-canvas">
        <div className="bd-ai-node bd-ai-input" data-diagram-node>
          <WebhookIcon aria-hidden="true" /><span><strong>User Request</strong><small>Input</small></span>
        </div>
        <div className="bd-ai-node bd-ai-intent" data-diagram-node>
          <SparklesIcon aria-hidden="true" /><span><strong>Intent Classifier</strong><small>Model</small></span>
        </div>
        <div className="bd-ai-branch">
          <div className="bd-ai-node" data-diagram-node>
            <SearchIcon aria-hidden="true" /><span><strong>Knowledge Search</strong><small>Tool</small></span>
          </div>
          <div className="bd-ai-node" data-diagram-node>
            <DatabaseIcon aria-hidden="true" /><span><strong>SQL Query</strong><small>Tool</small></span>
          </div>
        </div>
        <div className="bd-ai-node bd-ai-response" data-diagram-node>
          <SparklesIcon aria-hidden="true" /><span><strong>Response Generator</strong><small>Model</small></span>
        </div>
        <div className="bd-ai-node bd-ai-output" data-diagram-node>
          <CheckCircle2Icon aria-hidden="true" /><span><strong>Deliver Response</strong><small>Output</small></span>
        </div>
      </div>

      <div className="bd-data-panel">
        <div className="bd-data-tabs" aria-hidden="true"><span className="is-active">Runs</span><span>Traces</span><span>Logs</span></div>
        <div className="bd-data-table" role="table" aria-label="Illustrative AI workflow runs">
          <div className="bd-data-row is-heading" role="row">
            {['Run ID', 'Status', 'Latency', 'Tokens', 'Cost', 'Started'].map((item) => <span key={item} role="columnheader">{item}</span>)}
          </div>
          {aiRuns.map((row) => (
            <div className="bd-data-row" role="row" key={row[0]}>
              {row.map((item, index) => <span className={index === 1 ? "is-success" : undefined} key={item} role="cell">{item}</span>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const automationRuns = [
  ["exec_45a2d7", "Success", "23s", "1m ago", "Webhook"],
  ["exec_37f991", "Success", "18s", "6m ago", "API"],
  ["exec_9c1d22", "Success", "27s", "14m ago", "Scheduler"],
  ["exec_b6e8d3", "Success", "21s", "32m ago", "Webhook"],
] as const;

export function AutomationPipelineVisual() {
  return (
    <div
      aria-label="Illustrative business automation pipeline with execution history"
      className="bd-system-visual bd-automation-visual"
      data-visual="automation"
      role="group"
    >
      <div className="bd-diagram-bar">
        <div><span>Automation pipeline</span><ActiveStatus /><IllustrativeLabel /></div>
        <div className="bd-diagram-updated">Last updated 2h ago <RefreshCwIcon aria-hidden="true" /></div>
      </div>

      <div className="bd-automation-canvas">
        <div className="bd-auto-node bd-auto-order" data-diagram-node>
          <CircleDotIcon aria-hidden="true" /><span><strong>Order Created</strong><small>Trigger</small></span>
        </div>
        <div className="bd-auto-node bd-auto-validate" data-diagram-node>
          <ShieldCheckIcon aria-hidden="true" /><span><strong>Validate Order</strong><small>Step</small></span>
        </div>
        <div className="bd-auto-branch">
          <div className="bd-auto-node" data-diagram-node>
            <DatabaseIcon aria-hidden="true" /><span><strong>Payment Check</strong><small>Step</small></span>
          </div>
          <div className="bd-auto-node" data-diagram-node>
            <PackageCheckIcon aria-hidden="true" /><span><strong>Inventory Check</strong><small>Step</small></span>
          </div>
        </div>
        <div className="bd-auto-node bd-auto-update" data-diagram-node>
          <RefreshCwIcon aria-hidden="true" /><span><strong>Update Systems</strong><small>Step</small></span>
        </div>
        <div className="bd-auto-node bd-auto-notify" data-diagram-node>
          <BellIcon aria-hidden="true" /><span><strong>Notify Customer</strong><small>Step</small></span>
        </div>
      </div>

      <div className="bd-data-panel bd-execution-table">
        <div className="bd-data-table" role="table" aria-label="Illustrative automation executions">
          <div className="bd-data-row is-heading" role="row">
            {['Execution ID', 'Status', 'Duration', 'Started', 'Triggered by'].map((item) => <span key={item} role="columnheader">{item}</span>)}
          </div>
          {automationRuns.map((row) => (
            <div className="bd-data-row" role="row" key={row[0]}>
              {row.map((item, index) => <span className={index === 1 ? "is-success" : undefined} key={item} role="cell">{item}</span>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SystemVisual({ variant }: { variant: PostHeroVisual }) {
  if (variant === "software") return <OrderFulfillmentVisual />;
  if (variant === "ai") return <AiOrchestrationVisual />;
  return <AutomationPipelineVisual />;
}

export function CloudDevOpsVisual() {
  return (
    <div aria-label="Illustrative deployment terminal and cloud architecture" className="bd-cloud-visual" role="group">
      <div className="bd-deploy-terminal">
        <div><span>bracketdev@infra:~$</span> deploy preview</div>
        <pre>{`› Planning...\n› Building containers...\n› Pushing image...\n› Applying manifests...\n› Running migrations...\n› Health check...\n› Deployment successful ✓\n\nEnvironment: preview\nURL: preview.app.bracketdev.dev\n\nbracketdev@infra:~$ ▮`}</pre>
      </div>

      <div className="bd-cloud-topology">
        <div className="bd-topology-node bd-topology-users" data-diagram-node><Globe2Icon aria-hidden="true" /> Users</div>
        <div className="bd-topology-node bd-topology-edge" data-diagram-node><CloudIcon aria-hidden="true" /> CDN / Edge</div>
        <div className="bd-topology-node bd-topology-load" data-diagram-node><SplitIcon aria-hidden="true" /> Load Balancer</div>
        <div className="bd-topology-services">
          <div className="bd-topology-node" data-diagram-node><BoxIcon aria-hidden="true" /> App Service</div>
          <div className="bd-topology-node" data-diagram-node><ServerIcon aria-hidden="true" /> API Service</div>
          <div className="bd-topology-node" data-diagram-node><WorkflowIcon aria-hidden="true" /> Worker Service</div>
        </div>
        <div className="bd-topology-data">
          <div className="bd-topology-node" data-diagram-node><DatabaseIcon aria-hidden="true" /> PostgreSQL</div>
          <div className="bd-topology-node" data-diagram-node><DatabaseIcon aria-hidden="true" /> Redis</div>
          <div className="bd-topology-node" data-diagram-node><CloudIcon aria-hidden="true" /> Object Storage</div>
        </div>
        <div className="bd-topology-node bd-topology-monitor" data-diagram-node><GitBranchIcon aria-hidden="true" /> Monitoring / Alerts</div>
      </div>
    </div>
  );
}
