import Link from "next/link";

import { CampusMap } from "@/components/map/campus-map";
import { PLACES } from "@/data/places";
import { publicEnvironment } from "@/lib/env/public";

export default function HomePage() {
  return (
    <main className="page-content">
      <header className="page-header">
        <p className="eyebrow">캠퍼스 지도 (CAMPUS MAP)</p>
        <h1>차차 캠퍼스</h1>
        <p className="page-description">
          충남대학교의 주요 장소를 발견하고 탐방을 시작합니다.
        </p>
      </header>

      <section aria-labelledby="campus-map-title">
        <div className="section-heading">
          <p className="eyebrow">실시간 지도 (KAKAO MAP)</p>
          <h2 id="campus-map-title">캠퍼스에서 위치를 확인하세요</h2>
        </div>
        <CampusMap
          mapKey={publicEnvironment.kakaoMapKey}
          places={PLACES.map(({ coordinates, id, shortName }) => ({
            coordinates,
            id,
            shortName,
          }))}
        />
        <p className="map-guidance">
          마커나 장소 이름을 누르면 소개 화면으로 이동합니다. 위치 권한은 요청하지
          않습니다.
        </p>
      </section>

      <section aria-labelledby="place-list-title">
        <div className="section-heading">
          <p className="eyebrow">탐방 장소 (PLACES)</p>
          <h2 id="place-list-title">세 곳에서 시작합니다</h2>
        </div>
        <ul className="place-list">
          {PLACES.map((place, index) => (
            <li key={place.id}>
              <Link className="place-link" href={`/places/${place.id}`}>
                <span className="place-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong>{place.shortName}</strong>
                  <small>{place.name}</small>
                </span>
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
