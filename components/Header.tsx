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
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showAnnouncement, setShowAnnouncement] = useState(true)
  const pathname = usePathname()
  const announcement = {
    message: 'Custom builds, nationwide delivery, and showroom consultations now open.',
    ctaLabel: 'Book a design consult',
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

      <div className="w-full px-4 md:px-6 lg:px-8">
        <div
          className={cn(
            'mx-auto max-w-screen-2xl flex items-center justify-between rounded-[26px] md:rounded-[32px] border px-4 py-3 md:px-6 md:py-4 mt-2 md:mt-3 transition-colors transition-shadow duration-300',
            isScrolled
              ? 'border-white/30 bg-white/35 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.16)]'
              : 'border-primary-100/70 bg-primary-50/95 backdrop-blur shadow-[0_18px_50px_rgba(0,0,0,0.12)]'
          )}
        >
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="FabSeating logo"
              width={200}
              height={60}
              className="h-10 w-auto md:h-12 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-base font-semibold transition-all relative rounded-full px-3 py-2',
                  pathname === item.href ? 'text-primary-950' : 'text-primary-800',
                  'hover:text-primary-50 hover:bg-primary-900 hover:shadow-lg hover:shadow-primary-900/20 hover:-translate-y-[2px] hover:scale-105'
                )}
              >
                {item.label}
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
        </div>
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
                    className={cn(
                      'block text-base font-medium transition-colors',
                      pathname === item.href
                        ? 'text-primary-950'
                        : 'text-primary-700 hover:text-primary-950'
                    )}
                  >
                    {item.label}
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

