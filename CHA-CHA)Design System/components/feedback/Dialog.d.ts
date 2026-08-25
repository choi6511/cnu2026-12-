import * as React from "react";

/**
 * Modal. Navy scrim at 42% (no blur), 28px radius panel, springs in.

 */
export interface DialogProps {
  open?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** optional mascot cutout above the title, e.g. assets/face-thanks.png */
  mascotSrc?: string;
  size?: "md" | "lg";
  onClose?: () => void;
  /** action row, usually two <Button>s */
  footer?: React.ReactNode;
  children?: React.ReactNode;
}
export function Dialog(props: DialogProps): JSX.Element | null;
