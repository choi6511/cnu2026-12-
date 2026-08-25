import Link from "next/link";
import type { ReactNode } from "react";

import { getPlaceStaticParams } from "@/data/places";

import { resolvePlace } from "./_lib/resolve-place";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPlaceStaticParams();
}

type PlaceLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ slug: string }>;
}>;

export default async function PlaceLayout({ children, params }: PlaceLayoutProps) {
  const place = await resolvePlace(params);

  return (
    <section className="place-context" aria-label={`${place.shortName} 화면`}>
      <header className="context-header" data-place-id={place.id}>
        <Link className="context-back-link" href="/">
          지도 목록으로
        </Link>
        <p className="context-label">현재 장소</p>
        <strong>{place.name}</strong>
      </header>
      {children}
    </section>
  );
}
