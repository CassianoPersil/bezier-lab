'use client'

// =============================================================================
// INPUT COMPONENT — Bézier UI
// Text inputs with Linear-inspired focus glow (cyan)
// =============================================================================

import React from 'react'
import { cn } from '../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Icon on the left side */
  leftIcon?: React.ReactNode
  /** Icon or element on the right side */
  rightElement?: React.ReactNode
  /** Display an error state */
  error?: boolean
  /** Error message text */
  errorMessage?: string
  /** Label above the input */
  label?: string
  /** Helper text below the input */
  hint?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightElement, error, errorMessage, label, hint, id, ...props }, ref) => {
    const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-ink leading-none"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-ink-muted">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              // Base
              'w-full rounded-lg text-sm text-ink placeholder:text-ink-disabled',
              'bg-surface-1 border border-border',
              'transition-all duration-150',
              // Padding
              'h-9 px-3 py-2',
              leftIcon && 'pl-9',
              rightElement && 'pr-9',
              // Focus
              'outline-none focus:border-accent/50 focus:bg-surface-2',
              'focus:shadow-[0_0_0_3px_var(--color-accent-glow)]',
              // Error
              error && 'border-danger/60 focus:border-danger focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]',
              // Disabled
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            aria-invalid={error}
            aria-describedby={
              errorMessage ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 flex items-center text-ink-muted">
              {rightElement}
            </div>
          )}
        </div>
        {errorMessage && (
          <p id={`${inputId}-error`} className="text-xs text-danger" role="alert">
            {errorMessage}
          </p>
        )}
        {hint && !errorMessage && (
          <p id={`${inputId}-hint`} className="text-xs text-ink-muted">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// ---------------------------------------------------------------------------
// Textarea variant
// ---------------------------------------------------------------------------
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: boolean
  errorMessage?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, errorMessage, id, ...props }, ref) => {
    const textareaId = id ?? `textarea-${Math.random().toString(36).slice(2, 9)}`

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-ink leading-none">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'w-full rounded-lg text-sm text-ink placeholder:text-ink-disabled',
            'bg-surface-1 border border-border',
            'px-3 py-2.5 min-h-[80px] resize-y',
            'transition-all duration-150',
            'outline-none focus:border-accent/50 focus:bg-surface-2',
            'focus:shadow-[0_0_0_3px_var(--color-accent-glow)]',
            error && 'border-danger/60',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          aria-invalid={error}
          {...props}
        />
        {errorMessage && (
          <p className="text-xs text-danger" role="alert">{errorMessage}</p>
        )}
        {hint && !errorMessage && (
          <p className="text-xs text-ink-muted">{hint}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
