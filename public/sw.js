// Simple Service Worker for caching key resources
const CACHE_NAME = 'senesh-portfolio-cache-v1';
const urlsToCache = [
  '/',
  '/index',
  '/assets/senesh.jpeg',
  '/assets/project-fallback.jpg',
  '/assets/profile-fallback.png',
  '/favicon.ico'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request to avoid errors
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response to avoid errors
            const responseToCache = response.clone();

            // Don't cache external resources
            if (event.request.url.startsWith(self.location.origin)) {
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          }
        ).catch(() => {
          // For image requests, return a fallback when offline
          if (event.request.destination === 'image') {
            return caches.match('/assets/project-fallback.jpg');
          }
        });
      })
  );
});

self.addEventListener('activate', function(event) {
  // Clean up old caches
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
