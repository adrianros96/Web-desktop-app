/**
 * The starting point of the desktop application
 */

import './desktop.js'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('ServiceWorker registration successful', reg))
    .catch((err) => console.log('ServiceWorker fail', err))
}
