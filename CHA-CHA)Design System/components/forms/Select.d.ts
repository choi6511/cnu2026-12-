import * as React from "react";

/** Native select with the brand's field styling and a drawn navy caret. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  size?: "sm" | "md" | "lg";
  options?: Array<string | { value: string; label: string }>;
  placeholder?: string;
}
export function Select(props: SelectProps): JSX.Element;
