import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-radio", `
.cha-radio{display:inline-flex;align-items:flex-start;gap:var(--space-3);font-family:var(--font-core);font-size:var(--text-base);color:var(--text-body);cursor:pointer;line-height:20px}
.cha-radio input{position:absolute;opacity:0;width:0;height:0}
.cha-radio__dot{flex:none;width:20px;height:20px;border-radius:var(--radius-pill);border:var(--border-w-strong) solid var(--navy-900);background:var(--surface-card);display:flex;align-items:center;justify-content:center;transition:border-color var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-bounce)}
.cha-radio__dot::after{content:"";width:10px;height:10px;border-radius:var(--radius-pill);background:var(--teal-500);opacity:0;transform:scale(.4);transition:opacity var(--dur-fast) var(--ease-standard),transform var(--dur-base) var(--ease-bounce)}
.cha-radio input:checked + .cha-radio__dot::after{opacity:1;transform:scale(1)}
.cha-radio input:focus-visible + .cha-radio__dot{box-shadow:var(--shadow-focus)}
.cha-radio:active .cha-radio__dot{transform:var(--press-scale)}
.cha-radio input:disabled + .cha-radio__dot{border-color:var(--gray-400);background:var(--gray-050)}
.cha-radio--disabled{color:var(--action-disabled-text);cursor:not-allowed}
`);

export function Radio({ label, className = "", disabled, ...rest }) {
  return (
    <label className={["cha-radio", disabled ? "cha-radio--disabled" : "", className].filter(Boolean).join(" ")}>
      <input type="radio" disabled={disabled} {...rest} />
      <span className="cha-radio__dot" />
      {label && <span>{label}</span>}
    </label>
  );
}
