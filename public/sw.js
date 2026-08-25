const CACHE_NAME = "chacha-campus-shell-v2";
const APP_ROUTES = [
  "/",
  "/collection",
  "/places/library",
  "/places/language-center",
  "/places/industry-center",
  "/places/library/verify",
  "/places/language-center/verify",
  "/places/industry-center/verify",
];
const CORE_ASSETS = [
  "/offline-map.html",
  "/offline-notices.html",
  "/manifest.webmanifest",
  "/icons/192",
  "/icons/512",
  "/places/library.webp",
  "/places/language-center.webp",
  "/places/industry-center.webp",
  "/characters/library.webp",
  "/characters/language-center.webp",
  "/characters/industry-center.webp",
];

function getStaticAssetPaths(html) {
  return [...html.matchAll(/(?:src|href)="([^"?]*\/_next\/static\/[^"?]+)"/g)]
    .map((match) => match[1])
    .filter((path) => path.startsWith("/_next/static/"));
}

async function cacheAppRoute(cache, route) {
  const response = await fetch(route);

  if (!response.ok) {
    throw new Error(`Failed to cache ${route}`);
  }

  await cache.put(route, response.clone());
  const assets = getStaticAssetPaths(await response.text());
  await Promise.all(
    assets.map(async (assetPath) => {
      const assetResponse = await fetch(assetPath);

      if (assetResponse.ok) {
        await cache.put(assetPath, assetResponse);
      }
    }),
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(CORE_ASSETS);
      await Promise.all(APP_ROUTES.map((route) => cacheAppRoute(cache, route)));
    }),
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
      ),
  );
});

function isNoticeNavigation(url, request) {
  return request.mode === "navigate" && url.pathname.endsWith("/notices");
}

function isCacheableStaticAsset(url, request) {
  return (
    request.destination === "image" ||
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "font" ||
    url.pathname.startsWith("/_next/static/")
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/_next/image") ||
    url.searchParams.has("_rsc") ||
    request.headers.has("RSC")
  ) {
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      try {
        const response = await fetch(request);

        if (
          response.ok &&
          response.type === "basic" &&
          !isNoticeNavigation(url, request) &&
          (request.mode === "navigate" || isCacheableStaticAsset(url, request))
        ) {
          await cache.put(request, response.clone());
        }

        return response;
      } catch {
        if (isNoticeNavigation(url, request)) {
          return cache.match("/offline-notices.html");
        }

        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
          return cachedResponse;
        }

        if (request.mode === "navigate") {
          return cache.match("/offline-map.html");
        }

        return Response.error();
      }
    })(),
  );
});
