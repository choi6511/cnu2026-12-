import React from "react";
import { injectStyles } from "../styles.jsx";

injectStyles("cha-mascot", `
.cha-mascot{display:block;height:auto;object-fit:contain}
.cha-mascot--shadow{filter:drop-shadow(var(--shadow-mascot))}
.cha-mascot--float{animation:cha-float 4s var(--ease-in-out) infinite}
@keyframes cha-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@media (prefers-reduced-motion:reduce){.cha-mascot--float{animation:none}}
`);

const FILES = {
  front: "mascot-front", "three-quarter-front": "mascot-three-quarter-front", side: "mascot-side",
  "three-quarter-back": "mascot-three-quarter-back", back: "mascot-back",
  basic: "face-basic", joy: "face-joy", cheer: "face-cheer", think: "face-think", surprise: "face-surprise", thanks: "face-thanks",
  cheering: "pose-cheering", studying: "pose-studying", running: "pose-running", together: "pose-together",
  wordmark: "logo-wordmark", lockup: "logo-lockup", cnu: "cnu-wordmark"
};

const LABELS = {
  front: "FRONT", "three-quarter-front": "3/4 FRONT", side: "SIDE", "three-quarter-back": "3/4 BACK", back: "BACK",
  basic: "기본", joy: "기쁨", cheer: "응원", think: "생각", surprise: "놀람", thanks: "감사",
  cheering: "응원하는 차차", studying: "공부하는 차차", running: "달려가는 차차", together: "함께하는 차차",
  wordmark: "차차 CHA-CHA", lockup: "차차 CHA-CHA", cnu: "충남대학교"
};

export function Mascot({ name = "front", height = 220, basePath = "../../assets", shadow = true, float = false, className = "", style, ...rest }) {
  const file = FILES[name] || FILES.front;
  const cls = ["cha-mascot", shadow ? "cha-mascot--shadow" : "", float ? "cha-mascot--float" : "", className].filter(Boolean).join(" ");
  return <img className={cls} src={basePath + "/" + file + ".png"} alt={LABELS[name] || "차차"} style={{ height: typeof height === "number" ? height + "px" : height, ...style }} {...rest} />;
}

export const MASCOT_NAMES = Object.keys(FILES);
export const MASCOT_LABELS = LABELS;
