type LoaderFrame = {
  viewportLeft?: number;
  viewportTop?: number;
  viewportWidth: number;
  viewportHeight: number;
  width: number;
  height?: number;
  target: { left: number; top: number; width: number; height: number };
};

export function getLoaderPlacement(frame: LoaderFrame, travel: number, settle: number) {
  const { viewportLeft = 0, viewportTop = 0, viewportWidth, viewportHeight, width, height = width * 103.5 / 572.25, target } = frame;
  const startX = viewportLeft + (viewportWidth - width) / 2;
  const startY = viewportTop + (viewportHeight - height) / 2;
  const scale = target.width / width;
  return {
    x: startX * (1 - travel) + target.left * travel + 6 * settle * travel,
    y: startY * (1 - travel) + target.top * travel + 3 * settle * travel,
    scale: (1 - travel + scale * travel) * (1 + 0.015 * settle * travel),
  };
}
