import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import manifest from "@/app/manifest";

const projectFile = (...segments: string[]) =>
  readFileSync(path.join(process.cwd(), ...segments), "utf8");

describe("PWA assets", () => {
  it("declares installable standalone metadata with both required icon sizes", () => {
    const appManifest = manifest();

    expect(appManifest.display).toBe("standalone");
    expect(appManifest.start_url).toBe("/");
    expect(appManifest.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ sizes: "192x192", src: "/icons/192" }),
        expect.objectContaining({ sizes: "512x512", src: "/icons/512" }),
      ]),
    );
  });

  it("precaches known routes and their Next static chunks without caching live data", () => {
    const serviceWorker = projectFile("public", "sw.js");

    expect(serviceWorker).toContain('"/collection"');
    expect(serviceWorker).toContain('"/places/library"');
    expect(serviceWorker).toContain('"/characters/library.webp"');
    expect(serviceWorker).toContain("getStaticAssetPaths");
    expect(serviceWorker).toContain('url.searchParams.has("_rsc")');
    expect(serviceWorker).toContain('request.headers.has("RSC")');
    expect(serviceWorker).toContain("!isNoticeNavigation(url, request)");
    expect(serviceWorker).toContain('url.origin !== self.location.origin');
    expect(serviceWorker).toContain('url.pathname.startsWith("/api/")');
  });

  it("turns same-origin links into document navigation when offline", () => {
    const registration = projectFile(
      "src",
      "components",
      "pwa",
      "pwa-registration.tsx",
    );

    expect(registration).toContain("handleOfflineNavigation");
    expect(registration).toContain("navigator.onLine");
    expect(registration).toContain("window.location.assign(destination.href)");
  });

  it("keeps route-appropriate offline navigation fallbacks available", () => {
    const serviceWorker = projectFile("public", "sw.js");
    const offlinePage = projectFile("public", "offline-map.html");
    const offlineNoticesPage = projectFile("public", "offline-notices.html");

    expect(serviceWorker).toContain('cache.match("/offline-map.html")');
    expect(serviceWorker).toContain('cache.match("/offline-notices.html")');
    expect(offlinePage).toContain("인터넷 연결 후 지도를 확인할 수 있어요");
    expect(offlineNoticesPage).toContain("최신 공지는 인터넷 연결이 필요해요");
  });
});
