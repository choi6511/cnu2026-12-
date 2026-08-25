import * as React from "react";

/** Navy hover bubble for icon-only controls. */
export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  children?: React.ReactNode;
}
export function Tooltip(props: TooltipProps): JSX.Element;
