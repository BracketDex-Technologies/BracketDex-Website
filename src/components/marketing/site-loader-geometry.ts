type LoaderFrame = {
  viewportWidth: number;
  viewportHeight: number;
  width: number;
  height: number;
  target: { left: number; top: number; width: number; height: number };
};

export function getLoaderPlacement(frame: LoaderFrame, travel: number, settle: number) {
  const { viewportWidth, viewportHeight, width, height, target } = frame;
  const startX = (viewportWidth - width) / 2;
  const startY = (viewportHeight - height) / 2;
  const scale = target.width / width;
  return {
    x: startX * (1 - travel) + target.left * travel + 6 * settle * travel,
    y: startY * (1 - travel) + target.top * travel + 3 * settle * travel,
    scale: (1 - travel + scale * travel) * (1 + 0.015 * settle * travel),
  };
}
