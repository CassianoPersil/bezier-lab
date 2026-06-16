'use client'

// =============================================================================
// TABLE COMPONENT — Bézier UI
// Data table with Linear-inspired styling
// =============================================================================

import React from 'react'
import { cn } from '../lib/utils'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'

// ---------------------------------------------------------------------------
// Table root
// ---------------------------------------------------------------------------
export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Make the table container scrollable horizontally */
  scrollable?: boolean
}

export function Table({ className, scrollable = true, children, ...props }: TableProps) {
  return (
    <div
      className={cn(
        'w-full rounded-xl border border-border overflow-hidden',
        'bg-surface-0',
        className
      )}
      {...props}
    >
      <div className={cn(scrollable && 'overflow-x-auto')}>
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Table Head
// ---------------------------------------------------------------------------
export function TableHead({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn('bg-surface-1 border-b border-border', className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Table Body
// ---------------------------------------------------------------------------
export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('divide-y divide-border', className)} {...props} />
}

// ---------------------------------------------------------------------------
// Table Row
// ---------------------------------------------------------------------------
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Make row clickable */
  clickable?: boolean
}

export function TableRow({ className, clickable, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        'transition-colors duration-100',
        clickable && 'cursor-pointer hover:bg-surface-2',
        className
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Table Header Cell
// ---------------------------------------------------------------------------
export type SortDirection = 'asc' | 'desc' | null

export interface TableThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sortDirection?: SortDirection
  onSort?: () => void
}

export function TableTh({
  className,
  sortable,
  sortDirection,
  onSort,
  children,
  ...props
}: TableThProps) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider',
        sortable && 'select-none cursor-pointer hover:text-ink-subtle transition-colors',
        className
      )}
      onClick={sortable ? onSort : undefined}
      aria-sort={
        sortDirection === 'asc'
          ? 'ascending'
          : sortDirection === 'desc'
          ? 'descending'
          : sortable
          ? 'none'
          : undefined
      }
      {...props}
    >
      <div className="flex items-center gap-1.5">
        {children}
        {sortable && (
          <span className="text-ink-disabled">
            {sortDirection === 'asc' ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : sortDirection === 'desc' ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronsUpDown className="h-3.5 w-3.5" />
            )}
          </span>
        )}
      </div>
    </th>
  )
}

// ---------------------------------------------------------------------------
// Table Data Cell
// ---------------------------------------------------------------------------
export function TableTd({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn('px-4 py-3 text-sm text-ink-subtle whitespace-nowrap', className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Table Empty State
// ---------------------------------------------------------------------------
export function TableEmpty({ message = 'No data found.' }: { message?: string }) {
  return (
    <tr>
      <td colSpan={99} className="px-4 py-12 text-center text-sm text-ink-muted">
        {message}
      </td>
    </tr>
  )
}

// ---------------------------------------------------------------------------
// Table Footer
// ---------------------------------------------------------------------------
export function TableFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-3',
        'border-t border-border bg-surface-0',
        'text-xs text-ink-muted',
        className
      )}
      {...props}
    />
  )
}
