import type { Metadata } from "next";

import { VisitVerification } from "@/components/verification/visit-verification";

import { resolvePlace } from "../_lib/resolve-place";

type VerifyPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export async function generateMetadata({ params }: VerifyPageProps): Promise<Metadata> {
  const place = await resolvePlace(params);

  return { title: `${place.shortName} 방문 인증` };
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const place = await resolvePlace(params);

  return (
    <main className="verification-page">
      <p className="screen-kicker">방문 인증 경로</p>
      <h1>{place.shortName} 방문 인증</h1>
      <p className="screen-description">
        현장에서 촬영하거나 사진첩에서 이미지를 선택하면 방문 인증으로
        처리합니다. 사진 내용으로 장소를 판별하지 않습니다.
      </p>
      <VisitVerification
        characterImagePath={place.characterImagePath}
        placeId={place.id}
        placeName={place.shortName}
      />
    </main>
  );
}
