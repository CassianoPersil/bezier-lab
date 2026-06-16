'use client'

// =============================================================================
// TOAST / NOTIFICATION SYSTEM — Bézier UI
// =============================================================================

import React, { createContext, useContext, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '../lib/utils'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface ToastData {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
interface ToastContextValue {
  toast: (data: Omit<ToastData, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const toast = useCallback((data: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, ...data }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, data.duration ?? 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        <AnimatePresence>
          {toasts.map((t) => (
            <ToastItem
              key={t.id}
              toast={t}
              onDismiss={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
            />
          ))}
        </AnimatePresence>
        <ToastPrimitive.Viewport
          className="fixed bottom-6 right-6 z-[600] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
        />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Toast Item
// ---------------------------------------------------------------------------
const variantConfig: Record<
  ToastVariant,
  { icon: React.ElementType; iconColor: string; border: string }
> = {
  default: { icon: Info, iconColor: '#9da3ae', border: '#2a2e33' },
  success: { icon: CheckCircle2, iconColor: '#4ade80', border: '#22c55e30' },
  error: { icon: AlertCircle, iconColor: '#f87171', border: '#ef444430' },
  warning: { icon: AlertTriangle, iconColor: '#facc15', border: '#eab30830' },
  info: { icon: Info, iconColor: '#6ef4ff', border: '#00c8d930' },
}

function ToastItem({ toast, onDismiss }: { toast: ToastData; onDismiss: () => void }) {
  const { icon: Icon, iconColor, border } = variantConfig[toast.variant ?? 'default']

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="pointer-events-auto"
    >
      <div
        className="flex items-start gap-3 p-4 rounded-xl bg-[#141517] shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
        style={{ border: `1px solid ${border}` }}
      >
        <Icon className="h-5 w-5 mt-0.5 shrink-0" style={{ color: iconColor }} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#e8eaed]">{toast.title}</p>
          {toast.description && (
            <p className="text-xs text-[#9da3ae] mt-0.5">{toast.description}</p>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="shrink-0 text-[#636b76] hover:text-[#9da3ae] transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}
