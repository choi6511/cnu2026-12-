import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-field", `
.cha-field{display:flex;flex-direction:column;gap:var(--space-2)}
.cha-field__label{font-family:var(--font-core);font-weight:var(--weight-bold);font-size:var(--text-sm);color:var(--text-strong)}
.cha-field__req{color:var(--teal-500);margin-left:2px}
.cha-field__hint{font:var(--type-caption);color:var(--text-muted)}
.cha-field__error{font:var(--type-caption);color:var(--status-danger);font-weight:var(--weight-bold)}
`);

export function Field({ label, hint, error, required, htmlFor, children, className = "", ...rest }) {
  return (
    <div className={["cha-field", className].filter(Boolean).join(" ")} {...rest}>
      {label && <label className="cha-field__label" htmlFor={htmlFor}>{label}{required && <span className="cha-field__req">*</span>}</label>}
      {children}
      {error ? <span className="cha-field__error">{error}</span> : hint ? <span className="cha-field__hint">{hint}</span> : null}
    </div>
  );
}
