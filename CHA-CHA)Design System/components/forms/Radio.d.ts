import * as React from "react";

/** Circular radio — navy ring, teal dot. */
export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}
export function Radio(props: RadioProps): JSX.Element;
