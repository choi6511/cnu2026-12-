const CHARACTERISTICS = [
  ["growth", "배움과 성장", "지식과 배움을 통해 끊임없이 성장하는 대학의 가치를 상징합니다."],
  ["passion", "도전과 열정", "새로운 도전에 주저하지 않고 열정적으로 나아가는 에너지를 담고 있습니다."],
  ["community", "소통과 함께함", "다양한 사람들이 모여 소통하고 함께 만들어가는 공동체를 의미합니다."],
  ["future", "미래와 가능성", "무한한 가능성과 밝은 미래를 향해 나아가는 희망을 상징합니다."]
];

const VIEWS = ["front", "three-quarter-front", "side", "three-quarter-back", "back"];

function HomeScreen({ setRoute }) {
  const { Button, Card, PillLabel, Mascot, MascotCard, Badge } = window.DS;
  return (
    <div>
      <section style={homeStyles.hero}>
        <div style={homeStyles.heroText}>
          <PillLabel ko="브랜드 캐릭터" en="MASCOT" />
          <h1 style={homeStyles.h1}>차차</h1>
          <p style={homeStyles.lede}>차차는 충남대학교의 도전과 성장을 함께하는 친구입니다.<br />호기심 가득한 마음으로 배우고, 행동하고, 함께 나아가는<br />충남대의 에너지를 상징합니다.</p>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <Button size="lg" onClick={() => setRoute("assets")}>에셋 다운로드</Button>
            <Button size="lg" variant="outline" onClick={() => setRoute("guide")}>사용 가이드</Button>
          </div>
        </div>
        <Mascot name="front" height={380} basePath="../../assets" float />
      </section>

      <section style={homeStyles.section}>
        <div style={homeStyles.head}><PillLabel en="360° VIEW" sparkle /><span style={homeStyles.headNote}>다섯 방향의 기본 형태</span></div>
        <div style={homeStyles.turnRow}>
          {VIEWS.map((v) => <MascotCard key={v} name={v} height={150} basePath="../../assets" />)}
        </div>
      </section>

      <section style={homeStyles.section}>
        <div style={homeStyles.head}><PillLabel ko="브랜드 특성" en="BRAND CHARACTERISTICS" /></div>
        <div style={homeStyles.charGrid}>
          {CHARACTERISTICS.map(([icon, title, body]) => (
            <Card key={icon} interactive>
              <img src={"../../assets/icon-" + icon + ".png"} alt="" style={{ width: 44, height: 44, marginBottom: 14 }} />
              <h3 style={homeStyles.cardTitle}>{title}</h3>
              <p style={homeStyles.cardBody}>{body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section style={homeStyles.section}>
        <div style={homeStyles.head}><PillLabel ko="주요 포즈" en="POSES" /></div>
        <div style={homeStyles.poseRow}>
          {[["cheering", "응원하는 차차"], ["studying", "공부하는 차차"], ["running", "달려가는 차차"], ["together", "함께하는 차차"]].map(([n, l]) => (
            <div key={n} style={homeStyles.poseTile}>
              <Mascot name={n} height={190} basePath="../../assets" />
              <span style={homeStyles.poseLabel}>{l}</span>
              <Badge tone="navy" variant="soft">PNG</Badge>
            </div>
          ))}
        </div>
      </section>

      <section style={{ ...homeStyles.section, paddingBottom: 80 }}>
        <Card variant="inverse" size="lg" style={{ display: "flex", alignItems: "center", gap: 32, borderRadius: "var(--radius-2xl)" }}>
          <Mascot name="together" height={170} basePath="../../assets" shadow={false} />
          <div>
            <h3 style={{ ...homeStyles.cardTitle, color: "var(--white)", fontSize: "var(--text-2xl)" }}>차차와 함께 만드는 캠퍼스</h3>
            <p style={{ ...homeStyles.cardBody, color: "var(--navy-100)", maxWidth: 520 }}>학과 행사, 굿즈, 안내물에 차차를 사용할 수 있습니다. 사용 전 가이드라인을 확인해 주세요.</p>
            <Button variant="accent" style={{ marginTop: 16 }} onClick={() => setRoute("guide")}>가이드 보기</Button>
          </div>
        </Card>
      </section>
    </div>
  );
}

const homeStyles = {
  hero: { maxWidth: "var(--page-max)", margin: "0 auto", padding: "56px 32px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40 },
  heroText: { display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" },
  h1: { font: "var(--type-display)", fontSize: 96, margin: 0, color: "var(--navy-900)", lineHeight: 1 },
  lede: { font: "var(--type-body)", fontSize: "var(--text-lg)", color: "var(--text-body)", margin: 0, textWrap: "pretty" },
  section: { maxWidth: "var(--page-max)", margin: "0 auto", padding: "40px 32px 0" },
  head: { display: "flex", alignItems: "center", gap: 16, paddingBottom: 20, marginBottom: 24, borderBottom: "1px dashed var(--border-dashed)" },
  headNote: { font: "var(--type-caption)", color: "var(--text-muted)" },
  turnRow: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 },
  charGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 },
  cardTitle: { font: "var(--type-subhead)", margin: "0 0 8px", color: "var(--text-strong)" },
  cardBody: { font: "var(--type-body-sm)", color: "var(--text-muted)", margin: 0, lineHeight: 1.7 },
  poseRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 },
  poseTile: { display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "var(--surface-accent)", borderRadius: "var(--radius-card)", padding: "24px 16px" },
  poseLabel: { fontWeight: "var(--weight-bold)", fontSize: "var(--text-base)", color: "var(--text-strong)" }
};

Object.assign(window, { HomeScreen });
