import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-checkbox", `
.cha-check{display:inline-flex;align-items:flex-start;gap:var(--space-3);font-family:var(--font-core);font-size:var(--text-base);color:var(--text-body);cursor:pointer;line-height:20px}
.cha-check input{position:absolute;opacity:0;width:0;height:0}
.cha-check__box{flex:none;width:20px;height:20px;border-radius:var(--radius-xs);border:var(--border-w-strong) solid var(--navy-900);background:var(--surface-card);display:flex;align-items:center;justify-content:center;transition:background-color var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-bounce)}
.cha-check__tick{width:10px;height:6px;border-left:2px solid var(--white);border-bottom:2px solid var(--white);rotate:-45deg;opacity:0;transform:scale(.6);transition:opacity var(--dur-fast) var(--ease-standard),transform var(--dur-base) var(--ease-bounce);margin-top:-2px}
.cha-check input:checked + .cha-check__box{background:var(--navy-900)}
.cha-check input:checked + .cha-check__box .cha-check__tick{opacity:1;transform:scale(1)}
.cha-check input:focus-visible + .cha-check__box{box-shadow:var(--shadow-focus)}
.cha-check:active .cha-check__box{transform:var(--press-scale)}
.cha-check input:disabled + .cha-check__box{border-color:var(--gray-400);background:var(--gray-050)}
.cha-check--disabled{color:var(--action-disabled-text);cursor:not-allowed}
`);

export function Checkbox({ label, className = "", disabled, ...rest }) {
  return (
    <label className={["cha-check", disabled ? "cha-check--disabled" : "", className].filter(Boolean).join(" ")}>
      <input type="checkbox" disabled={disabled} {...rest} />
      <span className="cha-check__box"><span className="cha-check__tick" /></span>
      {label && <span>{label}</span>}
    </label>
  );
}
