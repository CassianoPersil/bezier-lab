'use client'

// =============================================================================
// DESIGN SYSTEM — Overview / Home Page
// Zeroheight-inspired documentation home
// =============================================================================

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@bezier-lab/ui'
import { DSTopNav } from './components/DSTopNav'
import {
  BookOpen,
  Palette,
  Box,
  PlaySquare,
  Zap,
  Layers,
  Type,
  LayoutGrid,
  ArrowRight,
  Package,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------
const stats = [
  { label: 'Components', value: '12+', icon: Box },
  { label: 'Design Tokens', value: '80+', icon: Palette },
  { label: 'Token Categories', value: '8', icon: Layers },
  { label: 'Accessibility', value: 'WCAG 2.1', icon: Zap },
]

// ---------------------------------------------------------------------------
// Quick nav cards
// ---------------------------------------------------------------------------
const sections = [
  {
    label: 'Guidelines',
    description: 'Brand principles, motion language, and accessibility standards.',
    href: '/guidelines/brand',
    icon: BookOpen,
    color: '#9da3ae',
    tags: ['Brand', 'Motion', 'A11y'],
  },
  {
    label: 'Design Tokens',
    description: 'The atomic values behind every design decision — colors, spacing, typography.',
    href: '/tokens/colors',
    icon: Palette,
    color: '#00F0FF',
    tags: ['Colors', 'Typography', 'Spacing'],
  },
  {
    label: 'Components',
    description: 'A library of 12+ production-ready React components built with Radix UI.',
    href: '/components/button',
    icon: Box,
    color: '#c084fc',
    tags: ['Button', 'Card', 'Input', '+9 more'],
  },
  {
    label: 'Playground',
    description: 'Interactively test and configure all component variants in real-time.',
    href: '/playground',
    icon: PlaySquare,
    color: '#4ade80',
    tags: ['Interactive', 'Variants', 'Copy code'],
  },
]

// ---------------------------------------------------------------------------
// Featured tokens preview
// ---------------------------------------------------------------------------
const colorSwatches = [
  { name: 'Canvas', value: '#0d0d0e', token: '--color-bg-canvas' },
  { name: 'Surface 1', value: '#141517', token: '--color-bg-surface-1' },
  { name: 'Surface 2', value: '#1a1c1f', token: '--color-bg-surface-2' },
  { name: 'Border', value: '#1e2124', token: '--color-border-default' },
  { name: 'Ink Muted', value: '#636b76', token: '--color-text-muted' },
  { name: 'Ink', value: '#e8eaed', token: '--color-text-primary' },
  { name: 'Accent', value: '#00F0FF', token: '--color-accent' },
  { name: 'Success', value: '#22c55e', token: '--color-success' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function DesignSystemHome() {
  const { t } = useLanguage()

  const statsLocal = [
    { label: t('ds.stats.components'), value: '12+', icon: Box },
    { label: t('ds.stats.tokens'), value: '80+', icon: Palette },
    { label: t('ds.stats.categories'), value: '8', icon: Layers },
    { label: t('ds.stats.a11y'), value: 'WCAG 2.1', icon: Zap },
  ]

  const sectionsLocal = [
    {
      label: t('ds.section.guidelines'),
      description: t('ds.section.guidelines.desc'),
      href: '/guidelines/brand',
      icon: BookOpen,
      color: '#9da3ae',
      tags: ['Brand', 'Motion', 'A11y'],
    },
    {
      label: t('ds.section.tokens'),
      description: t('ds.section.tokens.desc'),
      href: '/tokens/colors',
      icon: Palette,
      color: '#00F0FF',
      tags: ['Colors', 'Typography', 'Spacing'],
    },
    {
      label: t('ds.section.components'),
      description: t('ds.section.components.desc'),
      href: '/components/button',
      icon: Box,
      color: '#c084fc',
      tags: ['Button', 'Card', 'Input', '+9 more'],
    },
    {
      label: t('ds.section.playground'),
      description: t('ds.section.playground.desc'),
      href: '/playground',
      icon: PlaySquare,
      color: '#4ade80',
      tags: ['Interactive', 'Variants', 'Copy code'],
    },
  ]

  return (
    <div className="min-h-screen bg-canvas">
      <DSTopNav />

      <main className="max-w-screen-xl mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-xs font-medium text-accent mb-6">
            <Package className="h-3 w-3" />
            {t('ds.version')}
          </div>
          <h1 className="text-5xl font-bold tracking-tight leading-tight mb-4">
            <span className="text-gradient-cyan">{t('ds.title')}</span>
          </h1>
          <p className="text-xl text-ink-subtle max-w-2xl leading-relaxed">
            {t('ds.desc')}
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          {statsLocal.map((stat) => (
            <div
              key={stat.label}
              className="surface-card p-5 flex flex-col gap-1"
            >
              <stat.icon className="h-4 w-4 text-ink-muted mb-1" />
              <div className="text-2xl font-bold text-ink tracking-tight">{stat.value}</div>
              <div className="text-xs text-ink-muted font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Navigation cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-20"
        >
          <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-6">
            {t('ds.explore')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectionsLocal.map((section, i) => (
              <motion.div
                key={section.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                whileHover={{ y: -3 }}
              >
                <Link
                  href={section.href}
                  className="group block p-5 surface-card hover:border-accent/20 transition-all duration-200 h-full"
                >
                  <div
                    className="h-9 w-9 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${section.color}18`, border: `1px solid ${section.color}30` }}
                  >
                    <section.icon className="h-4.5 w-4.5" style={{ color: section.color }} />
                  </div>
                  <h3 className="text-sm font-semibold text-ink mb-1.5 group-hover:text-accent transition-colors">
                    {section.label}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed mb-4">
                    {section.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {section.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-surface-2 text-ink-muted border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Color token preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
              {t('ds.colors.title')}
            </h2>
            <Link
              href="/tokens/colors"
              className="inline-flex items-center gap-1 text-xs text-ink-subtle hover:text-accent transition-colors"
            >
              {t('ds.colors.viewAll')} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {colorSwatches.map((swatch) => (
              <div key={swatch.token} className="flex flex-col gap-2">
                <div
                  className="h-12 w-full rounded-lg border border-border cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: `var(${swatch.token})` }}
                  title={`${swatch.name}: var(${swatch.token})`}
                />
                <div>
                  <p className="text-[10px] font-medium text-ink-subtle leading-none">{swatch.name}</p>
                  <p className="text-[10px] text-ink-disabled font-mono mt-0.5 truncate" title={swatch.token}>{swatch.token}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Typography preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="surface-card p-8 mb-20"
        >
          <div className="flex items-center gap-2 mb-6">
            <Type className="h-4 w-4 text-ink-muted" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
              {t('ds.typography.title')}
            </h2>
          </div>
          <div className="space-y-5 divide-y divide-border">
            {[
              { name: 'Display 2XL', className: 'text-5xl font-extrabold tracking-tight', sample: 'Precision Printing.' },
              { name: 'Headline', className: 'text-2xl font-bold tracking-tight', sample: 'Engineered for excellence' },
              { name: 'Title', className: 'text-lg font-semibold', sample: 'Component Documentation' },
              { name: 'Body', className: 'text-base font-normal text-ink-subtle', sample: 'Every token, component, and pattern documented with precision.' },
              { name: 'Label SM', className: 'text-xs font-medium text-ink-muted uppercase tracking-wider', sample: 'Section Header' },
            ].map((type) => (
              <div key={type.name} className="flex items-baseline gap-8 pt-5 first:pt-0">
                <span className="text-xs text-ink-disabled font-mono w-28 shrink-0">{type.name}</span>
                <span className={type.className}>{type.sample}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Component showcase grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
              {t('ds.components.title')}
            </h2>
            <Link
              href="/components/button"
              className="inline-flex items-center gap-1 text-xs text-ink-subtle hover:text-accent transition-colors"
            >
              {t('ds.components.browseAll')} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {['Button', 'Badge', 'Card', 'Input', 'Avatar', 'Table', 'Dialog', 'Select', 'Sidebar', 'Toast', 'Tabs', 'Spinner'].map((name) => (
              <Link
                key={name}
                href={`/components/${name.toLowerCase()}`}
                className="group surface-card p-4 text-center hover:border-accent/20 transition-all"
              >
                <LayoutGrid className="h-4 w-4 text-ink-disabled group-hover:text-ink-muted mx-auto mb-2 transition-colors" />
                <span className="text-xs font-medium text-ink-muted group-hover:text-ink-subtle transition-colors">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
