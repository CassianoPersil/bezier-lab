'use client'

// =============================================================================
// AVATAR COMPONENT — Bézier UI
// =============================================================================

import React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '../lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full select-none',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
        '2xl': 'h-20 w-20 text-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
  /** Show online/offline indicator */
  status?: 'online' | 'away' | 'busy' | 'offline'
}

const statusColors = {
  online: 'var(--color-success)',
  away: 'var(--color-warning)',
  busy: 'var(--color-danger)',
  offline: 'var(--color-text-muted)',
}

export function Avatar({ size, src, alt, fallback, status, className, ...props }: AvatarProps) {
  const initials = fallback
    ? fallback
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?'

  return (
    <div className="relative inline-flex">
      <AvatarPrimitive.Root
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        <AvatarPrimitive.Image
          src={src}
          alt={alt ?? fallback ?? 'Avatar'}
          className="h-full w-full object-cover"
        />
        <AvatarPrimitive.Fallback
          className={cn(
            'flex h-full w-full items-center justify-center',
            'bg-surface-2 border border-border',
            'text-ink-subtle font-medium'
          )}
        >
          {initials}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
      {status && (
        <span
          className="absolute bottom-0 right-0 block rounded-full ring-2 ring-canvas"
          style={{
            width: '30%',
            height: '30%',
            minWidth: 8,
            minHeight: 8,
            backgroundColor: statusColors[status],
          }}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Avatar Group
// ---------------------------------------------------------------------------
export interface AvatarGroupProps {
  users: { src?: string; name: string }[]
  max?: number
  size?: VariantProps<typeof avatarVariants>['size']
}

export function AvatarGroup({ users, max = 4, size = 'sm' }: AvatarGroupProps) {
  const visible = users.slice(0, max)
  const remaining = users.length - max

  return (
    <div className="flex -space-x-2">
      {visible.map((user, i) => (
        <Avatar
          key={i}
          size={size}
          src={user.src}
          alt={user.name}
          fallback={user.name}
          className="ring-2 ring-canvas"
        />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            avatarVariants({ size }),
            'ring-2 ring-canvas',
            'bg-surface-2 border border-border',
            'flex items-center justify-center',
            'text-xs font-medium text-ink-subtle'
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}
