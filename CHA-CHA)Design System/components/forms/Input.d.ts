import * as React from "react";

/**
 * Text field — 14px radius, inset hairline, teal focus ring.

 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  /** leading Lucide glyph */
  icon?: React.ReactNode;
  /** render a textarea instead */
  multiline?: boolean;
}
export function Input(props: InputProps): JSX.Element;
