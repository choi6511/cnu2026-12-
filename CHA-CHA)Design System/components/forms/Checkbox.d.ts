import * as React from "react";

/** Square 20px checkbox with a 2px navy outline — the mascot's line weight. */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
