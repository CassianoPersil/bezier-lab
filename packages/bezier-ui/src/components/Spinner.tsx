'use client'

// =============================================================================
// SPINNER & LOADING COMPONENTS — Bézier UI
// =============================================================================

import React from 'react'
import { cn } from '../lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const spinnerVariants = cva(
  'rounded-full border-2 border-current border-t-transparent animate-spin',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-6 w-6 border-[3px]',
        lg: 'h-8 w-8 border-[3px]',
        xl: 'h-12 w-12 border-4',
      },
      variant: {
        default: 'text-[#636b76]',
        accent: 'text-[#00F0FF]',
        white: 'text-white',
        muted: 'text-[#3d4148]',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'accent',
    },
  }
)

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string
  label?: string
}

export function Spinner({ size, variant, className, label = 'Loading...' }: SpinnerProps) {
  return (
    <div
      role="status"
      className={cn('inline-flex', className)}
      aria-label={label}
    >
      <span className={cn(spinnerVariants({ size, variant }))} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Full-screen loading overlay
// ---------------------------------------------------------------------------
export function LoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <div
      className="fixed inset-0 z-[800] flex items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-sm"
      role="status"
      aria-label={message}
    >
      <div className="flex flex-col items-center gap-4">
        <Spinner size="xl" variant="accent" />
        <p className="text-sm text-[#9da3ae] font-medium">{message}</p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Skeleton loader
// ---------------------------------------------------------------------------
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-[#1a1c1f]',
        className
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Skeleton block presets
// ---------------------------------------------------------------------------
export function SkeletonCard() {
  return (
    <div className="p-6 rounded-xl border border-[#1e2124] bg-[#141517] flex flex-col gap-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
    </div>
  )
}

export function SkeletonTableRow({ cols = 4 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4" style={{ width: `${60 + Math.random() * 40}%` }} />
        </td>
      ))}
    </tr>
  )
}
