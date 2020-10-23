const staticCacheName = 'site-static'
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/desktop.js',
  '/image2/back.jpg',
  '/image2/favicon.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
]

/**
 * Installs the service worker
 * the waitUntil method is used to tell the browser not to terminate the service worker
 * until the promise passed to waitUntil is either resolved or rejected.
 */
this.self.addEventListener('install', event => {
  console.log('serviceworker has been installed')
  event.waitUntil(
    this.caches.open(staticCacheName).then(cache => {
      console.log('caching shell assets')
      cache.addAll(assets)
    })
  )
})

/**
 *  Activates the service worker
 */

this.self.addEventListener('activate', event => {
  console.log('sw has been activated')
})

/**
 * return from the cache if we have it already. If not try to get the resource from the server
 *
*/
this.self.addEventListener('fetch', event => {
//   console.log('fetch event', event)
// pause the fetch and respond with custom event
  event.respondWith(
    this.caches.match(event.request).then(cacheResponse => {
      return cacheResponse || this.fetch(event.request)
    })
  )
})
