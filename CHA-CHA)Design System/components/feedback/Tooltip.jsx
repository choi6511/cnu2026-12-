import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-tooltip", `
.cha-tip{position:relative;display:inline-flex}
.cha-tip__bubble{position:absolute;z-index:30;background:var(--navy-900);color:var(--white);font-family:var(--font-core);font-size:var(--text-xs);font-weight:var(--weight-medium);padding:6px 10px;border-radius:var(--radius-sm);white-space:nowrap;opacity:0;pointer-events:none;transition:opacity var(--dur-fast) var(--ease-standard),transform var(--dur-base) var(--ease-standard)}
.cha-tip:hover .cha-tip__bubble,.cha-tip:focus-within .cha-tip__bubble{opacity:1;transform:none}
.cha-tip__bubble--top{bottom:calc(100% + 8px);left:50%;translate:-50% 0;transform:translateY(4px)}
.cha-tip__bubble--bottom{top:calc(100% + 8px);left:50%;translate:-50% 0;transform:translateY(-4px)}
.cha-tip__bubble--left{right:calc(100% + 8px);top:50%;translate:0 -50%;transform:translateX(4px)}
.cha-tip__bubble--right{left:calc(100% + 8px);top:50%;translate:0 -50%;transform:translateX(-4px)}
`);

export function Tooltip({ content, placement = "top", children, className = "", ...rest }) {
  return (
    <span className={["cha-tip", className].filter(Boolean).join(" ")} {...rest}>
      {children}
      <span className={"cha-tip__bubble cha-tip__bubble--" + placement} role="tooltip">{content}</span>
    </span>
  );
}
