import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-card", `
.cha-card{position:relative;background:var(--surface-card);border-radius:var(--radius-card);padding:var(--gutter-card);border:var(--border-w-hairline) solid var(--border-hairline);box-shadow:var(--shadow-sm);transition:transform var(--dur-base) var(--ease-standard),box-shadow var(--dur-base) var(--ease-standard)}
.cha-card--elevated{border-color:transparent;box-shadow:var(--shadow-md)}
.cha-card--accent{background:var(--surface-accent);border-color:var(--border-accent)}
.cha-card--cream{background:var(--surface-cream);border-color:transparent}
.cha-card--inverse{background:var(--surface-inverse);border-color:transparent;color:var(--text-on-dark)}
.cha-card--lg{padding:var(--gutter-card-lg)}
.cha-card--interactive{cursor:pointer}
.cha-card--interactive:hover{transform:var(--hover-lift);box-shadow:var(--shadow-md)}
.cha-card--interactive:active{transform:var(--press-scale);box-shadow:var(--shadow-xs)}
.cha-card__head{display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-4)}
.cha-card__title{font:var(--type-heading);color:inherit;margin:0}
.cha-card__body{font:var(--type-body);color:var(--text-body)}
.cha-card--inverse .cha-card__body{color:var(--navy-100)}
`);

export function Card({ variant = "plain", size = "md", interactive = false, title, label, children, className = "", ...rest }) {
  const cls = ["cha-card", "cha-card--" + variant, size === "lg" ? "cha-card--lg" : "", interactive ? "cha-card--interactive" : "", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      {(label || title) && (
        <div className="cha-card__head">
          {label}
          {title && <h3 className="cha-card__title">{title}</h3>}
        </div>
      )}
      <div className="cha-card__body">{children}</div>
    </div>
  );
}
