const PALETTE = [["--navy-900", "#002D72"], ["--teal-500", "#009AB0"], ["--teal-200", "#7ED5D8"], ["--gray-050", "#F5F5F5"], ["--blush-200", "#FFD6D6"]];

function GuideScreen() {
  const { Card, PillLabel, Badge, Button, Mascot, Tabs } = window.DS;
  const [tab, setTab] = React.useState("color");
  return (
    <div style={guideStyles.page}>
      <div style={guideStyles.head}>
        <div>
          <PillLabel ko="사용 가이드" en="GUIDE" />
          <h2 style={guideStyles.h2}>차차를 올바르게 사용하는 방법</h2>
          <p style={guideStyles.lede}>색상, 최소 여백, 금지 사항을 확인한 뒤 사용해 주세요.</p>
        </div>
        <Mascot name="studying" height={170} basePath="../../assets" />
      </div>

      <Tabs value={tab} onChange={setTab} variant="underline" items={[{ value: "color", label: "컬러" }, { value: "space", label: "여백" }, { value: "dont", label: "금지 사항" }]} />

      {tab === "color" && (
        <div style={guideStyles.swRow}>
          {PALETTE.map(([t, hex]) => (
            <div key={t} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ height: 96, borderRadius: "var(--radius-md)", background: "var(" + t + ")", border: "1px solid var(--border-hairline)" }} />
              <span style={guideStyles.mono}>{t}</span>
              <span style={{ ...guideStyles.mono, color: "var(--gray-400)" }}>{hex}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "space" && (
        <Card style={{ marginTop: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ padding: 28, border: "1px dashed var(--border-dashed)", borderRadius: "var(--radius-md)" }}>
              <img src="../../assets/logo-wordmark.png" alt="차차" style={{ height: 80 }} />
            </div>
            <p style={guideStyles.body}>로고 주변에는 <b>CHA-CHA 글자 높이만큼</b>의 여백을 확보합니다. 다른 요소가 이 영역에 들어오지 않도록 해주세요.</p>
          </div>
        </Card>
      )}

      {tab === "dont" && (
        <div style={guideStyles.dontRow}>
          {[["원본", "none", "success"], ["색상 변경", "hue-rotate(120deg)", "danger"], ["회전", "none", "danger"], ["비율 왜곡", "none", "danger"]].map(([label, filter, tone], i) => (
            <Card key={label} style={{ textAlign: "center" }}>
              <img src="../../assets/mascot-front.png" alt="" style={{ height: 120, filter, transform: i === 2 ? "rotate(-14deg)" : "none", width: i === 3 ? 130 : "auto", objectFit: i === 3 ? "fill" : "contain" }} />
              <div style={{ marginTop: 12 }}><Badge tone={tone} variant="soft" size="md">{(tone === "success" ? "O " : "X ") + label}</Badge></div>
            </Card>
          ))}
        </div>
      )}

      <Card variant="accent" size="lg" style={{ marginTop: 40, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <div>
          <h3 style={guideStyles.h3}>사용 문의</h3>
          <p style={guideStyles.body}>상업적 사용, 굿즈 제작은 브랜드 담당 부서로 문의해 주세요.</p>
        </div>
        <Button variant="accent">문의하기</Button>
      </Card>
    </div>
  );
}

const guideStyles = {
  page: { maxWidth: "var(--page-max)", margin: "0 auto", padding: "40px 32px 80px", display: "flex", flexDirection: "column", gap: 24 },
  head: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 },
  h2: { font: "var(--type-title)", fontSize: "var(--text-4xl)", margin: "16px 0 8px", color: "var(--navy-900)" },
  h3: { font: "var(--type-subhead)", margin: "0 0 6px" },
  lede: { font: "var(--type-body)", color: "var(--text-muted)", margin: 0 },
  body: { font: "var(--type-body)", color: "var(--text-body)", margin: 0, maxWidth: 460 },
  swRow: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginTop: 24 },
  dontRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 24 },
  mono: { fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--text-muted)" }
};

Object.assign(window, { GuideScreen });
