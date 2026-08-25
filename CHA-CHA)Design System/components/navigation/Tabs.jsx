import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-tabs", `
.cha-tabs{display:flex;align-items:center;gap:var(--space-2)}
.cha-tabs--underline{gap:var(--space-6);border-bottom:var(--border-w-hairline) solid var(--border-hairline)}
.cha-tab{font-family:var(--font-core);font-weight:var(--weight-bold);font-size:var(--text-sm);border:none;background:transparent;cursor:pointer;color:var(--text-muted);transition:color var(--dur-fast) var(--ease-standard),background-color var(--dur-fast) var(--ease-standard)}
.cha-tabs--pill .cha-tab{border-radius:var(--radius-pill);padding:8px 18px}
.cha-tabs--pill .cha-tab:hover{background:var(--surface-accent);color:var(--text-accent)}
.cha-tabs--pill .cha-tab[aria-selected="true"]{background:var(--navy-900);color:var(--white)}
.cha-tabs--underline .cha-tab{padding:0 0 12px;position:relative;font-size:var(--text-base)}
.cha-tabs--underline .cha-tab:hover{color:var(--text-accent)}
.cha-tabs--underline .cha-tab[aria-selected="true"]{color:var(--text-strong)}
.cha-tabs--underline .cha-tab[aria-selected="true"]::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:3px;border-radius:var(--radius-pill);background:var(--teal-500)}
.cha-tab:focus-visible{outline:none;box-shadow:var(--shadow-focus);border-radius:var(--radius-pill)}
.cha-tab__count{font-family:var(--font-latin);font-size:var(--text-xs);opacity:.7;margin-left:6px}
`);

export function Tabs({ items = [], value, onChange, variant = "pill", className = "", ...rest }) {
  return (
    <div className={["cha-tabs", "cha-tabs--" + variant, className].filter(Boolean).join(" ")} role="tablist" {...rest}>
      {items.map((it) => {
        const v = typeof it === "string" ? it : it.value;
        const label = typeof it === "string" ? it : it.label;
        return (
          <button key={v} type="button" role="tab" aria-selected={value === v} className="cha-tab" onClick={() => onChange && onChange(v)}>
            {label}
            {typeof it !== "string" && it.count != null && <span className="cha-tab__count">{it.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
