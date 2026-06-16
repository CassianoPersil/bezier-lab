'use client'

// =============================================================================
// DESIGN SYSTEM — Colors Token Page
// =============================================================================

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DSTopNav } from '../../components/DSTopNav'
import { Check, Copy } from 'lucide-react'

// ---------------------------------------------------------------------------
// Token data
// ---------------------------------------------------------------------------
interface Token {
  name: string
  valueLight: string
  valueDark: string
  cssVar: string
  tw: string
  role: string
}

const colorGroups = [
  {
    title: 'Backgrounds',
    description: 'Canvas and surface layers create depth through elevation.',
    tokens: [
      { name: 'bg-canvas', valueLight: '#f9fafb', valueDark: '#0d0d0e', cssVar: '--color-bg-canvas', tw: 'bg-canvas', role: 'App background' },
      { name: 'bg-canvas-deep', valueLight: '#f3f4f6', valueDark: '#010102', cssVar: '--color-bg-canvas-deep', tw: 'bg-canvas-deep', role: 'Deepest background' },
      { name: 'bg-surface-0', valueLight: '#ffffff', valueDark: '#0f1011', cssVar: '--color-bg-surface-0', tw: 'bg-surface-0', role: 'Sidebar, panels' },
      { name: 'bg-surface-1', valueLight: '#ffffff', valueDark: '#141517', cssVar: '--color-bg-surface-1', tw: 'bg-surface-1', role: 'Cards, containers' },
      { name: 'bg-surface-2', valueLight: '#f3f4f6', valueDark: '#1a1c1f', cssVar: '--color-bg-surface-2', tw: 'bg-surface-2', role: 'Hover states, inputs' },
      { name: 'bg-surface-3', valueLight: '#e5e7eb', valueDark: '#202328', cssVar: '--color-bg-surface-3', tw: 'bg-surface-3', role: 'Elevated modals' },
      { name: 'bg-surface-4', valueLight: '#cbd5e1', valueDark: '#272b30', cssVar: '--color-bg-surface-4', tw: 'bg-surface-4', role: 'Tooltips, popovers' },
    ],
  },
  {
    title: 'Borders',
    description: 'Hairlines that create separation without visual noise.',
    tokens: [
      { name: 'border-default', valueLight: '#e5e7eb', valueDark: '#1e2124', cssVar: '--color-border-default', tw: 'border-border', role: 'Standard borders' },
      { name: 'border-strong', valueLight: '#cbd5e1', valueDark: '#2a2e33', cssVar: '--color-border-strong', tw: 'border-border-strong', role: 'Elevated borders' },
    ],
  },
  {
    title: 'Text / Ink',
    description: 'Semantic text colors for hierarchy and readability.',
    tokens: [
      { name: 'text-primary', valueLight: '#0f172a', valueDark: '#e8eaed', cssVar: '--color-text-primary', tw: 'text-ink', role: 'Primary content' },
      { name: 'text-secondary', valueLight: '#334155', valueDark: '#9da3ae', cssVar: '--color-text-secondary', tw: 'text-ink-subtle', role: 'Secondary text' },
      { name: 'text-muted', valueLight: '#64748b', valueDark: '#636b76', cssVar: '--color-text-muted', tw: 'text-ink-muted', role: 'Labels, captions' },
      { name: 'text-disabled', valueLight: '#94a3b8', valueDark: '#3d4148', cssVar: '--color-text-disabled', tw: 'text-ink-disabled', role: 'Disabled states' },
    ],
  },
  {
    title: 'Accent — Electric Cyan / Blue',
    description: 'The brand accent used for interactive elements, focus states, and CTAs.',
    tokens: [
      { name: 'accent', valueLight: '#0284c7', valueDark: '#00F0FF', cssVar: '--color-accent', tw: 'text-accent', role: 'Primary accent' },
      { name: 'accent-muted', valueLight: '#0369a1', valueDark: '#0099aa', cssVar: '--color-accent-muted', tw: 'text-accent-muted', role: 'Secondary accent' },
      { name: 'accent-subtle', valueLight: '#e0f2fe', valueDark: '#005b66', cssVar: '--color-accent-subtle', tw: 'bg-accent-subtle', role: 'Backgrounds' },
      { name: 'accent-glow', valueLight: 'rgba(2,132,199,0.15)', valueDark: 'rgba(0,240,255,0.15)', cssVar: '--color-accent-glow', tw: '', role: 'Glow effects' },
    ],
  },
  {
    title: 'Status',
    description: 'Semantic status colors for feedback and state communication.',
    tokens: [
      { name: 'danger', valueLight: '#ef4444', valueDark: '#ef4444', cssVar: '--color-danger', tw: 'text-danger', role: 'Errors, destructive' },
      { name: 'danger-bg', valueLight: '#fee2e2', valueDark: '#7f1d1d', cssVar: '--color-danger-bg', tw: '', role: 'Error background' },
      { name: 'success', valueLight: '#22c55e', valueDark: '#22c55e', cssVar: '--color-success', tw: 'text-success', role: 'Positive states' },
      { name: 'success-bg', valueLight: '#dcfce7', valueDark: '#14532d', cssVar: '--color-success-bg', tw: '', role: 'Success background' },
      { name: 'warning', valueLight: '#d97706', valueDark: '#eab308', cssVar: '--color-warning', tw: 'text-warning', role: 'Caution states' },
      { name: 'info', valueLight: '#00c8d9', valueDark: '#00c8d9', cssVar: '--color-info', tw: '', role: 'Information' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Swatch component
// ---------------------------------------------------------------------------
function ColorSwatch({ token }: { token: Token }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(token.cssVar)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group rounded-xl border border-border bg-surface-1 overflow-hidden cursor-pointer"
      onClick={handleCopy}
    >
      {/* Swatch */}
      <div
        className="h-16 w-full"
        style={{ backgroundColor: `var(${token.cssVar})` }}
      />
      {/* Info */}
      <div className="p-3">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-semibold text-ink truncate">{token.name}</span>
          <span className="shrink-0 text-ink-disabled group-hover:text-ink-muted transition-colors">
            {copied ? (
              <Check className="h-3.5 w-3.5 text-[#4ade80]" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </span>
        </div>
        <p className="text-[10px] font-mono text-ink-muted mb-1">{token.cssVar}</p>
        <p className="text-[9px] text-ink-disabled font-mono mb-1 truncate" title={`L: ${token.valueLight} | D: ${token.valueDark}`}>
          L: {token.valueLight} | D: {token.valueDark}
        </p>
        <p className="text-[10px] text-ink-disabled truncate">{token.role}</p>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ColorsPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <DSTopNav />
      <main className="max-w-screen-xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-ink-muted uppercase tracking-widest mb-2">Tokens / Colors</p>
          <h1 className="text-4xl font-bold tracking-tight text-ink mb-3">Color Tokens</h1>
          <p className="text-base text-ink-subtle max-w-2xl">
            A semantic color system built on Linear&apos;s dark mode principles. Colors are organized by
            function — not appearance — ensuring consistent hierarchy across all surfaces.
          </p>
        </div>

        {/* Color groups */}
        <div className="space-y-16">
          {colorGroups.map((group, gi) => (
            <motion.section
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: gi * 0.05 }}
            >
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-ink mb-1">{group.title}</h2>
                <p className="text-sm text-ink-muted">{group.description}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                {group.tokens.map((token) => (
                  <ColorSwatch key={token.name} token={token} />
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Usage note */}
        <div className="mt-16 p-5 rounded-xl bg-surface-1 border border-accent/20">
          <p className="text-sm text-ink-subtle">
            <span className="text-accent font-semibold">Usage: </span>
            Reference tokens via CSS custom properties (e.g., <code className="text-ink font-mono bg-surface-2 px-1 py-0.5 rounded text-xs">var(--color-accent)</code>)
            or Tailwind utilities (e.g., <code className="text-ink font-mono bg-surface-2 px-1 py-0.5 rounded text-xs">text-accent</code>).
            Click any swatch to copy the CSS variable name.
          </p>
        </div>
      </main>
    </div>
  )
}
