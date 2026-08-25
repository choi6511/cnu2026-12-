import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "차차 캠퍼스",
    short_name: "차차 캠퍼스",
    description: "충남대학교 주요 장소를 탐방하고 캐릭터를 모으는 캠퍼스 앱",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#12355b",
    lang: "ko-KR",
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
