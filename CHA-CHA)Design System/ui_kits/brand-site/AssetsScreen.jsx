const GROUPS = {
  face: [["basic", "기본"], ["joy", "기쁨"], ["cheer", "응원"], ["think", "생각"], ["surprise", "놀람"], ["thanks", "감사"]],
  pose: [["cheering", "응원하는 차차"], ["studying", "공부하는 차차"], ["running", "달려가는 차차"], ["together", "함께하는 차차"]],
  view: [["front", "FRONT"], ["three-quarter-front", "3/4 FRONT"], ["side", "SIDE"], ["three-quarter-back", "3/4 BACK"], ["back", "BACK"]],
  logo: [["wordmark", "차차 워드마크"], ["lockup", "가로 조합"], ["cnu", "충남대학교"]]
};

function AssetsScreen() {
  const { Button, Card, PillLabel, Tabs, Tag, Input, Select, Checkbox, Switch, MascotCard, Dialog, Toast, Badge, IconButton, Tooltip, Field } = window.DS;
  const [tab, setTab] = React.useState("face");
  const [picked, setPicked] = React.useState(["joy"]);
  const [q, setQ] = React.useState("");
  const [dialog, setDialog] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const list = GROUPS[tab].filter(([, l]) => l.includes(q));
  const toggle = (n) => setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  return (
    <div style={assetStyles.page}>
      <aside style={assetStyles.side}>
        <PillLabel ko="필터" en="FILTER" sparkle={false} />
        <Field label="검색" htmlFor="q"><Input id="q" placeholder="이름으로 찾기" value={q} onChange={(e) => setQ(e.target.value)} /></Field>
        <Field label="파일 형식" htmlFor="fmt"><Select id="fmt" options={["PNG (투명)", "PNG (흰 배경)", "SVG — 준비 중"]} /></Field>
        <div style={assetStyles.group}>
          <span style={assetStyles.groupLabel}>해상도</span>
          <Checkbox label="1x · 화면용" defaultChecked />
          <Checkbox label="2x · 인쇄용" defaultChecked />
          <Checkbox label="원본 (2400px)" />
        </div>
        <Switch label="투명 배경만" defaultChecked />
        <div style={{ height: 1, background: "var(--border-hairline)" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["표정", "포즈", "360°", "로고"].map((t) => <Tag key={t} variant="dashed">{t}</Tag>)}
        </div>
      </aside>

      <main style={{ flex: 1, minWidth: 0 }}>
        <div style={assetStyles.bar}>
          <Tabs value={tab} onChange={setTab} items={[
            { value: "face", label: "표정", count: 6 },
            { value: "pose", label: "포즈", count: 4 },
            { value: "view", label: "360°", count: 5 },
            { value: "logo", label: "로고", count: 3 }
          ]} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
            <Badge tone="teal" variant="soft" size="md">{picked.length}개 선택</Badge>
            <Tooltip content="선택 해제"><IconButton label="선택 해제" variant="outline" size="sm" onClick={() => setPicked([])}>×</IconButton></Tooltip>
            <Button variant="accent" onClick={() => setDialog(true)} disabled={picked.length === 0}>다운로드</Button>
          </div>
        </div>

        <div style={assetStyles.grid}>
          {list.map(([n, l]) => (
            <MascotCard key={n} name={n} label={l} height={tab === "logo" ? 70 : 120} basePath="../../assets"
              selected={picked.includes(n)} onClick={() => toggle(n)} caption={picked.includes(n) ? "선택됨" : "PNG · 투명"} />
          ))}
          {list.length === 0 && <Card style={{ gridColumn: "1 / -1", textAlign: "center" }}>검색 결과가 없습니다.</Card>}
        </div>
      </main>

      <Dialog open={dialog} onClose={() => setDialog(false)} title="에셋을 다운로드할까요?"
        description={picked.length + "개 파일이 zip으로 저장됩니다. 사용 시 가이드라인을 지켜 주세요."}
        mascotSrc="../../assets/face-joy.png"
        footer={<>
          <Button variant="ghost" onClick={() => setDialog(false)}>취소</Button>
          <Button onClick={() => { setDialog(false); setToast(true); setTimeout(() => setToast(false), 2600); }}>다운로드</Button>
        </>} />

      {toast && <div style={assetStyles.toastWrap}><Toast title="다운로드를 시작했습니다" mascotSrc="../../assets/face-thanks.png" onClose={() => setToast(false)} /></div>}
    </div>
  );
}

const assetStyles = {
  page: { maxWidth: "var(--page-max)", margin: "0 auto", padding: "40px 32px 80px", display: "flex", gap: 32, alignItems: "flex-start" },
  side: { width: 240, flex: "none", display: "flex", flexDirection: "column", gap: 18, background: "var(--surface-card)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-card)", padding: "var(--gutter-card)", boxShadow: "var(--shadow-sm)", position: "sticky", top: 88 },
  group: { display: "flex", flexDirection: "column", gap: 10 },
  groupLabel: { fontWeight: "var(--weight-bold)", fontSize: "var(--text-sm)", color: "var(--text-strong)" },
  bar: { display: "flex", alignItems: "center", gap: 16, paddingBottom: 20, marginBottom: 24, borderBottom: "1px dashed var(--border-dashed)" },
  grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 },
  toastWrap: { position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 60 }
};

Object.assign(window, { AssetsScreen });
