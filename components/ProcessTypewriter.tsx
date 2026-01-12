'use client'

import { useState, useEffect, useRef } from 'react'

interface ProcessTypewriterProps {
  steps: string[]
  delay?: number
  typingSpeed?: number
}

export function ProcessTypewriter({ 
  steps, 
  delay = 800, 
  typingSpeed = 30 
}: ProcessTypewriterProps) {
  const [displayedSteps, setDisplayedSteps] = useState<string[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showArrow, setShowArrow] = useState(false)
  const charIndexRef = useRef(0)

  useEffect(() => {
    if (currentStepIndex >= steps.length) {
      setIsTyping(false)
      return
    }

    const currentStep = steps[currentStepIndex]
    charIndexRef.current = 0
    setShowArrow(false)

    // Start typing the current step
    const typingInterval = setInterval(() => {
      if (charIndexRef.current < currentStep.length) {
        setCurrentText(currentStep.substring(0, charIndexRef.current + 1))
        charIndexRef.current++
      } else {
        clearInterval(typingInterval)
        // Show arrow after typing completes
        setTimeout(() => {
          setShowArrow(true)
        }, 200)
        // Wait before moving to next step
        setTimeout(() => {
          setDisplayedSteps(prev => [...prev, currentStep])
          setCurrentText('')
          setShowArrow(false)
          setCurrentStepIndex(prev => prev + 1)
        }, delay)
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [currentStepIndex, steps, delay, typingSpeed])

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-base md:text-lg lg:text-xl min-h-[2rem]">
      {displayedSteps.map((step, index) => (
        <span
          key={`${step}-${index}`}
          className="inline-flex items-center gap-3 md:gap-4"
        >
          <span className="text-white font-serif font-bold animate-slide-in">{step}</span>
          {index < displayedSteps.length - 1 && (
            <span className="text-primary-300/70 font-bold text-xl md:text-2xl animate-fade-in">
              →
            </span>
          )}
        </span>
      ))}
      {isTyping && (
        <span className="inline-flex items-center gap-3 md:gap-4">
          {displayedSteps.length > 0 && showArrow && (
            <span className="text-primary-300/70 font-bold text-xl md:text-2xl">
              →
            </span>
          )}
          {currentText && (
            <span className="text-white font-serif font-bold">
              {currentText}
              <span className="animate-pulse text-primary-300">|</span>
            </span>
          )}
        </span>
      )}
    </div>
  )
}
