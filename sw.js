/* assistance from https://developers.google.com/web/fundamentals/codelabs/offline/ */

const version = "1";
const cacheName = `restaurant-${version}`;
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                    './',
                    './index.html',
                    './restaurant.html',
                    './css/styles.css',
                    './css/restaurants.json',
                    './img/1.jpg',
                    './img/2e.jpg',
                    './img/3.jpg',
                    './img/4.jpg',
                    './img/5.jpg',
                    './img/6.jpg',
                    './img/7.jpg',
                    './img/8.jpg',
                    './img/9.jpg',
                    './img/10.jpg',
                    './js/dbhelper.js',
                    './js/main.js',
                    './js/restaurant_info.js',
                    './sw.js',
                ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
        .then(cache => cache.match(event.request, {
            ignoreSearch: true
        }))
        .then(response => {
            return response || fetch(event.request);
        })
    );
});


/* Request resource from network if not cached 
source: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers 
*/

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (resp) {
            return resp || fetch(event.request).then(function (response) {
                return caches.open('v1').then(function (cache) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});