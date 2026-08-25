import type { Metadata } from "next";

import { ChachaMascot } from "@/components/brand/chacha-mascot";
import { CollectionGallery } from "@/components/collection/collection-gallery";

export const metadata: Metadata = {
  title: "캐릭터 도감",
};

export default function CollectionPage() {
  return (
    <main className="page-content collection-page">
      <header className="page-header cinematic-page-header">
        <p className="eyebrow">캐릭터 도감 (COLLECTION)</p>
        <h1>차차가 남긴<br />탐방의 장면</h1>
        <p className="page-description">
          캠퍼스에서 만난 차차 캐릭터와 인증사진을 이 기기에서 확인합니다.
        </p>
        <figure aria-hidden="true" className="collection-brand-mascot">
          <ChachaMascot priority variant="together" />
        </figure>
      </header>
      <CollectionGallery />
    </main>
  );
}
