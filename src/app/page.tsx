import Link from "next/link";
import Image from "next/image";

import { ChachaMascot } from "@/components/brand/chacha-mascot";
import { CampusMap } from "@/components/map/campus-map";
import { PLACES } from "@/data/places";
import { publicEnvironment } from "@/lib/env/public";

export default function HomePage() {
  return (
    <main className="page-content cinematic-home">
      <header className="campus-hero">
        <Image
          alt="충남대학교 캠퍼스의 도서관 전경"
          className="campus-hero-image"
          fill
          loading="eager"
          priority
          sizes="(max-width: 720px) 100vw, 720px"
          src="/places/library.jpg"
        />
        <div className="campus-hero-scrim" aria-hidden="true" />
        <div className="campus-hero-content">
          <p className="hero-pill">✦ CAMPUS QUEST</p>
          <p className="hero-index">01 / 03</p>
          <h1>
            오늘의 캠퍼스를<br />
            <em>발견합니다</em>
          </h1>
          <p>
            차차와 함께 세 장소를 지나며, 캠퍼스의 새로운 장면을 수집합니다.
          </p>
          <a className="hero-cta" href="#explore">
            탐방 시작하기
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M12 4v15m0 0 6-6m-6 6-6-6" />
            </svg>
          </a>
        </div>
        <div className="hero-mascot" aria-hidden="true">
          <ChachaMascot priority variant="front" />
        </div>
      </header>

      <section className="cinematic-section" id="explore" aria-labelledby="place-list-title">
        <div className="cinematic-heading">
          <p className="eyebrow">탐방 장면 (EXPLORE)</p>
          <h2 id="place-list-title">어디부터<br />시작할까요?</h2>
          <p>각 장소에서 소개를 보고, 사진으로 방문을 기록할 수 있습니다.</p>
        </div>
        <ul className="cinematic-place-list">
          {PLACES.map((place, index) => (
            <li key={place.id}>
              <Link className="cinematic-place-card" href={`/places/${place.id}`}>
                <Image
                  alt=""
                  fill
                  sizes="(max-width: 720px) calc(100vw - 40px), 680px"
                  src={place.placeImagePath}
                />
                <span className="cinematic-card-scrim" aria-hidden="true" />
                <span className="cinematic-card-content">
                  <small>SCENE {String(index + 1).padStart(2, "0")}</small>
                  <strong>{place.shortName}</strong>
                  <span>{place.name}</span>
                </span>
                <span className="cinematic-card-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 19 19 5M9 5h10v10" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="map-sequence" aria-labelledby="campus-map-title">
        <div className="cinematic-heading">
          <p className="eyebrow">실시간 경로 (CAMPUS MAP)</p>
          <h2 id="campus-map-title">지도 위에서<br />다음 장면을 찾습니다</h2>
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
          마커나 장소 이름을 누르면 소개 화면으로 이동합니다. 위치 권한은 요청하지 않습니다.
        </p>
      </section>
    </main>
  );
}
