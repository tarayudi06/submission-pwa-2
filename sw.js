const CACHE_NAME = "sw-s2";
var urlsToCache = [
    '/',
    '/js/nav.js',
    '/nav.html',
    '/index.html',
    '/img/welcome.png',
    '/pages/home.html',
    '/pages/contact.html',
    '/pages/ucl.html',
    '/pages/epl.html',
    '/pages/laliga.html',
    '/css/materialize.min.css',
    '/js/materialize.min.js',
    '/icon.png',
    '/manifest.json',
    'js/api.js',
    'https://fonts.googleapis.com/css?family=Monoton&display=swap'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
})

self.addEventListener("fetch", function (event) {
    var base_url = "https://api.football-data.org/v2/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});