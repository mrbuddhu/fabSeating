'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { FAQ } from '@/types'
import { cn } from '@/lib/utils'

interface FAQAccordionProps {
  faqs: FAQ[]
  className?: string
}

export function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={cn('space-y-4', className)}>
      {faqs.map((faq, index) => (
        <div
          key={faq._id}
          className="border-b border-primary-200 pb-4"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full text-left flex items-center justify-between py-4 group"
          >
            <h3 className="font-serif text-lg font-semibold pr-8 group-hover:text-primary-700 transition-colors">
              {faq.question}
            </h3>
            <span
              className={cn(
                'text-2xl text-primary-400 transition-transform flex-shrink-0',
                openIndex === index && 'rotate-45'
              )}
            >
              +
            </span>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pb-4 text-primary-700 leading-relaxed">
                  {typeof faq.answer === 'string' ? (
                    <p>{faq.answer}</p>
                  ) : (
                    <div>{JSON.stringify(faq.answer)}</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

