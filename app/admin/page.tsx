'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
        {/* Login Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-primary-100 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-serif font-bold text-primary-950 mb-2">
                  Admin Portal
                </h1>
                <p className="text-gray-600">
                  Manage your Fab Seating website content
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                >
                  Sign In to Admin
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Contact your administrator if you need access
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Simple Back Link */}
      <div className="container mx-auto px-4 pt-2">
        <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors mb-4">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7l-7-7" />
          </svg>
          ← Back to Website
        </Link>
      </div>
      
      {/* Admin Dashboard */}
      <div className="container mx-auto px-4 py-4">
        <div className="mb-4">
          <h1 className="text-2xl font-serif font-bold text-primary-950 mb-1">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-600">
            Manage your Fab Seating website content and settings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <a 
            href="https://fabseating.sanity.studio" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group bg-white rounded-lg shadow border border-primary-100 p-4 hover:shadow-md hover:border-primary-300 transition-all duration-200"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary-200 transition-colors">
              <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">📝 Edit Content</h3>
            <p className="text-xs text-gray-600">Open Sanity Studio to manage content</p>
          </a>

          <a 
            href="https://vercel.com/mrbuddhus-projects/fabseating" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white rounded-lg shadow border border-primary-100 p-4 hover:shadow-md hover:border-primary-300 transition-all duration-200"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">🚀 Deployments</h3>
            <p className="text-xs text-gray-600">View deployment status and analytics</p>
          </a>

          <a 
            href="https://fabseating.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white rounded-lg shadow border border-primary-100 p-4 hover:shadow-md hover:border-primary-300 transition-all duration-200"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">👁️ View Website</h3>
            <p className="text-xs text-gray-600">See the live website</p>
          </a>
        </div>

        {/* Compact Quick Guide */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-3">
          <h3 className="text-base font-semibold text-primary-900 mb-2">📋 Quick Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-primary-800">How to Update:</h4>
              <ul className="text-xs text-primary-700 space-y-0">
                <li>• Click &quot;Edit Content&quot;</li>
                <li>• Navigate to section</li>
                <li>• Make changes</li>
                <li>• Click &quot;Publish&quot;</li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-primary-800">What You Can Edit:</h4>
              <ul className="text-xs text-primary-700 space-y-0">
                <li>• Homepage content</li>
                <li>• Products & categories</li>
                <li>• Projects & testimonials</li>
                <li>• Contact info</li>
              </ul>
            </div>
          </div>
          <div className="mt-2 p-2 bg-white/70 rounded text-xs text-primary-800">
            <strong>Need Help?</strong> Contact your website developer.
          </div>
        </div>
      </div>
    </div>
  )
}
