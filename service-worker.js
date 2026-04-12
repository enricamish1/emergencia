self.addEventListener('install', e => {
  e.waitUntil(caches.open('v1').then(c => c.addAll(['/'])));
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(r => r || fetch(e.request))
      .catch(() => {
        // Return a fallback response or cached page
        return caches.match('/') || new Response('Offline');
      })
  );
});