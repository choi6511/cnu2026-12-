"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

import type { PlaceId } from "@/data/places";

export type CampusMapPlace = Readonly<{
  id: PlaceId;
  shortName: string;
  coordinates: Readonly<{
    latitude: number;
    longitude: number;
  }>;
}>;

type MapStatus =
  | "loading"
  | "ready"
  | "offline"
  | "missing-key"
  | "error";

type CampusMapProps = Readonly<{
  mapKey: string | undefined;
  places: readonly CampusMapPlace[];
}>;

const STATUS_COPY: Record<
  Exclude<MapStatus, "ready">,
  Readonly<{ label: string; title: string; description: string }>
> = {
  loading: {
    label: "지도 불러오는 중",
    title: "충남대학교 지도를 준비하고 있어요",
    description: "카카오맵과 세 장소 마커를 불러오고 있습니다.",
  },
  offline: {
    label: "오프라인",
    title: "인터넷 연결 후 지도를 확인할 수 있어요",
    description: "아래 장소 목록과 저장된 장소 소개는 계속 이용할 수 있습니다.",
  },
  "missing-key": {
    label: "지도 설정 필요",
    title: "현재 지도를 표시할 수 없어요",
    description: "지도 설정이 완료될 때까지 아래 장소 목록을 이용해 주세요.",
  },
  error: {
    label: "지도 불러오기 실패",
    title: "지도를 불러오지 못했어요",
    description: "인터넷 연결을 확인한 뒤 페이지를 새로고침해 주세요.",
  },
};

function subscribeToOnlineStatus(handleStoreChange: () => void) {
  window.addEventListener("online", handleStoreChange);
  window.addEventListener("offline", handleStoreChange);

  return () => {
    window.removeEventListener("online", handleStoreChange);
    window.removeEventListener("offline", handleStoreChange);
  };
}

function getOnlineStatus() {
  return window.navigator.onLine;
}

function getServerOnlineStatus() {
  return true;
}

export function CampusMap({ mapKey, places }: CampusMapProps) {
  const router = useRouter();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isOnline = useSyncExternalStore(
    subscribeToOnlineStatus,
    getOnlineStatus,
    getServerOnlineStatus,
  );
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [mapLifecycleStatus, setMapLifecycleStatus] =
    useState<Extract<MapStatus, "loading" | "ready" | "error">>("loading");

  const sdkUrl = mapKey
    ? `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(mapKey)}&autoload=false`
    : undefined;

  const mapStatus: MapStatus = !isOnline
    ? "offline"
    : !mapKey
      ? "missing-key"
      : mapLifecycleStatus;

  useEffect(() => {
    if (!isOnline || !mapKey || !isSdkReady) {
      return;
    }

    const kakaoMaps = window.kakao?.maps;
    const mapContainer = mapContainerRef.current;

    if (!kakaoMaps || !mapContainer) {
      return;
    }

    let isDisposed = false;
    const cleanupTasks: Array<() => void> = [];
    kakaoMaps.load(() => {
      if (isDisposed) {
        return;
      }

      try {
        const center = places.reduce(
          (sum, place) => ({
            latitude: sum.latitude + place.coordinates.latitude / places.length,
            longitude: sum.longitude + place.coordinates.longitude / places.length,
          }),
          { latitude: 0, longitude: 0 },
        );
        const map = new kakaoMaps.Map(mapContainer, {
          center: new kakaoMaps.LatLng(center.latitude, center.longitude),
          level: 4,
        });
        const bounds = new kakaoMaps.LatLngBounds();

        for (const place of places) {
          const position = new kakaoMaps.LatLng(
            place.coordinates.latitude,
            place.coordinates.longitude,
          );
          const marker = new kakaoMaps.Marker({
            clickable: true,
            map,
            position,
            title: place.shortName,
          });
          const label = document.createElement("button");
          const navigateToPlace = () => router.push(`/places/${place.id}`);

          label.type = "button";
          label.className = "map-place-label";
          label.textContent = place.shortName;
          label.setAttribute("aria-label", `${place.shortName} 소개 보기`);
          label.addEventListener("click", navigateToPlace);

          const overlay = new kakaoMaps.CustomOverlay({
            content: label,
            map,
            position,
            xAnchor: 0.5,
            yAnchor: 2.2,
            zIndex: 3,
          });

          kakaoMaps.event.addListener(marker, "click", navigateToPlace);
          bounds.extend(position);
          cleanupTasks.push(() => {
            label.removeEventListener("click", navigateToPlace);
            kakaoMaps.event.removeListener(marker, "click", navigateToPlace);
            marker.setMap(null);
            overlay.setMap(null);
          });
        }

        map.setBounds(bounds, 44);
        setMapLifecycleStatus("ready");
      } catch {
        setMapLifecycleStatus("error");
      }
    });

    return () => {
      isDisposed = true;
      cleanupTasks.forEach((cleanup) => cleanup());
    };
  }, [isOnline, isSdkReady, mapKey, places, router]);

  const statusCopy = mapStatus === "ready" ? null : STATUS_COPY[mapStatus];

  const handleSdkReady = () => {
    if (window.kakao?.maps) {
      setIsSdkReady(true);
      return;
    }

    setMapLifecycleStatus("error");
  };

  return (
    <div className="campus-map-shell" data-map-status={mapStatus}>
      <div
        aria-label="충남대학교 대덕캠퍼스 지도"
        className="campus-map-canvas"
        ref={mapContainerRef}
        role="region"
      />

      {statusCopy ? (
        <div className="map-status-panel" role="status">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="m9 18-6-3V5l6 3 6-3 6 3v10l-6-3-6 3Z" />
            <path d="M9 8v10M15 5v10" />
          </svg>
          <div>
            <p className="placeholder-label">{statusCopy.label}</p>
            <h3>{statusCopy.title}</h3>
            <p>{statusCopy.description}</p>
          </div>
        </div>
      ) : (
        <p className="map-ready-badge" role="status">
          세 장소 표시 완료
        </p>
      )}

      {sdkUrl && isOnline !== false ? (
        <Script
          id="kakao-map-sdk"
          onError={() => setMapLifecycleStatus("error")}
          onLoad={handleSdkReady}
          onReady={handleSdkReady}
          src={sdkUrl}
          strategy="afterInteractive"
        />
      ) : null}
    </div>
  );
}
