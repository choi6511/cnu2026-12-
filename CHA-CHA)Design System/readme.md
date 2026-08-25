# 차차 (CHA-CHA) Design System

A mascot-led brand system for **차차 (CHA-CHA)**, the character mascot of **충남대학교 / Chungnam National University (CNU)**.

> 차차는 충남대학교의 도전과 성장을 함께하는 친구입니다. 호기심 가득한 마음으로 배우고, 행동하고, 함께 나아가는 충남대의 에너지를 상징합니다.

## Sources given

| Source | Path | Notes |
|---|---|---|
| Mascot brand sheet (PNG, 1536×1024) | `uploads/ChatGPT Image Aug 24, 2026, 03_12_01 PM.png` → copied to `assets/brand-sheet.png` | The **only** source provided. Contains: 360° turnaround (5 views), 6 expressions, 4 key poses, 5-color palette with hex values, logo lockup, CNU wordmark, 4 brand characteristics. |
| Company description | "차차" (chat) | — |

No codebase, Figma file, deck, or website was provided. **Everything in this system is derived from that single sheet**, plus tokens/components extrapolated from its visual language. Anything not visible in the sheet is marked as an *intentional addition* below so consumers know what is canon and what is scaffolding.

## Products / surfaces

The sheet defines a **brand/character identity**, not a product UI. There is therefore one UI kit — `ui_kits/brand-site/`, a 차차 brand microsite (the surface such a mascot sheet exists to feed: character intro, turnaround gallery, expression/pose library, asset downloads). It is an extrapolation from the sheet's own layout language (capsule section labels, dashed dividers, white cards on off-white, mascot-first hero), not a recreation of a real shipped product. Treat it as a reference for *how the brand behaves in an interface*, not as an existing screen.

---

## CONTENT FUNDAMENTALS

**Language.** Korean-first, with English as a secondary, mostly-uppercase companion. Every section label on the sheet is bilingual in one line: `표정 (EXPRESSIONS)`, `주요 포즈 (POSES)`, `컬러 팔레트 (COLOR PALETTE)`, `전용 서체 (TYPOGRAPHY)`. Follow that exact pattern — Korean first, English in parentheses, uppercase, no colon.

**Voice.** 차차 is described as a *친구* (friend), not a product or a logo. Copy is warm, plain, and encouraging; it never sells. The core sentence is the model for everything: subject → verb chain → `~합니다` close.

- ✅ `차차는 충남대학교의 도전과 성장을 함께하는 친구입니다.`
- ✅ `무한한 가능성과 밝은 미래를 향해 나아가는 희망을 상징합니다.`
- ❌ `차차와 함께라면 대학생활이 완벽해집니다!` (over-promising, exclamation)

**Person.** Third person for the mascot (`차차는 …`), first-person-plural for the institution (`충남대의 에너지`). Avoid `당신` / `여러분` in brand copy; use it only in interface instructions where a direct address is unavoidable.

**Register.** Polite formal `합니다`체 for descriptions and body copy. Short verbless noun phrases for labels and captions (`응원하는 차차`, `공부하는 차차`, `기본`, `기쁨`, `감사`). UI buttons use the plain imperative stem: `다운로드`, `자세히 보기`, `전체 보기` — no `~해주세요` on buttons.

**Naming pattern for artwork.** `<동사>하는 차차` for poses (응원하는 차차 / 공부하는 차차 / 달려가는 차차 / 함께하는 차차); a single emotion noun for expressions (기본 / 기쁨 / 응원 / 생각 / 놀람 / 감사); English orientation words in caps for the turnaround (FRONT / 3/4 FRONT / SIDE / 3/4 BACK / BACK).

**Casing.** Korean has no case, so hierarchy comes from weight and size. Latin text: UPPERCASE with wide tracking (`0.06–0.12em`) for labels and section headers; sentence case for English prose. The logo Latin is `CHA-CHA` — always hyphenated, always uppercase, never `ChaCha` or `Chacha`.

**Headline lengths.** Brand copy sets in short 4–6 word lines with manual breaks, as on the sheet (five stacked lines for the intro paragraph). Prefer `text-wrap: pretty` plus a narrow measure (~22–28 Korean characters) over long single-line headings.

