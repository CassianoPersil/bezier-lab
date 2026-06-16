'use client'

// =============================================================================
// BUTTON COMPONENT — Bézier UI
// Linear.app-inspired button with Framer Motion microinteractions
// =============================================================================

import React from 'react'
import { motion } from 'framer-motion'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const buttonVariants = cva(
  // Base styles
  [
    'relative inline-flex items-center justify-center gap-2',
    'font-medium rounded-lg select-none cursor-pointer',
    'transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    'disabled:pointer-events-none disabled:opacity-40',
    'whitespace-nowrap text-sm',
  ].join(' '),
  {
    variants: {
      variant: {
        // Primary — Cyan accent in dark mode, sky blue in light mode
        primary: [
          'bg-accent text-white dark:text-[#0d0d0e] font-semibold',
          'border border-accent',
          'hover:bg-accent-muted hover:border-accent-muted',
          'active:bg-accent',
          'shadow-[0_0_20px_rgba(2,132,199,0.2)] dark:shadow-[0_0_20px_rgba(0,240,255,0.25)]',
          'hover:shadow-[0_0_30px_rgba(2,132,199,0.3)] dark:hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]',
        ].join(' '),

        // Secondary — Subtle surface
        secondary: [
          'bg-surface-2 text-ink',
          'border border-border',
          'hover:bg-surface-3 hover:border-accent/40',
          'active:bg-surface-1',
        ].join(' '),

        // Ghost — Transparent
        ghost: [
          'bg-transparent text-ink-subtle',
          'border border-transparent',
          'hover:bg-surface-2 hover:text-ink',
          'active:bg-surface-1',
        ].join(' '),

        // Outline — Bordered transparent
        outline: [
          'bg-transparent text-ink',
          'border border-border-strong',
          'hover:border-accent hover:text-accent hover:bg-surface-1',
          'active:bg-surface-2',
        ].join(' '),

        // Destructive — Red danger
        destructive: [
          'bg-danger/10 text-danger',
          'border border-danger/30',
          'hover:bg-danger/20 hover:border-danger/50',
          'active:bg-danger/30',
        ].join(' '),

        // Link — Text only
        link: [
          'bg-transparent text-accent underline-offset-4',
          'border border-transparent',
          'hover:underline hover:text-accent-muted',
          'p-0 h-auto',
        ].join(' '),
      },
      size: {
        xs: 'h-7 px-2.5 text-xs rounded-md gap-1.5',
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-9 px-4 text-sm',
        lg: 'h-10 px-5 text-base rounded-lg',
        xl: 'h-12 px-6 text-base rounded-xl',
        icon: 'h-9 w-9 p-0',
        'icon-sm': 'h-8 w-8 p-0 rounded-md',
        'icon-lg': 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child (polymorphic) */
  asChild?: boolean
  /** Show loading spinner */
  loading?: boolean
  /** Icon on the left side */
  leftIcon?: React.ReactNode
  /** Icon on the right side */
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <motion.div
        whileHover={{ scale: variant === 'link' ? 1 : 1.01 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
        style={{ display: 'inline-flex' }}
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={disabled || loading}
          aria-busy={loading}
          {...props}
        >
          {loading ? (
            <ButtonSpinner />
          ) : (
            leftIcon && <span className="shrink-0">{leftIcon}</span>
          )}
          <Slottable>{children}</Slottable>
          {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </Comp>
      </motion.div>
    )
  }
)

Button.displayName = 'Button'

// ---------------------------------------------------------------------------
// Spinner sub-component
// ---------------------------------------------------------------------------
function ButtonSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

export { buttonVariants }
