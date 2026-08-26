"use client";

import { useEffect } from "react";

/**
 * Service Worker는 HTTPS(개발 환경의 localhost 포함)에서만 등록한다.
 * 외부 지도와 Supabase 응답은 sw.js가 캐시하지 않는다.
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      !window.isSecureContext ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    void navigator.serviceWorker
      .register("/sw.js", { updateViaCache: "none" })
      .catch(() => {
        // 설치 불가 환경에서도 앱의 일반 웹 사용은 계속 가능해야 한다.
      });
  }, []);

  return null;
}
