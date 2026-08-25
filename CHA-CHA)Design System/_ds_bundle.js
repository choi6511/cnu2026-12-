/* @ds-bundle: {"format":4,"namespace":"CHACHADesignSystem_c46830","components":[{"name":"Mascot","sourcePath":"components/brand/Mascot.jsx"},{"name":"MASCOT_NAMES","sourcePath":"components/brand/Mascot.jsx"},{"name":"MASCOT_LABELS","sourcePath":"components/brand/Mascot.jsx"},{"name":"MascotCard","sourcePath":"components/brand/MascotCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"PillLabel","sourcePath":"components/core/PillLabel.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/brand/Mascot.jsx":"9c8b05f23613","components/brand/MascotCard.jsx":"430496f1bd8c","components/core/Badge.jsx":"2b132e42bff1","components/core/Button.jsx":"776b99ff543c","components/core/Card.jsx":"7cba70458288","components/core/IconButton.jsx":"1b7f627370e5","components/core/PillLabel.jsx":"dd310c20dc59","components/core/Tag.jsx":"abd4251665e3","components/feedback/Dialog.jsx":"d62e891d4b0f","components/feedback/Toast.jsx":"8ffd87d24fac","components/feedback/Tooltip.jsx":"d4db72f4dc84","components/forms/Checkbox.jsx":"c9cb217af6b7","components/forms/Field.jsx":"1d2fd9f2d4ea","components/forms/Input.jsx":"870259c0cff6","components/forms/Radio.jsx":"bf1e4911d85c","components/forms/Select.jsx":"c5a6a322f2d4","components/forms/Switch.jsx":"7c67df2d56c4","components/navigation/Tabs.jsx":"a523ad6ef3b5","components/styles.jsx":"6031c153280e","ui_kits/brand-site/AssetsScreen.jsx":"5857d763d3e1","ui_kits/brand-site/Footer.jsx":"1045e2ee8b4e","ui_kits/brand-site/GuideScreen.jsx":"dd81decb487e","ui_kits/brand-site/Header.jsx":"abeed3a3ad08","ui_kits/brand-site/HomeScreen.jsx":"0d6eb1603e9e"},"inlinedExternals":[],"unexposedExports":[{"name":"injectStyles","sourcePath":"components/styles.jsx"}]} */

