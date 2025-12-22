'use client'

import { useEffect } from 'react'

export function PWARegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('/sw.js', { scope: '/' })
            .then((registration) => {
              console.log('Service Worker registered:', registration.scope)
              
              // Check for updates
              registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing
                if (newWorker) {
                  newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                      // New service worker available, prompt user to refresh
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

      // Handle PWA install prompt
      let deferredPrompt: any = null

      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        deferredPrompt = e
        // You can show a custom install button here if needed
      })

      // Handle app installed
      window.addEventListener('appinstalled', () => {
        console.log('PWA installed')
        deferredPrompt = null
      })
    }
  }, [])

  return null
}

