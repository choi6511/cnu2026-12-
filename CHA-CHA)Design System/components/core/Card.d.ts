import * as React from "react";

/** Rounded 20px container — white fill, hairline border, soft navy shadow. */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "plain" | "elevated" | "accent" | "cream" | "inverse";
  size?: "md" | "lg";
  /** lifts 2px and deepens shadow on hover */
  interactive?: boolean;
  title?: React.ReactNode;
  /** usually a <PillLabel> */
  label?: React.ReactNode;
  children?: React.ReactNode;
}
export function Card(props: CardProps): JSX.Element;
