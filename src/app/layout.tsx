import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { PwaRegistration } from "@/components/pwa/pwa-registration";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "차차 캠퍼스",
    template: "%s | 차차 캠퍼스",
  },
  description: "충남대학교의 주요 장소를 탐방하고 캐릭터를 모으는 캠퍼스 PWA",
  icons: {
    apple: "/icons/192",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#002d72",
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
          <PwaRegistration />
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
