"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import {
  ChachaMascot,
  mascotVariantForPlace,
} from "@/components/brand/chacha-mascot";
import {
  PLACES,
  type Place,
  type PlaceId,
} from "@/data/places";
import {
  CollectionStorageError,
  getAllCollectionRecords,
  type CollectionRecord,
} from "@/lib/browser/collection-db";
import { formatAcquiredDate } from "@/lib/format/acquired-date";

type CollectionLoadState = "loading" | "ready" | "error";

function errorMessage(error: unknown): string {
  if (error instanceof CollectionStorageError) {
    return error.message;
  }

  return "도감 기록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.";
}

function LockedSilhouette() {
  return (
    <div aria-hidden="true" className="locked-silhouette">
      <span />
      <span />
    </div>
  );
}

type SelectedPhotoPreviewProps = Readonly<{
  place: Place;
  record: CollectionRecord;
}>;

function SelectedPhotoPreview({ place, record }: SelectedPhotoPreviewProps) {
  const [photoUrl] = useState(() => URL.createObjectURL(record.photoBlob));

  useEffect(() => {
    return () => URL.revokeObjectURL(photoUrl);
  }, [photoUrl]);

  return (
    <section aria-labelledby="selected-photo-title" className="selected-photo-panel">
      <div>
        <p className="screen-kicker">탐방 인증사진</p>
        <h3 id="selected-photo-title">{place.shortName}</h3>
        <p>{formatAcquiredDate(record.acquiredAt)}에 획득했습니다.</p>
      </div>
      <Image
        alt={`${place.shortName} 방문 인증사진`}
        height={480}
        sizes="(max-width: 720px) calc(100vw - 80px), 600px"
        src={photoUrl}
        unoptimized
        width={640}
      />
    </section>
  );
}

export function CollectionGallery() {
  const [records, setRecords] = useState<CollectionRecord[]>([]);
  const [loadState, setLoadState] = useState<CollectionLoadState>("loading");
  const [error, setError] = useState<string | null>(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState<PlaceId | null>(null);

  useEffect(() => {
    let isCurrent = true;

    void getAllCollectionRecords()
      .then((loadedRecords) => {
        if (!isCurrent) {
          return;
        }

        setRecords(loadedRecords);
        setLoadState("ready");
      })
      .catch((loadError) => {
        if (!isCurrent) {
          return;
        }

        setError(errorMessage(loadError));
        setLoadState("error");
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const recordsByPlaceId = useMemo(
    () => new Map(records.map((record) => [record.placeId, record])),
    [records],
  );
  const selectedRecord = selectedPlaceId
    ? recordsByPlaceId.get(selectedPlaceId)
    : undefined;
  const selectedPlace = selectedPlaceId
    ? PLACES.find((place) => place.id === selectedPlaceId)
    : undefined;

  const acquiredCount = records.length;

  return (
    <section aria-labelledby="collection-grid-title" className="collection-panel">
      <div className="collection-progress">
        <div>
          <p className="screen-kicker">CHA-CHA COLLECTION</p>
          <h2 id="collection-grid-title" aria-live="polite">
            3개 중 {acquiredCount}개 획득
          </h2>
          <p>인증사진과 획득 기록은 이 기기에만 저장됩니다.</p>
        </div>
        <span className="collection-progress-count" aria-hidden="true">
          {acquiredCount}/3
        </span>
      </div>

      {loadState === "loading" ? (
        <p className="collection-message" role="status">
          저장된 캐릭터를 불러오고 있어요.
        </p>
      ) : null}

      {loadState === "error" ? (
        <p className="collection-message error" role="alert">
          {error}
        </p>
      ) : null}

      {loadState === "ready" ? (
        <div className="collection-grid">
          {PLACES.map((place) => {
            const record = recordsByPlaceId.get(place.id);
            const isSelected = selectedPlaceId === place.id;

            return record ? (
              <button
                aria-label={`${place.shortName} 캐릭터 획득 완료. 인증사진 보기`}
                aria-expanded={isSelected}
                className="collection-slot acquired"
                key={place.id}
                onClick={() =>
                  setSelectedPlaceId((current) =>
                    current === place.id ? null : place.id,
                  )
                }
                type="button"
              >
                <span className="collection-character">
                  <ChachaMascot
                    alt=""
                    sizes="(max-width: 720px) 28vw, 180px"
                    variant={mascotVariantForPlace(place.id)}
                  />
                </span>
                <strong>{place.shortName}</strong>
                <small>{formatAcquiredDate(record.acquiredAt)} 획득</small>
                <span className="collection-slot-hint">인증사진 보기</span>
              </button>
            ) : (
              <article className="collection-slot locked" key={place.id}>
                <LockedSilhouette />
                <strong>{place.shortName}</strong>
                <small>아직 발견하지 못했어요</small>
              </article>
            );
          })}
        </div>
      ) : null}

      {selectedRecord && selectedPlace ? (
        <SelectedPhotoPreview
          key={selectedRecord.placeId}
          place={selectedPlace}
          record={selectedRecord}
        />
      ) : null}

      <p className="collection-data-note">
        브라우저 데이터나 앱을 삭제하면 저장된 인증사진과 획득 기록이 사라질 수 있습니다.
      </p>
    </section>
  );
}
