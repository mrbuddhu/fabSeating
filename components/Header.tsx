'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from './Container'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showAnnouncement, setShowAnnouncement] = useState(true)
  const pathname = usePathname()
  const announcement = {
    message: 'Serving residential & commercial spaces across South India since 2001.',
    ctaLabel: 'Get a Free Consultation',
    ctaHref: '/contact',
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-transparent'
      )}
    >
      {showAnnouncement && (
        <div className="relative h-10 overflow-hidden bg-black text-white">
          <div className="absolute inset-0 bg-black/80" />
          <button
            aria-label="Close announcement"
            onClick={() => setShowAnnouncement(false)}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 px-2 py-1 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            ×
          </button>
          <div className="absolute inset-0 flex items-center">
            <motion.div
              className="flex items-center gap-12 whitespace-nowrap px-6"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                {announcement.message}
              </span>
              {announcement.ctaLabel && (
                <Link
                  href={announcement.ctaHref}
                  className="text-xs font-semibold underline underline-offset-4"
                >
                  {announcement.ctaLabel}
                </Link>
              )}
              <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                {announcement.message}
              </span>
              {announcement.ctaLabel && (
                <Link
                  href={announcement.ctaHref}
                  className="text-xs font-semibold underline underline-offset-4"
                >
                  {announcement.ctaLabel}
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      )}

      <div className="w-full">
        <motion.div
          initial={false}
          animate={{
            maxWidth: isScrolled ? '1536px' : '98%',
            marginLeft: isScrolled ? 'auto' : 'auto',
            marginRight: isScrolled ? 'auto' : 'auto',
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={cn(
            'flex items-center justify-between rounded-[32px] md:rounded-[40px] lg:rounded-[48px] border px-4 py-3 md:px-6 md:py-4 mt-2 md:mt-3 transition-all duration-500 overflow-hidden',
            isScrolled
              ? 'border-white/30 bg-white/35 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.16)] mx-auto'
              : 'border-primary-100/70 bg-primary-50/95 backdrop-blur shadow-[0_18px_50px_rgba(0,0,0,0.12)] mx-auto'
          )}
        >
          <motion.div
            animate={{
              scale: isScrolled ? 0.9 : 1,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Fabseating - Premium Furniture & Furnishings"
                width={200}
                height={60}
                className={cn(
                  'w-auto transition-all duration-500',
                  isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-14'
                )}
                priority
              />
            </Link>
          </motion.div>

          <nav className={cn(
            'hidden md:flex items-center transition-all duration-500 flex-shrink-0 whitespace-nowrap',
            isScrolled ? 'gap-6' : 'gap-8 lg:gap-12'
          )}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'font-medium transition-all duration-500 relative px-4 py-2.5 group whitespace-nowrap flex-shrink-0 overflow-hidden',
                  isScrolled ? 'text-sm' : 'text-base',
                  pathname === item.href 
                    ? 'text-primary-700' 
                    : 'text-gray-700 hover:text-primary-600'
                )}
              >
                <span className="relative z-10 inline-block transition-all duration-500 group-hover:tracking-wider">
                  {item.label}
                </span>
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></span>
                {/* Background glow effect */}
                <span className="absolute inset-0 bg-primary-50/0 group-hover:bg-primary-50/30 rounded-lg transform scale-95 group-hover:scale-100 transition-all duration-500 -z-0"></span>
                {/* Shimmer effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent -z-0"></span>
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={cn(
                  'block h-0.5 w-full bg-primary-950 transition-all',
                  isMobileMenuOpen && 'rotate-45 translate-y-2'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-full bg-primary-950 transition-all',
                  isMobileMenuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-full bg-primary-950 transition-all',
                  isMobileMenuOpen && '-rotate-45 -translate-y-2'
                )}
              />
            </div>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary-50 border-t border-primary-200"
          >
            <Container>
              <div className="py-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`nav-link relative px-4 py-3 text-sm font-medium transition-all duration-500 group overflow-hidden rounded-lg ${
                      pathname === item.href
                        ? 'text-primary-600'
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    <span className="relative z-10 inline-block transition-all duration-500 group-hover:tracking-wider">
                      {item.label}
                    </span>
                    {/* Animated underline */}
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></span>
                    {/* Background glow effect */}
                    <span className="absolute inset-0 bg-primary-50/0 group-hover:bg-primary-50/30 rounded-lg transform scale-95 group-hover:scale-100 transition-all duration-500 -z-0"></span>
                  </Link>
                ))}
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

