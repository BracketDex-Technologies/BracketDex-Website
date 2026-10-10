import { marketingContent } from "@/content/marketing";
import {
  CloudDevOpsVisual,
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
    readonly ["software-flow", "ai-branch", "automation-pipeline", "cloud-topology"]
  >
>;

export const systemVisualsContract = (
  <>
    <SystemVisual variant="software" />
    <SystemVisual variant="ai" />
    <SystemVisual variant="automation" />
    <CloudDevOpsVisual groups={marketingContent.technologyStack} />
  </>
);
