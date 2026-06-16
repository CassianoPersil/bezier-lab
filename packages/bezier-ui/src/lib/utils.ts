// =============================================================================
// BÉZIER LAB — bezier-ui utility helpers
// =============================================================================

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS classes intelligently, resolving conflicts.
 * Usage: cn('px-4 py-2', isActive && 'bg-accent', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
