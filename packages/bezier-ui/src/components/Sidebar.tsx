'use client'

// =============================================================================
// SIDEBAR COMPONENT — Bézier UI
// Collapsible admin navigation sidebar (Linear-inspired)
// =============================================================================

import React, { useState, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/utils'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
interface SidebarContextValue {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
}

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  setCollapsed: () => {},
})

export function useSidebar() {
  return useContext(SidebarContext)
}

// ---------------------------------------------------------------------------
// Sidebar Root
// ---------------------------------------------------------------------------
export interface SidebarProps {
  defaultCollapsed?: boolean
  className?: string
  children?: React.ReactNode
}

export function Sidebar({ defaultCollapsed = false, className, children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="relative h-screen shrink-0">
        <motion.aside
          animate={{ width: collapsed ? 64 : 240 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={cn(
            'flex flex-col h-full',
            'bg-surface-0 border-r border-border',
            'overflow-hidden',
            className
          )}
        >
          {children}
        </motion.aside>
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'absolute top-[16px] right-[-12px] z-10',
            'h-6 w-6 rounded-full flex items-center justify-center',
            'bg-surface-2 border border-border text-ink-muted',
            'hover:bg-surface-3 hover:text-ink hover:border-accent/30',
            'transition-all duration-150',
            'shadow-md'
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </SidebarContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Sidebar Header
// ---------------------------------------------------------------------------
export function SidebarHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center h-14 px-4 border-b border-border shrink-0', className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sidebar Nav Section
// ---------------------------------------------------------------------------
export function SidebarSection({
  title,
  className,
  children,
}: {
  title?: string
  className?: string
  children?: React.ReactNode
}) {
  const { collapsed } = useSidebar()

  return (
    <div className={cn('px-2 pt-4', className)}>
      <AnimatePresence>
        {title && !collapsed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="px-2 pb-1 text-xs font-medium text-ink-disabled uppercase tracking-widest"
          >
            {title}
          </motion.p>
        )}
      </AnimatePresence>
      <nav className="flex flex-col gap-0.5">{children}</nav>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sidebar Nav Item
// ---------------------------------------------------------------------------
export interface SidebarItemProps {
  icon?: React.ReactNode
  label: string
  active?: boolean
  badge?: string | number
  onClick?: () => void
  href?: string
  className?: string
}

export function SidebarItem({
  icon,
  label,
  active = false,
  badge,
  onClick,
  className,
}: SidebarItemProps) {
  const { collapsed } = useSidebar()

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 2 }}
      transition={{ duration: 0.1 }}
      title={collapsed ? label : undefined}
      className={cn(
        'relative flex items-center gap-2.5 w-full rounded-lg text-left',
        'px-2.5 py-2 text-sm font-medium transition-all duration-150',
        collapsed ? 'justify-center px-2' : 'justify-start',
        active
          ? 'bg-accent/8 text-accent border border-accent/15'
          : 'text-ink-subtle border border-transparent hover:bg-surface-1 hover:text-ink',
        className
      )}
      aria-current={active ? 'page' : undefined}
    >
      {icon && (
        <span className={cn('shrink-0 h-4 w-4', active ? 'text-accent' : 'text-ink-muted')}>
          {icon}
        </span>
      )}
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden whitespace-nowrap flex-1"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      {badge && !collapsed && (
        <span className="ml-auto text-xs bg-surface-2 text-ink-muted border border-border px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-accent rounded-full" />
      )}
    </motion.button>
  )
}

// ---------------------------------------------------------------------------
// Sidebar Footer
// ---------------------------------------------------------------------------
export function SidebarFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mt-auto px-2 pb-4 pt-2 border-t border-border', className)}
      {...props}
    >
      {children}
    </div>
  )
}
