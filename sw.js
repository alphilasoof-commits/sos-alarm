const CACHE_NAME = 'sos-alarm-v2';
const ASSETS = ['/receiver.html', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

// ── Push notification handler (werkt ook als app gesloten is) ──
self.addEventListener('push', (event) => {
  let data = {
    title: '💕 Maha denkt aan jou!',
    body: 'Maha heeft op het hartje gedrukt ❤️',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'love-alarm',
    requireInteraction: true,
    vibrate: [200, 100, 200, 100, 200, 100, 600]
  };

  if (event.data) {
    try {
      data = { ...data, ...JSON.parse(event.data.text()) };
    } catch (e) { }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge,
      tag: data.tag,
      requireInteraction: data.requireInteraction,
      vibrate: data.vibrate
    })
  );
});

// ── Klik op melding opent de app ──
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('receiver') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/receiver.html');
      }
    })
  );
});
