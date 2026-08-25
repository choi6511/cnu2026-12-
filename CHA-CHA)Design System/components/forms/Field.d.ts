import * as React from "react";

/** Label + hint/error wrapper shared by Input and Select. */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
  children?: React.ReactNode;
}
export function Field(props: FieldProps): JSX.Element;