**Emoji.** **Never.** The mascot *is* the emotional vocabulary — use `assets/face-*.png` where a product would reach for an emoji. Sparkle glyphs (`✦`) appear as tiny decorative accents beside capsule labels on the sheet; that is the one non-alphabetic mark in the system, and it is decoration, not punctuation.

**Punctuation.** Full stops on sentences, none on labels or captions. No exclamation marks in brand copy (the character's energy carries it). `/` for bilingual or paired terms. Numbers are Arabic; `360°` keeps the degree sign.

**Vibe.** 밝고 다정하고 성실한 — bright, kind, diligent. University-official but never bureaucratic: the sheet's four brand characteristics (배움과 성장, 도전과 열정, 소통과 함께함, 미래와 가능성) are the four notes every piece of copy should sound like one of.

---

## VISUAL FOUNDATIONS

### Color

Five canonical values, taken verbatim from the sheet's 컬러 팔레트 row:

| Token | Hex | Role |
|---|---|---|
| `--navy-900` | `#002D72` | Logo, all illustration outlines, body text, primary action, jacket |
| `--teal-500` | `#009AB0` | Point color: hair, capsule labels, accents, links |
| `--teal-200` | `#7ED5D8` | Sub-point: highlights, dashed dividers, tints |
| `--gray-050` | `#F5F5F5` | Page background |
| `--blush-200` | `#FFD6D6` | Cheek blush, soft emphasis, gentle status |

The mix is deliberately **navy-dominant with teal as the only saturated accent**. Blush is used in tiny quantities (cheeks, one badge, one highlight) — never as a surface. `--cream-100` (`#F7F1E2`) exists only because the mascot's face is that tone; use it for large warm surfaces where white would feel clinical. Everything else in `tokens/colors.css` is a derived ramp — do not introduce a hue that isn't navy, teal, blush, or neutral. **No gradients** anywhere in the brand sheet: fills are flat. The one acceptable gradient is a protection scrim over photography (`linear-gradient(to top, rgba(0,45,114,.72), transparent)`).

### Type

Original faces on the sheet are a rounded Korean display face for the 차차 logo, a geometric rounded Latin for `CHA-CHA`, and a clean Korean gothic for body. No font files were provided, so this system substitutes **Google Fonts** (see *Font substitutions*).

- **Display** — `Jua` (`--font-display`): the 차차 wordmark register, section hero numbers, big friendly statements. Single weight; size does the work. Never for paragraphs.
- **Core / body** — `Gothic A1` (`--font-core`): all Korean UI and prose, weights 300–800. `700/800` for headings, `400` for body at `line-height: 1.75` (Korean needs the air).
- **Latin** — `Nunito` (`--font-latin`): `CHA-CHA`, `CNU`, uppercase labels, numerals. `800` + `0.12em` tracking for the sheet's capsule labels.
- **Mono** — system mono stack (`--font-mono`: `ui-monospace, SF Mono, Menlo, Consolas`): *intentional addition*, only for hex codes and token names in documentation. Not a brand face, so no webfont is shipped.

Role tokens (`--type-display`, `--type-title`, `--type-heading`, `--type-body`, `--type-label`, `--type-caption`) live in `tokens/typography.css`; prefer them over raw size tokens.

### Spacing & layout

4px base grid, generous. Cards use `24px` inner padding (`--gutter-card`), large panels `32px`; sections separate by `64px` (`--gutter-section`); content maxes at `1200px` (`--page-max`). The sheet's own structure is the layout rule: **one full-bleed hero band, then a row of equal-height panels, then a footer strip of small utility panels** — each region introduced by a capsule label sitting on its top-left edge. Panels are separated by *dashed* rules, not solid borders. Control heights are fixed at 32/40/48px.

### Backgrounds

Flat `--gray-050` page, white cards. No photography in the source, no textures, no repeating patterns, no noise/grain, no gradients. Where a large empty area needs interest, the answer is **a mascot cutout at low opacity or bled off the edge**, or a `--teal-050` tint block — not decoration. Full-bleed imagery, if a consumer adds photography, should be cool-toned and bright to sit with the palette; keep it desaturated enough that teal still reads as the accent.

### Borders, radii, cards

Corner radii are large and consistently rounded — nothing in the system is a sharp rectangle. `--radius-md: 14px` for fields, `--radius-lg: 20px` for cards (`--radius-card`), `--radius-xl/2xl` for hero panels, and `--radius-pill: 999px` for every button, chip, and section label (`--radius-control`). Illustration outlines are a heavy `2px` navy (`--border-w-strong`) — mirror that weight when a UI element needs to feel drawn (outline buttons, selected states) rather than a hairline. Standard card = white fill, `--radius-lg`, `1px --border-hairline`, `--shadow-sm`. Elevated/interactive card = no border, `--shadow-md`, lifts on hover. Never a card with a colored left border only.

### Shadows

Soft, cool, low-opacity navy — never black, never tight. `--shadow-xs/sm/md/lg` for elevation, `--shadow-inset-field` for inputs, `--shadow-focus` (3px teal at 35%) for focus rings, `--shadow-mascot` for the tapered ground ellipse under a mascot cutout (the sheet draws exactly this: a soft grey ellipse, no hard edge).

### Transparency & blur

Used sparingly and only for two jobs: (1) sticky headers — `rgba(255,255,255,0.82)` + `backdrop-filter: blur(12px)` + hairline bottom border; (2) modal scrims — `rgba(0,45,114,0.42)`, no blur. Body text is never transparent; use `--text-muted` instead of opacity. Tints (`--teal-050`, `--navy-050`) are solid tokens, not alpha layers.

### Animation

Quick and springy but small in amplitude — the character is energetic, the interface is calm. `--dur-fast 120ms` for color/opacity, `--dur-base 180ms` for most transitions, `--dur-slow 280ms` for panels/modals, `--dur-bounce 420ms` with `--ease-bounce` (`cubic-bezier(0.34,1.56,0.64,1)`) reserved for mascot entrances and toast pops. Default easing is `--ease-standard`. Fades always travel with a small `translateY` (6–8px). No parallax, no continuous looping motion, no rotation beyond ±3°. Respect `prefers-reduced-motion` by dropping transforms and keeping opacity.

### Hover, press, focus, disabled

- **Hover:** solid fills go one step *darker* (`--action-primary-hover`, `--action-accent-hover`); outline/ghost controls fill with `--teal-050`; cards lift by `--hover-lift` (`translateY(-2px)`) and gain `--shadow-md`. Opacity is never the hover mechanism.
- **Press:** `--press-scale` (`scale(0.97)`), shadow drops to `--shadow-xs`, fill goes to the `-active` token. Release eases with `--ease-bounce`.
- **Focus:** always visible — `--shadow-focus` ring, 2px offset, never removed.
- **Disabled:** `--action-disabled` fill, `--action-disabled-text` label, no shadow, `cursor: not-allowed`, opacity untouched.

### Protection & containment

The sheet's signature device is the **teal capsule label** (`PillLabel`): white 800-weight text on `--teal-500`, `--radius-pill`, `6px 14px`, often with a `✦` sparkle beside it. Use capsules — not scrims — to label regions on light backgrounds. Reserve protection gradients for text over imagery only.

### Imagery vibe

The character artwork is flat vector: heavy navy outline, flat teal/cream/navy fills, one blush accent, tiny white highlight shapes, soft grey ground shadow. Cool, bright, high-contrast, zero texture. Any added imagery should read cool and clean; avoid warm/golden or grainy photography, and never place the mascot on a busy background.

---

## ICONOGRAPHY

The sheet contains exactly **one icon set**: four solid glyphs in filled circles beside the 브랜드 특성 list — a graduation cap (배움과 성장), a heart (도전과 열정), a group of people (소통과 함께함), and a star (미래와 가능성). They are extracted verbatim to `assets/icon-growth.png`, `icon-passion.png`, `icon-community.png`, `icon-future.png` (56px PNG, transparent). Style: **solid/filled, no strokes, white glyph knocked out of a navy or teal filled circle**, alternating navy → teal down a list.

There is no icon font, sprite, or SVG set in the source. For general UI iconography this system substitutes **[Lucide](https://lucide.dev) via CDN** — *flagged substitution*. Lucide is stroked, not filled, so the rule is:

- **Brand/marketing contexts** → use the four extracted circle icons, or a mascot cutout. Never re-draw them.
- **Interface contexts** (nav, fields, toolbars) → Lucide at `stroke-width: 2`, `currentColor`, 20px or 24px, square canvas, colored `--navy-900` or `--teal-500`. 2px matches the mascot's own outline weight.
- **Emotional states** → `assets/face-*.png`, not icons and never emoji.

No emoji. No unicode characters as icons, with the single exception of the decorative `✦` sparkle beside capsule labels.

Because the brand sheet is a raster PNG, all extracted assets are **raster PNGs with transparent backgrounds**, cropped programmatically from the original — nothing was redrawn. Vector (SVG/AI) originals should be requested from the brand owner; see *Caveats*.

## Logo

`assets/logo-wordmark.png` (차차 + CHA-CHA stacked), `assets/logo-lockup.png` (mascot + wordmark, horizontal, with the teal rule above it as drawn on the sheet), `assets/cnu-wordmark.png` (충남대학교 / CHUNGNAM NATIONAL UNIVERSITY). All extracted from the sheet at source resolution; **no logo was drawn or reconstructed**. Clear space: at least the height of the `CHA-CHA` line on all sides. Never recolor, outline, rotate, or stretch; on navy backgrounds use a white-knockout version (not yet available — request from brand owner).

## Font substitutions ⚠️

No font files were provided. Substituted from Google Fonts by shape match:

| Role | Original (on sheet) | Substitute |
|---|---|---|
| 차차 logo / display Korean | heavy rounded Korean display | **Jua** |
| CHA-CHA / Latin labels | geometric rounded sans, wide tracking | **Nunito** 700/800 |
| Korean body & UI | clean Korean gothic | **Gothic A1** |

**Please send the real font files (or the licensed font names) so these can be replaced.** The 충남대학교 wordmark on the sheet appears to use an institutional face that no Google font matches closely; it is used as artwork (`assets/cnu-wordmark.png`) rather than live text.

---

## Index

**Root**
- `styles.css` — the single entry point consumers link (`@import` list only)
- `readme.md` — this file
- `SKILL.md` — Agent-Skill wrapper for use in Claude Code
- `thumbnail.html` — homepage tile

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadows.css`, `motion.css`

**`assets/`**
- Logos: `logo-wordmark.png`, `logo-lockup.png`, `cnu-wordmark.png`
- Turnaround: `mascot-front`, `mascot-three-quarter-front`, `mascot-side`, `mascot-three-quarter-back`, `mascot-back`
- Expressions: `face-basic`, `face-joy`, `face-cheer`, `face-think`, `face-surprise`, `face-thanks`
- Poses: `pose-cheering`, `pose-studying`, `pose-running`, `pose-together`
- Brand icons: `icon-growth`, `icon-passion`, `icon-community`, `icon-future`
- `brand-sheet.png` — the full original source sheet

**`components/`**
- `core/` — `Button`, `IconButton`, `Card`, `Badge`, `Tag`, `PillLabel`
- `forms/` — `Field`, `Input`, `Select`, `Checkbox`, `Radio`, `Switch`
- `feedback/` — `Dialog`, `Toast`, `Tooltip`
- `navigation/` — `Tabs`
- `brand/` — `Mascot`, `MascotCard`

**`ui_kits/brand-site/`** — `README.md`, `index.html`, `Header.jsx`, `Hero.jsx`, `Turnaround.jsx`, `ExpressionLibrary.jsx`, `Characteristics.jsx`, `DownloadPanel.jsx`, `Footer.jsx`

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand groups) shown in the Design System tab.

### Intentional additions

Nothing in the source defines UI components, so the standard primitive set was authored from the sheet's visual language. Two additions are brand-specific rather than generic:

- **`PillLabel`** — the sheet's own capsule section label, its single most recognizable UI device.
- **`Field`** — the shared label/hint/error wrapper the form controls sit in.
- **`Mascot` / `MascotCard`** — a typed wrapper over the extracted artwork so consumers reference poses/expressions by name instead of hardcoding file paths.

`Tabs`, `Toast`, `Tooltip`, `Dialog` and the form controls have no counterpart in the source; they follow the derived tokens and should be treated as reasonable defaults, not canon.

## Caveats

- Single raster source. No vector logo, no font files, no product UI, no tone-of-voice document.
- Palette hexes and the four brand-characteristic icons are canon (read from the sheet). Radii, spacing, shadows, motion and all components are **derived**.
- The UI kit is an extrapolated brand microsite, not a recreation of an existing product.
