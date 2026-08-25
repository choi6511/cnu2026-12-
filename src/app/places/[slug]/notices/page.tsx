import type { Metadata } from "next";

import { PlaceNoticeList } from "@/components/notices/place-notice-list";

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
    <main className="notice-page">
      <header className="notice-page-heading">
        <p className="screen-kicker">장소별 최근 공지</p>
        <h1>{place.shortName} 최근 공지</h1>
        <p>오늘을 포함한 최근 7일 동안 등록된 공지만 보여드려요.</p>
      </header>
      <PlaceNoticeList placeId={place.id} placeName={place.shortName} />
    </main>
  );
}
