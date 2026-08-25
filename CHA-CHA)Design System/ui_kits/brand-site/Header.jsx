function Header({ route, setRoute }) {
  const { Button } = window.DS;
  const items = [["home", "브랜드", "BRAND"], ["assets", "에셋", "ASSETS"], ["guide", "가이드", "GUIDE"]];
  return (
    <header style={headerStyles.bar}>
      <div style={headerStyles.inner}>
        <a href="#" onClick={(e) => { e.preventDefault(); setRoute("home"); }} style={headerStyles.brand}>
          <img src="../../assets/logo-lockup.png" alt="차차 CHA-CHA" style={{ height: 40 }} />
        </a>
        <nav style={headerStyles.nav}>
          {items.map(([k, ko, en]) => (
            <a key={k} href="#" onClick={(e) => { e.preventDefault(); setRoute(k); }}
               style={{ ...headerStyles.link, ...(route === k ? headerStyles.linkOn : null) }}>
              {ko}<span style={headerStyles.linkEn}>{en}</span>
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="../../assets/cnu-wordmark.png" alt="충남대학교" style={{ height: 26, opacity: 0.9 }} />
          <Button variant="accent" size="sm" onClick={() => setRoute("assets")}>에셋 받기</Button>
        </div>
      </div>
    </header>
  );
}

const headerStyles = {
  bar: { position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border-hairline)" },
  inner: { maxWidth: "var(--page-max)", margin: "0 auto", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 },
  brand: { display: "flex", alignItems: "center", textDecoration: "none" },
  nav: { display: "flex", alignItems: "center", gap: 28 },
  link: { display: "flex", alignItems: "baseline", gap: 6, textDecoration: "none", color: "var(--text-muted)", fontWeight: "var(--weight-bold)", fontSize: "var(--text-base)", paddingBottom: 2, borderBottom: "2px solid transparent" },
  linkOn: { color: "var(--text-strong)", borderBottomColor: "var(--teal-500)" },
  linkEn: { fontFamily: "var(--font-latin)", fontWeight: 800, fontSize: 10, letterSpacing: "0.1em", color: "var(--gray-400)" }
};

Object.assign(window, { Header });
