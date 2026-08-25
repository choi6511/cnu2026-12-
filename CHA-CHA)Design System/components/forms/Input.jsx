import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-input", `
.cha-input-wrap{position:relative;display:flex;align-items:center}
.cha-input{width:100%;height:var(--control-h-md);font-family:var(--font-core);font-size:var(--text-base);color:var(--text-strong);background:var(--surface-card);border:var(--border-w-hairline) solid var(--border-hairline);border-radius:var(--radius-field);padding:0 var(--space-4);box-shadow:var(--shadow-inset-field);transition:border-color var(--dur-fast) var(--ease-standard),box-shadow var(--dur-base) var(--ease-standard)}
.cha-input::placeholder{color:var(--gray-400)}
.cha-input:hover:not(:disabled){border-color:var(--border-accent)}
.cha-input:focus{outline:none;border-color:var(--teal-500);box-shadow:var(--shadow-focus)}
.cha-input:disabled{background:var(--gray-050);color:var(--action-disabled-text);cursor:not-allowed;box-shadow:none}
.cha-input--sm{height:var(--control-h-sm);font-size:var(--text-sm);padding:0 var(--space-3)}
.cha-input--lg{height:var(--control-h-lg);font-size:var(--text-lg)}
.cha-input--invalid{border-color:var(--status-danger)}
.cha-input--invalid:focus{box-shadow:0 0 0 3px rgba(224,90,85,.28)}
.cha-input--with-icon{padding-left:40px}
.cha-input__icon{position:absolute;left:12px;display:flex;color:var(--gray-400);pointer-events:none}
.cha-textarea{min-height:104px;padding:var(--space-3) var(--space-4);line-height:var(--leading-normal);resize:vertical;height:auto}
`);

export function Input({ size = "md", invalid = false, icon, multiline = false, className = "", ...rest }) {
  const cls = ["cha-input", size !== "md" ? "cha-input--" + size : "", invalid ? "cha-input--invalid" : "", icon ? "cha-input--with-icon" : "", multiline ? "cha-textarea" : "", className].filter(Boolean).join(" ");
  if (multiline) return <textarea className={cls} {...rest} />;
  return (
    <span className="cha-input-wrap">
      {icon && <span className="cha-input__icon">{icon}</span>}
      <input className={cls} {...rest} />
    </span>
  );
}
