type KakaoLatLng = object;

type KakaoLatLngBounds = {
  extend(position: KakaoLatLng): void;
};

type KakaoMapInstance = {
  setBounds(bounds: KakaoLatLngBounds, padding?: number): void;
};

type KakaoMarkerInstance = {
  setMap(map: KakaoMapInstance | null): void;
};

type KakaoCustomOverlayInstance = {
  setMap(map: KakaoMapInstance | null): void;
};

type KakaoEventTarget = KakaoMarkerInstance;

type KakaoMapsApi = {
  load(callback: () => void): void;
  LatLng: new (latitude: number, longitude: number) => KakaoLatLng;
  LatLngBounds: new () => KakaoLatLngBounds;
  Map: new (
    container: HTMLElement,
    options: Readonly<{
      center: KakaoLatLng;
      level: number;
    }>,
  ) => KakaoMapInstance;
  Marker: new (
    options: Readonly<{
      clickable: boolean;
      map: KakaoMapInstance;
      position: KakaoLatLng;
      title: string;
    }>,
  ) => KakaoMarkerInstance;
  CustomOverlay: new (
    options: Readonly<{
      content: HTMLElement;
      map: KakaoMapInstance;
      position: KakaoLatLng;
      xAnchor: number;
      yAnchor: number;
      zIndex: number;
    }>,
  ) => KakaoCustomOverlayInstance;
  event: {
    addListener(
      target: KakaoEventTarget,
      eventName: "click",
      handler: () => void,
    ): void;
    removeListener(
      target: KakaoEventTarget,
      eventName: "click",
      handler: () => void,
    ): void;
  };
};

declare global {
  interface Window {
    kakao?: {
      maps: KakaoMapsApi;
    };
  }
}

export {};
