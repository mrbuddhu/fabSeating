'use client'

import { useEffect } from 'react'

export function PWARegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Dev: remove any stale service worker + caches so changes always show
      navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister()))
      if ('caches' in window) caches.keys().then((ks) => ks.forEach((k) => caches.delete(k)))
      return
    }
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('/sw.js', { scope: '/' })
            .then((registration) => {
              console.log('Service Worker registered:', registration.scope)
              
              registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing
                if (newWorker) {
                  newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                      console.log('New service worker available. Refresh to update.')
                    }
                  })
                }
              })
            })
            .catch((error) => {
              console.log('Service Worker registration failed:', error)
            })
        })
      }

      let deferredPrompt: any = null

      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        deferredPrompt = e
      })

      window.addEventListener('appinstalled', () => {
        console.log('PWA installed')
        deferredPrompt = null
      })
    }
  }, [])

  return null
}

