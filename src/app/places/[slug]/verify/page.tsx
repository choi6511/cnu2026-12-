import type { Metadata } from "next";

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
    <main className="screen-card">
      <p className="screen-kicker">방문 인증 경로</p>
      <h1>{place.shortName} 방문 인증</h1>
      <p className="screen-description">
        카메라와 사진첩 입력, 이미지 압축, 저장 동작은 W05에서 연결합니다.
      </p>
    </main>
  );
}
