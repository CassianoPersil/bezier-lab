'use client'

// =============================================================================
// BADGE COMPONENT — Bézier UI
// Status indicators with Linear-inspired styling
// =============================================================================

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-surface-2 text-ink-subtle border border-border',
        accent: 'bg-accent/10 text-accent border border-accent/20',
        success: 'bg-success/10 text-success border border-success/20',
        warning: 'bg-warning/10 text-warning border border-warning/20',
        danger: 'bg-danger/10 text-danger border border-danger/20',
        info: 'bg-accent/10 text-accent border border-accent/20',
        purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20',
        outline: 'bg-transparent text-ink-muted border border-border',
      },
      size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-xs px-2.5 py-1',
        lg: 'text-sm px-3 py-1',
      },
      dot: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      dot: false,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Show a pulsing dot indicator */
  dot?: boolean
}

const dotBgColors: Record<string, string> = {
  default: 'bg-ink-muted',
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-accent',
  purple: 'bg-purple-500',
  outline: 'bg-ink-muted',
}

export function Badge({ className, variant = 'default', size, dot = false, children, ...props }: BadgeProps) {
  const dotBgClass = dotBgColors[variant ?? 'default'] ?? 'bg-ink-muted'

  return (
    <span className={cn(badgeVariants({ variant, size, dot, className }))} {...props}>
      {dot && (
        <span
          className={cn("relative inline-flex h-1.5 w-1.5 rounded-full shrink-0", dotBgClass)}
          aria-hidden="true"
        >
          <span
            className={cn("absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping", dotBgClass)}
          />
        </span>
      )}
      {children}
    </span>
  )
}
