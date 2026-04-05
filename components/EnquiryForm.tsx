'use client'

import { useState } from 'react'
import { trackEvent, trackConversion } from '@/lib/analytics'
import { cn } from '@/lib/utils'

interface EnquiryFormProps {
  productId?: string
  projectId?: string
  originPage?: string
  className?: string
  /** Fill a grid column: keeps fields at top, button/status at bottom so columns align */
  layout?: 'default' | 'stretch'
}

export function EnquiryForm({ productId, projectId, originPage, className, layout = 'default' }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productId,
          projectId,
          originPage: originPage || window.location.pathname,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
        trackConversion('enquiry_submitted', { productId, projectId, originPage })
        trackEvent('enquiry_submitted', { productId, projectId, originPage })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fields = (
    <>
      <div>
        <label htmlFor="name" className="block text-xs font-medium text-primary-800 mb-1">
          Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-950 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-medium text-primary-800 mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-950 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-xs font-medium text-primary-800 mb-1">
          Phone *
        </label>
        <input
          type="tel"
          id="phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-950 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-medium text-primary-800 mb-1">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-950 focus:border-transparent resize-y min-h-[4.5rem] max-h-40"
        />
      </div>
    </>
  )

  const footer = (
    <>
      {submitStatus === 'success' && (
        <div className="p-2.5 bg-green-50 text-green-800 text-xs sm:text-sm rounded-sm">
          Thank you! We&apos;ll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-2.5 bg-red-50 text-red-800 text-xs sm:text-sm rounded-sm">
          Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-2.5 text-sm bg-primary-950 text-primary-50 hover:bg-primary-900 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Send Enquiry'}
      </button>
    </>
  )

  if (layout === 'stretch') {
    return (
      <form
        onSubmit={handleSubmit}
        className={cn('flex flex-col flex-1 min-h-0', className)}
      >
        <div className="space-y-3.5 shrink-0">{fields}</div>
        <div className="mt-auto pt-4 space-y-3.5 w-full shrink-0">{footer}</div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-3.5', className)}>
      {fields}
      {footer}
    </form>
  )
}

