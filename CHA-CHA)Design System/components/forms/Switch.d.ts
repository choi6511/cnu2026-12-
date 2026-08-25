import * as React from "react";

/** Capsule toggle — grey off, teal on, knob springs with --ease-bounce. */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}
export function Switch(props: SwitchProps): JSX.Element;
