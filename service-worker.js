"use strict";

const CACHE_VERSION = "queen-najma-rc1-v3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./quiz.html",
  "./quiz.css",
  "./quiz.js",
  "./manifest.webmanifest",
  "./assets/icons/favicon-32.png",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png",
  "./assets/photos/family-mountain.jpg",
  "./assets/photos/grandkids-couch.jpg",
  "./assets/photos/hang-loose-family.jpg",
  "./assets/photos/hawaii-ali-najma.jpg",
  "./assets/photos/hawaii-beach.jpg",
  "./assets/photos/hawaii-lookout.jpg",
  "./assets/photos/hawaii-wave.jpg",
  "./assets/photos/najma-portrait.jpg",
  "./assets/photos/rv-hammock.jpg",
  "./assets/photos/umrah-ali-najma.jpg",
  "./assets/photos/what-wall.jpg",
  "./assets/audio/birthday-background.mp3",
  "./assets/audio/family/abubakr.mp3",
  "./assets/audio/family/fatima.mp3",
  "./assets/audio/family/zaynab.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request)
          .then((cached) => cached || caches.match(new URL("./index.html", self.registration.scope).href)))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200) return response;
        const copy = response.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
