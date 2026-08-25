import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PLACE_IMAGE_SIZE } from "@/data/places";

import { resolvePlace } from "./_lib/resolve-place";

type PlacePageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export async function generateMetadata({ params }: PlacePageProps): Promise<Metadata> {
  const place = await resolvePlace(params);

  return {
    title: place.shortName,
    description: place.introduction[0],
  };
}

export default async function PlacePage({ params }: PlacePageProps) {
  const place = await resolvePlace(params);

  return (
    <main className="place-detail">
      <figure className="place-hero">
        <div className="place-hero-image">
          <Image
            alt={place.placeImageAlt}
            height={PLACE_IMAGE_SIZE.height}
            priority
            sizes="(max-width: 720px) calc(100vw - 40px), 680px"
            src={place.placeImagePath}
            width={PLACE_IMAGE_SIZE.width}
          />
        </div>
        {place.placeImageStatus === "placeholder" ? (
          <figcaption>임시 대표 이미지 · 실제 장소 사진으로 교체 예정</figcaption>
        ) : null}
      </figure>

      <section className="place-detail-heading" aria-labelledby="place-title">
        <p className="screen-kicker">충남대학교 장소 탐방</p>
        <h1 id="place-title">{place.shortName}</h1>
      </section>

      <section className="place-detail-section" aria-labelledby="introduction-title">
        <h2 id="introduction-title">장소 소개</h2>
        <div className="place-introduction">
          {place.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="place-detail-section" aria-labelledby="location-title">
        <h2 id="location-title">위치 안내</h2>
        <div className="place-location">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <p>{place.locationDescription}</p>
        </div>
      </section>

      <aside className="collection-status" aria-label="캐릭터 획득 상태">
        <span className="collection-status-mark" aria-hidden="true" />
        <div>
          <strong>캐릭터 미획득</strong>
          <p>방문 인증 기능이 연결되면 이곳에서 획득 상태를 확인할 수 있습니다.</p>
        </div>
      </aside>

      <nav className="screen-actions" aria-label={`${place.shortName} 다음 단계`}>
        <Link className="button-link secondary" href={`/places/${place.id}/notices`}>
          최근 공지 보기
        </Link>
        <Link className="button-link" href={`/places/${place.id}/verify`}>
          방문 인증하기
        </Link>
      </nav>
    </main>
  );
}
