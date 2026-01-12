'use client'

import { useState, useEffect } from 'react'

interface ProcessTypewriterProps {
  steps: string[]
  delay?: number
}

export function ProcessTypewriter({ 
  steps, 
  delay = 600
}: ProcessTypewriterProps) {
  const [visibleItems, setVisibleItems] = useState<Array<{ type: 'text' | 'arrow', content: string, index: number }>>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex >= steps.length * 2) {
      return
    }

    const timer = setTimeout(() => {
      const stepIndex = Math.floor(currentIndex / 2)
      const isArrow = currentIndex % 2 === 1

      if (isArrow && stepIndex < steps.length - 1) {
        // Show arrow
        setVisibleItems(prev => [...prev, { type: 'arrow', content: '→', index: currentIndex }])
      } else if (!isArrow && stepIndex < steps.length) {
        // Show text
        setVisibleItems(prev => [...prev, { type: 'text', content: steps[stepIndex], index: currentIndex }])
      }

      setCurrentIndex(prev => prev + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [currentIndex, steps, delay])

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-base md:text-lg lg:text-xl min-h-[2rem]">
      {visibleItems.map((item, index) => (
        <span
          key={`${item.type}-${item.index}`}
          className="inline-flex items-center opacity-0 animate-fade-in"
          style={{
            animationDelay: '0ms',
            animationFillMode: 'forwards'
          }}
        >
          {item.type === 'text' ? (
            <span className="text-white font-serif font-bold">{item.content}</span>
          ) : (
            <span className="text-primary-300/70 font-bold text-xl md:text-2xl">{item.content}</span>
          )}
        </span>
      ))}
    </div>
  )
}
