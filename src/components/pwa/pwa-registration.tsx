"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isStandaloneDisplayMode() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && navigator.standalone === true)
  );
}

function isIosInstallBrowser() {
  if (typeof navigator === "undefined") {
    return false;
  }

  const isAppleMobile =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.userAgent.includes("Macintosh") && navigator.maxTouchPoints > 1);
  const isSafari =
    /Safari/.test(navigator.userAgent) &&
    !/CriOS|FxiOS|EdgiOS|OPiOS/.test(navigator.userAgent);

  return isAppleMobile && isSafari;
}

function getInstallHintDismissed() {
  return (
    typeof localStorage !== "undefined" &&
    localStorage.getItem("chacha-pwa-install-hint-dismissed") === "true"
  );
}

export function PwaRegistration() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(
    () => typeof window !== "undefined" && isStandaloneDisplayMode(),
  );
  const [isIos] = useState(isIosInstallBrowser);
  const [isInstallHintDismissed, setIsInstallHintDismissed] = useState(
    getInstallHintDismissed,
  );

  useEffect(() => {
    const registerServiceWorker = () => {
      if (
        process.env.NODE_ENV === "production" &&
        "serviceWorker" in navigator
      ) {
        void navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => registration.update())
          .catch(() => undefined);
      }
    };

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => {
      setInstallPrompt(null);
      setIsInstalled(true);
    };
    const handleOfflineNavigation = (event: MouseEvent) => {
      if (
        navigator.onLine ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");

      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const destination = new URL(anchor.href);

      if (destination.origin !== window.location.origin) {
        return;
      }

      event.preventDefault();
      window.location.assign(destination.href);
    };

    registerServiceWorker();
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);
    document.addEventListener("click", handleOfflineNavigation, true);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
      document.removeEventListener("click", handleOfflineNavigation, true);
    };
  }, []);

  async function requestInstall() {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  function dismissInstallHint() {
    localStorage.setItem("chacha-pwa-install-hint-dismissed", "true");
    setIsInstallHintDismissed(true);
  }

  if (isInstalled || isInstallHintDismissed || (!installPrompt && !isIos)) {
    return null;
  }

  return (
    <aside className="pwa-install-prompt" aria-label="앱 설치 안내">
      <button
        className="pwa-install-dismiss"
        type="button"
        aria-label="앱 설치 안내 닫기"
        onClick={dismissInstallHint}
      >
        <span aria-hidden="true">×</span>
      </button>
      <div>
        <p className="eyebrow">APP INSTALL</p>
        <strong>차차 캠퍼스를 홈 화면에 추가하세요</strong>
        <p>
          지도 밖에서도 장소 소개와 내 도감을 빠르게 열 수 있어요.
        </p>
      </div>
      {installPrompt ? (
        <button type="button" onClick={requestInstall}>
          앱 설치
        </button>
      ) : (
        <div className="pwa-install-hint">
          <p>Safari 공유 메뉴의 ‘홈 화면에 추가’를 사용하세요.</p>
          <button type="button" onClick={dismissInstallHint}>
            나중에
          </button>
        </div>
      )}
    </aside>
  );
}
