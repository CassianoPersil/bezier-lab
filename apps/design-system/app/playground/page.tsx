'use client'

// =============================================================================
// DESIGN SYSTEM — Interactive Playground
// Storybook-like component explorer
// =============================================================================

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DSTopNav } from '../components/DSTopNav'
import { Button, Badge, Input, Card, Spinner, Avatar } from '@bezier-lab/ui'
import {
  Zap,
  Star,
  Trash2,
  ArrowRight,
  Mail,
  Search,
  Check,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Component registry
// ---------------------------------------------------------------------------
const components = ['Button', 'Badge', 'Input', 'Card', 'Avatar', 'Spinner'] as const
type ComponentKey = typeof components[number]

// ---------------------------------------------------------------------------
// Control panels per component
// ---------------------------------------------------------------------------
function ButtonPlayground() {
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive'>('primary')
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md')
  const [loading, setLoading] = useState(false)
  const [withIcon, setWithIcon] = useState(false)

  return (
    <div className="flex flex-col gap-8">
      {/* Preview */}
      <div className="flex items-center justify-center min-h-[120px] p-8 rounded-xl bg-surface-0 border border-border">
        <Button
          variant={variant}
          size={size}
          loading={loading}
          leftIcon={withIcon ? <Zap className="h-4 w-4" /> : undefined}
        >
          {loading ? 'Processing...' : 'Click me'}
        </Button>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-3 block">Variant</label>
          <div className="flex flex-wrap gap-2">
            {(['primary', 'secondary', 'ghost', 'outline', 'destructive'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  variant === v
                    ? 'bg-accent/10 text-accent border border-accent/30'
                    : 'bg-surface-2 text-ink-muted border border-border-strong hover:text-ink-subtle'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-3 block">Size</label>
          <div className="flex gap-2">
            {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  size === s
                    ? 'bg-accent/10 text-accent border border-accent/30'
                    : 'bg-surface-2 text-ink-muted border border-border-strong hover:text-ink-subtle'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} className="accent-accent" />
            <span className="text-sm text-ink-subtle">Loading state</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={withIcon} onChange={(e) => setWithIcon(e.target.checked)} className="accent-accent" />
            <span className="text-sm text-ink-subtle">With icon</span>
          </label>
        </div>
      </div>

      {/* Code snippet */}
      <div>
        <label className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-2 block">Code</label>
        <pre className="p-4 rounded-lg bg-surface-0 border border-border text-xs text-ink-subtle font-mono overflow-x-auto">
{`<Button
  variant="${variant}"
  size="${size}"${loading ? '\n  loading={true}' : ''}${withIcon ? '\n  leftIcon={<Zap />}' : ''}
>
  Click me
</Button>`}
        </pre>
      </div>
    </div>
  )
}

function BadgePlayground() {
  const [variant, setVariant] = useState<'default' | 'accent' | 'success' | 'warning' | 'danger' | 'info'>('accent')
  const [dot, setDot] = useState(true)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-center min-h-[80px] p-8 rounded-xl bg-surface-0 border border-border">
        <Badge variant={variant} dot={dot}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Badge>
      </div>
      <div>
        <label className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-3 block">Variant</label>
        <div className="flex flex-wrap gap-2">
          {(['default', 'accent', 'success', 'warning', 'danger', 'info'] as const).map((v) => (
            <button key={v} onClick={() => setVariant(v)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${variant === v ? 'bg-accent/10 text-accent border border-accent/30' : 'bg-surface-2 text-ink-muted border border-border-strong'}`}>
              {v}
            </button>
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={dot} onChange={(e) => setDot(e.target.checked)} className="accent-accent" />
        <span className="text-sm text-ink-subtle">Show dot indicator</span>
      </label>
    </div>
  )
}

// ---------------------------------------------------------------------------
// All variant showcases
// ---------------------------------------------------------------------------
const playgrounds: Record<ComponentKey, React.FC> = {
  Button: ButtonPlayground,
  Badge: BadgePlayground,
  Input: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Input label="Email address" placeholder="you@example.com" leftIcon={<Mail className="h-4 w-4" />} />
      <Input label="Search" placeholder="Search..." leftIcon={<Search className="h-4 w-4" />} />
      <Input label="With error" placeholder="Enter value" error errorMessage="This field is required" />
      <Input label="Hint text" placeholder="Enter value" hint="This is a helpful hint below the field." />
    </div>
  ),
  Card: () => (
    <div className="grid grid-cols-2 gap-4">
      {(['default', 'elevated', 'accent', 'glass'] as const).map((v) => (
        <Card key={v} variant={v} hoverable>
          <p className="text-xs text-ink-muted mb-1 uppercase tracking-wider">{v}</p>
          <p className="text-sm text-ink-subtle">Card variant with hoverable lift effect.</p>
        </Card>
      ))}
    </div>
  ),
  Avatar: () => (
    <div className="flex flex-wrap gap-6 items-center">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar key={size} size={size} fallback="Bézier Lab" status="online" />
      ))}
    </div>
  ),
  Spinner: () => (
    <div className="flex flex-wrap gap-6 items-center">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Spinner key={size} size={size} variant="accent" />
      ))}
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function PlaygroundPage() {
  const [selected, setSelected] = useState<ComponentKey>('Button')
  const ActivePlayground = playgrounds[selected]

  return (
    <div className="min-h-screen bg-canvas">
      <DSTopNav />
      <main className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-xs font-medium text-ink-muted uppercase tracking-widest mb-2">Interactive</p>
          <h1 className="text-4xl font-bold tracking-tight text-ink mb-3">Component Playground</h1>
          <p className="text-base text-ink-subtle">
            Interactively configure component variants, states, and properties.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Component selector */}
          <nav className="w-48 shrink-0">
            <div className="sticky top-20 flex flex-col gap-0.5">
              {components.map((name) => (
                <button
                  key={name}
                  onClick={() => setSelected(name)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                    selected === name
                      ? 'bg-accent/8 text-accent border border-accent/20'
                      : 'text-ink-muted hover:bg-surface-1 hover:text-ink-subtle border border-transparent'
                  }`}
                >
                  {selected === name && <Check className="h-3.5 w-3.5 shrink-0" />}
                  {name}
                </button>
              ))}
            </div>
          </nav>

          {/* Playground area */}
          <motion.div
            key={selected}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 surface-card p-8"
          >
            <h2 className="text-lg font-semibold text-ink mb-6">{selected}</h2>
            <ActivePlayground />
          </motion.div>
        </div>
      </main>
    </div>
  )
}
