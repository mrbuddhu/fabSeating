'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { DEFAULT_SECTIONS } from '@/lib/siteSections'

const ease = [0.22, 1, 0.36, 1] as const

export function IndustriesServed({ industries = DEFAULT_SECTIONS.industries }: { industries?: string[] }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative bg-gradient-to-b from-white via-primary-50/40 to-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="grainy-gradient relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-6 py-8 text-primary-100 shadow-[0_18px_50px_rgba(0,0,0,0.18)] md:px-10 md:py-10"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="relative z-10 mb-6 md:mb-8">
            <h2 className="text-2xl font-serif font-bold tracking-tight text-primary-50 md:text-3xl">
              Industries We Serve
            </h2>
            <p className="mt-2 max-w-xl text-sm font-normal not-italic leading-relaxed text-primary-200 md:text-base">
              Furniture and furnishing solutions for every kind of space.
            </p>
          </div>

          <motion.ul
            className="relative z-10 grid grid-cols-1 gap-x-12 sm:grid-cols-2"
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: reduceMotion ? 0 : 0.055, delayChildren: reduceMotion ? 0 : 0.12 },
              },
            }}
          >
            {industries.map((industry) => (
              <motion.li
                key={industry}
                className="group"
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
                }}
              >
                <div className="flex items-center gap-3 py-3.5 md:py-4">
                  <motion.span
                    aria-hidden
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-300 shadow-[0_0_0_4px_rgba(133,197,196,0.12)] transition-transform duration-300 group-hover:scale-125"
                    variants={{
                      hidden: { scale: 0.4, opacity: 0 },
                      show: { scale: 1, opacity: 1, transition: { duration: 0.35, ease } },
                    }}
                  />
                  <span className="text-sm font-medium leading-snug text-primary-100 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary-50 md:text-base">
                    {industry}
                  </span>
                </div>
                <motion.span
                  aria-hidden
                  className="block h-px w-full origin-left bg-primary-200/25 transition-colors duration-300 group-hover:bg-primary-200/70"
                  variants={{
                    hidden: { scaleX: 0 },
                    show: { scaleX: 1, transition: { duration: 0.55, ease, delay: 0.05 } },
                  }}
                />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
