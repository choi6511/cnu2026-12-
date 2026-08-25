const CACHE_NAME = "chacha-campus-shell-v1";

const APP_SHELL = [
  "/",
  "/collection",
  "/places/library",
  "/places/language-center",
  "/places/industry-center",
  "/offline-map.html",
  "/offline-notices.html",
  "/places/library.webp",
  "/places/language-center.webp",
  "/places/industry-center.webp",
  "/characters/library.webp",
  "/characters/language-center.webp",
  "/characters/industry-center.webp",
  "/icons/icon-192.svg",
  "/icons/icon-512.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("chacha-campus-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function isCacheableAsset(request) {
  return ["document", "script", "style", "image", "font"].includes(
    request.destination,
  );
}

async function networkFirstNavigation(request) {
  const url = new URL(request.url);
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    if (url.pathname.includes("/notices")) {
      return (await cache.match("/offline-notices.html")) ?? Response.error();
    }

    if (url.pathname === "/") {
      return (await cache.match("/offline-map.html")) ?? Response.error();
    }

    return (await cache.match(request)) ?? (await cache.match("/")) ?? Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 외부 지도 SDK·타일과 Supabase Data API는 장기 캐시하지 않는다.
  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (!isCacheableAsset(request)) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) {
        return cached;
      }

      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    }),
  );
});
