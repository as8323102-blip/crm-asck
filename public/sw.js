const CACHE_NAME = 'asck-crm-v1.8.2';
const ASSETS = [
  '/',
  '/index.html',
  '/logo_asck.svg',
  '/manifest.json'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // NO cachear llamadas de API a Supabase ni peticiones POST/PUT/DELETE
  if (url.hostname.includes('supabase.co') || e.request.method !== 'GET') {
    return;
  }

  // Estrategia Network-First para navegación (HTML)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Estrategia Stale-While-Revalidate para recursos estáticos y assets locales
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Ejecutar fetch en background para refrescar caché
        fetch(e.request)
          .then((response) => {
            if (response.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(e.request, response));
            }
          })
          .catch((err) => console.log('SW Background fetch failed:', err));
        return cachedResponse;
      }

      return fetch(e.request).then((response) => {
        if (!response || response.status !== 200) return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
        return response;
      });
    })
  );
});
