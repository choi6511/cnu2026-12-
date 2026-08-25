import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-pill", `
.cha-pill{display:inline-flex;align-items:center;gap:8px}
.cha-pill__body{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-pill);padding:6px 14px;font-family:var(--font-latin);font-weight:var(--weight-black);font-size:var(--text-xs);letter-spacing:var(--tracking-wide);white-space:nowrap}
.cha-pill--teal .cha-pill__body{background:var(--teal-500);color:var(--white)}
.cha-pill--navy .cha-pill__body{background:var(--navy-900);color:var(--white)}
.cha-pill--soft .cha-pill__body{background:var(--teal-050);color:var(--teal-700)}
.cha-pill__ko{font-family:var(--font-core);font-weight:var(--weight-bold);letter-spacing:0}
.cha-pill__sparkle{color:var(--teal-500);font-size:14px;line-height:1}
.cha-pill--navy .cha-pill__sparkle{color:var(--navy-900)}
`);

export function PillLabel({ ko, en, tone = "teal", sparkle = true, className = "", ...rest }) {
  const cls = ["cha-pill", "cha-pill--" + tone, className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      <span className="cha-pill__body">
        {ko && <span className="cha-pill__ko">{ko}</span>}
        {en && <span>{ko ? "(" + en + ")" : en}</span>}
      </span>
      {sparkle && <span className="cha-pill__sparkle" aria-hidden="true">✦</span>}
    </span>
  );
}
