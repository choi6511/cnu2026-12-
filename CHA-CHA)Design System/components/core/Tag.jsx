import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-tag", `
.cha-tag{display:inline-flex;align-items:center;gap:var(--space-2);border-radius:var(--radius-pill);font-family:var(--font-core);font-weight:var(--weight-medium);font-size:var(--text-sm);padding:6px 14px;background:var(--surface-card);color:var(--text-body);border:var(--border-w-hairline) solid var(--border-hairline);transition:background-color var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard)}
.cha-tag--dashed{border-style:dashed;border-color:var(--border-dashed);background:transparent}
.cha-tag--selected{background:var(--navy-900);border-color:var(--navy-900);color:var(--white);font-weight:var(--weight-bold)}
.cha-tag--clickable{cursor:pointer}
.cha-tag--clickable:hover:not(.cha-tag--selected){background:var(--surface-accent);border-color:var(--border-accent)}
.cha-tag--clickable:active{transform:var(--press-scale)}
.cha-tag__x{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border:none;background:none;padding:0;cursor:pointer;color:inherit;opacity:.7;font-size:14px;line-height:1}
.cha-tag__x:hover{opacity:1}
`);

export function Tag({ variant = "solid", selected = false, onRemove, onClick, children, className = "", ...rest }) {
  const cls = ["cha-tag", "cha-tag--" + variant, selected ? "cha-tag--selected" : "", onClick ? "cha-tag--clickable" : "", className].filter(Boolean).join(" ");
  return (
    <span className={cls} onClick={onClick} {...rest}>
      {children}
      {onRemove && <button type="button" className="cha-tag__x" aria-label="remove" onClick={(e) => { e.stopPropagation(); onRemove(e); }}>×</button>}
    </span>
  );
}
