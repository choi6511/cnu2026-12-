import type { Metadata } from "next";

import { resolvePlace } from "../_lib/resolve-place";

type NoticesPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export async function generateMetadata({ params }: NoticesPageProps): Promise<Metadata> {
  const place = await resolvePlace(params);

  return { title: `${place.shortName} 최근 공지` };
}

export default async function NoticesPage({ params }: NoticesPageProps) {
  const place = await resolvePlace(params);

  return (
    <main className="screen-card">
      <p className="screen-kicker">최근 공지 경로</p>
      <h1>{place.shortName} 최근 공지</h1>
      <p className="screen-description">
        최근 7일 공지와 마지막 갱신 시각은 W12에서 연결합니다.
      </p>
    </main>
  );
}
