const CACHE_NAME = 'sweph-wasm-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/assets/css/bootstrap.min.css',
  '/assets/js/bootstrap.bundle.min.js',
  '/assets/js/jquery-3.6.4.min.js',
  '/assets/js/moment.min.js',
  '/js/calculate.js',
  '/js/sweph.js',
  '/js/astro.js',
  '/js/astro.wasm',
  '/js/astro.data',
  '/assets/img/favicon.ico'
];

// Install event - cache all resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).catch(() => {
          // If the request is for a page, return the offline page
          if (event.request.destination === 'document') {
            return caches.match('/offline.html');
          }
        });
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});