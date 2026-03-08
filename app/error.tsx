'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8 bg-white">
      <div className="max-w-md text-center">
        <h2 className="text-xl font-bold text-primary-950 mb-2">Something went wrong</h2>
        <p className="text-primary-700 mb-6">This page could not load. Please try again.</p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-primary-700 text-white rounded-lg font-medium hover:bg-primary-800 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
