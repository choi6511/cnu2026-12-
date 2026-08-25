import * as React from "react";

/**
 * The brand sheet's signature capsule section label: Korean first, English in
 * parentheses, uppercase, with an optional ✦ sparkle beside it.
 */
export interface PillLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Korean label, e.g. "주요 포즈" */
  ko?: string;
  /** English label in caps, e.g. "POSES" */
  en?: string;
  tone?: "teal" | "navy" | "soft";
  /** show the ✦ accent (default true) */
  sparkle?: boolean;
}
export function PillLabel(props: PillLabelProps): JSX.Element;
