'use client'

// =============================================================================
// CARD COMPONENT — Bézier UI
// Surface cards with elevation system (Linear-inspired)
// =============================================================================

import React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const cardVariants = cva(
  'relative rounded-xl transition-all duration-200',
  {
    variants: {
      variant: {
        // Flat surface card
        default: [
          'bg-surface-1 border border-border',
          'shadow-[var(--shadow-card)]',
        ].join(' '),
        // Elevated with stronger border
        elevated: [
          'bg-surface-2 border border-border-strong',
          'shadow-md',
        ].join(' '),
        // Accent-highlighted card
        accent: [
          'bg-surface-1 border border-accent/25',
          'shadow-sm shadow-accent/5 dark:shadow-[0_0_20px_rgba(0,240,255,0.08)]',
        ].join(' '),
        // Transparent / Glass
        glass: [
          'bg-surface-1/70 backdrop-blur-xl border border-border/50',
          'shadow-lg',
        ].join(' '),
        // Ghost — no border, no bg
        ghost: 'bg-transparent border-none shadow-none',
      },
      hoverable: {
        true: 'cursor-pointer',
        false: '',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      hoverable: false,
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Enable hover lift + border glow effect */
  hoverable?: boolean
}

export function Card({
  className,
  variant,
  padding,
  hoverable = false,
  children,
  ...props
}: CardProps) {
  const Wrapper = hoverable ? motion.div : 'div'
  const motionProps = hoverable
    ? {
        whileHover: { y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.15), 0 0 0 1px var(--color-accent)' },
        transition: { duration: 0.2, ease: 'easeOut' },
      }
    : {}

  return (
    // @ts-expect-error — Framer Motion polymorphic
    <Wrapper
      className={cn(cardVariants({ variant, padding, hoverable, className }))}
      {...motionProps}
      {...props}
    >
      {children}
    </Wrapper>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1.5 pb-4', className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-base font-semibold leading-snug text-ink tracking-tight', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-ink-subtle leading-relaxed', className)}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center pt-4 mt-4 border-t border-border',
        className
      )}
      {...props}
    />
  )
}
