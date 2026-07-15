import { OperatingMap, ProductWorkspacePreview } from "./landing-visuals";

const workflowSteps = [
  { step: "01", title: "Discover", detail: "Business goals and constraints" },
  { step: "02", title: "Design", detail: "Experience and system direction" },
  { step: "03", title: "Build", detail: "Product and automation delivery" },
] as const;

export const landingVisualsContract = (
  <>
    <OperatingMap steps={workflowSteps} />
    <ProductWorkspacePreview imageSrc="/media/hero-background.webp" />
  </>
);
