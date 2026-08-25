import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "캐릭터 도감",
};

export default function CollectionPage() {
  return (
    <main className="page-content">
      <header className="page-header">
        <p className="eyebrow">캐릭터 도감 (COLLECTION)</p>
        <h1>캐릭터 도감</h1>
        <p className="page-description">
          획득 기록과 세 개의 고정 슬롯은 W06에서 연결합니다.
        </p>
      </header>
      <section className="screen-card" aria-labelledby="collection-status-title">
        <p className="screen-kicker">구현 상태</p>
        <h2 id="collection-status-title">도감 경로를 준비했습니다</h2>
        <p className="screen-description">
          이 화면은 아직 기기 저장소를 읽거나 캐릭터 획득 상태를 표시하지 않습니다.
        </p>
      </section>
    </main>
  );
}
