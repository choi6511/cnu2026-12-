import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { ServiceWorkerRegistration } from "@/components/pwa/service-worker-registration";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "차차 캠퍼스",
    template: "%s | 차차 캠퍼스",
  },
  description: "충남대학교의 주요 장소를 탐방하고 캐릭터를 모으는 캠퍼스 PWA",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#12355b",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <div className="app-frame">
          <div className="app-content">{children}</div>
          <BottomNavigation />
        </div>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
