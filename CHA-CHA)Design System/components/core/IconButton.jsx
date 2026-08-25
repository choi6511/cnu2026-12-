import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-iconbutton", `
.cha-iconbtn{display:inline-flex;align-items:center;justify-content:center;border-radius:var(--radius-pill);border:var(--border-w-strong) solid transparent;background:transparent;color:var(--text-strong);cursor:pointer;transition:background-color var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-standard),box-shadow var(--dur-base) var(--ease-standard)}
.cha-iconbtn:hover:not(:disabled){background:var(--surface-accent)}
.cha-iconbtn:active:not(:disabled){transform:var(--press-scale)}
.cha-iconbtn:focus-visible{outline:none;box-shadow:var(--shadow-focus)}
.cha-iconbtn:disabled{cursor:not-allowed;color:var(--action-disabled-text)}
.cha-iconbtn--sm{width:var(--control-h-sm);height:var(--control-h-sm)}
.cha-iconbtn--md{width:var(--control-h-md);height:var(--control-h-md)}
.cha-iconbtn--lg{width:var(--control-h-lg);height:var(--control-h-lg)}
.cha-iconbtn--solid{background:var(--action-primary);color:var(--text-on-dark)}
.cha-iconbtn--solid:hover:not(:disabled){background:var(--action-primary-hover)}
.cha-iconbtn--accent{background:var(--action-accent);color:var(--text-on-accent)}
.cha-iconbtn--accent:hover:not(:disabled){background:var(--action-accent-hover)}
.cha-iconbtn--outline{border-color:var(--border-strong)}
`);

export function IconButton({ variant = "ghost", size = "md", label, children, className = "", ...rest }) {
  const cls = ["cha-iconbtn", "cha-iconbtn--" + variant, "cha-iconbtn--" + size, className].filter(Boolean).join(" ");
  return <button type="button" className={cls} aria-label={label} title={label} {...rest}>{children}</button>;
}
