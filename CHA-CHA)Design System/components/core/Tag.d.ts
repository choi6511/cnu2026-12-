import * as React from "react";

/** Filter chip / keyword. Dashed variant echoes the brand sheet's dashed dividers. */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "dashed";
  selected?: boolean;
  onRemove?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}
export function Tag(props: TagProps): JSX.Element;
