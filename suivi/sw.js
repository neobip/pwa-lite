self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("suivi-cache").then((cache) => {
            return cache.addAll(["index.htm"]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
