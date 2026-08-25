import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-dialog", `
.cha-scrim{position:fixed;inset:0;background:rgba(0,45,114,.42);display:flex;align-items:center;justify-content:center;padding:var(--space-6);z-index:50;animation:cha-fade var(--dur-base) var(--ease-out)}
.cha-dialog{position:relative;width:100%;max-width:480px;background:var(--surface-card);border-radius:var(--radius-xl);padding:var(--gutter-card-lg);box-shadow:var(--shadow-lg);animation:cha-pop var(--dur-slow) var(--ease-bounce)}
.cha-dialog--lg{max-width:640px}
.cha-dialog__close{position:absolute;top:16px;right:16px;width:32px;height:32px;border:none;background:transparent;border-radius:var(--radius-pill);color:var(--text-muted);font-size:18px;cursor:pointer;transition:background-color var(--dur-fast) var(--ease-standard)}
.cha-dialog__close:hover{background:var(--surface-accent);color:var(--text-strong)}
.cha-dialog__title{font:var(--type-heading);color:var(--text-strong);margin:0 0 var(--space-2)}
.cha-dialog__desc{font:var(--type-body);color:var(--text-body);margin:0}
.cha-dialog__mascot{display:block;width:88px;margin:0 auto var(--space-4);filter:drop-shadow(var(--shadow-mascot))}
.cha-dialog__foot{display:flex;justify-content:flex-end;gap:var(--space-3);margin-top:var(--space-6)}
@keyframes cha-fade{from{opacity:0}to{opacity:1}}
@keyframes cha-pop{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.cha-dialog,.cha-scrim{animation:none}}
`);

export function Dialog({ open = true, title, description, mascotSrc, size = "md", onClose, footer, children }) {
  if (!open) return null;
  return (
    <div className="cha-scrim" role="presentation" onClick={onClose}>
      <div className={["cha-dialog", size === "lg" ? "cha-dialog--lg" : ""].filter(Boolean).join(" ")} role="dialog" aria-modal="true" aria-label={typeof title === "string" ? title : undefined} onClick={(e) => e.stopPropagation()}>
        {onClose && <button type="button" className="cha-dialog__close" aria-label="닫기" onClick={onClose}>×</button>}
        {mascotSrc && <img className="cha-dialog__mascot" src={mascotSrc} alt="" />}
        {title && <h2 className="cha-dialog__title">{title}</h2>}
        {description && <p className="cha-dialog__desc">{description}</p>}
        {children}
        {footer && <div className="cha-dialog__foot">{footer}</div>}
      </div>
    </div>
  );
}
