import * as React from "react";

/**
 * Typed accessor for the extracted 차차 artwork — reference poses by name
 * instead of hardcoding file paths.

 */
export type MascotName =
  | "front" | "three-quarter-front" | "side" | "three-quarter-back" | "back"
  | "basic" | "joy" | "cheer" | "think" | "surprise" | "thanks"
  | "cheering" | "studying" | "running" | "together"
  | "wordmark" | "lockup" | "cnu";

export interface MascotProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name?: MascotName;
  /** rendered height, px number or CSS length */
  height?: number | string;
  /** path to the design system's assets/ folder, relative to the consuming page */
  basePath?: string;
  /** soft ground shadow (default true) */
  shadow?: boolean;
  /** gentle 4s vertical float — hero use only */
  float?: boolean;
}
export function Mascot(props: MascotProps): JSX.Element;
export const MASCOT_NAMES: MascotName[];
export const MASCOT_LABELS: Record<MascotName, string>;