(() => {

const __ds_ns = (window.CHACHADesignSystem_c46830 = window.CHACHADesignSystem_c46830 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/styles.jsx
try { (() => {
// Injects a component's CSS once per document. Not a public export.
function injectStyles(id, css) {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
Object.assign(__ds_scope, { injectStyles });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/styles.jsx", error: String((e && e.message) || e) }); }

// components/brand/Mascot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-mascot", `
.cha-mascot{display:block;height:auto;object-fit:contain}
.cha-mascot--shadow{filter:drop-shadow(var(--shadow-mascot))}
.cha-mascot--float{animation:cha-float 4s var(--ease-in-out) infinite}
@keyframes cha-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@media (prefers-reduced-motion:reduce){.cha-mascot--float{animation:none}}
`);
const FILES = {
  front: "mascot-front",
  "three-quarter-front": "mascot-three-quarter-front",
  side: "mascot-side",
  "three-quarter-back": "mascot-three-quarter-back",
  back: "mascot-back",
  basic: "face-basic",
  joy: "face-joy",
  cheer: "face-cheer",
  think: "face-think",
  surprise: "face-surprise",
  thanks: "face-thanks",
  cheering: "pose-cheering",
  studying: "pose-studying",
  running: "pose-running",
  together: "pose-together",
  wordmark: "logo-wordmark",
  lockup: "logo-lockup",
  cnu: "cnu-wordmark"
};
const LABELS = {
  front: "FRONT",
  "three-quarter-front": "3/4 FRONT",
  side: "SIDE",
  "three-quarter-back": "3/4 BACK",
  back: "BACK",
  basic: "기본",
  joy: "기쁨",
  cheer: "응원",
  think: "생각",
  surprise: "놀람",
  thanks: "감사",
  cheering: "응원하는 차차",
  studying: "공부하는 차차",
  running: "달려가는 차차",
  together: "함께하는 차차",
  wordmark: "차차 CHA-CHA",
  lockup: "차차 CHA-CHA",
  cnu: "충남대학교"
};
function Mascot({
  name = "front",
  height = 220,
  basePath = "../../assets",
  shadow = true,
  float = false,
  className = "",
  style,
  ...rest
}) {
  const file = FILES[name] || FILES.front;
  const cls = ["cha-mascot", shadow ? "cha-mascot--shadow" : "", float ? "cha-mascot--float" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("img", _extends({
    className: cls,
    src: basePath + "/" + file + ".png",
    alt: LABELS[name] || "차차",
    style: {
      height: typeof height === "number" ? height + "px" : height,
      ...style
    }
  }, rest));
}
const MASCOT_NAMES = Object.keys(FILES);
const MASCOT_LABELS = LABELS;
Object.assign(__ds_scope, { Mascot, MASCOT_NAMES, MASCOT_LABELS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Mascot.jsx", error: String((e && e.message) || e) }); }

// components/brand/MascotCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-mascotcard", `
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
function MascotCard({
  name = "front",
  label,
  caption,
  height = 140,
  basePath = "../../assets",
  tinted = false,
  selected = false,
  onClick,
  className = "",
  ...rest
}) {
  const cls = ["cha-mcard", tinted ? "cha-mcard--tinted" : "", onClick ? "cha-mcard--interactive" : "", selected ? "cha-mcard--selected" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    onClick: onClick
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "cha-mcard__art",
    style: {
      height: height + "px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Mascot, {
    name: name,
    height: height,
    basePath: basePath
  })), /*#__PURE__*/React.createElement("span", {
    className: "cha-mcard__label"
  }, label != null ? label : __ds_scope.MASCOT_LABELS[name]), caption && /*#__PURE__*/React.createElement("span", {
    className: "cha-mcard__caption"
  }, caption));
}
Object.assign(__ds_scope, { MascotCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/MascotCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-badge", `
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
function Badge({
  tone = "navy",
  variant = "solid",
  size = "sm",
  children,
  className = "",
  ...rest
}) {
  const cls = ["cha-badge", "cha-badge--" + variant, "cha-badge--" + tone, "cha-badge--" + size, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-button", `
.cha-btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);font-family:var(--font-core);font-weight:var(--weight-bold);border-radius:var(--radius-control);border:var(--border-w-strong) solid transparent;cursor:pointer;text-decoration:none;white-space:nowrap;transition:background-color var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard),box-shadow var(--dur-base) var(--ease-standard),transform var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard)}
.cha-btn:focus-visible{outline:none;box-shadow:var(--shadow-focus)}
.cha-btn:active:not(:disabled){transform:var(--press-scale);box-shadow:var(--shadow-xs)}
.cha-btn:disabled{cursor:not-allowed;background:var(--action-disabled);color:var(--action-disabled-text);border-color:transparent;box-shadow:none}
.cha-btn--sm{height:var(--control-h-sm);padding:0 var(--space-4);font-size:var(--text-sm)}
.cha-btn--md{height:var(--control-h-md);padding:0 var(--space-5);font-size:var(--text-base)}
.cha-btn--lg{height:var(--control-h-lg);padding:0 var(--space-6);font-size:var(--text-lg)}
.cha-btn--full{width:100%}
.cha-btn--primary{background:var(--action-primary);color:var(--text-on-dark)}
.cha-btn--primary:hover:not(:disabled){background:var(--action-primary-hover)}
.cha-btn--accent{background:var(--action-accent);color:var(--text-on-accent)}
.cha-btn--accent:hover:not(:disabled){background:var(--action-accent-hover)}
.cha-btn--outline{background:var(--surface-card);color:var(--text-strong);border-color:var(--border-strong)}
.cha-btn--outline:hover:not(:disabled){background:var(--surface-accent)}
.cha-btn--ghost{background:transparent;color:var(--text-accent)}
.cha-btn--ghost:hover:not(:disabled){background:var(--surface-accent)}
`);
function Button({
  variant = "primary",
  size = "md",
  full = false,
  iconLeft,
  iconRight,
  as = "button",
  className = "",
  children,
  ...rest
}) {
  const Tag = as;
  const cls = ["cha-btn", "cha-btn--" + variant, "cha-btn--" + size, full ? "cha-btn--full" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-card", `
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
function Card({
  variant = "plain",
  size = "md",
  interactive = false,
  title,
  label,
  children,
  className = "",
  ...rest
}) {
  const cls = ["cha-card", "cha-card--" + variant, size === "lg" ? "cha-card--lg" : "", interactive ? "cha-card--interactive" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), (label || title) && /*#__PURE__*/React.createElement("div", {
    className: "cha-card__head"
  }, label, title && /*#__PURE__*/React.createElement("h3", {
    className: "cha-card__title"
  }, title)), /*#__PURE__*/React.createElement("div", {
    className: "cha-card__body"
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-iconbutton", `
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
function IconButton({
  variant = "ghost",
  size = "md",
  label,
  children,
  className = "",
  ...rest
}) {
  const cls = ["cha-iconbtn", "cha-iconbtn--" + variant, "cha-iconbtn--" + size, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    "aria-label": label,
    title: label
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/PillLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-pill", `
.cha-pill{display:inline-flex;align-items:center;gap:8px}
.cha-pill__body{display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-pill);padding:6px 14px;font-family:var(--font-latin);font-weight:var(--weight-black);font-size:var(--text-xs);letter-spacing:var(--tracking-wide);white-space:nowrap}
.cha-pill--teal .cha-pill__body{background:var(--teal-500);color:var(--white)}
.cha-pill--navy .cha-pill__body{background:var(--navy-900);color:var(--white)}
.cha-pill--soft .cha-pill__body{background:var(--teal-050);color:var(--teal-700)}
.cha-pill__ko{font-family:var(--font-core);font-weight:var(--weight-bold);letter-spacing:0}
.cha-pill__sparkle{color:var(--teal-500);font-size:14px;line-height:1}
.cha-pill--navy .cha-pill__sparkle{color:var(--navy-900)}
`);
function PillLabel({
  ko,
  en,
  tone = "teal",
  sparkle = true,
  className = "",
  ...rest
}) {
  const cls = ["cha-pill", "cha-pill--" + tone, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "cha-pill__body"
  }, ko && /*#__PURE__*/React.createElement("span", {
    className: "cha-pill__ko"
  }, ko), en && /*#__PURE__*/React.createElement("span", null, ko ? "(" + en + ")" : en)), sparkle && /*#__PURE__*/React.createElement("span", {
    className: "cha-pill__sparkle",
    "aria-hidden": "true"
  }, "\u2726"));
}
Object.assign(__ds_scope, { PillLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PillLabel.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-tag", `
.cha-tag{display:inline-flex;align-items:center;gap:var(--space-2);border-radius:var(--radius-pill);font-family:var(--font-core);font-weight:var(--weight-medium);font-size:var(--text-sm);padding:6px 14px;background:var(--surface-card);color:var(--text-body);border:var(--border-w-hairline) solid var(--border-hairline);transition:background-color var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard)}
.cha-tag--dashed{border-style:dashed;border-color:var(--border-dashed);background:transparent}
.cha-tag--selected{background:var(--navy-900);border-color:var(--navy-900);color:var(--white);font-weight:var(--weight-bold)}
.cha-tag--clickable{cursor:pointer}
.cha-tag--clickable:hover:not(.cha-tag--selected){background:var(--surface-accent);border-color:var(--border-accent)}
.cha-tag--clickable:active{transform:var(--press-scale)}
.cha-tag__x{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border:none;background:none;padding:0;cursor:pointer;color:inherit;opacity:.7;font-size:14px;line-height:1}
.cha-tag__x:hover{opacity:1}
`);
function Tag({
  variant = "solid",
  selected = false,
  onRemove,
  onClick,
  children,
  className = "",
  ...rest
}) {
  const cls = ["cha-tag", "cha-tag--" + variant, selected ? "cha-tag--selected" : "", onClick ? "cha-tag--clickable" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    onClick: onClick
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "cha-tag__x",
    "aria-label": "remove",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
__ds_scope.injectStyles("cha-dialog", `
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
function Dialog({
  open = true,
  title,
  description,
  mascotSrc,
  size = "md",
  onClose,
  footer,
  children
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "cha-scrim",
    role: "presentation",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: ["cha-dialog", size === "lg" ? "cha-dialog--lg" : ""].filter(Boolean).join(" "),
    role: "dialog",
    "aria-modal": "true",
    "aria-label": typeof title === "string" ? title : undefined,
    onClick: e => e.stopPropagation()
  }, onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "cha-dialog__close",
    "aria-label": "\uB2EB\uAE30",
    onClick: onClose
  }, "\xD7"), mascotSrc && /*#__PURE__*/React.createElement("img", {
    className: "cha-dialog__mascot",
    src: mascotSrc,
    alt: ""
  }), title && /*#__PURE__*/React.createElement("h2", {
    className: "cha-dialog__title"
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "cha-dialog__desc"
  }, description), children, footer && /*#__PURE__*/React.createElement("div", {
    className: "cha-dialog__foot"
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-toast", `
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
function Toast({
  tone = "navy",
  title,
  children,
  mascotSrc,
  onClose,
  className = "",
  ...rest
}) {
  const cls = ["cha-toast", tone !== "navy" ? "cha-toast--" + tone : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "status"
  }, rest), mascotSrc && /*#__PURE__*/React.createElement("img", {
    className: "cha-toast__mascot",
    src: mascotSrc,
    alt: ""
  }), title && /*#__PURE__*/React.createElement("span", {
    className: "cha-toast__title"
  }, title), children && /*#__PURE__*/React.createElement("span", {
    className: "cha-toast__msg"
  }, children), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "cha-toast__x",
    "aria-label": "\uB2EB\uAE30",
    onClick: onClose
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-tooltip", `
.cha-tip{position:relative;display:inline-flex}
.cha-tip__bubble{position:absolute;z-index:30;background:var(--navy-900);color:var(--white);font-family:var(--font-core);font-size:var(--text-xs);font-weight:var(--weight-medium);padding:6px 10px;border-radius:var(--radius-sm);white-space:nowrap;opacity:0;pointer-events:none;transition:opacity var(--dur-fast) var(--ease-standard),transform var(--dur-base) var(--ease-standard)}
.cha-tip:hover .cha-tip__bubble,.cha-tip:focus-within .cha-tip__bubble{opacity:1;transform:none}
.cha-tip__bubble--top{bottom:calc(100% + 8px);left:50%;translate:-50% 0;transform:translateY(4px)}
.cha-tip__bubble--bottom{top:calc(100% + 8px);left:50%;translate:-50% 0;transform:translateY(-4px)}
.cha-tip__bubble--left{right:calc(100% + 8px);top:50%;translate:0 -50%;transform:translateX(4px)}
.cha-tip__bubble--right{left:calc(100% + 8px);top:50%;translate:0 -50%;transform:translateX(-4px)}
`);
function Tooltip({
  content,
  placement = "top",
  children,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["cha-tip", className].filter(Boolean).join(" ")
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    className: "cha-tip__bubble cha-tip__bubble--" + placement,
    role: "tooltip"
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-checkbox", `
.cha-check{display:inline-flex;align-items:flex-start;gap:var(--space-3);font-family:var(--font-core);font-size:var(--text-base);color:var(--text-body);cursor:pointer;line-height:20px}
.cha-check input{position:absolute;opacity:0;width:0;height:0}
.cha-check__box{flex:none;width:20px;height:20px;border-radius:var(--radius-xs);border:var(--border-w-strong) solid var(--navy-900);background:var(--surface-card);display:flex;align-items:center;justify-content:center;transition:background-color var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-bounce)}
.cha-check__tick{width:10px;height:6px;border-left:2px solid var(--white);border-bottom:2px solid var(--white);rotate:-45deg;opacity:0;transform:scale(.6);transition:opacity var(--dur-fast) var(--ease-standard),transform var(--dur-base) var(--ease-bounce);margin-top:-2px}
.cha-check input:checked + .cha-check__box{background:var(--navy-900)}
.cha-check input:checked + .cha-check__box .cha-check__tick{opacity:1;transform:scale(1)}
.cha-check input:focus-visible + .cha-check__box{box-shadow:var(--shadow-focus)}
.cha-check:active .cha-check__box{transform:var(--press-scale)}
.cha-check input:disabled + .cha-check__box{border-color:var(--gray-400);background:var(--gray-050)}
.cha-check--disabled{color:var(--action-disabled-text);cursor:not-allowed}
`);
function Checkbox({
  label,
  className = "",
  disabled,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ["cha-check", disabled ? "cha-check--disabled" : "", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "cha-check__box"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cha-check__tick"
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-field", `
.cha-field{display:flex;flex-direction:column;gap:var(--space-2)}
.cha-field__label{font-family:var(--font-core);font-weight:var(--weight-bold);font-size:var(--text-sm);color:var(--text-strong)}
.cha-field__req{color:var(--teal-500);margin-left:2px}
.cha-field__hint{font:var(--type-caption);color:var(--text-muted)}
.cha-field__error{font:var(--type-caption);color:var(--status-danger);font-weight:var(--weight-bold)}
`);
function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["cha-field", className].filter(Boolean).join(" ")
  }, rest), label && /*#__PURE__*/React.createElement("label", {
    className: "cha-field__label",
    htmlFor: htmlFor
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "cha-field__req"
  }, "*")), children, error ? /*#__PURE__*/React.createElement("span", {
    className: "cha-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "cha-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-input", `
.cha-input-wrap{position:relative;display:flex;align-items:center}
.cha-input{width:100%;height:var(--control-h-md);font-family:var(--font-core);font-size:var(--text-base);color:var(--text-strong);background:var(--surface-card);border:var(--border-w-hairline) solid var(--border-hairline);border-radius:var(--radius-field);padding:0 var(--space-4);box-shadow:var(--shadow-inset-field);transition:border-color var(--dur-fast) var(--ease-standard),box-shadow var(--dur-base) var(--ease-standard)}
.cha-input::placeholder{color:var(--gray-400)}
.cha-input:hover:not(:disabled){border-color:var(--border-accent)}
.cha-input:focus{outline:none;border-color:var(--teal-500);box-shadow:var(--shadow-focus)}
.cha-input:disabled{background:var(--gray-050);color:var(--action-disabled-text);cursor:not-allowed;box-shadow:none}
.cha-input--sm{height:var(--control-h-sm);font-size:var(--text-sm);padding:0 var(--space-3)}
.cha-input--lg{height:var(--control-h-lg);font-size:var(--text-lg)}
.cha-input--invalid{border-color:var(--status-danger)}
.cha-input--invalid:focus{box-shadow:0 0 0 3px rgba(224,90,85,.28)}
.cha-input--with-icon{padding-left:40px}
.cha-input__icon{position:absolute;left:12px;display:flex;color:var(--gray-400);pointer-events:none}
.cha-textarea{min-height:104px;padding:var(--space-3) var(--space-4);line-height:var(--leading-normal);resize:vertical;height:auto}
`);
function Input({
  size = "md",
  invalid = false,
  icon,
  multiline = false,
  className = "",
  ...rest
}) {
  const cls = ["cha-input", size !== "md" ? "cha-input--" + size : "", invalid ? "cha-input--invalid" : "", icon ? "cha-input--with-icon" : "", multiline ? "cha-textarea" : "", className].filter(Boolean).join(" ");
  if (multiline) return /*#__PURE__*/React.createElement("textarea", _extends({
    className: cls
  }, rest));
  return /*#__PURE__*/React.createElement("span", {
    className: "cha-input-wrap"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "cha-input__icon"
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    className: cls
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-radio", `
.cha-radio{display:inline-flex;align-items:flex-start;gap:var(--space-3);font-family:var(--font-core);font-size:var(--text-base);color:var(--text-body);cursor:pointer;line-height:20px}
.cha-radio input{position:absolute;opacity:0;width:0;height:0}
.cha-radio__dot{flex:none;width:20px;height:20px;border-radius:var(--radius-pill);border:var(--border-w-strong) solid var(--navy-900);background:var(--surface-card);display:flex;align-items:center;justify-content:center;transition:border-color var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-bounce)}
.cha-radio__dot::after{content:"";width:10px;height:10px;border-radius:var(--radius-pill);background:var(--teal-500);opacity:0;transform:scale(.4);transition:opacity var(--dur-fast) var(--ease-standard),transform var(--dur-base) var(--ease-bounce)}
.cha-radio input:checked + .cha-radio__dot::after{opacity:1;transform:scale(1)}
.cha-radio input:focus-visible + .cha-radio__dot{box-shadow:var(--shadow-focus)}
.cha-radio:active .cha-radio__dot{transform:var(--press-scale)}
.cha-radio input:disabled + .cha-radio__dot{border-color:var(--gray-400);background:var(--gray-050)}
.cha-radio--disabled{color:var(--action-disabled-text);cursor:not-allowed}
`);
function Radio({
  label,
  className = "",
  disabled,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ["cha-radio", disabled ? "cha-radio--disabled" : "", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "cha-radio__dot"
  }), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-select", `
.cha-select-wrap{position:relative;display:block}
.cha-select{width:100%;height:var(--control-h-md);appearance:none;font-family:var(--font-core);font-size:var(--text-base);color:var(--text-strong);background:var(--surface-card);border:var(--border-w-hairline) solid var(--border-hairline);border-radius:var(--radius-field);padding:0 40px 0 var(--space-4);box-shadow:var(--shadow-inset-field);cursor:pointer;transition:border-color var(--dur-fast) var(--ease-standard),box-shadow var(--dur-base) var(--ease-standard)}
.cha-select:hover:not(:disabled){border-color:var(--border-accent)}
.cha-select:focus{outline:none;border-color:var(--teal-500);box-shadow:var(--shadow-focus)}
.cha-select:disabled{background:var(--gray-050);color:var(--action-disabled-text);cursor:not-allowed}
.cha-select--sm{height:var(--control-h-sm);font-size:var(--text-sm)}
.cha-select--lg{height:var(--control-h-lg);font-size:var(--text-lg)}
.cha-select__caret{position:absolute;right:14px;top:50%;transform:translateY(-50%);pointer-events:none;width:10px;height:10px;border-right:2px solid var(--navy-900);border-bottom:2px solid var(--navy-900);rotate:45deg;margin-top:-3px}
`);
function Select({
  size = "md",
  options = [],
  placeholder,
  className = "",
  children,
  ...rest
}) {
  const cls = ["cha-select", size !== "md" ? "cha-select--" + size : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", {
    className: "cha-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    className: cls
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => typeof o === "string" ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)), children), /*#__PURE__*/React.createElement("span", {
    className: "cha-select__caret",
    "aria-hidden": "true"
  }));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-switch", `
.cha-switch{display:inline-flex;align-items:center;gap:var(--space-3);font-family:var(--font-core);font-size:var(--text-base);color:var(--text-body);cursor:pointer}
.cha-switch input{position:absolute;opacity:0;width:0;height:0}
.cha-switch__track{flex:none;width:44px;height:26px;border-radius:var(--radius-pill);background:var(--gray-200);padding:3px;display:flex;align-items:center;transition:background-color var(--dur-base) var(--ease-standard)}
.cha-switch__knob{width:20px;height:20px;border-radius:var(--radius-pill);background:var(--white);box-shadow:var(--shadow-xs);transition:transform var(--dur-base) var(--ease-bounce)}
.cha-switch input:checked + .cha-switch__track{background:var(--teal-500)}
.cha-switch input:checked + .cha-switch__track .cha-switch__knob{transform:translateX(18px)}
.cha-switch input:focus-visible + .cha-switch__track{box-shadow:var(--shadow-focus)}
.cha-switch input:disabled + .cha-switch__track{background:var(--gray-050);border:1px solid var(--gray-200)}
.cha-switch--disabled{color:var(--action-disabled-text);cursor:not-allowed}
`);
function Switch({
  label,
  className = "",
  disabled,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ["cha-switch", disabled ? "cha-switch--disabled" : "", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "cha-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cha-switch__knob"
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectStyles("cha-tabs", `
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
function Tabs({
  items = [],
  value,
  onChange,
  variant = "pill",
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["cha-tabs", "cha-tabs--" + variant, className].filter(Boolean).join(" "),
    role: "tablist"
  }, rest), items.map(it => {
    const v = typeof it === "string" ? it : it.value;
    const label = typeof it === "string" ? it : it.label;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      type: "button",
      role: "tab",
      "aria-selected": value === v,
      className: "cha-tab",
      onClick: () => onChange && onChange(v)
    }, label, typeof it !== "string" && it.count != null && /*#__PURE__*/React.createElement("span", {
      className: "cha-tab__count"
    }, it.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/brand-site/AssetsScreen.jsx
try { (() => {
const GROUPS = {
  face: [["basic", "기본"], ["joy", "기쁨"], ["cheer", "응원"], ["think", "생각"], ["surprise", "놀람"], ["thanks", "감사"]],
  pose: [["cheering", "응원하는 차차"], ["studying", "공부하는 차차"], ["running", "달려가는 차차"], ["together", "함께하는 차차"]],
  view: [["front", "FRONT"], ["three-quarter-front", "3/4 FRONT"], ["side", "SIDE"], ["three-quarter-back", "3/4 BACK"], ["back", "BACK"]],
  logo: [["wordmark", "차차 워드마크"], ["lockup", "가로 조합"], ["cnu", "충남대학교"]]
};
function AssetsScreen() {
  const {
    Button,
    Card,
    PillLabel,
    Tabs,
    Tag,
    Input,
    Select,
    Checkbox,
    Switch,
    MascotCard,
    Dialog,
    Toast,
    Badge,
    IconButton,
    Tooltip,
    Field
  } = window.DS;
  const [tab, setTab] = React.useState("face");
  const [picked, setPicked] = React.useState(["joy"]);
  const [q, setQ] = React.useState("");
  const [dialog, setDialog] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const list = GROUPS[tab].filter(([, l]) => l.includes(q));
  const toggle = n => setPicked(p => p.includes(n) ? p.filter(x => x !== n) : [...p, n]);
  return /*#__PURE__*/React.createElement("div", {
    style: assetStyles.page
  }, /*#__PURE__*/React.createElement("aside", {
    style: assetStyles.side
  }, /*#__PURE__*/React.createElement(PillLabel, {
    ko: "\uD544\uD130",
    en: "FILTER",
    sparkle: false
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\uAC80\uC0C9",
    htmlFor: "q"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "q",
    placeholder: "\uC774\uB984\uC73C\uB85C \uCC3E\uAE30",
    value: q,
    onChange: e => setQ(e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\uD30C\uC77C \uD615\uC2DD",
    htmlFor: "fmt"
  }, /*#__PURE__*/React.createElement(Select, {
    id: "fmt",
    options: ["PNG (투명)", "PNG (흰 배경)", "SVG — 준비 중"]
  })), /*#__PURE__*/React.createElement("div", {
    style: assetStyles.group
  }, /*#__PURE__*/React.createElement("span", {
    style: assetStyles.groupLabel
  }, "\uD574\uC0C1\uB3C4"), /*#__PURE__*/React.createElement(Checkbox, {
    label: "1x \xB7 \uD654\uBA74\uC6A9",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "2x \xB7 \uC778\uC1C4\uC6A9",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "\uC6D0\uBCF8 (2400px)"
  })), /*#__PURE__*/React.createElement(Switch, {
    label: "\uD22C\uBA85 \uBC30\uACBD\uB9CC",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--border-hairline)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8
    }
  }, ["표정", "포즈", "360°", "로고"].map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    variant: "dashed"
  }, t)))), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: assetStyles.bar
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      value: "face",
      label: "표정",
      count: 6
    }, {
      value: "pose",
      label: "포즈",
      count: 4
    }, {
      value: "view",
      label: "360°",
      count: 5
    }, {
      value: "logo",
      label: "로고",
      count: 3
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "teal",
    variant: "soft",
    size: "md"
  }, picked.length, "\uAC1C \uC120\uD0DD"), /*#__PURE__*/React.createElement(Tooltip, {
    content: "\uC120\uD0DD \uD574\uC81C"
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "\uC120\uD0DD \uD574\uC81C",
    variant: "outline",
    size: "sm",
    onClick: () => setPicked([])
  }, "\xD7")), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    onClick: () => setDialog(true),
    disabled: picked.length === 0
  }, "\uB2E4\uC6B4\uB85C\uB4DC"))), /*#__PURE__*/React.createElement("div", {
    style: assetStyles.grid
  }, list.map(([n, l]) => /*#__PURE__*/React.createElement(MascotCard, {
    key: n,
    name: n,
    label: l,
    height: tab === "logo" ? 70 : 120,
    basePath: "../../assets",
    selected: picked.includes(n),
    onClick: () => toggle(n),
    caption: picked.includes(n) ? "선택됨" : "PNG · 투명"
  })), list.length === 0 && /*#__PURE__*/React.createElement(Card, {
    style: {
      gridColumn: "1 / -1",
      textAlign: "center"
    }
  }, "\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."))), /*#__PURE__*/React.createElement(Dialog, {
    open: dialog,
    onClose: () => setDialog(false),
    title: "\uC5D0\uC14B\uC744 \uB2E4\uC6B4\uB85C\uB4DC\uD560\uAE4C\uC694?",
    description: picked.length + "개 파일이 zip으로 저장됩니다. 사용 시 가이드라인을 지켜 주세요.",
    mascotSrc: "../../assets/face-joy.png",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setDialog(false)
    }, "\uCDE8\uC18C"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setDialog(false);
        setToast(true);
        setTimeout(() => setToast(false), 2600);
      }
    }, "\uB2E4\uC6B4\uB85C\uB4DC"))
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: assetStyles.toastWrap
  }, /*#__PURE__*/React.createElement(Toast, {
    title: "\uB2E4\uC6B4\uB85C\uB4DC\uB97C \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4",
    mascotSrc: "../../assets/face-thanks.png",
    onClose: () => setToast(false)
  })));
}
const assetStyles = {
  page: {
    maxWidth: "var(--page-max)",
    margin: "0 auto",
    padding: "40px 32px 80px",
    display: "flex",
    gap: 32,
    alignItems: "flex-start"
  },
  side: {
    width: 240,
    flex: "none",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    background: "var(--surface-card)",
    border: "1px solid var(--border-hairline)",
    borderRadius: "var(--radius-card)",
    padding: "var(--gutter-card)",
    boxShadow: "var(--shadow-sm)",
    position: "sticky",
    top: 88
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  groupLabel: {
    fontWeight: "var(--weight-bold)",
    fontSize: "var(--text-sm)",
    color: "var(--text-strong)"
  },
  bar: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    paddingBottom: 20,
    marginBottom: 24,
    borderBottom: "1px dashed var(--border-dashed)"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16
  },
  toastWrap: {
    position: "fixed",
    bottom: 28,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 60
  }
};
Object.assign(window, {
  AssetsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/brand-site/AssetsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/brand-site/Footer.jsx
try { (() => {
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: footerStyles.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: footerStyles.inner
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/cnu-wordmark.png",
    alt: "\uCDA9\uB0A8\uB300\uD559\uAD50",
    style: {
      height: 34,
      filter: "brightness(0) invert(1)",
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: footerStyles.small
  }, "\uCDA9\uB0A8\uB300\uD559\uAD50 \uBE0C\uB79C\uB4DC \uCE90\uB9AD\uD130 \uCC28\uCC28")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24
    }
  }, ["브랜드 가이드", "에셋 다운로드", "사용 문의"].map(t => /*#__PURE__*/React.createElement("a", {
    key: t,
    href: "#",
    style: footerStyles.link
  }, t)))));
}
const footerStyles = {
  wrap: {
    background: "var(--surface-inverse)",
    marginTop: 40
  },
  inner: {
    maxWidth: "var(--page-max)",
    margin: "0 auto",
    padding: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    flexWrap: "wrap"
  },
  small: {
    color: "var(--navy-100)",
    fontSize: "var(--text-sm)"
  },
  link: {
    color: "var(--teal-200)",
    textDecoration: "none",
    fontSize: "var(--text-sm)",
    fontWeight: "var(--weight-bold)"
  }
};
Object.assign(window, {
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/brand-site/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/brand-site/GuideScreen.jsx
try { (() => {
const PALETTE = [["--navy-900", "#002D72"], ["--teal-500", "#009AB0"], ["--teal-200", "#7ED5D8"], ["--gray-050", "#F5F5F5"], ["--blush-200", "#FFD6D6"]];
function GuideScreen() {
  const {
    Card,
    PillLabel,
    Badge,
    Button,
    Mascot,
    Tabs
  } = window.DS;
  const [tab, setTab] = React.useState("color");
  return /*#__PURE__*/React.createElement("div", {
    style: guideStyles.page
  }, /*#__PURE__*/React.createElement("div", {
    style: guideStyles.head
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PillLabel, {
    ko: "\uC0AC\uC6A9 \uAC00\uC774\uB4DC",
    en: "GUIDE"
  }), /*#__PURE__*/React.createElement("h2", {
    style: guideStyles.h2
  }, "\uCC28\uCC28\uB97C \uC62C\uBC14\uB974\uAC8C \uC0AC\uC6A9\uD558\uB294 \uBC29\uBC95"), /*#__PURE__*/React.createElement("p", {
    style: guideStyles.lede
  }, "\uC0C9\uC0C1, \uCD5C\uC18C \uC5EC\uBC31, \uAE08\uC9C0 \uC0AC\uD56D\uC744 \uD655\uC778\uD55C \uB4A4 \uC0AC\uC6A9\uD574 \uC8FC\uC138\uC694.")), /*#__PURE__*/React.createElement(Mascot, {
    name: "studying",
    height: 170,
    basePath: "../../assets"
  })), /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    variant: "underline",
    items: [{
      value: "color",
      label: "컬러"
    }, {
      value: "space",
      label: "여백"
    }, {
      value: "dont",
      label: "금지 사항"
    }]
  }), tab === "color" && /*#__PURE__*/React.createElement("div", {
    style: guideStyles.swRow
  }, PALETTE.map(([t, hex]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 96,
      borderRadius: "var(--radius-md)",
      background: "var(" + t + ")",
      border: "1px solid var(--border-hairline)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: guideStyles.mono
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      ...guideStyles.mono,
      color: "var(--gray-400)"
    }
  }, hex)))), tab === "space" && /*#__PURE__*/React.createElement(Card, {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      border: "1px dashed var(--border-dashed)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-wordmark.png",
    alt: "\uCC28\uCC28",
    style: {
      height: 80
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: guideStyles.body
  }, "\uB85C\uACE0 \uC8FC\uBCC0\uC5D0\uB294 ", /*#__PURE__*/React.createElement("b", null, "CHA-CHA \uAE00\uC790 \uB192\uC774\uB9CC\uD07C"), "\uC758 \uC5EC\uBC31\uC744 \uD655\uBCF4\uD569\uB2C8\uB2E4. \uB2E4\uB978 \uC694\uC18C\uAC00 \uC774 \uC601\uC5ED\uC5D0 \uB4E4\uC5B4\uC624\uC9C0 \uC54A\uB3C4\uB85D \uD574\uC8FC\uC138\uC694."))), tab === "dont" && /*#__PURE__*/React.createElement("div", {
    style: guideStyles.dontRow
  }, [["원본", "none", "success"], ["색상 변경", "hue-rotate(120deg)", "danger"], ["회전", "none", "danger"], ["비율 왜곡", "none", "danger"]].map(([label, filter, tone], i) => /*#__PURE__*/React.createElement(Card, {
    key: label,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mascot-front.png",
    alt: "",
    style: {
      height: 120,
      filter,
      transform: i === 2 ? "rotate(-14deg)" : "none",
      width: i === 3 ? 130 : "auto",
      objectFit: i === 3 ? "fill" : "contain"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: tone,
    variant: "soft",
    size: "md"
  }, (tone === "success" ? "O " : "X ") + label))))), /*#__PURE__*/React.createElement(Card, {
    variant: "accent",
    size: "lg",
    style: {
      marginTop: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: guideStyles.h3
  }, "\uC0AC\uC6A9 \uBB38\uC758"), /*#__PURE__*/React.createElement("p", {
    style: guideStyles.body
  }, "\uC0C1\uC5C5\uC801 \uC0AC\uC6A9, \uAD7F\uC988 \uC81C\uC791\uC740 \uBE0C\uB79C\uB4DC \uB2F4\uB2F9 \uBD80\uC11C\uB85C \uBB38\uC758\uD574 \uC8FC\uC138\uC694.")), /*#__PURE__*/React.createElement(Button, {
    variant: "accent"
  }, "\uBB38\uC758\uD558\uAE30")));
}
const guideStyles = {
  page: {
    maxWidth: "var(--page-max)",
    margin: "0 auto",
    padding: "40px 32px 80px",
    display: "flex",
    flexDirection: "column",
    gap: 24
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 32
  },
  h2: {
    font: "var(--type-title)",
    fontSize: "var(--text-4xl)",
    margin: "16px 0 8px",
    color: "var(--navy-900)"
  },
  h3: {
    font: "var(--type-subhead)",
    margin: "0 0 6px"
  },
  lede: {
    font: "var(--type-body)",
    color: "var(--text-muted)",
    margin: 0
  },
  body: {
    font: "var(--type-body)",
    color: "var(--text-body)",
    margin: 0,
    maxWidth: 460
  },
  swRow: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 16,
    marginTop: 24
  },
  dontRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    marginTop: 24
  },
  mono: {
    fontFamily: "var(--font-mono), monospace",
    fontSize: 11,
    color: "var(--text-muted)"
  }
};
Object.assign(window, {
  GuideScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/brand-site/GuideScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/brand-site/Header.jsx
try { (() => {
function Header({
  route,
  setRoute
}) {
  const {
    Button
  } = window.DS;
  const items = [["home", "브랜드", "BRAND"], ["assets", "에셋", "ASSETS"], ["guide", "가이드", "GUIDE"]];
  return /*#__PURE__*/React.createElement("header", {
    style: headerStyles.bar
  }, /*#__PURE__*/React.createElement("div", {
    style: headerStyles.inner
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute("home");
    },
    style: headerStyles.brand
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-lockup.png",
    alt: "\uCC28\uCC28 CHA-CHA",
    style: {
      height: 40
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: headerStyles.nav
  }, items.map(([k, ko, en]) => /*#__PURE__*/React.createElement("a", {
    key: k,
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute(k);
    },
    style: {
      ...headerStyles.link,
      ...(route === k ? headerStyles.linkOn : null)
    }
  }, ko, /*#__PURE__*/React.createElement("span", {
    style: headerStyles.linkEn
  }, en)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/cnu-wordmark.png",
    alt: "\uCDA9\uB0A8\uB300\uD559\uAD50",
    style: {
      height: 26,
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "sm",
    onClick: () => setRoute("assets")
  }, "\uC5D0\uC14B \uBC1B\uAE30"))));
}
const headerStyles = {
  bar: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid var(--border-hairline)"
  },
  inner: {
    maxWidth: "var(--page-max)",
    margin: "0 auto",
    padding: "12px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24
  },
  brand: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 28
  },
  link: {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
    textDecoration: "none",
    color: "var(--text-muted)",
    fontWeight: "var(--weight-bold)",
    fontSize: "var(--text-base)",
    paddingBottom: 2,
    borderBottom: "2px solid transparent"
  },
  linkOn: {
    color: "var(--text-strong)",
    borderBottomColor: "var(--teal-500)"
  },
  linkEn: {
    fontFamily: "var(--font-latin)",
    fontWeight: 800,
    fontSize: 10,
    letterSpacing: "0.1em",
    color: "var(--gray-400)"
  }
};
Object.assign(window, {
  Header
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/brand-site/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/brand-site/HomeScreen.jsx
try { (() => {
const CHARACTERISTICS = [["growth", "배움과 성장", "지식과 배움을 통해 끊임없이 성장하는 대학의 가치를 상징합니다."], ["passion", "도전과 열정", "새로운 도전에 주저하지 않고 열정적으로 나아가는 에너지를 담고 있습니다."], ["community", "소통과 함께함", "다양한 사람들이 모여 소통하고 함께 만들어가는 공동체를 의미합니다."], ["future", "미래와 가능성", "무한한 가능성과 밝은 미래를 향해 나아가는 희망을 상징합니다."]];
const VIEWS = ["front", "three-quarter-front", "side", "three-quarter-back", "back"];
function HomeScreen({
  setRoute
}) {
  const {
    Button,
    Card,
    PillLabel,
    Mascot,
    MascotCard,
    Badge
  } = window.DS;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: homeStyles.hero
  }, /*#__PURE__*/React.createElement("div", {
    style: homeStyles.heroText
  }, /*#__PURE__*/React.createElement(PillLabel, {
    ko: "\uBE0C\uB79C\uB4DC \uCE90\uB9AD\uD130",
    en: "MASCOT"
  }), /*#__PURE__*/React.createElement("h1", {
    style: homeStyles.h1
  }, "\uCC28\uCC28"), /*#__PURE__*/React.createElement("p", {
    style: homeStyles.lede
  }, "\uCC28\uCC28\uB294 \uCDA9\uB0A8\uB300\uD559\uAD50\uC758 \uB3C4\uC804\uACFC \uC131\uC7A5\uC744 \uD568\uAED8\uD558\uB294 \uCE5C\uAD6C\uC785\uB2C8\uB2E4.", /*#__PURE__*/React.createElement("br", null), "\uD638\uAE30\uC2EC \uAC00\uB4DD\uD55C \uB9C8\uC74C\uC73C\uB85C \uBC30\uC6B0\uACE0, \uD589\uB3D9\uD558\uACE0, \uD568\uAED8 \uB098\uC544\uAC00\uB294", /*#__PURE__*/React.createElement("br", null), "\uCDA9\uB0A8\uB300\uC758 \uC5D0\uB108\uC9C0\uB97C \uC0C1\uC9D5\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => setRoute("assets")
  }, "\uC5D0\uC14B \uB2E4\uC6B4\uB85C\uB4DC"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    onClick: () => setRoute("guide")
  }, "\uC0AC\uC6A9 \uAC00\uC774\uB4DC"))), /*#__PURE__*/React.createElement(Mascot, {
    name: "front",
    height: 380,
    basePath: "../../assets",
    float: true
  })), /*#__PURE__*/React.createElement("section", {
    style: homeStyles.section
  }, /*#__PURE__*/React.createElement("div", {
    style: homeStyles.head
  }, /*#__PURE__*/React.createElement(PillLabel, {
    en: "360\xB0 VIEW",
    sparkle: true
  }), /*#__PURE__*/React.createElement("span", {
    style: homeStyles.headNote
  }, "\uB2E4\uC12F \uBC29\uD5A5\uC758 \uAE30\uBCF8 \uD615\uD0DC")), /*#__PURE__*/React.createElement("div", {
    style: homeStyles.turnRow
  }, VIEWS.map(v => /*#__PURE__*/React.createElement(MascotCard, {
    key: v,
    name: v,
    height: 150,
    basePath: "../../assets"
  })))), /*#__PURE__*/React.createElement("section", {
    style: homeStyles.section
  }, /*#__PURE__*/React.createElement("div", {
    style: homeStyles.head
  }, /*#__PURE__*/React.createElement(PillLabel, {
    ko: "\uBE0C\uB79C\uB4DC \uD2B9\uC131",
    en: "BRAND CHARACTERISTICS"
  })), /*#__PURE__*/React.createElement("div", {
    style: homeStyles.charGrid
  }, CHARACTERISTICS.map(([icon, title, body]) => /*#__PURE__*/React.createElement(Card, {
    key: icon,
    interactive: true
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icon-" + icon + ".png",
    alt: "",
    style: {
      width: 44,
      height: 44,
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: homeStyles.cardTitle
  }, title), /*#__PURE__*/React.createElement("p", {
    style: homeStyles.cardBody
  }, body))))), /*#__PURE__*/React.createElement("section", {
    style: homeStyles.section
  }, /*#__PURE__*/React.createElement("div", {
    style: homeStyles.head
  }, /*#__PURE__*/React.createElement(PillLabel, {
    ko: "\uC8FC\uC694 \uD3EC\uC988",
    en: "POSES"
  })), /*#__PURE__*/React.createElement("div", {
    style: homeStyles.poseRow
  }, [["cheering", "응원하는 차차"], ["studying", "공부하는 차차"], ["running", "달려가는 차차"], ["together", "함께하는 차차"]].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: homeStyles.poseTile
  }, /*#__PURE__*/React.createElement(Mascot, {
    name: n,
    height: 190,
    basePath: "../../assets"
  }), /*#__PURE__*/React.createElement("span", {
    style: homeStyles.poseLabel
  }, l), /*#__PURE__*/React.createElement(Badge, {
    tone: "navy",
    variant: "soft"
  }, "PNG"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...homeStyles.section,
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "inverse",
    size: "lg",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 32,
      borderRadius: "var(--radius-2xl)"
    }
  }, /*#__PURE__*/React.createElement(Mascot, {
    name: "together",
    height: 170,
    basePath: "../../assets",
    shadow: false
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      ...homeStyles.cardTitle,
      color: "var(--white)",
      fontSize: "var(--text-2xl)"
    }
  }, "\uCC28\uCC28\uC640 \uD568\uAED8 \uB9CC\uB4DC\uB294 \uCEA0\uD37C\uC2A4"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...homeStyles.cardBody,
      color: "var(--navy-100)",
      maxWidth: 520
    }
  }, "\uD559\uACFC \uD589\uC0AC, \uAD7F\uC988, \uC548\uB0B4\uBB3C\uC5D0 \uCC28\uCC28\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC0AC\uC6A9 \uC804 \uAC00\uC774\uB4DC\uB77C\uC778\uC744 \uD655\uC778\uD574 \uC8FC\uC138\uC694."), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    style: {
      marginTop: 16
    },
    onClick: () => setRoute("guide")
  }, "\uAC00\uC774\uB4DC \uBCF4\uAE30")))));
}
const homeStyles = {
  hero: {
    maxWidth: "var(--page-max)",
    margin: "0 auto",
    padding: "56px 32px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 40
  },
  heroText: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "flex-start"
  },
  h1: {
    font: "var(--type-display)",
    fontSize: 96,
    margin: 0,
    color: "var(--navy-900)",
    lineHeight: 1
  },
  lede: {
    font: "var(--type-body)",
    fontSize: "var(--text-lg)",
    color: "var(--text-body)",
    margin: 0,
    textWrap: "pretty"
  },
  section: {
    maxWidth: "var(--page-max)",
    margin: "0 auto",
    padding: "40px 32px 0"
  },
  head: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    paddingBottom: 20,
    marginBottom: 24,
    borderBottom: "1px dashed var(--border-dashed)"
  },
  headNote: {
    font: "var(--type-caption)",
    color: "var(--text-muted)"
  },
  turnRow: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 16
  },
  charGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16
  },
  cardTitle: {
    font: "var(--type-subhead)",
    margin: "0 0 8px",
    color: "var(--text-strong)"
  },
  cardBody: {
    font: "var(--type-body-sm)",
    color: "var(--text-muted)",
    margin: 0,
    lineHeight: 1.7
  },
  poseRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16
  },
  poseTile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    background: "var(--surface-accent)",
    borderRadius: "var(--radius-card)",
    padding: "24px 16px"
  },
  poseLabel: {
    fontWeight: "var(--weight-bold)",
    fontSize: "var(--text-base)",
    color: "var(--text-strong)"
  }
};
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/brand-site/HomeScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Mascot = __ds_scope.Mascot;

__ds_ns.MASCOT_NAMES = __ds_scope.MASCOT_NAMES;

__ds_ns.MASCOT_LABELS = __ds_scope.MASCOT_LABELS;

__ds_ns.MascotCard = __ds_scope.MascotCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.PillLabel = __ds_scope.PillLabel;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
