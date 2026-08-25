import * as React from "react";

/** Capsule notification that pops in with --ease-bounce. */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "navy" | "light" | "accent" | "danger";
  title?: React.ReactNode;
  /** small mascot face at the leading edge */
  mascotSrc?: string;
  onClose?: () => void;
  children?: React.ReactNode;
}
export function Toast(props: ToastProps): JSX.Element;
