Capsule action button — navy `primary` for the main action, teal `accent` for brand/marketing CTAs, `outline` (2px navy, mascot-outline weight) for secondary, `ghost` for tertiary/inline.

```jsx
<Button variant="primary" size="md">자세히 보기</Button>
<Button variant="accent" iconLeft={<DownloadIcon />}>다운로드</Button>
<Button variant="outline" size="sm">전체 보기</Button>
```

Sizes map to `--control-h-sm/md/lg` (32/40/48px). Labels use the plain imperative stem — never `~해주세요`. Press gives `scale(0.97)`; focus always shows the teal ring.
