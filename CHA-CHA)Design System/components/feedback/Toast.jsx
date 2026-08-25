import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-toast", `
.cha-toast{display:flex;align-items:center;gap:var(--space-3);min-width:280px;max-width:420px;background:var(--surface-inverse);color:var(--text-on-dark);border-radius:var(--radius-pill);padding:12px 20px;box-shadow:var(--shadow-lg);font-family:var(--font-core);font-size:var(--text-sm);animation:cha-toast-in var(--dur-bounce) var(--ease-bounce)}
.cha-toast--light{background:var(--surface-card);color:var(--text-strong);border:var(--border-w-hairline) solid var(--border-hairline)}
.cha-toast--accent{background:var(--teal-500)}
.cha-toast--danger{background:var(--status-danger)}
.cha-toast__mascot{width:36px;height:36px;object-fit:contain;flex:none;margin:-6px 0}
.cha-toast__title{font-weight:var(--weight-bold)}
.cha-toast__msg{opacity:.85}
.cha-toast__x{margin-left:auto;background:none;border:none;color:inherit;opacity:.7;cursor:pointer;font-size:16px;line-height:1}
.cha-toast__x:hover{opacity:1}
@keyframes cha-toast-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.cha-toast{animation:none}}
`);

export function Toast({ tone = "navy", title, children, mascotSrc, onClose, className = "", ...rest }) {
  const cls = ["cha-toast", tone !== "navy" ? "cha-toast--" + tone : "", className].filter(Boolean).join(" ");
  return (
    <div className={cls} role="status" {...rest}>
      {mascotSrc && <img className="cha-toast__mascot" src={mascotSrc} alt="" />}
      {title && <span className="cha-toast__title">{title}</span>}
      {children && <span className="cha-toast__msg">{children}</span>}
      {onClose && <button type="button" className="cha-toast__x" aria-label="닫기" onClick={onClose}>×</button>}
    </div>
  );
}
