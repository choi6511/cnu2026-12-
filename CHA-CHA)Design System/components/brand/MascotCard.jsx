import React from "react";
import { injectStyles } from "../styles.jsx";
import { Mascot, MASCOT_LABELS } from "./Mascot.jsx";

injectStyles("cha-mascotcard", `
.cha-mcard{display:flex;flex-direction:column;align-items:center;gap:var(--space-3);background:var(--surface-card);border:var(--border-w-hairline) solid var(--border-hairline);border-radius:var(--radius-card);padding:var(--space-5) var(--space-4);transition:transform var(--dur-base) var(--ease-standard),box-shadow var(--dur-base) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard)}
.cha-mcard--interactive{cursor:pointer}
.cha-mcard--interactive:hover{transform:var(--hover-lift);box-shadow:var(--shadow-md);border-color:var(--border-accent)}
.cha-mcard--interactive:active{transform:var(--press-scale);box-shadow:var(--shadow-xs)}
.cha-mcard--selected{border-color:var(--teal-500);box-shadow:var(--shadow-md)}
.cha-mcard--tinted{background:var(--surface-accent);border-color:transparent}
.cha-mcard__label{font-family:var(--font-core);font-weight:var(--weight-bold);font-size:var(--text-sm);color:var(--text-strong);text-align:center}
.cha-mcard__caption{font:var(--type-caption);color:var(--text-muted);text-align:center}
.cha-mcard__art{display:flex;align-items:flex-end;justify-content:center}
`);

export function MascotCard({ name = "front", label, caption, height = 140, basePath = "../../assets", tinted = false, selected = false, onClick, className = "", ...rest }) {
  const cls = ["cha-mcard", tinted ? "cha-mcard--tinted" : "", onClick ? "cha-mcard--interactive" : "", selected ? "cha-mcard--selected" : "", className].filter(Boolean).join(" ");
  return (
    <div className={cls} onClick={onClick} {...rest}>
      <span className="cha-mcard__art" style={{ height: height + "px" }}><Mascot name={name} height={height} basePath={basePath} /></span>
      <span className="cha-mcard__label">{label != null ? label : MASCOT_LABELS[name]}</span>
      {caption && <span className="cha-mcard__caption">{caption}</span>}
    </div>
  );
}
