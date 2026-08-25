import * as React from "react";

/**
 * Primary action control. Capsule shaped, 700 weight, navy by default.

 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** navy solid | teal solid | navy outline | text-only teal */
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  /** stretch to the container width */
  full?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** render as another element, e.g. "a" */
  as?: "button" | "a";
  children?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;
