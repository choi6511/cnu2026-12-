import * as React from "react";
import type { MascotName } from "./Mascot";

/** Artwork tile used in the turnaround, expression, and pose galleries. */
export interface MascotCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: MascotName;
  /** defaults to the artwork's canonical Korean/English label */
  label?: React.ReactNode;
  caption?: React.ReactNode;
  height?: number;
  basePath?: string;
  tinted?: boolean;
  selected?: boolean;
}
export function MascotCard(props: MascotCardProps): JSX.Element;
