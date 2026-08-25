# UI kit — 차차 브랜드 사이트 (Brand site)

An **extrapolated** brand microsite for 차차. No product UI was provided in the source, so this kit demonstrates how the brand's own visual language (capsule section labels, dashed region dividers, white cards on off-white, mascot-first hero) behaves in an interface. It is *not* a recreation of an existing shipped screen.

Open `index.html`. Everything is click-through and fake.

## Screens

| File | Screen | What to try |
|---|---|---|
| `HomeScreen.jsx` | 브랜드 — hero, 360° turnaround, four brand characteristics, poses, inverse CTA panel | the two hero buttons route to the other screens |
| `AssetsScreen.jsx` | 에셋 — filter sidebar + tabbed asset grid | pick tiles → 다운로드 → dialog → toast; type in 검색; switch tabs |
| `GuideScreen.jsx` | 가이드 — palette, clear space, don'ts | underline tabs switch the three panels |
| `Header.jsx` / `Footer.jsx` | sticky blurred header, navy footer | nav links switch screens |

## Notes

- All UI is composed from the design system's own components via `window.CHACHADesignSystem_c46830` (aliased to `window.DS` in `index.html`) — nothing is re-implemented locally.
- `Mascot` / `MascotCard` take `basePath="../../assets"` from this depth.
- Interface icons here are minimal inline glyphs (×, i); a real build should use Lucide at `stroke-width: 2` — see readme.md > ICONOGRAPHY.
- The 문의하기 / 다운로드 actions are non-functional by design.
