'use client'

// =============================================================================
// ORDERS PAGE — Admin Hub
// Kanban-style order tracking board
// =============================================================================

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge, Button, Card, CardContent } from '@bezier-lab/ui'
import { Clock, Printer, CheckCircle2, Truck, PackageCheck, XCircle, ArrowRight } from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type OrderStatus = 'PENDING' | 'IN_PRODUCTION' | 'QUALITY_CHECK' | 'READY' | 'DELIVERED'

interface Order {
  id: string
  orderNumber: string
  client: string
  product: string
  amount: number
  date: string
  status: OrderStatus
}

// ---------------------------------------------------------------------------
// Mock orders
// ---------------------------------------------------------------------------
const initialOrders: Order[] = [
  { id: '1', orderNumber: 'BL-2025-0001', client: 'Atlas Corp', product: 'Titanium Bracket v2 × 3', amount: 449.97, date: '2025-06-10', status: 'PENDING' },
  { id: '2', orderNumber: 'BL-2025-0002', client: 'Nova Systems', product: 'Precision Nozzle Set × 2', amount: 179.00, date: '2025-06-09', status: 'IN_PRODUCTION' },
  { id: '3', orderNumber: 'BL-2025-0003', client: 'Vertex Labs', product: 'Custom Enclosure Panel × 1', amount: 220.00, date: '2025-06-08', status: 'QUALITY_CHECK' },
  { id: '4', orderNumber: 'BL-2025-0004', client: 'Orbit Design', product: 'Tool Organizer Grid × 4', amount: 180.00, date: '2025-06-07', status: 'READY' },
  { id: '5', orderNumber: 'BL-2025-0005', client: 'Prime Motion', product: 'Bearing Housing v3 × 6', amount: 402.00, date: '2025-06-06', status: 'DELIVERED' },
  { id: '6', orderNumber: 'BL-2025-0006', client: 'Helios Works', product: 'Titanium Bracket v2 × 1', amount: 149.99, date: '2025-06-11', status: 'PENDING' },
]

// ---------------------------------------------------------------------------
// Column config
// ---------------------------------------------------------------------------
const columns: { status: OrderStatus; label: string; icon: React.ElementType; color: string; badgeVariant: any }[] = [
  { status: 'PENDING', label: 'Pending', icon: Clock, color: '#facc15', badgeVariant: 'warning' },
  { status: 'IN_PRODUCTION', label: 'In Production', icon: Printer, color: '#00F0FF', badgeVariant: 'accent' },
  { status: 'QUALITY_CHECK', label: 'Quality Check', icon: CheckCircle2, color: '#c084fc', badgeVariant: 'purple' },
  { status: 'READY', label: 'Ready', icon: PackageCheck, color: '#4ade80', badgeVariant: 'success' },
  { status: 'DELIVERED', label: 'Delivered', icon: Truck, color: '#636b76', badgeVariant: 'default' },
]

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  PENDING: 'IN_PRODUCTION',
  IN_PRODUCTION: 'QUALITY_CHECK',
  QUALITY_CHECK: 'READY',
  READY: 'DELIVERED',
}

// ---------------------------------------------------------------------------
// Order card
// ---------------------------------------------------------------------------
function OrderCard({
  order,
  onAdvance,
}: {
  order: Order
  onAdvance: (id: string, status: OrderStatus) => void
}) {
  const next = nextStatus[order.status]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card variant="default" padding="sm" hoverable className="mb-3 cursor-default">
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#636b76]">{order.orderNumber}</span>
            <span className="text-xs text-[#9da3ae] font-medium">${order.amount.toFixed(2)}</span>
          </div>
          <p className="text-sm font-semibold text-[#e8eaed] mb-0.5">{order.client}</p>
          <p className="text-xs text-[#636b76] mb-3 leading-relaxed">{order.product}</p>
          <p className="text-xs text-[#3d4148] mb-3">{order.date}</p>
          {next && (
            <Button
              variant="ghost"
              size="xs"
              rightIcon={<ArrowRight className="h-3 w-3" />}
              onClick={() => onAdvance(order.id, next)}
              className="w-full justify-between text-xs"
            >
              Move to {columns.find((c) => c.status === next)?.label}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders)

  const advance = (id: string, newStatus: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)))
  }

  return (
    <div className="p-8 max-w-screen-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs text-[#636b76] uppercase tracking-widest mb-1">Management</p>
        <h1 className="text-3xl font-bold text-[#e8eaed] tracking-tight">Orders</h1>
        <p className="text-sm text-[#636b76] mt-1">{orders.length} total orders</p>
      </motion.div>

      {/* Kanban board */}
      <div className="grid grid-cols-5 gap-4 overflow-x-auto">
        {columns.map((col) => {
          const colOrders = orders.filter((o) => o.status === col.status)
          return (
            <motion.div
              key={col.status}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: columns.indexOf(col) * 0.05 }}
              className="min-w-[220px]"
            >
              {/* Column header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1e2124]">
                <col.icon className="h-4 w-4" style={{ color: col.color }} />
                <span className="text-sm font-semibold text-[#e8eaed]">{col.label}</span>
                <span
                  className="ml-auto text-xs font-medium px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${col.color}20`,
                    color: col.color,
                    border: `1px solid ${col.color}30`,
                  }}
                >
                  {colOrders.length}
                </span>
              </div>

              {/* Cards */}
              <div>
                {colOrders.length === 0 ? (
                  <div className="text-xs text-[#3d4148] text-center py-8 border border-dashed border-[#1e2124] rounded-xl">
                    No orders
                  </div>
                ) : (
                  colOrders.map((order) => (
                    <OrderCard key={order.id} order={order} onAdvance={advance} />
                  ))
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
