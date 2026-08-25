import * as React from "react";

/**
 * Section switcher — capsule pills (brand-forward) or teal underline (dense UI).

 */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<string | { value: string; label: React.ReactNode; count?: number }>;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "pill" | "underline";
}
export function Tabs(props: TabsProps): JSX.Element;
