import * as React from "react";

/** Square-footprint circular button for a single Lucide glyph. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "solid" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  /** required: becomes aria-label and title */
  label: string;
  children?: React.ReactNode;
}
export function IconButton(props: IconButtonProps): JSX.Element;
