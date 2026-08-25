import * as React from "react";

/** Small status/count marker. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "navy" | "teal" | "blush" | "neutral" | "success" | "warning" | "danger";
  variant?: "solid" | "soft";
  size?: "sm" | "md";
  children?: React.ReactNode;
}
export function Badge(props: BadgeProps): JSX.Element;
