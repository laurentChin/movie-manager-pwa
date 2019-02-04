self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  new RegExp("^https://storage.googleapis.com/workbox-cdn"),
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  new RegExp("^https://fonts.googleapis.com/css"),
  new workbox.strategies.NetworkFirst()
);

self.addEventListener("message", message => {
  if (message.data) {
    const authHeaders = new Headers({
      Authorization: `Bearer ${message.data}`
    });

    workbox.routing.registerRoute(
      new RegExp("^https://api.mm.laurentjanet.fr"),
      new workbox.strategies.NetworkFirst({
        fetchOptions: {
          headers: authHeaders
        }
      })
    );
  }
});
