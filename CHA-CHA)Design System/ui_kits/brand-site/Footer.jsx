function Footer() {
  return (
    <footer style={footerStyles.wrap}>
      <div style={footerStyles.inner}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src="../../assets/cnu-wordmark.png" alt="충남대학교" style={{ height: 34, filter: "brightness(0) invert(1)", opacity: 0.9 }} />
          <span style={footerStyles.small}>충남대학교 브랜드 캐릭터 차차</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["브랜드 가이드", "에셋 다운로드", "사용 문의"].map((t) => <a key={t} href="#" style={footerStyles.link}>{t}</a>)}
        </div>
      </div>
    </footer>
  );
}

const footerStyles = {
  wrap: { background: "var(--surface-inverse)", marginTop: 40 },
  inner: { maxWidth: "var(--page-max)", margin: "0 auto", padding: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" },
  small: { color: "var(--navy-100)", fontSize: "var(--text-sm)" },
  link: { color: "var(--teal-200)", textDecoration: "none", fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)" }
};

Object.assign(window, { Footer });
