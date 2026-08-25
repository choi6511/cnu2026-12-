import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-button", `
.cha-btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);font-family:var(--font-core);font-weight:var(--weight-bold);border-radius:var(--radius-control);border:var(--border-w-strong) solid transparent;cursor:pointer;text-decoration:none;white-space:nowrap;transition:background-color var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard),box-shadow var(--dur-base) var(--ease-standard),transform var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard)}
.cha-btn:focus-visible{outline:none;box-shadow:var(--shadow-focus)}
.cha-btn:active:not(:disabled){transform:var(--press-scale);box-shadow:var(--shadow-xs)}
.cha-btn:disabled{cursor:not-allowed;background:var(--action-disabled);color:var(--action-disabled-text);border-color:transparent;box-shadow:none}
.cha-btn--sm{height:var(--control-h-sm);padding:0 var(--space-4);font-size:var(--text-sm)}
.cha-btn--md{height:var(--control-h-md);padding:0 var(--space-5);font-size:var(--text-base)}
.cha-btn--lg{height:var(--control-h-lg);padding:0 var(--space-6);font-size:var(--text-lg)}
.cha-btn--full{width:100%}
.cha-btn--primary{background:var(--action-primary);color:var(--text-on-dark)}
.cha-btn--primary:hover:not(:disabled){background:var(--action-primary-hover)}
.cha-btn--accent{background:var(--action-accent);color:var(--text-on-accent)}
.cha-btn--accent:hover:not(:disabled){background:var(--action-accent-hover)}
.cha-btn--outline{background:var(--surface-card);color:var(--text-strong);border-color:var(--border-strong)}
.cha-btn--outline:hover:not(:disabled){background:var(--surface-accent)}
.cha-btn--ghost{background:transparent;color:var(--text-accent)}
.cha-btn--ghost:hover:not(:disabled){background:var(--surface-accent)}
`);

export function Button({ variant = "primary", size = "md", full = false, iconLeft, iconRight, as = "button", className = "", children, ...rest }) {
  const Tag = as;
  const cls = ["cha-btn", "cha-btn--" + variant, "cha-btn--" + size, full ? "cha-btn--full" : "", className].filter(Boolean).join(" ");
  return (
    <Tag className={cls} {...rest}>
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
