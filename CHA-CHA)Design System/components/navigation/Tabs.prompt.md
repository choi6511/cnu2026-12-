Controlled tabs. `pill` for brand pages, `underline` for app-like views.

```jsx
<Tabs items={["표정", "포즈", "360°"]} value={tab} onChange={setTab} />
<Tabs variant="underline" items={[{ value: "all", label: "전체", count: 19 }]} value="all" />
```
