'use client'

import { useEffect } from 'react'

export function PWARegister() {
  useEffect(() => {
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

