import type { Metadata } from "next";

import { CollectionGallery } from "@/components/collection/collection-gallery";

export const metadata: Metadata = {
  title: "캐릭터 도감",
};

export default function CollectionPage() {
  return (
    <main className="page-content">
      <header className="page-header">
        <p className="eyebrow">캐릭터 도감 (COLLECTION)</p>
        <h1>캐릭터 도감</h1>
        <p className="page-description">
          캠퍼스에서 만난 차차 캐릭터와 인증사진을 이 기기에서 확인합니다.
        </p>
      </header>
      <CollectionGallery />
    </main>
  );
}
