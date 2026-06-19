'use client'

// =============================================================================
// STOREFRONT — Public Navigation Header
// =============================================================================

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { LogoImagotipo, Button, LanguageSelector, ThemeToggle, useLanguage } from '@bezier-lab/ui'
import { Menu, X, ExternalLink } from 'lucide-react'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  const navLinks = [
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.portfolio'), href: '/portfolio' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.contact'), href: '/quote' },
  ]

  const toggleRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        toggleRef.current?.focus()
        return
      }

      if (e.key === 'Tab') {
        const container = mobileMenuRef.current
        if (!container) return
        
        const focusableElements = container.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length === 0) return

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus()
            e.preventDefault()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Delay focus shifting slightly to ensure menu container is fully mounted and styled
    const timer = setTimeout(() => {
      const container = mobileMenuRef.current
      if (container) {
        const firstElement = container.querySelector(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement
        firstElement?.focus()
      }
    }, 50)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={[
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-canvas/90 backdrop-blur-xl border-b border-border shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label="Bézier Lab Home">
            <LogoImagotipo height={30} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            <ul className="flex items-center gap-1 flex-1 list-none p-0 m-0">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={[
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 border block',
                        isActive
                          ? 'text-ink bg-surface-2 font-semibold border-border shadow-sm'
                          : 'text-ink-subtle hover:text-ink hover:bg-surface-2 border-transparent',
                      ].join(' ')}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            <LanguageSelector />
            <ThemeToggle />
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            <Link
              href="/portal"
              className="text-sm font-medium text-ink-subtle hover:text-ink transition-colors"
            >
              {t('nav.portal')}
            </Link>
            <Button variant="primary" size="sm" asChild>
              <Link href="/quote">{t('nav.quote')}</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            ref={toggleRef}
            id="mobile-menu-toggle"
            className="md:hidden ml-auto p-2 rounded-lg text-ink-subtle hover:text-ink hover:bg-surface-2 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-nav-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 z-40 bg-surface-1 border-b border-border md:hidden focus:outline-none"
            tabIndex={-1}
          >
            <nav className="flex flex-col p-4 gap-1">
              <ul className="flex flex-col gap-1 list-none p-0 m-0">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => {
                          setMobileOpen(false)
                          toggleRef.current?.focus()
                        }}
                        className={[
                          'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border block',
                          isActive
                            ? 'text-ink bg-surface-2 font-semibold border-border shadow-sm'
                            : 'text-ink-subtle hover:text-ink hover:bg-surface-2 border-transparent',
                        ].join(' ')}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="pt-3 border-t border-border flex flex-col gap-3">
                <div className="flex items-center justify-between px-4">
                  <span className="text-xs text-ink-muted">Configurações / Settings</span>
                  <div className="flex items-center gap-3">
                    <LanguageSelector />
                    <ThemeToggle />
                  </div>
                </div>
                <Link
                  href="/portal"
                  onClick={() => {
                    setMobileOpen(false)
                    toggleRef.current?.focus()
                  }}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-ink-subtle hover:text-ink hover:bg-surface-2 transition-colors"
                >
                  {t('nav.portal')}
                </Link>
                <Button variant="primary" size="md" asChild>
                  <Link
                    href="/quote"
                    onClick={() => {
                      setMobileOpen(false)
                      toggleRef.current?.focus()
                    }}
                  >
                    {t('nav.quote')}
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
