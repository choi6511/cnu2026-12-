import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-badge", `
.cha-badge{display:inline-flex;align-items:center;gap:var(--space-1);border-radius:var(--radius-pill);font-family:var(--font-core);font-weight:var(--weight-bold);font-size:var(--text-xs);line-height:1;padding:5px 10px;white-space:nowrap}
.cha-badge--md{font-size:var(--text-sm);padding:7px 14px}
.cha-badge--solid.cha-badge--navy{background:var(--navy-900);color:var(--white)}
.cha-badge--solid.cha-badge--teal{background:var(--teal-500);color:var(--white)}
.cha-badge--solid.cha-badge--blush{background:var(--blush-400);color:var(--navy-900)}
.cha-badge--solid.cha-badge--neutral{background:var(--gray-200);color:var(--navy-800)}
.cha-badge--solid.cha-badge--success{background:var(--status-success);color:var(--white)}
.cha-badge--solid.cha-badge--warning{background:var(--status-warning);color:var(--navy-900)}
.cha-badge--solid.cha-badge--danger{background:var(--status-danger);color:var(--white)}
.cha-badge--soft.cha-badge--navy{background:var(--navy-050);color:var(--navy-900)}
.cha-badge--soft.cha-badge--teal{background:var(--teal-050);color:var(--teal-700)}
.cha-badge--soft.cha-badge--blush{background:var(--blush-200);color:var(--navy-900)}
.cha-badge--soft.cha-badge--neutral{background:var(--gray-050);color:var(--text-muted)}
.cha-badge--soft.cha-badge--success{background:#E4F6EF;color:#0B7357}
.cha-badge--soft.cha-badge--warning{background:#FCF0DE;color:#8A5A12}
.cha-badge--soft.cha-badge--danger{background:#FBE6E5;color:#9A2E2A}
`);

export function Badge({ tone = "navy", variant = "solid", size = "sm", children, className = "", ...rest }) {
  const cls = ["cha-badge", "cha-badge--" + variant, "cha-badge--" + tone, "cha-badge--" + size, className].filter(Boolean).join(" ");
  return <span className={cls} {...rest}>{children}</span>;
}
