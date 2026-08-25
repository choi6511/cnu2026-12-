import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-switch", `
.cha-switch{display:inline-flex;align-items:center;gap:var(--space-3);font-family:var(--font-core);font-size:var(--text-base);color:var(--text-body);cursor:pointer}
.cha-switch input{position:absolute;opacity:0;width:0;height:0}
.cha-switch__track{flex:none;width:44px;height:26px;border-radius:var(--radius-pill);background:var(--gray-200);padding:3px;display:flex;align-items:center;transition:background-color var(--dur-base) var(--ease-standard)}
.cha-switch__knob{width:20px;height:20px;border-radius:var(--radius-pill);background:var(--white);box-shadow:var(--shadow-xs);transition:transform var(--dur-base) var(--ease-bounce)}
.cha-switch input:checked + .cha-switch__track{background:var(--teal-500)}
.cha-switch input:checked + .cha-switch__track .cha-switch__knob{transform:translateX(18px)}
.cha-switch input:focus-visible + .cha-switch__track{box-shadow:var(--shadow-focus)}
.cha-switch input:disabled + .cha-switch__track{background:var(--gray-050);border:1px solid var(--gray-200)}
.cha-switch--disabled{color:var(--action-disabled-text);cursor:not-allowed}
`);

export function Switch({ label, className = "", disabled, ...rest }) {
  return (
    <label className={["cha-switch", disabled ? "cha-switch--disabled" : "", className].filter(Boolean).join(" ")}>
      <input type="checkbox" role="switch" disabled={disabled} {...rest} />
      <span className="cha-switch__track"><span className="cha-switch__knob" /></span>
      {label && <span>{label}</span>}
    </label>
  );
}
