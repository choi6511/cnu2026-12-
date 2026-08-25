"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { CHARACTER_IMAGE_SIZE } from "@/data/places";

import faceCheer from "../../../CHA-CHA)Design System/assets/face-cheer.png";

type AcquisitionDialogProps = Readonly<{
  characterImagePath: string;
  onDismiss: () => void;
  placeName: string;
}>;

export function AcquisitionDialog({
  characterImagePath,
  onDismiss,
  placeName,
}: AcquisitionDialogProps) {
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("button, a[href]")?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onDismiss();
        return;
      }

      if (event.key !== "Tab" || !dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>("button, a[href]"),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onDismiss]);

  return (
    <div className="acquisition-dialog-backdrop" role="presentation">
      <section
        aria-describedby="acquisition-description"
        aria-labelledby="acquisition-title"
        aria-modal="true"
        className="acquisition-dialog"
        ref={dialogRef}
        role="dialog"
      >
        <button
          aria-label="획득 안내 닫기"
          className="acquisition-dismiss"
          onClick={onDismiss}
          type="button"
        >
          닫기
        </button>
        <span aria-hidden="true" className="acquisition-brand-face">
          <Image alt="" src={faceCheer} />
        </span>
        <p className="acquisition-label">✦ NEW CHARACTER</p>
        <p className="screen-kicker">방문 인증 완료</p>
        <h2 id="acquisition-title">새 캐릭터를 획득했어요</h2>
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
