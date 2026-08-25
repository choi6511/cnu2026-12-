"use client";

import Image from "next/image";
import Link from "next/link";

import { CHARACTER_IMAGE_SIZE } from "@/data/places";

type AcquisitionDialogProps = Readonly<{
  characterImagePath: string;
  placeName: string;
}>;

export function AcquisitionDialog({
  characterImagePath,
  placeName,
}: AcquisitionDialogProps) {
  return (
    <div className="acquisition-dialog-backdrop" role="presentation">
      <section
        aria-describedby="acquisition-description"
        aria-labelledby="acquisition-title"
        aria-modal="true"
        className="acquisition-dialog"
        role="dialog"
      >
        <p className="screen-kicker">새로운 탐방 기록</p>
        <h2 id="acquisition-title">새 캐릭터를 획득했어요!</h2>
        <div className="acquisition-character">
          <Image
            alt={`${placeName} 캐릭터`}
            height={CHARACTER_IMAGE_SIZE.height}
            priority
            sizes="(max-width: 720px) min(76vw, 320px), 320px"
            src={characterImagePath}
            width={CHARACTER_IMAGE_SIZE.width}
          />
        </div>
        <p id="acquisition-description">
          {placeName} 탐방 기록을 이 기기의 도감에 저장했습니다.
        </p>
        <nav className="acquisition-actions" aria-label="획득 후 이동">
          <Link className="button-link secondary" href="/">
            지도로 돌아가기
          </Link>
          <Link className="button-link" href="/collection">
            도감에서 확인하기
          </Link>
        </nav>
      </section>
    </div>
  );
}
