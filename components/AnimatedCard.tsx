'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  index?: number
  className?: string
  delay?: number
}

export function AnimatedCard({ children, index = 0, className = '', delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay: delay + index * 0.1,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

