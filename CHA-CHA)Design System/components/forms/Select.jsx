import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-select", `
.cha-select-wrap{position:relative;display:block}
.cha-select{width:100%;height:var(--control-h-md);appearance:none;font-family:var(--font-core);font-size:var(--text-base);color:var(--text-strong);background:var(--surface-card);border:var(--border-w-hairline) solid var(--border-hairline);border-radius:var(--radius-field);padding:0 40px 0 var(--space-4);box-shadow:var(--shadow-inset-field);cursor:pointer;transition:border-color var(--dur-fast) var(--ease-standard),box-shadow var(--dur-base) var(--ease-standard)}
.cha-select:hover:not(:disabled){border-color:var(--border-accent)}
.cha-select:focus{outline:none;border-color:var(--teal-500);box-shadow:var(--shadow-focus)}
.cha-select:disabled{background:var(--gray-050);color:var(--action-disabled-text);cursor:not-allowed}
.cha-select--sm{height:var(--control-h-sm);font-size:var(--text-sm)}
.cha-select--lg{height:var(--control-h-lg);font-size:var(--text-lg)}
.cha-select__caret{position:absolute;right:14px;top:50%;transform:translateY(-50%);pointer-events:none;width:10px;height:10px;border-right:2px solid var(--navy-900);border-bottom:2px solid var(--navy-900);rotate:45deg;margin-top:-3px}
`);

export function Select({ size = "md", options = [], placeholder, className = "", children, ...rest }) {
  const cls = ["cha-select", size !== "md" ? "cha-select--" + size : "", className].filter(Boolean).join(" ");
  return (
    <span className="cha-select-wrap">
      <select className={cls} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (typeof o === "string" ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>))}
        {children}
      </select>
      <span className="cha-select__caret" aria-hidden="true" />
    </span>
  );
}
