'use client'

// =============================================================================
// DESIGN SYSTEM — Top Navigation
// =============================================================================

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { LogoImagotipo, LanguageSelector, ThemeToggle } from '@bezier-lab/ui'
import {
  BookOpen,
  Palette,
  Box,
  PlaySquare,
  Github,
  ExternalLink,
  ChevronDown,
} from 'lucide-react'

const navItems = [
  {
    label: 'Guidelines',
    href: '/guidelines',
    icon: BookOpen,
  },
  {
    label: 'Tokens',
    href: '/tokens',
    icon: Palette,
  },
  {
    label: 'Components',
    href: '/components',
    icon: Box,
  },
  {
    label: 'Playground',
    href: '/playground',
    icon: PlaySquare,
  },
]

export function DSTopNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-border bg-canvas/85 backdrop-blur-xl">
      <div className="max-w-screen-xl mx-auto h-full px-6 flex items-center gap-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <LogoImagotipo height={28} />
        </Link>

        {/* DS label */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-muted border border-border rounded-md px-1.5 py-0.5">
            Design System
          </span>
        </div>

        {/* Main nav */}
        <nav className="flex items-center gap-1 flex-1 h-full">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)

            return (
              <div
                key={item.href}
                className="relative h-full flex items-center"
              >
                <Link
                  href={item.href}
                  className={[
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium',
                    'transition-all duration-150',
                    isActive
                      ? 'text-ink bg-surface-1'
                      : 'text-ink-muted hover:text-ink hover:bg-surface-1',
                  ].join(' ')}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              </div>
            )
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4 shrink-0">
          <LanguageSelector />
          <ThemeToggle />
          <span className="h-4 w-px bg-border" aria-hidden="true" />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 w-8 flex items-center justify-center rounded-lg text-ink-muted hover:text-ink hover:bg-surface-1 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink-subtle border border-border hover:border-accent/40 hover:text-ink transition-all"
          >
            Storefront <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </header>
  )
}
