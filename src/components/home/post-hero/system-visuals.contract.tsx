import {
  AiOrchestrationVisual,
  AutomationPipelineVisual,
  CloudDevOpsVisual,
  OrderFulfillmentVisual,
  SystemVisual,
  SYSTEM_VISUAL_LAYOUTS,
} from "./system-visuals";

type Expect<T extends true> = T;
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;

export type SystemVisualsContract = Expect<
  Equal<
    typeof SYSTEM_VISUAL_LAYOUTS,
    readonly ["order-fulfillment", "ai-orchestration", "automation-pipeline", "cloud-topology"]
  >
>;

export const systemVisualsContract = (
  <>
    <OrderFulfillmentVisual />
    <AiOrchestrationVisual />
    <AutomationPipelineVisual />
    <SystemVisual variant="software" />
    <SystemVisual variant="ai" />
    <SystemVisual variant="automation" />
    <CloudDevOpsVisual />
  </>
);
