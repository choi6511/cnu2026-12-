"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

import type { PlaceId } from "@/data/places";
import {
  CollectionStorageError,
  saveCollectionRecordOnce,
} from "@/lib/browser/collection-db";
import {
  compressImageFile,
  ImageProcessingError,
} from "@/lib/browser/image-processing";

type VisitVerificationProps = Readonly<{
  placeId: PlaceId;
  placeName: string;
}>;

type SelectedPhoto = Readonly<{
  blob: Blob;
  fileName: string;
  height: number;
  mimeType: string;
  previewUrl: string;
  width: number;
}>;

type CompletionState = "created" | "existing" | null;

function errorMessage(error: unknown): string {
  if (
    error instanceof ImageProcessingError ||
    error instanceof CollectionStorageError
  ) {
    return error.message;
  }

  return "사진 처리 중 문제가 발생했습니다. 다시 시도해 주세요.";
}

export function VisitVerification({
  placeId,
  placeName,
}: VisitVerificationProps) {
  const requestIdRef = useRef(0);
  const [photo, setPhoto] = useState<SelectedPhoto | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [completion, setCompletion] = useState<CompletionState>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (photo) {
        URL.revokeObjectURL(photo.previewUrl);
      }
    };
  }, [photo]);

  const processFile = async (file: File) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsProcessing(true);
    setCompletion(null);
    setError(null);

    try {
      const compressed = await compressImageFile(file);
      const previewUrl = URL.createObjectURL(compressed.blob);

      if (requestIdRef.current !== requestId) {
        URL.revokeObjectURL(previewUrl);
        return;
      }

      setPhoto({
        blob: compressed.blob,
        fileName: file.name,
        height: compressed.height,
        mimeType: compressed.mimeType,
        previewUrl,
        width: compressed.width,
      });
    } catch (processingError) {
      if (requestIdRef.current === requestId) {
        setPhoto(null);
        setError(errorMessage(processingError));
      }
    } finally {
      if (requestIdRef.current === requestId) {
        setIsProcessing(false);
      }
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";

    if (file) {
      void processFile(file);
    }
  };

  const handleReset = () => {
    requestIdRef.current += 1;
    setPhoto(null);
    setIsProcessing(false);
    setCompletion(null);
    setError(null);
  };

  const handleComplete = async () => {
    if (!photo || isProcessing || isSaving) {
      return;
    }

    setIsSaving(true);
    setCompletion(null);
    setError(null);

    try {
      const result = await saveCollectionRecordOnce({
        acquiredAt: new Date().toISOString(),
        photoBlob: photo.blob,
        photoMimeType: photo.mimeType,
        placeId,
      });
      setCompletion(result.status);
    } catch (storageError) {
      setError(errorMessage(storageError));
    } finally {
      setIsSaving(false);
    }
  };

  const isCompleteDisabled = !photo || isProcessing || isSaving;

  return (
    <section className="verification-panel" aria-labelledby="photo-input-title">
      <div className="verification-heading">
        <p className="screen-kicker">기기 안에서만 처리해요</p>
        <h2 id="photo-input-title">인증사진을 선택해 주세요</h2>
        <p>
          사진은 최대 1280px WebP로 압축해 이 기기의 도감에만 저장합니다.
          서버로 전송하지 않습니다.
        </p>
      </div>

      <div className="photo-input-grid">
        <label className="photo-input-button" htmlFor={`camera-${placeId}`}>
          카메라로 촬영
        </label>
        <input
          accept="image/jpeg,image/png,image/webp"
          capture="environment"
          className="visually-hidden"
          disabled={isProcessing || isSaving}
          id={`camera-${placeId}`}
          onChange={handleFileChange}
          type="file"
        />

        <label className="photo-input-button secondary" htmlFor={`gallery-${placeId}`}>
          사진첩에서 선택
        </label>
        <input
          accept="image/jpeg,image/png,image/webp"
          className="visually-hidden"
          disabled={isProcessing || isSaving}
          id={`gallery-${placeId}`}
          onChange={handleFileChange}
          type="file"
        />
      </div>

      {isProcessing ? (
        <p className="verification-message" role="status">
          사진을 안전하게 압축하고 있어요.
        </p>
      ) : null}

      {photo ? (
        <figure className="photo-preview">
          <div className="photo-preview-image">
            <Image
              alt={`${placeName} 방문 인증사진 미리보기`}
              height={photo.height}
              sizes="(max-width: 720px) calc(100vw - 80px), 600px"
              src={photo.previewUrl}
              unoptimized
              width={photo.width}
            />
          </div>
          <figcaption>
            <strong>{photo.fileName}</strong>
            <span>
              {photo.width} × {photo.height}px · 압축 완료
            </span>
          </figcaption>
        </figure>
      ) : null}

      {error ? (
        <p className="verification-message error" role="alert">
          {error}
        </p>
      ) : null}

      {completion === "created" ? (
        <p className="verification-message success" role="status">
          인증이 완료됐어요. {placeName} 캐릭터를 처음 획득했습니다.
        </p>
      ) : null}

      {completion === "existing" ? (
        <p className="verification-message" role="status">
          이미 획득한 장소예요. 처음 저장한 사진과 획득일을 그대로 유지했습니다.
        </p>
      ) : null}

      <div className="verification-actions">
        {photo ? (
          <button
            className="verification-button secondary"
            disabled={isSaving}
            onClick={handleReset}
            type="button"
          >
            다시 선택
          </button>
        ) : null}
        <button
          className="verification-button"
          disabled={isCompleteDisabled}
          onClick={() => void handleComplete()}
          type="button"
        >
          {isSaving ? "저장 중..." : "인증 완료"}
        </button>
      </div>
    </section>
  );
}
