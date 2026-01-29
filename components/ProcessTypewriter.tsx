'use client'

import { motion } from 'framer-motion'

interface ProcessTypewriterProps {
  steps: string[]
  delay?: number
}

export function ProcessTypewriter({ 
  steps, 
  delay = 200 // unused but kept for compatibility or adjusted usage
}: ProcessTypewriterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-base md:text-lg lg:text-xl min-h-[2rem]">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-3 md:gap-4">
          <motion.span
            initial={{ color: '#94a3b8', opacity: 0.4, filter: 'grayscale(100%)' }} // slate-400
            whileInView={{ color: '#ffffff', opacity: 1, filter: 'grayscale(0%)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 2, 
              ease: "easeInOut",
              delay: index * 0.8 // Stagger effect
            }}
            className="font-serif font-bold cursor-default"
          >
            {step}
          </motion.span>
          
          {index < steps.length - 1 && (
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.8 + 0.4, duration: 1 }}
              className="text-primary-200/50 font-bold text-xl md:text-2xl"
            >
              →
            </motion.span>
          )}
        </div>
      ))}
    </div>
  )
}
