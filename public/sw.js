importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
importScripts('/service-worker-precache.js');

workbox.routing.registerRoute(
  new RegExp('^https:\/\/storage\.googleapis\.com\/workbox-cdn'),
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  new RegExp('^https:\/\/fonts\.googleapis\.com\/css'),
  new workbox.strategies.NetworkFirst()
);

self.addEventListener('message', (message) => {
  if (message.data) {
    const authHeaders = new Headers({
      'Authorization': `Bearer ${message.data}`
    });

    workbox.routing.registerRoute(
      new RegExp('^https:\/\/api\.mm\.laurentjanet\.fr'),
      new workbox.strategies.StaleWhileRevalidate({
        fetchOptions: {
          headers: authHeaders,
        },
      })
    );
  }
});
