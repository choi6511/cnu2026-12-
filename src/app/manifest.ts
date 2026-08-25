import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "차차 캠퍼스",
    short_name: "차차 캠퍼스",
    description: "충남대학교 주요 장소를 탐방하고 캐릭터를 모으는 캠퍼스 앱",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f5",
    theme_color: "#002d72",
    lang: "ko-KR",
    icons: [
      {
        src: "/icons/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
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
