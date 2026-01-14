'use client'

import { useState } from 'react'
import { createClient } from 'next-sanity'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'Aryabhatta@SanganakHQ') {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Invalid password')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Fab Seating Admin
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Manage your website content
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Fab Seating Admin</h1>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-4">Content Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="https://www.sanity.io/manage" target="_blank" rel="noopener noreferrer" 
                 className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">📝 Edit Content</h3>
                <p className="text-gray-500">Open Sanity Studio to manage all website content</p>
              </a>

              <a href="https://vercel.com/mrbuddhus-projects/fabseating" target="_blank" rel="noopener noreferrer"
                 className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">🚀 Deployments</h3>
                <p className="text-gray-500">View deployment status and website analytics</p>
              </a>

              <a href="https://fabseating.vercel.app" target="_blank" rel="noopener noreferrer"
                 className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">👁️ View Website</h3>
                <p className="text-gray-500">See the live website</p>
              </a>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Quick Guide:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Click "Edit Content" to update website text, images, and more</li>
                <li>• After making changes in Sanity, click "Publish"</li>
                <li>• Website updates automatically within 30 seconds</li>
                <li>• For help, contact your developer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
