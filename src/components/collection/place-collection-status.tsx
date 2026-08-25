"use client";

import { useEffect, useState } from "react";

import type { PlaceId } from "@/data/places";
import { hasCollectionRecord } from "@/lib/browser/collection-db";

type PlaceCollectionStatusProps = Readonly<{
  placeId: PlaceId;
}>;

export function PlaceCollectionStatus({ placeId }: PlaceCollectionStatusProps) {
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

  if (status === "loading") {
    return <strong>획득 상태를 확인하고 있어요</strong>;
  }

  if (status === "acquired") {
    return <strong>캐릭터 획득 완료</strong>;
  }

  if (status === "error") {
    return <strong>획득 상태를 확인할 수 없어요</strong>;
  }

  return <strong>캐릭터 미획득</strong>;
}
