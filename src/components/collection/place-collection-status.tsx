"use client";

import { useEffect, useState } from "react";

import {
  ChachaMascot,
  mascotVariantForPlace,
} from "@/components/brand/chacha-mascot";
import type { PlaceId } from "@/data/places";
import { hasCollectionRecord } from "@/lib/browser/collection-db";

type PlaceCollectionStatusProps = Readonly<{
  placeId: PlaceId;
}>;

export function PlaceCollectionStatus({
  placeId,
}: PlaceCollectionStatusProps) {
  const [status, setStatus] = useState<"loading" | "acquired" | "locked" | "error">(
    "loading",
  );

  useEffect(() => {
    let isCurrent = true;

    void hasCollectionRecord(placeId)
      .then((hasRecord) => {
        if (isCurrent) {
          setStatus(hasRecord ? "acquired" : "locked");
        }
      })
      .catch(() => {
        if (isCurrent) {
          setStatus("error");
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [placeId]);

  const isAcquired = status === "acquired";
  const message = status === "loading"
    ? "획득 상태를 확인하고 있어요"
    : status === "error"
      ? "획득 상태를 확인할 수 없어요"
      : isAcquired
        ? "캐릭터 획득 완료"
        : "캐릭터 미획득";

  return (
    <>
      <span
        className={`collection-status-mark${isAcquired ? " is-acquired" : ""}`}
        aria-hidden="true"
      >
        {isAcquired ? (
          <ChachaMascot
            alt=""
            sizes="44px"
            variant={mascotVariantForPlace(placeId)}
          />
        ) : null}
      </span>
      <div>
        <strong>{message}</strong>
        <p>방문 인증을 완료하면 이 기기의 도감에 기록됩니다.</p>
      </div>
    </>
  );
}
