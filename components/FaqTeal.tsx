'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FAQS } from '@/lib/siteContent'

export function FaqTeal() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-700">Good to Know</span>
          <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-950 tracking-tight">Frequently Asked Questions</h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent mx-auto my-4"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className={cn(
                    'grainy-gradient w-full text-left flex items-center justify-between gap-4 rounded-2xl px-5 md:px-6 py-4 md:py-5 text-white shadow-[0_10px_30px_rgba(26,44,45,0.25)] transition-all duration-300 hover:shadow-[0_16px_45px_rgba(26,44,45,0.35)]',
                    isOpen ? 'rounded-b-none' : ''
                  )}
                >
                  <span className="font-serif text-base md:text-lg font-semibold leading-snug relative z-10">{faq.q}</span>
                  <span
                    className={cn(
                      'flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-2xl leading-none text-white transition-transform duration-300 relative z-10',
                      isOpen && 'rotate-45'
                    )}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-b-2xl border border-t-0 border-primary-100 bg-white px-5 md:px-6 py-4 md:py-5 text-gray-700 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
