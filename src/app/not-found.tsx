import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="page-content">
      <section className="not-found-card" aria-labelledby="not-found-title">
        <p className="screen-kicker">페이지를 찾을 수 없음</p>
        <h1 id="not-found-title">요청한 장소가 없습니다</h1>
        <p>차차 캠퍼스는 현재 정해진 세 장소만 안내합니다.</p>
        <Link className="button-link" href="/">
          지도로 돌아가기
        </Link>
      </section>
    </main>
  );
}
